import { createSelector } from 'reselect';

const addBetReducer = (state) => state.addBetReducer;

export const selectAllBets = createSelector(addBetReducer, (state) => state.bets);

export const selectBetByRaceId = (raceId) => {
	return createSelector(addBetReducer, (state) =>
		state?.bets?.find((bet) => bet.raceId === raceId)
	);
};
