import {
	StoreItemContainer,
	StoreItemImageWrapper,
	StoreItemImage,
	StoreItemTitle,
	StoreItemInformationWrapper,
	StoreItemPrice,
	StoreItemAddToFavorite
} from './StoreItem.styles';
import apiConfig from '../../../constants/apiConfig';
import { faHeart as FullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as EmptyHeart } from '@fortawesome/free-regular-svg-icons';

const StoreItem = ({ productId, description, imageUrl, title, price, details, isFavorite }) => {
	const addToFavorite = (e) => {
		console.log('todo: add to favorite');
	};

	return (
		<StoreItemContainer>
			<StoreItemAddToFavorite
				color={isFavorite ? 'red' : '#1f1f1f'}
				icon={isFavorite ? FullHeart : EmptyHeart}
				onClick={addToFavorite}
			/>
			<StoreItemImageWrapper to={`/shop/product/${productId}`}>
				<StoreItemImage
					src={imageUrl ? `${apiConfig.baseURL}/${imageUrl}` : ''}
					alt="Product Image"
				/>
			</StoreItemImageWrapper>
			<StoreItemInformationWrapper to={`/shop/product/${productId}`}>
				<StoreItemTitle>{title}</StoreItemTitle>
				<StoreItemPrice>{Number(price).toFixed(2)}€</StoreItemPrice>
			</StoreItemInformationWrapper>
		</StoreItemContainer>
	);
};

export default StoreItem;
