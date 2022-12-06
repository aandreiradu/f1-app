import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import {
	ProductDetailsActionsContainer,
	ProductDetailsActionsAddToFavorite,
	ProductDetailsActionsAddToCartBtn,
	ProductDetailsActionsAddToCartBtnIcon
} from './ProductDetailsActions.styles';

const ProductDetailsActions = () => {
	/* 
		TODO : disable addToCart button if no product are available, regardless of size
	*/

	return (
		<ProductDetailsActionsContainer>
			<ProductDetailsActionsAddToFavorite icon={faHeart} />
			<ProductDetailsActionsAddToCartBtn>
				<ProductDetailsActionsAddToCartBtnIcon icon={faCartPlus} />
				Add To Cart
			</ProductDetailsActionsAddToCartBtn>
		</ProductDetailsActionsContainer>
	);
};

export default ProductDetailsActions;
