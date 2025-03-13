"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, PlayCircle, Info } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CarouselItem {
  id: number
  title: string
  name?: string
  overview: string
  backdrop_path: string
  poster_path: string
  media_type?: "movie" | "tv"
}

interface FeaturedCarouselProps {
  items: CarouselItem[]
}

export default function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }, [items.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }, [items.length])

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(goToNext, 6000)
    return () => clearInterval(interval)
  }, [goToNext, isAutoPlaying])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  if (!items.length) return null

  const currentItem = items[currentIndex]
  const title = currentItem.title || currentItem.name || ""
  const type = currentItem.media_type || (currentItem.title ? "movie" : "tv")

  const backdropUrl = currentItem.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`
    : "/placeholder.svg?height=1080&width=1920"

  const detailsUrl = type === "movie" ? `/movies/${currentItem.id}` : `/tv/${currentItem.id}`

  const watchUrl =
    type === "movie" ? `/watch/movie/${currentItem.id}` : `/watch/tv/${currentItem.id}/season/1/episode/1`

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[21/9] w-full">
        <Image
          src={backdropUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-sm mb-4 line-clamp-2">{currentItem.overview}</p>

            <div className="flex gap-3">
              <Button size="sm" asChild>
                <Link href={watchUrl} className="gap-1">
                  <PlayCircle className="h-4 w-4" />
                  Watch
                </Link>
              </Button>

              <Button variant="outline" size="sm" asChild>
                <Link href={detailsUrl} className="gap-1">
                  <Info className="h-4 w-4" />
                  Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex ? "bg-white w-4" : "bg-white/50",
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

