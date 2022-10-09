import React, { useCallback, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import StandingsResults from '../../components/Standings/StandingsResults';
import StandingType from '../../components/Standings/StandingType';
import StandingYears from '../../components/Standings/StandingYears';
import classes from './Standings.module.css';

const Standings = () => {
	const [yearStanding, setYearStanding] = useState(new Date().getFullYear());
	const [typeStanding, setTypeStanding] = useState('Driver');

	const typeSelectHandler = useCallback((type) => {
		setTypeStanding(type);
	}, []);

	const yearSelectHandler = useCallback((year) => {
		setYearStanding(year);
	}, []);

	return (
		<>
			<section className={classes['standings-wrap']}>
				<div className={classes['standings-filter-wrapper']}>
					<div className={classes['years_archive']}>
						<StandingYears onYearSelected={yearSelectHandler} />
					</div>
					<div className={classes['type-archive']}>
						<StandingType onTypeSelected={typeSelectHandler} />
					</div>
				</div>
				<StandingsResults type={typeStanding} year={yearStanding} />
			</section>
			<Footer />
		</>
	);
};

export default Standings;
