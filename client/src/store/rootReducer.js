import { combineReducers } from 'redux'
import { authReducer } from './Auth/auth.reducer';
import { raceResultsReducer } from './RaceResults/raceResults.reducer';
import { driversReducer } from './Drivers/drivers.reducer';
import { lastRaceResultReducer } from './LastRaceResult/lastRaceResult.reducer';


const rootReducer = combineReducers({
    auth : authReducer,
    raceResults : raceResultsReducer,
    drivers : driversReducer,
    lastRaceResult : lastRaceResultReducer
});

export default rootReducer;