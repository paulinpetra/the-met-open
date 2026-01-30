import Image from "next/image";
import Link from "next/link";
import { MetArtwork } from "@/lib/met-types";

type ArtworkCardsProps = {
  artwork: MetArtwork;
};

export default function ArtworkCard({ artwork }: ArtworkCardsProps) {
  return (
    <li className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      <Link 
      href={`/artwork/${artwork.objectID}`}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900">
      <div className="relative aspect-square">
        <Image
          src={artwork.primaryImageSmall}
          alt={artwork.title}
          fill //expands to fill parent container
          className="object-cover"
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
        />
      </div>

      <div className="p-4">
        <h3 className="text-neutral-700 text-sm font-semibold leading-snug line-clamp-2">
          {artwork.title}
        </h3>
        <p className="mt-1 text-xs text-neutral-600">
          {artwork.artistDisplayName || "Unknown artist"}
        </p>
      </div>
      </Link>
    </li>
  );
}
