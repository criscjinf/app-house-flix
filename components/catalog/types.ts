export type Genre = 'ACTION' | 'COMEDY';

export interface CatalogItem {
  id: string;
  category: 'MOVIE' | 'SERIE';
  genre: Genre;
  title: string;
  description: string;
  rating: number;
  trailer: string;
  poster: string;
}
