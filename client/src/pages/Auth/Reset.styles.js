import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}

	100%{
		opacity: 1;
	}
`;

export const ResetHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1.5rem 0;

	img {
		width: 100%;
		height: 30px;
		object-fit: contain;
	}
`;

export const FormControl = styled.form`
	width: 20rem;
	max-width: 90%;
	margin: auto;
	margin-top: 1rem;
	display: block;
`;

export const InputGroup = styled.div`
	margin-bottom: 0.25rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const Input = styled.input`
	border: none;
	border-bottom: 1px solid #a1a1a1;
	padding: 4px 2px;
	color: #fff;
	background: transparent;
	font-size: 18px;

	&:active,
	&:focus {
		outline: none;
	}

	&.invalid-input {
		border-bottom: 1px solid #e00;
	}
`;

export const Label = styled.label`
	font-size: 18px;
	color: #fff;
`;

export const SubmitBtn = styled.button`
	margin: 40px auto;
	width: 250px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 18px;
	font-weight: 700;
	padding: 4px 2px;
	background-color: transparent;
	border: 1px solid #e00;
	border-radius: 5px;
	cursor: pointer;

	&:hover,
	&:active,
	&:focus {
		background-color: #fff;
		border-color: #fff;
		color: #000;
		transition: background-color 0.2s ease;
	}

	&:disabled {
		background-color: #ccc;
		color: #000;
		cursor: not-allowed;
	}
`;

export const ErrorText = styled.span`
	color: #fff;
	font-size: 14px;
	animation: ${fadeIn} 0.25s linear;
	color: #e00;
`;
