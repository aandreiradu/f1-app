import React, { useEffect, useState } from 'react'
import useHttp from '../../hooks/useHttp';
import classes from '../Results/LastRaceResults.module.css';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import DriversRaceResults from '../../components/Results/DriversRaceResults';

const RaceFinished = () => {
    const { round } = useParams();
    console.log('round', round);
    const [lastRaceResults, setLastResults] = useState([]);
    const { isLoading, error, sendRequest: fetchRaceResult } = useHttp();
    const [listCategory, setListCategory] = useState('LeaderBoard');

    useEffect(() => {
        const transformData = (responseData) => {
            console.log('responde data', responseData)
            setLastResults([responseData.MRData.RaceTable]);
        }
        fetchRaceResult(
            { url: `https://ergast.com/api/f1/${new Date().getFullYear()}/${round}/results.json` },
            transformData
        )
    }, [fetchRaceResult, round]);




    useEffect(() => {
        console.log('lastRaceResults', lastRaceResults);

    }, [lastRaceResults]);

    const handleCategoryList = (e) => {
        let ctgTitle = e.target.closest('p').textContent;
        setListCategory(ctgTitle);
    }

    const activeLeaderBoard = listCategory === 'LeaderBoard' ? `${classes.categoryActive}` : '';
    const activeFastestLap = listCategory === 'Fastest Lap' ? `${classes.categoryActive}` : '';

    return (
        <section className={classes.lastResultsSection}>
            {isLoading ? <Loader /> :
                lastRaceResults && lastRaceResults.map((result) => (
                    <div className='defaultTransition' key={'bearer' + Math.floor(Math.random() * 10000) + result.Races[0].raceName}>
                        <div className={classes.circuitInfoWrapper} key={result.round}>
                            <p className={classes.circuitName}>{result.Races[0].raceName}</p>
                            <div className={classes.circuitData}>
                                <span>Laps {result.Races[0].Results[0].laps}</span>
                                <span>Season {result.Races[0].season},Round {result.Races[0].round}</span>
                                <span>{result.Races[0].date},{(result.Races[0].time).split('Z')[0]}</span>
                            </div>
                        </div>
                        <div className={classes.category} >
                            <p onClick={handleCategoryList} className={activeLeaderBoard}>LeaderBoard</p>
                            <p onClick={handleCategoryList} className={activeFastestLap}>Fastest Lap</p>
                        </div>
                        <DriversRaceResults result={result} listCategory={listCategory} />
                    </div>
                ))}
            {!isLoading && <div className={classes.actions_back}>
                <Link to={'/'}>Go Back</Link>
            </div>}
        </section>
    )
}

export default RaceFinished