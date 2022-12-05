import styled from 'styled-components';

export const PaginatorMain = styled.div``;

export const PaginatorControlsContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const PaginatorControlButton = styled.button`
	width: 5rem;
	padding: 0.25rem 0;
	margin: 0 1rem;
	border: 1px solid #1f1f1f;
	border-radius: 5px;
	background: transparent;
	font: inherit;
	cursor: pointer;
	font-size: 1rem;
	color: #1f1f1f;

	&:hover,
	&:active {
		color: #fff;
		background-color: #e10600;
		border-color: transparent;
		transition: all 0.25s ease-in;
	}

	&:focus {
		outline: none;
	}
`;
