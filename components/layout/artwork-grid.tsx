import { MetArtwork } from "@/lib/met-types";
import ArtworkCard from "../ui/artwork-card";

type ArtworkGridProps = {
  artworks: MetArtwork[];
};

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.objectID} artwork={artwork} />
      ))}
    </ul>
  );
}
