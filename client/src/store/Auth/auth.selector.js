import { createSelector } from 'reselect';

const selectAuthReducer = (state) => state.auth;

export const selectAccessToken = createSelector(selectAuthReducer, (auth) => auth.accessToken);

export const selectIsAuthenticated = createSelector(selectAuthReducer, (auth) => auth.isAuth);

export const selectIsAuth = createSelector(selectAuthReducer, (auth) => auth);

export const selectFullName = createSelector(selectAuthReducer, (auth) => auth?.fullName);

export const selectUsername = createSelector(selectAuthReducer, (auth) => auth?.username);

export const selectProfilePicture = createSelector(
	selectAuthReducer,
	(auth) => auth?.profilePicture
);

export const selectIsAdmin = createSelector(selectAuthReducer, (auth) => {
	console.log('auth', auth);
	const { isAdmin, isAuth } = auth;

	console.log('isAdmin && isAuth', isAdmin && isAuth);
	return isAdmin && isAuth;
});

export const selectFavAndCartCounter = createSelector(selectAuthReducer, (auth) => {
	const { favoriteProductsCount, cartItemsCount } = auth;

	console.log('auth hereee', auth);
	return { favoriteProductsCount, cartItemsCount };
});
