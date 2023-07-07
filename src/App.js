import React from 'react';
import EventCalendar from './Calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <EventCalendar />
    </div>
  );
};

export default App;
