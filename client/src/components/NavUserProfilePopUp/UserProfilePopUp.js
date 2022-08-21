import React from 'react'
import { useSelector } from 'react-redux'
import { selectFullName } from '../../store/Auth/auth.selector'
import { ProfilerWrapper,ProfilerTriangle,ProfilerLinksWrapper,ProfilerLinks,ProfilerUserName } from './UserProfilePopUp.styles'

const UserProfilePopUp = () => {
  const fullName = useSelector(selectFullName)?.split(' ')[0];
  console.log('fullName',fullName);
  return (
    <ProfilerWrapper>
        <ProfilerTriangle/>
        <ProfilerUserName>{`Welcome, ${fullName || 'Guest'}`}</ProfilerUserName>
        <ProfilerLinksWrapper>
          <ProfilerLinks to={'/'}>My Profile</ProfilerLinks>
          <ProfilerLinks to={'/'}>My Drivers</ProfilerLinks>
          <ProfilerLinks to={'/'}>Logout</ProfilerLinks>
        </ProfilerLinksWrapper>
    </ProfilerWrapper>
  )
}

export default UserProfilePopUp