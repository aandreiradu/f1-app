import styled from 'styled-components';

export const AddProductForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 1rem;
	gap: 20px;
`;

export const AddProductActionGroup = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
`;

export const AddProductActionLabel = styled.label`
	font-size: 15px;
	color: #1f1f1f;
`;

export const AddProductActionInput = styled.input`
	display: block;
	background-color: transparent;
	border: none;
	border-bottom: 1.2px solid #1f1f1f;
	color: #1f1f1f;
	padding: 3px;
	outline: none;
	font-size: 16px;

	&:focus,
	&:active {
		outline: none;
	}

	border-color: ${(props) => {
		// console.log('@@@ PROPS STYLED', props);
		if (props.isTouched && props.hasError) {
			// console.log('return red');
			return '#e10600';
		} else if (props.isTouched && !props.hasError) {
			// console.log('return green');
			return 'green';
		}
	}};

	transition: border-color 0.5s ease-in;
`;

export const AddProductButton = styled.button`
	padding: 7px;
	border: 1px solid red;
	width: 200px;
	margin: 15px auto;
	border-radius: 10px;
	background-color: red;
	color: #fff;
	font-size: 15px;
	text-transform: uppercase;
	cursor: pointer;
	font-weight: 700;

	&:focus,
	&:active {
		outline: none;
	}

	&:disabled {
		cursor: not-allowed;
		color: #1f1f1f;
		background-color: #fff;
		border-color: #1f1f1f;
	}
	transition: all 0.5s ease-in;
`;

export const AddProductsErrorFallback = styled.span`
	font-size: 14px;
	line-height: 1.2;
	color: #e10600;
	text-align: left;
	margin: 5px 0;
`;
