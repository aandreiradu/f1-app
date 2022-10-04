import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
// import classes from "./Schedule.module.css";
import ScheduleItem from './ScheduleItem';
import ErrorModal from '../UI/ErrorModal';
import {
	fetchRaceResultsStart,
	fetchRaceResultsSuccess,
	fetchRaceResultsFailure
} from '../../store/RaceResults/raceResults.actions';
import {
	fetchScheduleStart,
	fetchScheduleSuccess,
	fetchScheduleFailure
} from '../../store/Schedule/schedule.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectRaceResults } from '../../store/RaceResults/raceResults.selector';
import useAxiosInterceptors from '../../hooks/useHttpInterceptors';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/Auth/auth.actions';
import {
	ScheduleWrapper,
	ScheduleHeader,
	ScheduleHeaderTitle,
	ScheduleHeaderCompetition,
	ScheduleResults
} from './Schedule.styles';
import { selectSchedule } from '../../store/Schedule/schedule.selector';
import useAxiosInterceptorsPublic from '../../hooks/useHttpInterceptorsPublic';

const Schedule = () => {
	const seasonSchedule = useSelector(selectSchedule);
	const raceResults = useSelector(selectRaceResults);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(true);
	const {
		isLoading: isLoadingRR,
		error: errorRR,
		sendRequest: sendRequestRR
	} = useAxiosInterceptorsPublic();
	const {
		isLoading: isLoadingFinishedRaces,
		error: errorFinishedRaces,
		sendRequest: sendRequestFinishedRaces
	} = useAxiosInterceptors();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getRaceResults = async () => {
			dispatch(fetchRaceResultsStart());
			try {
				if (raceResults && raceResults?.length > 0) {
					console.log('avem raceResults, nu mai facem request', raceResults);
				} else {
					sendRequestFinishedRaces(
						{
							url: '/api/getRaceResultByYear',
							method: 'POST',
							body: {
								year: new Date().getFullYear()
							},
							withCredentials: true,
							signal: controller.signal
						},
						(responseFinishedRaces) => {
							console.log('responseFinishedRaces', responseFinishedRaces);
							isMounted && dispatch(fetchRaceResultsSuccess(responseFinishedRaces));
						}
					);
				}
			} catch (error) {
				const {
					response: {
						data: { message, statusCode }
					}
				} = error || null;
				console.log(message, statusCode);

				if (message === 'Unauthorized' && statusCode === 401) {
					dispatch(logout());
					navigate('/login');
				}

				dispatch(fetchRaceResultsFailure({ message, statusCode } || error));
			}
		};

		getRaceResults();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getSchedule = async () => {
			dispatch(fetchScheduleStart());

			try {
				if (seasonSchedule && seasonSchedule?.length > 0) {
					console.log('avem season schedule setat boss, nu mai facem request', seasonSchedule);
				} else {
					sendRequestRR(
						{
							url: 'https://ergast.com/api/f1/current.json',
							method: 'GET',
							withCredentials: false,
							signal: controller.signal
						},
						(scheduleResponse) => {
							console.log('scheduleResponse ', scheduleResponse);
							const currentSchedule = scheduleResponse?.MRData?.RaceTable?.Races;
							isMounted && dispatch(fetchScheduleSuccess(currentSchedule));
						}
					);
				}
			} catch (errorSchedule) {
				console.log('ERROR ON GETTING CURRENT SCHEDULE', errorSchedule);
				dispatch(
					fetchScheduleFailure(
						errorSchedule?.message || errorSchedule || 'Someting went wrong! Try again later.'
					)
				);
			}
		};
		getSchedule();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const confirmErrorModal = () => {
		setShowModal(false);
	};

	return (
		<ScheduleWrapper className={`defaultTransition`}>
			<>
				<ScheduleHeader>
					<ScheduleHeaderTitle>F1 Schedule {new Date().getFullYear()}</ScheduleHeaderTitle>
					<ScheduleHeaderCompetition>
						{new Date().getFullYear()} FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR
					</ScheduleHeaderCompetition>
				</ScheduleHeader>
				{errorRR && showModal && (
					<ErrorModal title="Oops!" message={errorRR?.message} onConfirm={confirmErrorModal} />
				)}
				{(errorFinishedRaces || errorRR) && showModal && (
					<ErrorModal
						message={errorFinishedRaces?.message || errorRR?.message || 'Someting went wrong!'}
						title={'Someting went wrong!'}
						onConfirm={confirmErrorModal}
					/>
				)}
				<ScheduleResults>
					{isLoadingFinishedRaces || isLoadingRR ? (
						<Loader />
					) : (
						seasonSchedule &&
						seasonSchedule?.map((item) => (
							<ScheduleItem
								key={item?.round}
								circuitId={item?.Circuit?.circuitId}
								thisRoundResults={raceResults[item?.round - 1]}
								round={item?.round}
								raceName={item?.raceName}
								raceDate={item?.date}
								fp1={item?.FirstPractice?.date}
								country={item.Circuit?.Location?.country}
							/>
						))
					)}
				</ScheduleResults>
			</>
		</ScheduleWrapper>
	);
};

export default Schedule;
