// File: src/contexts/DesignContext.js
import React, { createContext, useState, useContext } from 'react';

const DesignContext = createContext(null);

export const DesignProvider = ({ children }) => {
  const initialDesignState = {
    name: "My Custom Skimboard",
    boardShape: "classic_oval", // e.g., 'classic_oval', 'pro_pointed', 'wide_stable'
    baseType: "gradient", // 'solid', 'gradient'
    
    // Solid Color
    solidColor: "#FFFFFF",

    // Gradient
    gradientDetails: {
      type: "linear", // 'linear', 'radial'
      angle: 90, // degrees for linear
      stops: [
        { id: 'stop1', offset: 0, color: "#F2C2CE", opacity: 1 },
        { id: 'stop2', offset: 0.5, color: "#BDCE62", opacity: 1 },
        { id: 'stop3', offset: 1, color: "#A0C888", opacity: 1 },
      ],
    },

    // Text
    customText: {
      text: "Enter text here",
      font: "Arial", // Default font
      color: "#333333",
      size: 24, // in px
      position: { x: 50, y: 50 }, // Percentage or absolute, define convention
      alignment: 'center', // 'left', 'center', 'right'
      style: 'normal', // 'normal', 'italic'
      weight: 'normal', // 'normal', 'bold'
    },
    isTextEnabled: false,

    // Decal
    decal: {
      url: null, // Data URL or path to uploaded image
      name: null, // Filename of decal
      position: { x: 50, y: 50 }, // Percentage or absolute
      size: { width: 100, height: 100 }, // in px or percentage
      rotation: 0, // degrees
    },
    isDecalEnabled: false,

    // This will be calculated based on choices or a base price
    price: 70.00, // Base price for a custom board, can be adjusted by features
    isCustom: true, // To distinguish in cart
  };

  const [currentDesign, setCurrentDesign] = useState(initialDesignState);

  const updateDesign = (newConfig) => {
    setCurrentDesign(prev => ({ ...prev, ...newConfig }));
  };

  const updateGradientStop = (stopId, newStopProps) => {
    setCurrentDesign(prev => ({
        ...prev,
        gradientDetails: {
            ...prev.gradientDetails,
            stops: prev.gradientDetails.stops.map(stop => 
                stop.id === stopId ? { ...stop, ...newStopProps } : stop
            )
        }
    }));
  };

  const addGradientStop = () => {
    setCurrentDesign(prev => {
        const newId = `stop${prev.gradientDetails.stops.length + 1}`;
        // Add new stop typically in the middle or end, adjust offset accordingly
        const newOffset = prev.gradientDetails.stops.length > 0 
            ? Math.min(1, prev.gradientDetails.stops[prev.gradientDetails.stops.length - 1].offset + 0.2)
            : 0.5;
        return {
            ...prev,
            gradientDetails: {
                ...prev.gradientDetails,
                stops: [
                    ...prev.gradientDetails.stops,
                    { id: newId, offset: newOffset, color: "#CCCCCC", opacity: 1 }
                ].sort((a,b) => a.offset - b.offset) // Keep stops sorted by offset
            }
        };
    });
  };

  const removeGradientStop = (stopId) => {
    setCurrentDesign(prev => ({
        ...prev,
        gradientDetails: {
            ...prev.gradientDetails,
            stops: prev.gradientDetails.stops.filter(stop => stop.id !== stopId)
        }
    }));
  };

  const loadDesign = (designToLoad) => {
    // Make sure the structure of designToLoad matches initialDesignState
    // You might want to merge carefully or spread selectively
    setCurrentDesign({
        ...initialDesignState, // Start with a clean base to ensure all fields are present
        ...designToLoad,      // Override with the loaded design's properties
        _id: designToLoad._id || null // Keep track of the original ID if it exists
    });
  };

  const resetDesign = () => {
    setCurrentDesign({initialDesignState, _id: null});
  };

  const value = {
    currentDesign,
    updateDesign,
    loadDesign,
    updateGradientStop,
    addGradientStop,
    removeGradientStop,
    resetDesign,
  };

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>;
};

export const useDesign = () => useContext(DesignContext);