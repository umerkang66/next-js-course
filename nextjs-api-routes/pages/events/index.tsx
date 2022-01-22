import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
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
      <Head>
        <title>NextJs Events</title>
        <meta
          // This meta tag with description, this will be shows in the google search result description
          name="description"
          content="Find a lot of great events, that allow to evolve"
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;
