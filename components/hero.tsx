"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PlayCircle, Info } from "lucide-react"
import Link from "next/link"
import { getFeaturedContent } from "@/lib/tmdb-client"

interface FeaturedItem {
  id: number
  title: string
  overview: string
  backdrop_path: string
  type: "movie" | "tv"
}

export default function Hero() {
  const [featured, setFeatured] = useState<FeaturedItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await getFeaturedContent()
        setFeatured(data)
      } catch (error) {
        console.error("Failed to load featured content:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFeatured()
  }, [])

  if (loading) {
    return <div className="w-full h-[70vh] bg-gradient-to-b from-gray-900 to-background animate-pulse" />
  }

  if (!featured) return null

  const backdropUrl = featured.backdrop_path
    ? `https://image.tmdb.org/t/p/original${featured.backdrop_path}`
    : "/placeholder.svg?height=1080&width=1920"

  const detailsUrl = featured.type === "movie" ? `/movies/${featured.id}` : `/tv/${featured.id}`

  const watchUrl =
    featured.type === "movie" ? `/watch/movie/${featured.id}` : `/watch/tv/${featured.id}/season/1/episode/1`

  return (
    <div className="relative w-full h-[70vh]">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <Image src={backdropUrl || "/placeholder.svg"} alt={featured.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="container relative h-full mx-auto px-4 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{featured.title}</h1>
          <p className="text-lg mb-8 line-clamp-3">{featured.overview}</p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href={watchUrl} className="gap-2">
                <PlayCircle className="h-5 w-5" />
                Watch Now
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href={detailsUrl} className="gap-2">
                <Info className="h-5 w-5" />
                More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

