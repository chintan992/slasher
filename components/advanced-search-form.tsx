"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"

interface AdvancedSearchFormProps {
  initialQuery?: string
  initialType?: string
  initialGenre?: string
  initialYear?: string
  initialRating?: string
  initialLanguage?: string
  movieGenres: { id: number; name: string }[]
  tvGenres: { id: number; name: string }[]
}

export default function AdvancedSearchForm({
  initialQuery = "",
  initialType = "all",
  initialGenre = "",
  initialYear = "",
  initialRating = "",
  initialLanguage = "",
  movieGenres,
  tvGenres,
}: AdvancedSearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const [type, setType] = useState(initialType)
  const [genre, setGenre] = useState(initialGenre)
  const [year, setYear] = useState(initialYear)
  const [rating, setRating] = useState(initialRating || "0")
  const [language, setLanguage] = useState(initialLanguage)
  const router = useRouter()

  // Get current year for the year dropdown
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 70 }, (_, i) => (currentYear - i).toString())

  // Languages
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "hi", name: "Hindi" },
    { code: "ru", name: "Russian" },
  ]

  // Get genres based on selected type
  const genres = type === "tv" ? tvGenres : type === "movie" ? movieGenres : [...movieGenres, ...tvGenres]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    params.set("advanced", "true")

    if (query.trim()) {
      params.set("query", query)
    }

    params.set("type", type)

    if (genre) {
      params.set("genre", genre)
    }

    if (year) {
      params.set("year", year)
    }

    if (Number.parseInt(rating) > 0) {
      params.set("rating", rating)
    }

    if (language) {
      params.set("language", language)
    }

    router.push(`/search?${params.toString()}`)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for movies, TV shows..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-base">Content Type</Label>
            <RadioGroup value={type} onValueChange={setType} className="flex space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="movie" id="movie" />
                <Label htmlFor="movie">Movies</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tv" id="tv" />
                <Label htmlFor="tv">TV Shows</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger id="genre">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Genre</SelectItem>
                {genres.map((g) => (
                  <SelectItem key={g.id} value={g.id.toString()}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="year">Release Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="year">
                <SelectValue placeholder="Any year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Year</SelectItem>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Any language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Language</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="rating">Minimum Rating: {rating}</Label>
          <span className="text-sm text-muted-foreground">{rating}/10</span>
        </div>
        <Slider
          id="rating"
          min={0}
          max={10}
          step={0.5}
          value={[Number.parseFloat(rating)]}
          onValueChange={(value) => setRating(value[0].toString())}
        />
      </div>

      <Button type="submit" className="w-full">
        Search
      </Button>
    </motion.form>
  )
}

