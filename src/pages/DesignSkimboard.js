// File: src/pages/DesignSkimboard.js
import React from 'react'; // Removed useState, useEffect as they are not directly used by this component's own state. They are used by useDesign.
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDesign } from '../contexts/DesignContext';
// import { useCart } from '../contexts/CartContext'; // Assuming this will be re-enabled

// --- ICONS (if you use them for + / - buttons) ---
// import { FaPlus, FaMinus } from 'react-icons/fa';

// --- STYLED COMPONENTS ---

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-primary-purple-darker, #3A004D); /* Main dark purple from Figma */
  color: var(--color-text-light, #FFFFFF);
  padding: var(--spacing-m, 16px);
  box-sizing: border-box;
  /* Add the beach background image */
  background-image: url('/images/beach-background.jpg'); /* REPLACE with your actual background image path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  &::before { /* Dark overlay for content readability */
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3); /* Adjust opacity as needed */
    z-index: 1;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2; /* Above the overlay */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl, 32px) 0;
  flex-shrink: 0; /* Prevent this section from shrinking too much */
`;

const PageTitle = styled.h1`
  font-family: var(--font-heading, 'serif'); /* Match Figma if it's serif */
  font-size: var(--font-size-hero-small, 36px); /* From Figma "Design your Skimboard" */
  color: var(--color-text-light, #FFFFFF);
  margin-bottom: var(--spacing-l, 24px);
  text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
`;

const SkimboardPreviewWrapper = styled.div`
  /* This wrapper helps with positioning the text overlay if needed */
`;

const SkimboardPreview = styled.div`
  width: 450px;  /* Adjust based on Figma */
  height: 220px;  /* Adjust based on Figma (approx half width for oval) */
  border-radius: 225px / 110px; /* Creates an oval shape */
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255,255,255,0.3); // Subtle border
`;

const PreviewText = styled.div`
  position: absolute; /* Positioned within SkimboardPreview */
  font-family: ${(props) => props.font || 'Arial'};
  font-size: ${(props) => props.fontSize || '24px'};
  color: ${(props) => props.color || '#000000'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  font-style: ${(props) => props.fontStyle || 'normal'};
  text-align: center;
  padding: 5px 10px; // Some padding for the text
  // White background with slight transparency for text if needed, or just direct text
  // background-color: rgba(255, 255, 255, 0.1); 
  // border-radius: 4px;
  max-width: 80%;
  word-wrap: break-word;
`;

const PreviewDecal = styled.img`
  position: absolute;
  /* Dynamic positioning and sizing will be applied via inline styles */
  max-width: 80%; /* Limit decal size relative to board */
  max-height: 80%;
  object-fit: contain;
`;

const ControlsSection = styled.div`
  background-color: var(--color-primary-purple, #4B0082); /* Darker purple background for controls area from Figma */
  padding: var(--spacing-xl, 32px) var(--spacing-l, 24px);
  border-radius: var(--border-radius-large, 12px); /* Rounded corners for the control panel */
  margin-top: auto; /* Pushes this section to the bottom if TopSection doesn't fill height */
  box-shadow: 0 -5px 15px rgba(0,0,0,0.2);
`;

const ControlRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Responsive columns */
  gap: var(--spacing-xl, 32px);
  align-items: flex-start; /* Align items at the top of their grid cell */

  @media (min-width: 992px) { // 3 columns for larger screens
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ControlColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m, 16px);
  
  h3 { // Section titles like "Colour type selected:"
    font-family: var(--font-main, 'sans-serif');
    font-size: var(--font-size-medium, 16px);
    color: var(--color-text-light, #FFFFFF);
    margin-bottom: var(--spacing-s, 8px);
    font-weight: normal;
  }
  h4 { // Sub-titles like "Stops"
    font-family: var(--font-main, 'sans-serif');
    font-size: var(--font-size-small, 14px);
    color: var(--color-neutral-gray, #BDBDBD);
    margin-top: var(--spacing-m, 16px);
    margin-bottom: var(--spacing-xs, 4px);
  }
`;

// Common input styling
const commonInputStyles = css`
  background-color: var(--color-input-background, #FFFFFF); /* White input background from Figma */
  color: var(--color-text-dark, #333333);
  border: 1px solid var(--color-neutral-gray-dark, #757575);
  border-radius: var(--border-radius-s, 4px);
  padding: var(--spacing-s, 8px);
  font-size: var(--font-size-medium, 16px);
  width: 100%;
  box-sizing: border-box;
`;

const StyledSelect = styled.select`
  ${commonInputStyles}
`;

const StyledTextInput = styled.input`
  ${commonInputStyles}
`;

const GradientPreviewBar = styled.div`
  width: 100%;
  height: 50px; /* Height from Figma */
  border-radius: var(--border-radius-s, 4px);
  border: 1px solid var(--color-neutral-gray-light, #E0E0E0);
  margin-bottom: var(--spacing-s, 8px);
`;

const ColorStopEditor = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 4px);
  margin-bottom: var(--spacing-xs, 4px);
  
  input[type="color"] {
    width: 30px;
    height: 30px;
    border: 1px solid var(--color-neutral-gray-light, #E0E0E0);
    border-radius: var(--border-radius-s, 4px);
    padding: 2px;
    background-color: transparent; /* Let the color show through */
  }
  input[type="range"] { /* Offset slider */
    flex-grow: 1;
    margin: 0 var(--spacing-xs, 4px);
  }
  span { /* Percentage display */
    font-size: var(--font-size-small, 12px);
    color: var(--color-neutral-gray, #BDBDBD);
    min-width: 30px;
    text-align: right;
  }
  button { /* Add/Remove buttons */
    background: none;
    border: none;
    color: var(--color-secondary-peach, #FFDAB9);
    cursor: pointer;
    font-size: var(--font-size-large, 20px);
    padding: 0 var(--spacing-xs, 4px);
  }
`;

const FontSelectButton = styled.button`
  ${commonInputStyles}
  text-align: left;
  cursor: pointer;
  &:hover {
    border-color: var(--color-secondary-peach, #FFDAB9);
  }
`;

const DecalUploadBox = styled.label`
  ${commonInputStyles}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px; /* Approximate height from Figma */
  cursor: pointer;
  text-align: center;
  border-style: dashed;
  
  input[type="file"] {
    display: none;
  }

  svg { /* Placeholder for upload icon */
    font-size: 32px;
    color: var(--color-neutral-gray, #BDBDBD);
    margin-bottom: var(--spacing-s, 8px);
  }

  &:hover {
    border-color: var(--color-secondary-peach, #FFDAB9);
    svg, p {
      color: var(--color-secondary-peach, #FFDAB9);
    }
  }
`;

const OrText = styled.p`
  font-size: var(--font-size-large, 20px);
  color: var(--color-text-light, #FFFFFF);
  text-align: center;
  margin: var(--spacing-m, 16px) 0;
  align-self: center; /* For column layout in mobile */
`;


const AddToCartButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: var(--spacing-l, 24px) 0;
`;

const AddToCartButton = styled.button`
  background-color: var(--color-accent-purple-button, #8A2BE2); /* Purple button from Figma */
  color: var(--color-text-light, #FFFFFF);
  padding: var(--spacing-m, 12px) var(--spacing-xxl, 48px); /* Generous padding */
  border: none;
  border-radius: var(--border-radius-m, 6px);
  font-size: var(--font-size-xlarge, 22px); /* Large font size */
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: color-mix(in srgb, var(--color-accent-purple-button, #8A2BE2) 85%, white);
  }
`;

// Placeholder for file input
const FileInput = ({ onChange }) => <input type="file" accept="image/*" onChange={onChange} style={{ display: 'none' }} />;


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
  
  // const { addItemToCart } = useCart ? useCart() : { addItemToCart: () => console.warn("CartContext not found") }; 

  const handleBaseTypeChange = (e) => updateDesign({ baseType: e.target.value });
  const handleSolidColorChange = (color) => updateDesign({ solidColor: color });

  const handleGradientTypeChange = (e) => updateDesign({ gradientDetails: { ...currentDesign.gradientDetails, type: e.target.value }});
  const handleGradientAngleChange = (e) => {
    const angle = parseInt(e.target.value, 10);
    if (!isNaN(angle)) {
        updateDesign({ gradientDetails: { ...currentDesign.gradientDetails, angle }});
    }
  };
  
  const handleStopColorChange = (stopId, color) => updateGradientStop(stopId, { color });
  const handleStopOffsetChange = (stopId, offset) => {
    const newOffset = Math.max(0, Math.min(1, parseFloat(offset)));
    updateGradientStop(stopId, { offset: newOffset });
  };

  const handleTextChange = (text) => updateDesign({ customText: { ...currentDesign.customText, text } });
  const handleFontChange = (e) => updateDesign({ customText: { ...currentDesign.customText, font: e.target.value } });
  const handleTextColorChange = (color) => updateDesign({ customText: { ...currentDesign.customText, color }});
  
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
    const customSkimboardProduct = { /* ... as before ... */ };
    // addItemToCart(customSkimboardProduct);
    alert(`${currentDesign.name || "Custom Skimboard"} added to cart! (Price: $${currentDesign.price.toFixed(2)})`);
    // navigate('/cart'); 
  };

  const getGradientString = () => {
    const { type, angle, stops } = currentDesign.gradientDetails;
    if (!stops || stops.length === 0) return 'transparent'; // Fallback
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
      <ContentContainer>
        <TopSection>
          <PageTitle>Design your Skimboard</PageTitle>
          <SkimboardPreviewWrapper>
            <SkimboardPreview style={{ background: skimboardBackground }}>
              {currentDesign.isTextEnabled && currentDesign.customText.text && (
                <PreviewText 
                  font={currentDesign.customText.font}
                  fontSize={`${currentDesign.customText.size}px`}
                  color={currentDesign.customText.color}
                  fontWeight={currentDesign.customText.weight}
                  fontStyle={currentDesign.customText.style}
                >
                  {currentDesign.customText.text}
                </PreviewText>
              )}
              {currentDesign.isDecalEnabled && currentDesign.decal.url && (
                <PreviewDecal 
                  src={currentDesign.decal.url} 
                  alt={currentDesign.decal.name || "Decal Preview"}
                  // style={decalPreviewStyle} // TODO: Implement dynamic decal styling
                />
              )}
            </SkimboardPreview>
          </SkimboardPreviewWrapper>
        </TopSection>

        <ControlsSection>
          <ControlRow>
            {/* --- Column 1: Colour --- */}
            <ControlColumn>
              <h3>Colour type selected: [{currentDesign.baseType === 'gradient' ? `Gradient (${currentDesign.gradientDetails.type})` : 'Solid'}]</h3>
              <StyledSelect value={currentDesign.baseType} onChange={handleBaseTypeChange}>
                <option value="solid">Solid Color</option>
                <option value="gradient">Gradient</option>
              </StyledSelect>

              {currentDesign.baseType === 'solid' && (
                <input type="color" value={currentDesign.solidColor} onChange={(e) => handleSolidColorChange(e.target.value)} style={{width: '100%', height: '40px'}}/>
              )}

              {currentDesign.baseType === 'gradient' && (
                <>
                  <StyledSelect value={currentDesign.gradientDetails.type} onChange={handleGradientTypeChange}>
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                  </StyledSelect>
                  {currentDesign.gradientDetails.type === 'linear' && (
                    <div>
                      <label htmlFor="gradientAngle" style={{fontSize: '14px', color: '#ccc'}}>Angle: </label>
                      <input 
                        type="number" 
                        id="gradientAngle"
                        value={currentDesign.gradientDetails.angle} 
                        onChange={handleGradientAngleChange} 
                        style={{padding: '6px', width: '70px', marginLeft:'5px', background:'#fff', color:'#333', border:'1px solid #777', borderRadius:'4px'}}
                      /> °
                    </div>
                  )}
                  <GradientPreviewBar style={{background: getGradientString()}} />
                  <h4>Stops</h4>
                  {currentDesign.gradientDetails.stops.map((stop) => (
                    <ColorStopEditor key={stop.id}>
                      <input type="color" value={stop.color} onChange={(e) => handleStopColorChange(stop.id, e.target.value)} />
                      <input 
                        type="range" 
                        min="0" max="1" step="0.01" 
                        value={stop.offset} 
                        onChange={(e) => handleStopOffsetChange(stop.id, e.target.value)} 
                      />
                      <span>{(stop.offset * 100).toFixed(0)}%</span>
                      {currentDesign.gradientDetails.stops.length > 2 && (
                           <button onClick={() => removeGradientStop(stop.id)} title="Remove stop">－</button>
                      )}
                    </ColorStopEditor>
                  ))}
                  {currentDesign.gradientDetails.stops.length < 5 && (
                      <button onClick={addGradientStop} title="Add stop" style={{alignSelf: 'flex-start', background: 'var(--color-secondary-peach, #FFDAB9)', color: '#333', border: 'none', padding: '5px 8px', borderRadius: '4px'}}>＋</button>
                  )}
                </>
              )}
            </ControlColumn>

            {/* --- Column 2: Text --- */}
            <ControlColumn>
              <h3>Text:</h3>
              {/* Removed Checkbox, text input is always visible for editing */}
              <StyledTextInput 
                  value={currentDesign.customText.text} 
                  onChange={(e) => handleTextChange(e.target.value)} 
                  placeholder="Enter text here"
              />
              <FontSelectButton onClick={() => alert("Font selection UI to be implemented")}>
                 {currentDesign.customText.font || "< Select Font >"}
              </FontSelectButton>
              {/* Hidden checkbox to control text visibility on board, controlled by text input presence */}
              <input 
                type="checkbox" 
                checked={currentDesign.isTextEnabled} 
                onChange={(e) => updateDesign({ isTextEnabled: e.target.checked })} 
                style={{display: 'none'}} 
                id="textEnableCheckbox"
              />
              {/* TODO: Add more text controls: color, size, specific font family dropdown based on Data.js */}
            </ControlColumn>

            {/* --- Column 3: Decal --- */}
            <ControlColumn>
              <h3>Decal:</h3>
              <DecalUploadBox htmlFor="decalFileInput">
                {/* Basic Upload Icon - Replace with an SVG icon for better styling */}
                <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 4h14v-2H5z"></path></svg>
                <p>{currentDesign.decal.name || "Upload Image"}</p>
                <FileInput id="decalFileInput" onChange={handleDecalUpload} />
              </DecalUploadBox>
               {/* Hidden checkbox to control decal visibility, controlled by decal.url presence */}
              <input 
                type="checkbox" 
                checked={currentDesign.isDecalEnabled} 
                onChange={(e) => updateDesign({ isDecalEnabled: e.target.checked })} 
                style={{display: 'none'}}
                id="decalEnableCheckbox"
              />
              {/* TODO: Add decal positioning and scaling controls if decal is uploaded */}
            </ControlColumn>
          </ControlRow>
          
          <AddToCartButtonWrapper>
            <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
          </AddToCartButtonWrapper>
          <button onClick={resetDesign} style={{padding: '10px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid #777', borderRadius: '4px', alignSelf:'center', marginTop:'10px'}}>Reset Design</button>

        </ControlsSection>
      </ContentContainer>
    </PageWrapper>
  );
};

export default DesignSkimboard;