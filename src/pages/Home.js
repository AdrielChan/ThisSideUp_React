import {React} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../index.css';

const Wrapper = styled.div`
  padding: 0rem;
`;

const DesignButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-primary-purple, #5D3FD3);
  color: var(--color-text-light, #FFFFFF);
  padding: var(--spacing-m, 12px) var(--spacing-xl, 24px);
  font-size: clamp(18px, 2.5vw, 22px);
  font-weight: bold;
  text-decoration: none;
  border-radius: var(--border-radius, 8px);
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: var(--spacing-l, 20px);
  text-align: center;
  border: 2px solid transparent;

  &:hover {
    background-color: var(--color-primary-purple-light, #7A5FD3);
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    border-color: var(--color-secondary-peach, #FFDAB9);
  }
`;

const AccentButton = styled(Link)`
  display: inline-block;
  background-color: #FE9C7F;
  color: #1A1333;
  padding: var(--spacing-m, 12px) var(--spacing-xl, 24px);
  font-size: clamp(18px, 2.5vw, 22px);
  font-weight: bold;
  text-decoration: none;
  border-radius: var(--border-radius, 8px);
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  margin-top: var(--spacing-l, 20px);
  text-align: center;
  border: 2px solid transparent;

  &:hover {
    background-color: #FFBFAF;
    color: #1A1333;
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    border-color: #FE9C7F;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 40%;
    border-bottom: 2px solid #FE9C7F;
  }

  img {
    width: 28px;
    height: auto;
    margin: 0 16px;
  }
`;

const Home = () => {
  const backgroundImage = "bannerHD.jpg";
  const dividerIcon = "/assets/icons/icons8-surfguy.png"; 

  return (
    <Wrapper>
      <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '1950px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '0rem'
      }}>
        <div id='font1' style={{
          padding: '2rem',
          backgroundColor: 'rgba(32, 32, 32, 0.8)',
          width: '560px',
          paddingLeft: '30px',
          position: 'relative',
          left: '80px',
          textShadow: '2px 2px 5px rgba(0,0,0,0.50)'
        }}>
          <p style={{fontSize: 36, color: '#FE9C7F'}}>Skim & Ride</p>
          <p style={{fontSize: 64, color: '#FFFFFF', lineHeight: '63px', paddingBottom: '20px'}}>Find Your Next Adventure</p>
          <p style={{fontSize: 24, color: '#FE9C7F', lineHeight: '33px'}}>
            Premium skimboards and beach gear, crafted for wave chasers
          </p>

          <Divider>
            <img src={dividerIcon} alt="divider icon" />
          </Divider>

          <p id='longpara' style={{fontSize: 20, color: '#FFFFFF'}}>
            This Side Up is an online store for skimboards, beach
            supplies, and custom board designs. The website
            makes it easy for customers to shop for skim-
            boarding gear and personalise their boards. This
            shop offers a simple and convenient way to get
            everything you need for your next beach adventure to the shore.
          </p>

          <AccentButton to="/design-skimboard">
            Design Your Skimboard
          </AccentButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
