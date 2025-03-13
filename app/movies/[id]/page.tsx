import { getMovieDetails, getMovieCredits, getSimilarMovies } from "@/lib/tmdb"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PlayCircle, Share2 } from "lucide-react"
import Link from "next/link"
import ContentRow from "@/components/content-row"
import CastList from "@/components/cast-list"
import AddToWatchlistButton from "@/components/add-to-watchlist-button"

export default async function MoviePage({ params }: { params: { id: string } }) {
  try {
    const movie = await getMovieDetails(params.id)
    const credits = await getMovieCredits(params.id)
    const similarMovies = await getSimilarMovies(params.id)

    const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/placeholder.svg?height=750&width=500"

    return (
      <div>
        {/* Backdrop with gradient overlay */}
        {backdropUrl && (
          <div className="relative h-[50vh] w-full">
            <Image src={backdropUrl || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        )}

        <div className="container px-4 mx-auto -mt-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 mb-12">
            {/* Poster */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src={posterUrl || "/placeholder.svg"}
                alt={movie.title}
                width={300}
                height={450}
                className="w-full h-auto"
              />
            </div>

            {/* Details */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>

              <div className="flex flex-wrap gap-2 text-sm">
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span>•</span>
                <span>{movie.runtime} min</span>
                <span>•</span>
                <div className="flex gap-2">
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className="bg-primary/10 px-2 py-1 rounded-md">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground px-2 py-1 rounded font-bold">
                  {movie.vote_average.toFixed(1)}
                </div>
                <span className="text-muted-foreground">{movie.vote_count.toLocaleString()} votes</span>
              </div>

              <p className="text-lg">{movie.overview}</p>

              <div className="flex flex-wrap gap-3 pt-4">
                <Link href={`/watch/movie/${movie.id}`}>
                  <Button size="lg" className="gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Watch Now
                  </Button>
                </Link>

                <AddToWatchlistButton id={movie.id} title={movie.title} type="movie" poster={movie.poster_path} />

                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Cast */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <CastList cast={credits.cast.slice(0, 10)} />
          </div>

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <div className="mb-12">
              <ContentRow title="Similar Movies" items={similarMovies} type="movie" />
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching movie details:", error)
    notFound()
  }
}

