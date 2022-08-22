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
import useAxiosInterceptors from "../../hooks/useHttpInterceptors";
import { fetchDriversStart,fetchDriversFailure, fetchDriversSuccess} from "../../store/Drivers/drivers.actions";
import { selectDrivers } from "../../store/Drivers/drivers.selector";
import DriverCard from "./DriverCard";


const Users = () => {
  // const { drivers /*,isLoading : isLoadingDrivers,error : errorDrivers*/  } = useSelector(selectDrivers);
  const drivers  = useSelector(selectDrivers);
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest } =
    useAxiosInterceptors(true);
  const [showModal, setShowModal] = useState(true);
  const [searchedDriver, setSearchedDriver] = useState("");

  const handleDriverSearch = (searchInput) => {
    setSearchedDriver(searchInput);
  };


  useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();

      const getDrivers = async () => {
        dispatch(fetchDriversStart());
        
        try {
          sendRequest(
            {
              url: "http://ergast.com/api/f1/2022/drivers.json",
              method: "GET",
              data: null,
              headers: null,
              withCredentials: false,
              signal : controller.signal
            },
            (dataSet) => {
              const driversArray = dataSet?.MRData?.DriverTable?.Drivers;
              isMounted && dispatch(fetchDriversSuccess(driversArray));
            }
          );
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

  },[]);

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
                        if (driver?.familyName?.toLowerCase().includes(searchedDriver.toLowerCase())  || driver?.givenName?.toLowerCase().includes(searchedDriver.toLowerCase())) {
                            const driverProfilePic = driversScheduleImages.find((driverImg) => driver.driverId === driverImg.driverId);
                            return (
                            <DriverCard
                              key={index}
                              driver = {driver}
                              driverProfilePic = {driverProfilePic}
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
