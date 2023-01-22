import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { StoreGlobalSettings } from '../../Shop/Shop.styles';
import {
	BagIcon,
	CheckoutSuccessContainer,
	CheckoutSuccessTitle,
	CheckoutSucessActionButton,
	CustomerDetails,
	OrderDetails,
	OrderDetailsPrice,
	OrderDetailsRow,
	OrderDetailsTitle,
	SeparationLine
} from './CheckoutSuccess.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectFullName } from '../../../store/Auth/auth.selector';
import { useEffect } from 'react';
import useAxiosInterceptors from '../../../hooks/useHttpInterceptors';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import LoaderIcon from '../../../components/LoaderReusable/LoaderIcon';
import { shopUserClearCart } from '../../../store/Store__UserProducts/store__userProducts.actions';
import { updateCartItemsCount } from '../../../store/Auth/auth.actions';

const CheckoutSuccess = () => {
	const dispatch = useDispatch();
	let [searchParams] = useSearchParams();
	const [stripeSession, setStripeSession] = useState('');
	const { sendRequest, isLoading, error } = useAxiosInterceptors();
	const navigate = useNavigate();
	const fullName = useSelector(selectFullName);

	useEffect(() => {
		// check for url query params and clear the cart

		if (searchParams?.get('session_id')) {
			console.log('am session id');
			const stripeSessionId = searchParams.get('session_id');
			console.log('stripeSessionId', stripeSessionId);

			sendRequest(
				{
					url: '/shop/checkout/retrieve-session',
					method: 'POST',
					withCredentials: false,
					body: { stripeSessionId: stripeSessionId }
				},
				(responseData) => {
					console.log('responseData', responseData);
					const { status, message, session } = responseData;

					if (status === 200 && message === 'Checkout session retrieved successfully') {
						console.log('update state');
						setStripeSession(session);

						if (session?.payment_status === 'paid') {
							console.log('can trigger backend to clear the cart');
							dispatch(updateCartItemsCount(0));
							dispatch(shopUserClearCart());
						}
					}
				}
			);
		} else {
			navigate('/');
		}
	}, []);

	return (
		<>
			<StoreGlobalSettings />
			<CheckoutSuccessContainer>
				{isLoading ? (
					<LoaderIcon barsColor="#1f1f1f" textColor="#1f1f1f" text="Please wait" />
				) : (
					<>
						{/* <CheckoutSuccessTitle>Thank you for your order</CheckoutSuccessTitle>
						<BagIcon icon={faCheckCircle} color="green" /> */}
						<CustomerDetails>
							<h2>Hey, {fullName || 'Guest'}</h2>
							<p>
								We are currently processing your order and will send you a confirmation email
								shortly
							</p>
						</CustomerDetails>
						<OrderDetails>
							<OrderDetailsRow>
								<OrderDetailsTitle>Sub Total</OrderDetailsTitle>
								<OrderDetailsPrice>{stripeSession?.amount_subtotal / 100 || 0} €</OrderDetailsPrice>
							</OrderDetailsRow>
							<OrderDetailsRow>
								<OrderDetailsTitle>Shipping</OrderDetailsTitle>
								<OrderDetailsPrice>
									{(stripeSession &&
										Array.isArray(stripeSession?.shipping_options) &&
										stripeSession.shipping_options[0].shipping_amount / 100) ||
										0}{' '}
									€
								</OrderDetailsPrice>
							</OrderDetailsRow>
							<SeparationLine />
							<OrderDetailsRow>
								<OrderDetailsTitle>Total</OrderDetailsTitle>
								<OrderDetailsPrice>{stripeSession?.amount_total / 100 || 0} €</OrderDetailsPrice>
							</OrderDetailsRow>
						</OrderDetails>
						<CheckoutSucessActionButton to={'/shop'}>Continue Shopping</CheckoutSucessActionButton>
					</>
				)}
			</CheckoutSuccessContainer>
			{/* <Footer /> */}
		</>
	);
};

export default CheckoutSuccess;
