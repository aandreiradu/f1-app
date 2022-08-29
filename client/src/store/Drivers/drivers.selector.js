import { createSelector } from "reselect";


const selectDriversReducer = state => state.drivers;


export const selectDriversMainReducer = createSelector(
    selectDriversReducer,
    state => state
);

export const selectDrivers = createSelector(
    selectDriversReducer,
    (state) => state.drivers
);