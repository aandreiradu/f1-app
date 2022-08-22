import { LAST_RACE_RESULT_TYPES } from "./lastRaceResult.types";


const lastRaceResultInitialState = {
    isLoading : false,
    results : [],
    error : null
};


export const lastRaceResultReducer = (state = lastRaceResultInitialState, action = {}) => {
    const { type,payload } = action;


    switch(type) {
        case LAST_RACE_RESULT_TYPES.FETCH_LAST_RACE_RESULT_START : 
            return {
                ...state,
                isLoading : true
            }

        case LAST_RACE_RESULT_TYPES.FETCH_LAST_RACE_RESULT_SUCCESS :
            return {
                ...state,
                isLoading : false,
                results : payload
            }

        case LAST_RACE_RESULT_TYPES.FETCH_LAST_RACE_RESULT_FAILURE :
            return {
                ...state,
                isLoading : false,
                error : payload
            }

        default :
            return state;
    }

}