import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}

interface CastListProps {
  cast: CastMember[]
}

export default function CastList({ cast }: CastListProps) {
  if (!cast.length) return null

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4">
        {cast.map((person) => {
          const profileUrl = person.profile_path
            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
            : "/placeholder.svg?height=185&width=185"

          return (
            <div key={person.id} className="w-[150px] flex-shrink-0">
              <div className="rounded-md overflow-hidden">
                <Image
                  src={profileUrl || "/placeholder.svg"}
                  alt={person.name}
                  width={150}
                  height={225}
                  className="object-cover aspect-[2/3]"
                />
              </div>
              <div className="mt-2">
                <p className="font-medium text-sm">{person.name}</p>
                <p className="text-xs text-muted-foreground">{person.character}</p>
              </div>
            </div>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

