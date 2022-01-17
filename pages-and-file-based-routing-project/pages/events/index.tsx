import type { NextPage } from 'next';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from 'data/dummyData';
import EventList from 'components/events/event-list';
import EventsSearch from 'components/events/events-search';

const AllEventsPage: NextPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;
