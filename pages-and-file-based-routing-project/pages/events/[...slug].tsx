// If we enter single dynamic parameter it is going to caught by [eventId].tsx but if we enter more than one dynamic parameters, the are going to caught by this [...slug].tsx
import type { NextPage } from 'next';

const FilteredEventsPage: NextPage = () => {
  return (
    <div>
      <h1>FilteredEventsPage</h1>
    </div>
  );
};

export default FilteredEventsPage;
