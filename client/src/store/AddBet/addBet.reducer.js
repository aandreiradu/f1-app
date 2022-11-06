import { ADD_BET_TYPE } from './addBet.types';

const initialState = {
	isLoading: false,
	error: null,
	bets: []
};

export const addBetReducer = (state = initialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case ADD_BET_TYPE.BETS_ADD_START:
			return {
				...state,
				isLoading: true
			};

		case ADD_BET_TYPE.BETS_ADD_SUCCESS:
			return {
				...state,
				isLoading: false,
				bets: [...state.bets, ...payload]
			};

		case ADD_BET_TYPE.BETS_ADD_FAILURE:
			return {
				...state,
				error: payload
			};

		default:
			return initialState;
		// throw new Error(`Unhandled type for addBetReducer`, type);
	}
};
