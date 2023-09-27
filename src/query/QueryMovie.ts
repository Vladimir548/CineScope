import { MoviesResponse } from '@/interface/IMovie';
import axios from 'axios';
import { IMovie } from '@/interface/IMovieId';
import { CollectionMovieResponse } from '@/interface/ICollectionMovie';

const key = process.env.NEXT_PUBLIC_KEY_TMDB;

export const QueryMovie = {
  async getMovie(page: number, sort: string) {
    const { data } = await axios.get<MoviesResponse>(`/api/discover/movie`, {
      params: {
        language: 'ru-RU',
        page,
        sort_by: sort,
        'vote_count.gte': '100',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as MoviesResponse;
  },
  async getMoviePopular(page?: number) {
    const { data } = await axios.get<MoviesResponse>('/api/discover/movie', {
      params: {
        language: 'ru-RU',
        page,
        sort_by: 'primary_release_date.desc',
        'vote_count.gte': '200',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as MoviesResponse;
  },
  async getMovieNews(page: number) {
    const { data } = await axios.get<MoviesResponse>('/api/movie/now_playing', {
      params: {
        language: 'ru-RU',
        page,
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as MoviesResponse;
  },
  async getMovieRated(page: number) {
    const { data } = await axios.get<MoviesResponse>('/api/movie/top_rated', {
      params: {
        language: 'ru-RU',
        page,
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as MoviesResponse;
  },
  async getMovieUpcoming(page: number) {
    const { data } = await axios.get<MoviesResponse>('/api/movie/upcoming', {
      params: {
        language: 'ru-RU',
        page,
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as MoviesResponse;
  },
  async getMovieId(id: number) {
    const { data } = await axios.get(`/api/movie/${id}`, {
      params: {
        language: 'ru-RU',
        append_to_response: 'release_dates,images,credits,videos',
        include_image_language: 'en,ru,ja',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as IMovie;
  },
  async getMovieIdCollection(id: number) {
    const { data } = await axios.get(`/api/collection/${id}`, {
      params: {
        language: 'ru-RU',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as CollectionMovieResponse;
  },
};
