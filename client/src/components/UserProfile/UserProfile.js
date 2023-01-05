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
import { faArrowRight, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../store/Auth/auth.selector';
import { useNavigate, useParams } from 'react-router-dom';
import apiConfig from '../../constants/apiConfig';
import Footer from '../Footer/Footer';

const UserProfile = () => {
	const { username: usernameParams } = useParams();
	const { username, fullName, email, favoriteDriver, favoriteConstructor, imageUrl } =
		useSelector(selectIsAuth);
	console.log({ usernameParams, username, fullName, imageUrl });
	const navigate = useNavigate();

	const goToProfileEditHandler = () => {
		navigate(`/profile/edit/${username}`);
	};

	return (
		<>
			<UserProfileContainer>
				<UserProfilePictureWrapper>
					<UserProfilePicture
						src={
							imageUrl
								? `${apiConfig.baseURL}/${imageUrl}`
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
						<UserProfileHeaderContentItemIcon icon={faCartPlus} />
						<UserProfileHeaderContentItemText>My Cart</UserProfileHeaderContentItemText>
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
						<UserProfileHeaderContentItemIcon icon={faPerson} />
						<UserProfileHeaderContentItemText>
							My Drivers - Coming Soon
						</UserProfileHeaderContentItemText>
					</UserProfileHeaderContentItemWrapping>
					<UserProfileHeaderContentItemArrow icon={faArrowRight} />
				</UserProfileHeaderContentItem>
				<UserProfileHeaderContentItem>
					<UserProfileHeaderContentItemWrapping>
						<UserProfileHeaderContentItemIcon icon={faWrench} />
						<UserProfileHeaderContentItemText>
							My Circuits - Coming Soon
						</UserProfileHeaderContentItemText>
					</UserProfileHeaderContentItemWrapping>
					<UserProfileHeaderContentItemArrow icon={faArrowRight} />
				</UserProfileHeaderContentItem>
				<UserProfileHeaderContentItem>
					<UserProfileHeaderContentItemWrapping>
						<UserProfileHeaderContentItemIcon icon={faWrench} />
						<UserProfileHeaderContentItemText>
							My Bets - Coming Soon
						</UserProfileHeaderContentItemText>
					</UserProfileHeaderContentItemWrapping>
					<UserProfileHeaderContentItemArrow icon={faArrowRight} />
				</UserProfileHeaderContentItem>
			</UserProfileContainer>
			<Footer />
		</>
	);
};

export default UserProfile;
