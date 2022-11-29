import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShopByTeamConfig from '../../../constants/shop__teamsLogoConfig';
import LoaderIcon from '../../LoaderReusable/LoaderIcon';
import useAxiosInterceptors from '../../../hooks/useHttpInterceptors';
import { ShopByTeamContainer, ShopByTeamLogoImg } from './ShopByTeamLogos.styles';
import apiConfig from '../../../constants/apiConfig';
import { shopTeamsSelector } from '../../../store/Shop__Teams/shopTeams.selector';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchShopTeamsFailure,
	fetchShopTeamsStart,
	fetchShopTeamsSuccess
} from '../../../store/Shop__Teams/shopTeams.actions';

const ShopByTeamLogo = () => {
	console.log('shopbyteamlogos render');
	const dispatch = useDispatch();
	const {
		isLoading: isLoadingStore,
		shopTeams,
		error: errorStore
	} = useSelector(shopTeamsSelector);
	const { isLoading, sendRequest, error, responseData } = useAxiosInterceptors();
	console.log({
		isLoadingStore,
		shopTeams,
		errorStore
	});

	useEffect(() => {
		const controller = new AbortController();

		try {
			if (shopTeams?.length === 0) {
				console.log('@@@@@are length 0 aici maaaa@@@@@@@');
				dispatch(fetchShopTeamsStart());
				sendRequest(
					{
						url: '/teams',
						withCredentials: true,
						controller: controller.signal
					},
					(responseData) => {
						console.log('@@@ get teams response', responseData);
						const { message, teams, status } = responseData;

						if (status === 200 && message === 'Teams fetched successfully') {
							console.log('ok to update the state');
							dispatch(fetchShopTeamsSuccess(teams));
						}
					}
				);
			} else {
				console.log('@@@ NO REQUEST, ALREADY HAVE ITEMS IN STORE');
			}
		} catch (error) {
			console.error('@@@ERROR shop by team useeffect', error);
			dispatch(
				fetchShopTeamsFailure(error?.message || error || 'Something went wrong! Try again later.')
			);
		}

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<ShopByTeamContainer>
			{isLoading || isLoadingStore ? (
				<LoaderIcon />
			) : (
				shopTeams?.map((team, index) => (
					<Link
						// to={{ pathname: '/store', search: `?team=${team?._id}` }}
						to={`/store/team/${team?._id}`}
						key={team?._id || index}
						replace="true"
					>
						<ShopByTeamLogoImg
							src={team?.logoUrl ? `${apiConfig.baseURL}/${team?.logoUrl}` : ''}
							alt={`${team?.name} Logo` || 'Team Logo'}
						/>
					</Link>
				))
			)}
		</ShopByTeamContainer>
	);
};

export default ShopByTeamLogo;
