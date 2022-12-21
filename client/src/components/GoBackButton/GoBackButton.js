import React from 'react';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { GoBackArrow, GoBackContainer } from './GoBackButton.styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GoBackButton = () => {
	console.log('GoBackButton render');
	const location = useLocation();
	const navigate = useNavigate();

	console.log('@@location', location);
	console.log('@@navigate', navigate);
	// const [isVisible, setIsVisible] = useState(false);

	// const listenToSroll = () => {
	// 	// const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	// 	// const showButtonValue = 200;

	// 	if (/*winScroll >= showButtonValue &&*/ location?.pathname !== '/') {
	// 		setIsVisible(true);
	// 	} else {
	// 		setIsVisible(false);
	// 	}
	// };

	// useEffect(() => {
	// 	window.addEventListener('scroll', listenToSroll);
	// 	console.log('location', location);

	// 	return () => {
	// 		window.removeEventListener('scroll', listenToSroll);
	// 	};
	// }, [location.pathname]);

	// useEffect(() => {
	// 	console.log('isVisible', isVisible);
	// }, [isVisible]);

	return (
		<>
			{location?.pathname !== '/' && (
				<GoBackContainer isVisible={location?.pathname !== '/'} onClick={() => navigate(-1)}>
					<GoBackArrow icon={faArrowLeftLong} />
				</GoBackContainer>
			)}
		</>
	);
};

export default GoBackButton;
