import { useState,useCallback,useEffect } from "react";
import useHttpInterceptors from './useHttpInterceptors'
import { logout } from "../store/Auth/auth.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


const useLogout = () => {
    const { isLoading,errorLogin,sendRequest,responseData } = useHttpInterceptors();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutResponseInterpreter = useCallback(payload => {
        console.log('logoutResponseInterpreter',payload);
        const { status,statusCode,message } = payload || null;
        
        try {
            // remove the acces token from store and set isAuth to false
            dispatch(logout());
            if((status === 204  || statusCode === 204)  && !message) {
                // no jwt set, just redirect to login
                console.log('no jwt set, redirect to login');
                navigate('/login');
            } else if((status === 204  || statusCode === 204) && message === 'Logout successfully') {
                // user with asociated refresh token not found, just redirect;
                console.log('user with asociated refresh token not found, just redirect');
                navigate('/login');
            } else if ((status || statusCode) === 200 && message === 'Logout completed') {
                // user with attached refresh token found in db, redirect;
                navigate('/login');
            }
        } catch (error) {
            console.error('error logoutResponseInterpreter',error);
            console.log('EROARE ',error?.message);
            console.log('errorLogin',errorLogin);
        }

    },[dispatch,navigate,errorLogin]);

    

    const logoutHandler = useCallback(async () => {
        try {
            sendRequest(
            {
                url : '/logout',
                withCredentials : true,
                method : 'GET'
            },
            (responseLogout) => {
                console.log('responseLogout',responseLogout);
                const { message ,statusCode,status } = responseLogout;
                // const { status, data  } = responseLogout;
                // const { message ,statusCode } = data || null;
                console.log(status,message,statusCode,responseLogout);
                logoutResponseInterpreter({status,message,statusCode,responseLogout});
            })
        } catch (error) {
            console.error('error logout',error);
            console.error('error logoutResponseInterpreter',error);
        }
    },[logoutResponseInterpreter]);


    return {
        errorLogin,
        logoutHandler
    }
};

export default useLogout;