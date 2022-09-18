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
      console.log("ERROR TYPE. Payload is ", action.payload);
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

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const sendRequest = useCallback( async(requestConfig, applyData) => {
    console.log("sendRequest RECEIVED", requestConfig);
    let formDataReceived = false;
    const {
      method,
      url,
      body,
      headers,
      withCredentials,
      others,
    } = requestConfig || {};
    
    // check for formData payload
    console.log('body is instance of formdata', body?.formData instanceof FormData);
    const formData = new FormData();
    if(body?.formData instanceof FormData) {
      for (const value of body?.formData?.entries()) {
        formData.append([value[0]] , value[1]);
      }
      formDataReceived  = true;
    }
    
    dispatch({ type: "SEND" });

    try {
      console.log('BODY',body);
      const response = await axiosPrivate({
        method,
        url,
        data : !formDataReceived ? body : formData,
        headers,
        withCredentials,
        ...others,
      });
      console.log("response", response);

      // setTimeout(() => {
        dispatch({ type: "RESPONSE", payload: response?.data });
        applyData(response?.data);
      // },10000)
    } catch (error) {
      console.error("error useAxiosInterceptors", error);
      dispatch({ type: "ERROR", payload: error?.response?.data || error });
    }
  }, []);

  return {
    isLoading: httpState.isLoading,
    responseData: httpState.data,
    error: httpState.error,
    sendRequest,
    clear,
  };
};

export default useAxiosInterceptors;
