import { getTvShowDetails, getTvEpisodeDetails, getTvEpisodeVideos } from "@/lib/tmdb"
import { notFound } from "next/navigation"
import VideoPlayer from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { Viewport } from "next"
import EpisodeSelector from "@/components/episode-selector"

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

interface TvVideo {
  id: string
  key: string
  type: string
}

interface Season {
  season_number: number
  episode_count: number
}

export default async function WatchTvEpisodePage({
  params,
}: {
  params: {
    id: string
    seasonNumber: string
    episodeNumber: string
  }
}) {
  try {
    const show = await getTvShowDetails(params.id)
    const episode = await getTvEpisodeDetails(params.id, params.seasonNumber, params.episodeNumber)
    const videos = await getTvEpisodeVideos(params.id, params.seasonNumber, params.episodeNumber)

    const trailerKey = videos.results.find((v: TvVideo) => v.type === "Trailer")?.key || null

    const seasonNum = Number.parseInt(params.seasonNumber)
    const episodeNum = Number.parseInt(params.episodeNumber)

    // Calculate next and previous episodes
    const hasNextEpisode = episodeNum < show.seasons.find((s: Season) => s.season_number === seasonNum)?.episode_count!
    const hasPrevEpisode = episodeNum > 1 || seasonNum > 1

    let nextEpisodeUrl = ""
    let prevEpisodeUrl = ""

    if (hasNextEpisode) {
      nextEpisodeUrl = `/watch/tv/${params.id}/season/${seasonNum}/episode/${episodeNum + 1}`
    } else if (seasonNum < show.number_of_seasons) {
      nextEpisodeUrl = `/watch/tv/${params.id}/season/${seasonNum + 1}/episode/1`
    }

    if (episodeNum > 1) {
      prevEpisodeUrl = `/watch/tv/${params.id}/season/${seasonNum}/episode/${episodeNum - 1}`
    } else if (seasonNum > 1) {
      const prevSeasonEpisodeCount = show.seasons.find((s: Season) => s.season_number === seasonNum - 1)?.episode_count || 1
      prevEpisodeUrl = `/watch/tv/${params.id}/season/${seasonNum - 1}/episode/${prevSeasonEpisodeCount}`
    }

    return (
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/tv/${params.id}`}>
            <Button variant="ghost" className="text-white mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to show
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{show.name}</h1>
              <p className="text-gray-400">
                Season {seasonNum} Episode {episodeNum} - {episode.name}
              </p>
            </div>

            <div className="flex gap-2">
              {hasPrevEpisode && (
                <Link href={prevEpisodeUrl}>
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                </Link>
              )}

              {hasNextEpisode && (
                <Link href={nextEpisodeUrl}>
                  <Button variant="outline" size="sm">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6">
            <VideoPlayer
              videoId={`${params.id}-s${params.seasonNumber}e${params.episodeNumber}`}
              title={`${show.name} - ${episode.name}`}
              type="tv"
              showId={params.id}
              seasonNumber={params.seasonNumber}
              episodeNumber={params.episodeNumber}
            />
          </div>

          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-bold text-white mb-2">{episode.name}</h2>
            <p className="text-gray-300">{episode.overview}</p>
            <p className="text-gray-400 mt-2">Air date: {new Date(episode.air_date).toLocaleDateString()}</p>
          </div>

          <EpisodeSelector
            showId={params.id}
            seasons={show.seasons}
            currentSeason={seasonNum}
            currentEpisode={episodeNum}
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching TV episode for watch page:", error)
    notFound()
  }
}

