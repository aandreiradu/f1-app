import { useEffect, useState, useRef } from 'react';
import LoaderIcon from '../../components/LoaderReusable/LoaderIcon';
import obsecureEmail from '../../Utils/obsecureEmail';
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
	const [inputErrors, setInputErros] = useState({});
	const [isTouched, setIsTouched] = useState(false);
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
	const handleBlurInput = (e) => setIsTouched(true);

	const handleResetSubmit = (e) => {
		e.preventDefault();
		console.log('submit form');

		const newPassword = newPasswordRef?.current?.value || null;
		console.log('newPassword', newPassword);
		if (!newPassword || !(trim(newPassword) && isLength(newPassword, { min: 5 }))) {
			console.log('invalid password here', newPassword);
			setInputErros({
				input: newPasswordRef?.current?.name || 'newPassword',
				isValid: false
			});
			submitBtn.current.disabled = false;
			return;
		}

		console.log('all good here');
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
			}
		);
	};

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

	return (
		<>
			<ResetHeader>
				<img src={F1Logo} alt="F1-logo" />
			</ResetHeader>
			<FormControl onSubmit={handleResetSubmit}>
				<InputGroup>
					<Label htmlFor="password">New Password</Label>
					<Input
						id="password"
						type="password"
						name="newPassword"
						ref={newPasswordRef}
						spellCheck={false}
						onBlur={handleBlurInput}
						onClick={resetErrorState}
						className={Object.keys(inputErrors).length > 0 && 'invalid-input'}
					/>
					<Input type="hidden" name="passwordToken" value={responseData?.passwordToken || ''} />
					<Input type="hidden" name="userId" value={responseData?.userId || ''} />
					{Object.keys(inputErrors).length > 0 && (
						<ErrorText>Password should contain at least 5 characters</ErrorText>
					)}
				</InputGroup>
				<SubmitBtn ref={submitBtn} disabled={Object.keys(inputErrors).length > 0}>
					{isLoading ? <LoaderIcon /> : 'Update Password'}
				</SubmitBtn>
			</FormControl>
		</>
	);
};

export default NewPassword;
