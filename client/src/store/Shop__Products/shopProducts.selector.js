import { createSelector } from 'reselect';

const shopProductsReducer = (state) => state.shopProducts;

export const selectProducts = createSelector(shopProductsReducer, (shopProducts) => {
	return {
		products: shopProducts.products,
		productsPage: shopProducts.productsPage,
		totalProducts: shopProducts.totalProducts,
		cachedPages: shopProducts.cachedPages
	};
});
