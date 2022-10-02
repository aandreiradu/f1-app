import { SCHEDULE_TYPES } from './schedule.types';
import { createSelector } from 'reselect';

export const scheduleReducer = (state) => state.schedule;

export const selectSchedule = createSelector(scheduleReducer, (state) => state.schedule);

export const selectUpcomingEvent = createSelector(scheduleReducer, (state) => state?.upComingEvent);

export const selectEventsWithQualyFinished = createSelector(scheduleReducer, (state) => {
	const dateNow = new Date();
	const qualyEvents = state?.schedule?.filter((event) => new Date(event?.date) < dateNow);

	return qualyEvents;
});
