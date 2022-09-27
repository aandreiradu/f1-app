import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ReactComponent as LinkedIn } from '../../assets/SVGs/linkedin.svg';

export const FooterContainer = styled.footer`
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 0.25rem 1rem;
	margin: 20px 0px 0px 0px;
	background-color: #000;
	display: flex;
	flex-direction: column;
`;

export const FooterAppNameWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const FooterAppName = styled.span`
	text-align: center;
	position: relative;
	font-size: 1.2rem;
	font-weight: bold;
	font-family: 'DynaPuff', sans-serif;
	color: #fff;
	text-align: center;

	&::before {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 100%;
		border-bottom: 1px solid #fff;
		background-color: #fff;
	}
`;

export const FooterLinksContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 20px 0;
`;

export const FooterLinks = styled.div`
	display: flex;
	flex-direction: column;
	${(props) => props}
`;

export const FooterLinksTitle = styled.p`
	font-weight: bold;
	color: #fff;
`;

const customItemIcon = css`
	width: 20px;
	height: 16px;
	object-fit: cover;
	margin-right: 5px;
`;

export const FooterLinkItemIcon = styled(FontAwesomeIcon)`
	${customItemIcon}
`;

export const FooterLinkItemIconCustom = styled(LinkedIn)`
	${customItemIcon}
`;

export const FooterLinkItem = styled.div`
	color: #fff;
	display: flex;
	align-items: center;
	font-size: 16px;
	margin: 2.5px 0;
`;

export const FooterLinkItemText = styled.a`
	font-size: 16px;
	color: #fff;
	${(props) => props}
`;
