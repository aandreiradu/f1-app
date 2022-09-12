import { createAction } from "../../Utils/reducer/createAction";
import { SCHEDULE_DETAILS_TYPES } from "./scheduleDetails.types";


export const fetchScheduleDetailsStart = () => createAction(SCHEDULE_DETAILS_TYPES.FETCH_SCHEDULE_DETAILS_START);

export const fetchScheduleDetailsSuccess = (responseData) => createAction(SCHEDULE_DETAILS_TYPES.FETCH_SCHEDULE_DETAILS_SUCCESS,responseData);

export const fetchScheduleDetailsError = (error) => createAction(SCHEDULE_DETAILS_TYPES.FETCH_SCHEDULE_DETAILS_FAILURE,error);

