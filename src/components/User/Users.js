import React, { useEffect, useState } from 'react'
import UserSearchForm from './UserSearchForm';
import { Link } from 'react-router-dom';
import classes from './Users.module.css'
import driversImageAndMoreInfo from '../../constants/driversImages';
import Category from '../Category/Category';


const Users = () => {
    const [drivers, setDrivers] = useState([]);

    const getDrivers = async () => {
        const response = await fetch('http://ergast.com/api/f1/2022/drivers.json');
        const data = await response.json();
        console.log('am rulat pt ca nu sunt inLS');
        localStorage.setItem('drivers', JSON.stringify(data.MRData.DriverTable.Drivers));
        setDrivers(data.MRData.DriverTable.Drivers);
    }

    useEffect(() => {
        const driverLS = JSON.parse(localStorage.getItem('drivers'));
        if (!driverLS) {
            getDrivers();
        } else {
            setDrivers(driverLS);
        }
    }, []);

    return (
        <>
            <Category />
            <div>
                <UserSearchForm />
                <ul className={classes.usersList}>
                    {drivers && drivers.map((driver) => {
                        const driverProfilePic = driversImageAndMoreInfo.find((driverImg) => driver.driverId === driverImg.driverId);
                        return (
                            <li className={classes.userItem} key={driver.driverId}>
                                <div className={classes.userProfilePic}>
                                    <img src={driverProfilePic.imgSrc} alt='profile' />
                                </div>
                                <p className={classes.username}>{driver.givenName + ' ' + driver.familyName}</p>
                                <Link to={`/${driver.driverId}`} className={classes.actionView}>View More</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Users