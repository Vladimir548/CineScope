require('dotenv').config();
import axios from 'axios';
import { GenreResponse } from '@/interface/IGenres';

const key = process.env.NEXT_PUBLIC_KEY_TMDB;
export const QueryGenres = {
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
};
