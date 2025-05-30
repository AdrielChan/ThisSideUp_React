import {React} from 'react';
import styled from 'styled-components';
import '../index.css';
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
      <div id='front' style={{padding: '2rem', backgroundColor: 'rgba(32, 32, 32, 0.6)', width: '560px'}}>
        <p style={{fontSize: 36, color: '#FDDDFD'}}>Skim & Ride</p>
        <p style={{fontSize: 64, color: '#FFFFFF'}}>Find Your Next Adventure</p>
        <p style={{fontSize: 24, color: '#FDDDFD'}}>Premium skimboards and beach gear, crafted for wave chasers</p>
      </div>
      </div>
      
    </Wrapper>
  );
};

export default Home;
