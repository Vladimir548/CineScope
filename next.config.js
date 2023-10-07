/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['fakeimg.pl', 'image.tmdb.org'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.themoviedb.org/3/:path*', // Здесь должен быть адрес TMDB API
      },
      {
        source: '/imdb/:path*', // Здесь укажите путь к вашему серверу
        destination: 'https://www.imdb.com/:path*', // Замените на адрес вашего сервера
      },
    ];
  },
};

module.exports = nextConfig;
