import styled from 'styled-components';
import RolexBackground from '../../assets/upcoming events/RolexGoldWhite.png';

export const CounterMainWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 0 8px;
`;
export const CounterWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	overflow: hidden;
`;

export const CounterContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	/* padding: 0 10px; */
	color: #fff;
	margin-bottom: 5px;
`;

export const CounterItemType = styled.span`
	font-size: 10px;
	text-transform: uppercase;
`;

export const ConunterItemValue = styled.span`
	font-size: 1rem;
`;

export const CounterRolex = styled.div`
	background-position: center center;
	background-image: url(https://www.formula1.com/etc/designs/fom-website/images/RolexGoldWhite.png);
	background-size: 35%;
	background-repeat: no-repeat;
	width: 100%;
	height: calc(100% - 44px - 1.1rem);
	background-color: #006341;
	border-radius: 5px;
`;

export const EventTitle = styled.h3`
	font-size: 14px;
	text-align: center;
	line-height: 1;
	margin-bottom: 5px;
	text-transform: uppercase;
`;
