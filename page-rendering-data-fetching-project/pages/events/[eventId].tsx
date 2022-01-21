import { Fragment } from 'react';
import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';

import { getEventById, getFeaturedEvents } from 'hooks/api-util';
import EventSummary from 'components/event-detail/event-summary';
import EventLogistics from 'components/event-detail/event-logistics';
import EventContent from 'components/event-detail/event-content';

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const id = params?.eventId;

  const eventById = typeof id === 'string' ? await getEventById(id) : undefined;

  return {
    props: {
      event: eventById,
    },
    revalidate: 30,
    notFound: !eventById ? true : false,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const pathParams = events.map(event => ({
    params: { eventId: event.id },
  }));

  return {
    paths: pathParams,
    fallback: 'blocking',
  };
}

const EventDetailPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = props => {
  const { event } = props;

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
