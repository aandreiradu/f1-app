import { AUTH_TYPES } from "./auth.types";

const initialState = {
  accessToken: null,
  isAuth: false,
};

export const authReducer = (state = initialState, action = {}) => {
  console.log("authReducer received", state, action);
  const { type, payload } = action;

  switch (type) {
    case AUTH_TYPES.AUTH_SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload.accessToken,
        isAuth: true,
      };

    case AUTH_TYPES.AUTH_REFRESH_TOKEN:
      return {
        ...state,
        accessToken: payload.accessToken,
      };

    case AUTH_TYPES.AUTH_LOGOUT:
      return {
        ...state,
        accessToken: null,
        isAuth: false,
      };

    default:
      return state;
  }
};