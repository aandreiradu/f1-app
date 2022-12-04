import { useEffect, useState } from 'react';
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
import Footer from '../Footer/Footer';

const Users = () => {
	const seasonSchedule = useSelector(selectSchedule);
	const upcomingRace = useSelector(selectUpcomingEvent);
	console.error('!!!!!!upcomingRace!!!!', upcomingRace);
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
			try {
				if (seasonSchedule && seasonSchedule?.length > 0) {
					const upcomingEvent = seasonSchedule?.find(
						(event) => new Date(`${event?.date} ${event?.time}`) > new Date()
					);
					dispatch(setUpcomingEvent(upcomingEvent));
				} else {
					dispatch(fetchScheduleStart());
					sendRequest(
						{
							url: 'http://ergast.com/api/f1/current.json',
							method: 'GET',
							withCredentials: false,
							signal: controller.signal
						},
						(scheduleResponse) => {
							const currentSchedule = scheduleResponse?.MRData?.RaceTable?.Races;
							const upcomingEvent = currentSchedule?.find(
								(event) => new Date(`${event?.date} ${event?.time}`) > new Date()
							);
							isMounted && dispatch(setUpcomingEvent(upcomingEvent));
							isMounted && dispatch(fetchScheduleSuccess(currentSchedule));
						}
					);
				}
			} catch (errorSchedule) {
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
	}, [dispatch, sendRequest, seasonSchedule]);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getDrivers = async () => {
			try {
				if (!drivers?.length) {
					console.log('DRIVERS NOT IN STORE => REQUEST THEM');
					dispatch(fetchDriversStart());
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
							isMounted && dispatch(fetchDriversSuccess(driversArray));
						}
					);
				}
			} catch (error) {
				console.log('error Drivers request', error);
				dispatch(fetchDriversFailure(error));
			}
		};

		if (!drivers?.length) {
			console.log('drivers not in store => req', drivers);
			getDrivers();
		} else {
			console.log('drivers in store => no req', drivers);
		}

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [dispatch, sendRequest, drivers]);

	// useEffect(() => {
	// 	console.log('effect scroll');
	// 	window.scrollTo(0, 0);
	// 	window.scrollTo({
	// 		top: 0,
	// 		left: 0,
	// 		behavior: 'smooth'
	// 	});
	// });

	const confirmErrorModal = () => {
		setShowModal(false);
	};

	const onEventFinished = () => {
		const nextEvent = seasonSchedule?.find(
			(event) => new Date(event?.date) > new Date(upcomingRace?.date)
		);
		if (nextEvent && Object?.keys(nextEvent)?.length > 0) {
			dispatch(setUpcomingEvent(nextEvent));
		}
	};

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
							{upcomingRace && (
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
							)}
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
												?.includes(searchedDriver.toLowerCase()) ||
											driver?.Driver.givenName
												?.toLowerCase()
												?.includes(searchedDriver?.toLowerCase())
										) {
											const driverProfilePic = driversScheduleImages.find(
												(driverImg) => driver?.Driver?.driverId === driverImg?.driverId
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
				<Footer />
			</>
		);
	}

	return content;
};

export default Users;
