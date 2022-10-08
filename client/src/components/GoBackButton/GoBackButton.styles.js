import styled, { keyframes, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const fadeIn = keyframes`
    0%{
        transform: scale(0);
        opacity: 0;
    }

    100%{
        transform: scale(1);
        opacity: 1;
    }
`;

export const GoBackContainer = styled.div`
	position: fixed;
	top: 94vh;
	left: 5%;
	background: #e10600;
	display: flex;
	align-content: center;
	justify-content: center;
	padding: 8px 6px;
	border-radius: 5px;
	animation: ${(props) => props.isVisible && css`.25s ${fadeIn} linear`};
	z-index: 10;
`;

export const GoBackArrow = styled(FontAwesomeIcon)`
	width: 20px;
	height: 20px;
	color: #fff;
	cursor: pointer;
`;
