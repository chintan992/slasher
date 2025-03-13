import Hero from "@/components/hero"
import FeaturedCarousel from "@/components/featured-carousel"
import ContentRow from "@/components/content-row"
import { getTrending, getPopular, getTopRated } from "@/lib/tmdb"

export default async function Home() {
  const trendingMovies = await getTrending("movie")
  const trendingShows = await getTrending("tv")
  const popularMovies = await getPopular("movie")
  const popularShows = await getPopular("tv")
  const topRatedMovies = await getTopRated("movie")

  return (
    <div className="pb-10">
      <Hero />
      <div className="container px-4 mx-auto space-y-12 mt-8">
        <FeaturedCarousel items={trendingMovies.slice(0, 10)} />

        <ContentRow title="Trending Movies" items={trendingMovies} type="movie" viewMoreHref="/movies/trending" />

        <ContentRow title="Trending TV Shows" items={trendingShows} type="tv" viewMoreHref="/tv/trending" />

        <ContentRow title="Popular Movies" items={popularMovies} type="movie" viewMoreHref="/movies/popular" />

        <ContentRow title="Popular TV Shows" items={popularShows} type="tv" viewMoreHref="/tv/popular" />

        <ContentRow title="Top Rated Movies" items={topRatedMovies} type="movie" viewMoreHref="/movies/top-rated" />
      </div>
    </div>
  )
}

