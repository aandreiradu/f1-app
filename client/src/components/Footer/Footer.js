import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";


import {
  FooterLinkItemIcon,
  FooterLinksTitle,
  FooterContainer,
  FooterAppName,
  FooterLinksContainer,
  FooterLinks,
  FooterLinkItem,
  FooterAppNameWrapper,
  FooterLinkItemIconCustom,
  FooterLinkItemText
} from "./Footer.styles";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterAppNameWrapper>
        <FooterAppName>FIA, Formula One App</FooterAppName>
      </FooterAppNameWrapper>
      <FooterLinksContainer>
        <FooterLinks>
          <FooterLinksTitle>Get In Touch</FooterLinksTitle>
          <FooterLinkItem>
            <FooterLinkItemIcon icon={faEnvelope} />
            <FooterLinkItemText href="mailto:raduandrei697@gmail.com" target='_blank'>Andrei Radu</FooterLinkItemText>
          </FooterLinkItem>
          <FooterLinkItem>
            <FooterLinkItemIcon icon={faInstagram} />
            <FooterLinkItemText href="https://www.instagram.com/aandrei.radu/" target='_blank'>Andrei Radu</FooterLinkItemText>
          </FooterLinkItem>
          <FooterLinkItem>
            <FooterLinkItemIconCustom />
            <FooterLinkItemText href="https://www.linkedin.com/in/andrei-radu-544b80174/" target="_blank">Andrei Radu</FooterLinkItemText>
          </FooterLinkItem>
        </FooterLinks>
        <FooterLinks align-items='flex-end'>
          <FooterLinksTitle>Special Thanks To</FooterLinksTitle>
          <FooterLinkItem>
          <FooterLinkItemIcon icon={faFlagCheckered} />
            <FooterLinkItemText font-size='14px' href="http://ergast.com/mrd/" target='_blank'>Ergast Developer API</FooterLinkItemText>
          </FooterLinkItem>
        </FooterLinks>
      </FooterLinksContainer>
    </FooterContainer>
  );
};

export default Footer;
