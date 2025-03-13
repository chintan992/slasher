"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getAvailableVideoSources } from "@/lib/video-api"
import type { VideoSourceKey } from "@/lib/video-sources"

export default function VideoSourceSettings() {
  const [preferredSource, setPreferredSource] = useState<VideoSourceKey>("vidsrc")
  const sources = getAvailableVideoSources()

  // Load preferred source from localStorage on mount
  useEffect(() => {
    const savedSource = localStorage.getItem("preferredVideoSource") as VideoSourceKey
    if (savedSource) {
      setPreferredSource(savedSource)
    }
  }, [])

  // Save preferred source to localStorage when changed
  const handleSourceChange = (value: string) => {
    const sourceKey = value as VideoSourceKey
    setPreferredSource(sourceKey)
    localStorage.setItem("preferredVideoSource", sourceKey)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <Settings className="h-4 w-4" />
          Video Sources
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Video Source Settings</DialogTitle>
          <DialogDescription>
            Select your preferred video source for streaming movies and TV shows. This will be used as the default
            source when watching content.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup value={preferredSource} onValueChange={handleSourceChange}>
            {sources.map((source) => (
              <div key={source.key} className="flex items-start space-x-2 mb-3">
                <RadioGroupItem value={source.key} id={source.key} />
                <div className="grid gap-1">
                  <Label htmlFor={source.key} className="font-medium">
                    {source.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">{source.quality}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </DialogContent>
    </Dialog>
  )
}

