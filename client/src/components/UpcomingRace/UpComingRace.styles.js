import styled from 'styled-components';
import {
	growingFlexRedLines,
	growingHeight,
	growingBorders
} from '../../animationsPresets/keyframes';

export const UpComingRaceContainer = styled.article`
	margin: 40px 0 20px 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	/* background-color: #fff; */
	color: #fff;
	padding: 20px 10px;
	border: 1px solid #e10600;
	border-left: 0;
	border-bottom: 0;
	border-top-right-radius: 10px;
`;

export const UpComingLines = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
`;

export const UpComingRedLines = styled.span`
	flex: 1;
	height: 1px;
	background-color: #e10600;
	animation: ${growingFlexRedLines} 1s ease-in;
`;

export const ComponentTitle = styled.h3`
	font-size: 1.1rem;
	text-transform: uppercase;
	line-height: 14px;
	padding: 0 10px;
	text-align: center;
`;

export const CountryHost = styled.div`
	display: flex;
`;

export const CountryName = styled.span`
	font-size: 1.2rem;
`;

export const CountryFlag = styled.img`
	width: 50px;
	height: 30px;
	margin-right: 10px;
	border-radius: 5px;
`;

export const RaceDetailsContainer = styled.section`
	padding: 0 10px;
`;

export const RaceDetails = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 20px 0;
`;

export const RaceName = styled.h3`
	font-weight: 400;
	font-size: 1rem;
	line-height: 20px;
	margin-bottom: 15px;
	font-family: 'Titillium Web';
	text-transform: uppercase;
`;

export const RaceDate = styled.p`
	/* color: #949498; */
	color: #fff;
	font-family: 'Titillium Web';
	font-size: 13px;
	line-height: 15px;
	letter-spacing: 0.5px;
	font-weight: 400;
	font-weight: 700;
`;

export const RaceTimeContainer = styled.div`
	margin: 20px 0;
`;

export const RaceTimeList = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const RaceTimeItem = styled.li`
	width: 100%;
	margin-bottom: 5px;
	display: flex;
	align-items: center;
`;

export const RaceTimeItemRaceType = styled.span`
	font-size: 14px;
	letter-spacing: 0.5px;
	font-weight: 400;
	text-transform: uppercase;
	line-height: 1;
	width: 45%;
`;

export const RaceTimeItemRaceDay = styled.span`
	width: 35px;
	text-align: center;
	text-transform: uppercase;
	/* padding: 0 5px; */
	font-size: 14px;
	font-weight: 700;
	line-height: 15px;
	background: #fff;
	color: #000;
	border-radius: 4px;
`;

export const RaceTimeItemRaceTime = styled.span`
	margin-left: 15px;
	display: flex;
	align-items: center;
	background-color: #38383f;
	padding: 0 5px;
	font-size: 14px;
	font-weight: 700;
	line-height: 15px;
	background: #fff;
	color: #000;
	border-radius: 4px;
`;

export const UpComingWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	height: 120px;
`;

export const UpcomingEventLeft = styled.div`
	flex: 1;
`;

export const Bar = styled.div`
	height: 100;
	background-color: #fff;
	width: 2px;
	animation: ${growingHeight} 1s cubic-bezier(0.165, 0.84, 0.44, 1);
`;
