import styled from 'styled-components';

export const ProductDetailsImageContainer = styled.div`
	margin: 20px 0;
	position: relative;
	width: 100%;
	height: 350px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;

	@media (max-width: 375px) {
		height: 300px;
	}
`;

export const ProductDetailsImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	border-radius: 10px;
`;
