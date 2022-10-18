import { createSelector } from 'reselect';

const teamsReducer = (state) => state.teams;

export const constructorsSelector = createSelector(teamsReducer, (state) => state.constructor);
