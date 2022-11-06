import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import circuitLayouts from '../../constants/circuitsLayouts';
import {
	AddBetContainer,
	AddBetTitle,
	CloseBet,
	CircuitInfo,
	BetRaceSeasonRound,
	BetRaceName,
	BetRaceDate,
	BetEventInfo,
	CircuitLayout,
	PlaceBetBtn,
	PlaceBetBtnContainer,
	GenerateBetContainer
} from './AddBet.styles';
import { useState } from 'react';
import BetResults from './BetResults';
import { useEffect } from 'react';
import { selectedDriversBet } from '../../store/Drivers/drivers.selector';
import { useSelector } from 'react-redux';
import Overlay from '../UI/Overlay/Overlay';

const AddBet = ({ setPlaceBet, placeBet, raceName, raceDate, season, roundNo, circuitId }) => {
	const [isSubmitValid, setIsSubmitValid] = useState(false);
	const drivers = useSelector(selectedDriversBet);
	const [bets, setBets] = useState([0, 0, 0]);
	const handlePlaceBet = () => {
		setPlaceBet((prevState) => !prevState);
	};

	const handleSelectedDriverForBetting = (key, name, position, betsPosition) => {
		console.log('handleSelectedDriverForBetting received', key, name, position, betsPosition);

		const updatedBets = [...bets];
		updatedBets[betsPosition] = {
			key,
			name,
			position
		};

		console.log('before setting state', updatedBets);
		setBets(updatedBets);
	};

	const handleRemoveBetSelected = (betPosition, key) => {
		console.log('handleRemoveBetSelected received', betPosition, key);

		setBets((prev) => {
			const updatedBets = [...prev];
			updatedBets[betPosition - 1] = 0;

			console.log('setting bet state to this', updatedBets);
			return updatedBets;
		});
	};

	useEffect(() => {
		console.log('bets state', bets);
		console.log('isSubmitValid', isSubmitValid);

		const isValid = bets.filter((bets) => bets?.key && bets?.name && bets?.position && bets !== 0);
		console.log('isValid', isValid);
		if (isValid.length === 3) {
			setIsSubmitValid(true);
		}
	}, [bets]);

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
					src={
						circuitLayouts.find(
							(circuit) => circuit.circuitId.toLocaleLowerCase() === circuitId.toLowerCase()
						)?.imgSrc
					}
					alt="circuit layout"
				/>
			</BetEventInfo>
			<BetResults
				bets={bets}
				drivers={drivers}
				handleSelectedDriverForBetting={handleSelectedDriverForBetting}
				handleRemoveBetSelected={handleRemoveBetSelected}
			/>
			<PlaceBetBtnContainer>
				<PlaceBetBtn disabled={!isSubmitValid}>Place Bet</PlaceBetBtn>
			</PlaceBetBtnContainer>
		</AddBetContainer>
	);
};

export default AddBet;
