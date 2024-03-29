import { useDispatch, useSelector } from 'react-redux';
import StoreItem from '../../components/Store/StoreItem/StoreItem';
import ErrorModal from '../../components/UI/ErrorModal';
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
import {
	fetchShopProductsStart,
	fetchShopProductsSuccess,
	fetchShopProductsFailure,
	shopProductsChangePageNo
} from '../../store/Shop__Products/shopProducts.actions';
import { selectProducts } from '../../store/Shop__Products/shopProducts.selector';
import Paginator from '../../components/Paginator/Paginator';
import {
	fetchShopFavoritesSuccess,
	shopUserAddToFavoritesFailure
} from '../../store/Store__UserProducts/store__userProducts.actions.js';
import { selectFavoriteItems } from '../../store/Store__UserProducts/store__userProducts.selector';

const Store = () => {
	const favoriteProductsSelector = useSelector(selectFavoriteItems);
	console.log('@@favoriteProductsSelector', favoriteProductsSelector);
	const dispatch = useDispatch();
	const { products, productsPage, totalProducts, cachedPages } = useSelector(selectProducts);
	console.log('products from STORE!!!', products);
	const [showModal, setShowModal] = useState({
		show: false,
		title: null,
		message: null
	});
	const [searchedProduct, setSearchedProduct] = useState('');
	const { isLoading, sendRequest, error } = useAxiosInterceptors();

	const handleProductSearch = (searchQuery) => {
		setSearchedProduct(searchQuery);
	};

	const loadProducts = (direction) => {
		console.log('received direction', direction);
		if (direction) {
			dispatch(fetchShopProductsStart());
		}

		let page = productsPage || 1;

		switch (direction) {
			case 'next':
				page++;
				dispatch(shopProductsChangePageNo(page));
				break;

			case 'previous':
				page--;
				dispatch(shopProductsChangePageNo(page));
				break;

			default:
				console.log(`Unhandled direction at loadProducts`, direction);
				return;
		}

		// Fetch products
		const controller = new AbortController();
		sendRequest(
			{
				url: `/shop/products?page=${page}`,
				controller: controller.signal,
				withCredentials: true
			},
			(responseData) => {
				console.log('responseData', responseData);
				const { products, message, status, totalProducts } = responseData || null;

				if (status === 200 && message === 'Fetched products successfully') {
					dispatch(
						fetchShopProductsSuccess({
							products: products,
							totalProducts: totalProducts,
							cachedPages: cachedPages
						})
					);
				}
			}
		);
	};

	useEffect(() => {
		// fetch favorite products on page render
		const favoritesController = new AbortController();
		try {
			sendRequest(
				{
					url: `/shop/getFavorites`,
					controller: favoritesController.signal,
					withCredentials: true
				},
				(responseData) => {
					console.log('responseFavorites', responseData);
					const { products, message, status } = responseData || null;

					if (status === 200 && message === 'Fetched favorite products successfully') {
						dispatch(fetchShopFavoritesSuccess(products));
					}
				}
			);
		} catch (error) {
			console.log('@@@ERROR Store getFavoriteProducts', error);
			shopUserAddToFavoritesFailure(error);
		}
	}, []);

	useEffect(() => {
		// fetch products
		if (products?.length === 0) {
			try {
				// Fetch products
				dispatch(fetchShopProductsStart());
				const controller = new AbortController();
				sendRequest(
					{
						url: `/shop/products?page=${productsPage}`,
						controller: controller.signal,
						withCredentials: true
					},
					(responseData) => {
						console.log('responseData', responseData);
						const { products, message, status, totalProducts } = responseData || null;

						if (status === 200 && message === 'Fetched products successfully') {
							dispatch(
								fetchShopProductsSuccess({
									products: products,
									totalProducts: totalProducts
								})
							);
						}
					}
				);
			} catch (error) {
				console.log('@@@ERROR Store getProducts', error);
				fetchShopProductsFailure(error);
			}
		}
	}, [dispatch, sendRequest, products, productsPage]);

	useEffect(() => {
		if (error) {
			const { message, status, data } = error || {};
			console.log({ message, status, data });
			setShowModal({
				show: true,
				title: 'Ooops',
				message: message
			});
		}
	}, [error]);

	const filteredProducts = !searchedProduct
		? products
		: products?.filter((product) =>
				product?.title?.toLowerCase()?.includes(searchedProduct?.toLowerCase())
		  );

	console.log('filteredProducts', filteredProducts);

	const closeModal = () =>
		setShowModal({
			show: false,
			title: null,
			message: null
		});

	return (
		<>
			<StoreGlobalSettings />

			{showModal?.show && (
				<ErrorModal title={showModal?.title} message={showModal?.message} onConfirm={closeModal} />
			)}

			<StoreMainContainer>
				{/* Store Header */}
				<StoreHeader>F1 © Official Store</StoreHeader>
				<StoreSubHeader>Support your favorite team</StoreSubHeader>

				{/* Search and Filter */}
				<StoreSearch__Filter onProductSearched={handleProductSearch} />

				{/* Shop By Team */}
				<StoreSubHeader>Shop by Team</StoreSubHeader>
				<ShopByTeamLogo />

				{isLoading ? (
					<LoaderIcon text={'Loading products'} barsColor={'#1f1f1f'} textColor={'#1f1f1f'} />
				) : (
					<Paginator
						onPrevious={loadProducts.bind(this, 'previous')}
						onNext={loadProducts.bind(this, 'next')}
						currentPage={productsPage}
						lastPage={Math.ceil(totalProducts / 6)}
					>
						<StoreProductsContainer>
							{filteredProducts?.map((product, index) => (
								<StoreItem
									key={product?._id || index}
									productId={product?._id}
									description={product?.description}
									imageUrl={product?.imageUrl}
									title={product?.title || 'N/A'}
									price={product?.price || 'N/A'}
									details={product?.details}
									isFavorite={favoriteProductsSelector?.favoriteStoreItems?.find(
										(item) => item?.productId === product?._id
									)}
								/>
							))}
						</StoreProductsContainer>
					</Paginator>
				)}
			</StoreMainContainer>
			{!isLoading && <Footer />}
		</>
	);
};

export default Store;

// RADU X PE INPUT SI FETCH NORMAL IN FUNCTIE DE PAGENO
