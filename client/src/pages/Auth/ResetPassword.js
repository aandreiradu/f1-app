import { useEffect, useState, useRef } from 'react';
import LoaderIcon from '../../components/LoaderReusable/LoaderIcon';
import obsecureEmail from '../../Utils/obsecureEmail';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import F1Logo from '../../assets/f1_logo.svg';
import {
	ResetHeader,
	Input,
	InputGroup,
	FormControl,
	Label,
	SubmitBtn,
	ErrorText
} from './Reset.styles';
import useAxiosInterceptorsPublic from '../../hooks/useHttpInterceptorsPublic';
import ErrorModal from '../../components/UI/ErrorModal';

const ResetPassword = () => {
	const [canRedirect, setRedirect] = useState(false);
	const [errorModal, setErrorModal] = useState(false);
	const { isLoading, responseData, sendRequest, error } = useAxiosInterceptorsPublic();
	const [inputErrors, setInputErros] = useState({});
	const [isTouched, setIsTouched] = useState(false);
	const emailRef = useRef();
	const submitBtn = useRef();
	const navigate = useNavigate();

	const confirmErrorModal = () => {
		setErrorModal(false);
		submitBtn.current.disabled = false;
	};
	const handleBlurInput = (e) => setIsTouched(true);

	const resetErrorState = () => {
		if (Object.keys(inputErrors).length > 0) {
			setInputErros({});
			submitBtn.current.disabled = false;
		}
	};

	useEffect(() => {
		console.log('error', error);
		if (error) {
			const { data, message } = error;
			console.log('data,message', data, message);
			if (message) {
				setErrorModal(true);
			}
		}
	}, [error]);

	const handleResetSubmit = async (e) => {
		e.preventDefault();
		console.log('submitBtn', submitBtn);
		submitBtn.current.disabled = true;
		console.log(emailRef);
		const emailValue = emailRef.current.value;
		const emailValid = isEmail(emailValue);

		console.log('emailValue', emailValue);
		console.log('isEmail', isEmail(emailValue));

		if (!emailValid) {
			setInputErros({
				input: 'email',
				isValid: false
			});
			submitBtn.current.disabled = false;
			return;
		}

		const controller = new AbortController();

		sendRequest(
			{
				url: '/reset',
				method: 'POST',
				body: JSON.stringify({
					email: emailValue
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				withCredentials: false,
				controller: controller.signal
			},
			(responseData) => {
				console.log(`responseData`, responseData);
				const { message, token } = responseData;

				if (token && message === 'Token generated successfully') {
					console.log('should be redirected to login and wait for email');
					setRedirect(true);
					setTimeout(() => {
						navigate('/login');
					}, 10000);
				}
			}
		);
	};

	return (
		<>
			{error && errorModal && (
				<ErrorModal
					title="Ooops!"
					message={error?.message || 'Unexpected error occured'}
					onConfirm={confirmErrorModal}
				/>
			)}
			{canRedirect && responseData?.token && (
				<ErrorModal
					title={null}
					message={`We sent an email to ${obsecureEmail(emailRef.current.value)}
				 			  with a link to get back into your account.`}
					onConfirm={confirmErrorModal}
				/>
			)}
			<ResetHeader>
				<img src={F1Logo} alt="F1-logo" />
			</ResetHeader>
			<FormControl onSubmit={handleResetSubmit}>
				<InputGroup>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="text"
						name="email"
						ref={emailRef}
						spellCheck={false}
						onBlur={handleBlurInput}
						onClick={resetErrorState}
						className={Object.keys(inputErrors).length > 0 && 'invalid-input'}
					/>
					{Object.keys(inputErrors).length > 0 && <ErrorText>Invalid email</ErrorText>}
				</InputGroup>
				<SubmitBtn ref={submitBtn} disabled={Object.keys(inputErrors).length > 0}>
					{isLoading ? <LoaderIcon /> : 'Reset Password'}
				</SubmitBtn>
			</FormControl>
		</>
	);
};

export default ResetPassword;
