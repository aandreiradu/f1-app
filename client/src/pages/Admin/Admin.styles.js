import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AdminWrapper = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	gap: 20px;
`;

export const AdminAction = styled(Link)`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #1f1f1f;
	border-right: 1px solid #1f1f1f;
	padding: 10px 5px;
	border-radius: 5px;
	cursor: pointer;
`;

export const AdminActionName = styled.p`
	font-size: 18px;
	font-weight: 600;
	text-transform: uppercase;
	line-height: 1.2;
`;

export const AdminActionIcon = styled(FontAwesomeIcon)`
	width: 40px;
	height: 30px;
`;
