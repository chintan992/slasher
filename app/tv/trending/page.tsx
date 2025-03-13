import { getTrending, getGenres } from "@/lib/tmdb"
import ContentGrid from "@/components/content-grid"
import FilterBar from "@/components/filter-bar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trending TV Shows | Let's Stream",
  description: "Discover trending TV shows on Let's Stream",
}

export default async function TrendingTvShowsPage({
  searchParams,
}: {
  searchParams: { genre?: string; sort?: string }
}) {
  const tvShows = await getTrending("tv")
  const genres = await getGenres("tv")

  // Filter by genre if specified
  const filteredShows = searchParams.genre
    ? tvShows.filter((show) => show.genre_ids?.includes(Number.parseInt(searchParams.genre)))
    : tvShows

  // Sort shows if specified
  const sortedShows = [...filteredShows]
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case "popularity":
        sortedShows.sort((a, b) => b.popularity - a.popularity)
        break
      case "rating":
        sortedShows.sort((a, b) => b.vote_average - a.vote_average)
        break
      case "release_date":
        sortedShows.sort((a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime())
        break
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Trending TV Shows</h1>

      <FilterBar genres={genres} selectedGenre={searchParams.genre} selectedSort={searchParams.sort} mediaType="tv" />

      <div className="mt-8">
        <ContentGrid items={sortedShows} type="tv" />
      </div>
    </div>
  )
}

