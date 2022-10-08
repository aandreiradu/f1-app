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
				isLoading: false,
				schedule: payload
			};

		case SCHEDULE_TYPES.FETCH_SCHEDULE_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			};

		case SCHEDULE_TYPES.SET_UPCOMING_RACE:
			return {
				...state,
				isLoading: false,
				upComingEvent: payload
			};

		default:
			return state;
	}
};
