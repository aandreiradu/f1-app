import StoreItem from '../../components/Store/StoreItem/StoreItem';
import {
	StoreGlobalSettings,
	StoreMainContainer,
	StoreHeader,
	StoreSubHeader,
	StoreProductsContainer
} from './Shop.styles';
import StoreSearch__Filter from '../../components/Store/StoreSearch__Filter/StoreSearch__Filter';
import ShopByTeamLogo from '../../components/Store/Store__ShopByTeam/ShopByTeamLogos';
import useAxiosInterceptors from '../../hooks/useHttpInterceptors';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import LoaderIcon from '../../components/LoaderReusable/LoaderIcon';

const Store = () => {
	const [products, setProducts] = useState([]);
	const { isLoading, sendRequest, error, responseData } = useAxiosInterceptors();

	useEffect(() => {
		const controller = new AbortController();

		sendRequest(
			{
				url: '/shop/products',
				controller: controller.signal,
				withCredentials: true
			},
			(responseData) => {
				console.log('responseData', responseData);
				const { products, message, status } = responseData || null;

				if (status === 200 && message === 'Fetched products successfully') {
					console.log('all good, can store products in state / store');
					console.log('products to store', products);
					setProducts(products);
				}
			}
		);
	}, []);

	useEffect(() => {
		console.log('products useEffect', products);
	}, [products]);

	return (
		<>
			<StoreGlobalSettings />
			<StoreMainContainer>
				{/* Store Header */}
				<StoreHeader>F1 © Official Store</StoreHeader>
				<StoreSubHeader>Support your favorite team</StoreSubHeader>

				{/* Search and Filter */}
				<StoreSearch__Filter />

				{/* Shop By Team */}
				<StoreSubHeader>Shop by Team</StoreSubHeader>
				<ShopByTeamLogo />

				{isLoading ? (
					<LoaderIcon text={'Loading products'} barsColor={'#1f1f1f'} textColor={'#1f1f1f'} />
				) : (
					<StoreProductsContainer>
						{products?.map((product, index) => (
							<StoreItem
								key={product?._id || index}
								productId={product?._id}
								description={product?.description}
								imageUrl={product?.imageUrl}
								title={product?.title || 'N/A'}
								price={product?.price || 'N/A'}
								details={product?.details}
							/>
						))}
					</StoreProductsContainer>
				)}
			</StoreMainContainer>
			{!isLoading && <Footer />}
		</>
	);
};

export default Store;
