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
    <button type="button" onClick={toggleFavorite}
     disabled={loading} aria-label={liked ? "Remove from favorites" : "Add to favorites"}
 className="text-xl">
      {liked ? "❤️" : "🤍"} 
    </button>
  )
}