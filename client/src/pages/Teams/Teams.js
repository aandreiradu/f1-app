import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import classes from './Teams.module.css';
import TeamItem from './TeamItem';
import ErrorModal from '../../components/UI/ErrorModal';
import {
	fetchTeamsStart,
	fetchTeamsFailure,
	fetchTeamsConstructorSuccess,
	fetchTeamsDriversSuccess
} from '../../store/Teams/teams.actions';
import useAxiosInterceptors from '../../hooks/useHttpInterceptors';
import useAxiosInterceptorsPublic from '../../hooks/useHttpInterceptorsPublic';
import { useDispatch, useSelector } from 'react-redux';
import { teamsDriversSelector, constructorsSelector } from '../../store/Teams/teams.selector';

const buildLineUpByConstructorId = (cid, teams, drivers) => {
	let lineUp = [];
	teams.forEach((team) => {
		drivers?.filter((driver) => {
			if (driver.Constructors[0].constructorId === cid) {
				const { givenName, familyName } = driver.Driver;
				if (
					!lineUp.find((imported) => imported.givenName === driver.Driver.givenName) &&
					driver.Driver.familyName !== 'Hülkenberg'
				) {
					lineUp = [
						...lineUp,
						{ constructorId: driver.Constructors[0].constructorId, givenName, familyName }
					];
				}
			}
		});
	});
	return lineUp;
};

const Teams = () => {
	const teamsDrivers = useSelector(teamsDriversSelector);
	const teams = useSelector(constructorsSelector);
	console.log('teamsDrivers', teamsDrivers);
	console.log('teams', teams);
	const dispatch = useDispatch();
	const {
		isLoading: isLoadingDrivers,
		error: errorDrivers,
		sendRequest: sendRequestDrivers
	} = useAxiosInterceptorsPublic();
	const {
		isLoading: isLoadingConstructors,
		error: errorConstructor,
		sendRequest: sendRequestConstructor
	} = useAxiosInterceptorsPublic();
	const [showModal, setShowModal] = useState(true);

	const confirmErrorModal = () => {
		setShowModal(false);
	};

	// build teams (fetch drivers and constructors)
	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getDrivers = async () => {
			dispatch(fetchTeamsStart());
			try {
				sendRequestDrivers(
					{
						url: 'http://ergast.com/api/f1/current/driverStandings.json',
						method: 'GET',
						withCredentials: false,
						signal: controller.signal
					},
					(driversResponse) => {
						console.log('driversResponse', driversResponse);
						const driversStandings =
							driversResponse?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings;
						console.log('driversStandings', driversStandings);
						isMounted && dispatch(fetchTeamsDriversSuccess(driversStandings));
					}
				);
			} catch (error) {
				console.log('error TEAMS getDrivers', error);
				dispatch(
					fetchTeamsFailure(error?.message || 'Something went wrong. Please try again later!')
				);
			}
		};

		const getConstructors = async () => {
			dispatch(fetchTeamsStart());
			try {
				sendRequestDrivers(
					{
						url: 'http://ergast.com/api/f1/current/constructorStandings.json',
						method: 'GET',
						withCredentials: false,
						signal: controller.signal
					},
					(constructorResponse) => {
						console.log('constructorResponse', constructorResponse);
						const teamsSorted =
							constructorResponse?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings?.sort(
								(a, b) => b?.points - a?.points
							);
						isMounted && dispatch(fetchTeamsConstructorSuccess(teamsSorted));
					}
				);
			} catch (error) {
				console.log('error TEAMS getDrivers', error);
				dispatch(
					fetchTeamsFailure(error?.message || 'Something went wrong. Please try again later!')
				);
			}
		};

		getDrivers();
		getConstructors();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [dispatch, sendRequestDrivers, sendRequestConstructor]);

	return (
		<div className={`${classes.wrapper} defaultTransition`}>
			<div className={classes['teams-header']}>
				<h1 className={classes['header-title']}>F1 Teams {new Date().getFullYear()}</h1>
			</div>
			{(errorConstructor || errorDrivers) && showModal && (
				<ErrorModal
					title="Ooops!"
					message={
						errorConstructor?.message ||
						errorDrivers?.message ||
						'Something went wrong. Please try again later!'
					}
					onConfirm={confirmErrorModal}
				/>
			)}
			{isLoadingConstructors || isLoadingDrivers ? (
				<Loader />
			) : (
				<div className={classes['teams-results']}>
					{teams &&
						teams?.map((team, index) => {
							const lineup = buildLineUpByConstructorId(
								team?.Constructor?.constructorId,
								teams,
								teamsDrivers
							);
							return (
								<TeamItem
									key={team?.Constructor?.constructorId}
									points={team?.points}
									name={team?.Constructor?.name}
									currentPosition={team?.position}
									constructorId={team?.Constructor?.constructorId}
									drivers={lineup}
								/>
							);
						})}
				</div>
			)}
		</div>
	);
};

export default Teams;
