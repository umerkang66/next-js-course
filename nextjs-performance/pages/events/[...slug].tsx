// If we enter single dynamic parameter it is going to caught by [eventId].tsx but if we enter more than one dynamic parameters, the are going to caught by this [...slug].tsx
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import { Events } from 'data/dummyData';
import { getFilteredEvents } from 'hooks/api-util';
import EventList from 'components/events/event-list';
import { Fragment } from 'react';
import Button from 'components/ui/button';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const filteredData = params?.slug;

  if (!filteredData) {
    return <p>Loading...</p>;
  }

  let filteredEvents: Events = [];

  if (filteredData instanceof Array) {
    const [filteredYear, filteredMonth] = filteredData;

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12
    ) {
      return {
        props: {
          hasError: true,
        },
        // Here will not show the 404 page but the handle the error on the component itself, because its not a page, but a combination of month, and year does not found
        // notFound: true,
      };
    }

    filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth,
    });
  }

  return {
    props: {
      events: filteredEvents,
      hasError: false,
    },
  };
}

const FilteredEventsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = props => {
  const { hasError, events } = props;

  if (hasError) {
    return (
      <Fragment>
        <p>Invalid filter please adjust value</p>
        <Button link="/events">Show all Events</Button>
      </Fragment>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Fragment>
        <p>No events found for the chosen filter!</p>
        <Button link="/events">Show all Events</Button>
      </Fragment>
    );
  }

  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export default FilteredEventsPage;
