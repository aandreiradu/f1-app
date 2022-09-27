import { SCHEDULE_TYPES } from './schedule.types';

const initialScheduleState = {
	isLoading: false,
	error: null,
	schedule: [],
	upComingEvent: null
};

export const scheduleReducer = (state = initialScheduleState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case SCHEDULE_TYPES.FETCH_SCHEDULE_START:
			return {
				...state,
				isLoading: true
			};

		case SCHEDULE_TYPES.FETCH_SCHEDULE_SUCCESS:
			return {
				...state,
				schedule: payload
			};

		case SCHEDULE_TYPES.FETCH_SCHEDULE_FAILURE:
			return {
				...state,
				error: payload
			};

		case SCHEDULE_TYPES.SET_UPCOMING_RACE:
			return {
				...state,
				upComingEvent: payload
			};

		default:
			return state;
	}
};
