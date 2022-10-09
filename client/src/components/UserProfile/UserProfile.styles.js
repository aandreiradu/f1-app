import styled from 'styled-components';
import { ReactComponent as DefaultProfilePicture } from '../../assets/f1_logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const UserProfileContainer = styled.main`
	width: 100%;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 80px;
`;

export const UserProfilePictureWrapper = styled.div`
	margin: 20px 0 10px 0;
	border-radius: 50%;
	background-color: #fff;
	position: relative;
	width: 80px;
	height: 80px;
`;

// export const UserProfilePicture = styled(DefaultProfilePicture)`
//     width: 80px;
//     height: 60px;
//     padding: 5px;
// `
export const UserProfilePicture = styled.img`
	width: 80px;
	height: 80px;
	/* padding: 5px; */
	object-fit: contain;
	border-radius: 50%;
`;

export const UserPorfileInfo = styled.div`
	width: 100%;
	color: #fff;
	text-align: center;
	margin-bottom: 10px;

	& h2 {
		font-weight: bold;
		font-size: 1.5rem;
	}

	& span {
		font-weight: 500;
		font-size: 1rem;
		font-style: italic;
	}
`;

export const EditProfileBtn = styled.button`
	background-color: #e10600;
	outline: none;
	border: none;
	padding: 0.25rem;
	border-radius: 7px;
	cursor: pointer;
	color: #fff;
	font-size: 1rem;

	&:focus,
	&:active {
		outline: none;
	}

	/* margin: 30px 0 5px 0; */
	margin-bottom: 30px;
`;

export const UserProfileHeaderTitle = styled.p`
	margin-top: 10px;
	background-color: #d0d0d0;
	width: 100%;
	padding: 0.5rem 0.25rem;
	font-size: 1.2rem;
	color: #000;
`;

export const UserProfileHeaderContentItem = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	background-color: #fff;
	padding: 0.55rem 1rem 0.45rem 0.25rem;
	color: #000;
`;

export const UserProfileHeaderContentItemWrapping = styled.div`
	display: flex;
	flex: 1;
`;

export const UserProfileHeaderContentItemIcon = styled(FontAwesomeIcon)`
	width: 35px;
	height: 20px;
	margin-right: 5px;
`;

export const UserProfileHeaderContentItemText = styled.span`
	font-size: 1.1rem;
	line-height: 1;
`;

export const UserProfileHeaderContentItemArrow = styled(FontAwesomeIcon)`
	flex: 0;
	width: 35px;
	height: 20px;
`;
