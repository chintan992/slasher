"use client"

import { useState, useEffect } from "react"
import { getVideoSource, getAvailableVideoSources } from "@/lib/video-api"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { VideoSourceKey } from "@/lib/video-sources"
import { Settings } from "lucide-react"
import { getIframeSrc } from "@/lib/video-sources"
import VideoSourceSelector from "./video-source-selector"

interface VideoPlayerProps {
  videoId: string
  title: string
  trailerKey?: string | null
  type: "movie" | "tv"
  showId?: string
  seasonNumber?: string
  episodeNumber?: string
}

export default function VideoPlayer({
  videoId,
  title,
  trailerKey,
  type,
  showId,
  seasonNumber,
  episodeNumber,
}: VideoPlayerProps) {
  const [currentSource, setCurrentSource] = useState<VideoSourceKey>(() => {
    // Try to get the saved source from localStorage, fallback to "multiembed"
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('preferred-video-source') as VideoSourceKey) || "multiembed"
    }
    return "multiembed"
  })
  const [iframeKey, setIframeKey] = useState(0)

  const iframeSrc = getIframeSrc({
    type: type === "tv" ? "series" : "movie",
    apiType: currentSource,
    movieId: type === "movie" ? videoId : undefined,
    seriesId: type === "tv" ? showId : undefined,
    season: seasonNumber,
    episodeNo: episodeNumber,
  })

  // Force iframe reload when source changes
  const handleSourceChange = (source: VideoSourceKey) => {
    setCurrentSource(source)
    setIframeKey((prev) => prev + 1)
    // Save the preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-video-source', source)
    }
  }

  return (
    <div className="relative w-full h-full">
      <VideoSourceSelector currentSource={currentSource} onSourceChange={handleSourceChange} />
      <iframe
        key={iframeKey}
        src={iframeSrc}
        title={title}
        allowFullScreen
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  )
}

