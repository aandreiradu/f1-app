import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CheckoutSuccessContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px 30px;
	color: #1f1f1f;
`;

export const CheckoutSuccessTitle = styled.h2`
	font-size: 1.3rem;
	font-weight: 600;
`;

export const BagIcon = styled(FontAwesomeIcon)`
	width: 40px;
	height: 60px;
`;

export const CustomerDetails = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px 0;

	& h2 {
		position: relative;
		font-size: 20px;
		font-weight: 650;
		text-transform: capitalize;
		text-align: center;
	}

	& p {
		font-size: 16px;
		text-align: center;
	}
`;

export const OrderDetails = styled.div`
	width: 100%;
	padding: 10px 0;
	border-top: 1px solid #ccc;
	/* border-bottom: 1px solid #ccc; */

	display: flex;
	flex-direction: column;
`;

export const OrderDetailsRow = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 5px;
`;

export const OrderDetailsTitle = styled.span`
	font-size: 16px;
	font-weight: 500;
	color: #5e5a5a;
`;

export const OrderDetailsPrice = styled.span`
	font-size: 16px;
	font-weight: 500;
	color: #1f1f1f;
	font-weight: bold;
`;

export const SeparationLine = styled.span`
	width: 100%;
	height: 1px;
	background-color: #ccc;
	margin: 5px 0;
`;

export const CheckoutSucessActionButton = styled(Link)`
	cursor: pointer;
	text-align: center;
	width: 100%;
	padding: 10px;
	background-color: #e10600;
	color: #fff;
	border: none;
	border-radius: 10px;
	margin: 20px 0;
	outline: none;
	font-size: 16px;
	font-weight: 600;

	&:disabled {
		cursor: not-allowed;
		background-color: #5e5a5a;
		color: #1f1f1f;
	}

	&:active,
	&:focus {
		outline: none;
	}
`;
