import Image from "next/image";
import { getAsianArtObjects, getAsianArtObjectsByCulture } from "@/lib/met-api";
import ArtworkGrid from "@/components/layout/artwork-grid";
import CultureFilter from "@/components/ui/culture-filter";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const culture = typeof params.culture === "string" ? params.culture : undefined;

  const artworks = await getAsianArtObjectsByCulture({
    culture,
    limit: 12,
  });
  
  return (
    <main>
      {/* HERO */}
      <section className="relative h-96 w-full">
        <Image
          src="/the-met-hero.jpg"
          alt="The Met Museum Entrance"
          fill //stretches the image to fill the parent container(replaces w and h)
          className="object-cover"
          loading="eager"
          preload={true}
        />

        {/* Overlay on image */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Text layer */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl leading-tight font-bold text-white max-w-3xl">
            MetOpen — Asian Art Collection
          </h1>
          <p className="mt-4 text-lg text-neutral-200 max-w-2xl">
            Explore masterpieces from East, South, and Southeast Asia — spanning
            centuries of craftsmanship, belief, and beauty.
          </p>
        </div>
      </section>

{/* FILTER BUTTONS (URL STATE) */}
      
      <section className="container mx-auto px-4 py-8">
        <CultureFilter culture={culture} />
      </section>

{/* ARTWORK GRID */}

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">
        {culture ? `${culture} Artworks` : "Featured Asian Artworks"}
        </h2>
        <ArtworkGrid artworks={artworks} />
      </section>
    </main>
  );
}
