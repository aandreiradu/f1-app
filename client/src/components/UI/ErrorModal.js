import React, { useState } from 'react'

import classes from './ErrorModal.module.css';

const ErrorModal = (props) => {
    console.log(props);
    const { message, title, onConfirm } = props;

    const confirmHandler = () => {
        onConfirm();
    }

    return (
        <div className={classes['modal-wrapper']}>
            <div className={classes["modal"]}>
                <div className={classes["overlay"]}></div>
                <span className={classes.close} onClick={confirmHandler}>&times;</span>
                <h2>{title ? title : 'Ooops!'}</h2>
                <p>{message ? message : 'Something went wrong, please try again later!'}</p>
                <button onClick={confirmHandler}>Close</button>
            </div>
        </div>
    )
}

export default ErrorModal