import { getMovieDetails } from "@/lib/tmdb"
import { notFound } from "next/navigation"
import VideoPlayer from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function WatchMoviePage({ params }: { params: { id: string } }) {
  try {
    const movie = await getMovieDetails(params.id)

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

