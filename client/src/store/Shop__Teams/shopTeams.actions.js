import { createAction } from '../../Utils/reducer/createAction';
import { SHOP_TEAMS_TYPES } from './shopTeam.types';

export const fetchShopTeamsStart = () => createAction(SHOP_TEAMS_TYPES.FETCH_SHOP_TEAMS_START);

export const fetchShopTeamsSuccess = (shopTeams) =>
	createAction(SHOP_TEAMS_TYPES.FETCH_SHOP_TEAMS_SUCCESS, shopTeams);

export const fetchShopTeamsFailure = (error) =>
	createAction(SHOP_TEAMS_TYPES.FETCH_SHOP_TEAMS_FAILURE, error);
