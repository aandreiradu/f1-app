import { createSelector } from 'reselect';
import { SCHEDULE_TYPES } from '../Schedule/schedule.types';
import { scheduleReducer } from '../Schedule/schedule.selector';

export const selectFinishedRaces = createSelector(scheduleReducer, (state) => {
	const dateNow = new Date();
	const finishedRaces = state?.schedule?.find((race) => new Date(race.date) < dateNow);

	return finishedRaces;
});

const qualyReducer = (state) => state;

export const qualyfingResultByRoundNo = createSelector(qualyReducer, (state) =>
	state?.qualyfingResults?.find()
);

export const selectQualyResultByRoundNo = createSelector(
	[(state) => state.qualyfing.qualyfingResults, (state, roundNo) => roundNo],
	(qualyfingResults, roundNo) => {
		console.log('IN STORE', qualyfingResults);
		console.log('qualyfingResults,roundNo', qualyfingResults, roundNo);
		const filteredResults = qualyfingResults?.find((result) => +result?.roundNo === +roundNo);
		console.log('filteredResults', filteredResults);

		return filteredResults;
	}
);
