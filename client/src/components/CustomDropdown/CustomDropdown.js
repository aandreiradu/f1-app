import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDropdown from '../../hooks/useDropdown';
import LoaderIcon from '../../components/LoaderReusable/LoaderIcon';
import { selectShopTeams } from '../../store/Shop__Teams/shopTeams.selector';
import { AddProductsErrorFallback } from '../../pages/Admin/AdminAddProducts.styles';
import addProductsValidations from '../../Utils/validationsConfig/adminAddProducts.validations';
import {
	fetchShopTeamsFailure,
	fetchShopTeamsStart,
	fetchShopTeamsSuccess
} from '../../store/Shop__Teams/shopTeams.actions';
import {
	CustomDropdownContainer,
	CustomDropdownIcon,
	CustomDropdownInput,
	CustomDropdownResultItem,
	CustomDropdownResults,
	CustomDropdownSearchWrapper,
	CustomDropdownResultItemLogo,
	CustomDropdownResultItemName
} from './CustomDropdown.styles';
import useAxiosInterceptors from '../../hooks/useHttpInterceptors';
import apiConfig from '../../constants/apiConfig';
import ErrorModal from '../UI/ErrorModal';

const CustomDropdown = ({ onTeamSelected }) => {
	const dispatch = useDispatch();
	const cachedTeams = useSelector(selectShopTeams);
	const { isLoading, sendRequest, error } = useAxiosInterceptors();
	const [showErrorModal, setShowErrorModal] = useState(false);
	const dropdownRef = useRef();
	const {
		value,
		onChangeHandler,
		onSelectedItem,
		onOpen,
		isOpen,
		query,
		hasError,
		isTouched,
		inputBlurHandler,
		reset
	} = useDropdown();

	useEffect(() => {
		if (cachedTeams && Array.isArray(cachedTeams) && cachedTeams?.length === 0) {
			console.log('no teams in redux-store, request from backend and store it');
			const controller = new AbortController();

			try {
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
			} catch (error) {
				dispatch(
					fetchShopTeamsFailure(error?.message || error || 'Something went wrong! Try again later.')
				);
				console.error('@@@ERROR CustomDropdown when fetching teams', error);
			}

			return () => {
				controller.abort();
			};
		} else {
			console.log('teams already in redux-store, no need for new request');
		}
	}, [cachedTeams, dispatch, sendRequest]);

	const filteredTeams = !query
		? cachedTeams
		: cachedTeams?.filter((team) => team?.name?.toLowerCase()?.includes(query?.toLowerCase()));

	useEffect(() => {
		console.log('@@@CustomDropdown ERROR ', error);
		setShowErrorModal(true);
	}, [error]);

	const closeModalConfirm = () => setShowErrorModal(false);

	// useEffect(() => {
	// 	const checkIfClickOutside = (e) => {
	// 		console.log('checkIfClickOutside e', e);
	// 		console.log('trigered');
	// 		if (
	// 			isOpen &&
	// 			dropdownRef.current &&
	// 			!dropdownRef.current.contains(e.target) &&
	// 			e.target.details !== 'details'
	// 		) {
	// 			setIsOpen(false);
	// 			console.log('should close');
	// 		} else {
	// 			console.log('should not close');
	// 		}
	// 	};

	// 	document.addEventListener('mousedown', checkIfClickOutside);

	// 	return () => {
	// 		document.removeEventListener('mousedown', checkIfClickOutside);
	// 	};
	// }, [isOpen]);

	return (
		<CustomDropdownContainer>
			{showErrorModal && error && (
				<ErrorModal
					title="Ooops!"
					message={error?.message || 'Something went wrong'}
					onConfirm={closeModalConfirm}
				/>
			)}

			<CustomDropdownSearchWrapper>
				{isLoading ? (
					<LoaderIcon text="Loading teams" textColor="#1f1f1f" barsColor="#1f1f1f" />
				) : (
					<>
						<CustomDropdownInput
							ref={dropdownRef}
							onClick={onOpen}
							onChange={onChangeHandler}
							name="teamSearch"
							spellCheck="false"
							autoComplete="false"
							type="text"
							placeholder="Search Team"
							value={query === value?.name ? value?.name : query}
							disabled={isLoading || error}
							onBlur={inputBlurHandler}
							isTouched={isTouched}
							hasError={hasError}
						/>
						<CustomDropdownIcon icon={faSearch} />
					</>
				)}
			</CustomDropdownSearchWrapper>
			{/* {hasError && (
				<AddProductsErrorFallback>
					{addProductsValidations['team'].errorDescription}
				</AddProductsErrorFallback>
			)} */}
			<CustomDropdownResults isOpen={isOpen} resultsNo={filteredTeams?.length}>
				{filteredTeams?.map((result, index) => (
					<CustomDropdownResultItem
						onClick={() => {
							onSelectedItem.call(this, { teamId: result?._id, value: result?.name });
							onTeamSelected.call(this, { teamId: result?._id, value: result?.name });
						}}
						key={result?._id}
					>
						<CustomDropdownResultItemLogo
							src={result?.logoUrl ? `${apiConfig.baseURL}/${result?.logoUrl}` : ''}
						/>
						<CustomDropdownResultItemName>{result?.name}</CustomDropdownResultItemName>
					</CustomDropdownResultItem>
				))}
			</CustomDropdownResults>
		</CustomDropdownContainer>
	);
};

export default CustomDropdown;
