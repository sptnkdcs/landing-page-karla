import { readFileSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const env = Object.fromEntries(
  readFileSync(path.join(ROOT, ".env.local"), "utf-8")
    .split("\n")
    .filter(l => l && !l.startsWith("#") && l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)

const STAR_MAP = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }

async function run() {
  console.log("\n══════════════════════════════════════")
  console.log("  Teste Google Business Profile API")
  console.log("══════════════════════════════════════\n")

  // Token
  const { access_token, error: tokenErr } = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      refresh_token: env.GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  }).then(r => r.json())

  if (!access_token) { console.error("❌ Token falhou:", tokenErr); process.exit(1) }
  console.log("✅ Token obtido com sucesso")

  const h = { Authorization: `Bearer ${access_token}` }

  // Conta
  const accData = await fetch("https://mybusinessaccountmanagement.googleapis.com/v1/accounts", { headers: h }).then(r => r.json())
  if (accData.error) { console.error("❌ Conta:", accData.error.message); process.exit(1) }
  const account = accData.accounts?.[0]
  if (!account) { console.error("❌ Nenhuma conta encontrada"); process.exit(1) }
  console.log("✅ Conta:", account.accountName, "|", account.name)

  // Localização (usa cache se disponível)
  let locationName = env.GOOGLE_LOCATION_NAME
  if (locationName) {
    console.log("✅ Localização (cache):", locationName)
  } else {
    const locData = await fetch(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=name,title`,
      { headers: h }
    ).then(r => r.json())
    if (locData.error) { console.error("❌ Localização:", locData.error.message); process.exit(1) }
    const location = locData.locations?.[0]
    if (!location) { console.error("❌ Nenhuma localização encontrada"); process.exit(1) }
    locationName = location.name
    console.log("✅ Localização:", location.title ?? locationName)
    console.log(`\n💡 Adicione ao .env.local para evitar chamadas futuras:`)
    console.log(`   GOOGLE_LOCATION_NAME=${locationName}\n`)
  }

  // Reviews
  const revData = await fetch(
    `https://mybusiness.googleapis.com/v4/${locationName}/reviews?pageSize=50`,
    { headers: h }
  ).then(r => r.json())
  if (revData.error) { console.error("❌ Reviews:", revData.error.message); process.exit(1) }

  const reviews = (revData.reviews ?? []).filter(r => r.comment?.trim())
  console.log(`✅ ${reviews.length} avaliações com texto encontradas\n`)
  reviews.slice(0, 3).forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.reviewer?.displayName} — ${"★".repeat(STAR_MAP[r.starRating] ?? 5)}`)
    console.log(`     "${r.comment?.slice(0, 80)}..."`)
  })
  console.log("\n✅ Tudo funcionando! Rode o iniciar.bat para ver no site.\n")
}

run().catch(err => { console.error("❌ Erro:", err.message); process.exit(1) })
