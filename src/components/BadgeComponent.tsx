import React from 'react';
import * as Icons from 'lucide-react';

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

const BadgeComponent: React.FC<{ badge: Badge; size?: 'small' | 'medium' | 'large' }> = ({ badge, size = 'medium' }) => {
  const IconComponent = (Icons as any)[badge.icon] || Icons.Star;

  const sizeClasses = {
    small: 'w-12 h-12 text-base',
    medium: 'w-16 h-16 text-lg',
    large: 'w-24 h-24 text-2xl',
  };

  const shapeClasses = {
    rounded: 'rounded-xl',
    square: 'rounded-none',
    circle: 'rounded-full',
  };

  const glowClasses = {
    none: '',
    low: 'shadow-md',
    medium: 'shadow-lg',
    high: 'shadow-2xl',
  };

  const badgeStyle: React.CSSProperties = {
    background: badge.gradientEnd
      ? `linear-gradient(135deg, ${badge.backgroundColor} 0%, ${badge.gradientEnd} 100%)`
      : badge.backgroundColor,
    color: badge.textColor,
    boxShadow: badge.glowIntensity !== 'none'
      ? `0 0 20px ${badge.backgroundColor}40`
      : undefined,
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${sizeClasses[size]} ${shapeClasses[badge.shape]} ${glowClasses[badge.glowIntensity]} border border-gray-200`}
      style={badgeStyle}
    >
      <div className="flex items-center justify-center mb-1">
        <IconComponent
          size={size === 'small' ? 16 : size === 'medium' ? 20 : 28}
          color={badge.iconColor}
        />
      </div>
      <div className="text-xs font-semibold text-center" style={{ color: badge.textColor }}>{badge.name}</div>
    </div>
  );
};

export default BadgeComponent; 