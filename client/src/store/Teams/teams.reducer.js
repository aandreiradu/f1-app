import { TEAMS_TYPES } from "./teams.types";


const TEAMS_INITIAL_STATE = {
    isLoading : false,
    constructor: [],
    drivers : [],
    error : null,
}

export const teamsReducer = (state = TEAMS_INITIAL_STATE, action = {}) => {
    const { payload,type } = action;

    switch(type) {
        case TEAMS_TYPES.FETCH_TEAMS_START :
            return {
                ...state,
                isLoading : true,
            }

        case TEAMS_TYPES.FETCH_TEAMS_CONSTRUCTOR_SUCCESSS :
            return {
                ...state,
                isLoading : false,
                constructor : payload,
            }

        case TEAMS_TYPES.FETCH_TEAMS_DRIVERS_SUCCESSS :
            return {
                ...state,
                isLoading : false,
                drivers : payload
            }

        case TEAMS_TYPES.FETCH_TEAMS_FAILURE :
            return {
                ...state,
                isLoading : false,
                error : payload
            }


        default:
            return state
    }
};