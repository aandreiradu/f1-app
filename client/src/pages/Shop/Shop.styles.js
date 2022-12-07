import styled, { createGlobalStyle } from 'styled-components';
import { FooterContainer } from '../../components/Footer/Footer.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StoreGlobalSettings = createGlobalStyle`
    body {
        background: radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%);
        background-color: ${(props) => props.backgroundColor};
        /* background: linear-gradient(to right, #eef2f3, #8e9eab); */
    }

	#appCard{
		padding: 0 !important;
	}

	${FooterContainer} {
		border-radius: 0;
	}
`;

export const StoreMainContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem;
`;

export const StoreHeaderContainer = styled.div`
	width: 100%;
`;

export const StoreHeader = styled.h2`
	font-size: 1.5rem;
	font-weight: bold;
	text-transform: uppercase;
	/* text-align: center; */
	line-height: 1.2;
`;

export const StoreSubHeader = styled.p`
	font-size: 1rem;
`;

export const StoreProductsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: 30px;
	width: 100%;
	height: 100%;
	overflow: hidden;
	padding: 1rem 0;
	margin-bottom: 40px;
`;
