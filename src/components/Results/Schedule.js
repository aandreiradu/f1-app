import React, { useEffect, useState } from 'react'

import driversScheduleImages from '../../constants/scheduleImages';
import classes from './Schedule.module.css'
import raceFlag from '../../assets/schedule images/flag-asset.png'
import useHttp from '../../hooks/useHttp';


const Schedule = () => {
    const [seasonSchedule, setSeasonSchedule] = useState([]);
    const { isLoading, error, sendRequest } = useHttp();


    useEffect(() => {
        const transformData = (responseData) => {
            console.log('responseData', responseData.MRData.RaceTable.Races);
            setSeasonSchedule([responseData.MRData.RaceTable.Races]);
        }

        sendRequest(
            { url: 'http://ergast.com/api/f1/current.json' },
            transformData
        )
    }, [sendRequest]);


    useEffect(() => {
        console.log('seasonSchedule state', seasonSchedule);
    }, [seasonSchedule]);


    return (
        <div className={classes.wrapper}>
            <div className={classes['schedule-header']}>
                <h1 className={classes['header-title']}>F1 Schedule {new Date().getFullYear()}</h1>
                <p className={classes['header-competition']}>{new Date().getFullYear()} FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR</p>
            </div>
            <div className={classes.cardSchedule}>
                <span className={classes.title}>ROUND 5</span>
                <div className={classes.period}>
                    <div className={classes.timeFlag}>
                        <p>06-08</p>
                        <div className={classes.countryFlag}>
                            <img src={driversScheduleImages.usa} alt='country flag' />
                        </div>
                    </div>
                    <div className={classes.monthFlag}>
                        <p>MAY</p>
                        <span className={classes.finishWrapper}>
                            <img src={raceFlag} alt='race flag' />
                        </span>
                    </div>
                </div>
                <div className={classes['event-details']}>
                    <div className={classes['event-description']}>
                        <p className={classes.country}>United States</p>
                        <p className={classes.gpName}>Miami Grand Prix</p>
                    </div>
                    <div className={classes['event-result']}>
                        <div className={`${classes['position-1']}`}>
                            <div className={classes['image-wrapper']}>
                                <img src={driversScheduleImages.verstappen} alt='position 1' />
                            </div>
                            <div className={classes['driver-info-wrapper']}>
                                <div className={classes['driver-info']}>
                                    VER
                                </div>
                            </div>
                        </div>
                        <div className={`${classes['position-2']}`}>
                            <div className={classes['image-wrapper']}>
                                <img src={driversScheduleImages.leclerc} alt='position 2' />
                            </div>
                            <div className={classes['driver-info-wrapper']}>
                                <div className={classes['driver-info']}>
                                    LEC
                                </div>
                            </div>
                        </div>
                        <div className={`${classes['position-3']}`}>
                            <div className={classes['image-wrapper']}>
                                <img src={driversScheduleImages.sainz} alt='position 3' />
                            </div>
                            <div className={classes['driver-info-wrapper']}>
                                <div className={classes['driver-info']}>
                                    SAI
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Schedule