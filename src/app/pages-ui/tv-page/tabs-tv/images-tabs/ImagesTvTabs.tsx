import { Card, CardBody, Image, Tab, Tabs } from '@nextui-org/react';
import NextImage from 'next/image';
import LoadingCircular from '@/components/loading/LoadingCircular';
import { IImages } from '@/interface/IMovieId';

interface IImagesTabs {
  images: IImages;
  isSuccess: boolean;
}

export default function ImagesTvTabs({ images, isSuccess }: IImagesTabs) {
  return (
    <>
      <Tabs aria-label="Options">
        <Tab className={'text-xl'} key="posters" title="Постеры">
          <Card>
            <CardBody className={'flex justify-center'}>
              {images.posters.length === 0 ? (
                <h3>Постеры не найдены</h3>
              ) : (
                <div>
                  {isSuccess ? (
                    <div>
                      <ul className={'flex flex-wrap justify-center'}>
                        {images.posters.map((poster) => (
                          <li key={poster.file_path} className="pr-2 pb-2">
                            <Image
                              as={NextImage}
                              isBlurred
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w342/${poster.file_path}`}
                              alt={'poster'}
                              width={342}
                              height={342}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <LoadingCircular />
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="logos" title="Логотипы">
          <Card>
            <CardBody>
              {images.logos.length === 0 ? (
                <h3>Логотипы не найдены</h3>
              ) : (
                <div>
                  {isSuccess ? (
                    <div>
                      <ul className={'flex flex-wrap justify-center'}>
                        {images.logos.map((logo) => (
                          <li key={logo.file_path} className="pr-2 pb-2">
                            <Image
                              as={NextImage}
                              isBlurred
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w185/${logo.file_path}`}
                              alt={'logo'}
                              width={185}
                              height={185}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <LoadingCircular />
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="backdrop" title="Фоны">
          <Card>
            <CardBody>
              {images.backdrops.length === 0 ? (
                <h3>Фоны не найдены</h3>
              ) : (
                <div>
                  {isSuccess ? (
                    <div>
                      <ul className={'flex flex-wrap justify-center'}>
                        {images.backdrops.map((backdrop) => (
                          <li key={backdrop.file_path} className="pr-2 pb-2">
                            <Image
                              as={NextImage}
                              isBlurred
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w780/${backdrop.file_path}`}
                              alt={'backdrop'}
                              width={780}
                              height={780}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <LoadingCircular />
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
}
