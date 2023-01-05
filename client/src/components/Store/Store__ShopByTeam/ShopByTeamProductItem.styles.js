import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { keyframes, css } from 'styled-components';

export const growingHeight = keyframes`
    0%{
        height: 0;
    }

    100%{
        height: 150px;
    }
`;

export const ShopByTeamProductItemWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const SBTProductItem = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	padding: 1rem 0;
	border-bottom: 1px solid #1f1f1f;
`;

export const SBTProductImageWrapper = styled.div`
	display: flex;
	flex: 1;
	align-items: flex-start;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

export const SBTProductImage = styled.img`
	flex: 1;
	width: 100%;
	height: 250px;
	object-fit: cover;
`;

export const SBTProductInfo = styled.div`
	position: relative;
	flex: 1;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	text-align: left;
	gap: 10px;
`;

export const SBTProductPrice = styled.p`
	font-weight: 600;
	color: red;
	font-size: 1.1rem;
	line-height: 1.2;
	text-align: left;
	width: 100%;
`;

export const SBTProductTitle = styled.h2`
	font-weight: 400;
	color: #1f1f1f;
	font-size: 14px;
	line-height: 1.2;
	/* margin-bottom: 5px; */
`;

export const SBTProductDescription = styled.p`
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 13px;
	white-space: normal;
	color: #1f1f1f;
	/* max-height: 150px; */
	overflow-y: auto;
`;

export const SBTDescriptionContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid #d5d5d5;
	max-height: 200px;
	overflow: hidden;
	overflow-y: auto;
	animation: ${(props) =>
		props.isOpen
			? css`
					${growingHeight} .25s ease-in;
			  `
			: ''};
`;

export const SBTDescriptionContent = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const SBTDescriptionIcon = styled(FontAwesomeIcon)`
	width: 30px;
`;

export const AddToCartButton = styled.button`
	width: 150px;
	margin: 0 auto;
	padding: 5px;
	border: 1px solid #d5d5d5;
	border-radius: 5px;
	background: transparent;
	text-align: center;
	cursor: pointer;

	&:disabled {
		pointer-events: none;
		background-color: #ccc;
		color: #1f1f1f;
		cursor: not-allowed;
	}

	&:hover,
	&:focus,
	&:active {
		outline: none;
		border: 1px solid #e10600;
		background-color: #e10600;
		color: #fff;
		transition: all 0.25 cubic-bezier(0.165, 0.84, 0.44, 1);
	}
`;

export const BottomAddToCart = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: flex-end;
`;
