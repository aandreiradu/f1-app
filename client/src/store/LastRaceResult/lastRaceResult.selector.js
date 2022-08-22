import { createSelector } from "reselect";
import { LAST_RACE_RESULT_TYPES } from "./lastRaceResult.types";


export const selectLastResultReducer = state => state.lastRaceResult;


export const selectLastRaceResultState = createSelector(
    selectLastResultReducer,
    state => state
)

export const selectLastResults = createSelector(
    selectLastResultReducer,
    (state) => state.results
);