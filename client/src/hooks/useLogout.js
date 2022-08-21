import { useState,useCallback } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { logout } from "../store/Auth/auth.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';



const useLogout = () => {
    const axiosPrivate = useAxiosPrivate();
    const [errorLogin,setErrorLogin] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutResponseInterpreter = useCallback(payload => {
        console.log('logoutResponseInterpreter',payload);
        const { status,statusCode,message } = payload || null;
        
        try {
            // remove the acces token from store and set isAuth to false
            dispatch(logout());
            if( status === 204 && !message) {
                // no jwt set, just redirect to login
                console.log('no jwt set, redirect to login');
                navigate('/login');
            } else if((status === 204 || statusCode === 204) && message === 'Logout successfully') {
                // user with asociated refresh token not found, just redirect;
                console.log('user with asociated refresh token not found, just redirect');
                navigate('/login');
            } else if ((status === 200 || statusCode === 200) && message === 'Logout completed') {
                // user with attached refresh token found in db, redirect;
                navigate('/login');
            }
        } catch (error) {
            console.error('error logoutResponseInterpreter',error);
            setErrorLogin(error.message || error);
        }

    },[dispatch,navigate]);

    const logoutHandler = useCallback(async () => {
        try {
            const responseLogout = await axiosPrivate.get('/logout',{
                withCredentials : true
            });
            console.log('responseLogout',responseLogout);
            const { status, data : {message,statusCode} } = responseLogout || null;
            
            logoutResponseInterpreter({status,message,statusCode,responseLogout});
        } catch (error) {
            console.error('error logout',error);
            console.error('error logoutResponseInterpreter',error);
            setErrorLogin(error.message || error);
        }
    },[axiosPrivate,logoutResponseInterpreter]);


    return {
        errorLogin,
        logoutHandler
    }
};

export default useLogout;