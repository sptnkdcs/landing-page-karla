"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

const GOOGLE_REVIEW_URL = "https://g.page/r/CYZRVdO-RniwEBM/review"

const STATIC_REVIEWS: Review[] = [
  {
    name: "Danieli Banardi",
    rating: 5,
    text: "Dra. Karla é aquela médica que você sente como parte da família, sempre atenciosa, ouve com atenção e transmite a informação com respeito e carinho. Recomendo de olhos fechados!",
    image: "",
    reviewUrl: GOOGLE_REVIEW_URL,
  },
  {
    name: "Leticia Cesar",
    rating: 5,
    text: "A Dra. Karla foi um verdadeiro anjo em minha vida. Em um momento extremamente delicado, encontrei nela toda a delicadeza, atenção e cuidado que eu precisava. Sou eternamente grata.",
    image: "",
    reviewUrl: GOOGLE_REVIEW_URL,
  },
  {
    name: "Giovanna Martins",
    rating: 5,
    text: "Minha consulta com a Dra. Karla foi simplesmente maravilhosa! Ela é um amor de pessoa, super simpática e acolhedora. Eu tinha muitas dúvidas e saí de lá completamente tranquila.",
    image: "",
    reviewUrl: GOOGLE_REVIEW_URL,
  },
  {
    name: "Natalia Coelho",
    rating: 5,
    text: "Felizmente tive um pré-natal tranquilo apesar de ser alto risco, tive todas as minhas dúvidas respondidas. Meu parto foi inesquecível, pude escolher cada detalhe. Gratidão eterna!",
    image: "/images/natalia-coelho.jpg",
    reviewUrl: GOOGLE_REVIEW_URL,
  },
]

type Review = {
  name: string
  rating: number
  text: string
  image?: string
  time?: string
  reviewUrl?: string
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
      ))}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm animate-pulse">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-4 w-4 rounded bg-gray-200" />)}
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-28 rounded bg-gray-200" />
          <div className="h-3 w-16 rounded bg-gray-200" />
        </div>
      </div>
      <div className="space-y-2 flex-1">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-3/4 rounded bg-gray-200" />
      </div>
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const link = review.reviewUrl || GOOGLE_REVIEW_URL

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <Stars rating={review.rating} />

      <div className="mt-4 flex items-center gap-3">
        {review.image ? (
          <img
            src={review.image}
            alt={`Foto de ${review.name}`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover shrink-0"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c0a080] text-sm font-semibold text-white">
            {review.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-medium text-gray-800 leading-tight truncate">{review.name}</p>
          {review.time && <p className="text-xs text-gray-400 mt-0.5">{review.time}</p>}
        </div>
      </div>

      {review.text ? (
        <p className="mt-4 text-sm leading-relaxed text-gray-600 line-clamp-5">{review.text}</p>
      ) : (
        <p className="mt-4 text-sm italic text-gray-400">Avaliou com {review.rating} estrelas.</p>
      )}

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
      >
        <GoogleIcon />
        Ver no Google
      </a>
    </div>
  )
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch("/api/reviews")
      .then(r => r.json())
      .then(data => setReviews(data.reviews?.length ? data.reviews : STATIC_REVIEWS))
      .catch(() => setReviews(STATIC_REVIEWS))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    return () => { api.off("select", onSelect) }
  }, [api])

  useEffect(() => {
    if (api && reviews.length) {
      api.reInit()
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap())
    }
  }, [api, reviews])

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-10 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: reviews.length > 4 }}
        className="w-full px-10 sm:px-12"
      >
        <CarouselContent className="-ml-3 sm:-ml-4">
          {reviews.map((review, i) => (
            <CarouselItem key={i} className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para o depoimento ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-2 w-2 rounded-full transition-colors ${i === current ? "bg-[#8a7267]" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  )
}
