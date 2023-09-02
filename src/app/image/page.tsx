import ImageUi from '@/app/pages-ui/image-ui/ImageUI';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex">
      <Image
        src={'https://image.tmdb.org/t/p/w342//nAS7A7ZdUDQLHXsvg2XAX3IUkml.jpg'}
        className={'max-w-full'}
        alt={'ddd'}
        width={290}
        height={290}
        sizes="(max-width: 330px) 130px, (max-width:380px) 140px, calc(73.33vw + 76px)"
      />
      <Image
        src={'https://image.tmdb.org/t/p/w342//nAS7A7ZdUDQLHXsvg2XAX3IUkml.jpg'}
        alt={'ddd'}
        width={290}
        height={290}
        sizes="(min-width: 380px) 290px, calc(73.33vw + 76px)"
      />
    </div>
  );
}
