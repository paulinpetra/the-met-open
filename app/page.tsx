import Image from "next/image";

export default function Home() {
  return (
    <main>
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
            MetOpen — Your Gateway to The Met’s Masterpieces
          </h1>
          <p className="mt-4 text-lg text-neutral-200 max-w-2xl">
            Browse artworks that have shaped cultures across continents. Our
            interactive online exhibition brings The Met’s most compelling works
            to your screen — with rich imagery, detailed metadata, and smart
            search built on The Met Collection API.
          </p>
        </div>
      </section>
      {/* break out grid later, maybe also cards */}
      <section>
        <h2>Featured Artworks</h2>
        <ul className="grid grid-cols-[repeat(auto-fill, minmax(35ch,1fr))] gap-6 ">
          {artworks.map((artwork) =>(
          <li key={artwork.id}><div>
            <h3>{artwork.name}</h3>
            {/* can be rendered condionally artwork.image?  */}
            <Image className="w-full" src={artwork.image ??} alt="" width={100} height={100} />
          </div></li>))
          }
        </ul>
      </section>
    </main>
  );
}
