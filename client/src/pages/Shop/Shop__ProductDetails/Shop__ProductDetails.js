import { useEffect, useState } from 'react';
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
	const { productId } = useParams();
	const [isSizeSelected, setIsSizeSelected] = useState(false);
	const [productDetails, setProductDetails] = useState({});
	const { sendRequest, error } = useAxiosInterceptors();

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

	const productsAvailable = productDetails?.product?.sizeAndAvailability?.some(
		(item) => item?.availability > 0
	);

	console.log('@@@productDetails is', productDetails);
	console.log('productsAvailable', productsAvailable);

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
					onSizeSelected={setIsSizeSelected}
					isSelected={isSizeSelected}
				/>
				<ProductDetailsActions
					product={productDetails?.product}
					productsAvailable={productsAvailable}
					isSizeSelected={isSizeSelected}
					hasSize={productDetails?.product?.hasSize}
				/>
			</ProductDetailsContainer>
			<Footer />
		</>
	);
};

export default ShopProductDeatils;
