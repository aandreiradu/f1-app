import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { keyframes } from 'styled-components';
import { EventResult } from '../Schedule/ScheduleItem.styles';

export const Show = keyframes`
    from {
        opacity: 0;
        transform: scale(0);
    }
    
    to{
        opacity: 1;
        transform: scale(1);
    }
`;

export const Hide = keyframes`
    from {
        opacity: 1;
        transform: scale(1);
    }
    
    to{
        opacity: 0;
        transform: scale(0);
    }
`;

export const AddBetContainer = styled.section`
	position: absolute;
	top: -10px;
	left: 0px;
	width: 101%;
	height: 80vh;
	color: #fff;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	z-index: 3;
	background-color: #fff;
	color: #000;
	animation: ${(props) => (props.placeBet ? Show : Hide)} 0.25s linear;
`;

export const CloseBet = styled(FontAwesomeIcon)`
	/* width: 20px;
	height: 20px; */
	position: absolute;
	right: 10px;
	top: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;

	background-color: transparent;
	/* border-radius: 5px; */
	/* border: 1px solid red; */
	border: none;

	/* & svg { */
	width: 30px;
	height: 30px;
	/* } */
`;

export const BetResultWrapper = styled(EventResult)`
	margin: 50px 0;
`;

export const AddBetTitle = styled.h2`
	text-align: center;
	margin: 30px 15px 0px;
	font-weight: 600;
	text-transform: uppercase;
`;

export const BetEventInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #949498;
	margin: 25px 0;
	padding: 10px 20px;
`;

export const CircuitInfo = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
`;
export const BetRaceSeasonRound = styled.p`
	font-size: 14px;
	font-weight: 500;
	text-transform: uppercase;
	padding: 5px 0;
`;

export const BetRaceName = styled.p`
	font-size: 14px;
	font-weight: 600;
	text-transform: uppercase;
	padding: 5px 0;
`;

export const BetRaceDate = styled.p`
	font-size: 14px;
	font-weight: 600;
	text-transform: uppercase;
	padding: 5px 0;
`;

export const CircuitLayout = styled.img`
	width: 80px;
	height: 100px;
	object-fit: contain;
	width: 40%;
`;
