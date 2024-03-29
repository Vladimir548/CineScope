import { Backdrop, Logo, Poster, Cast, Crew } from '@/interface/IMovieId';

export interface ISeries {
  backdrop_path: string;
  created_by: CreatedBy[];
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  content_ratings: ContentRatings;
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: any;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  release_dates: Certification;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  images: IImages;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: ITvSeason[];
  spoken_languages: SpokenLanguage[];
  videos: {
    id: number;
    results: IVideos[];
  };
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  runtime: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

export interface Certification {
  id: number;
  results: Certificat[];
}

export interface Certificat {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDate {
  certification: string;
  descriptors: any[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ITvSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// export interface Cast {
//   adult: boolean;
//   gender: number;
//   id: number;
//   known_for_department: string;
//   name: string;
//   original_name: string;
//   popularity: number;
//   profile_path: string;
//   character: string;
//   credit_id: string;
//   order: number;
// }
//
// export interface Crew {
//   adult: boolean;
//   gender: number;
//   id: number;
//   known_for_department: string;
//   name: string;
//   original_name: string;
//   popularity: number;
//   profile_path?: string;
//   credit_id: string;
//   department: string;
//   job: string;
// }

export interface IImages {
  backdrops: Backdrop[];
  id: number;
  logos: Logo[];
  posters: Poster[];
}

export interface ContentRatings {
  results: RatingTv[];
  id: number;
}

export interface RatingTv {
  descriptors: any[];
  iso_3166_1: string;
  rating: string;
}

export interface IVideos {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
