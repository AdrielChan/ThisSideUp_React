import React from 'react';
import styled from 'styled-components';
// Assuming your Footer component is in src/components/layout/Footer.js
// import Footer from '../components/layout/Footer'; // Already part of App.js layout

// --- STYLED COMPONENTS ---

const AboutPageWrapper = styled.div`
  /* The main page background will be handled by global styles or App structure */
  /* This wrapper is mainly for structuring content if needed, but might be minimal */
`;

const AboutHeroSection = styled.section`
  min-height: 60vh; /* Adjust height as needed */
  background-image: url('/assets/images/about-us-background.jpg'); /* REPLACE with your image */
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl, 32px) var(--spacing-m, 16px);
  position: relative;

  /* Optional overlay if text readability is an issue, though Figma has a solid text box */
  /* &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.3); 
  } */
`;

const TextOverlayBox = styled.div`
  background-color: rgba(26, 26, 26, 0.8); /* Dark translucent background from Figma */
  color: var(--color-text-light, #FFFFFF);
  padding: var(--spacing-xl, 32px);
  border-radius: var(--border-radius, 8px);
  max-width: 700px; /* Adjust as needed */
  text-align: left; /* Text is left-aligned */
  position: relative; /* To ensure it's above any pseudo-element overlay */
  z-index: 1;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
`;

const PageTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: var(--font-size-hero, 48px); /* Large title */
  color: var(--color-secondary-peach, #FFDAB9); /* Title color from Figma */
  margin-bottom: var(--spacing-l, 24px);
  text-align: center; /* Centered title within the box */
`;

const AboutText = styled.p`
  font-family: var(--font-main); /* Assuming main text is sans-serif as per lorem ipsum */
  font-size: var(--font-size-medium, 16px); /* Or small if preferred */
  line-height: 1.8;
  color: var(--color-neutral-gray, #BDBDBD); /* Lighter text color for body */
  margin-bottom: var(--spacing-m, 16px);

  &:first-of-type::first-letter { /* Drop cap style for the first letter 'L' */
    font-family: var(--font-heading);
    font-size: calc(var(--font-size-medium, 16px) * 3); /* Significantly larger */
    color: var(--color-text-light, #FFFFFF);
    float: left;
    line-height: 0.8; /* Adjust to pull text around it */
    margin-right: var(--spacing-s, 8px);
    margin-top: var(--spacing-xs, 4px); /* Fine-tune vertical alignment */
  }
`;

// The footer section is likely handled globally by App.js, so we don't redefine it here.
// If you need specific content above the global footer but related to "About Us", add it here.

const AboutPage = () => {
  return (
    <AboutPageWrapper>
      <AboutHeroSection>
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

      
      {/* <Footer />  <-- Only include this if Footer is NOT globally rendered by App.js */}
    </AboutPageWrapper>
  );
};

export default AboutPage;
