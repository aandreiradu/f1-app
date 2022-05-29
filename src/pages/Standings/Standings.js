import React, { useCallback, useEffect, useState } from "react";
import StandingsResults from "../../components/Standings/StandingsResults";
import StandingType from "../../components/Standings/StandingType";
import StandingYears from "../../components/Standings/StandingYears";
import classes from "./Standings.module.css";

const Standings = () => {
  const [yearStanding, setYearStanding] = useState(new Date().getFullYear());
  const [typeStanding, setTypeStanding] = useState("Driver");
  console.log("render");

  const typeSelectHandler = useCallback(
    (type) => {
      setTypeStanding(type);
    },
    [typeStanding]
  );

  const yearSelectHandler = useCallback(
    (year) => {
      setYearStanding(year);
    },
    [yearStanding]
  );

  return (
    <section className={classes["standings-wrap"]}>
      <div className={classes["standings-filter-wrapper"]}>
        <div className={classes["years_archive"]}>
          <StandingYears onYearSelected={yearSelectHandler} />
        </div>
        <div className={classes["type-archive"]}>
          <StandingType onTypeSelected={typeSelectHandler} />
        </div>
      </div>
      <main className={classes["standing-results"]}>
        <h1>{`${yearStanding} ${typeStanding} Standings`}</h1>
        <StandingsResults type={typeStanding} year={yearStanding}/>
      </main>
    </section>
  );
};

export default Standings;
