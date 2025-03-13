const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

// Helper function to make API requests
async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)

  // Add API key and other params
  url.searchParams.append("api_key", TMDB_API_KEY || "")
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  const response = await fetch(url.toString(), { next: { revalidate: 3600 } })

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Get trending movies or TV shows
export async function getTrending(mediaType: "movie" | "tv", timeWindow: "day" | "week" = "week") {
  return fetchFromTMDB(`/trending/${mediaType}/${timeWindow}`).then((data) => data.results)
}

// Get popular movies or TV shows
export async function getPopular(mediaType: "movie" | "tv") {
  return fetchFromTMDB(`/${mediaType}/popular`).then((data) => data.results)
}

// Get top rated movies or TV shows
export async function getTopRated(mediaType: "movie" | "tv") {
  return fetchFromTMDB(`/${mediaType}/top_rated`).then((data) => data.results)
}

// Get movie details
export async function getMovieDetails(movieId: string) {
  return fetchFromTMDB(`/movie/${movieId}`)
}

// Get TV show details
export async function getTvShowDetails(tvId: string) {
  return fetchFromTMDB(`/tv/${tvId}`)
}

// Get movie credits (cast & crew)
export async function getMovieCredits(movieId: string) {
  return fetchFromTMDB(`/movie/${movieId}/credits`)
}

// Get TV show credits
export async function getTvShowCredits(tvId: string) {
  return fetchFromTMDB(`/tv/${tvId}/credits`)
}

// Get similar movies
export async function getSimilarMovies(movieId: string) {
  return fetchFromTMDB(`/movie/${movieId}/similar`).then((data) => data.results)
}

// Get similar TV shows
export async function getSimilarTvShows(tvId: string) {
  return fetchFromTMDB(`/tv/${tvId}/similar`).then((data) => data.results)
}

// Get movie videos (trailers, teasers, etc.)
export async function getMovieVideos(movieId: string) {
  return fetchFromTMDB(`/movie/${movieId}/videos`)
}

// Get TV show videos
export async function getTvShowVideos(tvId: string) {
  return fetchFromTMDB(`/tv/${tvId}/videos`)
}

// Get TV show season details
export async function getTvSeasonDetails(tvId: string, seasonNumber: string) {
  return fetchFromTMDB(`/tv/${tvId}/season/${seasonNumber}`)
}

// Get TV show episode details
export async function getTvEpisodeDetails(tvId: string, seasonNumber: string, episodeNumber: string) {
  return fetchFromTMDB(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`)
}

export async function getTvEpisodeVideos(showId: string, seasonNumber: string, episodeNumber: string) {
  return fetchFromTMDB(`/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/videos`)
}

// Search for movies or TV shows
export async function searchContent(
  query: string,
  type: "movie" | "tv" | "multi" = "multi",
  options: Record<string, string> = {},
) {
  return fetchFromTMDB(`/search/${type}`, { query, ...options }).then((data) => data.results)
}

// Get genres for movies or TV shows
export async function getGenres(mediaType: "movie" | "tv") {
  return fetchFromTMDB(`/genre/${mediaType}/list`).then((data) => data.genres)
}

// Discover movies or TV shows with filters
export async function discoverContent(mediaType: "movie" | "tv", options: Record<string, string> = {}) {
  return fetchFromTMDB(`/discover/${mediaType}`, options).then((data) => data.results)
}

