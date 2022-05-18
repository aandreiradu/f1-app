import React from 'react'

import classes from './DriversRaceResults.module.css'
import constructorsColors from '../../constants/constructorsColors';



const DriversRaceResults = (props) => {
    const { result, listCategory } = props;


    let content;

    switch (listCategory) {
        case 'LeaderBoard':
            return content = (
                <ul className={classes.driversResultsList}>
                    {result.Races[0].Results.map((driverResult) => (
                        <li key={driverResult.Driver.code} className={classes.driverResultItem}>
                            <div>
                                <span className={classes.driverPosition}>#{driverResult.position}</span>
                                <div className={classes['team-color-bar']} style={{
                                    backgroundColor: constructorsColors.find((info) =>
                                        info.team === driverResult.Constructor.name).teamColor
                                }}></div>
                                <span>{`${driverResult.Driver.givenName} ${driverResult.Driver.familyName}`}</span>
                            </div>
                            <span>{driverResult.Time ? driverResult.Time.time : driverResult.status}</span>
                        </li>
                    ))}
                </ul>
            )

        case 'Fastest Lap':
            return content = (
                <ul className={classes.driversResultsList}>
                    {result.Races[0].Results.map((driverResult) => (
                        <li key={driverResult.Driver.code} className={classes.driverResultItemFS}>
                            <div className={classes.driverCN}>
                                <div className={classes['team-color-bar-fastest']} style={{
                                    backgroundColor: constructorsColors.find((info) =>
                                        info.team === driverResult.Constructor.name).teamColor
                                }}>
                                </div>
                                <div className={classes['fastest-driverName']}>
                                    <span className={classes.fastestName}>{driverResult.Driver.givenName}</span>
                                    <span className={classes.fastestName}>{driverResult.Driver.familyName}</span>
                                </div>
                            </div>
                            <div className={classes.fastestData}>
                                <div className={classes.driverAVGSpeed}>
                                    <span>AVG Speed</span>
                                    <span >{driverResult.FastestLap ? ` ${driverResult.FastestLap.AverageSpeed.speed} ${driverResult.FastestLap.AverageSpeed.units}` : 'N/A'}</span>
                                </div>
                                <div className={classes.driverLap}>
                                    <span>Lap</span>
                                    <span>{driverResult.FastestLap ? driverResult.FastestLap.lap : 'N/A'}</span>
                                </div>
                                <div className={classes.driverFastestLap}>
                                    <span>Time</span>
                                    <span >{driverResult.FastestLap ? driverResult.FastestLap.Time.time : 'N/A'}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )
        default:
            throw new Error('Default reached');
    }
}

export default DriversRaceResults