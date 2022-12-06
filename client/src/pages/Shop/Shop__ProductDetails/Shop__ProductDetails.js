import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailsHeader from '../../../components/Store/Store__ProductDetails/ProductDetails__header';
import { StoreGlobalSettings } from '../Shop.styles';
import useAxiosInterceptors from '../../../hooks/useHttpInterceptors';
import { ProductDetailsContainer } from './Shop__ProductDetails.styles';

const ShopProductDeatils = () => {
	const [productDetails, setProductDetails] = useState({});
	const { sendRequest, error } = useAxiosInterceptors();
	const { productId } = useParams();

	useEffect(() => {
		console.log('@@@ShopProductDeatils useEffect error');
		if (error) {
		}
	}, [error]);

	useEffect(() => {
		console.log('fetching details for productId', productId);
		let isMounted = true;
		const controller = new AbortController();

		sendRequest(
			{
				url: `/shop/product/${productId}`,
				withCredentials: true,
				controller: controller.signal
			},
			(responseData) => {
				console.log('@@Result product details for', productId, responseData);
				const { message, product, team, status } = responseData;

				if (status === 200 && message === 'Product fetched successfully') {
					console.log('ok to store in state');
					setProductDetails({
						product,
						team
					});
				}
			}
		);

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [productId]);

	return (
		<>
			<StoreGlobalSettings />
			<ProductDetailsContainer>
				<ProductDetailsHeader team={productDetails?.team || {}} />
			</ProductDetailsContainer>
		</>
	);
};

export default ShopProductDeatils;
