import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../store/Auth/auth.actions";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import F1Logo from "../../assets/f1_logo.svg";
import classes from "./Login.module.css";
import useInput from "../../hooks/useInput";
import { validatePassword, validateUserame } from "../../Utils/validators";
import ErrorModal from "../../components/UI/ErrorModal";
import LoaderIcon from "../../components/LoaderReusable/LoaderIcon";
import useAxiosInterceptors from "../../hooks/useHttpInterceptors";
import { useEffect } from "react";

const Login = () => {
  const { isLoading,error,sendRequest } = useAxiosInterceptors(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(true);
  const [errorAuth,setErrorAuth] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('effect login error run');
      if(error) {
        console.log('error login',error);
        if(error.response && error.response.data) {
          const { response: { data: { message, statusCode, ...others }}} = error || null;
          setAuth({ message, statusCode, others });
        } else {
          const { message, code,...others } = error;
          console.log('else',message,code);
          setAuth({ message, statusCode : code, others });
        }
      }
  },[error]);

  const {
    value: usernameValue,
    changeHandler: usernameChangeHandler,
    blurHandler: usernameBlurHandler,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    reset: resetusername,
  } = useInput((value) => validateUserame(value));

  const {
    value: passwordValue,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    reset: resetPassword,
  } = useInput((value) => validatePassword(value));

  let formIsValid = false;

  if (passwordIsValid && usernameIsValid) {
    formIsValid = true;
  }

  const setAuth = (stateData) => {
    console.log('setAuth params',stateData);
    const { accessToken, statusCode, message, fullName } = stateData || null;

    // happy path, redirect to homepage;
    if (statusCode === 201 && accessToken) {
      dispatch(setAccessToken(
        accessToken,
        fullName
      ));
      resetPassword();
      resetusername();
      navigate("/");
    } else {
      if ( statusCode === 400 && message === "Username and password are required!") {
        setErrorAuth(message);
        setShowModal(true);
      } else if (
        statusCode === 401 &&
        (message === "User not found" ||
          message === "Incorrect username or password" ||
          message === "User not found")
      ) {
        setErrorAuth(message);
        setShowModal(true);
      } else {
        console.log('last else set auth');
        setShowModal(true);
        setErrorAuth(message)
      }
    }
  };

  const responseLoginHandler = (responseLogin) => {
    console.log('responseLogin',responseLogin);
    const { accessToken, statusCode, message,fullName } = responseLogin || null;
    if (responseLogin) {
      setAuth({ accessToken, statusCode, message,fullName });
    }
  }

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setShowModal(true);

    if (!formIsValid) {
      return;
    }

    sendRequest(
      {
        url: "/login",
        method: "POST",
        data: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
      responseLoginHandler
    );
  };

  const emailInputClasses = usernameHasError ? `${classes["inputError"]}` : '';
  const passwordInputClasses = passwordHasError
    ? `${classes["inputError"]}`
    : "";
    
  const confirmErrorModal = () => {
    setShowModal(false);
  };

  return (
    <section>
      {errorAuth && showModal && (
        <ErrorModal
          title="Ooops!"
          message={errorAuth || 'Something went wrong. Try again later!'}
          onConfirm={confirmErrorModal}
        />
      )}
      <header>
        <div className={classes["logo"]}>
          <img src={F1Logo} alt="F1-logo" />
        </div>
      </header>
      <div className={classes["sub-header"]}>
        <NavLink
          to="/login"
          className={(navData) =>
            navData.isActive
              ? `${classes["auth-links"]} ${classes["active"]}`
              : `${classes["auth-links"]}`
          }
        >
          <p>Sign In</p>
        </NavLink>
        <NavLink
          to="/register"
          className={(navData) =>
            navData.isActive
              ? `${classes["auth-links"]} ${classes["active"]}`
              : `${classes["auth-links"]}`
          }
        >
          <p>Register</p>
        </NavLink>
      </div>
      <form className={classes["auth-wrapper"]} onSubmit={submitFormHandler}>
        <div className={classes["auth-title"]}>
          <p>SIGN IN</p>
        </div>
        <div className={classes["auth-inputs"]}>
          <div className={classes["auth-fields"]}>
            <label htmlFor="email">Username</label>
            <input
              className={emailInputClasses}
              type="text"
              name="username"
              id="username"
              // placeholder="Enter your username"
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
              value={usernameValue}
            />
            {usernameHasError && (
              <span className={classes.errorText}>Invalid username</span>
            )}
          </div>
          <div className={classes["auth-fields"]}>
            <label htmlFor="password">Password</label>
            <input
              className={passwordInputClasses}
              name="password"
              id="password"
              type="password"
              // placeholder="Enter your password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordInputClasses && (
              <span className={classes.errorText}>
                Password must be at least 6 characters long, contain 1 digit and
                a special character
              </span>
            )}
          </div>
        </div>
        <div className={classes["auth-actions"]}>
          <button disabled={!formIsValid}>
            {!isLoading ? "SIGN IN" : <LoaderIcon hB1={10} hB2={20} hB3={10} />}
          </button>
          <p>Don't have an account yet?</p>
          <Link to={"/register"}>Register with F1</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
