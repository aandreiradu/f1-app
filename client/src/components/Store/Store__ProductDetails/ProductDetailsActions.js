import { useEffect, useState } from 'react';
import { faHeart as FullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as EmptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
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
import ErrorModal from '../../UI/ErrorModal';
import { updateFavItemsCount } from '../../../store/Auth/auth.actions';
import { shopUserAddToCart } from '../../../store/Store__UserProducts/store__userProducts.actions';
import { updateCartItemsCount } from '../../../store/Auth/auth.actions';

const ProductDetailsActions = ({ product, isSizeSelected, productsAvailable, hasSize }) => {
	const [showModal, setShowModal] = useState({
		show: false,
		message: null
	});
	const dispatch = useDispatch();
	const isFavProduct = useSelector(selectFavItemById.call(this, product?.id));
	console.log('isFavProduct', isFavProduct);
	const [hasError, setHasError] = useState(null);
	const { sendRequest, error: errorAxios, isLoading: isLoadingAxios } = useAxiosInterceptors();

	useEffect(() => {
		console.error('errorAxios', errorAxios);
		if (errorAxios) {
			setShowModal({
				show: true,
				message: errorAxios?.message || 'Unexpected error occured'
			});
		}
	}, [errorAxios]);

	const confirmCloseModal = () =>
		setShowModal({
			show: false,
			message: null
		});

	useEffect(() => {
		console.log('isSizeSelected effect', isSizeSelected);
		console.log('hasError is', hasError);
		if (isSizeSelected && hasError?.hasError && hasError?.errorMessage) {
			console.log('a setat pe null');
			setHasError(null);
		}
	}, [isSizeSelected]);

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
							dispatch(updateFavItemsCount(favoriteProducts?.length));
							break;
						}

						case 'Added': {
							console.log('@@added case ', responseData);
							console.log('new redux store will be', responseData?.favoriteProducts);
							dispatch(shopUserAddToFavorites(responseData?.favoriteProducts));
							dispatch(updateFavItemsCount(responseData?.favoriteProducts.length));
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
		console.log('item', item);
		console.log('@@@isSizeSelected', isSizeSelected);
		if (!item?.hasSize) {
			console.log('Products with no size, like figurines, monoposts etc', item);
			if (hasError?.hasError) {
				setHasError({
					hasError: false,
					errorMessage: ''
				});
			}
			console.log('Add to cart figurines next');
		} else {
			if (!isSizeSelected) {
				console.error(
					'Product with hasSize property = true, but without size selected',
					product,
					isSizeSelected
				);
				setHasError({
					hasError: true,
					errorMessage: 'Please select a size'
				});
			} else {
				setHasError({
					hasError: false,
					errorMessage: ''
				});

				console.log(
					'Product with hasSize property = true, and with size selected',
					isSizeSelected,
					'add to cart this product',
					item
				);

				try {
					const controller = new AbortController();
					sendRequest(
						{
							url: `/shop/addToCart`,
							method: 'POST',
							withCredentials: true,
							controller: controller.signal,
							body: {
								productId: item?.id,
								size: isSizeSelected
							}
						},
						(responseData) => {
							console.log('@@response addToCartHandler', responseData);
							const { message, status, cart, cartItemsCount } = responseData;

							if (status === 200 && message === 'product added to cart') {
								console.log('all good, product added to cart => close size selection');
								dispatch(shopUserAddToCart(cart));
								dispatch(updateCartItemsCount(cartItemsCount));
							}
						}
					);
				} catch (error) {
					console.log('error addToCartHandler', error);
				}
			}
		}
	};

	return (
		<>
			{hasError?.hasError && <ErrorMessage>{hasError?.errorMessage}</ErrorMessage>}
			{showModal?.show && (
				<ErrorModal title="Ooops!" message={showModal.message} onConfirm={confirmCloseModal} />
			)}
			<ProductDetailsActionsContainer>
				{console.log('disabled passed to heart comp', isLoadingAxios)}
				<ProductDetailsActionsAddToFavorite
					color={isFavProduct ? 'red' : '#1f1f1f'}
					icon={isFavProduct ? FullHeart : EmptyHeart}
					onClick={handleAddProdToFav.bind(this, product, isSizeSelected)}
					disabled={isLoadingAxios}
				/>
				<ProductDetailsActionsAddToCartBtn
					disabled={isLoadingAxios || (!productsAvailable && hasSize) || errorAxios}
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
