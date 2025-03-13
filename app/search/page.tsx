import { searchContent, discoverContent, getGenres } from "@/lib/tmdb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContentGrid from "@/components/content-grid"
import SearchForm from "@/components/search-form"
import AdvancedSearchForm from "@/components/advanced-search-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search | Let's Stream",
  description: "Search for movies and TV shows on Let's Stream",
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    query?: string
    type?: string
    advanced?: string
    genre?: string
    year?: string
    rating?: string
    language?: string
  }
}) {
  const query = searchParams.query || ""
  const type = searchParams.type || "all"
  const isAdvanced = searchParams.advanced === "true"

  let movieResults: any[] = []
  let tvResults: any[] = []

  const movieGenres = await getGenres("movie")
  const tvGenres = await getGenres("tv")

  if (query && !isAdvanced) {
    // Basic search
    if (type === "all" || type === "movie") {
      movieResults = await searchContent(query, "movie")
    }

    if (type === "all" || type === "tv") {
      tvResults = await searchContent(query, "tv")
    }
  } else if (isAdvanced) {
    // Advanced search using discover endpoint
    const options: Record<string, string> = {}

    if (searchParams.genre) {
      options.with_genres = searchParams.genre
    }

    if (searchParams.year) {
      if (type === "movie" || type === "all") {
        options.primary_release_year = searchParams.year
      } else {
        options.first_air_date_year = searchParams.year
      }
    }

    if (searchParams.rating) {
      options.vote_average_gte = searchParams.rating
    }

    if (searchParams.language) {
      options.with_original_language = searchParams.language
    }

    if (query) {
      options.with_text_query = query
    }

    if (type === "movie" || type === "all") {
      movieResults = await discoverContent("movie", options)
    }

    if (type === "tv" || type === "all") {
      tvResults = await discoverContent("tv", options)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <Tabs defaultValue={isAdvanced ? "advanced" : "basic"} className="w-full mb-8">
        <TabsList>
          <TabsTrigger value="basic">Basic Search</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Search</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <SearchForm initialQuery={query} initialType={type} />
        </TabsContent>

        <TabsContent value="advanced">
          <AdvancedSearchForm
            initialQuery={query}
            initialType={type}
            initialGenre={searchParams.genre}
            initialYear={searchParams.year}
            initialRating={searchParams.rating}
            initialLanguage={searchParams.language}
            movieGenres={movieGenres}
            tvGenres={tvGenres}
          />
        </TabsContent>
      </Tabs>

      {query || isAdvanced ? (
        <div>
          <Tabs defaultValue={type} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all" asChild>
                <a
                  href={`/search?${new URLSearchParams({
                    ...(query ? { query } : {}),
                    type: "all",
                    ...(isAdvanced ? { advanced: "true", ...filterParams(searchParams) } : {}),
                  })}`}
                >
                  All
                </a>
              </TabsTrigger>
              <TabsTrigger value="movie" asChild>
                <a
                  href={`/search?${new URLSearchParams({
                    ...(query ? { query } : {}),
                    type: "movie",
                    ...(isAdvanced ? { advanced: "true", ...filterParams(searchParams) } : {}),
                  })}`}
                >
                  Movies
                </a>
              </TabsTrigger>
              <TabsTrigger value="tv" asChild>
                <a
                  href={`/search?${new URLSearchParams({
                    ...(query ? { query } : {}),
                    type: "tv",
                    ...(isAdvanced ? { advanced: "true", ...filterParams(searchParams) } : {}),
                  })}`}
                >
                  TV Shows
                </a>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {movieResults.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Movies</h2>
                  <ContentGrid items={movieResults} type="movie" />
                </div>
              )}

              {tvResults.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">TV Shows</h2>
                  <ContentGrid items={tvResults} type="tv" />
                </div>
              )}

              {movieResults.length === 0 && tvResults.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No results found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="movie">
              {movieResults.length > 0 ? (
                <ContentGrid items={movieResults} type="movie" />
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No movie results found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tv">
              {tvResults.length > 0 ? (
                <ContentGrid items={tvResults} type="tv" />
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No TV show results found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            Enter a search term or use advanced filters to find movies and TV shows
          </p>
        </div>
      )}
    </div>
  )
}

// Helper function to filter out non-filter params
function filterParams(params: Record<string, string | undefined>) {
  const filterKeys = ["genre", "year", "rating", "language"]
  return Object.fromEntries(
    Object.entries(params).filter(([key, value]) => filterKeys.includes(key) && value !== undefined),
  )
}

