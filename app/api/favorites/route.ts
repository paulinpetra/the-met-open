import { NextResponse } from "next/server";

// a simple in-memory store for liked artworks since no DB (resets when server restarts)
//should stores favorites for user (just guest for now)
// map-key = userId or guest, value = Set of objectIDs (no duplicates)

const favoritesStore = new Map<string, Set<number>>()

export async function POST(request: Request) {
      const { objectID, userId = "guest" } = await request.json();
      
     if (typeof objectID !== "number") {
    return NextResponse.json({ error: "Invalid objectID" }, { status: 400 })
  }

    const current = favoritesStore.get(userId) ?? new Set<number>()
  
   // toggle heart
    let liked: boolean
     
    if (current.has(objectID)) {
    current.delete(objectID)
    liked = false
  } else {
    current.add(objectID)
    liked = true
  }

    favoritesStore.set(userId, current)

    return NextResponse.json({
    liked,
    favorites: Array.from(current),//convert set to array for JSON serialization
  })
}

//fetch all favorites for a user
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") ?? "guest"

  const current = favoritesStore.get(userId) ?? new Set<number>()

  return NextResponse.json({
    favorites: Array.from(current),
  })
}
