import { QUALYFING_TYPES } from './qualyfing.types';

const initialQualyState = {
	isLoading: false,
	error: null,
	qualyfingResults: [
		{
			roundNo: '',
			results: []
		}
	]
};

export const qualyfingReducer = (state = initialQualyState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case QUALYFING_TYPES.QUALYFING_FETCH_START:
			return {
				...state,
				isLoading: true
			};

		case QUALYFING_TYPES.QUALYFING_FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				qualyfingResults: [
					...state?.qualyfingResults,
					{
						roundNo: payload.roundNo,
						results: payload.results
					}
				]
			};

		case QUALYFING_TYPES.QUALYFING_FETCH_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			};

		default:
			return initialQualyState;
	}
};
