import React from "react";
import {
  RaceListingItem,
  RaceListingItemDate,
  RaceListingDetails,
} from "./CircuitScheduleItem.styles";

const CircuitScheduleItem = (props) => {
  const { title,dayNo,monthName,eventTime} = props;

  return (
    <RaceListingItem>
        <RaceListingItemDate>
            <p>{dayNo}</p>
            <span>{monthName}</span>
        </RaceListingItemDate>
        <RaceListingDetails>
            <p>{title}</p>
            <span>{eventTime}</span>
        </RaceListingDetails>
    </RaceListingItem>
  );
};

export default CircuitScheduleItem;
