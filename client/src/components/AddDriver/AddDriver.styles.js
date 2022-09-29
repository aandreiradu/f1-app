import styled from 'styled-components';
import {
	UserProfileContainer,
	UserProfilePictureWrapper,
	UserProfilePicture,
	UserPorfileInfo
} from '../UserProfile/UserProfile.styles';

import {
	ChangeProfilePictureLabel,
	ChangeProfilePicture
} from '../../components/UserProfileEdit/UserProfileEdit.styles';

export const AddDriverContainer = styled(UserProfileContainer)`
	/* background: tomato; */
	padding: 0 2rem;
	margin-bottom: 60px;
`;

export const AddDriverPictureWrapper = styled(UserProfilePictureWrapper)``;

export const AddDriverProfilePicture = styled(UserProfilePicture)`
	height: unset;
	object-fit: conver;
`;

export const AddDriverPictureLabel = styled(ChangeProfilePictureLabel)``;

export const AddDriverPicture = styled(ChangeProfilePicture)``;

export const AddDriverInfo = styled(UserPorfileInfo)``;
