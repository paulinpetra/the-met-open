import { MetArtwork, MetArtworkDetail, MetSearchResponse } from "./met-types";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const ASIAN_ART_DEPARTMENT_ID = 6;

/*
  limit fetch to highlighted Asian Art artworks that have images
 */
const REVALIDATE_TIME = 60 * 60 * 24; // cache for 24 hours

export async function getAsianArtObjects(
  limit: number = 12, //default to 12 artworks but can be overridden
): Promise<MetArtwork[]> {
  //STEP 1. search asian department for highlighted artworks with images
  const searchRes = await fetch(
    `${BASE_URL}/search?departmentId=${ASIAN_ART_DEPARTMENT_ID}&isHighlight=true&hasImages=true&q=*`,
    {
      next: { revalidate: REVALIDATE_TIME },
    },
  );
  if (!searchRes.ok) {
    throw new Error("Failed to fetch Asian Art search results");
  }
  const searchData: MetSearchResponse = await searchRes.json();
  // If searchData.objectIDs is null/undefined:

  if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
    return []; //early return, no results
  }

  //STEP 2. Limit how many objects we fetch but over fetch since some are filterd out later
  const objectIDs = searchData.objectIDs.slice(0, limit * 2);

  //STEP 3. fetch each object's details in parallel (for the list)
  const artworks = await Promise.all(
    objectIDs.map(async (id) => {
      const res = await fetch(`${BASE_URL}/objects/${id}`, {
        next: { revalidate: REVALIDATE_TIME },
      });

      if (!res.ok) return null;
      const data = await res.json();

      if (!data.primaryImageSmall) return null;

      //only return whats necessaryfor the artwork card
      return {
        objectID: data.objectID,
        title: data.title,
        primaryImageSmall: data.primaryImageSmall,
        artistDisplayName: data.artistDisplayName,
      } satisfies MetArtwork; //type satisfaction(TypeScript verifies all properties exist and match type unlike as)
    }),
  );

  //STEP 4.remove null and failed fetches by filtering falsy values
  //then enforce final limit
  return artworks
    .filter((art): art is MetArtwork => art !== null)
    .slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* New fetch for single artwork on Detail Page  
fetching the full details by the object id                  */
/* ------------------------------------------------------------------ */

export async function getAsianArtObjectById(objectID: number, ): Promise<MetArtworkDetail> {
  const res = await fetch(`${BASE_URL}/objects/${objectID}`, {
    next: { revalidate: REVALIDATE_TIME },
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch artwork with ID ${objectID}`);
  } 
  const data = await res.json();

  return {
    objectID: data.objectID,
    title: data.title,
    primaryImageSmall: data.primaryImageSmall,
    artistDisplayName: data.artistDisplayName,
    culture: data.culture,
    period: data.period,
    medium: data.medium,
    dimensions: data.dimensions,
    objectDate: data.objectDate,
    creditLine: data.creditLine,
  } satisfies MetArtworkDetail; 

}