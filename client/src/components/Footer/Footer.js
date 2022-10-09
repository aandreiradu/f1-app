import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMap } from '@fortawesome/free-regular-svg-icons';
import { faDatabase, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import F1Logo from '../../assets/f1_logo.svg';

import {
	FooterContainer,
	FooterLogoAndTitle,
	FooterLogo,
	FooterTitle,
	FooterLinkItemIcon,
	FooterLinkItemIconCustom,
	SocialMediaContainer,
	SocialMediaIconsWrapper,
	FooterContactTitle,
	FooterContactSection,
	FooterContactItem,
	Contributor,
	Copywright,
	ContributorWrapper
} from './Footer.styles';

const Footer = () => {
	return (
		<FooterContainer>
			<FooterLogoAndTitle>
				<FooterLogo src={F1Logo} />
				<FooterTitle>fia formula 1</FooterTitle>
			</FooterLogoAndTitle>

			<SocialMediaContainer>
				<FooterTitle>Social Media</FooterTitle>
				<SocialMediaIconsWrapper>
					<a
						href="https://www.linkedin.com/in/andrei-radu-544b80174/"
						target="_blank"
						rel="noreferrer"
					>
						<FooterLinkItemIconCustom />
					</a>
					<a href="https://github.com/aandreiradu" target="_blank" rel="noreferrer">
						<FooterLinkItemIcon icon={faGithub} />
					</a>
					<a href="https://www.instagram.com/aandrei.radu/" target="_blank" rel="noreferrer">
						<FooterLinkItemIcon icon={faInstagram} />
					</a>
				</SocialMediaIconsWrapper>
			</SocialMediaContainer>
			<ContributorWrapper>
				<FooterTitle>F1 API</FooterTitle>
				<FooterContactItem as={'a'} href="https://ergast.com/mrd/" target="_blank" rel="noreferrer">
					<FontAwesomeIcon icon={faDatabase} />
					ERGAST
				</FooterContactItem>
			</ContributorWrapper>
			<FooterContactSection>
				<FooterContactTitle>Contact Info</FooterContactTitle>
				<FooterContactItem>
					<FontAwesomeIcon icon={faEnvelope} />
					raduandrei697@gmail.com
				</FooterContactItem>
				<FooterContactItem>
					<FontAwesomeIcon icon={faMapLocationDot} />
					Bucharest, Romania
				</FooterContactItem>
			</FooterContactSection>
			<Copywright>
				Andrei Radu
				<br />
				{`© 2003-${new Date().getFullYear()} Formula One World Championship Limited`}
			</Copywright>
		</FooterContainer>
	);
};

export default Footer;
