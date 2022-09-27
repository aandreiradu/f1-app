import { DRIVERS_TYPES } from './drivers.types';
import { createAction } from '../../Utils/reducer/createAction';

export const fetchDriversStart = () => createAction(DRIVERS_TYPES.FETCH_DRIVERS_START);

export const fetchDriversSuccess = (driversResponse) =>
	createAction(DRIVERS_TYPES.FETCH_DRIVERS_SUCCESS, driversResponse);

export const fetchDriversFailure = (error) =>
	createAction(DRIVERS_TYPES.FETCH_DRIVERS_FAILURE, error);
