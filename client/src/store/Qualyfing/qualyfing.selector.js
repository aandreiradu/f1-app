import { createSelector } from 'reselect';
import { SCHEDULE_TYPES } from '../Schedule/schedule.types';
import { scheduleReducer } from '../Schedule/schedule.selector';

export const selectFinishedRaces = createSelector(scheduleReducer, (state) => {
	const dateNow = new Date();
	const finishedRaces = state?.schedule?.find((race) => new Date(race.date) < dateNow);

	return finishedRaces;
});
