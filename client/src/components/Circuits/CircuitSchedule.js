import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CircuitSchedule.module.css";
import { useParams } from "react-router-dom";
import monthNames from "../../Utils/months";
import scheduleCircuits from "../../constants/scheduleCircuits";
import Loader from "../../components/Loader/Loader";
import dateUtils from "../../Utils/UTCtoRO";
import ErrorModal from "../UI/ErrorModal";
import useAxiosInterceptorsPublic from "../../hooks/useHttpInterceptorsPublic";
import {
  fetchScheduleDetailsStart,
  fetchScheduleDetailsSuccess,
  fetchScheduleDetailsError,
} from "../../store/ScheduleDetails/scheduleDetails.actions";
import { selectScheduleDetails } from "../../store/ScheduleDetails/scheduleDetails.selector";
import CircuitScheduleItem from "./CircuitScheduleItem";
import {
  RaceHubGlobalStyle,
  RaceHubWrapper,
  RaceHeader,
  RaceImage,
  RaceContent,
  RaceYearWrapper,
  RaceYearImage,
  RaceTime,
  RaceScheduleListing,
  RaceHub,
} from "./CircuitSchedule.styles";

const buildWeekend = (state) => {
  console.log("received", state);
  const fp1 = state?.FirstPractice?.date;
  console.log("fp1", fp1);
  const raceDate = state?.date;
  console.log("raceDate", raceDate);
  let dayFp1 = fp1 && new Date(fp1).getDate();
  let monthFp1 = fp1 && monthNames[new Date(fp1).getMonth()];
  let raceDay = raceDate && new Date(raceDate).getDate();
  let monthRaceDay = raceDate && monthNames[new Date(raceDate).getMonth()];

  let monthsRaceDay =
    monthRaceDay === monthFp1 ? monthRaceDay : `${monthRaceDay}-${monthFp1}`;

  console.log("buildWeekend return", {
    fday: dayFp1,
    lday: raceDay,
    monthsRaceDay: monthsRaceDay,
  });

  return {
    fday: dayFp1,
    lday: raceDay,
    monthsRaceDay: monthsRaceDay,
  };
};

const CircuitSchedule = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(true);
  const params = useParams();
  const { round, circuitId } = params;
  const circuitScheduleStore = useSelector(selectScheduleDetails);
  console.log("circuitScheduleStore", circuitScheduleStore);
  let circuitSchedule =
    [
      circuitScheduleStore?.find((cc) => cc?.Circuit?.circuitId === circuitId),
    ] || [];
  console.log("circuitSchedule", circuitSchedule);
  const [raceWeek, setRaceWeek] = useState({});
  const { isLoading, error, sendRequest } = useAxiosInterceptorsPublic();

  let circuitContent = scheduleCircuits.find(
    (circuit) => circuit.circuitId.toUpperCase() === circuitId.toUpperCase()
  );

  useEffect(() => {
    console.log("raceWeek", raceWeek);
  }, [raceWeek]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getScheduleDetailsByID = async () => {
      dispatch(fetchScheduleDetailsStart());

      try {
        const storedCircuitData =
          circuitScheduleStore?.find(
            (cc) => cc?.Circuit?.circuitId === circuitId
          ) || null;
        console.log("storedCircuitData", storedCircuitData);
        if (storedCircuitData) {
          console.log(
            "AVEM DEJA ACEST CIRCUIT IN STORE, NU MAI FACEM REQUEST BUEY",
            circuitScheduleStore
          );
          circuitSchedule = storedCircuitData;
          console.log('circuitSchedule before build',circuitSchedule);
          setRaceWeek(buildWeekend(circuitSchedule));
          console.log("o sa facem map pe asta hehehe", circuitSchedule);
        } else {
          sendRequest(
            {
              url: `https://ergast.com/api/f1/${new Date().getFullYear()}/${round}.json`,
              method: "GET",
              signal: controller.signal,
              withCredentials: false,
            },
            (responseData) => {
              console.log(
                `responseData for circuit ${circuitId}`,
                responseData
              );
              if (isMounted) {
                const raceData = responseData?.MRData?.RaceTable?.Races[0];
                if (!circuitSchedule?.find((circ) => circ?.Circuit?.circuitId === circuitId)) {
                  console.log("NU AVEM ACEST CIRCUIT IN STORE => dispatch");
                  dispatch(fetchScheduleDetailsSuccess(raceData));
                  setRaceWeek(buildWeekend(raceData));
                } else {
                  console.log("AVEM ACEST CIRCUIT IN STORE => fara dispatch");
                }
              }
            }
          );
        }
      } catch (error) {
        console.log(
          `error on schedule details for circuit ${circuitId}`,
          error
        );
        dispatch(fetchScheduleDetailsError(error?.message || error));
      }
    };

    getScheduleDetailsByID();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [round, circuitId]);

  const confirmErrorModal = () => {
    setShowModal(false);
  };

  let content;
  if (error && showModal) {
    content = <ErrorModal onConfirm={confirmErrorModal} />;
  } else {
    content = (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <RaceHubGlobalStyle />
            <RaceHubWrapper>
              {circuitSchedule?.length > 0 &&
                circuitSchedule?.map((item, index) => {
                  console.log("item", item);
                  return (
                    <RaceHub key={item?.round || index} className='defaultTransition defaultTransition-M1'>
                      <RaceHeader>
                        <RaceImage
                          src={circuitContent?.imgSrc}
                          alt={circuitId}
                        />
                        <RaceContent>
                          <h1>{item?.Circuit?.Location?.country}</h1>
                          <RaceYearWrapper>
                            <RaceYearImage src={scheduleCircuits.find((img) => img?.circuitId === "2022")?.imgSrc} alt={"year"}/>
                          </RaceYearWrapper>
                          <p>{`${raceWeek?.fday}-${raceWeek?.lday} ${raceWeek?.monthsRaceDay}`}</p>
                        </RaceContent>
                      </RaceHeader>
                      <section>
                        <RaceTime>
                          <p>RACE WEEKEND</p>
                          <h2>{item?.raceName}</h2>
                        </RaceTime>
                        <RaceScheduleListing>
                          <CircuitScheduleItem
                            title="Race"
                            dayNo={new Date(item?.date).getDate()}
                            monthName={
                              monthNames[new Date(item?.date).getMonth()]
                            }
                            eventTime={dateUtils.UTCtoRO(
                              item?.date,
                              String(item?.time).split("Z")[0]
                            )}
                          />
                          <CircuitScheduleItem
                            title="Qualyfing"
                            dayNo={new Date(item?.Qualifying?.date).getDate()}
                            monthName={
                              monthNames[
                                new Date(item?.Qualifying?.date).getMonth()
                              ]
                            }
                            eventTime={dateUtils.UTCtoRO(
                              item?.Qualifying?.date,
                              String(item?.Qualifying?.time).split("Z")[0]
                            )}
                          />
                          <CircuitScheduleItem
                            title="Practice 3"
                            dayNo={new Date(
                              item?.ThirdPractice?.date
                            ).getDate()}
                            monthName={
                              monthNames[
                                new Date(item?.ThirdPractice?.date).getMonth()
                              ]
                            }
                            eventTime={
                              dateUtils.UTCtoRO(
                                item?.ThirdPractice?.date,
                                String(item?.ThirdPractice?.time).split("Z")[0]
                              ) || "N/A"
                            }
                          />
                          <CircuitScheduleItem
                            title="Practice 2"
                            dayNo={new Date(
                              item?.SecondPractice?.date
                            ).getDate()}
                            monthName={
                              monthNames[
                                new Date(item?.SecondPractice?.date).getMonth()
                              ]
                            }
                            eventTime={
                              dateUtils.UTCtoRO(
                                item?.SecondPractice?.date,
                                String(item?.SecondPractice?.time).split("Z")[0]
                              ) || "N/A"
                            }
                          />
                          <CircuitScheduleItem
                            title="Practice 1"
                            dayNo={new Date(
                              item?.FirstPractice?.date
                            ).getDate()}
                            monthName={
                              monthNames[
                                new Date(item?.FirstPractice?.date).getMonth()
                              ]
                            }
                            eventTime={
                              dateUtils.UTCtoRO(
                                item?.FirstPractice?.date,
                                String(item?.FirstPractice?.time).split("Z")[0]
                              ) || "N/A"
                            }
                          />
                        </RaceScheduleListing>
                      </section>
                    </RaceHub>
                  );
                })}
            </RaceHubWrapper>
          </>
        )}
      </>
    );
  }

  return content;
};

export default CircuitSchedule;
