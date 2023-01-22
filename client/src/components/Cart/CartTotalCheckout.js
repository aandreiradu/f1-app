import { faArrowRightToBracket, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import {
	CartCheckoutButton,
	CartTotalContainer,
	CartTotalCurrency,
	CartTotalPrice,
	CartTotalPriceContainer,
	CheckoutIcon
} from './CartTotal.styles';
import useAxiosInterceptors from '../../hooks/useHttpInterceptors';
import { loadStripe } from '@stripe/stripe-js';

const CartTotalCheckout = ({ totalPrice, disabled, products }) => {
	const { sendRequest, error, isLoading } = useAxiosInterceptors();

	console.log('products', products);

	const handleCheckout = () => {
		console.log('call backend with this products', products);

		const controller = new AbortController();

		sendRequest(
			{
				url: '/shop/checkout',
				method: 'POST',
				withCredentials: true,
				body: {
					products
				},
				controller: controller.signal
			},
			async (response) => {
				console.log('response', response);

				const { id } = response?.stripeSession;

				const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
				console.log('stripe', stripe);

				const resultStripe = stripe.redirectToCheckout({
					sessionId: id
				});

				console.log('resultStripe', resultStripe);
			}
		);
	};

	return (
		<CartTotalContainer>
			<CartTotalPriceContainer>
				<CartTotalCurrency>€</CartTotalCurrency>
				<CartTotalPrice>{totalPrice || 0}</CartTotalPrice>
			</CartTotalPriceContainer>
			<CartCheckoutButton disabled={disabled} onClick={handleCheckout}>
				Check Out
				<CheckoutIcon icon={faArrowRightToBracket} />
			</CartCheckoutButton>
		</CartTotalContainer>
	);
};

export default CartTotalCheckout;
