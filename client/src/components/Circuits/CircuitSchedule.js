import React, { useEffect, useState } from 'react'
import classes from './CircuitSchedule.module.css';
import { useParams } from 'react-router-dom';
import scheduleCircuits from '../../constants/scheduleCircuits';
import useHttp from '../../hooks/useHttp';
import monthNames from '../../Utils/months';
import Loader from '../../components/Loader/Loader';
// import { UTCtoRO } from '../../Utils/UTCtoRO';
import dateUtils from '../../Utils/UTCtoRO';
import ErrorModal from '../UI/ErrorModal';

const buildWeekend = (state) => {
    // console.log('received', state);
    const fp1 = state[0].FirstPractice.date;
    const raceDate = state[0].date;
    let dayFp1 = fp1 && new Date(fp1).getDate();
    let monthFp1 = fp1 && monthNames[new Date(fp1).getMonth()];
    let raceDay = raceDate && new Date(raceDate).getDate();
    let monthRaceDay = raceDate && monthNames[new Date(raceDate).getMonth()];

    let monthsRaceDay = monthRaceDay === monthFp1 ? monthRaceDay : `${monthRaceDay}-${monthFp1}`;

    return {
        fday: dayFp1,
        lday: raceDay,
        monthsRaceDay: monthsRaceDay
    };
}

const CircuitSchedule = (props) => {
    const [showModal, setShowModal] = useState(true);
    const [circuitSchedule, setCircuitSchedule] = useState([]);
    const [raceWeek, setRaceWeek] = useState({});
    const params = useParams();
    const { round, circuitId } = params;
    const { isLoading, error, sendRequest } = useHttp();

    let circuitContent = scheduleCircuits.find(circuit => (circuit.circuitId).toUpperCase() === circuitId.toUpperCase());

    useEffect(() => {
        const transformData = (responseData) => {
            // console.log('responseData', responseData.MRData.RaceTable.Races);
            setCircuitSchedule(responseData.MRData.RaceTable.Races);
            setRaceWeek(buildWeekend(responseData.MRData.RaceTable.Races));
        }
        sendRequest(
            { url: `https://ergast.com/api/f1/${new Date().getFullYear()}/${round}.json` },
            transformData
        )

    }, [round, circuitId, sendRequest]);

    const confirmErrorModal = () => {
        setShowModal(false);
    }

    let content;
    if (error && showModal) {
        content = <ErrorModal onConfirm={confirmErrorModal} />
    } else {
        content = (
            <>
                {isLoading ? <Loader /> :
                    <main className={classes['race-hub']}>
                        {circuitSchedule && circuitSchedule.map((item) => (
                            <div key={item.round}>
                                <header className={`${classes['race-header']} defaultTransition defaultTransition-M1`}>
                                    <img className={classes['race-image']} src={circuitContent.imgSrc} alt={circuitId} />
                                    <div className={classes['race-content']}>
                                        <h1>{item.Circuit.Location.country}</h1>
                                        <div className={classes['race-year-wrapper']}>
                                            <img className={classes['race-year']} src={scheduleCircuits.find((img) => img.circuitId === '2022').imgSrc} alt={'year'} />
                                        </div>
                                        {/* <p>{`${raceWeek.fday}-${raceWeek.lday} ${raceWeek.monthFp1 === raceWeek.monthRaceDay ? raceWeek.monthRaceDay : raceWeek.monthFp1 - raceWeek.monthRaceDay}`}</p> */}
                                        <p>{`${raceWeek.fday}-${raceWeek.lday} ${raceWeek.monthsRaceDay}`}</p>
                                    </div>
                                </header>
                                <section className={`${classes['race-hub-time']} defaultTransition`}>
                                    <div className={classes['race-time']}>
                                        <p>RACE WEEKEND</p>
                                        <h2>{item.raceName}</h2>
                                    </div>
                                    <ul className={classes['race-listings']}>
                                        <li className={classes['race-listing-item']}>
                                            <div className={classes['race-listing-item_date']}>
                                                <p>{raceWeek.lday}</p>
                                                <span>{monthNames[(new Date(item.date).getMonth())]}</span>
                                            </div>
                                            <div className={classes['race-details']}>
                                                <p>Race</p>
                                                {/* <span>{String(item.time).split('Z')[0]}</span> */}
                                                <span>{dateUtils.UTCtoRO(item.date, String(item.time).split('Z')[0])}</span>
                                            </div>
                                        </li>
                                        <li className={classes['race-listing-item']}>
                                            <div className={classes['race-listing-item_date']}>
                                                <p>{new Date(item.Qualifying.date).getDate()}</p>
                                                <span>{monthNames[(new Date(item.Qualifying.date).getMonth())]}</span>
                                            </div>
                                            <div className={classes['race-details']}>
                                                <p>Qualifying</p>
                                                <span>{dateUtils.UTCtoRO(item.Qualifying.date, String(item.Qualifying.time).split('Z')[0])}</span>
                                            </div>
                                        </li>
                                        <li className={classes['race-listing-item']}>
                                            <div className={classes['race-listing-item_date']}>
                                                <p>{new Date(item.ThirdPractice.date).getDate()}</p>
                                                <span>{monthNames[(new Date(item.ThirdPractice.date).getMonth())]}</span>
                                            </div>
                                            <div className={classes['race-details']}>
                                                <p>Practice 3</p>
                                                <span>{dateUtils.UTCtoRO(item.ThirdPractice.date, String(item.ThirdPractice.time).split('Z')[0])}</span>
                                            </div>
                                        </li>
                                        <li className={classes['race-listing-item']}>
                                            <div className={classes['race-listing-item_date']}>
                                                <p>{new Date(item.SecondPractice.date).getDate()}</p>
                                                <span>{monthNames[(new Date(item.SecondPractice.date).getMonth() + 1)]}</span>
                                            </div>
                                            <div className={classes['race-details']}>
                                                <p>Practice 2</p>
                                                <span>{dateUtils.UTCtoRO(item.SecondPractice.date, String(item.SecondPractice.time).split('Z')[0])}</span>
                                            </div>
                                        </li>
                                        <li className={classes['race-listing-item']}>
                                            <div className={classes['race-listing-item_date']}>
                                                <p>{new Date(item.FirstPractice.date).getDate()}</p>
                                                <span>{monthNames[(new Date(item.FirstPractice.date).getMonth() + 1)]}</span>
                                            </div>
                                            <div className={classes['race-details']}>
                                                <p>Practice 1</p>
                                                <span>{dateUtils.UTCtoRO(item.FirstPractice.date, String(item.FirstPractice.time).split('Z')[0])}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                        ))}
                    </main>
                }
            </>
        )
    }

    return (
        content
    )
}

export default CircuitSchedule