import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

// export const DriverItem = styled(motion.li)`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   flex-direction: column;
//   background-color: rgba(109, 109, 109, 0.3);
//   border-radius: 7px;
//   height: 250px;
//   /* width: 200px; */
// `;

// export const DriverProfilePicture = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 100%;
//   max-height: 175px;

//   & img {
//     width: 100%;
//     height: 100%;
//     object-fit: contain;
//     border-top-left-radius: 7px;
//     border-top-right-radius: 7px;
//     background-position: center center;
//     background-repeat: no-repeat;
//   }
// `;

// export const DriverName = styled.p`
//   width: 100%;
//   color: #fff;
//   text-align: center;
//   font-size: 1.2rem;
// `;

// export const DriverMoreDetails = styled(Link)`
//   cursor: pointer;
//   background-color: #e10600;
//   border: none;
//   padding: 0.25rem 0;
//   color: #fff;
//   font-weight: bold;
//   margin-bottom: 10px;
//   border-radius: 7px;
//   /* width: 80%; */
//   width: 120px;
//   text-align: center;
// `;

// new design

export const DriverCardContainer = styled(motion.li)`
  color: #fff;
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-top: solid 2px #e10600;
  border-right: solid 2px #e10600;
  border-top-right-radius: 10px;
  /* padding: 0 10px; */
  padding-right: 10px;
  /* flex: 0 0 1; */
  max-width: 100%;
  margin: 10px 0;


  &:hover {
    border-color: ${props => props.teamColor ? props.teamColor : '#e10600'};
    transition: .25s border-color linear;
  }

  /* @media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
  }

  @media (min-width: 1024px) {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  } */
`;

export const DriverCardHeader = styled.div`
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid #949498;
  margin: 8px 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;

export const DriverCardHeaderPosition = styled.div`
  font-size: 3rem;
  font-weight: bold;
  line-height: 3rem;

  display: flex;
  align-items: center;
  flex: 1;
`;

export const DriverCardHeaderStandings = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 70px;
  /* background-color: tomato; */
`

export const DriverCardHeaderPoints = styled.span`
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 34px;
  text-align: center;
`;

export const DriverCardHeaderPointsLabel = styled.span`
  display: inline-block;
  padding: 2px 5px 1px;
  border-radius: 5px;
  color: #000;
  background: #fff;
  white-space: nowrap;
  font-weight: bold;
  text-align: center;
`;

export const DriverCardNameNationality = styled.div`
  display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #949498;
    margin-bottom: 10px;
`

export const DriverCardNameAndTeamColor = styled.div`
  display: flex;
  align-items: center;
`;

export const DriverCardTeamColor = styled.span`
  display: inline-block;
  width: 5px;
  height: 28px;
  margin-right: 13px;
  background-color: ${props => props.teamColor ? props.teamColor : ''}

`;

export const DriverCardName = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const DriverNationalityFlagContainer = styled.div`
    height: 30px;
    background-color: none;
    border-radius: 5px;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
`

export const DriverCardConstructorName = styled.h2`
    font-size: 1rem;
    line-height: 15px;
    letter-spacing: .5px;
    font-weight: 400;
    color: #fff;
    margin-bottom: 10px;
`

export const DriverCardImageWrapper = styled.div`
background-color: #fff;
  background-position-y: bottom;
  height: 135px;
  position: relative;
  text-align: right;
  background-image:url('https://www.formula1.com/etc/designs/fom-website/images/patterns/plus-x2.png');
  background-repeat: repeat;
    background-size: 8px;
`; 

export const DriverCardImage = styled.img`
    /* overflow: hidden;
    height: 192px;
    width: 192px;
    position: absolute;
    width: 192px;
    right: 0px;
    top: -25px;    */
    overflow: hidden;
    height: 148px;
    width: 192px;
    position: absolute;
    width: 192px;
    right: -15px;
    top: -12px;
    object-fit: contain;
`

export const DriverCardPermanentNumber = styled.img`
    background-color: #fff;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 97px;
    height: 55px;
`

