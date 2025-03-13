"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { VIDEO_SOURCES, VideoSourceKey } from "@/lib/video-sources"
import { Settings } from "lucide-react"

interface VideoSourceSelectorProps {
  currentSource: VideoSourceKey
  onSourceChange: (source: VideoSourceKey) => void
}

export default function VideoSourceSelector({ currentSource, onSourceChange }: VideoSourceSelectorProps) {
  const currentSourceData = VIDEO_SOURCES[currentSource]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-50 bg-black/50 hover:bg-black/70">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Video Source: {currentSourceData.name}</DropdownMenuLabel>
        {Object.entries(VIDEO_SOURCES).map(([key, source]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onSourceChange(key as VideoSourceKey)}
            className="flex justify-between"
          >
            <span>{source.name}</span>
            <span className="text-xs text-muted-foreground">{source.quality}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}