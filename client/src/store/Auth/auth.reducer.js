import { AUTH_TYPES } from './auth.types';

const initialState = {
	accessToken: null,
	isAuth: false,
	fullName: null,
	username: null,
	roles: [],
	email: null,
	favoriteDriver: null,
	favoriteConstructor: null,
	imageUrl: null,
	isAdmin: null,
	favoriteProductsCount: 0,
	cartItemsCount: 0
};

export const authReducer = (state = initialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case AUTH_TYPES.AUTH_SET_ACCESS_TOKEN:
			return {
				...state,
				accessToken: payload.accessToken,
				fullName: payload.fullName,
				username: payload.username,
				roles: [...state.roles, ...payload?.roles],
				isAuth: true,
				email: payload.email,
				favoriteDriver: payload.favoriteDriver,
				favoriteConstructor: payload.favoriteConstructor,
				imageUrl: payload.imageUrl,
				isAdmin: payload.isAdmin,
				favoriteProductsCount: payload.favoriteProductsCount,
				cartItemsCount: payload.cartItemsCount
			};

		case AUTH_TYPES.AUTH_REFRESH_TOKEN:
			return {
				...state,
				isAuth: true,
				accessToken: payload.accessToken,
				fullName: payload.fullName,
				username: payload.username,
				roles: [...state.roles, ...payload.roles],
				email: payload.email,
				favoriteDriver: payload.favoriteDriver,
				favoriteConstructor: payload.favoriteConstructor,
				imageUrl: payload.imageUrl,
				isAdmin: payload.isAdmin,
				favoriteProductsCount: payload.favoriteProductsCount,
				cartItemsCount: payload.cartItemsCount
			};

		case AUTH_TYPES['AUTH/GET_USER_INFO']:
			return {
				...state,
				fullName: payload.fullName,
				username: payload.username,
				email: payload.email,
				favoriteDriver: payload.favoriteDriver,
				favoriteConstructor: payload.favoriteConstructor
			};

		case AUTH_TYPES['PROFILE/UPDATE_PROFILE_PICTURE']:
			return {
				...state,
				imageUrl: payload.imageUrl
			};

		case AUTH_TYPES['PROFILE/UPDATE_PROFILE_INFO']:
			return {
				...state,
				...payload
			};

		case AUTH_TYPES.AUTH_LOGOUT:
			return {
				...state,
				accessToken: null,
				isAuth: false,
				fullName: null,
				username: null,
				roles: [],
				email: null,
				favoriteDriver: null,
				favoriteConstructor: null,
				imageUrl: null,
				isAdmin: null,
				favoriteProductsCount: 0,
				cartItemsCount: 0
			};

		case AUTH_TYPES['SHOP/UPDATE_FAV_ITEMS_COUNT']:
			return {
				...state,
				favoriteProductsCount: payload
			};

		case AUTH_TYPES['SHOP/UPDATE_CART_ITEMS_COUNT']:
			return {
				...state,
				cartItemsCount: payload
			};

		default:
			return state;
	}
};
