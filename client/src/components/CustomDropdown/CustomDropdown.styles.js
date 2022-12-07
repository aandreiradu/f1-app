import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { keyframes, css } from 'styled-components';

const growingHeight = (from, to) => keyframes`
    from {
        height: ${from}px;
    }

    to {
        height: ${to}px;
    }
`;

export const CustomDropdownContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const CustomDropdownSearchWrapper = styled.div`
	/* background-color: tomato; */
	z-index: 3;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 0;
	border-bottom: 1px solid #1f1f1f;

	border-color: ${(props) => {
		// console.log('@@@ PROPS STYLED', props);
		if (props.isTouched && props.hasError) {
			// console.log('return red');
			return '#e10600';
		} else if (props.isTouched && !props.hasError) {
			// console.log('return green');
			return 'green';
		}
	}};
`;

export const CustomDropdownInput = styled.input`
	flex: 1;
	display: block;
	background-color: transparent;
	border: none;
	color: #1f1f1f;
	padding: 3px;
	outline: none;
	font-size: 16px;

	&:focus,
	&:active {
		outline: none;
	}

	&:disabled {
		cursor: not-allowed;
	}
`;

export const CustomDropdownIcon = styled(FontAwesomeIcon)`
	width: 24px;
`;

export const CustomDropdownResults = styled.ul`
	display: ${(props) => (props.isOpen ? 'flex' : 'none')};
	flex-direction: column;
	align-items: center;
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	background-color: #ccc;
	z-index: 3;
	max-height: 200px;
	overflow: hidden;
	overflow-y: auto;
	animation: ${(props) =>
		props.isOpen
			? css`
					${growingHeight(0, +props.resultsNo * 55)} .25s linear
			  `
			: ''};
`;

export const CustomDropdownResultItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 10px;
	cursor: pointer;
	width: 100%;
	border-bottom: 1px solid #1f1f1f;
	height: 55px;
	padding: 15px 5px;

	&:first-child {
		margin-top: 0;
	}

	&:last-child {
		margin-bottom: 0;
		border-bottom: none;
	}
`;

export const CustomDropdownResultItemLogo = styled.img`
	width: 30px;
	object-fit: cover;
	height: 100%;
`;

export const CustomDropdownResultItemName = styled.p`
	font-size: 15px;
	font-weight: 600;
	text-transform: uppercase;
`;
