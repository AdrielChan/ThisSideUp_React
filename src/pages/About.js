import React from 'react';
import styled from 'styled-components';
import '../index.css';
import Footer from '../components/layout/Footer';

// Styled Components
const AboutPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AboutHeroSection = styled.section`
  min-height: calc(100vh - 160px);
  background-image: url('aboutHD.jpg');
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
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const AboutText = styled.p`
  font-family: var(--font-main);
  font-size: 16px;
  line-height: 1.8;
  color: #e0e0e0;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  &:first-of-type::first-letter {
    font-family: var(--font-heading);
    font-size: 64px;
    color: #FE9C7F; /* Only the big T is orange */
    float: left;
    line-height: 1;
    margin-right: 8px;
    margin-top: -8px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const AccentHighlight = styled.span`
  color: #FE9C7F;
  font-weight: bold;
`;

// Main Component
const AboutPage = () => {
  const backgroundImage = "AbootHD.jpg";

  return (
    <AboutPageWrapper>
      <AboutHeroSection style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '1950px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        width: 'auto',
        padding: '0rem'
      }}>
        <TextOverlayBox>
          <PageTitle id='font1' style={{ fontSize: '90' }}>
            <AccentHighlight>About Us</AccentHighlight>
          </PageTitle>
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

    </AboutPageWrapper>
  );
};

export default AboutPage;