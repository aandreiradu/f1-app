import React from 'react'
import driversScheduleImages from '../../../constants/scheduleImages';
import classes from './ScheduleItem.module.css'
import raceFlag from '../../../assets/schedule images/flag-asset.png'
import monthNames from '../../../Utils/months'
import circuitLayouts from '../../../constants/circuitsLayouts';
import { Link } from 'react-router-dom';

const ScheduleItem = (props) => {
    const { circuitId, round, raceName, fp1, raceDate, country, thisRoundResults } = props;
    let dayFp1 = new Date(fp1).getDate();
    let monthFp1 = monthNames[new Date(fp1).getMonth()];
    let raceDay = new Date(raceDate).getDate();
    let monthRaceDay = monthNames[new Date(raceDate).getMonth()];



    let raceNotDisputed = (
        <Link to={`/schedule/${round}/${circuitId}`} className={`${classes['image-wrapper']} ${classes['notDisputed']}`}>
            <img className={classes['notDisputed']} src={circuitLayouts.find((circuit) => circuit.circuitId.toLocaleLowerCase() === circuitId.toLowerCase()).imgSrc} alt='circuit layout' />
        </Link>
    )

    let content;
    if (thisRoundResults) {
        content = (
            <>
                <div className={`${classes['position-1']}`}>
                    <div className={classes['image-wrapper']}>
                        <img src={driversScheduleImages.find(item => item.driverId.toUpperCase().includes(thisRoundResults ? thisRoundResults.p1 : '')).imgSrc} alt='position 1' />
                    </div>
                    <div className={classes['driver-info-wrapper']}>
                        <div className={classes['driver-info']}>
                            {thisRoundResults ? thisRoundResults.p1 : ''}
                        </div>
                    </div>
                </div>
                <div className={`${classes['position-2']}`}>
                    <div className={classes['image-wrapper']}>
                        <img src={driversScheduleImages.find(item => item.driverId.toUpperCase().includes(thisRoundResults ? thisRoundResults.p2 : '')).imgSrc} alt='position 2' />
                    </div>
                    <div className={classes['driver-info-wrapper']}>
                        <div className={classes['driver-info']}>
                            {thisRoundResults ? thisRoundResults.p2 : ''}
                        </div>
                    </div>
                </div>
                <div className={`${classes['position-3']}`}>
                    <div className={classes['image-wrapper']}>
                        <img src={driversScheduleImages.find(item => item.driverId.toUpperCase().includes(thisRoundResults ? thisRoundResults.p3 : '')).imgSrc} alt='position 3' />
                    </div>
                    <div className={classes['driver-info-wrapper']}>
                        <div className={classes['driver-info']}>
                            {thisRoundResults ? thisRoundResults.p3 : ''}
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        content = raceNotDisputed
    }

    return (
        <div className={classes.cardSchedule}>
            <span className={classes.title}>ROUND {round}</span>
            <div className={classes.period}>
                <div className={classes.timeFlag}>
                    <p>{dayFp1}-{raceDay}</p>
                    <div className={classes.countryFlag}>
                        <img src={driversScheduleImages.find(item => item.driverId.toUpperCase().includes('USA')).imgSrc} alt='country flag' />
                    </div>
                </div>
                <div className={classes.monthFlag}>
                    <p>{monthFp1 === monthRaceDay ? monthRaceDay : `${monthFp1}-${monthRaceDay}`}</p>
                    <span className={classes.finishWrapper}>
                        {thisRoundResults && <img src={raceFlag} alt='race flag' />}
                        {/* <span>{country}</span> */}
                    </span>
                </div>
            </div>
            <div className={classes['event-details']}>
                <div className={classes['event-description']}>
                    <div className={classes['event-country']}>
                        <p className={classes.country}>{country}</p>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                    <p className={classes.gpName}>{raceName}</p>
                    {thisRoundResults && <Link className={classes['race-finishedBtn']} to={`/race-results/${round}/results`}>View Results</Link>}
                </div>
                <div className={classes['event-result']}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default ScheduleItem