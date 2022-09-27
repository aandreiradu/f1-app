import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import F1Logo from '../../assets/f1_logo.svg';
import classes from './Login.module.css';
import useInput from '../../hooks/useInput';
import {
	validatePassword,
	validateEmail,
	validateName,
	validateUserame
} from '../../Utils/validators';
import ErrorModal from '../../components/UI/ErrorModal';
import LoaderIcon from '../../components/LoaderReusable/LoaderIcon';
import useHttpInterceptorsPublic from '../../hooks/useHttpInterceptorsPublic';

const Register = () => {
	const [showModal, setShowModal] = useState(true);
	const [errorRegister, setErrorRegister] = useState(null);
	const { isLoading, error, sendRequest: registerRequest } = useHttpInterceptorsPublic();
	const navigate = useNavigate();

	useEffect(() => {
		console.log('error effect', error);
		console.log('isLoading effect', isLoading);
	}, [error, isLoading]);

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
		value: usernameValue,
		changeHandler: usernameChangeHandler,
		blurHandler: usernameBlurHandler,
		isValid: usernameIsValid,
		hasError: usernameHasError,
		reset: resetUsername
	} = useInput((value) => validateUserame(value));

	const {
		value: fullNameValue,
		changeHandler: fullNameChangeHandler,
		blurHandler: fullNameBlurHandler,
		isValid: fullNameIsValid,
		hasError: fullNameHasError,
		reset: resetfullName
	} = useInput((value) => validateName(value));

	let formIsValid = false;

	if (passwordIsValid && emailIsValid && usernameIsValid && fullNameIsValid) {
		formIsValid = true;
	}

	const setRegister = (stateData) => {
		console.log('stateData', stateData);
		const { message, statusCode } = stateData || {};

		if (statusCode === 201 && message === `User ${usernameValue} has been created!`) {
			// happy path, user created successfully, redirect to login;
			resetEmail();
			resetPassword();
			resetUsername();
			resetfullName();
			navigate('/login');
		} else {
			// username or email in use
			if (statusCode === 409) {
				console.log('409 status. Message: ', message);
				setErrorRegister(message);
				setShowModal(true);
			}
		}
	};

	const submitFormHandler = (e) => {
		e.preventDefault();
		setShowModal(true);

		if (!formIsValid) {
			return;
		}

		const params = {
			email: emailValue,
			username: usernameValue,
			fullName: fullNameValue,
			password: passwordValue
		};

		console.log(params);

		registerRequest(
			{
				url: '/register',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: usernameValue,
					fullname: fullNameValue,
					password: passwordValue,
					email: emailValue
				})
			},
			(responseData) => setRegister(responseData)
		);
	};

	const confirmErrorModal = () => {
		setShowModal(false);
	};

	const emailInputClasses = emailHasError ? `${classes['inputError']}` : '';
	const passwordInputClasses = passwordHasError ? `${classes['inputError']}` : '';
	const firstNameInputClasses = usernameHasError ? `${classes['inputError']}` : '';
	const fullNameInputClasses = fullNameHasError ? `${classes['inputError']}` : '';

	return (
		<section>
			<header>
				<div className={classes['logo']}>
					<img src={F1Logo} alt="F1-logo" />
				</div>
			</header>
			{error && showModal && (
				<ErrorModal title="Ooops!" message={error?.message} onConfirm={confirmErrorModal} />
			)}
			{/* {showModal && errorRegister && (
				<ErrorModal title="Ooops!" message={errorRegister} onConfirm={confirmErrorModal} />
			)} */}
			<div className={classes['sub-header']}>
				<NavLink
					to="/login"
					className={(navData) =>
						navData.isActive
							? `${classes['auth-links']} ${classes['active']}`
							: `${classes['auth-links']}`
					}
				>
					<p>Sign In</p>
				</NavLink>
				<NavLink
					to="/register"
					className={(navData) =>
						navData.isActive
							? `${classes['auth-links']} ${classes['active']}`
							: `${classes['auth-links']}`
					}
				>
					<p>Register</p>
				</NavLink>
			</div>
			<form className={classes['auth-wrapper']} onSubmit={submitFormHandler}>
				<div className={classes['auth-title']}>
					<p>CREATE ACCOUNT</p>
				</div>
				<div className={classes['auth-inputs']}>
					<div className={classes['auth-fields']}>
						<label htmlFor="username">Username</label>
						<input
							className={firstNameInputClasses}
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							onChange={usernameChangeHandler}
							onBlur={usernameBlurHandler}
							value={usernameValue}
						/>
						{usernameHasError && (
							<span className={classes.errorText}>
								Username should be at least 5 characters long, with no spaces
							</span>
						)}
					</div>
					<div className={classes['auth-fields']}>
						<label htmlFor="lastName">Full Name</label>
						<input
							className={fullNameInputClasses}
							type="text"
							name="lastName"
							id="lastName"
							placeholder="Full Name"
							onChange={fullNameChangeHandler}
							onBlur={fullNameBlurHandler}
							value={fullNameValue}
						/>
						{fullNameHasError && (
							<span className={classes.errorText}>
								Full Name should contain only letters and be at least 2 characters long
							</span>
						)}
					</div>
					<div className={classes['auth-fields']}>
						<label htmlFor="email">Email Address</label>
						<input
							className={emailInputClasses}
							type="email"
							name="email"
							id="email"
							placeholder="Enter your username"
							onChange={emailChangeHandler}
							onBlur={emailBlurHandler}
							value={emailValue}
						/>
						{emailHasError && <span className={classes.errorText}>Incorrect email!</span>}
					</div>
					<div className={classes['auth-fields']}>
						<label htmlFor="password">Password</label>
						<input
							className={passwordInputClasses}
							name="password"
							id="password"
							type="password"
							placeholder="Enter your password"
							value={passwordValue}
							onChange={passwordChangeHandler}
							onBlur={passwordBlurHandler}
						/>
						{passwordInputClasses && (
							<span className={classes.errorText}>
								Password must be at least 6 characters long, contain 1 digit and a special character
							</span>
						)}
					</div>
				</div>
				<div className={classes['auth-actions']}>
					<button disabled={!formIsValid}>
						{!isLoading ? 'SIGN UP' : <LoaderIcon hB1={10} hB2={20} hB3={10} />}
					</button>
					<p>Already have an account?</p>
					<Link to={'/login'}>Login Here</Link>
				</div>
			</form>
		</section>
	);
};

export default Register;
