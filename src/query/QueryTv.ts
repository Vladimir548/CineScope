import axios from 'axios';
import { TvResponse } from '@/interface/ITv';
import { ITvCredits } from '@/interface/TvCredits';
import { ISeasons } from '@/interface/tv/ISeasons';
import { ISeries } from '@/interface/ITvId';

const key = process.env.NEXT_PUBLIC_KEY_TMDB;

export const QueryTv = {
  async getTv(page: number) {
    const { data } = await axios.get('/api/tv/airing_today', {
      params: {
        language: 'ru-RU',
        page,
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as TvResponse;
  },
  async getTvPopular(page?: number) {
    const { data } = await axios.get('/api/discover/tv', {
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
    return data as TvResponse;
  },
  async getTvNews(page?: number) {
    const { data } = await axios.get('/api/tv/airing_today', {
      params: {
        language: 'ru-RU',
        page,
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as TvResponse;
  },
  async getTvRated(page?: number) {
    const { data } = await axios.get('/api/tv/top_rated', {
      params: {
        language: 'ru-RU',
        page,
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as TvResponse;
  },
  async getIdTv(id: number) {
    const { data } = await axios.get(`/api/tv/${id}`, {
      params: {
        language: 'ru-Ru',
        append_to_response: 'content_ratings,images,videos',
        include_image_language: 'en,ru,ja',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as ISeries;
  },
  async getIdTvCredits(id: number) {
    const { data } = await axios.get(`/api/tv/${id}/aggregate_credits`, {
      params: {
        language: 'ru-Ru',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as ITvCredits;
  },
  async getIdTvSeasons(id: number, season: number) {
    const { data } = await axios.get(`/api/tv/${id}/season/${season}`, {
      params: {
        language: 'ru-Ru',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as ISeasons;
  },
  async getIdTvSimilar(id: number) {
    const { data } = await axios.get(`/api/tv/${id}/similar`, {
      params: {
        language: 'ru-Ru',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as TvResponse;
  },
};
