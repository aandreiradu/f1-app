import { TEAMS_TYPES } from './teams.types';
import { createAction } from '../../Utils/reducer/createAction';

export const fetchTeamsStart = () => createAction(TEAMS_TYPES.FETCH_TEAMS_START);

export const fetchTeamsConstructorSuccess = (teamsData) =>
	createAction(TEAMS_TYPES.FETCH_TEAMS_CONSTRUCTOR_SUCCESSS, teamsData);

export const fetchTeamsDriversSuccess = (teamsData) =>
	createAction(TEAMS_TYPES.FETCH_TEAMS_DRIVERS_SUCCESSS, teamsData);

export const fetchTeamsFailure = (error) => createAction(TEAMS_TYPES.FETCH_TEAMS_FAILURE, error);
