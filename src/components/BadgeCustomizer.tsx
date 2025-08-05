import React from 'react';
import ColorPicker from './ColorPicker';
import { ICON_OPTIONS } from '../types/badgeConstants';

interface Badge {
  id: string;
  name: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
  iconColor: string;
  size: string;
  shape: string;
  glowIntensity: string;
  gradientEnd?: string;
}

interface BadgeCustomizerProps {
  badge: Badge;
  onBadgeUpdate: (badge: Badge) => void;
}

const BadgeCustomizer: React.FC<BadgeCustomizerProps> = ({ badge, onBadgeUpdate }) => {
  const handleInputChange = (field: string, value: any) => {
    onBadgeUpdate({ ...badge, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Basic Properties Section */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
          Basic Properties
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Badge Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={badge.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={badge.icon}
              onChange={(e) => handleInputChange('icon', e.target.value)}
            >
              {ICON_OPTIONS.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={badge.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={badge.shape}
              onChange={(e) => handleInputChange('shape', e.target.value)}
            >
              <option value="rounded">Rounded</option>
              <option value="square">Square</option>
              <option value="circle">Circle</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Glow Intensity</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={badge.glowIntensity}
              onChange={(e) => handleInputChange('glowIntensity', e.target.value)}
            >
              <option value="none">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Color & Style Section */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
          Color & Style
        </h3>
        
        <div className="space-y-4">
          {/* Background Gradient */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Gradient</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Start Color</label>
                <ColorPicker
                  color={badge.backgroundColor}
                  onChange={(color) => handleInputChange('backgroundColor', color)}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">End Color</label>
                <ColorPicker
                  color={badge.gradientEnd || badge.backgroundColor}
                  onChange={(color) => handleInputChange('gradientEnd', color)}
                />
              </div>
            </div>
          </div>
          
          {/* Text and Icon Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <ColorPicker
                color={badge.textColor}
                onChange={(color) => handleInputChange('textColor', color)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon Color</label>
              <ColorPicker
                color={badge.iconColor}
                onChange={(color) => handleInputChange('iconColor', color)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeCustomizer; 