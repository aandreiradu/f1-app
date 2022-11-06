import { createSelector } from 'reselect';

const selectDriversReducer = (state) => state.drivers;

export const selectDriversMainReducer = createSelector(selectDriversReducer, (state) => state);

export const selectDrivers = createSelector(selectDriversReducer, (state) => state.drivers);

export const selectedDriversBet = createSelector(selectDriversReducer, (state) => {
	const driversBet = state?.drivers?.map((driver) => {
		return {
			key: driver?.Driver?.code,
			name: `${driver?.Driver.givenName} ${driver?.Driver.familyName}`
		};
	});

	return driversBet;
});
