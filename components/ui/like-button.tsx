"use client"

import { useEffect, useState } from "react";

export function LikeButton({ objectID }: { objectID: number }) {
const [liked, setLiked] = useState(false);
const [loading, setLoading] = useState(false)
    
// load initial like state
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/favorites?userId=guest")
      const data = await res.json()
      setLiked(data.favorites.includes(objectID))
    }
    load()
  }, [objectID])

  async function toggleFavorite(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();  // prevent click bubbling to card

    setLoading(true);

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objectID, userId: "guest" }),
      })

      const data = await res.json();
      setLiked(data.liked);
    } finally {
      setLoading(false);
    }
  }

  return (
<button
  type="button"
  onClick={toggleFavorite}
  disabled={loading}
  aria-label={liked ? "Remove from favorites" : "Add to favorites"}
  className="p-2 rounded-full bg-white shadow hover:scale-105"
>
  {liked ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-red-600"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <title>Remove from favorites</title> 
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <title>Add to favorites</title> 
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8.5c0-2.5 2-4.5 4.5-4.5 1.7 0 3.1 1 3.5 2.3C12.4 5 13.8 4 15.5 4 18 4 20 6 20 8.5c0 3.5-3.5 6.5-8 11-4.5-4.5-8-7.5-8-11z"/>
    </svg>
  )}
</button>
  )
}