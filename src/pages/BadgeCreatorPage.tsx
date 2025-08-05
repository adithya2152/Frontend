import React, { useState } from 'react';
import BadgeCollection from '../components/BadgeCollection';
import BadgeCustomizer from '../components/BadgeCustomizer';
import { exportBadgesAsImage } from '../utils/imageExport';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Palette, Settings, Download, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { badgesAPI } from '../services/api';

const initialBadges = [
  {
    id: '1',
    name: 'Safe Driver',
    icon: 'Check',
    backgroundColor: '#10B981',
    textColor: '#FFFFFF',
    iconColor: '#FFFFFF',
    size: 'medium',
    shape: 'rounded',
    glowIntensity: 'medium'
  },
  {
    id: '2',
    name: 'Life Saver',
    icon: 'Heart',
    backgroundColor: '#EF4444',
    textColor: '#FFFFFF',
    iconColor: '#FFFFFF',
    size: 'medium',
    shape: 'rounded',
    glowIntensity: 'medium'
  },
  {
    id: '3',
    name: 'Doc Champ',
    icon: 'Star',
    backgroundColor: '#8B5CF6',
    textColor: '#FFFFFF',
    iconColor: '#FFFFFF',
    size: 'medium',
    shape: 'rounded',
    glowIntensity: 'medium'
  },
  {
    id: '4',
    name: 'Advocate',
    icon: 'MessageSquare',
    backgroundColor: '#A855F7',
    textColor: '#FFFFFF',
    iconColor: '#FFFFFF',
    size: 'medium',
    shape: 'rounded',
    glowIntensity: 'medium'
  },
  {
    id: '5',
    name: 'Goods Hero',
    icon: 'Shield',
    backgroundColor: '#F97316',
    textColor: '#FFFFFF',
    iconColor: '#FFFFFF',
    size: 'medium',
    shape: 'rounded',
    glowIntensity: 'medium'
  }
];

const BadgeCreatorPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [badges, setBadges] = useState(initialBadges);
  const [selectedBadge, setSelectedBadge] = useState(initialBadges[2]);
  const [featuredBadge, setFeaturedBadge] = useState(initialBadges[2]);

  if (!user || user.role !== 'manager') {
    if (onNavigate) {
      onNavigate('profile');
    } else {
      navigate('/profile');
    }
    return null;
  }

  const createNewBadge = async () => {
    const badgeName = 'New Badge'; // or get from user input
    const reason = null; // or set a default reason, or allow user to enter

    try {
      const response = await badgesAPI.addBadge({ badge_name: badgeName, reason });
      const data = response.data || response;
      if (data && data.length > 0) {
        const newBadge = {
          id: data[0].badge_id.toString(),
          name: data[0].badge_name,
          icon: 'Star',
          backgroundColor: '#3B82F6',
          textColor: '#FFFFFF',
          iconColor: '#FFFFFF',
          size: 'medium',
          shape: 'rounded',
          glowIntensity: 'medium',
          reason: data[0].reason
        };
        setBadges(prev => [...prev, newBadge]);
        setSelectedBadge(newBadge);
        setFeaturedBadge(newBadge);
      }
    } catch (error) {
      alert('Failed to save badge to database');
    }
  };

  const handleBadgeUpdate = async (updatedBadge: any) => {
    setSelectedBadge(updatedBadge);
    setFeaturedBadge(updatedBadge);
    setBadges(prev => prev.map(badge => badge.id === updatedBadge.id ? updatedBadge : badge));

    // If badge exists in backend, update it
    if (!isNaN(Number(updatedBadge.id))) { // If id is a number, it's from DB
      try {
        await badgesAPI.addBadge({ badge_name: updatedBadge.name, reason: updatedBadge.reason || null });
      } catch (error) {
        alert('Failed to update badge in database');
      }
    }
  };

  const handleBadgeSelect = (badge: any) => {
    setSelectedBadge(badge);
    setFeaturedBadge(badge);
  };

  const handleDeleteBadge = (badgeId?: string) => {
    if (badges.length === 1) return; // Prevent deleting the last badge
    const idToDelete = badgeId || selectedBadge.id;
    const newBadges = badges.filter(b => b.id !== idToDelete);
    setBadges(newBadges);
    // If the deleted badge was selected, select the first badge
    if (idToDelete === selectedBadge.id) {
      setSelectedBadge(newBadges[0]);
      setFeaturedBadge(newBadges[0]);
    }
  };

  const isOriginalBadge = (badgeId: string) => initialBadges.some(b => b.id === badgeId);

  const getDefaultBadge = (badgeId: string) => ({
    id: badgeId,
    name: 'New Badge',
    icon: 'Star',
    backgroundColor: '#3B82F6',
    textColor: '#FFFFFF',
    iconColor: '#FFFFFF',
    size: 'medium',
    shape: 'rounded',
    glowIntensity: 'medium'
  });

  const handleResetBadge = (badgeId?: string) => {
    const id = badgeId || selectedBadge.id;
    let resetBadge;
    if (isOriginalBadge(id)) {
      resetBadge = initialBadges.find(b => b.id === id);
    } else {
      resetBadge = getDefaultBadge(id);
    }
    if (resetBadge) {
      handleBadgeUpdate(resetBadge);
    }
  };

  const handleExportCollection = async () => {
    try {
      await exportBadgesAsImage(badges);
    } catch (error) {
      alert('Failed to export badges as image. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate ? onNavigate('profile') : navigate('/profile')}
              className="p-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                Badge Design Studio
              </h1>
              <p className="text-gray-600 mt-1">Create stunning driver achievement badges</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-4 py-2 bg-orange-50 rounded-xl">
              <Palette size={16} className="text-orange-600" />
              <span className="text-sm font-medium text-orange-700">Design Mode</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Badge Collection Panel */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <Settings size={20} className="text-orange-600" />
                <span>Badge Collection</span>
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleExportCollection}
                  className="p-2 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-600 transition-colors"
                  title="Export Collection"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
            {/* Badge Grid with Add Button and Delete Icon */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {badges.map((badge) => (
                <div 
                  key={badge.id} 
                  className={`relative cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedBadge.id === badge.id ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => handleBadgeSelect(badge)}
                >
                  <BadgeCollection 
                    badges={[badge]}
                    featuredBadge={badge}
                    onBadgeSelect={handleBadgeSelect}
                    onResetBadge={() => handleResetBadge(badge.id)}
                    onExportCollection={handleExportCollection}
                  />
                  {/* Reset Icon */}
                  <button
                    className="absolute top-1 left-1 bg-white rounded-full p-1 shadow hover:bg-gray-100 z-10"
                    title="Reset Badge"
                    onClick={e => { e.stopPropagation(); handleResetBadge(badge.id); }}
                  >
                    <RotateCcw size={16} className="text-gray-600" />
                  </button>
                  {/* Delete Icon (show only if more than 1 badge) */}
                  {badges.length > 1 && (
                    <button
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100 z-10"
                      title="Delete Badge"
                      onClick={e => { e.stopPropagation(); handleDeleteBadge(badge.id); }}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  )}
                </div>
              ))}
              {/* Add New Badge Button */}
              <button
                onClick={createNewBadge}
                className="w-full h-24 border-2 border-dashed border-orange-300 rounded-xl flex flex-col items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 group"
              >
                <Plus size={24} className="text-orange-400 group-hover:text-orange-500 mb-1" />
                <span className="text-xs font-medium text-orange-600 group-hover:text-orange-700">Add Badge</span>
              </button>
            </div>
            {/* Featured Badge Display */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="text-center">
                <div className="text-xs font-semibold text-orange-600 mb-2">FEATURED BADGE</div>
                <div className="flex justify-center">
                  <BadgeCollection 
                    badges={[featuredBadge]}
                    featuredBadge={featuredBadge}
                    onBadgeSelect={handleBadgeSelect}
                    onResetBadge={handleResetBadge}
                    onExportCollection={handleExportCollection}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Customizer Panel */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Palette size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Customize Badge</h2>
                <p className="text-sm text-gray-600">Modify colors, shapes, and effects</p>
              </div>
            </div>
            <BadgeCustomizer 
              badge={selectedBadge}
              onBadgeUpdate={handleBadgeUpdate}
            />
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={createNewBadge}
            className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
          >
            <Plus size={18} className="text-green-600" />
            <span className="font-medium text-green-700">Add New Badge</span>
          </button>
          <button
            onClick={() => handleDeleteBadge()}
            className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
            disabled={badges.length === 1}
          >
            <Trash2 size={18} className="text-red-600" />
            <span className="font-medium text-red-700">Delete Badge</span>
          </button>
          <button
            onClick={() => handleResetBadge()}
            className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <RotateCcw size={18} className="text-gray-600" />
            <span className="font-medium text-gray-700">Reset Badge</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeCreatorPage; 