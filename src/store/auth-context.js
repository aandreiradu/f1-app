import React, { useEffect, createContext, useState, useCallback } from 'react'

let logoutTimer;

const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});


const calcRemainingTime = (expTime) => {
    const timeNow = new Date().getTime();
    const systemExpTime = new Date(expTime).getTime();

    const remainingDuration = systemExpTime - timeNow;

    return remainingDuration;
}

const getStoredToken = () => {
    const storedToken = localStorage.getItem('token') || null;
    const storedTokenExpTime = localStorage.getItem('expirationTime') || null;

    const remainingTime = calcRemainingTime(storedTokenExpTime);

    if (remainingTime < 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime
    }

}


export const AuthContextProvider = (props) => {
    const tokenData = getStoredToken();
    let initialToken = tokenData?.token;
    const [token, setToken] = useState(initialToken);

    // get stored token - if its already set



    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = calcRemainingTime(expirationTime);

        // set the time out using the calc fn created above;
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }


    useEffect(() => {
        if (tokenData) {
            console.log('tokenData', tokenData);
            // set the logout timer based on stored tokenData.duration
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const context = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }


    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext