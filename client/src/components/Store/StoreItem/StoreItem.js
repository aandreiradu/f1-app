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
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const StoreItem = ({ productId, description, imageUrl, title, price, details }) => {
	const addToFavorite = (e) => {
		console.log('todo: add to favorite');
	};

	return (
		<StoreItemContainer to={`/shop/product/${productId}`} replace="true">
			<StoreItemAddToFavorite icon={faHeart} onClick={addToFavorite} />
			<StoreItemImageWrapper>
				<StoreItemImage
					src={imageUrl ? `${apiConfig.baseURL}/${imageUrl}` : ''}
					alt="Product Image"
				/>
			</StoreItemImageWrapper>
			<StoreItemInformationWrapper>
				<StoreItemTitle>{title}</StoreItemTitle>
				<StoreItemPrice>{Number(price).toFixed(2)}€</StoreItemPrice>
			</StoreItemInformationWrapper>
		</StoreItemContainer>
	);
};

export default StoreItem;
