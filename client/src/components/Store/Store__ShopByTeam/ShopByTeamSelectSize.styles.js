import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { keyframes } from 'styled-components';

const OpenIn = keyframes`
	0% {
		height: 0;
	}

	100% {
		height: 375px;
	}
`;
const CloseIn = keyframes`
	0% {
		height: 375px;
	}

	100% {
		height: 0px;
	}
`;

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 10;
	background-color: rgba(0, 0, 0, 0.5);
`;

export const SBTSelectSizeContainer = styled.div`
	z-index: 11;
	width: 100%;
	height: 375px;
	background-color: #1f1f1f;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	position: fixed;
	bottom: 0px;
	left: 0px;
	right: 0px;
	overflow: hidden scroll;
	animation: ${(props) => (props.shouldClose ? CloseIn : OpenIn)} 0.25s linear;
`;

export const SBTCloseSelectSizeWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

export const SBTCloseSelectSize = styled(FontAwesomeIcon)`
	position: absolute;
	right: 10px;
	top: 10px;
	width: 30px;
	height: 20px;
	color: #fff;
	cursor: pointer;
`;

export const SBTTitle = styled.p`
	font-size: 16px;
	font-weight: 650;
	text-transform: uppercase;
	line-height: 1.2;
	text-align: center;
	color: #fff;
	margin: 20px 0;
`;

export const SBTSizeList = styled.ul`
	text-align: center;
	list-style: none;
	cursor: pointer;
`;

export const SBTSizeListItem = styled.li`
	color: #fff;
	font-size: 18px;
	line-height: 1.2;
	text-transform: uppercase;
	padding: 20px 0;

	&:hover,
	&:active,
	&:focus {
		background-color: #e10600;
		transition: all 0.25s ease-in;
	}
`;
