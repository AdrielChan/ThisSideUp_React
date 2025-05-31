import React from 'react';
import styled from 'styled-components';
import '../index.css';

// Styled Components
const AboutPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AboutHeroSection = styled.section`
  min-height: calc(100vh - 160px);
  background-image: url('/assets/images/homebanner.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const TextOverlayBox = styled.div`
  background-color: rgba(26, 26, 26, 0.85);
  color: #ffffff;
  padding: 36px;
  border-radius: 8px;
  max-width: 850px;
  text-align: left;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  }
`;

const PageTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 56px;
  color: #FFD9EB;
  margin-bottom: 24px;
  text-align: left;
`;

const AboutText = styled.p`
  font-family: var(--font-main);
  font-size: 16px;
  line-height: 1.8;
  color: #e0e0e0;
  margin-bottom: 20px;

  &:first-of-type::first-letter {
    font-family: var(--font-heading);
    font-size: 64px;
    color: #FFD9EB;
    float: left;
    line-height: 1;
    margin-right: 8px;
    margin-top: -8px;
  }
`;

const FooterSection = styled.footer`
  display: flex;
  flex-wrap: wrap;
  background: linear-gradient(90deg, #3D0B52, #1A1A1A);
  color: #FFFFFF;
  padding: 32px 24px;
  justify-content: space-between;
`;

const FooterColumn = styled.div`
  flex: 1 1 220px;
  margin-bottom: 24px;
`;

const FooterHeading = styled.h3`
  font-size: 20px;
  color: #FFD9EB;
  margin-bottom: 16px;
`;

const FooterDivider = styled.hr`
  border: none;
  height: 2px;
  background: #FFD9EB;
  margin: 8px 0 16px 0;
  width: 120px;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #E0E0E0;
  line-height: 1.6;
`;

const FooterLink = styled.a`
  display: block;
  font-size: 14px;
  color: #E0E0E0;
  margin-bottom: 8px;
  text-decoration: none;

  &:hover {
    color: #FFD9EB;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 12px;
  margin: 12px 0;
  align-items: center;
`;

const IconImage = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;

  &:hover {
    transform: scale(1.08);
    transition: 0.3s ease;
  }
`;

// Main Component
const AboutPage = () => {
  const backgroundImage = "homebanner.png";

  return (
    <AboutPageWrapper>
      <AboutHeroSection style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '1950px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        padding: '0rem'
      }}>
        <TextOverlayBox>
          <PageTitle id='font1' style={{ fontSize: '90' }}>About Us</PageTitle>
          <AboutText id='aboot'>
            This Side Up is a passionate skimboard company based in Singapore, dedicated to
            bringing the thrill of skimboarding to enthusiasts of all skill levels. We
            specialize in custom-designed skimboards, blending high-quality materials with
            bold, personalized designs that not only perform exceptionally but also reflect
            your unique style.
          </AboutText>
          <AboutText id='aboot'>
            Rooted in Singapore's vibrant coastal culture, This Side Up was founded with a
            vision to inspire a community of adventure seekers, wave chasers, and outdoor
            lovers. More than just a brand, we're a movement — promoting an active, creative,
            and connected lifestyle by the shore.
          </AboutText>
          <AboutText id='aboot'>
            To further connect with our growing community, we're expanding our presence through
            a dedicated e-commerce website. Here, you'll be able to shop our range of premium
            skimboards, essential skimboarding supplies, stylish apparel, and even design your
            own custom boards to ride your way.
          </AboutText>
          <AboutText id='aboot'>
            Whether you're a seasoned rider or new to the sport, This Side Up is your go-to
            destination for everything skimboarding in Singapore and beyond.
          </AboutText>
        </TextOverlayBox>
      </AboutHeroSection>

      <FooterSection id='font25'>
        <FooterColumn>
          <FooterHeading id='font2'>Our Slogan</FooterHeading>
          <FooterDivider />
          <FooterText>
            "Ride the Shallow,<br />Rule the Shore."
          </FooterText>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading id='font2'>Social Medias</FooterHeading>
          <FooterDivider />
          <SocialIcons>
            <a href="https://www.instagram.com/this_side_up.sg/" target="_blank" rel="noopener noreferrer">
              <IconImage src="/assets/icons/instagram.png" alt="Instagram" />
            </a>
            <a href="https://www.tiktok.com/@this_side_up.sg" target="_blank" rel="noopener noreferrer">
              <IconImage src="/assets/icons/tiktok.png" alt="TikTok" />
            </a>
          </SocialIcons>
          <FooterText>@this_side_up.sg</FooterText>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading id='font2'>Useful Links</FooterHeading>
          <FooterDivider />
          <FooterLink href="#">Your Account</FooterLink>
          <FooterLink href="#">Become an Affiliate</FooterLink>
          <FooterLink href="#">Shipping Rates</FooterLink>
          <FooterLink href="#">Help & Advice</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading id='font2'>Contact</FooterHeading>
          <FooterDivider />
          <FooterText>📍 112 East Coast Road, #02-08 KANTONG MALL</FooterText>
          <FooterText>📞 +65 8900 2121</FooterText>
          <FooterText>📠 53451524L</FooterText>
          <FooterText>📧 inquiries@thissideup.com</FooterText>
        </FooterColumn>
      </FooterSection>
    </AboutPageWrapper>
  );
};

export default AboutPage;
