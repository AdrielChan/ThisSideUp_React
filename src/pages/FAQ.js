import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0rem;
`;

const FAQ = () => {
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
      <div id='font1' style={{padding: '2rem', backgroundColor: 'rgba(32, 32, 32, 0.6)', width: '650px', paddingLeft: '30px', position: 'relative', left: '110px'}}>
        <p style={{fontSize: 64, color: '#FFFFFF', lineHeight: '63px', paddingBottom: '20px', textAlign: 'center'}}>Frequently Asked Questions (FAQs) </p>
      </div>
      </div>
      
    </Wrapper>
  );
};

export default FAQ;