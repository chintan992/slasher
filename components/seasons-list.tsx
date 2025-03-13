import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Season {
  id: number
  name: string
  season_number: number
  episode_count: number
  poster_path: string | null
  overview: string | null
  air_date: string | null
}

interface SeasonsListProps {
  seasons: Season[]
  showId: string | number
}

export default function SeasonsList({ seasons, showId }: SeasonsListProps) {
  // Filter out season 0 (specials) if it exists
  const filteredSeasons = seasons.filter((season) => season.season_number > 0)

  if (!filteredSeasons.length) return null

  return (
    <Accordion type="single" collapsible className="w-full">
      {filteredSeasons.map((season) => {
        const posterUrl = season.poster_path
          ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
          : "/placeholder.svg?height=450&width=300"

        return (
          <AccordionItem key={season.id} value={`season-${season.season_number}`}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center text-left">
                <div className="w-12 h-12 rounded overflow-hidden mr-4 flex-shrink-0">
                  <Image
                    src={posterUrl || "/placeholder.svg"}
                    alt={season.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{season.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {season.episode_count} episodes
                    {season.air_date && ` • ${new Date(season.air_date).getFullYear()}`}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-16 space-y-4">
                {season.overview && <p className="text-sm text-muted-foreground">{season.overview}</p>}

                <Link href={`/watch/tv/${showId}/season/${season.season_number}/episode/1`}>
                  <Button size="sm" className="gap-1">
                    <PlayCircle className="h-4 w-4" />
                    Watch Season
                  </Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

