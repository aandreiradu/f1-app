import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import driversImageAndMoreInfo from '../../constants/driversImages';
import Loader from '../../components/Loader/Loader';
import classes from './UserInfo.module.css';
import {
	QualyResultsTable,
	TableBody,
	TableHeader,
	TableRow
} from '../Qualyfing/QualyfingResultItem.styles';

const UserInfo = () => {
	const [lastSeasonInfo, setLastSeasonInfo] = useState([]);
	const [driverStandings, setDriverStandings] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const params = useParams();
	const { driverId } = params;

	const getUserInfoById = useCallback(async () => {
		setIsLoading(true);
		const response = await fetch(
			`http://ergast.com/api/f1/drivers/${driverId}/driverStandings.json`
		);

		if (!response.ok) {
			setIsLoading(false);
			throw new Error("Can't fetch data");
		}

		const responseData = await response.json();

		if (responseData?.MRData?.StandingsTable?.StandingsLists?.length > 0) {
			const standingsList = responseData.MRData.StandingsTable.StandingsLists;
			setDriverStandings(standingsList);

			const lastSeason = standingsList[standingsList.length - 1];
			const lsInfo = [
				{
					season: lastSeason.season,
					...lastSeason.DriverStandings[0]
				}
			];
			setLastSeasonInfo(lsInfo);
			setIsLoading(false);
		} else {
			setIsLoading(false);
		}
	}, [driverId]);

	useEffect(() => {
		getUserInfoById();
	}, [driverId, getUserInfoById]);

	let content;
	if (lastSeasonInfo && lastSeasonInfo.length > 0 && !isLoading) {
		content = (
			<div className={classes.driverInfo}>
				<section>
					<ul>
						{lastSeasonInfo.map((item) => (
							<li className={classes.driverInfoWrapper} key={item.Driver.driverId}>
								<div className={classes.userProfilePic}>
									<img
										src={
											driversImageAndMoreInfo.find((driver) => driver.driverId === driverId).imgSrc
										}
										alt="profile pic"
									/>
									<div className={classes.carNumberAndName}>
										<p>{`${item.Driver.givenName} ${item.Driver.familyName}`}</p>
									</div>
								</div>
								<div className={classes.userInfo}>
									<p>
										Code: <span> {item.Driver.code}</span>
									</p>
									<p>
										Team: <span>{item.Constructors[0].name}</span>
									</p>
									<p>
										Date of birth: <span> {item.Driver.dateOfBirth}</span>
									</p>
									<p>
										Nationality: <span> {item.Driver.nationality}</span>
									</p>
									<p>
										Season {item.season} drivers championship position: <span>{item.position}</span>
									</p>
									<p>
										Season {item.season} points: <span>{item.points}</span>
									</p>
									<p>
										Season {item.season} wins: <span>{item.wins}</span>
									</p>
								</div>
							</li>
						))}
					</ul>
				</section>
				<QualyResultsTable>
					<TableHeader>
						<tr>
							<th>Season</th>
							<th>Rounds</th>
							<th>WDC Position</th>
							<th>WDC Points</th>
							<th>Wins</th>
							<th>Constructor</th>
						</tr>
					</TableHeader>
					<TableBody>
						{driverStandings
							.sort((a, b) => b?.season - a?.season)
							.map((item) => (
								<TableRow key={item?.season}>
									<td>{item?.season}</td>
									<td>{item?.round}</td>
									<td>{item?.DriverStandings[0]?.position}</td>
									<td>{item?.DriverStandings[0]?.points}</td>
									<td>{item?.DriverStandings[0]?.wins}</td>
									<td>{item?.DriverStandings[0]?.Constructors[0]?.name}</td>
								</TableRow>
							))}
					</TableBody>
				</QualyResultsTable>
				<div className={classes.actions_back}>
					<Link to={'/'}>Go Back</Link>
				</div>
			</div>
		);
	} else if (!isLoading) {
		content = (
			<>
				<p className={classes.fallback}>
					Currently, there are no informations about this driver. Maybe search for another one? 🤔
				</p>
				<div className={classes.actions_back}>
					<Link to={'/'}>Go Back</Link>
				</div>
			</>
		);
	} else if (isLoading) {
		content = <Loader />;
	}

	return content;
};

export default UserInfo;
