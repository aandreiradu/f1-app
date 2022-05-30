import React, { useCallback, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import classes from "./Teams.module.css";
import TeamItem from './TeamItem';
import useHttp from "../../hooks/useHttp";
import ErrorModal from "../../components/UI/ErrorModal";


const Teams = () => {
  const [showModal,setShowModal] = useState(true);
  const [teams,setTeams] = useState([]);
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

  useEffect(() => {
    fetchTeams(
      {url : 'http://ergast.com/api/f1/current/constructorStandings.json'},
      parseResponse
    )
  },[]);


  useEffect(() => {
    console.log('teams state',teams);
  },[teams])

  return (
    <div className={`${classes.wrapper} defaultTransition`}>
      <div className={classes['teams-header']}>
      <h1 className={classes["header-title"]}>
        F1 Teams {new Date().getFullYear()}
      </h1>
      </div>
      <div className={classes['teams-results']}>
          {teams && teams.map((team,index) => (
            <TeamItem 
              key={team.Constructor.constructorId}
              points = {team.points}
              name = {team.Constructor.name}
              currentPosition = {team.position}
              constructorId = {team.Constructor.constructorId}
            />
          ))}
      </div>
    </div>
  );
};

export default Teams;
