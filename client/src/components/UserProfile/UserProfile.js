import React from 'react';
import {
	EditProfileBtn,
	UserPorfileInfo,
	UserProfileContainer,
	UserProfileHeaderContentItemWrapping,
	UserProfileHeaderContentItem,
	UserProfileHeaderContentItemArrow,
	UserProfileHeaderContentItemIcon,
	UserProfileHeaderContentItemText,
	UserProfileHeaderTitle,
	UserProfilePicture,
	UserProfilePictureWrapper
} from './UserProfile.styles';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../store/Auth/auth.selector';
import { useNavigate, useParams } from 'react-router-dom';
import { arrayBufferToBase64 } from '../../Utils/arrayToBufferB64';
import Footer from '../Footer/Footer';

const UserProfile = () => {
	const { username: usernameParams } = useParams();
	const { username, fullName, email, favoriteDriver, favoriteConstructor, profilePicture } =
		useSelector(selectIsAuth);
	console.log({ username, fullName, profilePicture });
	const navigate = useNavigate();
	const imageStr = profilePicture?.data && arrayBufferToBase64(profilePicture?.data);

	const goToProfileEditHandler = () => {
		navigate(`/profile/edit/${username}`);
	};

	return (
		<>
			<UserProfileContainer>
				<UserProfilePictureWrapper>
					<UserProfilePicture
						src={
							profilePicture
								? `data:image/png;base64,${imageStr}`
								: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/240px-F1.svg.png'
						}
					/>
				</UserProfilePictureWrapper>
				<UserPorfileInfo>
					<h2>{fullName || 'N/A'}</h2>
					<span>{`@${usernameParams || username}` || 'N/A'}</span>
				</UserPorfileInfo>
				<EditProfileBtn onClick={goToProfileEditHandler}>Edit Profile</EditProfileBtn>

				<UserProfileHeaderTitle>Content</UserProfileHeaderTitle>
				<UserProfileHeaderContentItem>
					<UserProfileHeaderContentItemWrapping>
						<UserProfileHeaderContentItemIcon icon={faPerson} />
						<UserProfileHeaderContentItemText>My Drivers</UserProfileHeaderContentItemText>
					</UserProfileHeaderContentItemWrapping>
					<UserProfileHeaderContentItemArrow icon={faArrowRight} />
				</UserProfileHeaderContentItem>
				<UserProfileHeaderContentItem>
					<UserProfileHeaderContentItemWrapping>
						<UserProfileHeaderContentItemIcon icon={faHeartCircleCheck} />
						<UserProfileHeaderContentItemText>Favorites</UserProfileHeaderContentItemText>
					</UserProfileHeaderContentItemWrapping>
					<UserProfileHeaderContentItemArrow icon={faArrowRight} />
				</UserProfileHeaderContentItem>

				<UserProfileHeaderTitle>News</UserProfileHeaderTitle>
				<UserProfileHeaderContentItem>
					<UserProfileHeaderContentItemWrapping>
						<UserProfileHeaderContentItemIcon icon={faWrench} />
						<UserProfileHeaderContentItemText>Coming Soon</UserProfileHeaderContentItemText>
					</UserProfileHeaderContentItemWrapping>
					<UserProfileHeaderContentItemArrow icon={faArrowRight} />
				</UserProfileHeaderContentItem>
				<UserProfileHeaderContentItem>
					<UserProfileHeaderContentItemWrapping>
						<UserProfileHeaderContentItemIcon icon={faWrench} />
						<UserProfileHeaderContentItemText>Coming Soon</UserProfileHeaderContentItemText>
					</UserProfileHeaderContentItemWrapping>
					<UserProfileHeaderContentItemArrow icon={faArrowRight} />
				</UserProfileHeaderContentItem>
				<UserProfileHeaderContentItem>
					<UserProfileHeaderContentItemWrapping>
						<UserProfileHeaderContentItemIcon icon={faWrench} />
						<UserProfileHeaderContentItemText>Coming Soon</UserProfileHeaderContentItemText>
					</UserProfileHeaderContentItemWrapping>
					<UserProfileHeaderContentItemArrow icon={faArrowRight} />
				</UserProfileHeaderContentItem>
			</UserProfileContainer>
			<Footer />
		</>
	);
};

export default UserProfile;
