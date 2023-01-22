import { createAction } from '../../Utils/reducer/createAction';
import { SHOP_PRODUCTS_TYPES } from './shopProduct.types';

export const fetchShopProductsStart = () =>
	createAction(SHOP_PRODUCTS_TYPES.FETCH_SHOP_PRODUCTS_START);

export const fetchShopProductsSuccess = (payload) => {
	console.log('fetchShopProductsSuccess called with payload', payload);
	return createAction(SHOP_PRODUCTS_TYPES.FETCH_SHOP_PRODUCTS_SUCCESS, {
		products: payload?.products || [],
		totalProducts: payload?.totalProducts || 0
	});
};

export const fetchShopProductsFailure = (error) =>
	createAction(SHOP_PRODUCTS_TYPES.FETCH_SHOP_PRODUCTS_FAILURE, error);

export const shopProductsChangePageNo = (pageNumber) =>
	createAction(SHOP_PRODUCTS_TYPES.SHOP_PRODUCTS_CHANGE_PAGENO, pageNumber);

export const fetchShopProductsQuery = (products) =>
	createAction(SHOP_PRODUCTS_TYPES.FETCH_SHOP_PRODUCTS_QUERY, products);
