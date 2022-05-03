import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import driversImageAndMoreInfo from '../../constants/driversImages'
import Loader from '../../components/Loader/Loader';
import classes from './UserInfo.module.css';

const UserInfo = () => {
    const [lastSeasonInfo, setLastSeasonInfo] = useState([]);
    const [driverStandings, setDriverStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const { driverId } = params;
    console.log(driverId);

    const getUserInfoById = useCallback(async () => {
        setIsLoading(true);
        const response = await fetch(`http://ergast.com/api/f1/drivers/${driverId}/driverStandings.json`)

        if (!response.ok) {
            setIsLoading(false);
            throw new Error('Can\'t fetch data');
        }

        const responseData = await response.json();
        console.log(responseData);

        if (responseData && responseData.MRData && responseData.MRData.StandingsTable.StandingsLists.length > 0) {
            console.log('am intrat in if mrdata');
            // localStorage.setItem('driverInfoId', JSON.stringify(responseData.MRData.StandingsTable.StandingsLists));
            const standingsList = responseData.MRData.StandingsTable.StandingsLists;
            setDriverStandings(standingsList);
            console.log('standingsList', standingsList);
            const lastSeason = standingsList[standingsList.length - 1];
            console.log('lastSeasonInfo', lastSeason);

            const lsInfo = [{
                season: lastSeason.season,
                ...lastSeason.DriverStandings[0]
            }];
            console.log(lsInfo);
            // localStorage.setItem('lsInfo', JSON.stringify(lsInfo));
            setLastSeasonInfo(lsInfo);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }

    }, [driverId]);

    useEffect(() => {
        // const standingsLS = JSON.parse(localStorage.getItem('driverInfoId'));
        // const lastSeasonLS = JSON.parse(localStorage.getItem('lsInfo'));
        // if (!standingsLS || !lastSeasonLS) {
        //     console.log('n-am info despre id-ul asta, o sa fac request');
        getUserInfoById()
        // } else {
        // setDriverStandings(standingsLS);
        // setLastSeasonInfo(lastSeasonLS);
        // }

        return () => {
            console.log('cleanup function');
            setDriverStandings([]);
            setLastSeasonInfo([]);
        }
    }, [driverId, getUserInfoById]);

    useEffect(() => {
        console.log('lastSeasonInfo state', lastSeasonInfo);
    }, [lastSeasonInfo]);


    let content;
    if (lastSeasonInfo && lastSeasonInfo.length > 0 && !isLoading) {
        content = (
            <div className={classes.driverInfo}>
                <section>
                    <ul>
                        {lastSeasonInfo.map((item) => (
                            <li className={classes.driverInfoWrapper} key={item.Driver.driverId}>
                                <div className={classes.userProfilePic}>
                                    <img src={driversImageAndMoreInfo.find((driver) => driver.driverId === driverId).imgSrc} alt='profile pic' />
                                    <div className={classes.carNumberAndName}>
                                        <p>{`${item.Driver.givenName} ${item.Driver.familyName}`}</p>
                                        <span>Season {item.season} Car No. {item.Driver.permanentNumber}</span>
                                    </div>
                                </div>
                                <div className={classes.userInfo}>
                                    <p>Team: <span>{item.Constructors[0].name}</span></p>
                                    <p>Code: <span> {item.Driver.code}</span></p>
                                    <p>Date of birth: <span> {item.Driver.dateOfBirth}</span></p>
                                    <p>Nationality: <span> {item.Driver.nationality}</span></p>
                                    <p>Season {item.season} drivers championship position: <span>{item.position}</span></p>
                                    <p>Season {item.season} points: <span>{item.points}</span></p>
                                    <p>Season {item.season} wins: <span>{item.wins}</span></p>
                                    <div className={classes.actions_back}>
                                        <Link to={'/'}>Go Back</Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                <p className={classes.standingsTitle}>Driver Standings</p>
                {/* <ul className={classes.driverStandingsList}>
                    {driverStandings.sort((a, b) => b.season - a.season).map((item) => (
                        <li key={item.season} className={classes.driverStandingsItem}>
                            <div className={classes.driverStandingsSeasonRounds}>
                                <span>Season {item.season}</span>
                                <div className={classes.rounds}>
                                    <span className={classes.roundValue}>{item.round}</span>
                                    <span className={classes.bar}></span>
                                    <span className={classes.roundText}>Rounds</span>
                                </div>
                            </div>
                            <div className={classes.driverStandingsInfo}>
                                <div className={classes.position_wins}>
                                    <span>WDC position: {item.DriverStandings[0].position}</span>
                                    <span className={classes.bar}></span>
                                    <span>WDC points: {item.DriverStandings[0].points}</span>
                                </div>
                                <div className={classes.wins_constructor}>
                                    <span>Wins: {item.DriverStandings[0].wins}</span>
                                    <span className={classes.bar}></span>
                                    <span>Constructor: {item.DriverStandings[0].Constructors[0].name}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul> */}
                <section className={classes.tableStandings}>
                    <table cellPadding={'0'} cellSpacing={'0'}>
                        <thead>
                            <tr><td>Season</td></tr>
                            <tr><td>Rounds</td></tr>
                            <tr><td>WDC Position</td></tr>
                            <tr><td>WDC Points</td></tr>
                            <tr><td>Wins</td></tr>
                            <tr><td>Constructor</td></tr>
                        </thead>
                    </table>
                    <div className={classes['tbl-content']}>
                        <table cellPadding={'0'} cellSpacing={'0'}>
                            <tbody>
                                {driverStandings.sort((a, b) => b.season - a.season).map((item) => (
                                    <tr key={item.season}>
                                        <td>{item.season}</td>
                                        <td>{item.round}</td>
                                        <td>{item.round}</td>
                                        <td>{item.DriverStandings[0].position}</td>
                                        <td>{item.DriverStandings[0].points}</td>
                                        <td>{item.DriverStandings[0].wins}</td>
                                        <td>{item.DriverStandings[0].Constructors[0].name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        )
    } else if (!isLoading) {
        content = (
            <>
                <p className={classes.fallback}>Currently, there are no informations about this driver. Maybe search for another one? 🤔 </p>
                <div className={classes.actions_back}>
                    <Link to={'/'}>Go Back</Link>
                </div>
            </>
        )
    } else if (isLoading) {
        content = <Loader />
    }

    return (
        content
    )
}

export default UserInfo