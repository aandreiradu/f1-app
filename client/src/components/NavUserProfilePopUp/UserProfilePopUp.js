import { useState } from 'react'
import ErrorModal from '../UI/ErrorModal'
import { useSelector } from 'react-redux'
import useLogout from '../../hooks/useLogout'
import { selectFullName, selectUsername } from '../../store/Auth/auth.selector'
import { ProfilerWrapper,ProfilerTriangle,ProfilerLinksWrapper,ProfilerLinks,ProfilerUserName,LogoutLink } from './UserProfilePopUp.styles'

const UserProfilePopUp = (props) => {
  const { active } = props;
  const username  = useSelector(selectUsername);
  console.log('username',username);
  const [showModal,setShowModal] = useState(true)
  const {errorLogin,logoutHandler} = useLogout();
  const fullName = useSelector(selectFullName)?.split(' ')[0];
  console.log('fullName',fullName);

  const confirmErrorModal = () => {
    setShowModal(false);
  };


  return (
    <ProfilerWrapper active={active}>
        <ProfilerTriangle/>
        <ProfilerUserName>{`Welcome, ${fullName || 'Guest'}`}</ProfilerUserName>
        <ProfilerLinksWrapper>
          <ProfilerLinks to={`/profile/${username}`}>My Profile</ProfilerLinks>
          <LogoutLink onClick={() => logoutHandler()}>Logout</LogoutLink>
        </ProfilerLinksWrapper>
        { (errorLogin && showModal) && <ErrorModal title="Ooops!" message={errorLogin} onConfirm={confirmErrorModal}   /> }
    </ProfilerWrapper>
  )
}

export default UserProfilePopUp