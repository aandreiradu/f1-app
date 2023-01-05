import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosInterceptors from '../../../hooks/useHttpInterceptors';
import { StoreGlobalSettings, StoreMainContainer } from '../../../pages/Shop/Shop.styles';
import Footer from '../../Footer/Footer';
import apiConfig from '../../../constants/apiConfig';
import { StoreProductsContainer } from '../../../pages/Shop/Shop.styles';
import { ShopByTeamHeader, ShopByTeamHeaderLogo, ShopByTeamHeaderName } from './ShopByTeam.styles';
import LoaderIcon from '../../LoaderReusable/LoaderIcon';
import ShopByTeamProductItem from './ShopByTeamProductItem';
import { ShopByTeamProductItemWrapper } from './ShopByTeamProductItem.styles';
import ErrorModal from '../../../components/UI/ErrorModal';

const ShopByTeam = () => {
	const [errorModal, setErrorModal] = useState({
		show: false,
		errorMessage: null
	});
	const [shopByTeamData, setShopByTeamData] = useState([]);
	const { isLoading, sendRequest, error } = useAxiosInterceptors();
	const { teamId } = useParams();
	console.log('teamId', teamId);

	console.log('@@shopByTeamData', shopByTeamData);

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
					isMounted &&
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
		console.log('@@@error', error);

		if (error) {
			setErrorModal({
				show: true,
				errorMessage: error?.message || 'Something went wrong'
			});
		}
	}, [error]);

	const confirmErrorModal = () =>
		setErrorModal({
			show: false,
			errorMessage: null
		});

	return (
		<>
			<StoreGlobalSettings />
			<StoreMainContainer>
				{/* Error Modal */}
				{errorModal?.show && (
					<ErrorModal
						text="Ooops!"
						message={errorModal?.errorMessage}
						onConfirm={confirmErrorModal}
					/>
				)}

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
						{
							shopByTeamData?.products?.length === 0 ? (
								<h2 style={{ textAlign: 'center' }}>
									Currently there are no products for this team
								</h2>
							) : (
								<ShopByTeamProductItemWrapper>
									{shopByTeamData?.products?.map((product, index) => (
										<ShopByTeamProductItem key={product?._id || index} product={product || {}} />
									))}
								</ShopByTeamProductItemWrapper>
							)
							/*(
							<ShopByTeamProductItem products={shopByTeamData?.products || []} />
						
						)*/
						}
					</StoreProductsContainer>
				)}
			</StoreMainContainer>
			{!isLoading && <Footer />}
		</>
	);
};

export default ShopByTeam;
