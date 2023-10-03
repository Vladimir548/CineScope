interface ISubLink {
  id: number;
  name: string;
  link: string;
}

export const movieSubLink: ISubLink[] = [
  {
    id: 1,
    name: 'Популярное',
    link: '/movie/popular',
  },
  {
    id: 2,
    name: 'Новинки',
    link: '/movie/news',
  },
  {
    id: 3,
    name: 'Рейтинговые',
    link: '/movie/rated',
  },
  {
    id: 4,
    name: 'Предстоящие',
    link: '/movie/upcoming',
  },
];
export const tvSubLink: ISubLink[] = [
  {
    id: 1,
    name: 'Популярное',
    link: '/tv/popular',
  },
  {
    id: 2,
    name: 'Новинки',
    link: '/tv/news',
  },
  {
    id: 3,
    name: 'Рейтинговые',
    link: '/tv/rated',
  },
];
