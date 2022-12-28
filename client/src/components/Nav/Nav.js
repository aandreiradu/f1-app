import { faHeart as EmptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { RiMenu2Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { driverCards } from '../../animationsPresets/animationsPresets';
import { selectFavAndCartCounter } from '../../store/Auth/auth.selector';
import Badge from '../Badge/Badge';
import GoBackButton from '../GoBackButton/GoBackButton';
import classes from './Nav.module.css';
import Sidebar from './Sidebar';

const Nav = () => {
	const { favoriteProductsCount, cartItemsCount } = useSelector(selectFavAndCartCounter);
	console.log({ favoriteProductsCount, cartItemsCount });
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const [showProfiler, setShowProfiler] = useState(false);

	const menuOpenHandler = () => {
		setMenuOpen((prevState) => !prevState);
	};

	const handleProfiler = (event) => {
		event.stopPropagation();
		setShowProfiler((prev) => !prev);
	};

	const justOpenProfiler = () => setShowProfiler(true);

	const redirectFromNav = (iconName) => {
		switch (iconName) {
			case 'favorites': {
				console.log('redirect to favorites');
				navigate('/shop/favorites');
				break;
			}

			case 'cart': {
				console.log('redirect to cart');
				navigate('/shop/cart');
				break;
			}

			default:
				console.log(`Unhandled redirect for ${iconName}`);
				break;
		}
	};

	if (menuOpen) {
		return <Sidebar onClose={menuOpenHandler} onProfiler={justOpenProfiler} />;
	} else {
		return (
			<>
				<nav className={classes.nav}>
					<div className={classes.navContent}>
						<div className={classes['hamburgerMenu']}>
							<RiMenu2Line onClick={menuOpenHandler} />
						</div>
						<div className={`${classes.logo} ${classes.item}`}>
							{/* <img src={imageSrc} alt='logo' /> */}
							<Link to={'/'}>
								<motion.svg
									className={classes.svg}
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
											default: { duration: 1.2, ease: 'easeInOut' },
											fill: { duration: 1.25, ease: [1, 0, 0.8, 1] }
										}}
									></motion.path>
								</motion.svg>
							</Link>
						</div>
						<div className={classes['nav-right']}>
							{/* <div className={classes['user-login']} onClick={handleProfiler}>
								<RiUser3Fill />
								{showProfiler && <UserProfilePopUp active={showProfiler} />}
							</div> */}
							<div className={classes['icon__badge']}>
								{/* <img src={HeartSVG} alt="" className={classes['icon__navRight']} /> */}
								<FontAwesomeIcon
									width="30px"
									height="25px"
									cursor="pointer"
									color="#fff"
									icon={EmptyHeart}
									onClick={redirectFromNav.bind(this, 'favorites')}
								/>
								<Badge count={favoriteProductsCount || ''} />
							</div>
							<div className={classes['icon__badge']}>
								{/* <img src={HeartSVG} alt="" className={classes['icon__navRight']} /> */}
								<FontAwesomeIcon
									width="30px"
									height="25px"
									cursor="pointer"
									color="#fff"
									icon={faCartPlus}
									onClick={redirectFromNav.bind(this, 'cart')}
								/>
								<Badge count={cartItemsCount || ''} />
							</div>
						</div>
					</div>
				</nav>
				<GoBackButton />
			</>
		);
	}
};

export default Nav;
