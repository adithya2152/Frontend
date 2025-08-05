import React, { useState, useEffect } from 'react';
import { User as UserIcon, Users, Car, Map, Mail, Image, Phone, FileText, Calendar, Save, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User as UserType, Driver } from '../types';
import { useNavigate } from 'react-router-dom';

type ManagerFormData = Pick<UserType, 'email' | 'created_at' | 'updated_at'>;
type DriverFormData = Pick<UserType, 
  'first_name' | 
  'last_name' | 
  'email' | 
  'phone_number' | 
  'license_number' | 
  'license_class' | 
  'address' | 
  'date_of_birth' | 
  'insurance_policy_number'
>;

// Add Page type for navigation
export type Page = 'dashboard' | 'drivers' | 'vehicles' | 'trips' | 'my-trips' | 'leaderboard' | 'profile' | 'about' | 'badge-creator';

export function ProfilePage({ onNavigate }: { onNavigate?: (page: Page, options?: { action?: string }) => void }) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  
  // Use Driver type for driver users
  const isDriver = user?.role === 'driver';
  const driverUser = isDriver ? (user as unknown as Driver) : undefined;

  // Initialize form data based on user role with proper typing
  const [formData, setFormData] = useState<ManagerFormData | DriverFormData>(
    user?.role === 'manager' 
      ? {
          email: user.email || '',
          created_at: user.created_at || '',
          updated_at: user.updated_at || ''
        }
      : {
          first_name: user?.first_name || '',
          last_name: user?.last_name || '',
          email: user?.email || '',
          phone_number: user?.phone_number || '',
          license_number: user?.license_number || '',
          license_class: user?.license_class || '',
          address: user?.address || '',
          date_of_birth: user?.date_of_birth || '',
          insurance_policy_number: user?.insurance_policy_number || ''
        }
  );

  // TODO: Add API call for profile update
  const handleSave = async () => {
    if (!user?.id) return;
    try {
      await api.post('/drivers/updateDriver', {
        ...formData,
        driver_id: user.id
      });
      // Refetch updated user data and update context
      const res = await api.get('/drivers/protected', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      });
      setIsEditing(false);
    } catch (err) {
      // Handle error (show message, etc.)
    }
  };

  const [totals, setTotals] = useState({ vehicles: 0, drivers: 0, trips: 0 });

  useEffect(() => {
    const fetchTotals = async () => {
      if (user?.role !== 'manager' || !user?.id) return;
      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [vehiclesRes, driversRes, tripsRes] = await Promise.all([
          api.get(`/vehicles/manager/${user.username}`, { headers }),
          api.get(`/drivers/manager/${user.username}`, { headers }),
          api.get(`/trips/manager/${user.username}`, { headers }),
        ]);
        setTotals({
          vehicles: vehiclesRes.data.data.length,
          drivers: driversRes.data.length,
          trips: tripsRes.data.data.length,
        });
      } catch (err) {
        setTotals({ vehicles: 0, drivers: 0, trips: 0 });
      }
    };
    fetchTotals();
  }, [user]);

  if (!user) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fadeIn">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
            <UserIcon size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Profile Settings
            </h1>
            <p className="text-gray-600 text-lg mt-1">
              {user?.role === 'manager' ? 'Manager Profile' : 'Driver Profile'}
            </p>
          </div>
        </div>
      </div>

      {/* Manager Info */}
      {user?.role === 'manager' && (
        <section className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 py-8">
            {/* Profile Image and Info */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative mb-4">
                {user.image_url ? (
                  <img
                    src={user.image_url}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-orange-400 object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center border-4 border-orange-400">
                    <UserIcon size={64} className="text-orange-500" />
                  </div>
                )}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.username}</h2>
                <span className="text-sm text-orange-700 font-semibold">Manager</span>
              </div>
            </div>
            {/* Info Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-orange-500" />
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText size={18} className="text-orange-500" />
                <span className="font-semibold text-gray-700">Manager ID:</span>
                <span className="text-gray-900">{user.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700">User Name:</span>
                <span className="text-gray-900">{user.username}</span>
              </div>
            </div>
          </div>
          {/* Stats Row */}
          <div className="flex flex-col sm:flex-row gap-6 mt-4 w-full justify-center">
            <div
              className="flex-1 min-w-[180px] bg-white rounded-2xl shadow flex flex-col items-center py-6 border border-orange-100 cursor-pointer hover:bg-orange-50 transition"
              onClick={() => onNavigate ? onNavigate('vehicles') : navigate('/vehicles')}
              title="View all vehicles"
            >
              <Car size={36} className="text-orange-500 mb-2" />
              <span className="text-3xl font-extrabold text-gray-900">{totals.vehicles}</span>
              <span className="text-base text-gray-500 font-medium">Vehicles</span>
            </div>
            <div
              className="flex-1 min-w-[180px] bg-white rounded-2xl shadow flex flex-col items-center py-6 border border-orange-100 cursor-pointer hover:bg-orange-50 transition"
              onClick={() => onNavigate ? onNavigate('drivers') : navigate('/drivers')}
              title="View all drivers"
            >
              <Users size={36} className="text-orange-500 mb-2" />
              <span className="text-3xl font-extrabold text-gray-900">{totals.drivers}</span>
              <span className="text-base text-gray-500 font-medium">Drivers</span>
            </div>
            <div
              className="flex-1 min-w-[180px] bg-white rounded-2xl shadow flex flex-col items-center py-6 border border-orange-100 cursor-pointer hover:bg-orange-50 transition"
              onClick={() => onNavigate ? onNavigate('trips') : navigate('/trips')}
              title="View all trips"
            >
              <Map size={36} className="text-orange-500 mb-2" />
              <span className="text-3xl font-extrabold text-gray-900">{totals.trips}</span>
              <span className="text-base text-gray-500 font-medium">Trips</span>
            </div>
            {/* Badge Creator Card for Managers */}
            <div
              className="flex-1 min-w-[180px] bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow flex flex-col items-center py-6 border border-orange-200 cursor-pointer hover:scale-105 transition"
              onClick={() => onNavigate ? onNavigate('badge-creator') : navigate('/badge-creator')}
              title="Open Badge Creator"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-3xl font-extrabold text-white">Badge</span>
              <span className="text-base text-orange-100 font-medium">Creator</span>
            </div>
          </div>
        </section>
      )}

      {/* Driver Info */}
      {isDriver && driverUser && (
        <section className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 py-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative mb-4">
                {driverUser.image_url ? (
                  <img
                    src={driverUser.image_url}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-orange-400 object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center border-4 border-orange-400">
                    <UserIcon size={64} className="text-orange-500" />
                  </div>
                )}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{driverUser.first_name} {driverUser.last_name}</h2>
                <span className="text-sm text-orange-700 font-semibold">Driver</span>
              </div>
            </div>
            {/* Info Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              <div className="flex items-center space-x-2">
                <FileText size={18} className="text-orange-500" />
                <span className="font-semibold text-gray-700">Driver ID:</span>
                <span className="text-gray-900">{driverUser.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-orange-500" />
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-900">{driverUser.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} className="text-orange-500" />
                <span className="font-semibold text-gray-700">Phone:</span>
                <span className="text-gray-900">{driverUser.phone_number || '-'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText size={18} className="text-orange-500" />
                <span className="font-semibold text-gray-700">License Number:</span>
                <span className="text-gray-900">{driverUser.license_number}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText size={18} className="text-orange-500" />
                <span className="font-semibold text-gray-700">License Class:</span>
                <span className="text-gray-900">{driverUser.license_class || '-'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-orange-500" />
                <span className="font-semibold text-gray-700">Date of Birth:</span>
                <span className="text-gray-900">{driverUser.date_of_birth || '-'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText size={18} className="text-orange-500" />
                <span className="font-semibold text-gray-700">Insurance Policy:</span>
                <span className="text-gray-900">{driverUser.insurance_policy_number || '-'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Map size={18} className="text-orange-500" />
                <span className="font-semibold text-gray-700">Address:</span>
                <span className="text-gray-900">{driverUser.address || '-'}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TODO: Add sections for displaying trips, vehicles, etc. */}
      {/* These sections can be added when you implement the API calls */}
    </div>
  );
}