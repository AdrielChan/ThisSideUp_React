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
      height: '250px',
      padding: '0rem',
    }}>
      <div id='font1' style={{paddingTop: '15px',backgroundImage: 'linear-gradient(to right, rgba(27,0,39,0.6), rgba(96,0,141,0.6), rgba(96,0,141,0.6), rgba(27,0,39,0.6))', width: '706px', height: '1000px',  position: 'relative', margin: 'auto', }}>
        <p style={{fontSize: 64, color: '#FFFFFF', lineHeight: '63px', paddingBottom: '20px', textAlign: 'center', textShadow: '2px 2px 5px rgba(0,0,0,0.25)'}}>Frequently Asked Questions (FAQs)</p>
        <div id='qn'>
          <p>How do I customise my skim board?</p>
        </div>
        <div id='qn'>
          <p>How long does order processing take?</p>
        </div>
        <div id='qn'>
          <p>What if my order arrives damaged?</p>
        </div>
        <div id='qn'>
          <p>Do we ship internationally?</p>
        </div>
        <div id='qn'>
          <p>Do we accept returns/refunds?</p>
        </div>
      </div>
      </div>
      <div style={{backgroundColor: '#222', height: '800px',}}>
      </div>
    </Wrapper>
  );
};

export default FAQ;