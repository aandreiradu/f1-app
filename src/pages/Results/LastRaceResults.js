import React, { useEffect, useState } from 'react'
import useHttp from '../../hooks/useHttp';
import classes from './LastRaceResults.module.css';
import constructorsColors from '../../constants/constructorsColors';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';

const LastRaceResults = () => {
    const [lastRaceResults, setLastResults] = useState([]);
    const { isLoading, error, sendRequest: fetchLastRaceResults } = useHttp();
    console.log('isLoading', isLoading);

    useEffect(() => {
        const transformData = (responseData) => {
            console.log('responseData', responseData);
            localStorage.setItem('lastRaceResults', JSON.stringify(responseData.MRData.RaceTable));
            setLastResults([responseData.MRData.RaceTable]);
        }

        fetchLastRaceResults(
            { url: 'http://ergast.com/api/f1/current/last/results.json' },
            transformData
        )
    }, [fetchLastRaceResults]);



    useEffect(() => {
        console.log('lastRaceResults', lastRaceResults);

    }, [lastRaceResults]);



    return (
        <section className={classes.lastResultsSection}>
            {isLoading ? <Loader /> :
                lastRaceResults && lastRaceResults.map((result) => (
                    <div key={'bearer' + Math.floor(Math.random() * 10000) + result.Races[0].raceName}>
                        <div className={classes.circuitInfoWrapper} key={result.round}>
                            <p className={classes.circuitName}>{result.Races[0].raceName}</p>
                            <div className={classes.circuitData}>
                                <span>Laps {result.Races[0].Results[0].laps}</span>
                                <span>Season {result.Races[0].season},Round {result.Races[0].round}</span>
                                <span>{result.Races[0].date},{(result.Races[0].time).split('Z')[0]}</span>
                            </div>
                        </div>
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
                    </div>
                ))}
            {!isLoading && <div className={classes.actions_back}>
                <Link to={'/'}>Go Back</Link>
            </div>}
        </section>
    )
}

export default LastRaceResults