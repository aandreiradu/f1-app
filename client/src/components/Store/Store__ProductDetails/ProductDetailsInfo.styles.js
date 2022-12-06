import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css, keyframes } from 'styled-components';

const sizeSelectionAnimation = keyframes`
	from {
		/* padding: 0; */
		transform: scale(0);
	}

	to {
		/* padding: 2px 10px; */
		transform: scale(1);
	}
`;

export const ProductDetailsInfoContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin-bottom: 20px;
`;

export const LicensedGearContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 10px;

	& img {
		width: 35px;
		height: 25px;
		object-fit: contain;
	}

	& p {
		color: #242424;
		line-height: 1.5;
		font-size: 14px;
		font-weight: 400;
		text-transform: capitalize;
	}
`;

export const ProductDetailsInfoTitlePrice = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`;

export const ProductDetailsInfoTitle = styled.h2`
	font-size: 16px;
	font-weight: bold;
	line-height: 1.1;
	color: #1f1f1f;
	max-width: 55%;
`;

export const ProductDetailsInfoPrice = styled.span`
	font-size: 20px;
	font-weight: 500;
`;

export const ProductDetailsInfoDescription = styled.p`
	margin-bottom: 10px;
	font-size: 14px;
	font-weight: 400;
	color: #242424;
	line-height: 1.5;
`;

export const ProductDetailsSizes = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	& > p {
		font-size: 16px;
		font-weight: bold;
		/* text-transform: uppercase; */
	}
`;

export const ProductDetailsSizeContainer = styled.div`
	/* background: tomato; */
	padding: 10px 5px 10px 2px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
`;

export const ProductDetailsSizeItem = styled.button`
	position: relative;
	border: none;
	background: transparent;
	font-size: 16px;
	font-weight: bold;
	padding: 2px 10px;
	cursor: pointer;

	${(props) =>
		props.isSelected &&
		css`
			background-color: #e10600;
			color: #fff;
			border-radius: 50%;
			animation: ${sizeSelectionAnimation} 0.15s linear;
		`}

	&:disabled {
		background-color: #ccc;
		color: #fff;
		cursor: not-allowed;
		border-radius: 50%;
	}

	&:disabled::before {
		content: '';
		position: absolute;
		width: 90%;
		height: 2px;
		transform: rotate(45deg);
		transform-origin: 0% 0%;
		background-color: tomato;
	}
`;
