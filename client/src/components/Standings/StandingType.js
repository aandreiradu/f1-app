import React, { useCallback } from 'react';

import classes from './StandingYears.module.css';

const StandingType = (props) => {
	const typeChangeHandler = useCallback((e) => {
		props.onTypeSelected(e.target.value);
	}, []);

	return (
		<select className={classes['selectmenu-element']} onChange={typeChangeHandler}>
			<option value="Drivers">Drivers</option>
			<option value="Constructors">Constructors</option>
		</select>
	);
};

export default StandingType;
