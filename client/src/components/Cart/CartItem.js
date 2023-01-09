import React, { useCallback } from 'react';
import {
	CartItemContainer,
	CartItemProdImg,
	CartItemActions,
	CartItemProdDetails
} from './CartItem.styles';
import F1Logo from '../../components/Nav/f1_logo.svg';
import apiConfig from '../../constants/apiConfig';
import useAxiosInterceptors from '../../hooks/useHttpInterceptors';
import { useDispatch } from 'react-redux';
import {
	shopUserSyncCart,
	shopUserUpdateCart
} from '../../store/Store__UserProducts/store__userProducts.actions';
import { updateCartItemsCount } from '../../store/Auth/auth.actions';

const CartItem = ({ productId, price, imageUrl, title, quantity, size }) => {
	const dispatch = useDispatch();
	const { sendRequest, isLoading, error } = useAxiosInterceptors();

	const handleCartIncreaseDecreaseQTY = useCallback((productId, size, operation) => {
		console.log('request with this', productId, size, operation);

		const controller = new AbortController();
		sendRequest(
			{
				url: '/shop/updateCart',
				method: 'POST',
				withCredentials: true,
				controller: controller.signal,
				body: {
					productId,
					size,
					operation
				}
			},
			(response) => {
				console.log('response handleCartIncreaseDecreaseQTY', response);
				const { totalCart, message, status, cart, cartItemsCount } = response;

				if (status === 200 && message === 'Cart updated') {
					console.log('dispatch and update the cart');
					dispatch(shopUserUpdateCart({ cartItemsDetails: cart, cartTotalPrice: totalCart }));
					dispatch(updateCartItemsCount(cartItemsCount));
				}
			}
		);
	}, []);

	return (
		<CartItemContainer>
			<CartItemProdImg
				src={imageUrl ? `${apiConfig.baseURL}/${imageUrl}` : F1Logo}
				alt="product image"
			/>
			<CartItemProdDetails>
				<span>{title || 'N/A'}</span>
				<span>€{price || 'N/A'}</span>
				<span>{size || 'N/A'}</span>
			</CartItemProdDetails>
			<CartItemActions>
				<span onClick={handleCartIncreaseDecreaseQTY.bind(this, productId, size, 'REMOVE')}>-</span>
				<span>{quantity}</span>
				<span onClick={handleCartIncreaseDecreaseQTY.bind(this, productId, size, 'ADD')}>+</span>
			</CartItemActions>
		</CartItemContainer>
	);
};

export default CartItem;
