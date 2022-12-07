import { createSelector } from 'reselect';

const shopTeamsReducer = (state) => state.shopTeams;

export const selectShopTeams = createSelector(shopTeamsReducer, (state) => state.shopTeams);

export const shopTeamsSelector = createSelector(shopTeamsReducer, (state) => state);
