import LoaderIcon from '../LoaderReusable/LoaderIcon';
import { updateProfilePicture } from "../../store/Auth/auth.actions";
import ErrorModal from '../../components/UI/ErrorModal';
import { acceptedExtensions } from '../../Utils/acceptedProfilePictureExtensions';
import { selectIsAuth } from "../../store/Auth/auth.selector";
import { useLocation } from "react-router-dom";
import {
  UserProfilePictureWrapper,
  UserProfilePicture,
  UserPorfileInfo,
} from "../UserProfile/UserProfile.styles";
import {
  SaveChangesBtn,
  ChangeProfilePictureLabel,
  EditProfileContainer,
  ChangeProfilePicture,
} from "./UserProfileEdit.styles";
import UserProfileEditItem from "./UserProfileEditItem";
import { validateUserame,validateName,validateEmail,validatePassword } from '../../Utils/validators';
import useInput from "../../hooks/useInput";
import { useSelector } from "react-redux";
import { constructorsSelector } from "../../store/Teams/teams.selector";
import { buildTeams } from "../../Utils/buildTeams";
import useAxiosInterceptors from "../../hooks/useHttpInterceptors";
import { useDispatch } from "react-redux"; 
import { arrayBufferToBase64 } from '../UserProfile/UserProfile';
import { useState } from "react";

const UserProfileEdit = () => {
  const [showErrorModal,setShowErrorModal] = useState({});
  const dispatch = useDispatch();
  const { sendRequest, isLoading, error, responseData } = useAxiosInterceptors();
  const location = useLocation();
  const { fullName, username, email, favoriteConstructor, favoriteDriver } = location?.state;
  console.log("location", location.state);

  // profile picture area start
  let { accessToken, profilePicture } = useSelector(selectIsAuth);
  console.log("profilePicture", profilePicture);
  const imageStr =
    profilePicture?.data && arrayBufferToBase64(profilePicture?.data);
  // profile picture area end

  // profile picture area start;
  const selectTeams = useSelector(constructorsSelector);
  console.log("selectTeams", selectTeams);
  let teamsNames;
  if (selectTeams?.length > 0) {
    teamsNames = buildTeams(selectTeams);
  }
  console.log("teamsNames", teamsNames);
  // profile picture area end;

  let {
    value: fullNameValue,
    isValid: fullNameIsValid,
    changeHandler: fullNameChangeHandler,
    blurHandler: fullNameBlurHandler,
    hasError: fullNameHasError,
    reset: fullNameReset,
    isTouched: fullNameIsTouched,
  } = useInput((value) => validateName(value));
  let {
    value: usernameValue,
    isValid: usernameIsValid,
    changeHandler: usernameChangeHandler,
    blurHandler: usernameBlurHandler,
    hasError: usernameHasError,
    reset: usernameReset,
    isTouched: usernameIsTouched,
  } = useInput((value) => validateUserame(value));
  let {
    value: emailValue,
    isValid: emailIsValid,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    hasError: emailHasError,
    reset: emailReset,
    isTouched: emailIsTouched,
  } = useInput((value) => validateEmail(value));
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    reset: passwordReset,
    isTouched: passwordIsTouched,
  } = useInput((value) => validatePassword(value));
  const {
    value: favDriverValue,
    isValid: favDriverIsValid,
    changeHandler: favDriverChangeHandler,
    blurHandler: favDriverBlurHandler,
    hasError: favDriverHasError,
    reset: favDriverReset,
    isTouched: favDriverIsTouched,
  } = useInput((value) => validateName(value));
  const {
    value: favTeamValue,
    isValid: favTeamIsValid,
    changeHandler: favTeamChangeHandler,
    blurHandler: favTeamBlurHandler,
    hasError: favTeamHasError,
    reset: favTeamReset,
    isTouched: favTeamIsTouched,
  } = useInput((value) => validateName(value));

  let isFormValid = false;

  if (
    emailValue &&
    emailIsValid &&
    fullNameValue &&
    fullNameIsValid &&
    !usernameIsValid
  ) {
    isFormValid = true;
    usernameValue = username;
    usernameIsValid = true;
  } else if (
    fullName &&
    fullNameIsValid &&
    username &&
    usernameIsValid &&
    !emailIsValid
  ) {
    isFormValid = true;
    emailIsValid = true;
    emailValue = email;
  } else if (emailIsValid && emailValue && username && usernameIsValid) {
    isFormValid = true;
    fullNameIsValid = true;
    fullNameValue = fullName;
  }

  if (usernameIsValid && emailIsValid && fullNameIsValid) {
    isFormValid = true;
  }

  const submitDataHandler = (e) => {
    e.preventDefault();

    if (!usernameIsValid && !emailIsValid && !fullNameIsValid) {
      isFormValid = false;
      return;
    }

    const fullNameInputValue = fullNameValue;
    const usernameInputValue = usernameValue;
    const emailInputValue = emailValue;
    const favDriverInputValue = favDriverValue;
    const favConstructor = favTeamValue;

    console.log({
      fullNameInputValue,
      usernameInputValue,
      emailInputValue,
      favDriverInputValue,
      favConstructor,
    });
  };

  const changeProfilePictureHandler = async (e) => {
    console.log("file", e.target.files[0]);
    const uploadedPicture = e?.target?.files[0];
    const fileExtension = uploadedPicture && uploadedPicture?.name?.split('.').pop();
    const fileSize = uploadedPicture && uploadedPicture?.size?.toString();
    console.log('fileExtension',fileExtension)
    // check for accepted extensions;
    
    if (!acceptedExtensions?.some((ext) => fileExtension?.toLowerCase() === ext)) {
        setShowErrorModal({
          show : true,
          title : 'Ooops!',
          message : `We only accept the following file extensions ${[...acceptedExtensions]}`
        });
        return;
    }

    if(fileSize.length < 7){
      const fileSizeKB = Math.round(+fileSize/1024).toFixed(2);
      console.log('fileSizeKB',fileSizeKB);
      if(fileSizeKB > 2000) {
        setShowErrorModal({
          show : true,
          title : 'Ooops!',
          message : 'You can\'t upload images larger than 2MB'
        });
        return;
      }
    } else {
      const fileSizeMB = (Math.round(+fileSize/1024)/1000).toFixed(2);
      console.log('fileSizeMB',fileSizeMB); 
      if(fileSizeMB > 2)
      setShowErrorModal({
        show : true,
        title : 'Ooops!',
        message : 'You can\'t upload images larger than 2MB'
      });
      return;
    }
    
    console.log("avem profile picture");
    if (uploadedPicture) {
      try {
        const controller = new AbortController();
        const formData = new FormData();
        formData.append("profilePicture", uploadedPicture);
        formData.append("username", username);

        sendRequest(
          {
            url: "api/accounts/updateProfilePicture",
            method: "POST",
            body: {
              formData,
            },
            headers: {},
            withCredentials: true,
            signal: controller.signal,
          },
          (apiResponse) => {
            console.log('apiResponse',apiResponse);
            const { message, statusCode, data } = apiResponse;
            if (
              message === "Profile picture uploaded successfully" && statusCode === 200) {
              console.log("image uploaded successfully, dispatch and change the profile picture",apiResponse);
              // setTimeout(() => {
                dispatch(updateProfilePicture({ profilePicture: data }));
              // },[5000]);
            }
          }
        );

      } catch (error) {
        console.log("error", error);
        setShowErrorModal({
          show : true,
          title : 'Ooops!',
          message : error?.message || error
        });

      }
    } else {
      setShowErrorModal({
        show : true,
        title : 'Ooops!',
        message : 'Unexpected error occured, please try again later'
      });
      return;
    }
  };

  const closeModal = () => setShowErrorModal({});

  return (
    <EditProfileContainer>
      {showErrorModal?.show && <ErrorModal onConfirm={closeModal} title={showErrorModal?.title || 'Ooops!'} message={showErrorModal?.message || 'Unexpected error occured'}  />}
      <UserProfilePictureWrapper>
        {
          !isLoading ? 
          <UserProfilePicture
            src={
              profilePicture
                ? `data:image/png;base64,${imageStr}`
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/240px-F1.svg.png"
            }
          />
          : <LoaderIcon hB1={20} hB2={40} hB3={20} barsColor={'#000'} heightContainer='100%' />
        }
        <ChangeProfilePictureLabel htmlFor="imageUpload"></ChangeProfilePictureLabel>
        <ChangeProfilePicture
          type="file"
          id="imageUpload"
          onChange={changeProfilePictureHandler}
        />
      </UserProfilePictureWrapper>
      <UserPorfileInfo>
        <h2>{fullName || "N/A"}</h2>
        <span>{`@${username}` || "N/A"}</span>
      </UserPorfileInfo>

      {/* FULLNAME */}
      <UserProfileEditItem
        id="fullName"
        value={fullNameValue}
        labelText="Full Name"
        changeHandler={fullNameChangeHandler}
        blurHandler={fullNameBlurHandler}
        isValid={fullNameIsValid}
        isTouched={fullNameIsTouched}
        defaultValue={fullName}
        errorText={`We have to know who we are talking to, we don't like to call you 'Guest'`}
        isRequired={true}
      />

      {/* USERNAME */}
      <UserProfileEditItem
        id="username"
        value={usernameValue}
        labelText="Username"
        changeHandler={usernameChangeHandler}
        blurHandler={usernameBlurHandler}
        isValid={usernameIsValid}
        isTouched={usernameIsTouched}
        defaultValue={username}
        errorText={"Username is required"}
        isRequired={true}
      />

      {/* EMAIL */}
      <UserProfileEditItem
        id="email"
        value={emailValue}
        labelText="Email"
        changeHandler={emailChangeHandler}
        blurHandler={emailBlurHandler}
        isValid={emailIsValid}
        isTouched={emailIsTouched}
        defaultValue={email}
        errorText="You need an email address to confirm your account"
        isRequired={true}
      />

      {/* Fav Driver */}
      <UserProfileEditItem
        id="favorite-driver"
        value={favDriverValue}
        labelText="Favorite Driver"
        changeHandler={favDriverChangeHandler}
        blurHandler={favDriverBlurHandler}
        isValid={favDriverIsValid}
        isTouched={favDriverIsTouched}
        defaultValue={favoriteDriver}
        isRequired={false}
      />

      {/* Fav Constructor */}
      <UserProfileEditItem
        id="favorite-constructor-team"
        value={favTeamValue}
        labelText="Favorite Constructor Team"
        changeHandler={favTeamChangeHandler}
        blurHandler={favTeamBlurHandler}
        isValid={favTeamIsValid}
        isTouched={favTeamIsTouched}
        defaultValue={favoriteConstructor}
        isRequired={false}
      />

      <SaveChangesBtn disabled={!isFormValid} onClick={submitDataHandler}>
        Submit
      </SaveChangesBtn>
    </EditProfileContainer>
  );
};

export default UserProfileEdit;
