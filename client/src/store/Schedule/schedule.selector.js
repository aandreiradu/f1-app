import { SCHEDULE_TYPES } from './schedule.types';
import { createSelector } from 'reselect';

const scheduleReducer = (state) => state.schedule;

export const selectSchedule = createSelector(scheduleReducer, (state) => state.schedule);

export const selectUpcomingEvent = createSelector(scheduleReducer, (state) => state?.upComingEvent);
