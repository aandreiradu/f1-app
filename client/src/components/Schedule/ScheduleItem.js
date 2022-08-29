import React from 'react'
import driversScheduleImages from '../../constants/scheduleImages';
import classes from './ScheduleItem.module.css'
import raceFlag from '../../assets/schedule images/flag-asset.png'
import monthNames from '../../Utils/months'
import circuitLayouts from '../../constants/circuitsLayouts';
import { Link } from 'react-router-dom';
import { 
    CardSchedule,
    Title,
    Period,
    TimeFlag,
    CountryFlag,
    MonthFlag,
    FinishWrapper,
    EventDetails,
    EventDescription,
    EventCountry,
    GrandPrixName,
    EventResult,
    ImageWrapper,
    DriverInfoWrapper,
    DriverInfo,
    Position3,
    Position2,
    Position1,
    NotDisputed,
    RaceFinishedBtn

} from './ScheduleItem.styles';



const ScheduleItem = (props) => {
    const { circuitId, round, raceName, fp1, raceDate, country, thisRoundResults } = props;
    let dayFp1 = new Date(fp1).getDate();
    let monthFp1 = monthNames[new Date(fp1).getMonth()];
    let raceDay = new Date(raceDate).getDate();
    let monthRaceDay = monthNames[new Date(raceDate).getMonth()];


    let raceNotDisputed = (
        <Link to={`/schedule/${round}/${circuitId}`} className={`${classes['image-wrapper']} ${classes['notDisputed']}`}>
            <img className={classes['notDisputed']} src={circuitLayouts.find((circuit) => circuit.circuitId.toLocaleLowerCase() === circuitId.toLowerCase())?.imgSrc} alt='circuit layout' />
        </Link>
    )

    let content;
    if (thisRoundResults) {
        content = (
            <>
                <Position1>
                    <ImageWrapper>
                        <img src={driversScheduleImages.find(item => item.driverId.toUpperCase().includes(thisRoundResults ? thisRoundResults?.podiums[0] : ''))?.imgSrc} alt='position 1' />
                    </ImageWrapper>
                    <DriverInfoWrapper>
                        <DriverInfo>
                            {thisRoundResults ? thisRoundResults.p1 : ''}
                        </DriverInfo>
                    </DriverInfoWrapper>
                </Position1>
                <Position2>
                    <ImageWrapper>
                        <img src={driversScheduleImages.find(item => item.driverId.toUpperCase().includes(thisRoundResults ? thisRoundResults?.podiums[1] : ''))?.imgSrc} alt='position 2' />
                    </ImageWrapper>
                    <DriverInfoWrapper>
                        <DriverInfo>
                            {thisRoundResults ? thisRoundResults.p2 : ''}
                        </DriverInfo>
                    </DriverInfoWrapper>
                </Position2>
                <Position3>
                    <ImageWrapper>
                        <img src={driversScheduleImages.find(item => item.driverId.toUpperCase().includes(thisRoundResults ? thisRoundResults?.podiums[2] : ''))?.imgSrc} alt='position 3' />
                    </ImageWrapper>
                    <DriverInfoWrapper>
                        <DriverInfo>
                            {thisRoundResults ? thisRoundResults.p3 : ''}
                        </DriverInfo>
                    </DriverInfoWrapper>
                </Position3>
            </>
        )
    } else {
        content = raceNotDisputed
    }

    return (
        <CardSchedule>
            <Title>ROUND {round}</Title>
            <Period >
                <TimeFlag>
                    <p>{dayFp1}-{raceDay}</p>
                    {/* <div className={classes.countryFlag}> */}
                        {/* <img src={driversScheduleImages.find(item => item.driverId.toUpperCase().includes('USA')).imgSrc} alt='country flag' /> */}
                    {/* </div> */}
                </TimeFlag>
                <MonthFlag>
                    <p>{monthFp1 === monthRaceDay ? monthRaceDay : `${monthFp1}-${monthRaceDay}`}</p>
                    <FinishWrapper>
                        {thisRoundResults && <img src={raceFlag} alt='race flag' />}
                    </FinishWrapper>
                </MonthFlag>
            </Period>
            <EventDetails>
                <EventDescription>
                    <EventCountry>
                        <p>{country}</p>
                        <Link to={`/schedule/${round}/${circuitId}`}><i className="fa-solid fa-chevron-right"></i></Link>
                    </EventCountry>
                    <GrandPrixName>{raceName}</GrandPrixName>
                    {
                        thisRoundResults && 
                        <RaceFinishedBtn to={`/race-results/${round}/results`}>
                            View Race Report
                        </RaceFinishedBtn>
                    }
                </EventDescription>
                <EventResult>
                    {content}
                </EventResult>
            </EventDetails>
        </CardSchedule>
    )
}

export default ScheduleItem