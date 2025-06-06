// File: src/pages/DesignSkimboard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDesign } from '../contexts/DesignContext'; // To manage design state

// --- STYLED COMPONENTS for the Design Page ---
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #181818;
  color: #fff;
  padding: 32px 0;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const PreviewArea = styled.div`
  flex: 1 1 0;
  background: #232323;
  border-radius: 12px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 0;
`;

const SkimboardShape = styled.div`
  width: 400px;
  height: 200px;
  border-radius: 200px / 100px;
  border: 2px solid #fff;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bg};
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
`;

const PreviewText = styled.div`
  position: absolute;
  color: ${props => props.color || '#fff'};
  font-family: ${props => props.font || 'Arial'};
  font-size: ${props => props.size || 28}px;
  font-weight: ${props => props.weight || 'bold'};
  width: 80%;
  text-align: center;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const PreviewDecal = styled.img`
  position: absolute;
  max-width: 80%;
  max-height: 80%;
  left: 10%;
  top: 10%;
  pointer-events: none;
`;

const Controls = styled.div`
  flex: 1 1 0;
  background: #5D3FD3;
  border-radius: 12px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 320px;
  max-width: 420px;
  @media (max-width: 900px) {
    max-width: 100%;
    min-width: 0;
  }
`;

const Section = styled.div`
  margin-bottom: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: #FFDAB9;
  margin-bottom: 10px;
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const GradientStopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

const AddStopBtn = styled.button`
  background: #232323;
  color: #FFDAB9;
  border: 1px solid #FFDAB9;
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;
  font-size: 0.95em;
  margin-top: 6px;
  &:hover { background: #FFDAB9; color: #232323; }
`;

const ToggleGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
`;

const ToggleBtn = styled.button`
  background: ${props => props.active ? '#FFDAB9' : '#232323'};
  color: ${props => props.active ? '#232323' : '#FFDAB9'};
  border: 1px solid #FFDAB9;
  border-radius: 4px;
  padding: 6px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
`;

const AddToCartBtn = styled.button`
  background: #FFDAB9;
  color: #232323;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 14px 0;
  margin-top: 18px;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #FFA07A; }
`;

const GradientPreview = styled.div`
  width: 100%;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #fff;
  margin: 8px 0 12px 0;
  background: ${props => props.bg};
`;

function getGradientString(type, angle, stops) {
  const stopsString = stops
    .sort((a, b) => a.offset - b.offset)
    .map(stop => `${stop.color} ${Math.round(stop.offset * 100)}%`)
    .join(', ');
  return type === 'linear'
    ? `linear-gradient(${angle}deg, ${stopsString})`
    : `radial-gradient(circle, ${stopsString})`;
}

const defaultStops = [
  { id: 1, color: '#FFDAB9', offset: 0 },
  { id: 2, color: '#5D3FD3', offset: 1 },
];

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

  // --- Local state for component ---
  // Color mode: solid or gradient
  const [colorMode, setColorMode] = useState('solid');
  const [solidColor, setSolidColor] = useState('#FFDAB9');
  const [gradientType, setGradientType] = useState('linear');
  const [gradientAngle, setGradientAngle] = useState(90);
  const [gradientStops, setGradientStops] = useState([...defaultStops]);

  // Feature mode: text, decal, or none
  const [feature, setFeature] = useState('none');

  // Text feature
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#fff');
  const [textFont, setTextFont] = useState('Arial');
  const [textSize, setTextSize] = useState(32);
  const [textWeight, setTextWeight] = useState('bold');

  // Decal feature
  const [decalUrl, setDecalUrl] = useState(null);
  const [decalName, setDecalName] = useState('');

  // Preview background
  const previewBg = colorMode === 'solid'
    ? solidColor
    : getGradientString(gradientType, gradientAngle, gradientStops);

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
      <h1 style={{ textAlign: 'center', color: '#FFDAB9', marginBottom: 32, fontSize: 36 }}>
        Design Your Custom Skimboard
      </h1>
      <Layout>
        <PreviewArea>
          <SkimboardShape style={{ background: skimboardBackground }}>
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
          </SkimboardShape>
        </PreviewArea>
        <Controls>
          <Section>
            <SectionTitle>Board Colour</SectionTitle>
            <ToggleGroup>
              <ToggleBtn active={colorMode === 'solid'} onClick={() => setColorMode('solid')}>Solid</ToggleBtn>
              <ToggleBtn active={colorMode === 'gradient'} onClick={() => setColorMode('gradient')}>Gradient</ToggleBtn>
            </ToggleGroup>
            {colorMode === 'solid' && (
              <Inline>
                <label>Pick Colour:</label>
                <input type="color" value={solidColor} onChange={e => setSolidColor(e.target.value)} />
              </Inline>
            )}
            {colorMode === 'gradient' && (
              <>
                <Inline>
                  <label>Type:</label>
                  <select value={gradientType} onChange={e => setGradientType(e.target.value)}>
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                  </select>
                  {gradientType === 'linear' && (
                    <>
                      <label>Angle:</label>
                      <input
                        type="number"
                        value={gradientAngle}
                        min={0}
                        max={360}
                        onChange={e => setGradientAngle(Number(e.target.value))}
                        style={{ width: 60 }}
                      />
                      <span>deg</span>
                    </>
                  )}
                </Inline>
                <GradientPreview style={{ background: getGradientString() }} />
                <div>
                  {gradientStops.map((stop, i) => (
                    <GradientStopRow key={stop.id}>
                      <input type="color" value={stop.color} onChange={e => handleStopColorChange(stop.id, e.target.value)} />
                      <input
                        type="range"
                        min={0} max={1} step={0.01}
                        value={stop.offset}
                        onChange={e => handleStopOffsetChange(stop.id, e.target.value)}
                        style={{ width: 100 }}
                      />
                      <span>{Math.round(stop.offset * 100)}%</span>
                      {gradientStops.length > 2 && (
                        <button onClick={() => removeGradientStop(stop.id)} style={{ color: 'red', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>X</button>
                      )}
                    </GradientStopRow>
                  ))}
                  {gradientStops.length < 5 && (
                    <AddStopBtn onClick={addGradientStop}>+ Add Stop</AddStopBtn>
                  )}
                </div>
              </>
            )}
          </Section>

          <Section>
            <SectionTitle>Feature</SectionTitle>
            <ToggleGroup>
              <ToggleBtn active={feature === 'none'} onClick={() => setFeature('none')}>None</ToggleBtn>
              <ToggleBtn active={feature === 'text'} onClick={() => setFeature('text')}>Text</ToggleBtn>
              <ToggleBtn active={feature === 'decal'} onClick={() => setFeature('decal')}>Decal</ToggleBtn>
            </ToggleGroup>
            {feature === 'text' && (
              <>
                <Inline>
                  <label>Text:</label>
                  <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text" style={{ flex: 1 }} />
                </Inline>
                <Inline>
                  <label>Colour:</label>
                  <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} />
                </Inline>
                <Inline>
                  <label>Font:</label>
                  <select value={textFont} onChange={e => setTextFont(e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                  </select>
                </Inline>
                <Inline>
                  <label>Size:</label>
                  <input type="number" value={textSize} min={12} max={80} onChange={e => setTextSize(Number(e.target.value))} style={{ width: 60 }} /> px
                </Inline>
                <Inline>
                  <label>Weight:</label>
                  <select value={textWeight} onChange={e => setTextWeight(e.target.value)}>
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="bolder">Bolder</option>
                    <option value="lighter">Lighter</option>
                  </select>
                </Inline>
              </>
            )}
            {feature === 'decal' && (
              <>
                <Inline>
                  <label>Upload Image:</label>
                  <input type="file" accept="image/*" onChange={handleDecalUpload} />
                </Inline>
                {decalUrl && <div style={{ color: '#FFDAB9', fontSize: 14, marginTop: 4 }}>Uploaded: {decalName}</div>}
              </>
            )}
          </Section>

          <AddToCartBtn onClick={handleAddToCart}>Add to Cart</AddToCartBtn>
        </Controls>
      </Layout>
    </PageWrapper>
  );
};

export default DesignSkimboard;