import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSchedule, selectUpcomingEvent } from '../../store/Schedule/schedule.selector';
import classes from './Users.module.css';
import Category from '../Category/Category';
import { motion } from 'framer-motion';
import { driverCards } from '../../animationsPresets/animationsPresets';
import driversScheduleImages from '../../constants/scheduleImages';
import ErrorModal from '../UI/ErrorModal';
import Loader from '../Loader/Loader';
import SearchDriver from '../SearchDriver/SearchDriver';
import useAxiosInterceptorsPublic from '../../hooks/useHttpInterceptorsPublic';
import {
	fetchDriversStart,
	fetchDriversFailure,
	fetchDriversSuccess
} from '../../store/Drivers/drivers.actions';
import { selectDrivers } from '../../store/Drivers/drivers.selector';
import DriverCard from './DriverCard';
import UpComingRace from '../UpcomingRace/UpComingRace';
import {
	fetchScheduleStart,
	fetchScheduleSuccess,
	fetchScheduleFailure,
	setUpcomingEvent
} from '../../store/Schedule/schedule.actions';
import { buildWeekend } from '../../Utils/buildGPWeekend';

const Users = () => {
	console.log('render main');
	// const { drivers ,isLoading : isLoadingDrivers,error : errorDrivers  } = useSelector(selectDrivers);
	const seasonSchedule = useSelector(selectSchedule);
	const upcomingRace = useSelector(selectUpcomingEvent);
	console.log('upcomingRace', upcomingRace);
	const drivers = useSelector(selectDrivers);
	const dispatch = useDispatch();
	const { isLoading, error, sendRequest } = useAxiosInterceptorsPublic();
	const [showModal, setShowModal] = useState(true);
	const [searchedDriver, setSearchedDriver] = useState('');

	const handleDriverSearch = (searchInput) => {
		setSearchedDriver(searchInput);
	};

	// upcoming events
	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getSchedule = async () => {
			dispatch(fetchScheduleStart());

			try {
				if ((seasonSchedule && seasonSchedule?.length > 0) || upcomingRace) {
					console.log('avem season schedule setat, nu mai facem request', seasonSchedule);
				} else {
					sendRequest(
						{
							url: 'http://ergast.com/api/f1/current.json',
							method: 'GET',
							withCredentials: false,
							signal: controller.signal
						},
						(scheduleResponse) => {
							console.log('scheduleResponse ', scheduleResponse);
							const currentSchedule = scheduleResponse?.MRData?.RaceTable?.Races;
							console.log('currentSchedule', currentSchedule);
							const upcomingEvent = currentSchedule?.find(
								(event) => new Date(`${event?.date} ${event?.time}`) > new Date()
							);
							console.log('upcomingEvent', upcomingEvent);
							isMounted && dispatch(setUpcomingEvent(upcomingEvent));
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

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getDrivers = async () => {
			console.log('getDrivers RUN');
			dispatch(fetchDriversStart());

			try {
				if (!drivers?.length > 0) {
					console.log('n-avem drivers, request', drivers);
					sendRequest(
						{
							url: 'http://ergast.com/api/f1/current/driverStandings.json',
							method: 'GET',
							data: null,
							headers: null,
							withCredentials: false,
							signal: controller.signal
						},
						(dataSet) => {
							const driversArray =
								dataSet?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings;
							console.log('driversArray', driversArray);
							isMounted && dispatch(fetchDriversSuccess(driversArray));
						}
					);
				}
			} catch (error) {
				console.log('error Drivers request', error);
				dispatch(fetchDriversFailure(error));
			}
		};

		getDrivers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [dispatch, sendRequest]);

	const confirmErrorModal = () => {
		setShowModal(false);
	};

	const onEventFinished = useCallback(() => {
		const nextEvent = seasonSchedule?.find(
			(event) => new Date(event.date) > new Date(upcomingRace.date)
		);
		if (nextEvent && Object?.keys(nextEvent)?.length > 0) {
			dispatch(setUpcomingEvent(nextEvent));
		}
	}, [upcomingRace]);

	let content;

	if (error /*|| errorDrivers*/ && showModal) {
		content = <ErrorModal title="Ooops!" message={error?.message} onConfirm={confirmErrorModal} />;
	} else {
		content = (
			<>
				<Category />
				<>
					{isLoading /*|| isLoadingDrivers*/ ? (
						<Loader />
					) : (
						<>
							<UpComingRace
								countryHost={upcomingRace?.Circuit?.Location?.country}
								raceDate={
									upcomingRace
										? buildWeekend(
												new Date(
													`${upcomingRace.FirstPractice.date} ${upcomingRace.FirstPractice.time}`
												),
												new Date(`${upcomingRace?.date} ${upcomingRace?.time}`)
										  )
										: ''
								}
								raceName={upcomingRace?.raceName}
								upcomingRace={upcomingRace}
								onEventFinished={onEventFinished}
							/>
							<SearchDriver onSearch={handleDriverSearch} />
							<motion.ul
								variants={driverCards.containerDriverCards}
								initial="hidden"
								animate="visible"
								className={classes.usersList}
							>
								{drivers &&
									drivers?.map((driver, index) => {
										if (
											driver?.Driver?.familyName
												?.toLowerCase()
												.includes(searchedDriver.toLowerCase()) ||
											driver?.Driver.givenName?.toLowerCase().includes(searchedDriver.toLowerCase())
										) {
											const driverProfilePic = driversScheduleImages.find(
												(driverImg) => driver?.Driver?.driverId === driverImg.driverId
											);
											return (
												<DriverCard
													key={driver?.Driver?.driverId || index}
													driverId={driver?.Driver?.driverId}
													driverRank={driver?.position}
													driverPoints={driver?.points}
													driverName={`${driver?.Driver?.givenName} ${driver?.Driver?.familyName}`}
													driverNationality={driver?.Driver?.nationality}
													constructorName={driver?.Constructors[0]?.name}
													constructorId={driver?.Constructors[0]?.constructorId}
													driverProfilePic={driverProfilePic?.imgSrc}
													driverNumber={driverProfilePic?.imgNumber}
													driverNationalityFlag={driverProfilePic?.nationalityFlag}
												/>
											);
										}
									})}
							</motion.ul>
						</>
					)}
				</>
			</>
		);
	}

	return content;
};

export default Users;
