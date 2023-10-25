import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';

('use client ');
import Link from 'next/link';

import { Genre } from '@/interface/IGenres';
import { Crew, ProductionCompany, ProductionCountry } from '@/interface/IMovieId';
import { CreatedBy } from '@/interface/ITvId';
import { useTypeStatus } from '@/hooks/useTypeStatus';

interface ITvIdFullInfo {
  genres?: Genre[];
  vote?: number;
  runtime?: number;
  date?: string;
  certificate: string;
  created?: CreatedBy[];
  countries?: ProductionCountry[];
  companies?: ProductionCompany[];
  status?: string;
}

export default function TvIdFullInfo({
  genres,
  vote,
  runtime,
  date,
  certificate,
  created,
  status,
  countries,
  companies,
}: ITvIdFullInfo) {
  const isStatus = useTypeStatus(status!);
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
            <TableCell>{runtime}</TableCell>
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
            <TableCell>Создатель</TableCell>
            <TableCell>
              {created?.map((create) => (
                <Link key={create.id} href={`/person/${create.id}`}>
                  {' '}
                  {create.name} &nbsp;
                </Link>
              ))}
            </TableCell>
          </TableRow>

          <TableRow key="7">
            <TableCell>Страна</TableCell>
            <TableCell>
              {countries?.map((country) => (
                <span key={country.iso_3166_1}>{country.name} &nbsp;</span>
              ))}
            </TableCell>
          </TableRow>
          <TableRow key="8">
            <TableCell>Компания</TableCell>
            <TableCell>
              {companies?.map((company) => <span key={company.id}>{company.name} &nbsp;</span>)}
            </TableCell>
          </TableRow>
          <TableRow key="9">
            <TableCell>Статус</TableCell>
            <TableCell>{isStatus}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
