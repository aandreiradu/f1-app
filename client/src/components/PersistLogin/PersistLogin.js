import { useState,useEffect } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../store/Auth/auth.selector';
import Loader from '../Loader/Loader';
import { Outlet, useNavigate } from 'react-router-dom';


const Persist = () => {
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const auth = useSelector(selectIsAuth);

    
    useEffect(() => {
        console.log('Persist effect run');
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();

            } catch (error){
                console.log('error Persist',error);
                if(error.response && error.response.data) {
                    const { response : {data : {message, statusCode}} } = error || null;
                    if(message === 'Unauthorized' && statusCode === 401) {
                        console.log('user is not logged in');
                        navigate('/login');
                    }
                }

                navigate('/login');

            } finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;

    },[]);

    useEffect(() => {
        console.log('isLoading Persist',isLoading);
        console.log('aT',auth?.accessToken);
    },[isLoading]);


    return (
        <>
            {
                isLoading
                ? <Loader/>
                : <Outlet/>
            }
        </>
    )
};

export default Persist;