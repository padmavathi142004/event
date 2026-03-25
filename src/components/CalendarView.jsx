import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEvents } from '../context/EventContext';

export default function CalendarView() {
  const { events } = useEvents();
  const [date, setDate] = useState(new Date());

  const eventsOnDate = events.filter((e) => e.date === date.toISOString().split('T')[0]);

  return (
    <div>
      <Calendar onChange={setDate} value={date} />
      <h3 className="mt-4 font-bold">Events on {date.toDateString()}</h3>
      {eventsOnDate.length === 0 && <p>No events</p>}
      <ul>
        {eventsOnDate.map((e) => (
          <li key={e.id}>{e.title} ({e.category})</li>
        ))}
      </ul>
    </div>
  );
}
