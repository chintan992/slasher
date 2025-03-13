import { getMovieDetails, getMovieVideos } from "@/lib/tmdb"
import { notFound } from "next/navigation"
import VideoPlayer from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function WatchMoviePage({ params }: { params: { id: string } }) {
  try {
    const movie = await getMovieDetails(params.id)
    const videos = await getMovieVideos(params.id)

    // For demo purposes, we'll use a trailer if available, or a placeholder
    const videoSource = videos.results.find((v) => v.type === "Trailer")?.key || null

    return (
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/movies/${params.id}`}>
            <Button variant="ghost" className="text-white mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to details
            </Button>
          </Link>

          <h1 className="text-2xl font-bold text-white mb-4">{movie.title}</h1>

          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <VideoPlayer
              videoId={params.id}
              title={movie.title}
              trailerKey={null} // Set to null to use streaming sources instead of trailer
              type="movie"
            />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching movie for watch page:", error)
    notFound()
  }
}

