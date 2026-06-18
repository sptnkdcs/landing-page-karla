/**
 * Script de autorização Google Business Profile — rode uma única vez.
 * Abre o navegador para login, captura o refresh_token e salva no .env.local.
 *
 * Uso: node scripts/get-token.mjs
 *      (ou clique duas vezes no autorizar-google.bat)
 */

import http from "http"
import { readFileSync, writeFileSync, existsSync } from "fs"
import { exec } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const ENV_PATH = path.join(ROOT, ".env.local")
const REDIRECT_URI = "http://localhost:3001/callback"
const SCOPE = "https://www.googleapis.com/auth/business.manage"

// ── leitura do .env.local ────────────────────────────────────────────────────
function readEnv() {
  if (!existsSync(ENV_PATH)) return {}
  return Object.fromEntries(
    readFileSync(ENV_PATH, "utf-8")
      .split("\n")
      .filter((l) => l && !l.startsWith("#") && l.includes("="))
      .map((l) => {
        const idx = l.indexOf("=")
        return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]
      })
  )
}

// ── escrita/atualização de variável no .env.local ───────────────────────────
function upsertEnvVar(key, value) {
  let content = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, "utf-8") : ""
  const re = new RegExp(`^${key}=.*`, "m")
  content = re.test(content)
    ? content.replace(re, `${key}=${value}`)
    : content.trimEnd() + `\n${key}=${value}\n`
  writeFileSync(ENV_PATH, content, "utf-8")
}

// ── início ───────────────────────────────────────────────────────────────────
const env = readEnv()
const CLIENT_ID = env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("\n❌ GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET não encontrados no .env.local")
  console.error("   Siga as instruções do passo 1 antes de rodar este script.\n")
  process.exit(1)
}

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    prompt: "consent",
  })

console.log("\n══════════════════════════════════════════════════")
console.log("  Autorização Google Business Profile")
console.log("══════════════════════════════════════════════════")
console.log("\n🌐 Abrindo o navegador para autorização...")
console.log("   Faça login com a conta que gerencia a clínica.\n")
console.log("   Se o navegador não abrir, acesse manualmente:\n")
console.log("  ", authUrl, "\n")

const open =
  process.platform === "win32"
    ? `start "" "${authUrl}"`
    : process.platform === "darwin"
    ? `open "${authUrl}"`
    : `xdg-open "${authUrl}"`
exec(open)

// ── servidor local para capturar o callback OAuth ───────────────────────────
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost:3001")
  const code = url.searchParams.get("code")
  const error = url.searchParams.get("error")

  if (error || !code) {
    res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" })
    res.end("<h2>❌ Autorização cancelada ou erro. Feche esta aba e tente novamente.</h2>")
    console.error("\n❌ Autorização negada ou erro:", error ?? "código ausente")
    server.close()
    return
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    })

    const tokens = await tokenRes.json()

    if (!tokens.refresh_token) {
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" })
      res.end("<h2>❌ Refresh token não recebido. Feche e tente novamente.</h2>")
      console.error("\n❌ Resposta sem refresh_token:", JSON.stringify(tokens, null, 2))
      console.error('   Dica: revogue o acesso em https://myaccount.google.com/permissions e tente novamente.\n')
      server.close()
      return
    }

    upsertEnvVar("GOOGLE_REFRESH_TOKEN", tokens.refresh_token)

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    res.end(`
      <html><body style="font-family:sans-serif;text-align:center;margin-top:80px">
        <h2>✅ Autorização concluída!</h2>
        <p>Pode fechar esta aba e voltar ao terminal.</p>
      </body></html>
    `)

    console.log("✅ Refresh token salvo em .env.local com sucesso!")
    console.log("\n🔄 Próximo passo: feche o servidor atual e clique em iniciar.bat\n")

    server.close()
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" })
    res.end("<h2>❌ Erro interno. Veja o terminal.</h2>")
    console.error("\n❌ Erro ao trocar código por token:", err)
    server.close()
  }
})

server.listen(3001, () => {
  console.log("⏳ Aguardando autorização no navegador...\n")
})
