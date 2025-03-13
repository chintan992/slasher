"use client"

import { useRouter, usePathname } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface FilterBarProps {
  genres: { id: number; name: string }[]
  selectedGenre?: string
  selectedSort?: string
  mediaType?: "movie" | "tv"
}

export default function FilterBar({ genres, selectedGenre, selectedSort, mediaType = "movie" }: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleGenreChange = (value: string) => {
    const params = new URLSearchParams()
    if (value) params.set("genre", value)
    if (selectedSort) params.set("sort", selectedSort)

    const queryString = params.toString()
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`)
  }

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams()
    if (selectedGenre) params.set("genre", selectedGenre)
    if (value) params.set("sort", value)

    const queryString = params.toString()
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`)
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <Label htmlFor="genre-filter">Filter by Genre</Label>
        <Select value={selectedGenre || ""} onValueChange={handleGenreChange}>
          <SelectTrigger id="genre-filter">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort-filter">Sort by</Label>
        <Select value={selectedSort || ""} onValueChange={handleSortChange}>
          <SelectTrigger id="sort-filter">
            <SelectValue placeholder="Popularity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="release_date">{mediaType === "movie" ? "Release Date" : "First Air Date"}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  )
}

