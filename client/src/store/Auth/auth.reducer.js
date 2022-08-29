import { AUTH_TYPES } from "./auth.types";

const initialState = {
  accessToken: null,
  isAuth: false,
  fullName : null,
  roles : []
};

export const authReducer = (state = initialState, action = {}) => {
  console.log("authReducer received", state, action);
  const { type, payload } = action;

  switch (type) {
    case AUTH_TYPES.AUTH_SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload.accessToken,
        fullName : payload.fullName,
        roles : [
          ...state.roles,
          ...payload?.roles
        ],
        isAuth: true,
      };

    case AUTH_TYPES.AUTH_REFRESH_TOKEN:
      return {
        ...state,
        isAuth : true,
        accessToken: payload.accessToken,
        fullName : payload.fullName,
        roles : [
          ...state.roles,
          ...payload.roles
        ]
      };

    case AUTH_TYPES.AUTH_LOGOUT:
      return {
        ...state,
        accessToken: null,
        roles : [],
        isAuth: false,
      };

    default:
      return state;
  }
};