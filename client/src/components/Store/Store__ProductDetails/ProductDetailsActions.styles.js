import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ProductDetailsActionsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
`;

export const ProductDetailsActionsAddToFavorite = styled(FontAwesomeIcon)`
	width: 20px;
	height: 30px;
	background: #ccc;
	padding: 10px 20px;
	border-radius: 20px;
	cursor: pointer;

	${(props) => {
		console.log('props', props.disabled);
		props.disabled &&
			css`
				cursor: not-allowed;
				pointer-events: none;
				background-color: green;
				color: #1f1f1f;
			`;
	}}
`;

export const ProductDetailsActionsAddToCartBtn = styled.button`
	border: none;
	font-size: 16px;
	font-weight: 700;
	cursor: pointer;
	color: #fff;
	background-color: #e10600;

	padding: 10px 20px;
	border-radius: 20px;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	flex: 1;

	outline: none;

	&:active,
	&:focus {
		outline: none;
	}

	&:disabled {
		cursor: not-allowed;
		/* background: #232526;
		background: -webkit-linear-gradient(to right, #414345, #232526);
		background: linear-gradient(to right, #414345, #232526); */
		background-color: #ccc;
		color: #1f1f1f;
		transition: background-color 0.5s ease;
	}
`;

export const ProductDetailsActionsAddToCartBtnIcon = styled(FontAwesomeIcon)`
	width: 20px;
	height: 30px;
	/* cursor: pointer; */
`;

export const ErrorMessage = styled.span`
	margin-bottom: 7.5px;
	font-size: 14px;
	text-align: right;
	width: 100%;
	color: #1f1f1f;
`;
