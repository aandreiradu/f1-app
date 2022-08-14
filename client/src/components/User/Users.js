import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Users.module.css";
import Category from "../Category/Category";
import { motion } from "framer-motion";
import { driverCards } from "../../animationsPresets/animationsPresets";
import driversScheduleImages from "../../constants/scheduleImages";
import ErrorModal from "../UI/ErrorModal";
import Loader from "../Loader/Loader";
import SearchDriver from "../SearchDriver/SearchDriver";
import useAxiosInterceptors from "../../hooks/useHttpInterceptors";

const Users = () => {
  const { isLoading, error, sendRequest } =
    useAxiosInterceptors(true);
  const [showModal, setShowModal] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [searchedDriver, setSearchedDriver] = useState("");

  const handleDriverSearch = (searchInput) => {
    setSearchedDriver(searchInput);
  };

  const transformData = (dataSet) => {
    console.log(dataSet);
    const driversArray = dataSet?.MRData.DriverTable.Drivers;
    driversArray && setDrivers(driversArray);
  };

  useEffect(() => {
    sendRequest(
      {
        url : "http://ergast.com/api/f1/2022/drivers.json",
        method : "GET",
        data : null,
        headers : null,
        withCredentials : false
      },
      transformData
    );
  }, [sendRequest]);

  const confirmErrorModal = () => {
    setShowModal(false);
  };

  let content;

  if (error && showModal) {
    content = <ErrorModal title='Ooops!' message = {error?.message} onConfirm={confirmErrorModal} />;
  } else {
    content = (
      <>
        <Category />
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <SearchDriver onSearch={handleDriverSearch} />
              <motion.ul
                variants={driverCards.containerDriverCards}
                initial="hidden"
                animate="visible"
                className={classes.usersList}
              >
                {drivers &&
                  drivers?.map((driver) => {
                    if (
                      driver?.familyName
                        ?.toLowerCase()
                        .includes(searchedDriver.toLowerCase()) ||
                      driver?.givenName
                        ?.toLowerCase()
                        .includes(searchedDriver.toLowerCase())
                    ) {
                      const driverProfilePic = driversScheduleImages.find(
                        (driverImg) => driver.driverId === driverImg.driverId
                      );
                      return (
                        <motion.li
                          variants={driverCards.driverCard}
                          className={classes.userItem}
                          key={driver.driverId}
                        >
                          <div className={classes.userProfilePic}>
                            <img src={driverProfilePic.imgSrc} alt="profile" />
                          </div>
                          <p className={classes.username}>
                            {driver.givenName + " " + driver.familyName}
                          </p>
                          <Link
                            to={`/${driver.driverId}`}
                            className={classes.actionView}
                          >
                            View More
                          </Link>
                        </motion.li>
                      );
                    }
                  })}
              </motion.ul>
            </>
          )}
        </div>
      </>
    );
  }

  return content;
};

export default Users;
