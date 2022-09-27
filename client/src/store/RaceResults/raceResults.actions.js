import { RACE_RESULTS_TYPES } from './raceResults.types';
import { createAction } from '../../Utils/reducer/createAction';

export const fetchRaceResultsStart = () => {
	return createAction(RACE_RESULTS_TYPES.FETCH_RACE_RESULTS_START);
};

export const fetchRaceResultsSuccess = (raceResults) => {
	return createAction(RACE_RESULTS_TYPES.FETCH_RACE_RESULTS_SUCCESS, raceResults);
};

export const fetchRaceResultsFailure = (error) => {
	return createAction(RACE_RESULTS_TYPES.FETCH_RACE_RESULTS_FAILURE, error);
};
