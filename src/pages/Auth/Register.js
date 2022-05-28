import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import F1Logo from '../../assets/f1_logo.svg';
import classes from './Login.module.css'
import useInput from '../../hooks/useInput';
import { validatePassword, validateEmail,validateName } from '../../Utils/validators';
import AuthContext from '../../store/auth-context';
import useHttpFirebase from '../../hooks/useHttpFirebase';
import ErrorModal from '../../components/UI/ErrorModal';

const Register = () => {
    const [showModal, setShowModal] = useState(true);
    const { isLoading, error, sendRequest: registerRequest } = useHttpFirebase();
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (authCtx.isLoggedIn) {
            navigate('/');
        }
    }, [authCtx.isLoggedIn, navigate]);


    const {
        value: emailValue,
        changeHandler: emailChangeHandler,
        blurHandler: emailBlurHandler,
        isValid: emailIsValid,
        hasError: emailHasError,
        reset: resetEmail
    } = useInput((value) => validateEmail(value));

    const {
        value: passwordValue,
        changeHandler: passwordChangeHandler,
        blurHandler: passwordBlurHandler,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        reset: resetPassword
    } = useInput((value) => validatePassword(value));

    const {
        value: firstNameValue,
        changeHandler: firstNameChangeHandler,
        blurHandler: firstNameBlurHandler,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        reset: resetFirstName
    } = useInput((value) => validateName(value));

    const {
        value: lastNameValue,
        changeHandler: lastNameChangeHandler,
        blurHandler: lastNameBlurHandler,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        reset: resetLastName
    } = useInput((value) => validateName(value));


    let formIsValid = false;

    if (passwordIsValid && emailIsValid) {
        formIsValid = true;
    }

    const setAuth = (stateData) => {
        navigate('/auth/login');
    }


    const submitFormHandler = (e) => {
        e.preventDefault();
        setShowModal(true);

        if (!formIsValid) {
            return;
        }

        const params = {
            email: emailValue,
            firstName: firstNameValue,
            lastName: lastNameValue,
            password: passwordValue
        }

        console.log(params);

        registerRequest(
            {
                url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                    returnSecureToken: true
                })
            }, setAuth

        )

        resetEmail();
        resetPassword();
        resetFirstName();
        resetLastName();
    }

    const confirmErrorModal = () => {
        setShowModal(false);
    }

    const emailInputClasses = emailHasError ? `${classes['inputError']}` : '';
    const passwordInputClasses = passwordHasError ? `${classes['inputError']}` : '';
    const firstNameInputClasses = firstNameHasError ? `${classes['inputError']}` : '';
    const lastNameInputClasses = lastNameHasError ? `${classes['inputError']}` : '';

    if (error && showModal) {
        return <ErrorModal title='Ooops!' message={error} onConfirm={confirmErrorModal} />
    }

    return (
        <section>
            <header>
                <div className={classes['logo']}>
                    <img src={F1Logo} alt='F1-logo' />
                </div>
            </header>
            <div className={classes['sub-header']}>
                <NavLink to='/auth/login' className={(navData) => (navData.isActive ? `${classes['auth-links']} ${classes['active']}` : `${classes['auth-links']}`)}>
                    <p >Sign In</p>
                </NavLink>
                <NavLink to='/auth/register' className={(navData) => (navData.isActive ? `${classes['auth-links']} ${classes['active']}` : `${classes['auth-links']}`)}>
                    <p >Register</p>
                </NavLink>
            </div>
            <form className={classes['auth-wrapper']} onSubmit={submitFormHandler}>
                <div className={classes['auth-title']}>
                    <p>CREATE ACCOUNT</p>
                </div>
                <div className={classes['auth-inputs']}>
                    <div className={classes['auth-fields']}>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            className={lastNameInputClasses}
                            type="text"
                            name='firstName'
                            id='firstName'
                            placeholder='First Name'
                            onChange={firstNameChangeHandler}
                            onBlur={firstNameBlurHandler}
                            value={firstNameValue}
                        />
                        {firstNameHasError && <span className={classes.errorText}>First Name should contain only letters and be at least 2 characters long</span>}
                    </div>
                    <div className={classes['auth-fields']}>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            className={lastNameInputClasses}
                            type="text"
                            name='lastName'
                            id='lastName'
                            placeholder='Last Name'
                            onChange={lastNameChangeHandler}
                            onBlur={lastNameBlurHandler}
                            value={lastNameValue}
                        />
                        {lastNameHasError && <span className={classes.errorText}>Last Name should contain only letters and be at least 2 characters long</span>}
                    </div>
                    <div className={classes['auth-fields']}>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            className={emailInputClasses}
                            type="email"
                            name='email'
                            id='email'
                            placeholder='Enter your username'
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            value={emailValue}
                        />
                        {emailHasError && <span className={classes.errorText}>Incorrect email!</span>}
                    </div>
                    <div className={classes['auth-fields']}>
                        <label htmlFor='password'>Password</label>
                        <input
                            className={passwordInputClasses}
                            name='password'
                            id='password'
                            type="password"
                            placeholder='Enter your password'
                            value={passwordValue}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                        />
                        {passwordInputClasses && <span className={classes.errorText}>Password must be at least 6 characters long, contain 1 digit and a special character</span>}
                    </div>
                </div>
                <div className={classes['auth-actions']}>
                    <button disabled={!formIsValid}>SIGN IN</button>
                    <p>Already have an account?</p>
                    <Link to={'/auth/login'}>Login Here</Link>
                </div>
            </form>
        </section>
    )
}

export default Register