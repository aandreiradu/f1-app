import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const ShopFavoritesTitle = styled.h2`
	position: relative;
	font-size: 18px;
	font-weight: 600;
	text-transform: capitalize;
	line-height: 1.2;
	margin-bottom: 20px;
	text-align: center;
	padding: 5px 0;

	::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 150px;
		height: 1px;
		background-color: red;
		margin: 0 auto;
		transform: translate(-50%, 0%);
	}
`;

export const ShopFavoritesContainer = styled.div`
	width: 100%;
	padding: 0 20px;
`;

export const ShopFavoritesItemsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 20px;
	/* padding: 20px; */
`;

export const FavoriteItem = styled.div`
	width: 100%;
	height: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

export const FavoriteItemImage = styled.img`
	width: 100%;
	height: 200px;
	object-fit: cover;
`;

export const FavoriteItemDetails = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const FavoriteItemTitle = styled.h2`
	font-size: 13px;
	line-height: 1.1;
	font-weight: 500;
	margin: 5px 0;
`;

export const FavoriteItemDescription = styled.p`
	font-size: 12px;
	line-height: 1.1;
	font-weight: 300;
	margin: 5px 0;
`;

export const FavoriteItemRemove = styled(FontAwesomeIcon)`
	width: 15px;
	height: 15px;
	position: absolute;
	top: 10px;
	right: 10px;
`;

export const NoFavoritesFallback = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 40vh;
	text-align: center;
`;

export const NoFavoritesFallbackText = styled.h2`
	font-size: 18px;
	font-weight: 600;
	line-height: 1.1;
`;
