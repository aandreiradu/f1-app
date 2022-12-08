import styled from 'styled-components';

export const SAIContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SAILeftSide = styled.p`
	flex: 0.75;
	padding: 2.5px 5px;
	color: #1f1f1f;
`;

export const SAIMiddleBar = styled.div`
	width: 2px;
	height: 100%;
	background-color: #fff;
`;

export const SAIRightSide = styled.div`
	color: #fff;
	flex: 1;
	padding: 2.5px 5px;
`;

export const SAISelect = styled.select`
	border: 1px solid #1f1f1f;
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
	margin: 10px 0;
	width: 100%;
	border: none;
	border: 1px solid #1f1f1f;
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
