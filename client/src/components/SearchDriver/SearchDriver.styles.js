import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SearchDriverContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
	border-radius: 5px;
	/* border: 1px solid #e10600; */
	border: 1px solid #fff;
`;

export const SearchDriverInput = styled.input`
	border: none;
	outline: none;
	padding: 0 0.5rem;
	height: 35px;
	font-size: 16px;
	background: transparent;
	color: #fff;
	flex: 1;
	&::placeholder {
		color: #fff;
	}
`;

export const SearchDriverIcon = styled(FontAwesomeIcon)`
	color: #fff;
	outline: none;
	width: 50px;
	height: 20px;
`;
