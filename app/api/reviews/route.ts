import { NextResponse } from "next/server"
import { readFileSync, existsSync } from "fs"
import path from "path"

// Rota sempre dinâmica — o cache fica no fetch interno (next.revalidate)
export const dynamic = "force-dynamic"

const REVIEWS_PATH = path.join(process.cwd(), "data", "reviews.json")

// data_id extraído do embed do Google Maps no site
const PLACE_DATA_ID = "0x94ce59e203fa3273:0xb07846bed3555186"

function readStaticReviews() {
  if (!existsSync(REVIEWS_PATH)) return []
  try {
    return JSON.parse(readFileSync(REVIEWS_PATH, "utf-8"))
  } catch {
    return []
  }
}

async function fetchSerpApiReviews() {
  const allReviews: any[] = []
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

    const data = await fetch(`https://serpapi.com/search.json?${params}`, {
      next: { revalidate: 86400 },
    }).then(r => r.json())

    // Interrompe paginação se der erro, mas mantém o que já foi buscado
    if (data.error) break

    allReviews.push(...(data.reviews ?? []))
    nextPageToken = data.serpapi_pagination?.next_page_token
  } while (nextPageToken)

  return allReviews.map((r: any) => ({
    name: r.user?.name ?? "Paciente",
    rating: r.rating ?? 5,
    text: r.snippet?.trim() || "",
    image: r.user?.thumbnail ?? "",
    time: r.date ?? "",
    reviewUrl: r.link ?? "",
  }))
}

export async function GET() {
  if (!process.env.SERPAPI_KEY) {
    return NextResponse.json({ reviews: readStaticReviews(), source: "static" })
  }

  try {
    const reviews = await fetchSerpApiReviews()
    return NextResponse.json({ reviews, source: "serpapi" })
  } catch (err) {
    console.error("[reviews] Erro SerpAPI:", err)
    return NextResponse.json({ reviews: readStaticReviews(), source: "static" })
  }
}
