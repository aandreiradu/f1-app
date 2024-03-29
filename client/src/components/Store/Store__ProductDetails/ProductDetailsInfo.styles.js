import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css, keyframes } from 'styled-components';

export const sizeSelectionAnimation = keyframes`
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
	margin-bottom: auto;
`;

export const ProductDetailsInfoDescription = styled.p`
	margin-bottom: 10px;
	font-size: 14px;
	font-weight: 400;
	color: #242424;
	line-height: 1.5;
	max-height: 75px;
	overflow: hidden;
	overflow-y: auto;
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
	color: #1f1f1f;

	${(props) =>
		props.isSelected &&
		css`
			background-color: #e10600;
			color: #fff;
			border-radius: 90px;
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
		width: 100%;
		height: 2px;
		transform: rotate(45deg);
		transform-origin: 0% 0%;
		transform-origin: -4% 0%;
		background-color: red;
		top: 2px;
		left: 23%;
	}

	&:hover {
		background-color: #e10600;
		color: #fff;
		transition: all 0.15s ease-in;
	}
`;

export const OutOfStock = styled.span`
	position: relative;
	color: #1f1f1f;
	width: 100%;
	text-align: center;
	font-size: 16px;
	text-transform: uppercase;
	font-weight: 700;

	&::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 60px;
		height: 1px;
		background-color: red;
		transform: translate(-50%, -50%);
	}
`;

export const RiskStock = styled.span`
	font-size: 15px;
	font-weight: 600;
	text-align: right;
	animation: ${sizeSelectionAnimation} 0.25s ease;
`;
