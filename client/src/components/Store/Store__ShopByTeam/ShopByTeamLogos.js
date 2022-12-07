import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import ErrorModal from '../../../components/UI/ErrorModal';

const ShopByTeamLogo = () => {
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const {
		isLoading: isLoadingStore,
		shopTeams,
		error: errorStore
	} = useSelector(shopTeamsSelector);
	const { isLoading, sendRequest, error, responseData } = useAxiosInterceptors();

	useEffect(() => {
		if (error || errorStore) {
			setShowModal(true);
		}
	}, [error, errorStore]);

	const closeModalConfirm = () => setShowModal(false);

	useEffect(() => {
		const controller = new AbortController();

		try {
			if (shopTeams?.length === 0) {
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
			dispatch(
				fetchShopTeamsFailure(error?.message || error || 'Something went wrong! Try again later.')
			);
			console.error('@@@ERROR shop by team useeffect', error);
		}

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<ShopByTeamContainer>
			{showModal && error && (
				<ErrorModal
					title="Ooops!"
					message={error?.message || errorStore?.message || 'Something went wrong'}
					onConfirm={closeModalConfirm}
				/>
			)}

			{isLoading && isLoadingStore ? (
				<LoaderIcon />
			) : (
				shopTeams?.map((team, index) => (
					<Link to={`/shop/team/${team?._id}`} key={team?._id || index} replace="true">
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
