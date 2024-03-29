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
  release: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
