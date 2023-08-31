import { useQuery } from '@tanstack/react-query';
import { QueryPerson } from '@/query/QueryPerson';
import { useParams } from 'next/navigation';
import { Image, Skeleton } from '@nextui-org/react';
import NextImage from 'next/image';

export default function ActorImages() {
  const emptyArr: any[] = new Array(10);
  const params = useParams();
  const { data, isSuccess, isLoading } = useQuery(['get-images-person', params!.id], () =>
    QueryPerson.getActorIdImages(Number(params.id)),
  );
  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-center">
        {data?.profiles.map((profile) => (
          <div key={profile.file_path}>
            <Image
              as={NextImage}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w300/${profile.file_path}`}
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
