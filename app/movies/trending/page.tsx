import { getTrending, getGenres } from "@/lib/tmdb"
import ContentGrid from "@/components/content-grid"
import FilterBar from "@/components/filter-bar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trending Movies | Let's Stream",
  description: "Discover trending movies on Let's Stream",
}

export default async function TrendingMoviesPage({
  searchParams,
}: {
  searchParams: { genre?: string; sort?: string }
}) {
  const movies = await getTrending("movie")
  const genres = await getGenres("movie")

  // Filter by genre if specified
  const filteredMovies = searchParams.genre
    ? movies.filter((movie) => movie.genre_ids?.includes(Number.parseInt(searchParams.genre)))
    : movies

  // Sort movies if specified
  const sortedMovies = [...filteredMovies]
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case "popularity":
        sortedMovies.sort((a, b) => b.popularity - a.popularity)
        break
      case "rating":
        sortedMovies.sort((a, b) => b.vote_average - a.vote_average)
        break
      case "release_date":
        sortedMovies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
        break
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Trending Movies</h1>

      <FilterBar genres={genres} selectedGenre={searchParams.genre} selectedSort={searchParams.sort} />

      <div className="mt-8">
        <ContentGrid items={sortedMovies} type="movie" />
      </div>
    </div>
  )
}

