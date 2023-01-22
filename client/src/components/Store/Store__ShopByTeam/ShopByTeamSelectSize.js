import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import {
	Overlay,
	SBTSelectSizeContainer,
	SBTTitle,
	SBTCloseSelectSize,
	SBTSizeList,
	SBTSizeListItem
} from './ShopByTeamSelectSize.styles';
import useAxiosInterceptors from '../../../hooks/useHttpInterceptors';
import { useDispatch } from 'react-redux';
import { updateCartItemsCount } from '../../../store/Auth/auth.actions';
import { shopUserAddToCart } from '../../../store/Store__UserProducts/store__userProducts.actions';
import ErrorModal from '../../../components/UI/ErrorModal';

const ShopByTeamSelectSize = ({ onClose, product }) => {
	const [errorModal, setErrorModal] = useState({
		show: false,
		errorMessage: null
	});
	const dispatch = useDispatch();
	const { sendRequest, error, isLoading } = useAxiosInterceptors();
	const [shouldClose, setShouldClose] = useState(false);
	const { sizeAndAvailableQuantity, sizeAndAvailability } = product;

	useEffect(() => {
		if (error) {
			console.error('@@ error ShopFavoriteItems', error);
			setErrorModal({
				show: true,
				errorMessage: error?.message || 'Something went wrong, please try again later!'
			});
		}
	}, [error]);

	const itemsSize =
		sizeAndAvailableQuantity?.length > 0
			? sizeAndAvailableQuantity
			: sizeAndAvailability?.length > 0
			? sizeAndAvailability
			: [];

	const closeSizeSelectionHandler = useCallback(() => {
		console.log('closing this');

		setShouldClose(true);
		setTimeout(() => {
			onClose(false);
		}, 250);
	}, []);

	const sizeSelectionHandler = (productData) => {
		console.log('add this product with size in cart', productData);

		const { size, productId, availability } = productData;

		console.log({ size, productId, availability });

		if (size && productId && availability) {
			console.log('legit to add to cart');

			const controller = new AbortController();
			sendRequest(
				{
					method: 'POST',
					url: '/shop/addToCart',
					withCredentials: true,
					controller: controller.signal,
					body: {
						productId: productId,
						size
					}
				},
				(responseData) => {
					console.log('responseData', responseData);
					const { status, message, cartItemsCount, cart } = responseData;
					console.log('cartItemsCount is', cartItemsCount);

					if (status === 200 && message === 'product added to cart') {
						console.log('all good, product added to cart => close size selection');

						dispatch(shopUserAddToCart(cart));
						dispatch(updateCartItemsCount(cartItemsCount));
						setShouldClose(true);
						setTimeout(() => {
							onClose(false);
						}, 250);
					}
				}
			);
		} else {
			console.log('something went wrong');
		}
	};

	const confirmErrorModal = useCallback(() => {
		setErrorModal({
			show: false,
			errorMessage: null
		});
		setShouldClose(true);
		onClose();
	}, []);
	return (
		<>
			<Overlay />
			<SBTSelectSizeContainer shouldClose={shouldClose}>
				<SBTCloseSelectSize icon={faX} onClick={closeSizeSelectionHandler} />
				<SBTTitle>Select Size</SBTTitle>

				{/* Error Modal */}
				{errorModal?.show && (
					<ErrorModal
						title="Ooops!"
						message={errorModal.errorMessage}
						onConfirm={confirmErrorModal}
					/>
				)}

				<>
					{itemsSize?.length > 0 && (
						<SBTSizeList>
							{itemsSize?.map((it) => (
								<SBTSizeListItem
									aria-disabled={isLoading}
									key={it?.size}
									availability={it?.availability}
									onClick={sizeSelectionHandler.bind(this, {
										size: it?.size,
										productId: product?._id,
										availability: it?.availability
									})}
								>
									{it?.size}
								</SBTSizeListItem>
							))}
						</SBTSizeList>
					)}
				</>
			</SBTSelectSizeContainer>
		</>
	);
};

export default ShopByTeamSelectSize;
