import React, { ReactNode } from 'react';
import { 
  Car, 
  Users, 
  MapPin, 
  BarChart3, 
  User, 
  LogOut, 
  Menu,
  X,
  Info,
  TrendingUp,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import logo from '../assets/logo.jpg';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const managerNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'trips', label: 'Trips', icon: MapPin },
    { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp },
    { id: 'badge-creator', label: 'Badge Creator', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'about', label: 'About', icon: Info },
     // Add this line
  ];

  const driverNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'my-trips', label: 'My Trips', icon: MapPin },
    { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'about', label: 'About', icon: Info },
  ];

  const navItems = user?.role === 'manager' ? managerNavItems : driverNavItems;

  const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const Icon = item.icon;
    const isActive = currentPage === item.id;
    
    return (
      <button
        onClick={() => {
          onNavigate(item.id);
          setIsMobileMenuOpen(false);
        }}
        className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 w-full text-left transform hover:scale-105 ${
          isActive
            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
            : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700'
        }`}
      >
        <Icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
        <span className="font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg border-b border-orange-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Startrit Logo" className="w-8 h-8 object-contain rounded-full border-2 border-orange-200" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            Startrit Infratech Private Limited
          </h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl hover:bg-orange-50 transition-colors duration-200"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white w-80 h-full shadow-2xl transform transition-transform duration-300 ease-out">
            <div className="p-6 border-b border-orange-100 bg-gradient-to-r from-orange-500 to-orange-600">
              <div className="flex items-center space-x-3">
                <img src={logo} alt="Startrit Logo" className="w-10 h-10 object-contain rounded-full border-2 border-white" />
                <div>
                  <h2 className="text-lg font-semibold text-white">Professional Fleet Management </h2>
                  <p className="text-orange-100 text-sm"></p>
                </div>
              </div>
            </div>
            <nav className="p-6 space-y-3">
              {navItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </nav>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl mb-4 border border-orange-200">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || user?.email?.split('@')[0] || 'Manager'}
                </p>
                <p className="text-xs text-orange-600 capitalize font-medium">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-3 text-red-600 hover:text-red-700 w-full px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-200 transform hover:scale-105"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-72 lg:fixed lg:inset-y-0 bg-white shadow-xl border-r border-orange-100 flex-col min-h-screen">
          {/* Top: Logo */}
          <div className="p-8 bg-gradient-to-r from-orange-500 to-orange-600">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Startrit Logo" className="w-12 h-12 object-contain rounded-full border-4 border-white" />
              <div>
                <h1 className="text-2xl font-bold text-white"></h1>
                <p className="text-orange-100 text-sm">Professional Fleet Management</p>
              </div>
            </div>
          </div>
          {/* Middle: Navigation (scrollable if needed) */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-6 space-y-3">
              {navItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </nav>
          </div>
          {/* Bottom: User Info & Logout */}
          <div className="p-6 border-t border-orange-100">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl mb-4 border border-orange-200">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || user?.email?.split('@')[0] || 'Manager'}
              </p>
              <p className="text-xs text-orange-600 capitalize font-medium">{user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-3 text-red-600 hover:text-red-700 w-full px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-200 transform hover:scale-105"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:ml-72 flex-1">
          <main className="p-4 sm:p-6 lg:p-8">
            <div className="animate-fadeIn">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}