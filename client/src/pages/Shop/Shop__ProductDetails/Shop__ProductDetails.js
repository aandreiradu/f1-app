import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailsHeader from '../../../components/Store/Store__ProductDetails/ProductDetails__header';
import { StoreGlobalSettings } from '../Shop.styles';
import useAxiosInterceptors from '../../../hooks/useHttpInterceptors';
import { ProductDetailsContainer } from './Shop__ProductDetails.styles';
import ProductDetailsImages from '../../../components/Store/Store__ProductDetails/ProductDetailsImages';
import ProductDetailsInfo from '../../../components/Store/Store__ProductDetails/ProductDetailsInfo';
import ProductDetailsActions from '../../../components/Store/Store__ProductDetails/ProductDetailsActions';
import Footer from '../../../components/Footer/Footer';

const ShopProductDeatils = () => {
	const [productDetails, setProductDetails] = useState({});
	const { sendRequest, error } = useAxiosInterceptors();
	const { productId } = useParams();

	console.log('@@@productDetails is', productDetails);
	console.log('@@@productDetails?.product?.imageUrl is', productDetails?.product?.imageUrl);
	console.log('@@@productDetails?.product?.name is', productDetails?.product?.name);

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
					isMounted &&
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

	const productsAvailable = productDetails?.product?.sizeAndAvailableQuantity?.some(
		(item) => item?.availableQuantity > 0
	);

	return (
		<>
			<StoreGlobalSettings />
			<ProductDetailsContainer>
				<ProductDetailsHeader team={productDetails?.team || {}} />
				<ProductDetailsImages
					imageUrl={productDetails?.product?.imageUrl}
					productName={productDetails?.product?.title}
				/>
				<ProductDetailsInfo
					product={productDetails?.product}
					teamLogo={productDetails?.team?.logoUrl}
				/>
				<ProductDetailsActions hasAvailableProducts={productsAvailable} />
			</ProductDetailsContainer>
			<Footer />
		</>
	);
};

export default ShopProductDeatils;
