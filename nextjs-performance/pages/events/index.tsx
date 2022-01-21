import type { InferGetStaticPropsType, NextPage } from 'next';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from 'hooks/api-util';
import EventList from 'components/events/event-list';
import EventsSearch from 'components/events/events-search';

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}

const AllEventsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = props => {
  const { events } = props;
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
