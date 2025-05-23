import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div` padding: 2rem; `;
const Label = styled.label` display: block; margin: 1rem 0 0.5rem; `;
const Preview = styled.div`
  width: 300px;
  height: 150px;
  background: ${props => props.bg};
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const DesignSkimboard = () => {
  const [color, setColor] = useState("#FF5733");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = e => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <Container>
      <h2>Design Your Skimboard</h2>

      <Label>Choose Color:</Label>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

      <Label>Enter Text:</Label>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />

      <Label>Upload Image:</Label>
      <input type="file" onChange={handleImageUpload} />

      <Preview bg={color}>
        <div>
          {text && <h3 style={{ color: "white" }}>{text}</h3>}
          {image && <img src={image} alt="Custom" style={{ maxWidth: "100px" }} />}
        </div>
      </Preview>
    </Container>
  );
};

export default DesignSkimboard;
