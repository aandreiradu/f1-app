import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import F1Logo from '../../assets/f1_logo.svg';
import classes from './Login.module.css'
import useInput from '../../hooks/useInput';
import { validatePassword, validateEmail } from '../../Utils/validators';

const Login = () => {
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


    let formIsValid = false;

    if (passwordIsValid && emailIsValid) {
        formIsValid = true;
    }

    const submitFormHandler = (e) => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }

        resetEmail();
        resetPassword();
    }

    const emailInputClasses = emailHasError ? `${classes['inputError']}` : '';
    const passwordInputClasses = passwordHasError ? `${classes['inputError']}` : '';

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
                    <p>SIGN IN</p>
                </div>
                <div className={classes['auth-inputs']}>
                    <div className={classes['auth-email']}>
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
                    <div className={classes['auth-password']}>
                        <label htmlFor='password'>Password</label>
                        <input
                            className={passwordInputClasses}
                            name='password'
                            id='password'
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
                    <p>Don't have an account yet?</p>
                    <Link to={'/auth/register'}>Register with F1</Link>
                </div>
            </form>
        </section>
    )
}

export default Login