'use client';

import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import ActingTabs from '@/components/tabs/credits-tabs/acting-tabs/ActingTabs';
import CrewTabs from '@/components/tabs/credits-tabs/crew-tabs/CrewTabs';
import { Cast, Crew } from '@/interface/IMovieId';

interface ICredits {
  cast: Cast[];
  crew: Crew[];
}

export default function CreditsTabs({ cast, crew }: ICredits) {
  return (
    <div className="flex w-full flex-col">
      <Tabs variant={'underlined'} aria-label="Options" color={'primary'}>
        <Tab className={'py-1'} key="acting" title="Актеры">
          <Card>
            <CardBody className={'p-1 grid'}>
              <ActingTabs cast={cast} />
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'py-1 grid'} key="crew" title="Фильмография">
          <Card>
            <CardBody className={'p-1'}>
              <CrewTabs crews={crew} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
