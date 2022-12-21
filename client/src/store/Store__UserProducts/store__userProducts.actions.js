import { createAction } from '../../Utils/reducer/createAction';
import { STORE__USER_PRODUCTS_TYPES } from './store__userProducts.types';

// Start
export const fetchShopCartStart = () =>
	createAction(STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_CART_START);
export const fetchShopFavoritesStart = () =>
	createAction(STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_FAVORITES_START);

// Success
export const fetchShopCartSuccess = (cartItems) =>
	createAction(STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_CART_SUCCESS, cartItems);
export const fetchShopFavoritesSuccess = (favItems) => {
	createAction(STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_FAVORITES_SUCESS, favItems);
};

// Add To Cart
export const shopUserAddToCart = (product) =>
	createAction(STORE__USER_PRODUCTS_TYPES.SHOP_CART_ADD, product);

// Add To Favorites
export const shopUserAddToFavorites = (product) =>
	createAction(STORE__USER_PRODUCTS_TYPES.SHOP_FAVORITES_ADD, product);

// Failure fetch cartItems from backend
export const fetchShopCartFailure = (error) =>
	createAction(STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_CART_FAILURE, error);

// Failure fetch favorite products from backend
export const fetchShopFavoritesFailure = (error) =>
	createAction(STORE__USER_PRODUCTS_TYPES.FETCH_SHOP_FAVORITES_FAILURE, error);

// Failure add to favorites
export const shopUserAddToFavoritesFailure = (error) =>
	createAction(STORE__USER_PRODUCTS_TYPES.SHOP_FAVORITES_ADD_FAILURE, error);

// Failure add to cart
export const shopUserAddToCartFailure = (error) =>
	createAction(STORE__USER_PRODUCTS_TYPES.SHOP_CART_ADD_FAILURE, error);
