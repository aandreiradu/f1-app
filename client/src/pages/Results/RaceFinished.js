import React, { useEffect, useState } from 'react';
import useHttp from '../../hooks/useHttp';
import classes from '../Results/LastRaceResults.module.css';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import DriversRaceResults from '../../components/Results/DriversRaceResults';
import ErrorModal from '../../components/UI/ErrorModal';
import { DataNotPublished } from './RaceFinished.styles';
import useAxiosInterceptorsPublic from '../../hooks/useHttpInterceptorsPublic';

const RaceFinished = () => {
	const [showModal, setShowModal] = useState(true);
	const { round } = useParams();
	const [lastRaceResults, setLastResults] = useState([]);
	const { isLoading, error, sendRequest: fetchRaceResult } = useHttp();
	// const { isLoading,error,sendRequest } = useAxiosInterceptorsPublic();
	const [listCategory, setListCategory] = useState('LeaderBoard');

	useEffect(() => {
		const transformData = (responseData) => {
			console.log('responde data', responseData);
			setLastResults([responseData.MRData.RaceTable]);
		};
		fetchRaceResult(
			{ url: `https://ergast.com/api/f1/${new Date().getFullYear()}/${round}/results.json` },
			transformData
		);
		// let isMounted = true;
		// const controller = new AbortController();

		// const getRaceResultById = async () => {

		// };
	}, [fetchRaceResult, round]);

	const handleCategoryList = (e) => {
		let ctgTitle = e.target.closest('p').textContent;
		setListCategory(ctgTitle);
	};

	const activeLeaderBoard = listCategory === 'LeaderBoard' ? `${classes.categoryActive}` : '';
	const activeFastestLap = listCategory === 'Fastest Lap' ? `${classes.categoryActive}` : '';

	const confirmErrorModal = () => {
		setShowModal(false);
	};

	let content;
	if (error && showModal) {
		content = <ErrorModal onConfirm={confirmErrorModal} />;
	} else if (lastRaceResults?.length === 0) {
		content = (
			<DataNotPublished>
				<h2>We're still collecting data for the race report. Please come back later!</h2>
			</DataNotPublished>
		);
	} else {
		content = (
			<section className={classes.lastResultsSection}>
				{isLoading ? (
					<Loader />
				) : (
					lastRaceResults &&
					lastRaceResults?.length > 0 &&
					lastRaceResults?.map((result, index) => {
						console.log('RESULT HERE', result);
						return (
							<div key={index}>
								<div className={classes.circuitInfoWrapper} key={result?.round}>
									<p className={classes.circuitName}>{result?.Races[0]?.raceName || 'N/A'}</p>
									<div className={classes.circuitData}>
										<span>Laps {result?.Races[0]?.Results[0]?.laps || 'N/A'}</span>
										<span>
											Season {result?.Races[0]?.season || 'N/A'},Round{' '}
											{result?.Races[0]?.round || 'N/A'}
										</span>
										<span>
											{result?.Races[0]?.date || 'N/A'},
											{(result.Races[0]?.time || 'N/A').split('Z')[0]}
										</span>
									</div>
								</div>
								<div className={classes.category}>
									<p onClick={handleCategoryList} className={activeLeaderBoard}>
										LeaderBoard
									</p>
									<p onClick={handleCategoryList} className={activeFastestLap}>
										Fastest Lap
									</p>
								</div>
								<DriversRaceResults
									result={result?.Races[0]?.Results || []}
									listCategory={listCategory}
								/>
							</div>
						);
					})
				)}
				{!isLoading && (
					<div className={classes.actions_back}>
						<Link to={'/'}>Go Back</Link>
					</div>
				)}
			</section>
		);
	}

	return content;
};

export default RaceFinished;
