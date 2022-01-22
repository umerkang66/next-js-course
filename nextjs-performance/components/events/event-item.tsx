import { FC } from 'react';
// When we use next image, next js will create multiple images on the server (on the fly when the request comes in), optimize for the operating systems and devices sizes from where the request are coming in, then those generated images will be cached for future request from similar devices, the images are also converted into "web p" that is the default in chrome, they are not generated in the advance (in the build process) but when the request reaches the server
import Image from 'next/image';
import classes from './event-item.module.css';

import { Event } from '../../data/dummyData';
import Button from '../ui/button';
import DateIcon from 'components/icons/date-icon';
import AddressIcon from 'components/icons/address-icon';
import ArrowRightIcon from 'components/icons/arrow-right-icon';

interface EventItemProps {
  item: Event;
}

const EventItem: FC<EventItemProps> = ({ item }) => {
  const { title, image, date, location, id } = item;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');

  const generateLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image
        src={`/${image}`}
        alt={title}
        // These are not the width and heights of original file, but the size that is send to the client
        width={250}
        height={160}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={generateLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
