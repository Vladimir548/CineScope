import axios from 'axios';
import { GenreResponse } from '@/interface/IGenres';
import { CountryResponse } from '@/interface/ICountry';

const key = process.env.NEXT_PUBLIC_KEY_TMDB;
export const QueryFilter = {
  async getGenre() {
    const { data } = await axios.get(`/api/genre/movie/list`, {
      params: {
        language: 'ru-RU',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as GenreResponse;
  },
  async getCountry() {
    const { data } = await axios.get(`/api/configuration/countries`, {
      params: {
        language: 'ru-RU',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as CountryResponse;
  },
};
