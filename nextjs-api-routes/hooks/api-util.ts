import fs from 'fs/promises';
import { Events } from 'data/dummyData';

export const getAllEvents = async () => {
  const res = await fs.readFile(
    process.cwd() + '/data/dummyDataJson.json',
    'utf-8'
  );
  const data = JSON.parse(res);

  const events: Events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter(event => event.isFeatured);
};

export const getEventById = async (id: string) => {
  const allEvents = await getAllEvents();
  return allEvents.find(event => event.id === id);
};

interface DateFilter {
  year: number;
  month: number;
}

export const getFilteredEvents = async (dateFilter: DateFilter) => {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
