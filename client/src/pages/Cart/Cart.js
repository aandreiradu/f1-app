import { useEffect, useState } from 'react';
import CartItem from '../../components/Cart/CartItem';
import useAxiosInterceptors from '../../hooks/useHttpInterceptors';
import { StoreGlobalSettings } from '../Shop/Shop.styles';
import {
	NoFavoritesFallback,
	NoFavoritesFallbackText,
	ShopFavoritesContainer,
	ShopFavoritesTitle
} from '../Shop/Shop__FavoriteItems/Shop__FavoriteItems.styles';
import { CartItemsWrapper } from './Cart.styles';
import {
	fetchShopCartDetailsStart,
	fetchShopCartDeatilsSuccess,
	fetchShopCartDetailsFailure
} from '../../store/Store__UserProducts/store__userProducts.actions';
import { useDispatch, useSelector } from 'react-redux';
import LoaderIcon from '../../components/LoaderReusable/LoaderIcon';
import { selectCartItemsDetails } from '../../store/Store__UserProducts/store__userProducts.selector';
import CartTotal from '../../components/Cart/CartTotal';

const Cart = () => {
	const dispatch = useDispatch();
	const { cartItemsDetails, cartTotal } = useSelector(selectCartItemsDetails);
	const { sendRequest, error, isLoading } = useAxiosInterceptors();

	console.log('cartItemsDetails', cartItemsDetails);

	useEffect(() => {
		dispatch(fetchShopCartDetailsStart());

		let isMounted = true;
		const contorller = new AbortController();

		sendRequest(
			{
				url: '/shop/getCart',
				withCredentials: true,
				contorller: contorller.signal,
				method: 'GET'
			},
			(responseData) => {
				console.log('@@@responseData /shop/getCart', responseData);
				const { message, status, products, totalCart } = responseData;

				if (message === 'Cart fetched successfully' && status === 200) {
					console.log('ok to update the redux store');
					dispatch(
						fetchShopCartDeatilsSuccess({
							cartItemsDetails: products,
							cartTotalPrice: totalCart
						})
					);
				}
			}
		);
		return () => {
			contorller.abort();
			isMounted = false;
		};
	}, []);

	return (
		<>
			<StoreGlobalSettings />
			<ShopFavoritesContainer>
				<ShopFavoritesTitle>My Cart</ShopFavoritesTitle>

				{isLoading ? (
					<LoaderIcon text="Loading your cart" barsColor="#1f1f1f" textColor={'#1f1f1f'} />
				) : cartItemsDetails?.length === 0 ? (
					<NoFavoritesFallback>
						<NoFavoritesFallbackText>
							Looks like you don't have any products in cart ☹️
						</NoFavoritesFallbackText>
					</NoFavoritesFallback>
				) : (
					<CartItemsWrapper>
						{cartItemsDetails?.map((cartItem) => (
							<CartItem
								key={cartItem?._id}
								price={cartItem?.productId?.price}
								imageUrl={cartItem?.productId?.imageUrl}
								title={cartItem?.productId?.title}
								quantity={cartItem?.quantity}
								size={cartItem?.size}
								productId={cartItem?.productId?._id}
							/>
						))}
					</CartItemsWrapper>
				)}
			</ShopFavoritesContainer>
			<CartTotal totalPrice={cartTotal} disabled={cartItemsDetails?.length === 0} />
		</>
	);
};

export default Cart;
