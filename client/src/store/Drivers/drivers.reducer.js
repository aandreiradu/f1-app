import { DRIVERS_TYPES } from "./drivers.types";

const DRIVERS_INITIAL_STATE = {
    isLoading : false,
    drivers : [],
    error : null,
}


export const driversReducer = (state=DRIVERS_INITIAL_STATE, action = {}) => {
    const { type,payload } = action;

    switch(type) {
        case DRIVERS_TYPES.FETCH_DRIVERS_START :
            return {
                ...state,
                isLoading : true
            }

        case DRIVERS_TYPES.FETCH_DRIVERS_SUCCESS :
            return {
                ...state,
                isLoading : false,
                drivers : payload
            }

        case DRIVERS_TYPES.FETCH_DRIVERS_FAILURE : 
            return {
                ...state,
                isLoading : false,
                error : payload
            }

        default :
            return state;
    }


}