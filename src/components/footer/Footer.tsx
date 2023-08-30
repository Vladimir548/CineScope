export default function Footer() {
  return (
    <div className="h-[50px] w-full bg-[#18181b] px-3 relative z-10">
      <p>
        Содержащиеся здесь данные о фильмах и телесериалах предоставлены с использованием
        <a className="border-b border-slate-500" href="https://www.themoviedb.org/?language=ru">
          {' '}
          API The Movie Database (TMDb)
        </a>
        . Права на данную информацию принадлежат TMDb.{' '}
      </p>
    </div>
  );
}
