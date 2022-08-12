import { createSelector } from "reselect";

const selectRaceResultsReducer = state => state.raceResults;

export const selectRaceResultReducer = createSelector(
    [selectRaceResultsReducer],
    race => race
);

export const selectRaceResults = createSelector(
    [selectRaceResultsReducer],
    (race) => race.results
);

export const raceResultsHasError = createSelector(
    [selectRaceResults],
    race => race.error
);
