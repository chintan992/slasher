export async function getFeaturedContent() {
  try {
    const response = await fetch("/api/featured")

    if (!response.ok) {
      throw new Error("Failed to fetch featured content")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching featured content:", error)

    // Fallback data in case of error
    return {
      id: 550,
      title: "Fight Club",
      overview:
        "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
      backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
      type: "movie",
    }
  }
}

// Get TV season episodes
export async function getTvSeasonEpisodes(showId: string, seasonNumber: string) {
  try {
    const response = await fetch(`/api/tv/${showId}/season/${seasonNumber}`)

    if (!response.ok) {
      throw new Error("Failed to fetch season episodes")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching season episodes:", error)
    return { episodes: [] }
  }
}

