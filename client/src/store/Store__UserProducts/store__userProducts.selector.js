import { createSelector } from 'reselect';
import { STORE__USER_PRODUCTS_TYPES } from './store__userProducts.types';

const shopUserReducer = (state) => state.shopUser;

export const selectCart = createSelector(shopUserReducer, (state) => {
	return {
		cart: state.cart,
		isLoading: state.isLoading,
		error: state.error
	};
});

export const selectFavoriteItems = createSelector(shopUserReducer, (state) => {
	return {
		favoriteStoreItems: state.favoriteStoreItems,
		isLoading: state.isLoading,
		error: state.error
	};
});
