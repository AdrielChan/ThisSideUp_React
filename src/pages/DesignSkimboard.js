// File: src/pages/DesignSkimboard.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDesign } from '../contexts/DesignContext'; // To manage design state
//import { useCart } from '../contexts/CartContext';   // To add to cart (CREATE THIS CONTEXT)

// --- STYLED COMPONENTS for the Design Page ---
const PageWrapper = styled.div`
  padding: var(--spacing-l, 24px);
  background-color: var(--color-background-dark, #1A1A1A);
  color: var(--color-text-light, #FFFFFF);
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--color-secondary-peach, #FFDAB9);
  margin-bottom: var(--spacing-xl, 32px);
  font-size: var(--font-size-xxlarge, 32px);
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: column; /* Stack preview and controls vertically */
  gap: var(--spacing-xl, 32px);
  align-items: center; /* Center the main layout content */
  margin: 0 auto; /* Center the entire main layout */
  max-width: 1200px; /* Limit the maximum width of the entire content area */
  padding: 0 var(--spacing-l, 24px); /* Add horizontal padding to the main layout */
`;

const PreviewArea = styled.div`
  background-color: var(--color-background-dark-lighter, #2C2C2C);
  border-radius: var(--border-radius, 8px);
  padding: var(--spacing-l, 24px); /* Increased padding for the preview area */
  display: flex;
  flex-direction: column; /* Stack elements within preview area */
  align-items: center;
  justify-content: center;
  min-height: 300px;
  border: 1px solid var(--color-primary-purple, #5D3FD3);
  width: 100%; /* Take full width of parent on smaller screens */
  max-width: 600px; /* Limit max width for better centering on large screens */
`;

const SkimboardPreview = styled.div`
  width: 400px; /* Adjusted for a more horizontal look */
  height: 200px; /* Adjusted for a more horizontal look */
  border-radius: 200px / 100px; /* Adjusted for the oval shape (horizontal major axis) */
  border: 2px solid #FFF; /* Example border */
  position: relative; /* For positioning text and decals */
  overflow: hidden; /* Clip content to board shape */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(0,0,0,0.5); /* Add shadow for depth */
  // Background will be set dynamically
`;

const PreviewText = styled.div`
  position: absolute;
  text-align: center;
  color: ${props => props.color || '#FFF'}; /* Dynamic color */
  font-family: ${props => props.font || 'Arial'}; /* Dynamic font */
  font-size: ${props => props.fontSize || '24px'}; /* Dynamic size */
  font-style: ${props => props.fontStyle || 'normal'};
  font-weight: ${props => props.fontWeight || 'normal'};
  word-wrap: break-word; /* Prevent long words from overflowing */
  white-space: pre-wrap; /* Preserve newlines */
  max-width: 80%; /* Limit text width within the board */
`;

const PreviewDecal = styled.img`
  position: absolute;
  object-fit: contain;
  max-width: 80%; /* Limit decal size within the board */
  max-height: 80%;
`;

// Main Controls Area - This now holds ALL controls and will be the "purple box"
const ControlsArea = styled.div`
  background-color: var(--color-primary-purple, #5D3FD3); /* Purple background */
  border-radius: var(--border-radius, 8px);
  padding: var(--spacing-xl, 32px); /* Generous padding inside */
  width: 100%;
  max-width: 1000px; /* Matches reference image width */
  display: flex;
  flex-direction: column; /* Stacks the control sections and Add to Cart button */
  align-items: center; /* Centers items horizontally within this area */
  gap: var(--spacing-xl, 32px); /* Space between major sections and button */
  
  /* Flex container for the three main control groups (Color, Text, Decal) */
  > div:first-of-type { /* This targets the flex container for the three columns */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; /* Allows sections to wrap on smaller screens */
    justify-content: center;
    align-items: flex-start; /* Aligns content to the top within each section */
    gap: var(--spacing-l, 24px); /* Gap between the Colour, Text, and Decal sections */
    width: 100%; /* Ensure it takes full width of ControlsArea */
  }
`;

const ControlSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-s, 10px); /* Tighter spacing for controls within a section */
  color: var(--color-text-light, #FFFFFF);
  
  /* Flex basis for responsive columns */
  flex: 1 1 auto; /* Allows shrinking/growing, takes content width by default */
  min-width: 250px; /* Minimum width for each section before wrapping */

  /* Specific width adjustments for the 3 columns based on reference image */
  &:nth-child(1) { /* Colour section */
    flex-basis: 350px; /* Give more space for gradient controls */
    max-width: 400px;
  }
  &:nth-child(2), &:nth-child(3) { /* Text and Decal sections */
    flex-basis: 220px; /* Smaller width for these */
    max-width: 250px;
  }

  @media (max-width: 900px) { /* Adjust breakpoint for 2 columns */
    flex: 1 1 calc(50% - var(--spacing-l, 24px) / 2); /* Two columns */
    &:nth-child(1), &:nth-child(2), &:nth-child(3) {
        max-width: none; /* Remove max-width on smaller screens */
    }
  }

  @media (max-width: 600px) { /* Adjust breakpoint for single column */
    flex: 1 1 100%;
    max-width: none;
  }
`;

const SectionHeader = styled.p`
  font-size: var(--font-size-large, 20px);
  font-weight: bold;
  color: var(--color-secondary-peach-light, #FFEDDB);
  margin-bottom: var(--spacing-xs, 8px);
  text-align: left; /* Align header text to left */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* Subtle separator */
  padding-bottom: var(--spacing-xxs, 4px);
`;

const InlineControl = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs, 4px);
  margin-bottom: var(--spacing-xxs, 4px); /* Tighter spacing for inline controls */

  label {
    white-space: nowrap;
    min-width: 70px; /* Consistent width for labels */
  }
  input::placeholder {
    color: #aaa;
  }
  input, select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #555;
    background: #333;
    color: #fff;
    flex-grow: 1; /* Allow input to fill available space */
    box-sizing: border-box;
    font-size: inherit;
  }
  input[type="color"] {
    width: 50px; /* Specific width for color picker */
    flex-grow: 0;
    height: 35px;
    padding: 0;
    -webkit-appearance: none;
    border: none;
  }
  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 2px;
  }
  input[type="color"]::-webkit-color-swatch {
    border: none;
    border-radius: 2px;
    padding: 0;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 8px);
  margin-bottom: var(--spacing-s, 8px); /* Consistent spacing for checkboxes */
  cursor: pointer;

  input[type="checkbox"] {
    margin-right: 0; /* Remove default margin */
  }
`;

const GradientPreview = styled.div`
  width: 100%;
  height: 50px;
  border-radius: var(--border-radius-s, 4px);
  border: 1px solid var(--color-text-light, #FFFFFF);
  margin-top: var(--spacing-s, 8px);
  margin-bottom: var(--spacing-s, 8px);
  box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
  /* Background set dynamically */
`;

const GradientStopControl = styled.div`
  display: flex;
  gap: var(--spacing-xxs, 4px);
  align-items: center;
  margin-bottom: var(--spacing-xxs, 4px); /* Tighter spacing between stops */

  &:last-of-type {
      margin-bottom: 0; /* No bottom margin on the last stop */
  }

  span {
    min-width: 30px;
    text-align: right;
    font-size: 0.9em;
    color: #ccc;
  }

  button {
    background: none;
    border: none;
    color: var(--color-secondary-peach, #FFDAB9);
    cursor: pointer;
    font-weight: bold;
    padding: 0 5px;
    font-size: 1em;
    &:hover {
        color: red;
    }
  }
`;

const AddStopButton = styled.button`
    margin-top: var(--spacing-s, 8px);
    padding: var(--spacing-xs, 8px) var(--spacing-m, 16px);
    background-color: var(--color-background-dark, #1A1A1A); /* Darker background for button */
    color: var(--color-secondary-peach, #FFDAB9);
    border: 1px solid var(--color-secondary-peach, #FFDAB9);
    border-radius: var(--border-radius-s, 4px);
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
    font-size: 0.9em;
    width: fit-content;
    &:hover {
        background-color: var(--color-secondary-peach, #FFDAB9);
        color: var(--color-background-dark, #1A1A1A);
    }
`;

const ORText = styled.span`
  font-size: var(--font-size-large, 20px);
  font-weight: bold;
  color: var(--color-secondary-peach-light, #FFEDDB);
  margin: 0 var(--spacing-m, 16px); /* Space around OR */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Make it fill vertical space if needed */

  @media (max-width: 900px) { /* On smaller screens when elements wrap */
    width: 100%; /* OR spans full width */
    text-align: center;
    margin: var(--spacing-l, 24px) 0; /* More vertical margin */
    /* Add lines on either side to match some common UI patterns */
    &:before, &:after {
      content: "";
      flex-grow: 1;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.2);
      margin: 0 var(--spacing-xs, 8px);
    }
  }
`;

const UploadBox = styled.div`
  width: 120px; /* Size of the upload box */
  height: 120px;
  border: 2px dashed var(--color-text-light, #FFFFFF);
  border-radius: var(--border-radius, 8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xxs, 4px);
  cursor: pointer;
  transition: border-color 0.2s ease;
  margin-top: var(--spacing-s, 8px); /* Space below Enable Decal */

  &:hover {
    border-color: var(--color-secondary-peach, #FFDAB9);
  }

  input[type="file"] {
    display: none; /* Hide default file input */
  }

  svg { /* SVG for upload icon */
    width: 48px;
    height: 48px;
    fill: var(--color-text-light, #FFFFFF);
  }

  span {
    font-size: var(--font-size-s, 14px);
    text-align: center;
    color: var(--color-text-light, #FFFFFF);
  }
`;

const AddToCartButton = styled.button`
  background-color: var(--color-secondary-peach, #FFDAB9);
  color: var(--color-text-dark, #333333);
  padding: var(--spacing-m, 16px) var(--spacing-l, 24px);
  border: none;
  border-radius: var(--border-radius, 8px);
  font-size: var(--font-size-large, 20px);
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: fit-content; /* Adjust width to content */
  min-width: 200px; /* Minimum width for the button */
  align-self: center; /* Center button within ControlsArea */
  
  &:hover {
    background-color: var(--color-secondary-peach-dark, #FFA07A);
  }
`;


const DesignSkimboard = () => {
  const navigate = useNavigate();
  const {
    currentDesign,
    updateDesign,
    updateGradientStop,
    addGradientStop,
    removeGradientStop,
    resetDesign
  } = useDesign();

  // --- Handlers for UI controls ---
  const handleBaseTypeChange = (e) => updateDesign({ baseType: e.target.value });
  const handleSolidColorChange = (color) => updateDesign({ solidColor: color });

  const handleGradientTypeChange = (e) => updateDesign({ gradientDetails: { ...currentDesign.gradientDetails, type: e.target.value }});
  const handleGradientAngleChange = (e) => updateDesign({ gradientDetails: { ...currentDesign.gradientDetails, angle: parseInt(e.target.value, 10) }});

  const handleStopColorChange = (stopId, color) => updateGradientStop(stopId, { color });
  const handleStopOffsetChange = (stopId, offset) => {
    const newOffset = Math.max(0, Math.min(1, parseFloat(offset)));
    updateGradientStop(stopId, { offset: newOffset });
  };

  const handleTextChange = (text) => updateDesign({ customText: { ...currentDesign.customText, text } });
  const handleFontChange = (e) => updateDesign({ customText: { ...currentDesign.customText, font: e.target.value } });
  const handleTextColorChange = (color) => updateDesign({ customText: { ...currentDesign.customText, color } });
  const handleFontSizeChange = (e) => updateDesign({ customText: { ...currentDesign.customText, size: parseInt(e.target.value, 10) } });
  const handleFontWeightChange = (e) => updateDesign({ customText: { ...currentDesign.customText, weight: e.target.value } });

  const handleDecalUpload = (event) => {
    const file = event.target.files[0];
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

  const handleAddToCart = () => {
    const customSkimboardProduct = {
      _id: `custom_${Date.now()}`,
      name: currentDesign.name || "Custom Skimboard",
      price: currentDesign.price || 150,
      imageUrl: null,
      category: "Skimboards",
      type: "Custom",
      description: "User-designed custom skimboard.",
      isCustom: true,
      designDetails: currentDesign,
      quantity: 1,
    };
    alert(`${customSkimboardProduct.name} added to cart!`);
    navigate('/cart');
  };

  // --- Dynamic Styles for Preview ---
  const getGradientString = () => {
    const { type, angle, stops } = currentDesign.gradientDetails;
    const stopsString = stops
        .sort((a, b) => a.offset - b.offset)
        .map(stop => `${stop.color} ${stop.offset * 100}%`)
        .join(', ');
    return type === 'linear'
        ? `linear-gradient(${angle}deg, ${stopsString})`
        : `radial-gradient(circle, ${stopsString})`;
  };

  const skimboardBackground = currentDesign.baseType === 'solid'
    ? currentDesign.solidColor
    : getGradientString();

  return (
    <PageWrapper>
      <Title>Design Your Custom Skimboard</Title>
      <MainLayout>
        <PreviewArea>
          <SkimboardPreview style={{ background: skimboardBackground }}>
            {currentDesign.isTextEnabled && currentDesign.customText.text && (
              <PreviewText
                color={currentDesign.customText.color}
                font={currentDesign.customText.font}
                fontSize={`${currentDesign.customText.size}px`}
                fontWeight={currentDesign.customText.weight}
              >
                {currentDesign.customText.text}
              </PreviewText>
            )}
            {currentDesign.isDecalEnabled && currentDesign.decal.url && (
              <PreviewDecal
                src={currentDesign.decal.url}
                alt="Decal Preview"
              />
            )}
          </SkimboardPreview>
        </PreviewArea>

        <ControlsArea>
          {/* Main flex container for the three control columns */}
          <div>
            {/* Base Colour Section */}
            <ControlSection>
              <SectionHeader>Colour type selected: [{currentDesign.baseType === 'solid' ? 'Solid' : `Gradient (${currentDesign.gradientDetails.type})`}]</SectionHeader>
              
              <InlineControl>
                <label>Type:</label>
                <select value={currentDesign.baseType} onChange={handleBaseTypeChange}>
                  <option value="solid">Solid Color</option>
                  <option value="gradient">Gradient</option>
                </select>
              </InlineControl>

              {currentDesign.baseType === 'solid' && (
                <InlineControl>
                  <label>Solid Color:</label>
                  <input type="color" value={currentDesign.solidColor} onChange={e => handleSolidColorChange(e.target.value)} />
                </InlineControl>
              )}

              {currentDesign.baseType === 'gradient' && (
                <>
                  <InlineControl>
                    <label>Gradient Type:</label>
                    <select value={currentDesign.gradientDetails.type} onChange={handleGradientTypeChange}>
                      <option value="linear">Linear</option>
                      <option value="radial">Radial</option>
                    </select>
                  </InlineControl>
                  {currentDesign.gradientDetails.type === 'linear' && (
                    <InlineControl>
                      <label>Angle:</label>
                      <input
                        type="number"
                        value={currentDesign.gradientDetails.angle}
                        onChange={handleGradientAngleChange}
                        style={{width: '60px'}}
                      /> deg
                    </InlineControl>
                  )}
                  <GradientPreview style={{ background: getGradientString() }} />
                  <p style={{fontSize: '0.9em', marginBottom: 'var(--spacing-xxs, 4px)'}}>Stops:</p>
                  {currentDesign.gradientDetails.stops.map((stop) => (
                    <GradientStopControl key={stop.id}>
                      <input type="color" value={stop.color} onChange={(e) => handleStopColorChange(stop.id, e.target.value)} />
                      <input
                        type="range"
                        min="0" max="1" step="0.01"
                        value={stop.offset}
                        onChange={(e) => handleStopOffsetChange(stop.id, e.target.value)}
                      />
                      <span>{(stop.offset * 100).toFixed(0)}%</span>
                      {currentDesign.gradientDetails.stops.length > 2 && (
                          <button onClick={() => removeGradientStop(stop.id)}>X</button>
                      )}
                    </GradientStopControl>
                  ))}
                  {currentDesign.gradientDetails.stops.length < 5 && (
                      <AddStopButton onClick={addGradientStop}>+ Add Stop</AddStopButton>
                  )}
                </>
              )}
            </ControlSection>

            {/* Custom Text Section */}
            <ControlSection>
              <SectionHeader>Text:</SectionHeader>
              <CheckboxLabel
                label="Enable Text"
                checked={currentDesign.isTextEnabled}
                onChange={(checked) => updateDesign({isTextEnabled: checked})}
              >
                <input type="checkbox" checked={currentDesign.isTextEnabled} onChange={e => updateDesign({isTextEnabled: e.target.checked})} />
                Enable Text
              </CheckboxLabel>
              {currentDesign.isTextEnabled && (
                <>
                  <InlineControl>
                    <label>Text:</label>
                    <input
                        type="text"
                        value={currentDesign.customText.text}
                        onChange={e => handleTextChange(e.target.value)}
                        placeholder="Enter text here"
                    />
                  </InlineControl>
                  <InlineControl>
                    <label>Color:</label>
                    <input
                        type="color"
                        value={currentDesign.customText.color}
                        onChange={e => handleTextColorChange(e.target.value)}
                    />
                  </InlineControl>
                  <InlineControl>
                    <label>Font Family:</label>
                    <select value={currentDesign.customText.font} onChange={handleFontChange}>
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                    </select>
                  </InlineControl>
                  <InlineControl>
                    <label>Font Size:</label>
                    <input type="number" value={currentDesign.customText.size} onChange={handleFontSizeChange} style={{width: '60px'}} /> px
                  </InlineControl>
                  <InlineControl>
                    <label>Font Weight:</label>
                    <select value={currentDesign.customText.weight} onChange={handleFontWeightChange}>
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="bolder">Bolder</option>
                        <option value="lighter">Lighter</option>
                    </select>
                  </InlineControl>
                </>
              )}
            </ControlSection>
            
            <ORText>OR</ORText> {/* The "OR" separator */}

            {/* Decal/Image Section */}
            <ControlSection>
              <SectionHeader>Decal:</SectionHeader>
              <CheckboxLabel
                label="Enable Decal"
                checked={currentDesign.isDecalEnabled}
                onChange={(checked) => updateDesign({isDecalEnabled: checked})}
              >
                <input type="checkbox" checked={currentDesign.isDecalEnabled} onChange={e => updateDesign({isDecalEnabled: e.target.checked})} />
                Enable Decal
              </CheckboxLabel>
              {currentDesign.isDecalEnabled && (
                  <>
                      <UploadBox onClick={() => document.getElementById('decalUploadInput').click()}>
                        <svg viewBox="0 0 24 24">
                          <path d="M19.471 6.559c-.272.072-.559.112-.857.112-.34 0-.679-.053-1.008-.158C17.062 4.417 15.65 3 14 3c-1.845 0-3.328 1.483-3.328 3.328 0 .34-.053.679-.158 1.008-1.782.57-3.232 1.954-3.799 3.738C6.012 11.233 4 13.064 4 15.328c0 2.263 1.831 4.108 4.095 4.108h9.81c2.264 0 4.095-1.845 4.095-4.108-.001-2.264-1.832-4.108-4.096-4.108zm-9.06 9.444v-3.992h-2.433l4.63-4.63 4.63 4.63h-2.433v3.992h-4.394zm4.394 2.222h-4.394v-2.222h4.394v2.222z"/>
                        </svg>
                        <span>Upload Image</span>
                        <input id="decalUploadInput" type="file" accept="image/*" onChange={handleDecalUpload} />
                      </UploadBox>
                      {currentDesign.decal.url && <p style={{fontSize: '0.9em', color: '#ccc', margin: '5px 0'}}>Uploaded: {currentDesign.decal.name}</p>}
                  </>
              )}
            </ControlSection>
          </div>
          
          <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
        </ControlsArea>
      </MainLayout>
    </PageWrapper>
  );
};

export default DesignSkimboard;