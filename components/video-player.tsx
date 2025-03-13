"use client"

import { useState, useEffect } from "react"
import { getVideoSource, getAvailableVideoSources } from "@/lib/video-api"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { VideoSourceKey } from "@/lib/video-sources"
import { Settings } from "lucide-react"

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
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sourceKey, setSourceKey] = useState<VideoSourceKey>("vidsrc")
  const [showSourceSelector, setShowSourceSelector] = useState(false)

  const sources = getAvailableVideoSources()

  useEffect(() => {
    const loadVideoSource = async () => {
      try {
        setLoading(true)
        setError(null)

        // For demo purposes, we'll use a YouTube trailer if available
        if (trailerKey) {
          setVideoSrc(`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`)
          return
        }

        // Check for user's preferred source in localStorage
        const savedSource = localStorage.getItem("preferredVideoSource") as VideoSourceKey
        if (savedSource && !sourceKey) {
          setSourceKey(savedSource)
        }

        // Get the video source from the selected provider
        const source = await getVideoSource({
          type,
          id: videoId,
          showId,
          seasonNumber,
          episodeNumber,
          sourceKey: savedSource || sourceKey,
        })

        setVideoSrc(source)
      } catch (err) {
        console.error("Failed to load video source:", err)
        setError("Failed to load video. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadVideoSource()
  }, [videoId, trailerKey, type, showId, seasonNumber, episodeNumber, sourceKey])

  const handleSourceChange = (value: string) => {
    setSourceKey(value as VideoSourceKey)
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-center p-4">
        <div>
          <p className="text-red-500 mb-2">{error}</p>
          <p className="text-sm text-gray-400">Try refreshing the page or check your internet connection.</p>
        </div>
      </div>
    )
  }

  if (!videoSrc) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <p>No video source available</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <iframe
        src={videoSrc}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full aspect-video"
      />

      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="secondary"
          size="sm"
          className="opacity-70 hover:opacity-100"
          onClick={() => setShowSourceSelector(!showSourceSelector)}
        >
          <Settings className="h-4 w-4 mr-1" />
          Source
        </Button>

        {showSourceSelector && (
          <div className="absolute right-0 mt-2 p-3 bg-background border rounded-md shadow-lg w-64">
            <h3 className="font-medium mb-2">Select Source</h3>
            <Select value={sourceKey} onValueChange={handleSourceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a source" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source.key} value={source.key}>
                    <div className="flex flex-col">
                      <span>{source.name}</span>
                      <span className="text-xs text-muted-foreground">{source.quality}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  )
}

