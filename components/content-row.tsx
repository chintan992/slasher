"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import ContentCard from "./content-card"

interface ContentRowProps {
  title: string
  items: any[]
  type: "movie" | "tv"
  viewMoreHref?: string
}

export default function ContentRow({ title, items, type, viewMoreHref }: ContentRowProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const rowRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    const container = rowRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * 0.75
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount)

    container.scrollTo({ left: newPosition, behavior: "smooth" })
    setScrollPosition(newPosition)
  }

  const handleScroll = () => {
    if (rowRef.current) {
      setScrollPosition(rowRef.current.scrollLeft)
    }
  }

  const canScrollLeft = scrollPosition > 0
  const canScrollRight = rowRef.current
    ? scrollPosition < rowRef.current.scrollWidth - rowRef.current.clientWidth - 10
    : false

  if (!items.length) return null

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>

        {viewMoreHref && (
          <Button variant="ghost" size="sm" asChild>
            <Link href={viewMoreHref} className="gap-1">
              View More
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="relative group">
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        <div ref={rowRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4" onScroll={handleScroll}>
          {items.map((item) => (
            <ContentCard key={item.id} item={item} type={item.media_type || type} />
          ))}
        </div>

        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}

