import React, { useEffect, useState } from 'react'
import useHttp from '../../hooks/useHttp';
import classes from './LastRaceResults.module.css';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import DriversRaceResults from '../../components/Results/DriversRaceResults';
import ErrorModal from '../../components/UI/ErrorModal';

const LastRaceResults = () => {
    const [showModal, setShowModal] = useState(true);
    const [lastRaceResults, setLastResults] = useState([]);
    const { isLoading, error, sendRequest: fetchLastRaceResults } = useHttp();
    const [listCategory, setListCategory] = useState('LeaderBoard');

    useEffect(() => {
        const transformData = (responseData) => {
            localStorage.setItem('lastRaceResults', JSON.stringify(responseData.MRData.RaceTable));
            setLastResults([responseData.MRData.RaceTable]);
        }

        fetchLastRaceResults(
            { url: 'http://ergast.com/api/f1/current/last/results.json' },
            transformData
        )
    }, [fetchLastRaceResults]);


    const handleCategoryList = (e) => {
        let ctgTitle = e.target.closest('p').textContent;
        setListCategory(ctgTitle);
    }

    const confirmErrorModal = () => {
        setShowModal(false);
    }

    const activeLeaderBoard = listCategory === 'LeaderBoard' ? `${classes.categoryActive}` : '';
    const activeFastestLap = listCategory === 'Fastest Lap' ? `${classes.categoryActive}` : '';

    let content;

    if (error && showModal) {
        content = <ErrorModal onConfirm={confirmErrorModal} />
    } else {
        content = (
            <section className={classes.lastResultsSection}>
                {isLoading ? <Loader /> :
                    lastRaceResults && lastRaceResults.map((result) => (
                        <div className='defaultTransition defaultTransition-5MS' key={'bearer' + Math.floor(Math.random() * 10000) + result.Races[0].raceName}>
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

    return (
        content
    )
}

export default LastRaceResults