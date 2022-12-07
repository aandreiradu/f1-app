import styled from 'styled-components';
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
`;

export const ProductDetailsActionsAddToCartBtn = styled.button`
	border: none;
	font-size: 16px;
	font-weight: 700;
	cursor: pointer;
	color: #fff;
	background: #232526; /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #414345, #232526); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to right,
		#414345,
		#232526
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

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
`;

export const ProductDetailsActionsAddToCartBtnIcon = styled(FontAwesomeIcon)`
	width: 20px;
	height: 30px;
	/* cursor: pointer; */
`;
