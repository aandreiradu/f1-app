import React, { useEffect, useReducer, useState } from "react";
import classes from "./StandingsResults.module.css";
import useHttp from "../../hooks/useHttp";
import Loader from "../Loader/Loader";

const buildContentHeadByType = (type) => {
  switch (type) {
    case "Driver": {
      return (
        <thead>
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Nationality</th>
            <th>Team</th>
            <th className={classes["limiter"]}></th>
            <th>Pts</th>
          </tr>
        </thead>
      );
    }

    case "Constructor": {
      return (
        <thead>
          <tr>
            <th>Pos</th>
            <th>Team</th>
            <td className={classes["limiter"]}></td>
            <th>Pts</th>
          </tr>
        </thead>
      );
    }

    default:
      throw new Error("default reached");
  }
};

const buildContentBodyByType = (type, content) => {
  switch (type) {
    case "Driver": {
      if (content.Driver && content.length > 0) {
        content.map((item) => (
          <tr
            className={classes["standing-result-row"]}
            key={item.Driver.driverId}
          >
            <td>{item.position}</td>
            <td>{item.Driver.code}</td>
            <td>{item.Driver.nationality}</td>
            <td>{item.Constructors[0].name}</td>
            <td className={classes["limiter"]}></td>
            <td>{item.points}</td>
          </tr>
        ));
      }
      break;
    }

    case "Constructor": {
      if (content.Constructor && content.length > 0) {
        content.map((item) => (
          <tr
            className={classes["standing-result-row"]}
            key={item.Constructor.constructorId}
          >
            <td>{item.position}</td>
            <td>{item.Constructor.name}</td>
            <td className={classes["limiter"]}></td>
            <td>{item.points}</td>
          </tr>
        ));
      }
      break;
    }

    default:
      throw new Error("default reached");
  }
};

const StandingsResults = (props) => {
  const [standingsResultsDriver, setStandingsResultsDriver] = useState([]);
  const [standingsResultsConstructor, setStandingsResultsConstructor] =
    useState([]);
  const [noContent, setNoContent] = useState(false);
  let { type, year } = props;
  const { isLoading, error, sendRequest: getStandingsData } = useHttp();
  let tHead = buildContentHeadByType(type);
  let tBody = buildContentBodyByType(
    type,
    type === "Driver" ? standingsResultsDriver : standingsResultsConstructor
  );

  let URL;
  if (!year && type === "Driver") {
    URL = "http://ergast.com/api/f1/current/driverStandings.json";
  } else if (!year && type === "Constructor") {
    URL = "http://ergast.com/api/f1/current/constructorStandings.json";
  }

  if (type && year) {
    URL = `http://ergast.com/api/f1/${year}/${type}Standings.json`;
  }

  let parseResponseData = (stateData) => {
    if (
      stateData &&
      stateData.MRData &&
      stateData.MRData.StandingsTable &&
      stateData.MRData.StandingsTable.StandingsLists &&
      stateData.MRData.StandingsTable.StandingsLists.length > 0
    ) {
      if (type === "Driver") {
        if (
          stateData.MRData.StandingsTable.StandingsLists[0].DriverStandings
            .length > 0
        ) {
          setStandingsResultsDriver(
            stateData.MRData.StandingsTable.StandingsLists[0].DriverStandings
          );
        }
      } else if (type === "Constructor") {
        if (
          stateData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
            .length > 0
        ) {
          setStandingsResultsConstructor(
            stateData.MRData.StandingsTable.StandingsLists[0]
              .ConstructorStandings
          );
        }
      }
    } else if(stateData.MRData.StandingsTable.StandingsLists.length === 0) {
      console.log('no data here');
      setNoContent(true);
    }
  };

  useEffect(() => {
    // setStandingsResultsConstructor([])
    // setStandingsResultsDriver([]);
    getStandingsData({ url: URL }, parseResponseData);
    if (noContent) {
      setNoContent(false);
    }
  }, [year, type]);

  useEffect(() => {
    console.log("state", standingsResultsConstructor, standingsResultsDriver);
    console.log('noCOntent',noContent)
  }, [standingsResultsConstructor, standingsResultsDriver]);

  if (isLoading) {
    return <Loader />;
  }

  if (type === "Driver") {
    tBody = (
      <tbody>
        {standingsResultsDriver &&
          standingsResultsDriver.length > 0 &&
          standingsResultsDriver.map((result) => (
            <tr
              className={classes["standing-result-row"]}
              key={result.Driver.driverId}
            >
              {/* <td className={classes['limiter']}></td> */}
              <td>{result.position}</td>
              <td>{result.Driver?.code || result.Driver.familyName}</td>
              <td>{result.Driver.nationality}</td>
              <td>{result.Constructors[0].name}</td>
              <td className={classes["limiter"]}></td>
              <td>{result.points}</td>
            </tr>
          ))}
      </tbody>
    );
  } else {
    tBody = (
      <tbody>
        {standingsResultsConstructor &&
          standingsResultsConstructor.length > 0 &&
          standingsResultsConstructor.map((result) => (
            <tr
              className={classes["standing-result-row"]}
              key={result.Constructor.constructorId}
            >
              {/* <td className={classes['limiter']}></td> */}
              <td>{result.position}</td>
              <td>{result.Constructor?.name}</td>
              <td className={classes["limiter"]}></td>
              <td>{result.points}</td>
            </tr>
          ))}
      </tbody>
    );
  }

  return (
    <div className={classes["table-standings-wrap"]}>
      {!noContent ? (
        <table className={classes["table-results"]}>
          {tHead}
          {tBody}
        </table>
      ) : (
        <p className={classes['noContent_text']}>
          We're sorry, we dont have this data right now! <br/>
          Let's search for something else 👀
        </p>
      )}
    </div>
  );
};

export default StandingsResults;
