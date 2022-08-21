import { combineReducers } from 'redux'
import { authReducer } from './Auth/auth.reducer';
import { raceResultsReducer } from './RaceResults/raceResults.reducer';
import { driversReducer } from './Drivers/drivers.reducer';


const rootReducer = combineReducers({
    auth : authReducer,
    raceResults : raceResultsReducer,
    drivers : driversReducer
});

export default rootReducer;