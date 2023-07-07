import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/events');
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEventsByDate(moment(selectedDate).format('YYYY-MM-DD'));
  }, [selectedDate]);

  const fetchEventsByDate = async (date) => {
    try {
      const response = await axios.get(`http://localhost:4000/events?date=${date}`);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addEvent = async () => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = {
        id: uuidv4(),
        date: moment(selectedDate).format('YYYY-MM-DD'),
        title: title,
      };
      try {
        await axios.post('http://localhost:4000/events', newEvent);
        fetchEventsByDate(moment(selectedDate).format('YYYY-MM-DD'));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/events/${id}`);
      fetchEventsByDate(moment(selectedDate).format('YYYY-MM-DD'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Event Calendar</h1>
      <div className="calendar-container">
        <div className="calendar">
          <Calendar onChange={setSelectedDate} value={selectedDate} calendarType="US" />
        </div>
        <div className="events">
          <h2>Events for {moment(selectedDate).format('MMM DD, YYYY')}</h2>
          <button onClick={addEvent}>Add Event</button>
          {events
            .filter((event) => event.date === moment(selectedDate).format('YYYY-MM-DD'))
            .map((event) => (
              <div className="event" key={event.id}>
                <div>Title: {event.title}</div>
                <button onClick={() => deleteEvent(event.id)}>Delete</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
