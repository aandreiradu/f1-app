import { RACE_RESULTS_TYPES } from "./raceResults.types";

export const RACE_RESULTS_INITIAL_STATE = {
    isLoading : false,
    results : [],
    error : null
};


export const raceResultsReducer = (state=RACE_RESULTS_INITIAL_STATE,action = {}) => {
    const {type,payload } = action;

    switch(type) {
        case RACE_RESULTS_TYPES.FETCH_RACE_RESULTS_START :
            return {
                ...state,
                isLoading : true
            }

        case RACE_RESULTS_TYPES.FETCH_RACE_RESULTS_SUCCESS :
            return {
                ...state,
                isLoading : false,
                error : null,
                results : payload
            }

        case RACE_RESULTS_TYPES.FETCH_RACE_RESULTS_FAILURE :
            return {
                ...state,
                isLoading : false,
                error : payload
            }

        default :
            return state
    }
}