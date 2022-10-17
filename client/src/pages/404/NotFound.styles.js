import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ContainerNotFound = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #fff;
`;

export const NotFoundTitle = styled.h1`
	font-size: 1.75rem;
	line-height: 1;
	margin-bottom: 20px;
	font-weight: bold;
	color: #fff;
`;

export const NotFoundSubtitle = styled.p`
	font-size: 1.2rem;
	line-height: 1.2;
	color: #fff;
`;

export const BackToHome = styled(Link)`
	font-weight: bold;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		bottom: 0px;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: red;
	}
`;

export const NotFoundAlternativesList = styled.ul`
	padding: 0 2rem;
`;

export const NotFoundAlternativesListItem = styled.li`
	list-style-type: disclosure-closed;
	font-size: 1rem;
	font-weight: 200;
	line-height: 1.6;
	margin: 10px 0;
`;

export const AnimatedGif = styled.img`
	max-width: 400px;
	max-height: 350px;
	border-radius: 10px;
	margin: 20px 0;
`;
