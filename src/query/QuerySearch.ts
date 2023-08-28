import axios from 'axios';
import { IMulti } from '@/interface/IMulti';

const key = process.env.NEXT_PUBLIC_KEY_TMDB;

export const QuerySearch = {
  async getSearch(value: string, page: number) {
    const { data } = await axios.get('/api/search/multi', {
      params: {
        language: 'ru-RU',
        query: value,
        page: page,
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as IMulti;
  },
};
