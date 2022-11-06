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
	PlaceBetBtnContainer
} from './AddBet.styles';
import { useState } from 'react';
import BetResults from './BetResults';
import { useEffect } from 'react';
import { selectedDriversBet } from '../../store/Drivers/drivers.selector';
import { useSelector } from 'react-redux';
import Overlay from '../UI/Overlay/Overlay';
import useAxiosInterceptors from '../../hooks/useHttpInterceptors';
import { useRef } from 'react';
import ErrorModal from '../UI/ErrorModal';
import LoaderIcon from '../LoaderReusable/LoaderIcon';

const AddBet = ({ setPlaceBet, placeBet, raceName, raceDate, season, roundNo, circuitId }) => {
	const [isSubmited, setIsSubmited] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [errorBet, setErrorBet] = useState('');
	const [bets, setBets] = useState([0, 0, 0]);
	const [isSubmitValid, setIsSubmitValid] = useState(false);
	const submitBetRef = useRef();
	const { isLoading, sendRequest, error } = useAxiosInterceptors();
	const drivers = useSelector(selectedDriversBet);

	useEffect(() => {
		const isValid = bets.filter((bets) => bets?.key && bets?.name && bets?.position && bets !== 0);
		console.log('isValid', isValid);
		setIsSubmitValid(isValid.length === 3 ?? false);
		console.log('bets', bets);
	}, [bets]);

	useEffect(() => {
		console.error('error effect run', error);
		if (error) {
			const { message, statusCode, existingBet, predictedPodium } = error;
			if (existingBet === true && statusCode === 400) {
				console.log('existingBet', existingBet);
				console.log('existing bet found. predicted podium is', predictedPodium);
				setShowModal(true);
				const predictedSort = JSON.parse(predictedPodium);
				console.log('predictedSort', predictedSort);

				const outputContent = (
					<>
						<p>{message}</p>
						<p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Podium Predicted:</p>
						<ul>
							{predictedSort?.map((source, index) => (
								<li position={index + 1} style={{ fontWeight: 'bold', fontSize: '1rem' }}>
									P{index + 1} {source.name}
								</li>
							))}
						</ul>
					</>
				);

				setErrorBet({
					title: 'Existing Bet Found',
					message: outputContent
				});
			}
		}
	}, [error]);

	const confirmErrorModal = () => {
		setShowModal(false);
		setErrorBet('');
		setIsSubmited(false);
		submitBetRef.current.disabled = false;
	};

	const handlePlaceBetPopUp = () => {
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

	const interpretResponsePlaceBet = (responseData) => {
		console.log('responseData', responseData);
		const { message, statusCode } = responseData;

		if (message === 'New bet inserted successfully' && statusCode === 201) {
			// dispatch and add to store.

			setShowModal(true);
			setErrorBet({
				title: 'Congratulations',
				message: 'Bet Registered Succesfully, Good Luck!'
			});
			setTimeout(() => {
				setPlaceBet(false);
			}, 5000);
		}
	};

	const submitBet = () => {
		submitBetRef.current.disabled = true;
		setIsSubmited(true);

		const controller = new AbortController();
		const payload = {};
		payload.podium = [...bets];
		payload.roundNo = roundNo || null;
		payload.raceName = raceName || null;
		payload.year = season || null;
		console.log(payload);

		sendRequest(
			{
				url: '/api/addRaceBet',
				method: 'POST',
				body: payload,
				withCredentials: true,
				controller: controller.signal
			},
			interpretResponsePlaceBet
		);
	};

	return (
		<AddBetContainer placeBet={placeBet}>
			{errorBet && showModal && (
				<ErrorModal
					title={errorBet?.title}
					message={errorBet?.message}
					onConfirm={confirmErrorModal}
				/>
			)}
			<CloseBet onClick={handlePlaceBetPopUp} icon={faCircleXmark} />
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
				isSubmited={isSubmited}
				bets={bets}
				drivers={drivers}
				handleSelectedDriverForBetting={handleSelectedDriverForBetting}
				handleRemoveBetSelected={handleRemoveBetSelected}
			/>
			{isSubmitValid && (
				<PlaceBetBtnContainer show={isSubmitValid}>
					{!isLoading ? (
						<PlaceBetBtn disabled={!isSubmitValid} onClick={submitBet} ref={submitBetRef}>
							Place Bet
						</PlaceBetBtn>
					) : (
						<LoaderIcon />
					)}
				</PlaceBetBtnContainer>
			)}
		</AddBetContainer>
	);
};

export default AddBet;
