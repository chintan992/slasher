"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ContentCardProps {
  item: any
  type: "movie" | "tv"
  className?: string
}

export default function ContentCard({ item, type, className }: ContentCardProps) {
  const title = item.title || item.name || ""
  const posterPath = item.poster_path
  const id = item.id

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "/placeholder.svg?height=750&width=500"

  const detailsUrl = type === "movie" ? `/movies/${id}` : `/tv/${id}`

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
      <Link href={detailsUrl}>
        <Card className={cn("w-[180px] transition-all duration-200 group", className)}>
          <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
            <Image src={posterUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
            <motion.div
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <PlayCircle className="h-12 w-12 text-white" />
            </motion.div>
          </div>
          <CardContent className="p-3">
            <h3 className="font-medium line-clamp-2 text-sm">{title}</h3>
            {item.release_date && (
              <p className="text-xs text-muted-foreground mt-1">{new Date(item.release_date).getFullYear()}</p>
            )}
            {item.first_air_date && (
              <p className="text-xs text-muted-foreground mt-1">{new Date(item.first_air_date).getFullYear()}</p>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

