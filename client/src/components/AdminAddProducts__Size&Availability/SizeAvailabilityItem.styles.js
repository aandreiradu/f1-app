import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const SAIContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

export const SAIGroup = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #1f1f1f;
	margin: 10px 0;
	height: 40px;
	border-radius: 10px;
`;

export const SAILeftSide = styled.div`
	color: #fff;
	flex: 0.65;
	/* padding: 2.5px 5px; */
`;

export const SAIMiddleBar = styled.div`
	width: 2px;
	height: 100%;
	color: #1f1f1f;
	background-color: #1f1f1f;
`;

export const SAIRightSide = styled.div`
	color: #fff;
	flex: 1;
	/* padding: 2.5px 5px; */
`;

export const SAISelect = styled.select`
	background-color: transparent;
	/* border: 1px solid #1f1f1f; */
	border: none;
	border-radius: 5px;
	color: #1f1f1f;
	height: 40px;
	cursor: pointer;
	-webkit-appearance: none;
	-moz-appearance: none;
	text-indent: 1px;
	text-overflow: '';
	padding: 0 8px;

	&:active,
	&:focus {
		outline: none;
	}
`;

export const SAISelectOption = styled.option`
	cursor: pointer;
`;

export const SAIInput = styled.input`
	background-color: transparent;
	/* margin: 10px 0; */
	width: 100%;
	border: none;
	/* border: 1px solid #1f1f1f; */
	border: none;
	border-radius: 5px;
	color: #1f1f1f;
	height: 40px;
	cursor: pointer;
	padding: 5px 8px;
	font-size: 16px;

	&:active,
	&:focus {
		outline: none;
	}
`;

export const SAIAddActionBtn = styled(FontAwesomeIcon)`
	cursor: pointer;
	width: 15px;
	height: 20px;
	background-color: #1f1f1f;
	color: #fff;
	border-radius: 50%;
	padding: 5px 6px;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
`;
