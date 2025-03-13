import { getIframeSrc, VIDEO_SOURCES, type VideoSourceKey } from "./video-sources"

interface VideoSourceParams {
  type: "movie" | "tv"
  id: string
  showId?: string
  seasonNumber?: string
  episodeNumber?: string
  sourceKey?: VideoSourceKey
}

// Get video source for streaming
export async function getVideoSource(params: VideoSourceParams): Promise<string> {
  // Default to a source if none is specified
  const sourceKey = params.sourceKey || ("vidsrc" as VideoSourceKey)

  // Map the params to the format expected by getIframeSrc
  const mediaData = {
    type: params.type === "tv" ? "series" : "movie",
    apiType: sourceKey,
    movieId: params.type === "movie" ? params.id : undefined,
    seriesId: params.type === "tv" ? params.showId || params.id : undefined,
    season: params.seasonNumber,
    episodeNo: params.episodeNumber,
  }

  // Get the iframe source URL
  return getIframeSrc(mediaData)
}

// Get available video sources
export function getAvailableVideoSources() {
  return Object.entries(VIDEO_SOURCES).map(([key, value]) => ({
    key,
    name: value.name,
    quality: value.quality,
  }))
}

