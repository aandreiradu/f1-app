import React, { useCallback } from 'react'

import classes from './StandingYears.module.css';

const StandingType = (props) => {

    const typeChangeHandler = useCallback((e) => {
        props.onTypeSelected(e.target.value);
    },[]);

  return (
        <select className={classes['selectmenu-element']} onChange={typeChangeHandler}>
            <option value='Driver'>
                Driver
            </option>
            <option value='Constructor'>
                Constructor
            </option>
        </select>
    )
}

export default StandingType