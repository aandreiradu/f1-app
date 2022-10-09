import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { ReactComponent as LinkedIn } from '../../assets/SVGs/linkedin.svg';

export const FooterContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #1f1f1f;
	color: #fff;
	padding: 10px;
	border-radius: 7px;
`;

export const FooterLogoAndTitle = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 10px;
	border-bottom: 1px solid #e10600;
`;

export const FooterLogo = styled.img`
	width: 45px;
	height: 45px;
`;

export const FooterTitle = styled.h2`
	font-size: 1.1rem;
	font-weight: 700;
	text-transform: uppercase;
`;

export const SocialMediaContainer = styled.div`
	margin: 10px 0;
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 10px;
`;

export const SocialMediaIconsWrapper = styled.div`
	display: flex;
	gap: 5px;
`;

const customItemIcon = css`
	width: 30px;
	height: 24px;
	object-fit: cover;
	/* margin-right: 5px; */
`;

export const FooterLinkItemIcon = styled(FontAwesomeIcon)`
	${customItemIcon}
`;

export const FooterLinkItemIconCustom = styled(LinkedIn)`
	${customItemIcon}
`;

export const FooterContactSection = styled.section`
	padding: 10px 0;
	display: flex;
	flex-direction: column;
	width: 100%;
	border-bottom: 1px solid #e10600;
`;

export const FooterContactTitle = styled.h2`
	font-size: 1.1rem;
	text-transform: uppercase;
	font-weight: 700;
	margin-bottom: 5px;
`;

export const FooterContactItem = styled.p`
	font-weight: 700;
	color: #fff;
	font-size: 1rem;
	text-transform: uppercase;
	display: flex;
	align-items: center;
	padding: 5px 0;
	gap: 5px;

	& svg {
		width: 24px;
	}
`;

export const ContributorWrapper = styled.div`
	width: 100%;
	display: flex;
	/* align-items: center; */
	/* justify-content: flex-start; */
	flex-direction: column;
`;

export const Copywright = styled.p`
	text-align: center;
	padding: 10px;
	text-transform: uppercase;
	font-size: 18px;
`;
