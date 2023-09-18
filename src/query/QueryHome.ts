import axios from 'axios';
import { TrendingResponse } from '@/interface/ITrending';

const key = process.env.NEXT_PUBLIC_KEY_TMDB;

export const QueryHome = {
  async getTrending(page?: number) {
    const { data } = await axios.get('/api/trending/all/week', {
      params: {
        language: 'ru-RU',
        page: page,
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as TrendingResponse;
  },
};
