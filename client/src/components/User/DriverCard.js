import { driverCards } from "../../animationsPresets/animationsPresets";
import {
  DriverCardContainer,
  DriverCardHeader,
  DriverCardHeaderStandings,
  DriverCardHeaderPosition,
  DriverCardHeaderPoints,
  DriverCardHeaderPointsLabel,
  DriverCardNameNationality,
  DriverCardNameAndTeamColor,
  DriverCardTeamColor,
  DriverCardName,
  DriverNationalityFlagContainer,
  DriverCardConstructorName,
  DriverCardImageWrapper,
  DriverCardImage,
  DriverCardPermanentNumber
} from "./DriverCard.styles";
import classes from '../../pages/Teams/TeamItem.module.css'
import constructorsColors from "../../constants/constructorsColors";
import scheduleImages from "../../constants/scheduleImages";
import { driverCards as driverCardsAnimations } from "../../animationsPresets/animationsPresets";
import { Link } from "react-router-dom";

const DriverCard = (props) => {
  const { driverId,driverRank,driverPoints,driverName,driverNationality,constructorName,constructorId,driverProfilePic,driverNumber,driverNationalityFlag } = props || {};
  
  return (
    <Link to={`/${driverId}`}>
    <DriverCardContainer variants={driverCardsAnimations?.driverCard} teamColor={constructorsColors?.find(constructor => constructor.team === constructorName)?.teamColor || ''}>
      <DriverCardHeader>
        <DriverCardHeaderPosition>{driverRank || 'N/A'}</DriverCardHeaderPosition>
        <DriverCardHeaderStandings>
          <DriverCardHeaderPoints>{driverPoints || 'N/A'}</DriverCardHeaderPoints>
          <DriverCardHeaderPointsLabel>PTS</DriverCardHeaderPointsLabel>
        </DriverCardHeaderStandings>
      </DriverCardHeader>
      <DriverCardNameNationality>
        <DriverCardNameAndTeamColor>
          <DriverCardTeamColor teamColor={constructorsColors?.find(constructor => constructor.team === constructorName)?.teamColor || ''}></DriverCardTeamColor>
          <DriverCardName>{driverName || 'N/A'}</DriverCardName>
        </DriverCardNameAndTeamColor>
        <DriverNationalityFlagContainer>
          <img src={driverNationalityFlag || "https://www.formula1.com/content/dam/fom-website/flags/Netherlands.jpg.transform/2col-retina/image.jpg"} />
        </DriverNationalityFlagContainer>
      </DriverCardNameNationality>
      <DriverCardConstructorName>{constructorName || 'N/A'}</DriverCardConstructorName>
      <DriverCardImageWrapper>
        <DriverCardImage src={driverProfilePic || "https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col-retina/image.png"} />
        <DriverCardPermanentNumber src={driverNumber || "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/MAXVER01.png.transform/2col-retina/image.png"} />
      </DriverCardImageWrapper>
    </DriverCardContainer>
    </Link>
  );
  
}
  export default DriverCard;
  







  // <DriverItem variants={driverCards?.driverCard} key={driver?.driverId}>
  //   <DriverProfilePicture>
  //     <img src={driverProfilePic?.imgSrc} alt="profile" />
  //   </DriverProfilePicture>
  //   <DriverName>{driver?.givenName + " " + driver?.familyName}</DriverName>
  //   <DriverMoreDetails to={`/${driver?.driverId}`}>
  //     View More
  //   </DriverMoreDetails>
  // </DriverItem>