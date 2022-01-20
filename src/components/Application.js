import DayList from "./DayList";
import "components/Application.scss";
import React, { useState } from "react";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];


export default function Application(props) {
  const [day, setDay] = useState('Monday');
  return (
    <main className="layout">
      <section className="sidebar">
      <nav>
  <DayList
            days={days}
            value={day}
            onChange={setDay}
  />
</nav>
    </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}