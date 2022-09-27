import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditProfileBtn, UserProfileContainer } from '../UserProfile/UserProfile.styles';
import { ProfilerFade } from '../NavUserProfilePopUp/UserProfilePopUp.styles';

export const EditProfileContainer = styled(UserProfileContainer)`
	padding: 0 1rem;
	/* background-color: #767575; */
	height: 85vh;
	position: relative;
`;

export const ChangeProfilePictureLabel = styled.label`
	position: absolute;
	left: 65px;
	top: 53px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	margin-bottom: 0;
	border-radius: 100%;
	background: #ffffff;
	border: 1px solid transparent;
	box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
	cursor: pointer;
	font-weight: normal;
	transition: all 0.2s ease-in-out;

	&:after {
		content: '🤳🏻';
		color: #757575;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&:hover {
		/* background: #f1f1f1; */
		border-color: #d6d6d6;
	}
`;

export const ChangeProfilePicture = styled.input`
	display: none;
`;

export const EditProfileInputGroup = styled.div`
	width: 100%;
	margin: 20px 0 5px 0;
	display: flex;
	flex-direction: column;

	border-bottom: 1px solid;
	border-color: #fff;
	border-color: ${(props) => props.valid};
	transition: border-color 0.25s ease-in;
`;

export const EditProfileLabel = styled.label`
	color: #fff;
	padding: 0 0.25rem;
	font-size: 14px;
`;

export const EditProfileInputIconWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const EditProfileInput = styled.input`
	color: #fff;
	font-size: 1rem;
	padding: 0.25rem;
	border: none;
	background-color: transparent;
	display: flex;
	flex: 1;

	outline: none;

	&:focus,
	&:active {
		outline: none;
	}

	&::placeholder {
		color: #ccc;
		font-size: 12px;
		font-style: italic;
	}
`;

export const EditProfileInputIcon = styled(FontAwesomeIcon)`
	width: 20px;
	height: 20px;
	flex: 0;
	color: ${(props) => (props.valid ? '#42ea42' : '#e10600')};
	transition: color 0.25s ease-in;
`;

export const EditProfileErrorText = styled.p`
	font-size: 12px;
	color: #e10600;
	text-align: left;
	width: 100%;
	animation: ${ProfilerFade} 0.5s linear;
`;

export const SaveChangesBtn = styled(EditProfileBtn)`
	position: absolute;
	bottom: 0;
	margin: 20px 0;
	width: 150px;
	font-size: 1rem;
	transition: all 0.5s linear;

	&:disabled {
		background-color: #ccc;
		color: #000;
	}
`;

// ok green #42ea42
