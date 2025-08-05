import React, { useState } from 'react';
import { COLOR_PALETTE } from '../types/badgeConstants';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [showPalette, setShowPalette] = useState(false);

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
    setShowPalette(false);
  };

  return (
    <div className="relative inline-block w-full">
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded border cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => setShowPalette(!showPalette)}
        />
        <input
          type="text"
          className="border rounded px-2 py-1 w-24 text-xs"
          value={color.toUpperCase()}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
        />
      </div>
      {showPalette && (
        <div className="absolute z-10 mt-2 bg-white border rounded shadow p-2 grid grid-cols-6 gap-1">
          {COLOR_PALETTE.map((paletteColor) => (
            <button
              key={paletteColor}
              className={`w-5 h-5 rounded ${color === paletteColor ? 'ring-2 ring-orange-500' : ''}`}
              style={{ backgroundColor: paletteColor }}
              onClick={() => handleColorChange(paletteColor)}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker; 