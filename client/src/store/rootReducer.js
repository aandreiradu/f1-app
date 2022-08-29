import { combineReducers } from 'redux'
import { authReducer } from './Auth/auth.reducer';
import { raceResultsReducer } from './RaceResults/raceResults.reducer';
import { driversReducer } from './Drivers/drivers.reducer';
import { lastRaceResultReducer } from './LastRaceResult/lastRaceResult.reducer';
import { teamsReducer } from './Teams/teams.reducer';


const rootReducer = combineReducers({
    auth : authReducer,
    raceResults : raceResultsReducer,
    drivers : driversReducer,
    lastRaceResult : lastRaceResultReducer,
    teams : teamsReducer
});

export default rootReducer;