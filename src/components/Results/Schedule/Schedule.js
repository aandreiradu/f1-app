import React, { useEffect, useState } from 'react'
import Loader from '../../Loader/Loader'
import classes from './Schedule.module.css'
import useHttp from '../../../hooks/useHttp';
import ScheduleItem from './ScheduleItem';



const Schedule = () => {
    const [seasonSchedule, setSeasonSchedule] = useState([]);
    const [resultsSoFar, setResultsSoFar] = useState([]);
    const { isLoading, error, sendRequest } = useHttp();

    useEffect(() => {
        const transformData = (responseData) => {
            // console.log('responseData', responseData.MRData.RaceTable.Races);
            setSeasonSchedule(responseData.MRData.RaceTable.Races);
        }
        sendRequest(
            { url: 'http://ergast.com/api/f1/current.json' },
            transformData
        )

        const transformDataResults = responseData => {
            setResultsSoFar(Object.values(responseData));
        }

        sendRequest(
            { url: 'https://f1-react-62d1c-default-rtdb.europe-west1.firebasedatabase.app/results.json' },
            transformDataResults
        );
    }, [sendRequest]);


    useEffect(() => {
    }, [seasonSchedule, resultsSoFar]);


    return (

        <div className={`${classes.wrapper} defaultTransition`}>
            {isLoading ? <Loader /> :
                <div className={classes['schedule-header']}>
                    <h1 className={classes['header-title']}>F1 Schedule {new Date().getFullYear()}</h1>
                    <p className={classes['header-competition']}>{new Date().getFullYear()} FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR</p>
                    <div className={classes['schedule-results']}>
                        {seasonSchedule && seasonSchedule.map((item) => (
                            <ScheduleItem key={item.round} circuitId={item.Circuit.circuitId} thisRoundResults={resultsSoFar[item.round - 1]} round={item.round} raceName={item.raceName} raceDate={item.date} fp1={item.FirstPractice.date} country={item.Circuit.Location.country} />
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Schedule