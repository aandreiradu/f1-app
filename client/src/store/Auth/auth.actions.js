import { AUTH_TYPES } from './auth.types';
import { createAction } from '../../Utils/reducer/createAction';

export const setAccessToken = (
	token,
	fullName,
	roles,
	username,
	email,
	favoriteConstructor,
	favoriteDriver,
	profilePicture
) => {
	return createAction(AUTH_TYPES.AUTH_SET_ACCESS_TOKEN, {
		accessToken: token,
		fullName,
		roles,
		username,
		email,
		favoriteConstructor,
		favoriteDriver,
		profilePicture
	});
};

export const refreshToken = (
	token,
	fullName,
	roles,
	username,
	email,
	favoriteConstructor,
	favoriteDriver,
	profilePicture
) => {
	return createAction(AUTH_TYPES.AUTH_REFRESH_TOKEN, {
		accessToken: token,
		fullName,
		roles,
		username,
		email,
		favoriteConstructor,
		favoriteDriver,
		profilePicture
	});
};

// export const getUserInfo = (username) => createAction(AUTH_TYPES['AUTH/GET_USER_INFO'],{username});

export const logout = () => {
	return createAction(AUTH_TYPES.AUTH_LOGOUT);
};

export const updateProfilePicture = (profilePicture) =>
	createAction(AUTH_TYPES['PROFILE/UPDATE_PROFILE_PICTURE'], profilePicture);

export const updateProfileInfo = (profileInfo) =>
	createAction(AUTH_TYPES['PROFILE/UPDATE_PROFILE_INFO'], profileInfo);
