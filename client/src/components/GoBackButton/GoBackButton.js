import React from 'react';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { GoBackArrow, GoBackContainer } from './GoBackButton.styles';
import { useLocation, useNavigate } from 'react-router-dom';

const GoBackButton = () => {
	const location = useLocation();
	const navigate = useNavigate();

	console.log('location', location);

	console.log('isinchCKECOUT', location?.pathname.includes('/checkout/succes'));

	return (
		<>
			{location?.pathname !== '/' && !location?.pathname.includes('/checkout/succes') && (
				<GoBackContainer isVisible={location?.pathname !== '/'} onClick={() => navigate(-1)}>
					<GoBackArrow icon={faArrowLeftLong} />
				</GoBackContainer>
			)}
		</>
	);
};

export default GoBackButton;
