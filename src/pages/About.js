import React from 'react';
import styled from 'styled-components';

// --- STYLED COMPONENTS ---

const AboutPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AboutHeroSection = styled.section`
  min-height: 75vh;
  background-image: url('/assets/images/about-us-background.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  position: relative;
`;

const TextOverlayBox = styled.div`
  background-color: rgba(26, 26, 26, 0.8);
  color: #ffffff;
  padding: 32px;
  border-radius: 8px;
  max-width: 850px;
  text-align: left;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.5);
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
    margin-right: 12px;
    margin-top: 4px;
  }
`;

const FooterSection = styled.footer`
  display: flex;
  flex-wrap: wrap;
  background: linear-gradient(90deg, #3D0B52, #1A1A1A);
  color: #FFFFFF;
  padding: 24px 32px;
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
  gap: 16px;
  margin: 12px 0;
  align-items: center;
`;

const SocialIconImage = styled.img`
  width: 28px;
  height: 28px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const AboutPage = () => {
  const backgroundImage = "homebanner.png";
  return (
    <AboutPageWrapper>
      <AboutHeroSection style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '1950px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '75vh',
        padding: '0rem'
      }}>
        <TextOverlayBox>
          <PageTitle>About Us</PageTitle>
          <AboutText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet maximus
            enim, vitae mollis ex tempor vel. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; Suspendisse vestibulum, nisl in fermentum consectetur,
            felis neque fringilla orci, vel auctor eros urna at justo. Sed eget tincidunt libero.
          </AboutText>
          <AboutText>
            Donec auctor tincidunt rutrum. Vestibulum non felis sed metus dignissim pellentesque.
            Curabitur congue enim nisi, nec venenatis nisi malesuada vitae. Phasellus ante odio,
            malesuada vitae ipsum id, venenatis cursus sem. Fusce ligula sem, varius sed urna
            bibendum, fringilla pharetra nunc. Praesent iaculis aliquam elit, at fermentum tortor
            ultricies ut. Mauris.
          </AboutText>
        </TextOverlayBox>
      </AboutHeroSection>

      <FooterSection>
        <FooterColumn>
          <FooterHeading>Company Slogan</FooterHeading>
          <FooterText>
            "Ride the Shallow,<br/>
            Rule the Shore."
          </FooterText>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Social Medias</FooterHeading>
          <SocialIcons>
            <a href="https://www.tiktok.com/@this_side_up.sg" target="_blank" rel="noopener noreferrer">
              <SocialIconImage src="/assets/images/tiktok.png" alt="TikTok" />
            </a>
            <a href="https://www.instagram.com/this_side_up.sg/" target="_blank" rel="noopener noreferrer">
              <SocialIconImage src="/assets/images/instagram.png" alt="Instagram" />
            </a>
          </SocialIcons>
          <FooterText>@this_side_up.sg</FooterText>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Useful Links</FooterHeading>
          <FooterLink href="#">Your Account</FooterLink>
          <FooterLink href="#">Become an Affiliate</FooterLink>
          <FooterLink href="#">Shipping Rates</FooterLink>
          <FooterLink href="#">Help & Advice</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Contact</FooterHeading>
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
