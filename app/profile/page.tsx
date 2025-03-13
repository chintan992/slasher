import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/auth"
import { getUserProfile, getUserWatchlist } from "@/lib/user"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContentGrid from "@/components/content-grid"
import { Edit, LogOut } from "lucide-react"
import { signOut } from "@/lib/actions"
import ProfileForm from "@/components/profile-form"

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session?.user) {
    redirect("/login?callbackUrl=/profile")
  }

  const profile = await getUserProfile(session.user.id)
  const watchlist = await getUserWatchlist(session.user.id)

  const movieWatchlist = watchlist.filter((item) => item.type === "movie")
  const tvWatchlist = watchlist.filter((item) => item.type === "tv")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
            <Image
              src={profile.avatar || `/placeholder.svg?height=128&width=128`}
              alt={profile.name || "User"}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{profile.name || session.user.email}</h1>
              {profile.bio && <p className="text-muted-foreground mt-2">{profile.bio}</p>}
              <p className="text-sm text-muted-foreground mt-1">
                Member since {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              <form action={signOut}>
                <Button variant="outline" size="sm" className="gap-1">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </form>

              <Button variant="outline" size="sm" className="gap-1">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          <ProfileForm user={profile} className="mt-8" />
        </div>
      </div>

      <Tabs defaultValue="movies" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="movies">Movies Watchlist</TabsTrigger>
          <TabsTrigger value="tv">TV Shows Watchlist</TabsTrigger>
        </TabsList>

        <TabsContent value="movies">
          {movieWatchlist.length > 0 ? (
            <ContentGrid items={movieWatchlist} type="movie" />
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">Your movie watchlist is empty</p>
              <Button className="mt-4" asChild>
                <a href="/movies/trending">Discover Movies</a>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="tv">
          {tvWatchlist.length > 0 ? (
            <ContentGrid items={tvWatchlist} type="tv" />
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">Your TV show watchlist is empty</p>
              <Button className="mt-4" asChild>
                <a href="/tv/trending">Discover TV Shows</a>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

