// If we enter single dynamic parameter it is going to caught by [eventId].tsx but if we enter more than one dynamic parameters, the are going to caught by this [...slug].tsx
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Events, getFilteredEvents } from 'data/dummyData';
import EventList from 'components/events/event-list';
import { Fragment } from 'react';
import Button from 'components/ui/button';

const FilteredEventsPage: NextPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;

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
      return (
        <Fragment>
          <p>Invalid filter please adjust value</p>
          <Button link="/events">Show all Events</Button>
        </Fragment>
      );
    }

    filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <p>No events found for the chosen filter!</p>
        <Button link="/events">Show all Events</Button>
      </Fragment>
    );
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEventsPage;
