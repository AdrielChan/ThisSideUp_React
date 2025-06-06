import React, {useState} from 'react';
import styled from 'styled-components';
import '../index.css';

const Wrapper = styled.div`
  padding: 0rem;
`;

const AccentHighlight = styled.span`
  color: #FE9C7F;
  font-weight: bold;
  background: rgba(254, 156, 127, 0.08);
  padding: 0 4px;
  border-radius: 4px;
  transition: background 0.2s;
`;

function QnOpen(props) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div onClick={handleClick}>
      <div id='qn'>
        <p>{props.question}</p>
      </div>
      
      <div>
        {isVisible ? 
        <div>
          <div style={{border: 'none', height: '1.5px', background: '#FFD9EB', margin: '20px 0 20px 0', width: 'auto'}}></div>
          <div id='qnAns'>
            {props.ans.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
            ))}
          </div>
        </div> : <p></p>}
      </div>
    </div>
  );
}

const FAQ = () => {
  const backgroundImage = "bannerHD.jpg";

  
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
      <div id='font1' style={{paddingTop: '15px',backgroundImage: 'linear-gradient(to right, rgba(27,0,39,0.6), rgba(96,0,141,0.6), rgba(96,0,141,0.6), rgba(27,0,39,0.6))', width: '706px', height: 'auto', paddingBottom: '74px',  position: 'relative', margin: 'auto', paddingTop:'50px'}}>
        <p style={{fontSize: 64, color: '#FFFFFF', lineHeight: '63px', textAlign: 'center', textShadow: '2px 2px 5px rgba(0,0,0,0.25)', height: 'auto'}}>Frequently Asked Questions (FAQs)</p>
      </div>
      </div>
      <div style={{backgroundColor: '#222', height: 'auto',}}>
        <div id='font1' style={{paddingTop: '15px',backgroundImage: 'linear-gradient(to right, rgba(27,0,39,0.6), rgba(96,0,141,0.6), rgba(96,0,141,0.6), rgba(27,0,39,0.6))', width: '706px', height: 'auto', paddingBottom: '80px',  position: 'relative', margin: 'auto', paddingTop:'-20px'}}>
        <form>
              <input 
              type="text"
              // onChange={}
              placeholder='Type your question'
              />
        </form>
        <QnOpen question={<><AccentHighlight>How do I customise my skim board?</AccentHighlight></>} ans={"1. Click 'Design Your Own Board' on the homepage. \n2. Design as you please. 🎨 \n3. Add to cart & checkout!"} />

        <QnOpen question={<><AccentHighlight>How long does order processing take?</AccentHighlight></>} ans={"🚀 Order Processing: 1-2 business days (3-5 days for custom boards). \n📦 Fast Shipping? Add Express at checkout! \n📧 Questions? "+<AccentHighlight>"inquiries@thissideup.com"</AccentHighlight>} />

        <QnOpen question={<><AccentHighlight>What if my order arrives damaged?</AccentHighlight></>} ans={"Please contact us immediately at "+<AccentHighlight>"inquiries@thissideup.com"</AccentHighlight>+" with photos for a quick resolution."} />

        <QnOpen question={<><AccentHighlight>Do we ship internationally?</AccentHighlight></>} ans={"🌍 Yes, we ship worldwide! Shipping rates vary by destination."} />

        <QnOpen question={<><AccentHighlight>Do we accept returns/refunds?</AccentHighlight></>} ans={"✅ Yes, we do! Returns/refunds are accepted within 30 days for unused items. Check our full policy for details."} />
      </div>
      </div>
    </Wrapper>
  );
};

export default FAQ;