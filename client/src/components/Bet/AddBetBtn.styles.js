import styled from 'styled-components';

export const AddBetButtonContainer = styled.div`
	display: grid;
	align-content: center;
	justify-content: center;
`;

export const BetButton = styled.button`
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

	&:active,
	&:focus {
		outline: none;
	}

	&:disabled {
		background-color: #ccc;
		color: #fff;
	}
`;
