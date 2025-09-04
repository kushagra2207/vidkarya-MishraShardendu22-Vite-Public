import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MessTopCard from './MessTopCard';
import MessCard from './MessCard';
import MessBottomCard from './MessBottomCard';
import Styles from './CSS/MessSchedule.module.css';
import { getJSONFromFirebase } from '../../Helpers';

const MessSchedule = () => {
  const [schedule, setSchedule] = useState({
    previousDay: {},
    currentDay: {},
    nextDay: {},
  });

  useEffect(() => {
    async function handleSchedule() {
      // Fetch JSON from firebase
      const MessTimeTable = await getJSONFromFirebase('messSchedule');

      // Determine the current day
      const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const currentDate = new Date();
      const currentDayIndex = currentDate.getDay();
      const currentDayName = daysOfWeek[currentDayIndex];

      // Find the schedules for the current day, previous day, and next day
      const currentDayIndexInData = MessTimeTable.findIndex((item) => item.day === currentDayName);
      const previousDayIndex =
        (currentDayIndexInData - 1 + MessTimeTable.length) % MessTimeTable.length;
      const nextDayIndex = (currentDayIndexInData + 1) % MessTimeTable.length;

      setSchedule({
        previousDay: MessTimeTable[previousDayIndex],
        currentDay: MessTimeTable[currentDayIndexInData],
        nextDay: MessTimeTable[nextDayIndex],
      });
    }

    handleSchedule();
  }, []);

  return (
    <div className={Styles.MessScheduleContainer}>
      <Grid container spacing={2} className={Styles.MessTop}>
        {/* MessTopCard components */}
        {schedule.previousDay.meals &&
          schedule.previousDay.meals.map((meal, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} className={Styles.MessCardItem}>
              <MessTopCard meal={meal} />
            </Grid>
          ))}
      </Grid>

      <Grid container spacing={2} className={Styles.MessMiddle}>
        {/* MessCard components */}
        {schedule.currentDay.meals &&
          schedule.currentDay.meals.map((meal, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} className={Styles.MessCardItem}>
              <MessCard meal={meal} />
            </Grid>
          ))}
      </Grid>

      <Grid container spacing={2} className={Styles.MessBottom}>
        {/* MessBottom  components */}
        {schedule.nextDay.meals &&
          schedule.nextDay.meals.map((meal, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} className={Styles.MessCardItem}>
              <MessBottomCard meal={meal} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default MessSchedule;
