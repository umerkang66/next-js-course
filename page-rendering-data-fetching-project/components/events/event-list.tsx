import { FC } from 'react';

import EventItem from './event-item';
import type { Events } from '../../data/dummyData';
import classes from './event-list.module.css';

interface EventListProps {
  items: Events;
}

const EventList: FC<EventListProps> = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map(item => (
        <EventItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default EventList;
