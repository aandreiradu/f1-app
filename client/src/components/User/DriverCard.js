import { driverCards } from "../../animationsPresets/animationsPresets";
import {
  DriverMoreDetails,
  DriverName,
  DriverProfilePicture,
  DriverItem,
} from "./DriverCard.styles";

const DriverCard = (props) => {
  const { driver, driverProfilePic } = props || {};
  return (
    <DriverItem variants={driverCards.driverCard} key={driver.driverId}>
      <DriverProfilePicture>
        <img src={driverProfilePic.imgSrc} alt="profile" />
      </DriverProfilePicture>
      <DriverName>{driver.givenName + " " + driver.familyName}</DriverName>
      <DriverMoreDetails to={`/${driver.driverId}`}>
        View More
      </DriverMoreDetails>
    </DriverItem>
  );
};

export default DriverCard;
