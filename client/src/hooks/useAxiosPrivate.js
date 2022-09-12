import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../store/Auth/auth.selector";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const accessToken = useSelector(selectAccessToken);



  // useEffect(() => {
  //   // request interceptor :
  //   const requestIntercept = axiosPrivate.interceptors.request.use(
  //     (config) => {
  //       console.log("config requestIntercept", config);
  //       if((!(config?.headers?.Authorization || config?.headers?.authorization))){
  //         if(config.headers) {
  //           if(!removeAuthorization){
  //             config.headers['Authorization'] = `Bearer ${accessToken}`; //attach on the auth header the existing accessToken;
  //           } else {
  //             console.log("before delete", config.headers);
  //             const filteredHeaders =
  //               config?.headers &&
  //               Object.keys(config.headers)
  //                 .filter(
  //                   (key) =>
  //                     !key.includes("Authorization") ||
  //                     !key.includes("Authorization")
  //                 )
  //                 .reduce((obj, key) => {
  //                   return Object.assign(obj, {
  //                     [key]: obj[key],
  //                   });
  //                 }, {});
  //             console.log("FILTERED HEADERS ", config?.headers);
  //             config.headers = {
  //               ...config?.headers,
  //               ...filteredHeaders,
  //             };
  //             console.log("FILTERED HEADERS RETURN", config?.headers);
  //           }
  //         } 
  //       } else {
  //         console.log('CONFIG HEADERS ELSE',config.headers);
  //         if(removeAuthorization) {
  //           console.log('inainte delete',config.headers);
  //           delete config?.headers?.Authorization;
  //           console.log('dupa delete',config.headers);
  //         }
  //       }
  //       return config;
  //     },
  //     (error) => Promise.reject(error)
  //   );

  //   // response interceptor :
  //   const responseIntercept = axiosPrivate.interceptors.response.use(
  //     (response) => {
  //       // console.log("ok responseInterceptor", response);
  //       return response;
  //     },
  //     async (error) => {
  //       console.log("error responseInterceptor", error);
  //       const prevRequest = error?.config;
  //       if (error?.response?.status === 403 && !prevRequest.sent) {
  //         // console.log(`avem status 403 si prevRequest esteee`, prevRequest);
  //         prevRequest.sent = true;

  //         // generate new access token;
  //         // if(!removeAuthorization) {
  //           console.log('da remove responseIntercept');
  //           const newAccessToken = await refresh();
  //           console.log("new newAccessToken", newAccessToken);
  //           prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            
  //           console.log('prevRequest headers responseIntercept NOW', prevRequest?.headers);
  //           return axiosPrivate(prevRequest);
  //         // }
  //       }

  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     axiosPrivate.interceptors.request.eject(requestIntercept);
  //     axiosPrivate.interceptors.response.eject(responseIntercept);
  //   };
  // }, [refresh, accessToken,removeAuthorization]);


  useEffect(() => {

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log('REQUEST INTERCEPT CONFIG',config);

        if((!(config?.headers?.Authorization || config?.headers?.authorization))){
            console.log('!NU AM AUTHORIZATON IN HEADER!');
            config.headers = {
              ...config?.headers,
              Authorization : `Bearer ${accessToken}`
            }
            console.log('am pus token pe auth', config.headers);
        } else {
          console.log('am authorization, config arata asa',config);
        }
        return config;
      },(error) => Promise.reject(error)
    );


    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => {
        console.log('responseIntercept',response);
        return response;
      },
      async(error) => {
        console.log('error response intercept',error);
        const prevRequest = error?.config;
        if(error?.response?.status === 403 && !prevRequest?.sent){
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers = {
            ...prevRequest.headers,
            Authorization : `Bearer ${newAccessToken}`
          }
          return axiosPrivate(prevRequest);
        } else if(error?.response?.status === 404 && !prevRequest?.sent) {
          return error;
        }

        return Promise.reject(error);
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }

  },[accessToken,refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
