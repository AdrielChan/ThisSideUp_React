// File: src/pages/DesignSkimboard.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDesign } from '../contexts/DesignContext'; // To manage design state
//import { useCart } from '../contexts/CartContext';   // To add to cart (CREATE THIS CONTEXT)

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
  flex-direction: column;
  gap: var(--spacing-xl, 32px);

  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const PreviewArea = styled.div`
  flex: 2;
  background-color: var(--color-background-dark-lighter, #2C2C2C);
  border-radius: var(--border-radius, 8px);
  padding: var(--spacing-m, 16px);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px; // Ensure it has some height
  border: 1px solid var(--color-primary-purple, #5D3FD3);
`;

const SkimboardPreview = styled.div`
  width: 200px; // Adjust as needed
  height: 400px; // Adjust as needed
  border-radius: 100px / 200px; // Oval shape
  border: 2px solid #FFF; // Example border
  position: relative; // For positioning text and decals
  overflow: hidden; // Clip content to board shape
  display: flex;
  align-items: center;
  justify-content: center;
  // Background will be set dynamically
`;

const PreviewText = styled.div`
  position: absolute;
  text-align: center;
  // Other styles (font, color, size) will be dynamic
`;

const PreviewDecal = styled.img`
  position: absolute;
  object-fit: contain;
  // Position and size will be dynamic
`;


const ControlsArea = styled.div`
  flex: 1;
  background-color: var(--color-background-dark-lighter, #2C2C2C);
  padding: var(--spacing-l, 24px);
  border-radius: var(--border-radius, 8px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l, 24px);
`;

const ControlSection = styled.div`
  h3 {
    color: var(--color-secondary-peach-light, #FFEDDB);
    margin-bottom: var(--spacing-m, 16px);
    border-bottom: 1px solid var(--color-primary-purple-light, #7A5FD3);
    padding-bottom: var(--spacing-s, 8px);
  }
`;

const AddToCartButton = styled.button`
  background-color: var(--color-secondary-peach, #FFDAB9);
  color: var(--color-text-dark, #333333);
  padding: var(--spacing-m, 16px);
  border: none;
  border-radius: var(--border-radius, 8px);
  font-size: var(--font-size-large, 20px);
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
  margin-top: var(--spacing-l, 24px);

  &:hover {
    background-color: var(--color-secondary-peach-dark, #FFA07A);
  }
`;

// Dummy UI components - REPLACE with actual ones
const ColorPicker = ({ value, onChange }) => <input type="color" value={value} onChange={e => onChange(e.target.value)} />;
const TextInput = ({ value, onChange, placeholder }) => <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{padding: '8px', borderRadius: '4px', border: '1px solid #555', background: '#333', color: '#fff', width: '100%'}}/>;
const FileInput = ({ onChange }) => <input type="file" accept="image/*" onChange={onChange} />;
const Checkbox = ({ checked, onChange, label }) => (
  <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
    {label}
  </label>
);


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
  
  // You'll need to create and import useCart
  

  // --- Handlers for UI controls ---
  const handleBaseTypeChange = (e) => updateDesign({ baseType: e.target.value });
  const handleSolidColorChange = (color) => updateDesign({ solidColor: color });

  const handleGradientTypeChange = (e) => updateDesign({ gradientDetails: { ...currentDesign.gradientDetails, type: e.target.value }});
  const handleGradientAngleChange = (e) => updateDesign({ gradientDetails: { ...currentDesign.gradientDetails, angle: parseInt(e.target.value, 10) }});
  
  const handleStopColorChange = (stopId, color) => updateGradientStop(stopId, { color });
  const handleStopOffsetChange = (stopId, offset) => {
    // Ensure offset is between 0 and 1
    const newOffset = Math.max(0, Math.min(1, parseFloat(offset)));
    updateGradientStop(stopId, { offset: newOffset });
  };


  const handleTextChange = (text) => updateDesign({ customText: { ...currentDesign.customText, text } });
  const handleFontChange = (e) => updateDesign({ customText: { ...currentDesign.customText, font: e.target.value } });
  // ... more handlers for text color, size, position, decal upload, etc.

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
    // Create a product object from the currentDesign
    const customSkimboardProduct = {
      _id: `custom_${Date.now()}`, // Generate a unique ID
      name: currentDesign.name || "Custom Skimboard",
      price: currentDesign.price, // This should be calculated based on options
      imageUrl: null, // You might generate a preview image or use a placeholder
      category: "Skimboards",
      type: "Custom",
      description: "User-designed custom skimboard.",
      isCustom: true,
      designDetails: currentDesign, // Store the full design configuration
      quantity: 1, // Default quantity when adding to cart
    };
    //addItemToCart(customSkimboardProduct); // Add to cart (from CartContext)
    alert(`${customSkimboardProduct.name} added to cart!`);
    navigate('/cart'); // Or wherever you want to redirect
  };

  // --- Dynamic Styles for Preview ---
  const getGradientString = () => {
    const { type, angle, stops } = currentDesign.gradientDetails;
    const stopsString = stops
        .sort((a, b) => a.offset - b.offset) // Ensure stops are sorted by offset
        .map(stop => `${stop.color} ${stop.offset * 100}%`)
        .join(', ');
    return type === 'linear' 
        ? `linear-gradient(${angle}deg, ${stopsString})`
        : `radial-gradient(circle, ${stopsString})`;
  };

  const skimboardBackground = currentDesign.baseType === 'solid' 
    ? currentDesign.solidColor 
    : getGradientString();

  const textPreviewStyle = {
    fontFamily: currentDesign.customText.font,
    color: currentDesign.customText.color,
    fontSize: `${currentDesign.customText.size}px`,
    fontStyle: currentDesign.customText.style,
    fontWeight: currentDesign.customText.weight,
    // Positioning needs more complex logic (e.g., top, left percentages)
    // top: `${currentDesign.customText.position.y}%`,
    // left: `${currentDesign.customText.position.x}%`,
    // transform: 'translate(-50%, -50%)', // For centering if x,y are center points
  };

  const decalPreviewStyle = {
    // top: `${currentDesign.decal.position.y}%`,
    // left: `${currentDesign.decal.position.x}%`,
    // width: `${currentDesign.decal.size.width}px`, // Or percentage
    // height: `${currentDesign.decal.size.height}px`,
    // transform: `translate(-50%, -50%) rotate(${currentDesign.decal.rotation}deg)`,
  };


  return (
    <PageWrapper>
      <Title>Design Your Custom Skimboard</Title>
      <MainLayout>
        <PreviewArea>
          <SkimboardPreview style={{ background: skimboardBackground }}>
            {currentDesign.isTextEnabled && currentDesign.customText.text && (
              <PreviewText style={textPreviewStyle}>
                {currentDesign.customText.text}
              </PreviewText>
            )}
            {currentDesign.isDecalEnabled && currentDesign.decal.url && (
              <PreviewDecal 
                src={currentDesign.decal.url} 
                alt="Decal Preview"
                style={decalPreviewStyle} 
              />
            )}
          </SkimboardPreview>
        </PreviewArea>

        <ControlsArea>
          <ControlSection>
            <h3>Board Name</h3>
            <TextInput 
              value={currentDesign.name} 
              onChange={(val) => updateDesign({ name: val })}
              placeholder="Enter board name"
            />
          </ControlSection>

          <ControlSection>
            <h3>Base Colour</h3>
            <select value={currentDesign.baseType} onChange={handleBaseTypeChange} style={{padding: '8px', marginBottom: '10px'}}>
              <option value="solid">Solid Color</option>
              <option value="gradient">Gradient</option>
            </select>

            {currentDesign.baseType === 'solid' && (
              <div>
                <label>Solid Color: </label>
                <ColorPicker value={currentDesign.solidColor} onChange={handleSolidColorChange} />
              </div>
            )}

            {currentDesign.baseType === 'gradient' && (
              <div>
                <h4>Gradient Options</h4>
                <label>Type: </label>
                <select value={currentDesign.gradientDetails.type} onChange={handleGradientTypeChange} style={{padding: '8px', marginBottom: '10px'}}>
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                </select>
                {currentDesign.gradientDetails.type === 'linear' && (
                  <div>
                    <label>Angle: </label>
                    <input 
                      type="number" 
                      value={currentDesign.gradientDetails.angle} 
                      onChange={handleGradientAngleChange} 
                      style={{padding: '8px', width: '60px'}}
                    /> degrees
                  </div>
                )}
                <h5>Stops:</h5>
                {currentDesign.gradientDetails.stops.map((stop, index) => (
                  <div key={stop.id} style={{display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '5px'}}>
                    <ColorPicker value={stop.color} onChange={(color) => handleStopColorChange(stop.id, color)} />
                    <input 
                      type="range" 
                      min="0" max="1" step="0.01" 
                      value={stop.offset} 
                      onChange={(e) => handleStopOffsetChange(stop.id, e.target.value)} 
                    />
                    <span>{(stop.offset * 100).toFixed(0)}%</span>
                    {currentDesign.gradientDetails.stops.length > 2 && (
                         <button onClick={() => removeGradientStop(stop.id)} style={{color: 'red', background: 'none', border: 'none'}}>X</button>
                    )}
                  </div>
                ))}
                {currentDesign.gradientDetails.stops.length < 5 && ( // Limit number of stops
                    <button onClick={addGradientStop} style={{marginTop: '10px', padding: '5px 10px'}}>+ Add Stop</button>
                )}
              </div>
            )}
          </ControlSection>

          <ControlSection>
            <h3>Custom Text</h3>
            <Checkbox 
              label="Enable Text"
              checked={currentDesign.isTextEnabled}
              onChange={(checked) => updateDesign({isTextEnabled: checked})}
            />
            {currentDesign.isTextEnabled && (
              <>
                <TextInput 
                    value={currentDesign.customText.text} 
                    onChange={handleTextChange} 
                    placeholder="Your Text Here"
                />
                {/* TODO: Add inputs for font, text color, size, position, etc. */}
                <label>Font Color: </label>
                <ColorPicker 
                    value={currentDesign.customText.color} 
                    onChange={(color) => updateDesign({ customText: {...currentDesign.customText, color }})} 
                />
                {/* Example Font Selector - use a proper dropdown */}
                <label>Font Family: </label>
                <select value={currentDesign.customText.font} onChange={handleFontChange} style={{padding: '8px', marginBottom: '10px'}}>
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                    {/* Add more fonts from Data.js or system fonts */}
                </select>
              </>
            )}
          </ControlSection>

          <ControlSection>
            <h3>Decal/Image</h3>
             <Checkbox 
              label="Enable Decal"
              checked={currentDesign.isDecalEnabled}
              onChange={(checked) => updateDesign({isDecalEnabled: checked})}
            />
            {currentDesign.isDecalEnabled && (
                <>
                    <FileInput onChange={handleDecalUpload} />
                    {currentDesign.decal.url && <p>Uploaded: {currentDesign.decal.name}</p>}
                    {/* TODO: Add inputs for decal position, size, rotation */}
                </>
            )}
          </ControlSection>
          
          <button onClick={resetDesign} style={{padding: '10px', background: '#444', color: 'white', border: 'none', borderRadius: '4px'}}>Reset Design</button>
          <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
        </ControlsArea>
      </MainLayout>
    </PageWrapper>
  );
};

export default DesignSkimboard;