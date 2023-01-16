import { SHOP_PRODUCTS_TYPES } from './shopProduct.types';

const initialShopProductsState = {
	isLoading: false,
	products: [],
	error: null,
	totalProducts: null,
	productsPage: 1,
	cachedPages: []
};

export const shopProductsReducer = (state = initialShopProductsState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case SHOP_PRODUCTS_TYPES.FETCH_SHOP_PRODUCTS_START:
			return {
				...state,
				isLoading: true
			};

		case SHOP_PRODUCTS_TYPES.FETCH_SHOP_PRODUCTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				products: payload.products,
				totalProducts: payload.totalProducts,
				error: null
			};

		case SHOP_PRODUCTS_TYPES.SHOP_PRODUCTS_CHANGE_PAGENO:
			return {
				...state,
				productsPage: payload
			};

		case SHOP_PRODUCTS_TYPES.FETCH_SHOP_PRODUCTS_QUERY:
			return {
				...state,
				products: payload
			};

		case SHOP_PRODUCTS_TYPES.FETCH_SHOP_PRODUCTS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			};

		default:
			return state;
	}
};
