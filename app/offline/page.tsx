import { Button } from "@/components/ui/button"
import { Wifi, WifiOff } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <WifiOff className="h-16 w-16 mb-6 text-muted-foreground" />
      <h1 className="text-3xl font-bold mb-4">You're offline</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        It looks like you're not connected to the internet. Check your connection and try again.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">
            <Wifi className="mr-2 h-4 w-4" />
            Try Again
          </Link>
        </Button>
      </div>
    </div>
  )
}

