import { createSelector } from "reselect";



const scheduleDetailsReducer = state => state.scheduleDetails;

export const selectScheduleDetails = createSelector(
    scheduleDetailsReducer,
    (state) => state.scheduleDetails
)