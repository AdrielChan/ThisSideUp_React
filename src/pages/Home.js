// File: src/pages/Home.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../index.css'; // Assuming this contains global styles and font imports

// --- STYLED COMPONENTS ---

const PageWrapper = styled.div`
  /* No top/bottom padding here if the HeroSection covers the full height */
`;

const HeroSection = styled.div`
  background-image: url(${props => props.bgImage});
  background-size: cover; /* Changed from fixed size to cover for better responsiveness */
  background-repeat: no-repeat;
  background-position: center center; /* Better centering */
  min-height: 100vh; /* Make hero at least full viewport height */
  display: flex; /* To help with centering the InfoBox if needed, or aligning it */
  align-items: center; /* Vertically center InfoBox */
  padding: 2rem 1rem; /* Add some padding for smaller screens */

  @media (min-width: 768px) {
    padding: 2rem; /* Adjust padding for larger screens */
    /* You could adjust background-size here if 'cover' isn't perfect for all ratios */
    /* e.g., background-size: 1950px auto; */
  }
  @media (min-width: 1200px) {
    /* Potentially different alignment or padding for very large screens */
  }
`;

const InfoBox = styled.div`
  background-color: rgba(32, 32, 32, 0.85); /* Slightly more opaque for readability */
  padding: 1.5rem; /* Base padding */
  width: 90%; /* More responsive width for mobile */
  max-width: 560px; /* Keep the max-width for desktop */
  /* min-height: 700px; /* Consider if fixed height is needed or if content should dictate it */
  text-shadow: 2px 2px 5px rgba(0,0,0,0.50);
  border-radius: 8px; /* Optional: add some rounded corners */
  margin-left: auto; /* Default: center the box on mobile if HeroSection is full width */
  margin-right: auto;
  color: var(--color-text-light, #FFFFFF); /* Default text color */

  @media (min-width: 768px) {
    padding: 2rem;
    margin-left: 5%; /* Push it a bit to the left on tablets */
    margin-right: auto; /* Keep it from stretching too far right */
  }

  @media (min-width: 1024px) {
    padding: 2.5rem 2rem; /* More padding on desktop */
    margin-left: 80px; /* Recreate the original left offset for desktop */
    margin-right: auto;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1.5rem, 4vw, 2.25rem); /* 24px, 36px */
  color: var(--color-accent-orange, #FE9C7F); /* Using CSS variable from index.css */
  margin-bottom: 0.5em;
  font-family: "Inria Serif", serif;
  font-weight: bold;
`;

const Title = styled.p`
  font-size: clamp(2.5rem, 8vw, 4rem); /* 40px, 64px */
  color: var(--color-text-light, #FFFFFF);
  line-height: 1.1; /* Adjusted line height */
  padding-bottom: 0.5em;
  font-family: "Inria Serif", serif;
  font-weight: bold;
`;

const Tagline = styled.p`
  font-size: clamp(1.125rem, 3vw, 1.5rem); /* 18px, 24px */
  color: var(--color-accent-orange, #FE9C7F);
  line-height: 1.4;
  margin-bottom: 1.5em; /* Space before divider */
  font-family: "Inria Serif", serif;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: clamp(0.9rem, 2.5vw, 1.125rem); /* 16px, 20px */
  color: var(--color-text-light, #FFFFFF);
  line-height: 1.6;
  font-family: "Inria Serif", serif;

`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0; /* Use rem for scalable margins */

  &::before,
  &::after {
    content: '';
    flex-grow: 1; /* Allow lines to take available space */
    border-bottom: 2px solid var(--color-accent-orange, #FE9C7F);
  }

  img {
    width: clamp(24px, 5vw, 28px); /* Responsive icon size */
    height: auto;
    margin: 0 clamp(10px, 3vw, 16px); /* Responsive margins */
  }
`;

// Keep AccentButton as is, it already uses clamp for font-size
const AccentButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-accent-peach, #FE9C7F); /* Using CSS var from index.css */
  color: var(--color-primary-purple-dark, #1A1333); /* Using CSS var */
  padding: var(--spacing-m, 12px) var(--spacing-xl, 24px);
  font-size: clamp(1rem, 2.5vw, 1.25rem); /* Adjusted font size for buttons */
  font-weight: bold;
  text-decoration: none;
  border-radius: var(--border-radius-m, 8px);
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  margin-top: var(--spacing-l, 20px);
  text-align: center;
  border: 2px solid transparent;
  width: 100%; /* Make button full width on mobile */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */

  @media (min-width: 480px) {
    width: auto; /* Allow button to size to content on larger screens */
    display: inline-block; /* Revert to inline-block */
  }

  &:hover {
    background-color: #FFBFAF; /* Lighter shade for hover */
    color: #1A1333;
    transform: translateY(-2px);
  }

  &:focus-visible { /* Better for accessibility than just :focus */
    outline: none;
    border-color: var(--color-accent-peach, #FE9C7F);
    box-shadow: 0 0 0 2px var(--color-primary-purple, #5D3FD3); /* Example focus ring */
  }
`;


const Home = () => {
  const backgroundImage = "/bannerHD.jpg"; // Ensure this is in the public folder
  const dividerIcon = "/assets/icons/icons8-surfguy.png"; // Ensure this path is correct from public folder

  return (
    <PageWrapper>
      <HeroSection bgImage={backgroundImage}>
        <InfoBox>
          <Subtitle>Skim & Ride</Subtitle>
          <Title>Find Your Next Adventure</Title>
          <Tagline>
            Premium skimboards and beach gear, crafted for wave chasers
          </Tagline>

          <Divider>
            <img src={dividerIcon} alt="Surfer icon" />
          </Divider>

          <Description>
            This Side Up is an online store for skimboards, beach
            supplies, and custom board designs. This website
            makes it easy for customers to shop for skim-
            boarding gear and personalise their boards. This
            shop offers a simple and convenient way to get
            everything you need for your next beach adventure to the shore.
          </Description>

        </InfoBox>
      </HeroSection>
    </PageWrapper>
  );
};

export default Home;