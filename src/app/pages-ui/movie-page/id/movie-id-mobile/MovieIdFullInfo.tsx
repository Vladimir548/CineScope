'use client';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { Genre } from '@/interface/IGenres';
import { useCertification } from '@/hooks/useCertification';
import { Certification, Crew, ProductionCompany, ProductionCountry } from '@/interface/IMovieId';
import Link from 'next/link';

interface IMovieIdFullInfo {
  genres?: Genre[];
  vote?: number;
  runtime?: number;
  date?: string;
  release_dates?: Certification;
  crew?: Crew[];
  countries?: ProductionCountry[];
  companies?: ProductionCompany[];
  budget?: number;
  revenue?: number;
}

export default function MovieIdFullInfo({
  genres,
  vote,
  runtime,
  date,
  release_dates,
  crew,
  countries,
  companies,
  budget,
  revenue,
}: IMovieIdFullInfo) {
  const formattedBudget = budget?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const formattedRevenue = revenue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const formattedHours = Math.floor(runtime! / 60);
  const formattedMinutes = runtime! % 60;
  const formattedRuntime = `${formattedHours}ч ${formattedMinutes}мин`;
  const certificate = useCertification(
    release_dates?.results?.filter((dates) => dates?.iso_3166_1 === 'US')[0]?.release_dates[0]
      .certification,
  );
  return (
    <div>
      <h3 className="text-lg">Полная информация</h3>
      <Table hideHeader aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>VALUE</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Рейтинг</TableCell>
            <TableCell>{vote?.toFixed(1)}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Жанр</TableCell>
            <TableCell>
              {genres?.map((genre) => (
                <span key={genre.id}>
                  <p className={twMerge('capitalize pr-2')}>{genre.name}</p>
                </span>
              ))}
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Время</TableCell>
            <TableCell>{formattedRuntime}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Дата выхода</TableCell>
            <TableCell>{date}</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Возраст</TableCell>
            <TableCell>{certificate}</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>Режиссер</TableCell>
            <TableCell>
              {crew
                ?.filter((item) => item.job === 'Director')
                .map((director) => (
                  <Link key={director.id} href={`/person/${director.id}`}>
                    {' '}
                    {director.name} &nbsp;
                  </Link>
                ))}
            </TableCell>
          </TableRow>
          <TableRow key="7">
            <TableCell>Сценарист</TableCell>
            <TableCell>
              {crew
                ?.filter((item) => item.job === 'Writer')
                .map((director) => (
                  <Link key={director.id} href={`/person/${director.id}`}>
                    {' '}
                    {director.name} &nbsp;
                  </Link>
                ))}
            </TableCell>
          </TableRow>
          <TableRow key="8">
            <TableCell>Страна</TableCell>
            <TableCell>
              {countries?.map((country) => (
                <span key={country.iso_3166_1}>{country.name} &nbsp;</span>
              ))}
            </TableCell>
          </TableRow>
          <TableRow key="9">
            <TableCell>Компания</TableCell>
            <TableCell>
              {companies?.map((company) => <span key={company.id}>{company.name} &nbsp;</span>)}
            </TableCell>
          </TableRow>
          <TableRow key="10">
            <TableCell>Бюджет</TableCell>
            <TableCell>{formattedBudget}</TableCell>
          </TableRow>
          <TableRow key="11">
            <TableCell>Сборы</TableCell>
            <TableCell>{formattedRevenue}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
