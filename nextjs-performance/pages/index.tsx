import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import EventList from 'components/events/event-list';
import { getFeaturedEvents } from 'hooks/api-util';

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, // every half hour
  };
}

const HomePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = props => {
  const { events } = props;

  return (
    // We can add Head component, and it we can add everything that goes in the typical head section, like title or meta tags
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          // This meta tag with description, this will be shows in the google search result description
          name="description"
          content="Find a lot of great events, that allow to evolve"
          key="description"
        />
      </Head>
      <EventList items={events} />
    </div>
  );
};

export default HomePage;
