import { combineReducers } from 'redux'
import { authReducer } from './Auth/auth.reducer';
import { raceResultsReducer } from './RaceResults/raceResults.reducer';


const rootReducer = combineReducers({
    auth : authReducer,
    raceResults : raceResultsReducer
});

export default rootReducer;