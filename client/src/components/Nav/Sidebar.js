import React, { useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import { RiCloseFill, RiUser3Fill } from 'react-icons/ri'
import { useSelector,useDispatch } from 'react-redux';
import { selectIsAuthenticated } from '../../store/Auth/auth.selector';
import classes from './Sidebar.module.css';
import { motion } from 'framer-motion'
import { driverCards } from '../../animationsPresets/animationsPresets'
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { logout } from '../../store/Auth/auth.actions';
import ErrorModal from '../UI/ErrorModal';
import { useState } from 'react';


const Sidebar = (props) => {
    const [errorLogin,setErrorLogin] = useState('');
    const [showModal,setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const isAuthenticted = useSelector(selectIsAuthenticated);
    console.log('sidebar isAuthenticted',isAuthenticted);
    

    const closeSidebarHandle = () => {
        props.onClose();
    }

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
            setShowModal(true);
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
            setShowModal(true);
        }
    },[axiosPrivate,logoutResponseInterpreter]);

    const confirmErrorModal = () => {
        setShowModal(false);
      };

    return (
        <section className={classes.sidebar}>
            <div className={classes['sidebar-header']}>
                <div className={classes['sidebar-menu']}>
                    <RiCloseFill
                        onClick={closeSidebarHandle}
                        className={`${classes['sidebar-icon']} ${classes['closeMenu']}`} />
                </div>
                <div className={classes['sidebar-logo']}>
                    <motion.svg className={classes.svg}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 560 400"
                    >
                        <motion.path
                            d="M403.26,245h1.88v-8.68h0.03l3.12,8.68h1.62l3.12-8.68h0.03V245h1.88v-11.25h-2.74l-3.02,8.8h-0.03l-3.1-8.8
                            h-2.77V245z M392.88,235.45h3.56V245h1.97v-9.55h3.58v-1.7h-9.1V235.45z M370,245l90-90h-54.17l-89.99,90L370,245L370,245z
                            M357.09,194.19H248.15c-33.2,0-39.01,1.76-53.24,15.98C181.61,223.48,160,245,160,245h47.19l11.26-11.26
                            c7.4-7.4,11.22-8.17,26.76-8.17h80.5L357.09,194.19L357.09,194.19L357.09,194.19z M193.46,203.76c-9.82,9.27-31.2,30.03-42.72,41.24
                            H100c0,0,40.65-40.54,63.25-62.78c23.28-22.16,34.89-27.21,77.59-27.21h155.44l-33.66,33.66H244.01
                            C214,188.66,207.26,190.74,193.46,203.76L193.46,203.76z"
                            variants={driverCards.icon}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                default: { duration: 2, ease: "easeInOut" },
                                fill: { duration: 1.25, ease: [1, 0, 0.8, 1] }
                            }}
                        >
                        </motion.path>
                    </motion.svg>
                </div>
                <div className={classes['user-login']}>
                    <RiUser3Fill className={classes['sidebar-icon']} />
                </div>
            </div>
            { (errorLogin && showModal) && <ErrorModal title="Ooops!" message={errorLogin} onConfirm={confirmErrorModal}   /> }
            <ul className={`${classes['sidebar-links']} defaultTransition .defaultTransition-M1`}>
                <li className={`${classes['sidebar-link-item']}`}>
                    <Link onClick={() => props.onClose()} to='race-results/last'>Latest</Link>
                    <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className={`${classes['sidebar-link-item']}`}>
                    <Link onClick={() => props.onClose()} to='schedule/last'>Schedule</Link>
                    <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className={`${classes['sidebar-link-item']} `}>
                    <Link onClick={() => props.onClose()} to='/standings'>Standings</Link>
                    <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className={`${classes['sidebar-link-item']}`}>
                    <Link onClick={() => props.onClose()} to='teams'>Teams</Link>
                    <i className="fa-solid fa-chevron-right"></i>
                </li>
            </ul>
            <div className={`${classes['sidebar-login']} defaultTransition defaultTransition-P1`}>
                <div className={classes['sidebar-log']}>
                    <RiUser3Fill className={classes['sidebar-icon']} />
                    {isAuthenticted && <span onClick={logoutHandler}>LOG OUT</span> }
                </div>
            </div>
        </section>
    )
}

export default Sidebar