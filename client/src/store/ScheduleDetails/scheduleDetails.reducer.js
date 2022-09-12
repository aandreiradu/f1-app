import { SCHEDULE_DETAILS_TYPES } from "./scheduleDetails.types";


const initialState = {
    isLoading : false,
    scheduleDetails : [],
    error : null,
};


export const scheduleDetailsReducer = (state=initialState,action = {}) => {
    const { type,payload } = action;

    switch(type) {
        case SCHEDULE_DETAILS_TYPES.FETCH_SCHEDULE_DETAILS_START :
            return {
                ...state,
                isLoading : true
            }

        case SCHEDULE_DETAILS_TYPES.FETCH_SCHEDULE_DETAILS_SUCCESS :
            return {
                ...state,
                isLoading : false,
                scheduleDetails : [...state.scheduleDetails,payload]
            }

        case SCHEDULE_DETAILS_TYPES.FETCH_SCHEDULE_DETAILS_FAILURE :
            return {
                ...state,
                isLoading : false,
                error : payload
            }

        default :
            return state;
    }

}