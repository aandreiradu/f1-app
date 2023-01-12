import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const CartItemContainer = styled.div`
	width: 100%;
	height: 90px;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 12px;
	padding: 10px 20px 10px 10px;
	/* box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12),
		0px 1px 5px 0px rgba(0, 0, 0, 0.2); */
`;

export const CartItemProdImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
	flex: 0.5;
`;

export const CartItemProdDetails = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	font-size: 15px;
	text-align: right;
	position: relative;
`;

export const CartItemActions = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-between;
	flex: 0.5;

	& > span {
		background-color: #fff;
		color: #fff;
		width: 20px;
		text-align: center;
		border-radius: 50%;
		font-size: 18px;
		/* padding: 0 10px; */
		cursor: pointer;
	}

	& > span:nth-child(2) {
		background-color: transparent;
		color: #1f1f1f;
	}
	& > span:nth-child(1) {
		background-color: #1f1f1f;
	}
	& > span:nth-child(3) {
		background-color: #e10600;
	}
`;

export const CartItemActionIcon = styled(FontAwesomeIcon)`
	width: 16px;
	height: 14px;
	cursor: pointer;
	background-color: #1f1f1f;
	padding: 2px;
	border-radius: 4px;
	color: #fff;
`;
