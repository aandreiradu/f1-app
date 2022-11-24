import React from 'react';

import classes from './DriversRaceResults.module.css';
import constructorsColors from '../../constants/constructorsColors';

const DriversRaceResults = (props) => {
	const { result, listCategory } = props;
	console.log('result DriversRaceResults', result);

	switch (listCategory) {
		case 'LeaderBoard':
			return (
				<ul className={`${classes.driversResultsList} defaultTransition defaultTransition-5MS`}>
					{result?.map((driverResult) => (
						<li
							key={driverResult?.Driver?.code}
							className={`${classes.driverResultItem} ${
								+driverResult?.position === 1 ? classes.winnerStickyTop : ''
							}`}
						>
							<div>
								<span className={classes.driverPosition}>#{driverResult?.position}</span>
								<div
									className={classes['team-color-bar']}
									style={{
										backgroundColor: constructorsColors?.find(
											(info) => info?.team === driverResult?.Constructor?.name
										)?.teamColor
									}}
								></div>
								<span>{`${driverResult?.Driver?.givenName} ${driverResult?.Driver?.familyName}`}</span>
							</div>
							<span>{driverResult?.Time ? driverResult?.Time?.time : driverResult?.status}</span>
						</li>
					))}
				</ul>
			);

		case 'Fastest Laps':
			const resultsSorted = result
				.slice()
				.sort((a, b) => +a?.FastestLap?.rank - +b?.FastestLap?.rank);
			return (
				<ul className={`${classes.driversResultsList} defaultTransition defaultTransition-5MS`}>
					{(resultsSorted?.length > 0 ? resultsSorted : result)?.map((driverResult) => (
						<li
							key={driverResult?.Driver?.code}
							className={`${classes.driverResultItemFS} ${
								+driverResult?.FastestLap?.rank === 1 && classes.winnerStickyTop
							}`}
						>
							<div className={classes.driverCN}>
								<div
									className={classes['team-color-bar-fastest']}
									style={{
										backgroundColor: constructorsColors?.find(
											(info) => info?.team === driverResult?.Constructor?.name
										)?.teamColor
									}}
								></div>
								<div className={classes['fastest-driverName']}>
									<span className={classes.fastestName}>{driverResult?.Driver?.givenName}</span>
									<span className={classes.fastestName}>{driverResult?.Driver?.familyName}</span>
								</div>
							</div>
							<div className={classes.fastestData}>
								<div className={classes.driverAVGSpeed}>
									<span>AVG Speed</span>
									<span>
										{driverResult?.FastestLap
											? ` ${driverResult?.FastestLap?.AverageSpeed?.speed} ${driverResult?.FastestLap?.AverageSpeed?.units}`
											: 'N/A'}
									</span>
								</div>
								<div className={classes.driverLap}>
									<span>Lap</span>
									<span>{driverResult?.FastestLap ? driverResult?.FastestLap?.lap : 'N/A'}</span>
								</div>
								<div className={classes.driverFastestLap}>
									<span>Time</span>
									<span>
										{driverResult?.FastestLap ? driverResult?.FastestLap?.Time?.time : 'N/A'}
									</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			);
		default:
			throw new Error('Default reached');
	}
};

export default DriversRaceResults;
