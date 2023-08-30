import { ActorsResponse } from '@/interface/interface-actor/IActors';

require('dotenv').config();
import axios from 'axios';
import { ActorsCredits, IActorId } from '@/interface/interface-actor/IActorId';
import { IPersonImages } from '@/interface/interface-actor/IPersonImages';

const key = process.env.NEXT_PUBLIC_KEY_TMDB;
export const QueryPerson = {
  async getActors(page: number) {
    const { data } = await axios.get(`/api/person/popular`, {
      params: {
        language: 'ru-RU',
        page,
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as ActorsResponse;
  },
  async getActorId(id: number) {
    const { data } = await axios.get(`/api/person/${id}`, {
      params: {
        language: 'ru-RU',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as IActorId;
  },
  async getActorIdCredits(id: number) {
    const { data } = await axios.get(`/api/person/${id}/combined_credits`, {
      params: {
        language: 'ru-RU',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as ActorsCredits;
  },
  async getActorIdImages(id: number) {
    const { data } = await axios.get(`/api/person/${id}/images`, {
      params: {
        language: 'ru-RU',
      },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    return data as IPersonImages;
  },
};
