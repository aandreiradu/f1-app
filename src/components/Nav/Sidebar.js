import React, { useEffect, useContext} from 'react'
import { RiCloseFill, RiUser3Fill } from 'react-icons/ri'
import classes from './Sidebar.module.css';
import { motion } from 'framer-motion'
import { driverCards } from '../../animationsPresets/animationsPresets'
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context'

const Sidebar = (props) => {
    const authCtx = useContext(AuthContext);
    const {isLoggedIn,logout} = authCtx;
    console.log(authCtx);
    // const { open } = props;
    // console.log("open", open);

    const closeSidebarHandle = () => {
        props.onClose();
    }



    // const sideBarItemsCS = open ? `${classes['sidebar-link-item']} ${classes['show']}` : `${classes['sidebar-link-item']}`;
    // const ulSide = open ? `${classes['sidebar-links']} ${classes['show']}` : `${classes['sidebar-links']}`;

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
            {/* <ul className={classes['sidebar-links']}> */}
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
                    <Link onClick={() => props.onClose()} to='/standings'>Standins</Link>
                    <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className={`${classes['sidebar-link-item']}`}>
                    <Link onClick={() => props.onClose()} to='teams'>Teams</Link>
                    <i className="fa-solid fa-chevron-right"></i>
                </li>
            </ul>
            <div className={`${classes['sidebar-login']} defaultTransition defaultTransition-P1`}>
                {/* <div className={classes['sidebar-auth']}>
                    <RiUser3Fill className={classes['sidebar-icon']} />
                    <Link to={'/'}>SIGN IN</Link>
                </div> */}
                <div className={classes['sidebar-log']}>
                    <RiUser3Fill className={classes['sidebar-icon']} />
                    {isLoggedIn && <Link onClick={logout} to={'/'}>LOG OUT</Link> }
                </div>
            </div>
        </section>
    )
}

export default Sidebar