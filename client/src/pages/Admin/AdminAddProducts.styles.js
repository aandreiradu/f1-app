import styled, { css } from 'styled-components';

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
	border-bottom: 1px solid #1f1f1f;
	color: #1f1f1f;
	padding: 3px;
	outline: none;
	font-size: 16px;

	&:focus,
	&:active {
		outline: none;
	}
`;

export const AddProductButton = styled.button``;
