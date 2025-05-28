import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Assuming you'll have links here

// Styled components for the footer based on Figma (Page 25)
const FooterContainer = styled.footer`
  background-color: var(--color-background-dark, #1A1A1A);
  color: var(--color-text-light, #FFFFFF);
  padding: var(--spacing-xl, 32px) var(--spacing-m, 16px);
  font-size: var(--font-size-small, 14px);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-l, 24px);
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterColumn = styled.div`
  h4 {
    color: var(--color-secondary-peach, #FFDAB9);
    font-family: var(--font-heading);
    font-size: var(--font-size-large, 20px);
    margin-bottom: var(--spacing-m, 16px);
  }
  p, a {
    color: var(--color-neutral-gray, #BDBDBD);
    line-height: 1.8;
    text-decoration: none;
  }
  a:hover {
    color: var(--color-text-light, #FFFFFF);
    text-decoration: underline;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: var(--spacing-s, 8px);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: var(--spacing-m, 16px);
  margin-top: var(--spacing-s, 8px);
  a {
    font-size: var(--font-size-xlarge, 24px); /* Adjust if you use actual icons */
    color: var(--color-neutral-gray, #BDBDBD);
    &:hover {
      color: var(--color-secondary-peach, #FFDAB9);
    }
  }
`;

const CopyrightText = styled.p`
  text-align: center;
  margin-top: var(--spacing-xl, 32px);
  font-size: var(--font-size-small, 14px);
  color: var(--color-text-gray, #757575);
  border-top: 1px solid var(--color-background-dark-lighter, #2C2C2C);
  padding-top: var(--spacing-m, 16px);
`;

const Footer = () => (
  <FooterContainer>
    <FooterGrid>
      <FooterColumn>
        <h4>Company Slogan</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis dignissim dolor.</p>
      </FooterColumn>
      <FooterColumn>
        <h4>Social Medias</h4>
        {/* Replace text with actual icons */}
        <SocialIcons>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">FB</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TT</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X</a>
        </SocialIcons>
        <p>@this_side_up.sg</p>
      </FooterColumn>
      <FooterColumn>
        <h4>Useful Links</h4>
        <ul>
          <li><Link to="/login">Your Account</Link></li>
          <li><Link to="/affiliate">Become an Affiliate</Link></li>
          <li><Link to="/shipping">Shipping Rates</Link></li>
          <li><Link to="/faq">Help & Advice</Link></li>
        </ul>
      </FooterColumn>
      <FooterColumn>
        <h4>Contact</h4>
        <p>112 East Coast Road<br />#02-08 KANTONG MALL</p>
        <p>+65 8900 2121</p>
        <p>
          <a href="mailto:inquiries@thissideup.com">inquiries@thissideup.com</a>
        </p>
      </FooterColumn>
    </FooterGrid>
    <CopyrightText>© {new Date().getFullYear()} This Side Up. All Rights Reserved.</CopyrightText>
  </FooterContainer>
);

export default Footer;