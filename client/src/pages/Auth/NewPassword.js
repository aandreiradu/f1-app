import { useEffect, useState, useRef } from 'react';
import { validatePassword } from '../../Utils/validators';
import LoaderIcon from '../../components/LoaderReusable/LoaderIcon';
import { useNavigate, useParams } from 'react-router-dom';
import isLength from 'validator/lib/isLength';
import trim from 'validator/lib/trim';
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

const NewPassword = () => {
	const { token } = useParams();
	console.log('token', token);
	const [customMessage, setCustomMessage] = useState('');
	const [errorModal, setErrorModal] = useState(false);
	const [inputErrors, setInputErros] = useState({});
	const navigate = useNavigate();
	const { isLoading, responseData, sendRequest, error } = useAxiosInterceptorsPublic();
	const {
		isLoading: isLoadingUpdate,
		responseData: responseDataUpdate,
		sendRequest: sendRequestUpdate,
		error: errorUpdate
	} = useAxiosInterceptorsPublic();
	const newPasswordRef = useRef();
	const submitBtn = useRef();

	const resetErrorState = () => {
		if (Object.keys(inputErrors).length > 0) {
			setInputErros({});
			newPasswordRef.current.disabled = false;
		}
	};

	const handleResetSubmit = (e) => {
		e.preventDefault();

		const newPassword = newPasswordRef?.current?.value || null;
		if (
			!newPassword ||
			!(trim(newPassword) && isLength(newPassword, { min: 6 }) && validatePassword(newPassword))
		) {
			console.log('invalid password here', newPassword);
			setInputErros({
				input: newPasswordRef?.current?.name || 'newPassword',
				isValid: false
			});
			submitBtn.current.disabled = false;
			return;
		}

		const controller = new AbortController();

		sendRequestUpdate(
			{
				url: '/new-password',
				method: 'POST',
				body: JSON.stringify({
					userId: responseData?.userId,
					password: newPassword,
					token: responseData?.token
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				withCredentials: false,
				controller: controller.signal
			},
			(responseUpdatePassword) => {
				console.log('responseUpdatePassword', responseUpdatePassword);
				const { message, status } = responseUpdatePassword || {};
				console.log({ message, status });
				if (status === 200 && message === 'Password updated') {
					newPasswordRef.current.disabled = true;
					setErrorModal(true);
					setCustomMessage(
						'Password updated successfully. You will be redirected to login in 5 seconds.'
					);
					setTimeout(() => {
						navigate('/login');
					}, 5000);
				}
			}
		);
	};

	useEffect(() => {
		console.error('@@@ERROR useEffect!!', error);
		console.error('@@@ERROR useEffect!!', errorUpdate);
		const { message, data, status } = error || {};
		console.log({ message, data, status });
		if (message || data) {
			if (
				message === 'No account found based on generated token or token is expired' &&
				status === 401
			) {
				setErrorModal(true);
				setTimeout(() => {
					navigate('/login');
				}, 5000);
			}
		}

		const { message: messageUpdate, data: dataUpdate, status: statusUpdate } = errorUpdate || {};
		console.log(messageUpdate, dataUpdate, statusUpdate);
		if (messageUpdate || dataUpdate) {
			if (messageUpdate === 'Invalid Request Params' && statusUpdate === 400) {
				setErrorModal(true);
				setTimeout(() => {
					navigate('/login');
				}, 5000);
			} else if (messageUpdate === 'Invalid Field' && statusUpdate === 422) {
				setErrorModal(true);
				setCustomMessage(dataUpdate[0].msg || 'Unexpected error occured');
			}
		}
	}, [error, errorUpdate]);

	useEffect(() => {
		const controller = new AbortController();
		sendRequest(
			{
				url: `/reset/${token}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				withCredentials: false,
				controller: controller.signal
			},
			(responseData) => {
				console.log(`responseData`, responseData);
			}
		);
	}, []);

	const confirmErrorModal = () => {
		setErrorModal(false);
	};

	return (
		<>
			<ResetHeader>
				<img src={F1Logo} alt="F1-logo" />
			</ResetHeader>
			{/* Error Modal */}
			{errorModal && (error || errorUpdate) && (
				<ErrorModal
					title="Ooops!"
					message={customMessage || error?.message || 'Unexpected error occured'}
					onConfirm={confirmErrorModal}
				/>
			)}
			{/* Password updated successfully */}
			{errorModal && customMessage && (
				<ErrorModal title={null} message={customMessage} onConfirm={confirmErrorModal} />
			)}
			<FormControl onSubmit={handleResetSubmit}>
				<InputGroup>
					<Label htmlFor="password">New Password</Label>
					<Input
						id="password"
						type="password"
						name="newPassword"
						ref={newPasswordRef}
						spellCheck={false}
						onClick={resetErrorState}
						className={Object.keys(inputErrors).length > 0 && 'invalid-input'}
					/>
					<Input type="hidden" name="passwordToken" value={responseData?.passwordToken || ''} />
					<Input type="hidden" name="userId" value={responseData?.userId || ''} />
					{Object.keys(inputErrors).length > 0 && (
						<ErrorText>
							Password must be at least 6 characters long, contain 1 digit and a special character
						</ErrorText>
					)}
				</InputGroup>
				<SubmitBtn
					ref={submitBtn}
					disabled={Object.keys(inputErrors).length > 0 || error || errorModal}
				>
					{isLoading || isLoadingUpdate ? <LoaderIcon /> : 'Update Password'}
				</SubmitBtn>
			</FormControl>
		</>
	);
};

export default NewPassword;
