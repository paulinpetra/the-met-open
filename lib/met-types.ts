//response from /search endpoint

export type MetSearchResponse = {
  total: number; //total number of objects
  objectIDs: number[] | null; //array of object IDs
};

//each object
export type MetArtwork = {
  objectID: number;
  title: string;
  primaryImageSmall: string;
  artistDisplayName: string;
};
