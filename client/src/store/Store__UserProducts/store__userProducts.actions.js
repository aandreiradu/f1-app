import { createAction } from '../../Utils/reducer/createAction';
import { STORE__USER_PRODUCTS_TYPES } from './store__userProducts.types';

// Start
export const fetchShopCartStart = () =>
	createAction(STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_CART_START);

// Success
export const fetchShopCartSuccess = (cartItems) =>
	createAction(STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_CART_SUCCESS, cartItems);

// Failure fetch cartItems from backend
export const fetchShopCartFailure = (error) =>
	createAction(STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_CART_FAILURE, error);

// Add To Cart
export const shopUserAddToCart = (product) =>
	createAction(STORE__USER_PRODUCTS_TYPES.SHOP_CART_ADD, product);

// Failure add to cart
export const shopUserAddToCartFailure = (error) =>
	createAction(STORE__USER_PRODUCTS_TYPES.SHOP_CART_ADD_FAILURE, error);

export const fetchShopFavoritesStart = () =>
	createAction(STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_FAVORITES_START);

export const fetchShopFavoritesSuccess = (payload) => {
	console.log('fetchShopProductsSuccess called with payload', payload);
	return createAction(STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_FAVORITES_SUCESS, payload);
};

// Failure fetch favorite products from backend
export const fetchShopFavoritesFailure = (error) =>
	createAction(STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_FAVORITES_FAILURE, error);

// Add To Favorites
export const shopUserAddToFavorites = (product) =>
	createAction(STORE__USER_PRODUCTS_TYPES.SHOP_FAVORITES_ADD, product);

// Failure add to favorites
export const shopUserAddToFavoritesFailure = (error) =>
	createAction(STORE__USER_PRODUCTS_TYPES.SHOP_FAVORITES_ADD_FAILURE, error);
