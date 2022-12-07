import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StoreFilterIcon = styled(FontAwesomeIcon)`
	width: 24px;
	cursor: pointer;
`;

export const StoreSearchFilterContainer = styled.div`
	margin: 20px 0;
	display: flex;
	align-items: center;
	gap: 10px;
`;

export const StoreSearchConatainer = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 5px;
	border-radius: 10px;
	background: #fff;
	flex: 4;
	height: 50px;
`;

export const StoreSearchInput = styled.input`
	flex: 1;
	background: transparent;
	border: none;
	outline: none;
	font-size: 16px;
	color: #1f1f1f;
	font-weight: 600;
	cursor: pointer;

	&:active,
	&:focus {
		outline: none;
	}
`;

export const StoreSearchInputIcon = styled(FontAwesomeIcon)`
	width: 24px;
	padding: 0 5px;
`;

export const StoreFilterContainer = styled.div`
	/* flex: 2; */
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
	border-radius: 10px;
	height: 50px;
	background: #fff;
	cursor: pointer;
`;
