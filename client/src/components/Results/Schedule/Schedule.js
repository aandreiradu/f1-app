import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import classes from "./Schedule.module.css";
import ScheduleItem from "./ScheduleItem";
import ErrorModal from "../../UI/ErrorModal";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
  fetchRaceResultsStart,
  fetchRaceResultsSuccess,
  fetchRaceResultsFailure,
} from "../../../store/RaceResults/raceResults.actions";
import { useDispatch, useSelector } from "react-redux";
import { selectRaceResultReducer } from "../../../store/RaceResults/raceResults.selector";
import useAxiosInterceptors from "../../../hooks/useHttpInterceptors";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/Auth/auth.actions";

const Schedule = () => {
  const navigate = useNavigate();
  const {
    isLoading: isLoadingRR,
    results: raceResultsArray,
    error: errorRR,
  } = useSelector(selectRaceResultReducer);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(true);
  const [seasonSchedule, setSeasonSchedule] = useState([]);
  const axiosPrivate = useAxiosPrivate(false);
  const { isLoading, error, sendRequest } = useAxiosInterceptors(true);

  const transformData = useCallback((responseData) => {
    setSeasonSchedule(responseData.MRData.RaceTable.Races);
  },[]);

  useEffect(() => {

    sendRequest(
      {
        url: "http://ergast.com/api/f1/current.json",
        method: "GET",
        data: null,
        headers: null,
        withCredentials: false,
      },
      transformData
    );
  }, [sendRequest]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getRaceResults = async () => {
      dispatch(fetchRaceResultsStart());
      try {
        const responseRR = await axiosPrivate.post("/api/getRaceResultByYear", {
          year: new Date().getFullYear(),
          signal: controller.signal,
        });
        isMounted &&
          responseRR?.data &&
          responseRR?.data.length > 0 &&
          dispatch(fetchRaceResultsSuccess(responseRR?.data));
      } catch (error) {
        const {
          response: {
            data: { message, statusCode },
          },
        } = error || null;
        console.log(message, statusCode);

        if(message === 'Unauthorized' && statusCode === 401) {
          dispatch(logout());
          navigate('/login');
        }

        dispatch(fetchRaceResultsFailure({ message, statusCode } || error));
      }
    };

    getRaceResults();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const confirmErrorModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`${classes.wrapper} defaultTransition`}>
      <>
        <div className={classes["schedule-header"]}>
          <h1 className={classes["header-title"]}>
            F1 Schedule {new Date().getFullYear()}
          </h1>
          <p className={classes["header-competition"]}>
            {new Date().getFullYear()} FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE
            CALENDAR
          </p>
        </div>
        {errorRR && showModal && (
          <ErrorModal
            title="Oops!"
            message={errorRR?.message}
            onConfirm={confirmErrorModal}
          />
        )}
        {error && showModal ? (
          <ErrorModal
            message={errorRR?.message || errorRR}
            title={"Someting went wrong!"}
            onConfirm={confirmErrorModal}
          />
        ) : (
          <div className={classes["schedule-results"]}>
            {seasonSchedule &&
              seasonSchedule.map((item) => (
                <ScheduleItem
                  key={item.round}
                  circuitId={item.Circuit.circuitId}
                  thisRoundResults={raceResultsArray[item.round - 1]}
                  round={item.round}
                  raceName={item.raceName}
                  raceDate={item.date}
                  fp1={item.FirstPractice.date}
                  country={item.Circuit.Location.country}
                />
              ))}
          </div>
        )}
      </>
    </div>
  );
};

export default Schedule;
