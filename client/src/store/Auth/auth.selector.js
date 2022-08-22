import { createSelector } from 'reselect';

const selectAuthReducer = state => state.auth;

export const selectAccessToken = createSelector(
    selectAuthReducer,
    (auth) => auth.accessToken
);

export const selectIsAuthenticated = createSelector(
    selectAuthReducer,
    (auth) => auth.isAuth
)

export const selectIsAuth = createSelector(
    selectAuthReducer,
    (auth) => auth
)

export const selectFullName = createSelector(
    selectAuthReducer,
    (auth) => auth?.fullName
)