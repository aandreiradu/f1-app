import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const StoreItemContainer = styled(Link)`
	position: relative;
	height: 300px;
	max-width: 200px;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	justify-content: flex-start;
	background: #fff;
`;

export const StoreItemImageWrapper = styled(Link)`
	height: 70%;
	width: 100%;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
`;

export const StoreItemImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
`;

export const StoreItemInformationWrapper = styled(Link)`
	padding: 10px;
	width: 100%;
`;

export const StoreItemTitle = styled.p`
	font-size: 14px;
	line-height: 1.2;
	text-align: left;
	color: #1f1f1f;
`;

export const StoreItemPrice = styled.p`
	font-weight: 700;
	font-size: 16px;
	text-transform: uppercase;
`;

export const StoreItemAddToFavorite = styled(FontAwesomeIcon)`
	width: 30px;
	height: 20px;
	position: absolute;
	right: 5px;
	top: 10px;
	cursor: pointer;
`;
