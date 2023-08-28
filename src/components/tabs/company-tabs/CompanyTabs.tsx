'use client';
import { ProductionCompany } from '@/interface/IMovieId';
import Image from 'next/image';

interface ICompany {
  companies: ProductionCompany[];
}

export default function CompanyTabs({ companies }: ICompany) {
  return (
    <div className={'flex flex-wrap gap-[10px]'}>
      {companies.map((company) => (
        <div key={company.id}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w154/${company.logo_path}`}
            alt={company.name}
            width={154}
            height={154}
            className={'bg-white'}
          />
          <h3>{company.name}</h3>
        </div>
      ))}
    </div>
  );
}
