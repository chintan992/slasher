"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface SearchFormProps {
  initialQuery?: string
  initialType?: string
}

export default function SearchForm({ initialQuery = "", initialType = "all" }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const [type, setType] = useState(initialType)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}&type=${type}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <Button type="submit">Search</Button>
      </div>

      <RadioGroup value={type} onValueChange={setType} className="flex space-x-4">
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
    </form>
  )
}

