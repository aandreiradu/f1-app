import { LAST_RACE_RESULT_TYPES } from './lastRaceResult.types';
import { createAction } from '../../Utils/reducer/createAction';

export const fetchLastRaceResultStart = () =>
	createAction(LAST_RACE_RESULT_TYPES.FETCH_LAST_RACE_RESULT_START);

export const fetchLastRaceResultSuccess = (response) =>
	createAction(LAST_RACE_RESULT_TYPES.FETCH_LAST_RACE_RESULT_SUCCESS, response);

export const fetchLastRaceResultFailure = (error) =>
	createAction(LAST_RACE_RESULT_TYPES.FETCH_LAST_RACE_RESULT_FAILURE, error);
