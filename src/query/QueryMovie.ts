import { Genre } from '@/interface/IGenres';

require('dotenv').config();
import { MovieRes, MoviesResponse } from '@/interface/IMovie';
import axios from 'axios';
import { IMovie } from '@/interface/IMovieId';
import { IMulti } from '@/interface/IMulti';
import { CollectionMovieResponse } from '@/interface/ICollectionMovie';
import { Country } from '@/interface/ICountry';

const key = process.env.NEXT_PUBLIC_KEY_TMDB;

export const QueryMovie = {
  async getMovie(page: number) {
    const { data } = await axios.get<MoviesResponse>(`/api/discover/movie`, {
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
