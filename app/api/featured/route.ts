import { NextResponse } from "next/server"
import { getTrending } from "@/lib/tmdb"

export async function GET() {
  try {
    // Get trending movies and TV shows
    const trendingMovies = await getTrending("movie")
    const trendingTvShows = await getTrending("tv")

    // Combine and shuffle
    const combined = [
      ...trendingMovies.map((item) => ({ ...item, type: "movie" })),
      ...trendingTvShows.map((item) => ({ ...item, type: "tv" })),
    ]

    // Shuffle array
    const shuffled = combined.sort(() => 0.5 - Math.random())

    // Pick a random item with a good backdrop
    const featured = shuffled.find((item) => item.backdrop_path) || shuffled[0]

    return NextResponse.json(featured)
  } catch (error) {
    console.error("Error fetching featured content:", error)
    return NextResponse.json({ error: "Failed to fetch featured content" }, { status: 500 })
  }
}

