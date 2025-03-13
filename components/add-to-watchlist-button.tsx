"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "@/lib/actions"
import { toast } from "sonner"

interface AddToWatchlistButtonProps {
  id: number
  title: string
  type: "movie" | "tv"
  poster: string | null
}

export default function AddToWatchlistButton({ id, title, type, poster }: AddToWatchlistButtonProps) {
  const { user } = useAuth()
  const [inWatchlist, setInWatchlist] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkWatchlist = async () => {
      if (!user) return

      try {
        const result = await isInWatchlist(id, type)
        setInWatchlist(result)
      } catch (error) {
        console.error("Error checking watchlist:", error)
      }
    }

    checkWatchlist()
  }, [id, type, user])

  const handleToggleWatchlist = async () => {
    if (!user) {
      window.location.href = `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
      return
    }

    try {
      setLoading(true)

      if (inWatchlist) {
        await removeFromWatchlist(id, type)
        toast.success("Removed from watchlist", {
          description: `${title} has been removed from your watchlist.`,
        })
      } else {
        await addToWatchlist({
          id,
          title,
          type,
          poster,
        })
        toast.success("Added to watchlist", {
          description: `${title} has been added to your watchlist.`,
        })
      }

      setInWatchlist(!inWatchlist)
    } catch (error) {
      console.error("Error toggling watchlist:", error)
      toast.error("Error", {
        description: "Failed to update watchlist. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={handleToggleWatchlist} disabled={loading}>
      {inWatchlist ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
    </Button>
  )
}

