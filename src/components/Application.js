import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment/index.js';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from 'helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const parsedAppointments = dailyAppointments.map((app) => {
  const interview = getInterview(state, app.interview);
  const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={app.id}
        id={app.id}
        time={app.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    axios.get(`/api/days`)
      Promise.all([
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      const [first, second, third] = all;
      setState((prev) => ({
        ...prev,
        days: first.data,
        appointments: second.data,
        interviewers: third.data,
      }));
    });
    }, []);

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={state.days} value={state.day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {parsedAppointments}
        <Appointment key='last' time='5pm' />
      </section>
    </main>
  );
}