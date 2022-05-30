import React from "react";
import classes from "./TeamItem.module.css";
import teamsCars from "../../constants/teamsCars";
import constructorColors from '../../constants/constructorsColors';

const TeamItem = (props) => {
  const { name, currentPosition, points, constructorId } = props;
  console.log(constructorId);

  return (
    <div className={classes.cardTeam}>
      <div className={classes["cardTeam_standing"]}>
        <div className={classes["cardTeam_standing__position"]}>
          {currentPosition}
        </div>
        <div className={classes["cardTeam_standing__points"]}>
          <span className={classes["cardTeam_standing__points_number"]}>
            {points}
          </span>
          <span className={classes["cardTeam_standing__points_label"]}>
            Points
          </span>
        </div>
      </div>
      <div className={classes["cardTeam_standing_info"]}>
        <div className={classes["cardTeam_standing_info_teamColorAndName"]}>
          <span className={classes["team-color"]} style={{backgroundColor: constructorColors.find((color) => color.team === name).teamColor}}></span>
          <span className={classes["team-name"]}>{name}</span>
        </div>
        <div className={classes["cardTeam_standing_info_logo"]}>
          <img src={teamsCars.find((logo) => logo.constructorId === constructorId)?.logoSrc || ''} alt="team logo" />
        </div>
      </div>
      <div className={classes["cardTeam_drivers_info"]}>
        <div className={classes["cardTeam_driver"]}>
          <span className={classes["cardTeam_driver_firstName"]}>Max</span>
          <span className={classes["cardTeam_driver_lastName"]}>
            Verstappen
          </span>
        </div>
        <div className={classes["cardTeam_driver"]}>
          <span className={classes["cardTeam_driver_firstName"]}>Sergio</span>
          <span className={classes["cardTeam_driver_lastName"]}>Perez</span>
        </div>
      </div>
      <div className={classes["carTeam_car"]}>
        <img src={teamsCars.find((car) => car.constructorId === constructorId)?.carSrc || ''} alt="team car picture" />
      </div>
    </div>
  );
};

export default TeamItem;
