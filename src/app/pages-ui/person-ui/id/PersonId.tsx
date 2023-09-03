'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { QueryPerson } from '@/query/QueryPerson';
import { Card, CardBody, Image, Tab, Tabs } from '@nextui-org/react';
import style from '@/app/pages-ui/actors-ui/id/style.module.css';
import NextImage from 'next/image';
import { twMerge } from 'tailwind-merge';
import PersonCombined from '@/app/pages-ui/person-ui/id/PersonCombined';
import PersonImages from '@/app/pages-ui/person-ui/id/PersonImages';

export default function PersonId() {
  const params = useParams();
  const year = new Date().getFullYear();
  const { data } = useQuery(['get-actor-id', params!.id], () =>
    QueryPerson.getActorId(Number(params.id)),
  );
  return (
    <div className="flex  flex-col ">
      <Tabs aria-label="Options">
        <Tab className={'text-xl'} key="biography" title="Биография">
          <Card>
            <CardBody className={'p-2 '}>
              <div className={style.wrapper}>
                <div className={style.content}>
                  <div className={style.information}>
                    <Image
                      as={NextImage}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w300/${data?.profile_path}`}
                      alt={data?.name!}
                      width={300}
                      height={300}
                    />
                    <div className="flex flex-col ml-3">
                      <h1
                        className={twMerge('flex items-center text-3xl font-bold my-2', style.name)}
                      >
                        {' '}
                        {data?.name}
                      </h1>
                      <div className="">
                        <h2 className={twMerge('text-2xl font-bold', style.info_title)}>
                          Проффесия
                        </h2>
                        <p className={twMerge('text-1xl', style.info_cont)}>
                          {data?.known_for_department}
                        </p>
                      </div>
                      <div className="">
                        <h2 className={twMerge('text-2xl font-bold', style.info_title)}>Пол</h2>
                        <p className={twMerge('text-1xl', style.info_cont)}>
                          {data?.gender === 1 ? 'Женщина' : 'Мужчина'}
                        </p>
                      </div>
                      <div className="">
                        <h2 className={twMerge('text-2xl font-bold', style.info_title)}>
                          Дата рождения
                        </h2>
                        <p className={twMerge('text-1xl', style.info_cont)}>
                          {data?.birthday} ({year - Number(data?.birthday?.split('-')[0])})
                        </p>
                      </div>
                      {data?.deathday !== null ? (
                        <div className="">
                          <h2 className={twMerge('text-2xl font-bold', style.info_title)}>
                            Дата смерти
                          </h2>
                          <p className={twMerge('text-1xl', style.info_cont)}>{data?.deathday}</p>
                        </div>
                      ) : (
                        ''
                      )}
                      <div className="">
                        <h2 className={twMerge('text-2xl font-bold', style.info_title)}>
                          Место рождения
                        </h2>
                        <p className={twMerge('text-1xl', style.info_cont)}>
                          {data?.place_of_birth}
                        </p>
                      </div>
                    </div>
                  </div>
                  {data?.biography ? (
                    <div className={style.biography}>
                      <h2 className={twMerge('text-2xl font-bold my-1', style.info_title)}>
                        Биография
                      </h2>
                      <p>{data?.biography}</p>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="filmograph" title="Фильмография">
          <Card>
            <CardBody>
              <PersonCombined />
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="gallery" title="Галерея">
          <Card>
            <CardBody>
              <PersonImages />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
