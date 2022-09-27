import { combineReducers } from 'redux';
import { authReducer } from './Auth/auth.reducer';
import { raceResultsReducer } from './RaceResults/raceResults.reducer';
import { driversReducer } from './Drivers/drivers.reducer';
import { lastRaceResultReducer } from './LastRaceResult/lastRaceResult.reducer';
import { teamsReducer } from './Teams/teams.reducer';
import { scheduleReducer } from './Schedule/schedule.reducer';
import { scheduleDetailsReducer } from './ScheduleDetails/scheduleDetails.reducer';

const rootReducer = combineReducers({
	auth: authReducer,
	raceResults: raceResultsReducer,
	drivers: driversReducer,
	lastRaceResult: lastRaceResultReducer,
	teams: teamsReducer,
	schedule: scheduleReducer,
	scheduleDetails: scheduleDetailsReducer
});

export default rootReducer;
