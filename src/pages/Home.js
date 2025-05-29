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
      <div style={{padding: '2rem'}}>
        <h1>Welcome to This Side Up</h1>
        <p>Explore our skimboards, design your own, or search products!</p>
      </div>
      </div>
      
    </Wrapper>
  );
};

export default Home;
