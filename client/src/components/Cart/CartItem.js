import React, { useCallback } from 'react';
import {
	CartItemContainer,
	CartItemProdImg,
	CartItemActions,
	CartItemProdDetails,
	CartItemActionIcon
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
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import ErrorModal from '../../components/UI/ErrorModal';
import { useState } from 'react';
import { useEffect } from 'react';

const CartItem = ({ productId, price, imageUrl, title, quantity, size }) => {
	const dispatch = useDispatch();
	const [modalError, setModalError] = useState({
		show: false,
		message: null
	});
	const { sendRequest, isLoading, error } = useAxiosInterceptors();

	useEffect(() => {
		if (error) {
			setModalError({
				show: true,
				message: error?.message || 'Unexpected error occured'
			});
		}
	}, [error]);

	const confirmErrorModal = useCallback(
		() =>
			setModalError({
				show: false,
				message: null
			}),
		[]
	);

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
			{/* Error Modal */}
			{modalError.show && (
				<ErrorModal title="Ooops" message={modalError.message} onConfirm={confirmErrorModal} />
			)}

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
				<button
					disabled={isLoading || modalError.show}
					style={{ border: 'none', background: 'transparent' }}
					onClick={handleCartIncreaseDecreaseQTY.bind(this, productId, size, 'ADD')}
				>
					<CartItemActionIcon icon={faPlus} />
				</button>
				<span>{quantity}</span>
				<button
					disabled={isLoading || modalError.show}
					onClick={handleCartIncreaseDecreaseQTY.bind(this, productId, size, 'REMOVE')}
					style={{ border: 'none', background: 'transparent' }}
				>
					<CartItemActionIcon icon={faMinus} />
				</button>
			</CartItemActions>
		</CartItemContainer>
	);
};

export default CartItem;
