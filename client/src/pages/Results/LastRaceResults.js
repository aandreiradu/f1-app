import React, { useEffect, useState } from 'react';
import classes from './LastRaceResults.module.css';
import Loader from '../../components/Loader/Loader';
import DriversRaceResults from '../../components/Results/DriversRaceResults';
import ErrorModal from '../../components/UI/ErrorModal';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchLastRaceResultStart,
	fetchLastRaceResultSuccess,
	fetchLastRaceResultFailure
} from '../../store/LastRaceResult/lastRaceResult.actions';
import { selectLastResults } from '../../store/LastRaceResult/lastRaceResult.selector';
import useAxiosInterceptorsPublic from '../../hooks/useHttpInterceptorsPublic';

const LastRaceResults = () => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(true);
	const lastRaceResults = useSelector(selectLastResults);
	console.log('lastRaceResults', lastRaceResults);
	const [listCategory, setListCategory] = useState('LeaderBoard');
	const { isLoading, error, sendRequest } = useAxiosInterceptorsPublic();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getLastRaceResult = async () => {
			dispatch(fetchLastRaceResultStart());

			try {
				sendRequest(
					{
						url: 'http://ergast.com/api/f1/current/last/results.json',
						method: 'GET',
						data: null,
						headers: null,
						withCredentials: false,
						signal: controller.signal
					},
					(responseDataSet) => {
						console.log('responseDataSet', responseDataSet);
						const lastRaceResultArray = responseDataSet?.MRData?.RaceTable?.Races;
						console.log('lastRaceResultArray', lastRaceResultArray);
						isMounted && dispatch(fetchLastRaceResultSuccess(lastRaceResultArray));
					}
				);
			} catch (error) {
				console.log('error LAST RACE RESULTS', error);
				dispatch(fetchLastRaceResultFailure(error));
			}
		};

		getLastRaceResult();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const handleCategoryList = (e) => {
		let ctgTitle = e.target.closest('p').textContent;
		setListCategory(ctgTitle);
	};

	const confirmErrorModal = () => {
		setShowModal(false);
	};

	const activeLeaderBoard = listCategory === 'LeaderBoard' ? `${classes.categoryActive}` : '';
	const activeFastestLap = listCategory === 'Fastest Lap' ? `${classes.categoryActive}` : '';

	let content;

	if (error && showModal) {
		content = <ErrorModal onConfirm={confirmErrorModal} />;
	} else {
		content = (
			<section className={classes.lastResultsSection}>
				{isLoading ? (
					<Loader />
				) : (
					lastRaceResults &&
					lastRaceResults?.map((result, index) => {
						console.log('lastRaceResults', lastRaceResults);
						console.log('result', result);
						return (
							<div className="defaultTransition defaultTransition-5MS" key={index}>
								<div className={classes.circuitInfoWrapper} key={result?.round}>
									<p className={classes.circuitName}>{result?.raceName || 'N/A'}</p>
									<div className={classes.circuitData}>
										<span>Laps {result?.Results[0]?.laps || 'N/A'}</span>
										<span>
											Season {result?.season || 'N/A'},Round {result?.round || 'N/A'}
										</span>
										<span>
											{result?.date || 'N/A'},{(result?.time).split('Z')[0] || 'N/A'}
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
									result={lastRaceResults[0].Results || []}
									listCategory={listCategory}
								/>
							</div>
						);
					})
				)}
			</section>
		);
	}

	return content;
};

export default LastRaceResults;
