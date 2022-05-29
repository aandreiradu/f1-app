import React,{useEffect, useReducer, useState} from 'react'
import classes from './StandingsResults.module.css'
import useHttp from '../../hooks/useHttp';

const StandingsResults = (props) => {
    const [standingsResults,setStandingsResults] = useState([]);
    let {type,year} = props;
    const {isLoading,error,sendRequest: getStandingsData} = useHttp();

    let URL;
    if(!year && type === 'Driver') {
        URL = 'http://ergast.com/api/f1/current/driverStandings.json';
    } else if(!year === type === 'Constructor') {
        URL = 'http://ergast.com/api/f1/current/constructorStandings.json'
    };

    if(type && year) {
        URL = `http://ergast.com/api/f1/${year}/${type}Standings.json`;
    }

    let parseResponseData = (stateData) => {
        console.log('stateData',stateData);
        if(stateData && stateData.MRData && stateData.MRData.StandingsTable && stateData.MRData.StandingsTable.StandingsLists){
            setStandingsResults(stateData.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        }
    }

    useEffect(() => {
        getStandingsData({ url: URL }, parseResponseData);
    },[year,type]);

    useEffect(() => {
        console.log('standingsResults',standingsResults);
    },[standingsResults])

  return (
    <div className={classes['table-standings-wrap']}>
        <table className={classes['table-results']}>
            <thead>
                <tr>
                    <th className={classes['limiter']}></th>
                    <th>Pos</th>
                    <th>Driver</th>
                    <th>Nationality</th>
                    <th>Car</th>
                    <th className={classes['limiter']}></th>
                    <th>Pts</th>
                </tr>
            </thead>
                <tbody>
                  {standingsResults && standingsResults.map((result) => (
                      <tr key={result.Driver.driverId}>
                          {/* <td className={classes['limiter']}></td> */}
                          <td>{result.position}</td>
                          <td>{result.Driver.code}</td>
                          <td>{result.Driver.nationality}</td>
                          <td>{result.Constructors[0].name}</td>
                          <td className={classes['limiter']}></td>
                          <td>{result.points}</td>
                      </tr>
                  ))}
                </tbody>
        </table>
    </div>
  )
}

export default StandingsResults