import type { InferGetStaticPropsType, NextPage } from 'next';

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
    <div>
      <EventList items={events} />
    </div>
  );
};

export default HomePage;
