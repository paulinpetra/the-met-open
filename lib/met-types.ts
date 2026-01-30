//response from /search endpoint

export type MetSearchResponse = {
  total: number; //total number of objects
  objectIDs: number[] | null; //array of object IDs
};

//each object in the list
export type MetArtwork = {
  objectID: number;
  title: string;
  primaryImageSmall: string;
  artistDisplayName: string;
};

//full artwork details for the detail page
export type MetArtworkDetail = {
  objectID: number;
  title: string;
  primaryImageSmall: string;
  artistDisplayName: string;
  culture: string;
  period: string;
  medium: string;
  dimensions: string;
  objectDate: string;
  creditLine: string;
};
