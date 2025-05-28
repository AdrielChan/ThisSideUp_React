// File: src/pages/DesignSkimboard.js
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDesign } from '../contexts/DesignContext';
import { useCart } from '../contexts/CartContext';
import { saveCustomDesignAPI } from '../data/Data'; // To "save" the design
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Sub-components for the designer (can be in separate files)
// For brevity, I'll include simplified versions here.

const PageContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack controls and preview on smaller screens */
  min-height: calc(100vh - var(--header-height, 70px));
  background-color: var(--color-primary-purple, #5D3FD3); // Dark purple background as in Figma
  color: var(--color-text-light, #FFFFFF);
  padding: var(--spacing-l, 24px);

  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const ControlsPanel = styled.div`
  flex: 1;
  padding: var(--spacing-m, 16px);
  max-width: 450px; /* Limit width of controls */
  margin: 0 auto var(--spacing-l, 24px) auto; /* Center on mobile, margin on desktop */
  background-color: color-mix(in srgb, var(--color-primary-purple, #5D3FD3) 90%, black); // Slightly darker than page bg
  border-radius: var(--border-radius, 8px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);

  @media (min-width: 992px) {
    margin: 0 var(--spacing-l, 24px) 0 0;
    max-height: calc(100vh - var(--header-height, 70px) - (2 * var(--spacing-l, 24px)));
    overflow-y: auto; /* Scroll if controls exceed height */
  }
`;

const PreviewPanel = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-m, 16px);
  position: relative; /* For title */
`;

const DesignTitle = styled.h1`
  color: var(--color-text-light, #FFFFFF);
  font-size: var(--font-size-hero, 48px);
  text-align: center;
  margin-bottom: var(--spacing-l, 24px);
`;

const SkimboardPreviewContainer = styled.div`
  width: 80%;
  max-width: 500px; /* Adjust as needed */
  aspect-ratio: 1 / 2; /* Typical skimboard ratio, adjust */
  border-radius: 150px / 300px; /* Elliptical shape */
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  background-color: #ccc; /* Fallback background */
`;

const SkimboardVisual = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.backgroundStyle};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* For text and decal */
`;

const PreviewText = styled.div`
  position: absolute;
  /* Style based on currentDesign.customText properties */
  font-family: ${props => props.font || 'Arial'};
  font-size: ${props => props.size || 24}px; /* Ensure size is a number */
  color: ${props => props.color || '#000000'};
  font-weight: ${props => props.weight || 'normal'};
  font-style: ${props => props.style || 'normal'};
  text-align: ${props => props.align || 'center'};
  /* top, left, transform for positioning if using absolute */
  /* For simplicity, centering it here */
  max-width: 90%;
  word-break: break-word;
  pointer-events: none; /* Allow clicks through to board for potential interactions */
`;

const PreviewDecal = styled.img`
  position: absolute;
  /* Style based on currentDesign.decal properties */
  width: ${props => props.decalWidth || 100}px; /* Ensure size is a number */
  height: auto;
  /* top, left, transform for positioning */
  pointer-events: none;
  /* For now, placing it simply */
  bottom: 10%;
  opacity: 0.8;
`;


const ControlGroup = styled.div`
  margin-bottom: var(--spacing-l, 24px);
  h4 {
    font-size: var(--font-size-large, 20px);
    color: var(--color-secondary-peach, #FFDAB9);
    margin-bottom: var(--spacing-s, 8px);
    border-bottom: 1px solid var(--color-primary-purple-light, #7A5FD3);
    padding-bottom: var(--spacing-s, 8px);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: var(--spacing-xs, 4px);
  font-size: var(--font-size-small, 14px);
`;

const Input = styled.input`
  width: 100%;
  padding: var(--spacing-s, 8px);
  border-radius: calc(var(--border-radius, 8px) / 2);
  border: 1px solid var(--color-primary-purple-light, #7A5FD3);
  background-color: color-mix(in srgb, var(--color-text-light, #FFFFFF) 95%, transparent);
  color: var(--color-text-dark, #333333);
  font-size: var(--font-size-medium, 16px);
  margin-bottom: var(--spacing-s, 8px);

  &[type="color"] {
    padding: 0;
    height: 40px;
  }
`;
const Select = styled.select`
  width: 100%;
  padding: var(--spacing-s, 8px);
  border-radius: calc(var(--border-radius, 8px) / 2);
  /* ... other styles similar to Input ... */
  background-color: white;
  color: black;
  margin-bottom: var(--spacing-s, 8px);
`;

const Button = styled.button`
  background-color: var(--color-secondary-peach, #FFDAB9);
  color: var(--color-text-dark, #333333);
  padding: var(--spacing-m, 16px) var(--spacing-l, 24px);
  font-size: var(--font-size-large, 20px);
  font-weight: bold;
  border: none;
  border-radius: var(--border-radius, 8px);
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
  margin-top: var(--spacing-m, 16px);

  &:hover {
    background-color: var(--color-secondary-peach-dark, #FFA07A);
  }
  &:disabled {
    background-color: var(--color-neutral-gray, #BDBDBD);
    cursor: not-allowed;
  }
`;

const GradientStopControl = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-s, 8px);
  margin-bottom: var(--spacing-s, 8px);
  input[type="color"] { width: 50px; height: 30px; padding: 0; }
  input[type="range"] { flex-grow: 1; }
  button { width: auto; padding: 5px; font-size: 12px; background-color: var(--color-error-red); color: white; }
`;


const DesignSkimboardPage = () => {
  const { currentDesign, updateDesign, updateGradientStop, addGradientStop, removeGradientStop, resetDesign } = useDesign();
  const { addItemToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const decalInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("customText.")) {
      const textProp = name.split(".")[1];
      updateDesign({
        customText: { ...currentDesign.customText, [textProp]: type === 'number' ? parseFloat(value) : value }
      });
    } else {
      updateDesign({ [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value) });
    }
  };
  
  const handleFontChange = (e) => {
     updateDesign({ customText: { ...currentDesign.customText, font: e.target.value } });
  };

  const handleDecalUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateDesign({
          decal: { ...currentDesign.decal, url: reader.result, name: file.name },
          isDecalEnabled: true
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGradientStopChange = (stopId, property, value) => {
    const numericValue = (property === 'offset' || property === 'opacity') ? parseFloat(value) : value;
    updateGradientStop(stopId, { [property]: numericValue });
  };

  const generateBackgroundStyle = () => {
    if (currentDesign.baseType === 'solid') {
      return currentDesign.solidColor;
    } else if (currentDesign.baseType === 'gradient' && currentDesign.gradientDetails.stops.length > 0) {
      const stopsStr = currentDesign.gradientDetails.stops
        .map(s => `${s.color} ${s.offset * 100}%`)
        .join(', ');
      if (currentDesign.gradientDetails.type === 'linear') {
        return `linear-gradient(${currentDesign.gradientDetails.angle}deg, ${stopsStr})`;
      }
      // Add radial gradient if needed
    }
    return '#CCCCCC'; // Default
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      // "Save" the design (mock API call)
      const savedDesignData = await saveCustomDesignAPI({
        ...currentDesign,
        userId: currentUser?._id, // Optional: associate with user
        // The API function in Data.js will assign an _id and createdAt
      });
      
      // Add to cart using the structure CartContext expects for custom items
      await addItemToCart(savedDesignData, 1); 
      alert('Custom skimboard added to cart!');
      resetDesign(); // Optional: reset form after adding
      navigate('/cart');
    } catch (error) {
      console.error("Error adding custom design to cart:", error);
      alert('Failed to add custom board to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const availableFonts = ["Arial", "Verdana", "Times New Roman", "Courier New", "Georgia", "Comic Sans MS"]; // Mock fonts

  return (
    <PageContainer>
      <ControlsPanel>
        <DesignTitle style={{fontSize: "var(--font-size-xlarge)"}}>Customize</DesignTitle>
        
        <ControlGroup>
          <h4>Base Style</h4>
          <Label htmlFor="baseType">Type:</Label>
          <Select name="baseType" id="baseType" value={currentDesign.baseType} onChange={handleInputChange}>
            <option value="solid">Solid Color</option>
            <option value="gradient">Gradient</option>
          </Select>

          {currentDesign.baseType === 'solid' && (
            <>
              <Label htmlFor="solidColor">Color:</Label>
              <Input type="color" name="solidColor" id="solidColor" value={currentDesign.solidColor} onChange={handleInputChange} />
            </>
          )}

          {currentDesign.baseType === 'gradient' && (
            <>
              <Label htmlFor="gradientType">Gradient Type:</Label>
              <Select name="gradientDetails.type" id="gradientType" value={currentDesign.gradientDetails.type} onChange={e => updateDesign({gradientDetails: {...currentDesign.gradientDetails, type: e.target.value}})}>
                <option value="linear">Linear</option>
                {/* <option value="radial">Radial</option> */}
              </Select>
              {currentDesign.gradientDetails.type === 'linear' && (
                 <>
                  <Label htmlFor="gradientAngle">Angle (deg):</Label>
                  <Input type="number" name="gradientDetails.angle" id="gradientAngle" value={currentDesign.gradientDetails.angle} onChange={e => updateDesign({gradientDetails: {...currentDesign.gradientDetails, angle: parseInt(e.target.value,10)}})} min="0" max="360" />
                 </>
              )}
              <Label>Color Stops:</Label>
              {currentDesign.gradientDetails.stops.map(stop => (
                <GradientStopControl key={stop.id}>
                  <input type="color" value={stop.color} onChange={e => handleGradientStopChange(stop.id, 'color', e.target.value)} />
                  <input type="range" min="0" max="1" step="0.01" value={stop.offset} onChange={e => handleGradientStopChange(stop.id, 'offset', e.target.value)} title={`Offset: ${stop.offset.toFixed(2)*100}%`}/>
                  <span>{`${(stop.offset * 100).toFixed(0)}%`}</span>
                  {currentDesign.gradientDetails.stops.length > 2 && /* Min 2 stops */
                    <button onClick={() => removeGradientStop(stop.id)} title="Remove stop">X</button>
                  }
                </GradientStopControl>
              ))}
              {currentDesign.gradientDetails.stops.length < 5 && /* Max 5 stops */
                <Button type="button" onClick={addGradientStop} style={{fontSize:'14px', padding:'8px', marginTop:'5px', backgroundColor: 'var(--color-accent-green)'}}>Add Color Stop</Button>
              }
            </>
          )}
        </ControlGroup>

        <ControlGroup>
            <h4>Text</h4>
            <Label htmlFor="isTextEnabled">Enable Text:</Label>
            <Input type="checkbox" name="isTextEnabled" id="isTextEnabled" checked={currentDesign.isTextEnabled} onChange={handleInputChange} style={{width:'auto', marginBottom:'10px'}}/>
            {currentDesign.isTextEnabled && (
                <>
                    <Label htmlFor="customText.text">Text:</Label>
                    <Input type="text" name="customText.text" id="customText.text" value={currentDesign.customText.text} onChange={handleInputChange} placeholder="Enter text here" />
                    <Label htmlFor="customText.font">Font:</Label>
                    <Select name="customText.font" id="customText.font" value={currentDesign.customText.font} onChange={handleFontChange}>
                        {availableFonts.map(font => <option key={font} value={font}>{font}</option>)}
                    </Select>
                    <Label htmlFor="customText.color">Text Color:</Label>
                    <Input type="color" name="customText.color" id="customText.color" value={currentDesign.customText.color} onChange={handleInputChange} />
                    <Label htmlFor="customText.size">Font Size (px):</Label>
                    <Input type="number" name="customText.size" id="customText.size" value={currentDesign.customText.size} onChange={handleInputChange} min="10" max="100" />
                </>
            )}
        </ControlGroup>
        
        <ControlGroup>
            <h4>Decal</h4>
            <Label htmlFor="isDecalEnabled">Enable Decal:</Label>
            <Input type="checkbox" name="isDecalEnabled" id="isDecalEnabled" checked={currentDesign.isDecalEnabled} onChange={handleInputChange} style={{width:'auto', marginBottom:'10px'}}/>
            {currentDesign.isDecalEnabled && (
                <>
                    <Label htmlFor="decalUpload">Upload Decal Image:</Label>
                    <Input type="file" id="decalUpload" accept="image/png, image/jpeg, image/svg+xml" onChange={handleDecalUpload} ref={decalInputRef} />
                    {currentDesign.decal.url && <p>Current decal: {currentDesign.decal.name}</p>}
                </>
            )}
        </ControlGroup>


        <Button onClick={handleAddToCart} disabled={isAddingToCart}>
          {isAddingToCart ? 'Adding...' : `Add to Cart ($${currentDesign.price.toFixed(2)})`}
        </Button>
        <Button type="button" onClick={resetDesign} style={{backgroundColor: 'var(--color-text-gray)', marginTop:'10px'}}>Reset Design</Button>

      </ControlsPanel>

      <PreviewPanel>
        <DesignTitle>Design your Skimboard</DesignTitle>
        <SkimboardPreviewContainer>
          <SkimboardVisual backgroundStyle={generateBackgroundStyle()}>
            {currentDesign.isTextEnabled && currentDesign.customText.text && (
              <PreviewText
                font={currentDesign.customText.font}
                size={currentDesign.customText.size}
                color={currentDesign.customText.color}
                weight={currentDesign.customText.weight}
                style={currentDesign.customText.style}
                align={currentDesign.customText.alignment}
              >
                {currentDesign.customText.text}
              </PreviewText>
            )}
            {currentDesign.isDecalEnabled && currentDesign.decal.url && (
              <PreviewDecal 
                src={currentDesign.decal.url} 
                alt="Decal Preview" 
                decalWidth={currentDesign.decal.size.width}
              />
            )}
          </SkimboardVisual>
        </SkimboardPreviewContainer>
      </PreviewPanel>
    </PageContainer>
  );
};

export default DesignSkimboardPage;