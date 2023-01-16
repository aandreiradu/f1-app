import {
	StoreFilterContainer,
	StoreSearchConatainer,
	StoreSearchInput,
	StoreSearchInputIcon,
	StoreSearchFilterContainer,
	StoreFilterIcon
} from './StoreSearch__Filter.styles';
import { faMagnifyingGlass, faSearch, faSliders } from '@fortawesome/free-solid-svg-icons';
import useDebouce from '../../../hooks/useDebouce';
import { useState } from 'react';
import useAxiosInterceptors from '../../../hooks/useHttpInterceptors';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
	fetchShopProductsQuery,
	fetchShopProductsSuccess
} from '../../../store/Shop__Products/shopProducts.actions';

const StoreSearch__Filter = ({ onProductSearched }) => {
	const dispatch = useDispatch();
	const searchRef = useRef();
	const { sendRequest, isLoading, error } = useAxiosInterceptors();
	const [value, setValue] = useState('');
	// const debouncedValue = useDebouce(value, 500);

	// useEffect(() => {
	// 	console.log('start search on backend this', debouncedValue);

	// 	const controller = new AbortController();
	// 	sendRequest(
	// 		{
	// 			url: `/shop/search?query=${value}`,
	// 			method: 'GET',
	// 			withCredentials: true,
	// 			controller: controller.signal
	// 		},
	// 		(response) => {
	// 			console.log('response', response);
	// 		}
	// 	);

	// 	return () => {
	// 		controller.abort();
	// 	};
	// }, [debouncedValue]);

	const onSearchChangeHandler = (e) => {
		// onProductSearched(e.target.value);
		setValue(searchRef.current?.value);
		console.log(searchRef.current.value);

		const controller = new AbortController();
		sendRequest(
			{
				url: `/shop/search?query=${searchRef.current?.value || ''}`,
				method: 'GET',
				withCredentials: true,
				controller: controller.signal
			},
			(response) => {
				console.log('response', response);
				const { message, status, products, totalProducts } = response;

				if (status === 200 && message === 'Products fetched successfully') {
					console.log('update redux with this', products);
					dispatch(
						fetchShopProductsSuccess({
							products: products,
							totalProducts
						})
					);
				}
			}
		);
	};

	return (
		<>
			<StoreSearchFilterContainer>
				<StoreSearchConatainer>
					<StoreSearchInputIcon icon={faMagnifyingGlass} />
					<StoreSearchInput
						type="text"
						spellCheck="false"
						placeholder="Search"
						ref={searchRef}
						// onChange={onSearchChangeHandler}
					/>
				</StoreSearchConatainer>
				<StoreFilterContainer onClick={onSearchChangeHandler}>
					<StoreFilterIcon icon={faSearch} />
				</StoreFilterContainer>
			</StoreSearchFilterContainer>
		</>
	);
};

export default StoreSearch__Filter;
