import React, { useState, useEffect } from 'react';
import { 
    User as UserIcon, 
    Users, 
    Car, 
    Map, 
    Mail, 
    Phone, 
    FileText, 
    Calendar, 
    Building, 
    Shield, 
    Droplet, 
    PhoneForwarded, 
    BadgeCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Driver } from '../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Page type for navigation
export type Page = 'dashboard' | 'drivers' | 'vehicles' | 'trips' | 'my-trips' | 'leaderboard' | 'profile' | 'about' | 'badge-creator';

export function ProfilePage({ onNavigate }: { onNavigate?: (page: Page, options?: { action?: string }) => void }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // State to hold the full driver profile data fetched from the API
  const [driverProfile, setDriverProfile] = useState<Driver | null>(null);
  const [totals, setTotals] = useState({ vehicles: 0, drivers: 0, trips: 0 });

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      if (!token || !user?.username) {
        setLoading(false);
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };

      // If the user is a driver, fetch their detailed profile
      if (user.role === 'driver') {
        try {
          const res = await api.get('/drivers/auth/me', { headers });
          setDriverProfile(res.data.driver); // Store the full profile
        } catch (error) {
          toast.error("Could not load your profile data.");
        }
      } else if (user.role === 'manager') {
        // If user is a manager, fetch their dashboard totals
        try {
          const [vehiclesRes, driversRes, tripsRes] = await Promise.all([
            api.get(`/vehicles/manager/${user.username}`, { headers }),
            api.get(`/drivers/manager/${user.username}`, { headers }),
            api.get(`/trips/manager/${user.username}`, { headers }),
          ]);
          setTotals({
            vehicles: vehiclesRes.data.data?.length || 0,
            drivers: driversRes.data.data?.length || 0,
            trips: tripsRes.data.data?.length || 0,
          });
        } catch (err) {
          toast.error("Could not load manager statistics.");
        }
      }
      setLoading(false);
    };

    fetchProfileData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;
  
  // Reusable component to display a piece of information
  const InfoField = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | undefined | null }) => (
    <div className="flex items-center space-x-3 p-2">
      <Icon size={18} className="text-orange-500 flex-shrink-0" />
      <span className="font-semibold text-gray-700 w-40">{label}:</span>
      <span className="text-gray-900 break-all">{value || 'N/A'}</span>
    </div>
  );

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
              Profile
            </h1>
            <p className="text-gray-600 text-lg mt-1">
              {user.role === 'manager' ? 'Manager Profile' : 'Driver Profile'}
            </p>
          </div>
        </div>
      </div>

      {/* Manager Info */}
      {user.role === 'manager' && (
        <section className="w-full max-w-5xl mx-auto">
          {/* Your existing manager UI would go here */}
        </section>
      )}

      {/* Driver Info - View Only */}
      {user.role === 'driver' && driverProfile && (
        <section className="w-full max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-orange-100 animate-fadeIn">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Information</h2>
           </div>
          <div className="flex flex-col md:flex-row items-center gap-10 py-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative mb-4">
                {driverProfile.image_url ? (
                  <img
                    src={driverProfile.image_url}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{driverProfile.username}</h2>
                <span className="text-sm text-orange-700 font-semibold">Driver</span>
              </div>
            </div>
            
            {/* Info Grid - Displays only the available data */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              <InfoField icon={Mail} label="Email" value={user.email} />
              <InfoField icon={Phone} label="Mobile Number" value={driverProfile.mobile_number} />
              <InfoField icon={FileText} label="License Number" value={driverProfile.license_number} />
              <InfoField icon={Calendar} label="Date of Birth" value={driverProfile.date_of_birth ? new Date(driverProfile.date_of_birth).toLocaleDateString() : null} />
              <InfoField icon={Map} label="Address" value={driverProfile.address} />
              <InfoField icon={Droplet} label="Blood Group" value={driverProfile.blood_group} />
              <InfoField icon={UserIcon} label="Gender" value={driverProfile.gender} />
              <InfoField icon={PhoneForwarded} label="Emergency Contact" value={driverProfile.emergency_contact_number} />
              <InfoField icon={Building} label="Organisation" value={driverProfile.organisation} />
              <InfoField icon={Shield} label="Manager" value={driverProfile.manager_username} />
              <InfoField icon={BadgeCheck} label="Verification Status" value={driverProfile.verification_status} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}