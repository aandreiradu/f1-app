import { combineReducers } from 'redux';
import { authReducer } from './Auth/auth.reducer';
import { raceResultsReducer } from './RaceResults/raceResults.reducer';
import { driversReducer } from './Drivers/drivers.reducer';
import { lastRaceResultReducer } from './LastRaceResult/lastRaceResult.reducer';
import { teamsReducer } from './Teams/teams.reducer';
import { scheduleReducer } from './Schedule/schedule.reducer';
import { scheduleDetailsReducer } from './ScheduleDetails/scheduleDetails.reducer';
import { qualyfingReducer } from './Qualyfing/qualyfing.reducer';
import { addBetReducer } from './AddBet/addBet.reducer';
import { shopTeamsReducer } from './Shop__Teams/shopTeams.reducer';
import { shopProductsReducer } from './Shop__Products/shopProducts.reducer';
import { storeUserReducer } from './Store__UserProducts/store__userProducts.reducer';

const rootReducer = combineReducers({
	auth: authReducer,
	raceResults: raceResultsReducer,
	drivers: driversReducer,
	lastRaceResult: lastRaceResultReducer,
	teams: teamsReducer,
	schedule: scheduleReducer,
	scheduleDetails: scheduleDetailsReducer,
	qualyfing: qualyfingReducer,
	addBet: addBetReducer,
	shopTeams: shopTeamsReducer,
	shopProducts: shopProductsReducer,
	shopUser: storeUserReducer
});

export default rootReducer;
