import { AUTH_TYPES } from './auth.types';
import { createAction } from '../../Utils/reducer/createAction';


export const setAccessToken = (token,fullName,roles) => {
    return createAction(AUTH_TYPES.AUTH_SET_ACCESS_TOKEN,{accessToken : token,fullName,roles});
}

export const refreshToken = (token,fullName,roles) => {
    return createAction(AUTH_TYPES.AUTH_REFRESH_TOKEN,{accessToken : token,fullName,roles});
}

export const logout = () => {
    return createAction(AUTH_TYPES.AUTH_LOGOUT);
}