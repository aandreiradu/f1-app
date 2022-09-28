import React from 'react';
import {
	RaceTimeList,
	RaceTimeItemRaceTime,
	RaceTimeItemRaceType,
	RaceTimeItemRaceDay,
	RaceTimeItem,
	RaceTimeContainer,
	RaceDetailsContainer,
	ComponentTitle,
	RaceDate,
	RaceName,
	UpComingRaceContainer,
	CountryHost,
	CountryName,
	CountryFlag,
	RaceDetails,
	UpComingWrapper,
	UpcomingEventLeft,
	Bar,
	UpComingLines,
	UpComingRedLines
} from './UpComingRace.styles';
import hostCountriesFlags from '../../assets/host countries';
import Counter from '../Counter/Counter';
import { buildUpcomingEventPerDays } from '../../Utils/buildGPWeekend';

const UpComingRace = (props) => {
	console.log('UpComingRace render');
	const { countryHost, raceName, raceDate, eventTime, eventTitle, upcomingRace } = props || {};
	const countryFlag = hostCountriesFlags?.find(
		(country) => country?.name?.toLocaleLowerCase() === countryHost?.toLocaleLowerCase()
	)?.imgSrc;

	const {
		fp1Day,
		fp1Time,
		fp2Day,
		fp2Time,
		fp3Day,
		fp3Time,
		qualyDay,
		qualyTime,
		raceDay,
		raceTime
	} = buildUpcomingEventPerDays(upcomingRace) || '';

	return (
		<UpComingRaceContainer>
			<UpComingLines>
				<UpComingRedLines />
				<ComponentTitle>UPCOMING EVENT</ComponentTitle>
				<UpComingRedLines />
			</UpComingLines>
			<UpComingWrapper>
				<UpcomingEventLeft>
					<CountryHost>
						<CountryFlag src={countryFlag || ''} alt={`Country ${countryHost} flag`} />
						<CountryName>
							{countryHost ? countryHost[0]?.toUpperCase() + countryHost?.substring(1) : 'N/A'}
						</CountryName>
					</CountryHost>
					<RaceDetails>
						<RaceName>{raceName || 'N/A'}</RaceName>
						<RaceDate>{raceDate || 'N/A'}</RaceDate>
					</RaceDetails>
				</UpcomingEventLeft>
				<Bar />
				<Counter eventTime={eventTime ? new Date(eventTime) : new Date()} eventTitle={eventTitle} />
			</UpComingWrapper>
			<RaceTimeContainer>
				<RaceTimeList>
					<RaceTimeItem>
						<RaceTimeItemRaceType>PRACTICE 1</RaceTimeItemRaceType>
						<RaceTimeItemRaceDay>{fp1Day}</RaceTimeItemRaceDay>
						<RaceTimeItemRaceTime>{fp1Time}</RaceTimeItemRaceTime>
					</RaceTimeItem>
					<RaceTimeItem>
						<RaceTimeItemRaceType>PRACTICE 2</RaceTimeItemRaceType>
						<RaceTimeItemRaceDay>{fp2Day}</RaceTimeItemRaceDay>
						<RaceTimeItemRaceTime>{fp2Time}</RaceTimeItemRaceTime>
					</RaceTimeItem>
					<RaceTimeItem>
						<RaceTimeItemRaceType>PRACTICE 3</RaceTimeItemRaceType>
						<RaceTimeItemRaceDay>{fp3Day}</RaceTimeItemRaceDay>
						<RaceTimeItemRaceTime>{fp3Time}</RaceTimeItemRaceTime>
					</RaceTimeItem>

					{/* <RaceTimeList> */}
					<RaceTimeItem>
						<RaceTimeItemRaceType>QUALYFING</RaceTimeItemRaceType>
						<RaceTimeItemRaceDay>{qualyDay}</RaceTimeItemRaceDay>
						<RaceTimeItemRaceTime>{qualyTime}</RaceTimeItemRaceTime>
					</RaceTimeItem>
					{/* </RaceTimeList> */}
					{/* <RaceTimeList> */}
					<RaceTimeItem>
						<RaceTimeItemRaceType>RACE</RaceTimeItemRaceType>
						<RaceTimeItemRaceDay>{raceDay}</RaceTimeItemRaceDay>
						<RaceTimeItemRaceTime>{raceTime}</RaceTimeItemRaceTime>
					</RaceTimeItem>
					{/* </RaceTimeList> */}
				</RaceTimeList>
			</RaceTimeContainer>
		</UpComingRaceContainer>
	);
};

export default UpComingRace;
