interface ISelectData {
  id: number;
  name: string;
  value: string;
}

export const selectData: ISelectData[] = [
  {
    id: 1,
    name: 'По популярности',
    value: 'popularity.desc',
  },
  {
    id: 2,
    name: 'По дате выхода',
    value: 'primary_release_date.desc',
  },
  {
    id: 3,
    name: 'По рейтингу',
    value: 'vote_average.desc',
  },
];
