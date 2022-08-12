import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../store/Auth/auth.selector";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    // request interceptor :
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // console.log("config requestIntercept", config);
        if (
          !(config?.headers["Authorization"] || config?.headers["Authorization"])
        ) {
          // console.log("nu este setat auth header");
          config.headers["Authorization"] = `Bearer ${accessToken}`; //attach on the auth header the existing accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // response interceptor :
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        // console.log("ok responseInterceptor", response);
        return response;
      },
      async (error) => {
        console.log("error responseInterceptor", error);
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          // console.log(`avem status 403 si prevRequest esteee`, prevRequest);
          prevRequest.sent = true;

          // generate new access token;
          const newAccessToken = await refresh();
          console.log("new newAccessToken", newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          // console.log("axios private", prevRequest);
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
