import React, { useEffect, useState } from 'react';
import classes from './StandingsResults.module.css';
import useAxiosInterceptorsPublic from '../../hooks/useHttpInterceptorsPublic';
import LoaderIcon from '../../components/LoaderReusable/LoaderIcon';
import ErrorModal from '../../components/UI/ErrorModal';

const buildContentHeadByType = (type) => {
	console.log('buildContentHeadByType type', type);
	switch (type) {
		case 'Drivers': {
			return (
				<thead>
					<tr>
						<th>Pos</th>
						<th>Driver</th>
						<th>Nationality</th>
						<th>Team</th>
						<th className={classes['limiter']}></th>
						<th>Pts</th>
					</tr>
				</thead>
			);
		}

		case 'Constructors': {
			return (
				<thead>
					<tr>
						<th>Pos</th>
						<th>Team</th>
						<td className={classes['limiter']}></td>
						<th>Pts</th>
					</tr>
				</thead>
			);
		}

		default:
			throw new Error(`Default reached. Unhandled error for type ${type}`);
	}
};

const buildContentBodyByType = (type, content) => {
	switch (type) {
		case 'Drivers': {
			if (content.Driver && content.length > 0) {
				content.map((item) => (
					<tr className={classes['standing-result-row']} key={item.Driver.driverId}>
						<td>{item.position}</td>
						<td>{item.Driver.code}</td>
						<td>{item.Driver.nationality}</td>
						<td>{item.Constructors[0].name}</td>
						<td className={classes['limiter']}></td>
						<td>{item.points}</td>
					</tr>
				));
			}
			break;
		}

		case 'Constructors': {
			if (content.Constructor && content.length > 0) {
				content.map((item) => (
					<tr className={classes['standing-result-row']} key={item.Constructor.constructorId}>
						<td>{item.position}</td>
						<td>{item.Constructor.name}</td>
						<td className={classes['limiter']}></td>
						<td>{item.points}</td>
					</tr>
				));
			}
			break;
		}

		default:
			throw new Error('default reached');
	}
};

const StandingsResults = (props) => {
	let { type, year } = props;
	console.log('StandingsResults props', props);
	const [showErrorModal, setShowErrorModal] = useState(true);
	const [standingsResultsDriver, setStandingsResultsDriver] = useState([]);
	const [standingsResultsConstructor, setStandingsResultsConstructor] = useState([]);
	const [noContent, setNoContent] = useState(false);
	const { isLoading, error, sendRequest: getStandingsData } = useAxiosInterceptorsPublic();

	let tHead = buildContentHeadByType(type);
	let tBody = buildContentBodyByType(
		type,
		type === 'Drivers' ? standingsResultsDriver : standingsResultsConstructor
	);

	let URL;
	if (!year && type === 'Drivers') {
		URL = 'http://ergast.com/api/f1/current/driverStandings.json';
	} else if (!year && type === 'Constructors') {
		URL = 'http://ergast.com/api/f1/current/constructorStandings.json';
	}

	if (type && year) {
		let urlparams;
		if (type === 'Drivers') {
			urlparams = 'driver';
		} else if (type === 'Constructors') {
			urlparams = 'constructor';
		}
		URL = `http://ergast.com/api/f1/${year}/${urlparams}Standings.json`;
	}

	let parseResponseData = (stateData) => {
		console.log('stateData', stateData);
		if (stateData?.MRData?.StandingsTable?.StandingsLists?.length > 0) {
			if (type === 'Drivers') {
				if (stateData?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings?.length > 0) {
					setStandingsResultsDriver(
						stateData.MRData.StandingsTable.StandingsLists[0].DriverStandings
					);
				}
			} else if (type === 'Constructors') {
				if (
					stateData?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings?.length > 0
				) {
					setStandingsResultsConstructor(
						stateData.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings
					);
				}
			}
		} else if (stateData.MRData.StandingsTable.StandingsLists.length === 0) {
			setNoContent(true);
		}
	};

	useEffect(() => {
		getStandingsData(
			{
				url: URL,
				method: 'GET',
				withCredentials: false,
				headers: {}
			},
			(stateData) => parseResponseData(stateData)
		);
		if (noContent) {
			setNoContent(false);
		}
	}, [year, type]);

	if (type === 'Drivers') {
		tBody = (
			<tbody>
				{standingsResultsDriver?.length > 0 &&
					standingsResultsDriver?.map((result) => (
						<tr className={classes['standing-result-row']} key={result.Driver.driverId}>
							<td>{result.position}</td>
							<td>{result.Driver?.code || result.Driver.familyName}</td>
							<td>{result.Driver.nationality}</td>
							<td>{result.Constructors[0].name}</td>
							<td className={classes['limiter']}></td>
							<td>{result.points}</td>
						</tr>
					))}
			</tbody>
		);
	} else {
		tBody = (
			<tbody>
				{standingsResultsConstructor?.length > 0 &&
					standingsResultsConstructor?.map((result) => (
						<tr className={classes['standing-result-row']} key={result.Constructor.constructorId}>
							<td>{result.position}</td>
							<td>{result.Constructor?.name}</td>
							<td className={classes['limiter']}></td>
							<td>{result.points}</td>
						</tr>
					))}
			</tbody>
		);
	}

	const confirmErrorModal = () => setShowErrorModal(false);

	return (
		<>
			{error && showErrorModal && (
				<ErrorModal
					title="Ooops!"
					message={error?.message || error || 'Something went wrong'}
					onConfirm={confirmErrorModal}
				/>
			)}
			{isLoading ? (
				<LoaderIcon text="Please Wait⏳" />
			) : !noContent ? (
				<div className={classes['standings-results-container']}>
					<h1 className={classes['standing-results-header']}>{`${year} ${type} Standings`}</h1>
					<table className={classes['table-results']}>
						{tHead}
						{tBody}
					</table>
				</div>
			) : (
				<p className={classes['noContent_text']}>
					We're sorry, we dont have this data right now! <br />
					Let's search for something else 👀
				</p>
			)}
		</>
	);
};

export default StandingsResults;
