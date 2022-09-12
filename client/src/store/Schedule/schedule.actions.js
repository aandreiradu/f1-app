import { SCHEDULE_TYPES } from './schedule.types';
import { createAction } from '../../Utils/reducer/createAction';


export const fetchScheduleStart = () => createAction(SCHEDULE_TYPES.FETCH_SCHEDULE_START);

export const fetchScheduleSuccess = (scheduleData) => createAction(SCHEDULE_TYPES.FETCH_SCHEDULE_SUCCESS,scheduleData);

export const fetchScheduleFailure = (scheduleError) => createAction(SCHEDULE_TYPES.FETCH_SCHEDULE_FAILURE,scheduleError);