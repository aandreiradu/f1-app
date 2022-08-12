import { useReducer, useEffect, useCallback } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

const httpReducer = (state, action) => {
  console.log("useAxiosInterceptors received", state, action);

  switch (action.type) {
    case "SEND":
      return {
        isLoading: true,
        error: null,
        data: null,
      };

    case "RESPONSE":
      return {
        isLoading: false,
        error: null,
        data: action.payload,
      };

    case "ERROR":
      console.log('ERROR TYPE. Payload is ', action.payload);
      return {
        isLoading: false,
        error: action.payload,
      };

    case "CLEAR":
      return initialState;

    default:
      throw new Error(`Unhandled HTTP action : ${action}`);
  }
};

const useAxiosInterceptors = () => {
  const axiosPrivate = useAxiosPrivate();
  const [httpState, dispatch] = useReducer(httpReducer, initialState);

  useEffect(() => {
    console.log("httpState NOWW!!!", httpState);
  }, [httpState]);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const sendRequest = useCallback(
    async (url, method, headers, body) => {
      console.log("RECEIVED", {
        url,
        method,
        body,
        headers,
      });

      dispatch({ type: "SEND" });

      try {
        const response = await axiosPrivate({
          method,
          url,
          data: body,
          headers,
        });
        console.log("response useAxiosInterceptors", response);
        dispatch({ type: "RESPONSE", payload: response?.data });
      } catch (error) {
        console.error("error useAxiosInterceptors", error);
        dispatch({ type: "ERROR", payload: error?.response?.data || error });
      }
    },
    [axiosPrivate]
  );

  return {
    isLoading: httpState.isLoading,
    responseData: httpState.data,
    error: httpState.error,
    sendRequest,
    clear,
  };
};

export default useAxiosInterceptors;
