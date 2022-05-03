import React from 'react'

import classes from './Loader.module.css';

const Loader = () => {
    return (
        <div className={classes.loaderWrapper}>
            <div className={classes.loader}>
                <span className={classes.bar}></span>
                <span className={classes.bar}></span>
                <span className={classes.bar}></span>
            </div>
            <div className={classes.loaderText}>
                <p>Loading data...please wait!😊</p>
            </div>
        </div>
    )
}

export default Loader