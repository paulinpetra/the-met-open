import Image from "next/image";
import { notFound } from "next/navigation";
import { getAsianArtObjectById } from "@/lib/met-api";
import type { MetArtworkDetail } from "@/lib/met-types";


type ArtworkDetailPageProps = {
  params: Promise<{ id: string }>; 
};

export default async function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
  const {id} = await params; //object destructuring, extract the id property into a variable named id
  const objectID = Number(id);

  //validate id, if not whole number or not positive
  if (!Number.isInteger(objectID) || objectID <= 0) {
    notFound();
    }

  // fetch artwork details
  const artwork: MetArtworkDetail = await getAsianArtObjectById(objectID);

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Artwork Image */}
        <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md">
          <Image
            src={artwork.primaryImageSmall}
            alt={artwork.title}
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>

        {/* Artwork Details */}
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
          <p className="text-sm text-neutral-600 mb-4">
            {artwork.artistDisplayName || "Unknown artist"}
          </p>

          <ul className="text-neutral-700 space-y-1 text-sm">
            {artwork.culture && (
              <li>
                <strong>Culture:</strong> {artwork.culture}
              </li>
            )}
            {artwork.period && (
              <li>
                <strong>Period:</strong> {artwork.period}
              </li>
            )}
            {artwork.medium && (
              <li>
                <strong>Medium:</strong> {artwork.medium}
              </li>
            )}
            {artwork.dimensions && (
              <li>
                <strong>Dimensions:</strong> {artwork.dimensions}
              </li>
            )}
            {artwork.objectDate && (
              <li>
                <strong>Date:</strong> {artwork.objectDate}
              </li>
            )}
            {artwork.creditLine && (
              <li>
                <strong>Credit Line:</strong> {artwork.creditLine}
              </li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
