import { Fragment } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Event, getEventById } from 'data/dummyData';
import EventSummary from 'components/event-detail/event-summary';
import EventLogistics from 'components/event-detail/event-logistics';
import EventContent from 'components/event-detail/event-content';

const EventDetailPage: NextPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  let event: Event | undefined = undefined;
  if (typeof eventId === 'string') {
    event = getEventById(eventId);
  }

  if (!event) {
    return <h4>No Event found</h4>;
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </Fragment>
  );
};

export default EventDetailPage;
