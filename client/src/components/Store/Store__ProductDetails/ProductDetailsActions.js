import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavoriteItems } from '../../../store/Store__UserProducts/store__userProducts.selector';
import {
	ProductDetailsActionsContainer,
	ProductDetailsActionsAddToFavorite,
	ProductDetailsActionsAddToCartBtn,
	ProductDetailsActionsAddToCartBtnIcon,
	ErrorMessage
} from './ProductDetailsActions.styles';
import {
	fetchShopFavoritesStart,
	shopUserAddToFavorites,
	shopUserAddToFavoritesFailure
} from '../../../store/Store__UserProducts/store__userProducts.actions';
import useAxiosInterceptors from '../../../hooks/useHttpInterceptors';

const ProductDetailsActions = ({ product, isSizeSelected }) => {
	console.log('Actions received this product', product);
	const [hasError, setHasError] = useState(null);
	const {
		sendRequest,
		responseData,
		error: errorAxios,
		isLoading: isLoadingAxios
	} = useAxiosInterceptors();
	const dispatch = useDispatch();
	const favoriteProductsSelector = useSelector(selectFavoriteItems);
	console.log('favoriteProductsSelector', favoriteProductsSelector);
	const { favoriteStoreItems, isLoading, error } = favoriteProductsSelector;

	console.log('@@@isSizeSelected', isSizeSelected);
	/* 
		TODO : disable addToCart button if no product are available, regardless of size
	*/

	const handleAddProdToFav = (product) => {
		try {
			const isAlreadyFav = favoriteStoreItems?.find((item) => item?.id === product?.id);
			console.log('isAlreadyFav', isAlreadyFav);

			if (!isAlreadyFav) {
				dispatch(fetchShopFavoritesStart());
				console.log(
					'this product is not in fav redux store, dispatch and make request to backend',
					product
				);

				// send request to backend

				dispatch(shopUserAddToFavorites([...favoriteStoreItems, product]));
				// dispatch and update the store
			} else {
				dispatch(fetchShopFavoritesStart());
				console.log(
					'this product is already in favorites redux store, dispatch to remove it adn send request to backend'
				);

				console.log('@aradu favoriteStoreItems', favoriteStoreItems);
				const filteredFavProducts = favoriteStoreItems?.filter((item) => item?.id !== product?.id);
				console.log('filteredFavProducts', filteredFavProducts);
				dispatch(shopUserAddToFavorites(filteredFavProducts));
			}
		} catch (error) {
			console.log('ERROR handleAddProdToFav for product', product, error);
			dispatch(shopUserAddToFavoritesFailure(error));
		}
	};

	const addToCartHandler = (item) => {
		console.log('@@@isSizeSelected', isSizeSelected);
		// if (product?.hasSize && !isSizeSelected) {
		// 	console.log('a intrat aici si n-are marime selectata');
		// 	setHasError({
		// 		hasError: true,
		// 		errorMessage: 'Please select a size'
		// 	});
		// } else {
		// 	console.log('with no size', product);
		// 	console.log('are marime selectata');
		// 	setHasError({
		// 		hasError: false,
		// 		errorMessage: ''
		// 	});
		// }
		if (!product?.hasSize) {
			console.log('Products with no size, like figurines, monoposts etc', product);
			if (hasError?.hasError) {
				setHasError({
					hasError: false,
					errorMessage: ''
				});
			}
			console.log('Add to cart next');
		} else {
			if (!isSizeSelected) {
				console.log(
					'Product with hasSize property = true, but without size selected',
					product,
					isSizeSelected
				);
				setHasError({
					hasError: true,
					errorMessage: 'Please select a size'
				});
			} else {
				console.log(
					'Product with hasSize property = true, and with size selected',
					product,
					isSizeSelected,
					'add to cart'
				);
				setHasError({
					hasError: false,
					errorMessage: ''
				});
			}
		}
	};

	return (
		<>
			{hasError?.hasError && <ErrorMessage>{hasError?.errorMessage}</ErrorMessage>}
			<ProductDetailsActionsContainer>
				{console.log('disabled passed to heart comp', isLoading)}
				<ProductDetailsActionsAddToFavorite
					icon={faHeart}
					onClick={handleAddProdToFav.bind(this, product, isSizeSelected)}
					disabled={isLoading}
				/>
				<ProductDetailsActionsAddToCartBtn
					disabled={isLoading /*|| !isSizeSelected*/}
					onClick={addToCartHandler}
				>
					<ProductDetailsActionsAddToCartBtnIcon icon={faCartPlus} />
					Add To Cart
				</ProductDetailsActionsAddToCartBtn>
			</ProductDetailsActionsContainer>
		</>
	);
};

export default ProductDetailsActions;
