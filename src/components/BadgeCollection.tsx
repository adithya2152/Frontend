import React from 'react';
import { Download, RotateCcw } from 'lucide-react';
import BadgeComponent from './BadgeComponent';

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

interface BadgeCollectionProps {
  badges: Badge[];
  featuredBadge: Badge;
  onBadgeSelect: (badge: Badge) => void;
  onResetBadge: () => void;
  onExportCollection: () => void;
}

const BadgeCollection: React.FC<BadgeCollectionProps> = ({
  badges,
  featuredBadge,
  onBadgeSelect,
  onResetBadge,
  onExportCollection
}) => {
  // If only one badge is passed, render it as a single badge
  if (badges.length === 1) {
    return (
      <div className="flex justify-center">
        <BadgeComponent badge={badges[0]} size="medium" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Badge Grid */}
      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge) => (
          <div 
            key={badge.id} 
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => onBadgeSelect(badge)}
          >
            <BadgeComponent badge={badge} size="small" />
          </div>
        ))}
      </div>

      {/* Featured Badge */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
        <div className="text-center">
          <div className="text-xs font-semibold text-orange-600 mb-2">FEATURED BADGE</div>
          <div className="flex justify-center">
            <BadgeComponent badge={featuredBadge} size="large" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 justify-end">
        <button 
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
          onClick={onResetBadge}
        >
          <RotateCcw size={14} />
          Reset
        </button>
        <button 
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
          onClick={onExportCollection}
        >
          <Download size={14} />
          Export
        </button>
      </div>
    </div>
  );
};

export default BadgeCollection; 