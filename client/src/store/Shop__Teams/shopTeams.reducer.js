import { SHOP_TEAMS_TYPES } from './shopTeam.types';

const shopTeamsInitialState = {
	isLoading: false,
	shopTeams: [],
	error: null
};

export const shopTeamsReducer = (state = shopTeamsInitialState, action = {}) => {
	const { payload, type } = action;

	switch (type) {
		case SHOP_TEAMS_TYPES.FETCH_SHOP_TEAMS_START:
			return {
				...state,
				isLoading: true
			};

		case SHOP_TEAMS_TYPES.FETCH_SHOP_TEAMS_SUCCESS:
			return {
				...state,
				isLoading: false,
				shopTeams: payload,
				error: null
			};

		case SHOP_TEAMS_TYPES.FETCH_SHOP_TEAMS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			};

		default:
			return state;
	}
};
