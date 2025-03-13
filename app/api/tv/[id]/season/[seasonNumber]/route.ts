import { NextResponse } from "next/server"
import { getTvSeasonDetails } from "@/lib/tmdb"

export async function GET(request: Request, { params }: { params: { id: string; seasonNumber: string } }) {
  try {
    const { id, seasonNumber } = params

    const seasonDetails = await getTvSeasonDetails(id, seasonNumber)

    return NextResponse.json(seasonDetails)
  } catch (error) {
    console.error("Error fetching season details:", error)
    return NextResponse.json({ error: "Failed to fetch season details" }, { status: 500 })
  }
}

