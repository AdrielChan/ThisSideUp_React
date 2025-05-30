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
      <div id='font1' style={{padding: '2rem', backgroundColor: 'rgba(32, 32, 32, 0.6)', width: '560px', paddingLeft: '30px', position: 'relative', left: '110px'}}>
        <p style={{fontSize: 36, color: '#FDDDFD'}}>Skim & Ride</p>
        <p style={{fontSize: 64, color: '#FFFFFF', lineHeight: '63px', paddingBottom: '20px'}}>Find Your Next Adventure</p>
        <p style={{fontSize: 24, color: '#FDDDFD', lineHeight: '33px'}}>Premium skimboards and beach gear, crafted for wave chasers</p>
        <p id='longpara' style={{fontSize: 20, color: '#FFFFFF'}}>
          This Side Up is an online store for skimboards, beach
          supplies, and custom board designs. The website
          makes it easy for customers to shop for skim-
          boarding gear and personalise their boards. This
          shop offers a simple and convenient way to get
          everything you need for your next beach adventure to the shore.
        </p>
      </div>
      </div>
      
    </Wrapper>
  );
};

export default Home;
