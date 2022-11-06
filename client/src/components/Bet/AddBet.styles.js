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
	display: flex;
	flex-direction: column;
	position: absolute;
	top: -10px;
	left: 0px;
	width: 101%;
	min-height: 60vh;
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
	margin: 10px 0;
	padding: 0 10px;
	/* align-items: unset; */
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

export const PlaceBetBtnContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: auto;
	margin-bottom: 40px;
`;
export const PlaceBetBtn = styled.button`
	width: 250px;
	margin: 0;
	border: none;
	padding: 5px 0;
	color: #fff;
	text-transform: uppercase;
	font-size: 14px;
	background-color: #e10600;
	border-radius: 10px;
	cursor: pointer;
	font-weight: 600;
	transition: background-color, color 0.5s linear;

	&:disabled {
		background-color: #ccc;
		color: #000;
	}
`;

export const DeleteBetSelection = styled.span`
	position: absolute;
	top: -15px;
	right: -1px;
	z-index: 1;
	background: #e10600;
	padding: 5px 10px;
	color: #fff;
	font-size: 1rem;
	padding: 2px 10px;
	border-radius: 10px;
	cursor: pointer;
`;

export const GenerateBetContainer = styled.div``;
