// File: src/pages/DesignSkimboard.js
import React from 'react';
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

const GradientControlsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  align-items: flex-start;
  width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const GradientStopsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const GradientStopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0;
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

  // Board color mode (solid/gradient)
  const colorMode = currentDesign.baseType;
  const setColorMode = (mode) => updateDesign({ baseType: mode });

  // Solid color
  const solidColor = currentDesign.solidColor || '#FFDAB9';
  const setSolidColor = (color) => updateDesign({ solidColor: color });

  // Gradient
  const gradientType = currentDesign.gradientDetails.type;
  const setGradientType = (type) => updateDesign({ gradientDetails: { ...currentDesign.gradientDetails, type } });
  const gradientAngle = currentDesign.gradientDetails.angle;
  const setGradientAngle = (angle) => updateDesign({ gradientDetails: { ...currentDesign.gradientDetails, angle } });
  const gradientStops = currentDesign.gradientDetails.stops;

  // Feature: text, decal, or none (exclusive)
  let feature = 'none';
  if (currentDesign.isTextEnabled) feature = 'text';
  else if (currentDesign.isDecalEnabled) feature = 'decal';
  const setFeature = (f) => {
    if (f === 'text') {
      updateDesign({ isTextEnabled: true, isDecalEnabled: false });
    } else if (f === 'decal') {
      updateDesign({ isTextEnabled: false, isDecalEnabled: true });
    } else {
      updateDesign({ isTextEnabled: false, isDecalEnabled: false });
    }
  };

  // Text feature
  const text = currentDesign.customText.text;
  const setText = (val) => updateDesign({ customText: { ...currentDesign.customText, text: val } });
  const textColor = currentDesign.customText.color;
  const setTextColor = (val) => updateDesign({ customText: { ...currentDesign.customText, color: val } });
  const textFont = currentDesign.customText.font;
  const setTextFont = (val) => updateDesign({ customText: { ...currentDesign.customText, font: val } });
  const textSize = currentDesign.customText.size;
  const setTextSize = (val) => updateDesign({ customText: { ...currentDesign.customText, size: val } });
  const textWeight = currentDesign.customText.weight;
  const setTextWeight = (val) => updateDesign({ customText: { ...currentDesign.customText, weight: val } });

  // Decal feature
  const decalUrl = currentDesign.decal.url;
  const decalName = currentDesign.decal.name;
  const handleDecalUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateDesign({
          decal: { ...currentDesign.decal, url: reader.result, name: file.name },
          isDecalEnabled: true,
          isTextEnabled: false
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Preview background
  function getGradientString(type, angle, stops) {
    const stopsString = stops
      .sort((a, b) => a.offset - b.offset)
      .map(stop => `${stop.color} ${Math.round(stop.offset * 100)}%`)
      .join(', ');
    return type === 'linear'
      ? `linear-gradient(${angle}deg, ${stopsString})`
      : `radial-gradient(circle, ${stopsString})`;
  }
  const previewBg = colorMode === 'solid'
    ? solidColor
    : getGradientString(gradientType, gradientAngle, gradientStops);

  // Add to cart (stub)
  const handleAddToCart = () => {
    alert('Custom skimboard added to cart!');
    navigate('/cart');
  };

  return (
    <PageWrapper>
      <h1 style={{ textAlign: 'center', color: '#FFDAB9', marginBottom: 32, fontSize: 36 }}>
        Design Your Custom Skimboard
      </h1>
      <Layout>
        <PreviewArea>
          <SkimboardShape bg={previewBg}>
            {feature === 'text' && text && (
              <PreviewText color={textColor} font={textFont} size={textSize} weight={textWeight}>
                {text}
              </PreviewText>
            )}
            {feature === 'decal' && decalUrl && (
              <PreviewDecal src={decalUrl} alt="Decal Preview" />
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
              <GradientControlsRow>
                <div style={{ minWidth: 0, flex: 1 }}>
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
                  <GradientPreview bg={previewBg} />
                </div>
                <GradientStopsRow style={{ flex: 2, minWidth: 0 }}>
                  {gradientStops.map((stop, i) => (
                    <GradientStopRow key={stop.id}>
                      <input type="color" value={stop.color} onChange={e => updateGradientStop(stop.id, { color: e.target.value })} />
                      <input
                        type="range"
                        min={0} max={1} step={0.01}
                        value={stop.offset}
                        onChange={e => updateGradientStop(stop.id, { offset: Math.max(0, Math.min(1, parseFloat(e.target.value))) })}
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
                </GradientStopsRow>
              </GradientControlsRow>
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