import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faKissWinkHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCart,
	selectFavoriteItems
} from '../../../store/Store__UserProducts/store__userProducts.selector';
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
import { selectFavItemById } from '../../../store/Store__UserProducts/store__userProducts.selector';

const ProductDetailsActions = ({ product, isSizeSelected }) => {
	const dispatch = useDispatch();
	const isFavProduct = useSelector(selectFavItemById.call(this, product?.id));
	console.log('isFavProduct', isFavProduct);
	const [hasError, setHasError] = useState(null);
	const { sendRequest, error: errorAxios, isLoading: isLoadingAxios } = useAxiosInterceptors();

	// console.log('@@@isSizeSelected', isSizeSelected);
	/* 
		TODO : disable addToCart button if no product are available, regardless of size
	*/

	const handleAddProdToFav = (product) => {
		try {
			dispatch(fetchShopFavoritesStart());
			console.log(
				'this product is not in fav redux store, dispatch and make request to backend',
				product
			);

			const controller = new AbortController();
			// send request to backend
			sendRequest(
				{
					url: '/shop/addToFavorites',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					withCredentials: true,
					controller: controller.signal,
					body: JSON.stringify({
						productId: product?.id
					})
				},
				(responseData) => {
					console.log('responseData', responseData);
					const { message, status, favoriteProducts } = responseData;

					switch (message) {
						case 'Removed': {
							console.log('@@removed case ', responseData);
							// dispatch and update the store
							console.log('new redux store will be', favoriteProducts);
							dispatch(shopUserAddToFavorites(favoriteProducts));
							break;
						}

						case 'Added': {
							console.log('@@added case ', responseData);
							console.log('new redux store will be', responseData?.favoriteProducts);
							dispatch(shopUserAddToFavorites(responseData?.favoriteProducts));
							break;
						}

						default:
							console.log(`Unhandled message for success status`, status, message);
							return;
					}
				}
			);
		} catch (error) {
			console.log('ERROR handleAddProdToFav for product', product, error);
			dispatch(shopUserAddToFavoritesFailure(error));
		}
	};

	const addToCartHandler = (item) => {
		console.log('@@@isSizeSelected', isSizeSelected);
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
					isSizeSelected,
					'add to cart this product',
					item
				);
				setHasError({
					hasError: false,
					errorMessage: ''
				});

				try {
				} catch (error) {}
			}
		}
	};

	return (
		<>
			{hasError?.hasError && <ErrorMessage>{hasError?.errorMessage}</ErrorMessage>}
			<ProductDetailsActionsContainer>
				{console.log('disabled passed to heart comp', isLoadingAxios)}
				<ProductDetailsActionsAddToFavorite
					icon={isFavProduct ? faKissWinkHeart : faHeart}
					onClick={handleAddProdToFav.bind(this, product, isSizeSelected)}
					disabled={isLoadingAxios}
				/>
				<ProductDetailsActionsAddToCartBtn
					disabled={isLoadingAxios /*|| !isSizeSelected*/}
					onClick={addToCartHandler.bind(this, product)}
				>
					<ProductDetailsActionsAddToCartBtnIcon icon={faCartPlus} />
					Add To Cart
				</ProductDetailsActionsAddToCartBtn>
			</ProductDetailsActionsContainer>
		</>
	);
};

export default ProductDetailsActions;
