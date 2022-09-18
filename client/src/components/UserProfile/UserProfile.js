import React from 'react'
import { EditProfileBtn, UserPorfileInfo, UserProfileContainer,UserProfileHeaderContentItemWrapping, UserProfileHeaderContentItem, UserProfileHeaderContentItemArrow, UserProfileHeaderContentItemIcon, UserProfileHeaderContentItemText, UserProfileHeaderTitle, UserProfilePicture,UserProfilePictureWrapper } from './UserProfile.styles';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../store/Auth/auth.selector';
import { useNavigate } from 'react-router-dom';

export const arrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

const UserProfile = () => {
  const navigate = useNavigate();
  const { username,fullName,email,favoriteDriver,favoriteConstructor,profilePicture } = useSelector(selectIsAuth);
  console.log({username,fullName,profilePicture});
  const imageStr = profilePicture?.data && arrayBufferToBase64(profilePicture?.data);
  console.log('imageStr',imageStr);

  const goToProfileEditHandler = () => {
    navigate(`/profile/edit/${username}`)
  }

  return (
    <UserProfileContainer>
      <UserProfilePictureWrapper>
        <UserProfilePicture src={profilePicture ? `data:image/png;base64,${imageStr}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/240px-F1.svg.png'} />
      </UserProfilePictureWrapper>
      <UserPorfileInfo>
        <h2>{fullName || 'N/A'}</h2>
        <span>{`@${username}` || 'N/A'}</span>
      </UserPorfileInfo>
      <EditProfileBtn onClick={goToProfileEditHandler}>Edit Profile</EditProfileBtn>

      <UserProfileHeaderTitle>Content</UserProfileHeaderTitle>
            <UserProfileHeaderContentItem>
        <UserProfileHeaderContentItemWrapping>
          <UserProfileHeaderContentItemIcon icon={faPerson} />
          <UserProfileHeaderContentItemText>
            My Drivers
          </UserProfileHeaderContentItemText>
        </UserProfileHeaderContentItemWrapping>
        <UserProfileHeaderContentItemArrow icon={faArrowRight} />
      </UserProfileHeaderContentItem>
      <UserProfileHeaderContentItem>
        <UserProfileHeaderContentItemWrapping>
          <UserProfileHeaderContentItemIcon icon={faHeartCircleCheck} />
          <UserProfileHeaderContentItemText>
            Favorites
          </UserProfileHeaderContentItemText>
        </UserProfileHeaderContentItemWrapping>
        <UserProfileHeaderContentItemArrow icon={faArrowRight} />
      </UserProfileHeaderContentItem>

      <UserProfileHeaderTitle>News</UserProfileHeaderTitle>
      <UserProfileHeaderContentItem>
        <UserProfileHeaderContentItemWrapping>
          <UserProfileHeaderContentItemIcon icon={faWrench} />
          <UserProfileHeaderContentItemText>
            Coming Soon
          </UserProfileHeaderContentItemText>
        </UserProfileHeaderContentItemWrapping>
        <UserProfileHeaderContentItemArrow icon={faArrowRight} />
      </UserProfileHeaderContentItem>
      <UserProfileHeaderContentItem>
        <UserProfileHeaderContentItemWrapping>
          <UserProfileHeaderContentItemIcon icon={faWrench} />
          <UserProfileHeaderContentItemText>
            Coming Soon
          </UserProfileHeaderContentItemText>
        </UserProfileHeaderContentItemWrapping>
        <UserProfileHeaderContentItemArrow icon={faArrowRight} />
      </UserProfileHeaderContentItem>
      <UserProfileHeaderContentItem>
        <UserProfileHeaderContentItemWrapping>
          <UserProfileHeaderContentItemIcon icon={faWrench} />
          <UserProfileHeaderContentItemText>
            Coming Soon
          </UserProfileHeaderContentItemText>
        </UserProfileHeaderContentItemWrapping>
        <UserProfileHeaderContentItemArrow icon={faArrowRight} />
      </UserProfileHeaderContentItem>
    </UserProfileContainer>
  );
}

export default UserProfile