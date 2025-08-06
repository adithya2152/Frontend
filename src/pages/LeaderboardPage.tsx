import React, { useState, useEffect } from 'react';
import { Search, Trophy, Medal, Award, FileText, HeartPulse, ShieldCheck, Truck, Star, Smile, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:3001/api';
// const API_BASE_URL = `${import.meta.env.API_URL}/api`;

// TypeScript interfaces
interface Badge {
  badge_name: string;
}

interface Driver {
  driver_id: string;
  name: string;
  score: number;
  badges: Badge[];
  rank: number;
}

interface BadgeMeta {
  color: string;
  legendColor: string;
  label: string;
  icon: React.ReactElement;
}

interface LeaderboardPageProps {
  onNavigate?: (page: string) => void;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      if (user.role === 'manager') {
        fetchLeaderboard(user.username);
      } else if (user.role === 'driver') {
        fetchDriverLeaderboard(user.username);
      }
    }
  }, [user]);

  useEffect(() => {
    const filtered = drivers.filter(driver =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDrivers(filtered);
  }, [drivers, searchTerm]);

  const fetchLeaderboard = async (manager_username?: string) => {
    setLoading(true);
    try {
      const url = manager_username
        ? `${API_BASE_URL}/leaderboard/${manager_username}`
        : `${API_BASE_URL}/leaderboard`;
      console.log("Fetching from URL:", url); // <-- ADD THIS LINE
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      const data = await response.json();
      // Add rank to each driver
      const driversWithRank: Driver[] = data.map((driver: any, index: number) => ({
        ...driver,
        rank: index + 1
      }));
      setDrivers(driversWithRank);
      setFilteredDrivers(driversWithRank);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setDrivers([]);
      setFilteredDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDriverLeaderboard = async (driverId: string) => {
    setLoading(true);
    try {
      const driverResponse = await fetch(`${API_BASE_URL}/drivers/${driverId}`);
      if (!driverResponse.ok) throw new Error('Failed to fetch driver information');
      const driverData = await driverResponse.json();
      if (!driverData.manager_id) {
        // No manager assigned, use default leaderboard
        const response = await fetch(`${API_BASE_URL}/leaderboard/default`);
        if (!response.ok) throw new Error('Failed to fetch default leaderboard');
        const data = await response.json();
        const driversWithRank: Driver[] = data.map((driver: any, index: number) => ({
          ...driver,
          rank: index + 1
        }));
        setDrivers(driversWithRank);
        setFilteredDrivers(driversWithRank);
        setError(null);
        setLoading(false);
        return;
      }
      // Manager assigned, use manager-specific leaderboard
      await fetchLeaderboard(driverData.manager_id.toString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setDrivers([]);
      setFilteredDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-600 font-bold text-xl';
      case 2:
        return 'text-gray-600 font-bold text-xl';
      case 3:
        return 'text-amber-700 font-bold text-xl';
      default:
        return 'text-orange-600 font-semibold text-lg';
    }
  };

  const getBadgeColor = (badgeName: string) => {
    const badgeColors: Record<string, string> = {
      'Doc Champ': 'bg-orange-200 text-orange-800',
      'Life Saver': 'bg-green-200 text-green-800',
      'Zero Violator': 'bg-blue-200 text-blue-800',
      'Goods Hero': 'bg-purple-200 text-purple-800',
      'Advocate': 'bg-yellow-200 text-yellow-800',
      'Safe Driver': 'bg-emerald-200 text-emerald-800'
    };
    return badgeColors[badgeName] || 'bg-gray-200 text-gray-800';
  };

  const badgeMeta: Record<string, BadgeMeta> = {
    'Doc Champ': {
      color: 'bg-orange-200 text-orange-800',
      legendColor: 'bg-orange-300',
      label: 'Doc Champ',
      icon: <FileText className="w-4 h-4 text-orange-500" />,
    },
    'Goods Hero': {
      color: 'bg-purple-200 text-purple-800',
      legendColor: 'bg-purple-300',
      label: 'Goods Hero',
      icon: <Truck className="w-4 h-4 text-purple-500" />,
    },
    'Life Saver': {
      color: 'bg-green-200 text-green-800',
      legendColor: 'bg-green-300',
      label: 'Life Saver',
      icon: <HeartPulse className="w-4 h-4 text-green-500" />,
    },
    'Advocate': {
      color: 'bg-yellow-200 text-yellow-800',
      legendColor: 'bg-yellow-300',
      label: 'Advocate',
      icon: <Star className="w-4 h-4 text-yellow-500" />,
    },
    'Zero Violator': {
      color: 'bg-blue-200 text-blue-800',
      legendColor: 'bg-blue-300',
      label: 'Zero Violator',
      icon: <ShieldCheck className="w-4 h-4 text-blue-500" />,
    },
    'Safe Driver': {
      color: 'bg-emerald-200 text-emerald-800',
      legendColor: 'bg-emerald-300',
      label: 'Safe Driver',
      icon: <Smile className="w-4 h-4 text-emerald-500" />,
    },
  };

  const renderBadges = (badges: Badge[]) => {
    if (!badges || badges.length === 0) {
      return (
        <div className="flex justify-center gap-1">
          <div className="w-6 h-6 rounded-full border-2 border-dashed border-gray-300"></div>
          <div className="w-6 h-6 rounded-full border-2 border-dashed border-gray-300"></div>
        </div>
      );
    }
    return (
      <div className="flex justify-center gap-1 flex-wrap">
        {badges.map((badge, index) => {
          const meta = badgeMeta[badge.badge_name] || { 
            color: 'bg-gray-200 text-gray-800', 
            legendColor: 'bg-gray-300',
            label: 'Unknown',
            icon: <Star className="w-4 h-4 text-gray-400" /> 
          };
          return (
            <span
              key={index}
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${meta.color} border border-gray-300 mr-1 shadow-sm`}
              title={badge.badge_name}
            >
              {meta.icon}
            </span>
          );
        })}
      </div>
    );
  };

  // Handle case when user is not logged in or has unsupported role
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Please log in to view the leaderboard.</p>
        </div>
      </div>
    );
  }

  if (user.role !== 'manager' && user.role !== 'driver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Access denied. Only managers and drivers can view the leaderboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading leaderboard: {error}</p>
          <button 
            onClick={() => {
              if (user) {
                if (user.role === 'manager') {
                  fetchLeaderboard(user.id.toString());
                } else if (user.role === 'driver') {
                  fetchDriverLeaderboard(user.id.toString());
                }
              }
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy className="w-10 h-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Leaderboard</h1>
          </div>
          <p className="text-xl text-gray-600">
            {user?.role === 'driver' ? 'Your Team Rankings' : 'Driver Performance Rankings'}
          </p>
        </div>
        {/* Assign Badge Button for Managers */}
        {user?.role === 'manager' && onNavigate && (
          <div className="flex justify-end mb-4 gap-4">
            <button
              onClick={() => onNavigate('assign-badges')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
            >
              <Award className="w-5 h-5" />
              Assign Badge
            </button>
            <button
              onClick={() => onNavigate('add-rule')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-700 text-white font-bold rounded-lg shadow-md hover:from-orange-600 hover:to-orange-800 transition-all duration-200"
            >
              <FileText className="w-5 h-5" />
              Add Rule
            </button>
            <button
              onClick={() => onNavigate('point-updation')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-300 to-orange-500 text-white font-bold rounded-lg shadow-md hover:from-orange-500 hover:to-orange-700 transition-all duration-200"
            >
              <Settings className="w-5 h-5" />
              Point Updation
            </button>
          </div>
        )}
        
        {/* Search Bar */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search drivers..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white shadow-sm"
          />
        </div>
        
        {/* Leaderboard Table */}
        <div className="overflow-hidden bg-white rounded-2xl shadow-xl border border-orange-100">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-orange-50 to-red-50">
              <tr>
                <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-orange-200">
                  Rank
                </th>
                <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-orange-200">
                  Driver Name
                </th>
                <th className="px-8 py-6 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-orange-200">
                  Badges
                </th>
                <th className="px-8 py-6 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-orange-200">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-orange-50">
              {filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-400">
                    <div className="flex flex-col items-center">
                      <Search className="w-8 h-8 text-gray-300 mb-2" />
                      <p>No drivers found matching your search.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDrivers.map((driver, index) => (
                  <tr 
                    key={driver.driver_id} 
                    className={`hover:bg-orange-50 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-orange-25'
                    } ${
                      user?.role === 'driver' && user.id.toString() === driver.driver_id ? 'ring-2 ring-orange-500 bg-orange-100' : ''
                    }`}
                  >
                    {/* Rank Column */}
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                          driver.rank === 1 ? 'bg-yellow-100' :
                          driver.rank === 2 ? 'bg-gray-100' :
                          driver.rank === 3 ? 'bg-amber-100' : 'bg-orange-100'
                        }`}>
                          {getRankIcon(driver.rank)}
                        </div>
                        <span className={`${getRankStyle(driver.rank)}`}>
                          #{driver.rank}
                        </span>
                      </div>
                    </td>
                    
                    {/* Driver Name Column */}
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(driver.driver_id || driver.name)}`}
                            alt={driver.name}
                            className="h-12 w-12 rounded-full border-2 border-orange-300 shadow"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-lg font-semibold text-gray-900">
                            {driver.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Driver ID: {driver.driver_id}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Badges Column */}
                    <td className="px-8 py-6 whitespace-nowrap">
                      {renderBadges(driver.badges)}
                    </td>
                    
                    {/* Points Column */}
                    <td className="px-8 py-6 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-md">
                          {driver.score} pts
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Badge Legend */}
        <div className="mt-8 flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 px-8 py-6 w-full max-w-4xl">
            <div className="font-bold text-lg text-gray-800 mb-4 text-center">Badge Legend</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.values(badgeMeta).map((meta) => (
                <div key={meta.label} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${meta.legendColor} border border-gray-300 shadow-sm`}>
                    {meta.icon}
                  </span>
                  <span className="text-gray-700 font-medium">{meta.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;