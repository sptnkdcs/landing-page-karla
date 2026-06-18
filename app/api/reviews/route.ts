import { NextResponse } from "next/server"
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
import path from "path"

export const dynamic = "force-dynamic"

const REVIEWS_PATH = path.join(process.cwd(), "data", "reviews.json")
const PLACE_DATA_ID = "0x94ce59e203fa3273:0xb07846bed3555186"
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 horas

type Review = {
  name: string
  rating: number
  text: string
  image: string
  time: string
  reviewUrl: string
}

type ReviewsStore = {
  updatedAt: string
  reviews: Review[]
}

// ── JSON local ───────────────────────────────────────────────────────────────

function readStore(): ReviewsStore {
  if (!existsSync(REVIEWS_PATH)) return { updatedAt: new Date(0).toISOString(), reviews: [] }
  try {
    return JSON.parse(readFileSync(REVIEWS_PATH, "utf-8"))
  } catch {
    return { updatedAt: new Date(0).toISOString(), reviews: [] }
  }
}

function saveStore(reviews: Review[]) {
  try {
    const dir = path.dirname(REVIEWS_PATH)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    const store: ReviewsStore = { updatedAt: new Date().toISOString(), reviews }
    writeFileSync(REVIEWS_PATH, JSON.stringify(store, null, 2), "utf-8")
  } catch {
    // Em ambientes read-only (Vercel) a escrita falha silenciosamente
  }
}

function isCacheStale(updatedAt: string): boolean {
  return Date.now() - new Date(updatedAt).getTime() > CACHE_TTL_MS
}

// ── SerpAPI ──────────────────────────────────────────────────────────────────

async function fetchFromSerpApi(): Promise<Review[]> {
  const all: any[] = []
  let nextPageToken: string | undefined

  do {
    const params = new URLSearchParams({
      engine: "google_maps_reviews",
      data_id: PLACE_DATA_ID,
      hl: "pt",
      sort_by: "newestFirst",
      api_key: process.env.SERPAPI_KEY!,
    })
    if (nextPageToken) params.set("next_page_token", nextPageToken)

    const data: any = await fetch(`https://serpapi.com/search.json?${params}`, {
      next: { revalidate: 86400 },
    }).then(r => r.json())

    if (data.error) break
    all.push(...(data.reviews ?? []))
    nextPageToken = data.serpapi_pagination?.next_page_token
  } while (nextPageToken)

  return all.map(r => ({
    name: r.user?.name ?? "Paciente",
    rating: r.rating ?? 5,
    text: r.snippet?.trim() ?? "",
    image: r.user?.thumbnail ?? "",
    time: r.date ?? "",
    reviewUrl: r.link ?? "",
  }))
}

// ── Route handler ────────────────────────────────────────────────────────────

let refreshing = false

async function backgroundRefresh() {
  if (refreshing || !process.env.SERPAPI_KEY) return
  refreshing = true
  try {
    const fresh = await fetchFromSerpApi()
    if (fresh.length) saveStore(fresh)
  } catch (err) {
    console.error("[reviews] refresh falhou:", err)
  } finally {
    refreshing = false
  }
}

export async function GET() {
  const store = readStore()

  // Dispara refresh em background se cache estiver velho (não bloqueia a resposta)
  if (isCacheStale(store.updatedAt)) {
    backgroundRefresh()
  }

  // Serve imediatamente do JSON local
  return NextResponse.json({ reviews: store.reviews, updatedAt: store.updatedAt })
}
