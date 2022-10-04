import { QUALYFING_TYPES } from './qualyfing.types';
import { createAction } from '../../Utils/reducer/createAction';

export const fetchQualyfingResultStart = () => createAction(QUALYFING_TYPES.QUALYFING_FETCH_START);

export const fetchQualyfingResultSuccess = (qualyResult) =>
	createAction(QUALYFING_TYPES.QUALYFING_FETCH_SUCCESS, qualyResult);

export const fetchQualyfingResultFailure = (qualyError) =>
	createAction(QUALYFING_TYPES.QUALYFING_FETCH_FAILURE, qualyError);
