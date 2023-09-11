import { Genre } from '@/interface/IGenres';

require('dotenv').config();
import axios from 'axios';
import { IMulti } from '@/interface/IMulti';
import { Country } from '@/interface/ICountry';

const key = process.env.NEXT_PUBLIC_KEY_TMDB;

export const QuerySearch = {
  async getSearch(value: string, page: number, sort: string) {
    const { data } = await axios.get('/api/search/multi', {
      params: {
        language: 'ru-RU',
        query: value,
        page: page,
        sort_by: sort,
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as IMulti;
  },
  async getSorting(
    page: number,
    genres: Genre[],
    countrys: Country[],
    type: string,
    minRating: number,
    maxRating: number,
    withYear: number,
    byYear: number,
    sort: string,
  ) {
    const genre = genres.map((genre) => genre.id).join(',');
    const country = countrys.map((country) => country.iso_3166_1).join(',');
    const { data } = await axios.get(`/api/discover/${type}`, {
      params: {
        language: 'ru-RU',
        page: page,
        with_genres: genre,
        with_origin_country: country,
        'primary_release_date.gte': withYear,
        'primary_release_date.lte': byYear,
        'vote_average.gte': minRating,
        'vote_average.lte': maxRating,
        sort_by: sort,
        'vote_count.gte': 100,
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as IMulti;
  },
};
