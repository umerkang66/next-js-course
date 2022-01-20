import type { NextPage } from 'next';

import EventList from 'components/events/event-list';
import { getFeaturedEvents } from 'data/dummyData';

const HomePage: NextPage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
