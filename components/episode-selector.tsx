"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTvSeasonEpisodes } from "@/lib/tmdb-client"

interface Season {
  id: number
  name: string
  season_number: number
  episode_count: number
}

interface EpisodeSelectorProps {
  showId: string
  seasons: Season[]
  currentSeason: number
  currentEpisode: number
}

export default function EpisodeSelector({ showId, seasons, currentSeason, currentEpisode }: EpisodeSelectorProps) {
  const [selectedSeason, setSelectedSeason] = useState(currentSeason.toString())
  const [episodes, setEpisodes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSeasonChange = async (value: string) => {
    setSelectedSeason(value)

    try {
      setLoading(true)
      const seasonEpisodes = await getTvSeasonEpisodes(showId, value)
      setEpisodes(seasonEpisodes.episodes || [])
    } catch (error) {
      console.error("Error fetching episodes:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Episodes</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="w-full sm:w-1/3">
          <Select value={selectedSeason} onValueChange={handleSeasonChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent>
              {seasons
                .filter((season) => season.season_number > 0)
                .map((season) => (
                  <SelectItem key={season.id} value={season.season_number.toString()}>
                    {season.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : episodes.length > 0 ? (
        <div className="grid gap-2">
          {episodes.map((episode) => (
            <Link
              key={episode.id}
              href={`/watch/tv/${showId}/season/${selectedSeason}/episode/${episode.episode_number}`}
            >
              <div
                className={`p-3 rounded-md hover:bg-gray-800 transition-colors ${
                  Number.parseInt(selectedSeason) === currentSeason && episode.episode_number === currentEpisode
                    ? "bg-primary/20 border border-primary"
                    : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Episode {episode.episode_number}</p>
                    <p className="font-medium">{episode.name}</p>
                  </div>
                  {Number.parseInt(selectedSeason) === currentSeason && episode.episode_number === currentEpisode && (
                    <Button size="sm" variant="secondary">
                      Currently Playing
                    </Button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-4">
          {selectedSeason === currentSeason.toString()
            ? "Select a season to view episodes"
            : "No episodes found for this season"}
        </p>
      )}
    </div>
  )
}

