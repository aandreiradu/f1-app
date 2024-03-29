import { STORE__USER_PRODUCTS_TYPES } from './store__userProducts.types';

const storeUserInitialState = {
	isLoading: false,
	error: null,
	cart: [],
	cartItemsDetails: [],
	favoriteStoreItems: [],
	favoriteStoreItemsDetails: [],
	cartTotalPrice: 0
};

export const storeUserReducer = (state = storeUserInitialState, action = {}) => {
	const { type, payload } = action;

	console.log('hmm', type, payload);

	switch (type) {
		// Initiate loading spinner when fetching products / favorite prods from backend
		case (STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_CART_START,
		STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_FAVORITES_START,
		STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_CART_DETAILS_START):
			return {
				...state,
				isLoading: true
			};

		// Sync Favorite Items with backend
		case STORE__USER_PRODUCTS_TYPES.SHOP_FAVORITES_SYNC:
			return {
				...state,
				isLoading: false,
				favoriteStoreItems: payload
			};

		// Sync Cart Items with backend
		case STORE__USER_PRODUCTS_TYPES.SHOP_CART_SYNC:
			return {
				...state,
				isLoading: false,
				cart: payload
			};

		// Update Cart Items Details
		case STORE__USER_PRODUCTS_TYPES.SHOP_CART_UPDATE:
			return {
				...state,
				isLoading: false,
				cartItemsDetails: payload.cartItemsDetails,
				cartTotalPrice: payload.cartTotalPrice
			};

		// Success fetching cart products from backend
		case STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_CART_SUCCESS:
			return {
				...state,
				isLoading: false,
				cart: payload
			};

		case STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_CART_DETAILS_SUCCESS:
			return {
				...state,
				isLoading: false,
				cartItemsDetails: payload.cartItemsDetails,
				cartTotalPrice: payload.cartTotalPrice
			};

		// Success fetching favorite products from backend
		case STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_FAVORITES_SUCESS:
			return {
				...state,
				isLoading: false,
				favoriteStoreItems: payload
			};

		// Success fetching favorite products DETAILS (imageURL,team,etc) from backend
		case STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_FAVORITES_DETAILS_SUCESS:
			return {
				...state,
				isLoading: false,
				favoriteStoreItemsDetails: payload
			};

		// Success adding item to favorites
		case STORE__USER_PRODUCTS_TYPES.SHOP_FAVORITES_ADD:
			return {
				...state,
				isLoading: false,
				favoriteStoreItems: payload
			};

		// Success adding item to cart
		case STORE__USER_PRODUCTS_TYPES.SHOP_CART_ADD:
			return {
				...state,
				isLoading: false,
				cart: payload
			};

		case STORE__USER_PRODUCTS_TYPES.SHOP_CART_CLEAR:
			return {
				...state,
				cart: []
			};

		// Failure fetching cart products/favorites from backend
		case (STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_CART_FAILURE,
		STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_CART_FAILURE,
		STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_FAVORITES_DETAILS_FAILURE,
		STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_FAVORITES_DETAILS_FAILURE):
			return {
				...state,
				isLoading: false,
				error: payload
			};

		// Failure adding products to cart / favorite in redux store
		case (STORE__USER_PRODUCTS_TYPES.SHOP_CART_ADD_FAILURE,
		STORE__USER_PRODUCTS_TYPES.SHOP_FAVORITES_ADD_FAILURE):
			return {
				...state,
				isLoading: false,
				error: payload
			};

		default:
			return state;
	}
};
