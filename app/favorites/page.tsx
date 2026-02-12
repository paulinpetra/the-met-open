import ArtworkGrid from "@/components/layout/artwork-grid";
import { getAsianArtObjectById } from "@/lib/met-api";

// helper to get the absolute URL for server-side fetch
function getBaseUrl() {
  // use environment variable in production, fallback to localhost in dev
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

async function getFavoriteIDs(): Promise<number[]> {
  const res = await fetch(`${getBaseUrl()}/api/favorites`, {
    cache: "no-store", 
  });

  if (!res.ok) return [];

  const data: { favorites: number[] } = await res.json();
  return data.favorites;
}

export default async function FavoritesPage() {
  const ids = await getFavoriteIDs();

  if (ids.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>
        <p>You haven’t liked any artworks yet ❤️</p>
      </main>
    );
  }

  const artworks = await Promise.all(ids.map((id) => getAsianArtObjectById(id)));

  // map to MetArtwork shape for the grid (reuse existing component)
  const gridArtworks = artworks.map((a) => ({
    objectID: a.objectID,
    title: a.title,
    primaryImageSmall: a.primaryImageSmall,
    artistDisplayName: a.artistDisplayName,
  }));

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Your Favorites ❤️</h1>
      <ArtworkGrid artworks={gridArtworks} />
    </main>
  );
}
