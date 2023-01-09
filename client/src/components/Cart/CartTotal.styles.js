import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const CartTotalContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 120px;
	background-color: #fff;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding: 20px 30px;
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
`;

export const CartTotalPriceContainer = styled.div`
	position: relative;
	display: flex;
	flex: 1;
	align-items: center;
`;

export const CartTotalPrice = styled.p`
	font-size: 25px;
	font-weight: 700;
	margin-left: 10px;
`;

export const CartTotalCurrency = styled.span`
	font-size: 15px;
	position: absolute;
	top: 0;
	left: 0;
	font-weight: 700;
`;

export const CartCheckoutButton = styled.button`
	cursor: pointer;
	border-radius: 10px;
	font-size: 17px;
	font-weight: 600;
	width: 150px;
	background-color: #1f1f1f;
	color: #fff;
	padding: 7px 5px;

	border: none;
	outline: none;

	&:focus,
	&:active {
		outline: none;
	}

	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
		transition: background-color 0.3s ease-in-out;
	}
`;

export const CheckoutIcon = styled(FontAwesomeIcon)`
	width: 30px;
`;
