import {React} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Home = () => {
  const backgroundImage = "homebanner.png";

  return (
    
    <Wrapper>
      <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '100vh',
    }}>
        <h1>Welcome to This Side Up</h1>
        <p>Explore our skimboards, design your own, or search products!</p>
      </div>
      
    </Wrapper>
  );
};

export default Home;
