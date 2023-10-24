export type ISimilarMovieResponse = {
  page: number;
  results: ISimilarMovie[];
  total_pages: number;
  total_results: number;
};

export type ISimilarMovie = {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release: IReleaseDate | IFirstDate;
  hom: ITitle | IName;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
type ITitle = {
  title: string;
};
type IName = {
  name: string;
};
type IReleaseDate = {
  release_date: string;
};
type IFirstDate = {
  first_air_date: string;
};
