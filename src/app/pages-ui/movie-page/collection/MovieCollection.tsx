'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import { useParams } from 'next/navigation';
import LayoutMovie from '@/layout/LayoutMovie';
import LayoutCollection from '@/layout/LayoutCollection';

export default function MovieCollection() {
  const params = useParams();
  const { data } = useQuery(['get-movie-collection', params!.id], () =>
    QueryMovie.getMovieIdCollection(Number(params!.id)),
  );
  return (
    <div>
      <LayoutCollection data={data!} />
    </div>
  );
}
