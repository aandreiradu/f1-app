import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useAxiosInterceptors from '../../../hooks/useHttpInterceptors';
import {
	StoreGlobalSettings,
	StoreHeader,
	StoreMainContainer
} from '../../../pages/Store/Store.styles';
import Footer from '../../Footer/Footer';

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
				const { status, message, products } = responseData;

				if (status === 200 && message === 'Products fetched successfully') {
					console.log('ok set state for teamid', teamId);
					setShopByTeamData(products);
				}
			}
		);

		return () => {
			controller.abort();
		};
	}, [teamId]);

	return (
		<>
			<StoreGlobalSettings />
			<StoreMainContainer></StoreMainContainer>
			{!isLoading && <Footer />}
		</>
	);
};

export default ShopByTeam;
