import { createSelector } from 'reselect';

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

export const selectFavItemById = (id) =>
	createSelector(shopUserReducer, (state) => {
		console.log('looking into fav store if we can find item with id', state.favoriteStoreItems, id);
		const favItem = state?.favoriteStoreItems?.find((p) => p?.product?._id === id);
		console.log('favItem', favItem);

		return favItem;
	});
