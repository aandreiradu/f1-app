import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import circuitLayouts from '../../constants/circuitsLayouts';
import classes from '../Schedule/ScheduleItem.module.css';
import {
	AddBetContainer,
	AddBetTitle,
	CloseBet,
	CircuitInfo,
	BetRaceSeasonRound,
	BetRaceName,
	BetRaceDate,
	BetEventInfo,
	CircuitLayout
} from './AddBet.styles';
import { useState } from 'react';
import BetResults from './BetResults';

const AddBet = ({ setPlaceBet, placeBet, raceName, raceDate, season, roundNo, circuitId }) => {
	console.log('circuitId', circuitId);
	const [bets, setBets] = useState({});
	const handlePlaceBet = () => {
		setPlaceBet((prevState) => !prevState);
	};

	return (
		<AddBetContainer placeBet={placeBet}>
			<CloseBet onClick={handlePlaceBet} icon={faCircleXmark} />
			<AddBetTitle>Place Your Bet</AddBetTitle>
			<BetEventInfo>
				<CircuitInfo>
					<BetRaceSeasonRound>{`Season ${season}, Round ${roundNo}`}</BetRaceSeasonRound>
					<BetRaceName>{raceName}</BetRaceName>
					<BetRaceDate>Race {raceDate}</BetRaceDate>
				</CircuitInfo>
				<CircuitLayout
					className={classes['notDisputed']}
					src={
						circuitLayouts.find(
							(circuit) => circuit.circuitId.toLocaleLowerCase() === circuitId.toLowerCase()
						)?.imgSrc
					}
					alt="circuit layout"
				/>
			</BetEventInfo>
			<BetResults />
		</AddBetContainer>
	);
};

export default AddBet;
