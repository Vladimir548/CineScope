import axios from 'axios';
import { IMulti } from '@/interface/IMulti';

const key = process.env.NEXT_PUBLIC_KEY_TMDB;

export const QuerySearch = {
  async getSearch(value: string, page?: number) {
    const { data } = await axios.get('/api/search/multi', {
      params: {
        language: 'ru-RU',
        query: value,
        page: page,
        sort_by: 'primary_release_date.desc',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as IMulti;
  },
  async getSorting(
    page: number,
    genres: string,
    country: string,
    type: string,
    minRating: string,
    maxRating: string,
    withYear: string,
    byYear: string,
    sort: string,
  ) {
    const { data } = await axios.get(`/api/discover/${type}`, {
      params: {
        language: 'ru-RU',
        page: page,
        with_genres: genres,
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
