import { AUTH_TYPES } from './auth.types';
import { createAction } from '../../Utils/reducer/createAction';


export const setAccessToken = (token) => {
    return createAction(AUTH_TYPES.AUTH_SET_ACCESS_TOKEN,{accessToken : token});
}

export const refreshToken = (token) => {
    return createAction(AUTH_TYPES.AUTH_REFRESH_TOKEN,{accessToken : token});
}

export const logout = () => {
    return createAction(AUTH_TYPES.AUTH_LOGOUT);
}