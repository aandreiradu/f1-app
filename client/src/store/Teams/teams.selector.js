import { createSelector } from 'reselect';

const teamsReducer = (state) => state.teams;

export const teamsDriversSelector = createSelector(teamsReducer, (state) => state.drivers);

export const constructorsSelector = createSelector(teamsReducer, (state) => state.constructor);
