import {React} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0rem;
`;

const Home = () => {
  const backgroundImage = "homebanner.png";

  return (
    
    <Wrapper>
      <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize:'1950px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '100vh',
      padding: '0rem'
    }}>
      <div style={{padding: '2rem', backgroundColor: '#202020', opacity: '60%'}}>
        <h1 style={{fontSize: 36, color: '#FDDDFD'}}>Skim & Ride</h1>
        <p style={{fontSize: 64, color: '#FFFFFF'}}>Find your next adventure</p>
        <h1 style={{fontSize: 24, color: '#FDDDFD'}}>Premium skimboards and beach gear, crafted for wave chasers</h1>
      </div>
      </div>
      
    </Wrapper>
  );
};

export default Home;
