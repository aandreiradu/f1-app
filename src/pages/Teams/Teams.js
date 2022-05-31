import React, { useCallback, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import classes from "./Teams.module.css";
import TeamItem from './TeamItem';
import useHttp from "../../hooks/useHttp";
import ErrorModal from "../../components/UI/ErrorModal";


const buildLineUpByConstructorId = (cid,teams,drivers) => {
  let lineUp = [];
  teams.forEach((team) => {
    drivers.filter((driver) => {
      if(driver.Constructors[0].constructorId === cid) {
          const {givenName,familyName} = driver.Driver;
          if(!lineUp.find((imported) => imported.givenName === driver.Driver.givenName) && driver.Driver.familyName !== 'Hülkenberg') {
              lineUp = [...lineUp,{'constructorId': driver.Constructors[0].constructorId,givenName,familyName,}];
          }
      }
    });
  })
  return lineUp;
};


const Teams = () => {
  const [showModal,setShowModal] = useState(true);
  const [teams,setTeams] = useState([]);
  const [teamsDrivers,setTeamsDrivers] = useState([]);
  const {isLoading,error,sendRequest: fetchTeams} = useHttp();

  const parseResponse = useCallback((teamsResponse) => {
      if (
        teamsResponse.MRData.StandingsTable.StandingsLists.length > 0 &&
        teamsResponse.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.length > 0
      ) {
        const teamsSorted = (teamsResponse.MRData.StandingsTable.StandingsLists[0].ConstructorStandings).sort((a,b) => b.points - a.points);
        if(teamsSorted) {
          setTeams(teamsSorted);
        }
      }
  },[teams]);

  const parseResponseDrivers = (driversResponse) => {
    if(driversResponse.MRData.StandingsTable.StandingsLists.length > 0 && driversResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings.length > 0) {
      setTeamsDrivers(driversResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    }
  }

  useEffect(() => {
    fetchTeams(
      {url : 'http://ergast.com/api/f1/current/constructorStandings.json'},
      parseResponse
    )

    fetchTeams(
      {url: 'http://ergast.com/api/f1/current/driverStandings.json'},
      parseResponseDrivers
    )
  },[]);


  return (
    <div className={`${classes.wrapper} defaultTransition`}>
      <div className={classes['teams-header']}>
      <h1 className={classes["header-title"]}>
        F1 Teams {new Date().getFullYear()}
      </h1>
      </div>
      {isLoading && <Loader />}
      {!isLoading && 
      <div className={classes['teams-results']}>
          {teams && teams.map((team,index) => {
            const lineup = buildLineUpByConstructorId(team.Constructor.constructorId,teams,teamsDrivers);
            // console.log(lineup);
            return (<TeamItem 
              key={team.Constructor.constructorId}
              points = {team.points}
              name = {team.Constructor.name}
              currentPosition = {team.position}
              constructorId = {team.Constructor.constructorId}
              drivers = {lineup}
            />)
          })}
      </div> }
    </div>
  );
};

export default Teams;
