import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosInterceptors from '../../../hooks/useHttpInterceptors';
import { StoreGlobalSettings } from '../Shop.styles';
import {
	FavoriteItem,
	FavoriteItemImage,
	ShopFavoritesContainer,
	FavoriteItemDetails,
	FavoriteItemDescription,
	FavoriteItemRemove,
	ShopFavoritesTitle,
	ShopFavoritesItemsContainer,
	FavoriteItemTitle,
	NoFavoritesFallback,
	NoFavoritesFallbackText
} from './Shop__FavoriteItems.styles';
import { fetchShopFavoritesDetailsSuccess } from '../../../store/Store__UserProducts/store__userProducts.actions';
import { selectFavoriteItemsDetails } from '../../../store/Store__UserProducts/store__userProducts.selector';
import { updateFavItemsCount } from '../../../store/Auth/auth.actions';
import apiConfig from '../../../constants/apiConfig';
import { faX } from '@fortawesome/free-solid-svg-icons';
import LoaderIcon from '../../../components/LoaderReusable/LoaderIcon';
import ErrorModal from '../../../components/UI/ErrorModal';
import { useCallback } from 'react';

const ShopFavoriteItems = () => {
	const [errorModal, setErrorModal] = useState({
		show: false,
		errorMessage: null
	});
	const dispatch = useDispatch();
	const { favoriteStoreItemsDetails } = useSelector(selectFavoriteItemsDetails);
	console.log('favoriteStoreItemsDetails', favoriteStoreItemsDetails);
	const { sendRequest, error, isLoading } = useAxiosInterceptors();

	useEffect(() => {
		if (error) {
			console.error('@@ error ShopFavoriteItems', error);
			setErrorModal({
				show: true,
				errorMessage: error?.message || 'Something went wrong, please try again later!'
			});
		}
	}, [error]);

	useEffect(() => {
		let isMounted = true;
		const contorller = new AbortController();

		sendRequest(
			{
				url: '/shop/getFavoritesDetails',
				withCredentials: true,
				contorller: contorller.signal,
				method: 'GET'
			},
			(responseData) => {
				console.log('@@@responseData /shop/getFavoritesDetails', responseData);
				const { message, status, products } = responseData;

				if (message === 'Fetched favorite products successfully' && status === 200) {
					console.log('dispatch into redux store', products);
					isMounted && dispatch(fetchShopFavoritesDetailsSuccess(products));
				}
			}
		);
		return () => {
			contorller.abort();
			isMounted = false;
		};
	}, []);

	const removeFromFavHandler = (productId) => {
		const contorller = new AbortController();
		console.log('remove this product from store', productId);
		sendRequest(
			{
				url: '/shop/removeFromFavorites',
				withCredentials: true,
				contorller: contorller.signal,
				method: 'POST',
				body: {
					productId
				}
			},
			(responseData) => {
				console.log('@@@responseData /shop/removeFromFavorites', responseData);
				const { message, status, favoriteProducts } = responseData;

				if (message === 'Product removed from favorites' && status === 200) {
					console.log('dispatch into redux store', favoriteProducts);
					dispatch(fetchShopFavoritesDetailsSuccess(favoriteProducts));
					dispatch(updateFavItemsCount(favoriteProducts?.length));
				}
			}
		);
	};

	const confirmErrorModal = useCallback(() => {
		setErrorModal({
			show: false,
			errorMessage: null
		});
	}, []);

	return (
		<>
			<StoreGlobalSettings />
			<ShopFavoritesContainer>
				<ShopFavoritesTitle>List Of Favorites Products</ShopFavoritesTitle>

				{/* Error Modal */}
				{errorModal?.show && (
					<ErrorModal
						title="Ooops!"
						message={errorModal.errorMessage}
						onConfirm={confirmErrorModal}
					/>
				)}

				{isLoading ? (
					<LoaderIcon
						text="Loading your favorite products"
						textColor={'#1f1f1f'}
						barsColor={'#1f1f1f'}
					/>
				) : favoriteStoreItemsDetails?.length === 0 ? (
					<NoFavoritesFallback>
						<NoFavoritesFallbackText>
							Looks like you don't have any favorite products ☹️
						</NoFavoritesFallbackText>
					</NoFavoritesFallback>
				) : (
					<ShopFavoritesItemsContainer>
						{favoriteStoreItemsDetails?.map((item) => (
							<FavoriteItem key={item?.product._id}>
								<FavoriteItemRemove
									icon={faX}
									onClick={removeFromFavHandler.bind(this, item?.product._id)}
								/>
								<FavoriteItemImage
									src={
										item?.product?.imageUrl ? `${apiConfig.baseURL}/${item?.product?.imageUrl}` : ''
									}
								/>
								<FavoriteItemDetails>
									<FavoriteItemTitle>{item?.product?.title}</FavoriteItemTitle>
									<FavoriteItemDescription>{item?.product?.price}€</FavoriteItemDescription>
								</FavoriteItemDetails>
							</FavoriteItem>
						))}
					</ShopFavoritesItemsContainer>
				)}
			</ShopFavoritesContainer>
		</>
	);
};

export default ShopFavoriteItems;
