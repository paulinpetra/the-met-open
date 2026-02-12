import { NextResponse } from "next/server";

// a simple in-memory store for liked artworks since no DB (resets when server restarts)
//should stores favorites for user (just guest for now)
// map-key = userId or guest, value = Set of objectIDs (no duplicates)

const favoritesStore = new Map<string, Set<number>>()

export async function POST(request: Request) {
const { objectID, userId = "guest" } = await request.json();//destructure objectID and userId from request body, default userId to "guest"
//validate objectID      
     if (typeof objectID !== "number") {
    return NextResponse.json({ error: "Invalid objectID" }, { status: 400 })
  }
//get current favorites for user, or initialize empty set if none
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
//update store with new favorites set 
    favoritesStore.set(userId, current)
//return new state
    return NextResponse.json({
    liked,
    favorites: Array.from(current),//convert set to array for JSON serialization
  })
}

//fetch all favorites for a user
export async function GET(request: Request) {
  //extract userId from query params, default to "guest"
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") ?? "guest"
//get current favorites for user, or empty set if none
  const current = favoritesStore.get(userId) ?? new Set<number>()

  return NextResponse.json({
    favorites: Array.from(current),
  })
}
