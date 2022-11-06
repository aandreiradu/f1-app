import { createAction } from '../../Utils/reducer/createAction';
import { ADD_BET_TYPE } from './addBet.types';

const addBetStart = () => createAction(ADD_BET_TYPE.BETS_ADD_START);

const addBetSuccess = (selectedBet) => createAction(ADD_BET_TYPE.BETS_ADD_SUCCESS, selectedBet);

const addBetFailure = (error) => createAction(ADD_BET_TYPE.BETS_ADD_FAILURE, error);

module.exports = {
	addBetFailure,
	addBetStart,
	addBetSuccess
};
