import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useAxiosInterceptors from '../../../hooks/useHttpInterceptors';
import { StoreGlobalSettings, StoreMainContainer } from '../../../pages/Shop/Shop.styles';
import Footer from '../../Footer/Footer';
import apiConfig from '../../../constants/apiConfig';
import { StoreProductsContainer } from '../../../pages/Shop/Shop.styles';
import StoreItem from '../StoreItem/StoreItem';
import { ShopByTeamHeader, ShopByTeamHeaderLogo, ShopByTeamHeaderName } from './ShopByTeam.styles';
import LoaderIcon from '../../LoaderReusable/LoaderIcon';
import ShopByTeamProductItem from './ShopByTeamProductItem';

const ShopByTeam = () => {
	const [shopByTeamData, setShopByTeamData] = useState([]);
	const { isLoading, sendRequest, responseData, error } = useAxiosInterceptors();
	const location = useLocation();
	const { teamId } = useParams();
	console.log('teamId', teamId);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		console.log('@@@ run useEFFECT FOR teamId', teamId);

		sendRequest(
			{
				url: `/shop/team/${teamId}`,
				withCredentials: true,
				controller: controller.signal
			},
			(responseData) => {
				console.log('@@@ responseData for teamId', teamId, responseData);
				const { status, message, products, team } = responseData;
				console.log('@@@team ', team);
				if (
					status === 200 &&
					(message === 'No products found' || message === 'Products fetched successfully')
				) {
					setShopByTeamData({
						products: [...products],
						team: {
							...team
						}
					});
				}
			}
		);

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [teamId]);

	useEffect(() => {
		console.log('@@@shopByTeamData EFFECT@@@', shopByTeamData);
	}, [shopByTeamData]);

	return (
		<>
			<StoreGlobalSettings />
			<StoreMainContainer>
				<ShopByTeamHeader>
					<ShopByTeamHeaderLogo
						src={
							shopByTeamData?.team?.logoUrl
								? `${apiConfig.baseURL}/${shopByTeamData?.team?.logoUrl}`
								: ''
						}
						alt={
							`${shopByTeamData?.team?.teamName || shopByTeamData?.team?.constructorName} Logo` ||
							'Team Logo'
						}
					/>
					<ShopByTeamHeaderName>
						{shopByTeamData?.team?.teamName || shopByTeamData?.team?.constructorName || 'N/A'}
					</ShopByTeamHeaderName>
				</ShopByTeamHeader>
				{isLoading ? (
					<LoaderIcon
						text={'Loading products. Please wait'}
						barsColor={'#1f1f1f'}
						textColor={'#1f1f1f'}
					/>
				) : (
					<StoreProductsContainer>
						{shopByTeamData?.products?.length === 0 ? (
							<h2 style={{ textAlign: 'center' }}>Currently there are no products for this team</h2>
						) : (
							<ShopByTeamProductItem products={shopByTeamData?.products || []} />
						)}
					</StoreProductsContainer>
				)}
			</StoreMainContainer>
			{!isLoading && <Footer />}
		</>
	);
};

export default ShopByTeam;
