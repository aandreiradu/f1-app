import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import classes from "./Users.module.css";
import Category from "../Category/Category";
import { motion } from "framer-motion";
import { driverCards } from "../../animationsPresets/animationsPresets";
import driversScheduleImages from "../../constants/scheduleImages";
import ErrorModal from "../UI/ErrorModal";
import Loader from "../Loader/Loader";
import SearchDriver from "../SearchDriver/SearchDriver";
import useAxiosInterceptorsPublic from "../../hooks/useHttpInterceptorsPublic";
import { fetchDriversStart,fetchDriversFailure, fetchDriversSuccess} from "../../store/Drivers/drivers.actions";
import { selectDrivers } from "../../store/Drivers/drivers.selector";
import DriverCard from "./DriverCard";


const Users = () => {
  // const { drivers /*,isLoading : isLoadingDrivers,error : errorDrivers*/  } = useSelector(selectDrivers);
  const drivers  = useSelector(selectDrivers);
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest } = useAxiosInterceptorsPublic();
  const [showModal, setShowModal] = useState(true);
  const [searchedDriver, setSearchedDriver] = useState("");

  const handleDriverSearch = (searchInput) => {
    setSearchedDriver(searchInput);
  };


  useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();

      const getDrivers = async () => {
        console.log('getDrivers RUN');
        dispatch(fetchDriversStart());
        
        try {

          if(!drivers?.length > 0) {
            console.log('n-avem drivers, request',drivers);
            sendRequest(
              {
                // url: "http://ergast.com/api/f1/2022/drivers.json",
                url: "http://ergast.com/api/f1/current/driverStandings.json",
                method: "GET",
                data: null,
                headers: null,
                withCredentials: false,
                signal : controller.signal
              },
              (dataSet) => {
                const driversArray = dataSet?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings;
                console.log('driversArray',driversArray);
                isMounted && dispatch(fetchDriversSuccess(driversArray));
              }
            );
          }
        } catch(error) {
          console.log('error Drivers request',error);
          dispatch(fetchDriversFailure(error))
        }
        
      }

      getDrivers(); 

      return () => {
        isMounted = false;
        controller.abort();
      }

  },[dispatch,sendRequest]);

  const confirmErrorModal = () => {
    setShowModal(false);
  };


  let content;

  if ((error /*|| errorDrivers*/) && showModal) {
    content = <ErrorModal title='Ooops!' message = {error?.message} onConfirm={confirmErrorModal} />;
  } else {
    content = (
      <>
        <Category />
        <>
          {
            (isLoading /*|| isLoadingDrivers*/) 
            ? <Loader />
            : (
                <>
                  <SearchDriver onSearch={handleDriverSearch} />
                  <motion.ul
                    variants={driverCards.containerDriverCards}
                    initial="hidden"
                    animate="visible"
                    className={classes.usersList}
                  >
                    {
                      drivers && drivers?.map((driver,index) => {
                        if (driver?.Driver?.familyName?.toLowerCase().includes(searchedDriver.toLowerCase())  || driver?.Driver.givenName?.toLowerCase().includes(searchedDriver.toLowerCase())) {
                            const driverProfilePic = driversScheduleImages.find((driverImg) => driver?.Driver?.driverId === driverImg.driverId);
                            return (
                            <DriverCard
                              key={driver?.Driver?.driverId || index}
                              driverId = {driver?.Driver?.driverId}
                              driverRank = {driver?.position}
                              driverPoints = {driver?.points}
                              driverName = {`${driver?.Driver?.givenName} ${driver?.Driver?.familyName}`}
                              driverNationality=  {driver?.Driver?.nationality}
                              constructorName = {driver?.Constructors[0]?.name}
                              constructorId = {driver?.Constructors[0]?.constructorId}
                              driverProfilePic = {driverProfilePic?.imgSrc}
                              driverNumber = {driverProfilePic?.imgNumber}
                              driverNationalityFlag = {driverProfilePic?.nationalityFlag}
                            />
                          );
                        }
                        })
                      }
                  </motion.ul>
                </>
          )}
        </>
      </>
    );
  }

  return content;
};

export default Users;
