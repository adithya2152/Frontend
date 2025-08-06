import React, { useState, useEffect } from 'react';
import { Users, Car, MapPin, TrendingUp, Clock, CheckCircle, BarChart3, AlertCircle, Activity, Plus} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api  from '../services/api';


export interface Trip {
  trip_id: number;
  vehicle_id: number;
  driver_id: number;
  driver_username: string;
  manager_id: number | null;
  manager_username: string | null;
  start_time: string;
  end_time: string | null;
  start_location: string | null;
  end_location: string | null;
  distance_travelled: number | null;
  average_speed: number | null;
  max_speed: number | null;
  min_speed: number | null;
  fuel_consumed: number | null;
  harsh_events_count: number;
  trip_status: string;
}

export interface Vehicle {
  vehicle_id: number;
  manager_id: number | null;
  manager_username: string | null;
  vehicle_type: string | null;
  make: string | null;
  model: string | null;
  year: number | null;
  license_plate: string;
  image_url: string | null;
  location: string | null;
  accidents: number;
  km_driven: number | null;
  remaining_fuel: string | null;
  tire_pressure: string | null;
  service_date: string | null;
  inspection_date: string | null;
  service_type: string | null;
  recall_status: string | null;
  timestamp: string;
}

export interface Driver {
  driver_id: number;
  username: string;
  manager_id: number | null;
  manager_username: string | null;
  first_name: string;
  last_name: string;
  license_number: string;
  license_class: string | null;
  date_of_birth: string | null;
  insurance_policy_number: string | null;
  phone_number: string | null;
  address: string | null;
  email: string;
  password: string;
  image_url: string | null;
}


interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isManager = user?.role === 'manager';

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        setLoading(false);
        setError('User information not available');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setError('Authentication token not found');
          return; 
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        if (isManager) {
          try {
            const [driversRes, vehiclesRes, tripsRes] = await Promise.all([
              api.get(`/drivers/manager/${user.username}`, { headers }),
              api.get(`/vehicles/manager/${user.username}`, { headers }), 
              api.get(`/trips/manager/${user.username}`, { headers }) 
            ]);

            console.log('Manager drivers response:', driversRes.data); // Debug log
            console.log('Manager vehicles response:', vehiclesRes.data.data); // Debug log
            console.log('Manager trips response:', tripsRes.data.data); // Debug log

            setDrivers(Array.isArray(driversRes.data) ? driversRes.data : [driversRes.data]);
            setVehicles(Array.isArray(vehiclesRes.data.data) ? vehiclesRes.data.data : [vehiclesRes.data.data]);
            setTrips(Array.isArray(tripsRes.data.data) ? tripsRes.data.data : [tripsRes.data.data]);
          } catch (err: any) {
            console.error('Manager data fetch error:', err);
            throw err;
          }
        } else {
          try {
            console.log('Fetching driver data...'); // Debug log
            const [driverRes, tripsRes , vehiclesRes] = await Promise.all([
              api.get('/drivers/available', { headers }),
              api.get(`/trips/driver/${user.username}`, { headers }),
              api.get(`/vehicles/`, { headers })
            ]);

            console.log('Driver response:', driverRes.data); // Debug log
            console.log('Trips response:', tripsRes.data.data); // Debug log
            console.log('Vehicles response:', vehiclesRes.data.data); // Debug log
            setDrivers(Array.isArray(driverRes.data) ? driverRes.data : [driverRes.data]);
            setVehicles(Array.isArray(vehiclesRes.data.data) ? vehiclesRes.data.data : [vehiclesRes.data.data]);
            setTrips(Array.isArray(tripsRes.data.data) ? tripsRes.data.data : [tripsRes.data.data]);
          } catch (err: any) {
            console.error('Driver data fetch error:', err);
            if (err.response) {
              console.error('Response error:', err.response.data);
              throw new Error(err.response.data.message || 'Failed to fetch driver data');
            }
            throw err;
          }
        }
      } catch (err: any) {
        console.error('Dashboard data fetch error:', err);
        setError(err.message || 'Failed to load dashboard data');
        setDrivers([]);
        setVehicles([]);
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, isManager]);

  const userTrips = isManager ? trips : trips.filter(trip => trip.driver_username === user?.username);

  const stats = {
    totalDrivers: drivers.length,
    totalVehicles: vehicles.length,
    totalTrips: userTrips.length,
    activeTrips: userTrips.filter(t => t.trip_status === 'in-progress').length,
    completedTrips: userTrips.filter(t => t.trip_status === 'completed').length,
    scheduledTrips: userTrips.filter(t => t.trip_status === 'scheduled').length
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state with retry button
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <AlertCircle size={48} className="text-red-500 mx-auto" />
          <h2 className="text-xl font-semibold text-gray-800">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, subtitle, color, bgColor }: {
    icon: React.ElementType;
    title: string;
    value: number;
    subtitle?: string;
    color: string;
    bgColor: string;
  }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 transform hover:scale-105 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1 font-medium">{subtitle}</p>}
        </div>
        <div className={`p-4 rounded-2xl ${bgColor} transform transition-transform duration-300 hover:scale-110`}>
          <Icon size={28} className={color} />
        </div>
      </div>
    </div>
  );

  const RecentTrips = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-orange-100 animate-fadeIn">
      <div className="p-6 border-b border-orange-100">
        <h3 className="text-xl font-bold text-gray-900">Recent Trips</h3>
        <p className="text-gray-600 text-sm mt-1">Latest trip activities</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {userTrips.slice(0, 5).map((trip, index) => {
            const driver = drivers.find(d => d.username === trip.driver_username);
            const vehicle = vehicles.find(v => v.vehicle_id === trip.vehicle_id);

            type TripStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
            const statusColors: Record<TripStatus, string> = {
              'scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
              'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
              'completed': 'bg-green-100 text-green-800 border-green-200',
              'cancelled': 'bg-red-100 text-red-800 border-red-200'
            };

            return (
              <div
                key={trip.trip_id}
                className="flex items-center justify-between py-4 px-4 border border-gray-100 rounded-xl hover:bg-orange-50 transition-all duration-200 animate-slideDown"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <MapPin size={18} className="text-orange-500" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {(trip.start_location || 'Unknown')} → {(trip.end_location || 'Unknown')}
                      </p>
                      <p className="text-sm text-gray-500">
                        {isManager
                          ? `${driver ? driver.first_name + ' ' + driver.last_name : 'Unknown Driver'} • ${vehicle ? vehicle.license_plate : 'Unknown Vehicle'}`
                          : vehicle ? vehicle.license_plate : 'Unknown Vehicle'
                        }
                        {' • '}
                        {trip.distance_travelled !== null && trip.distance_travelled !== undefined
                          ? `${trip.distance_travelled} km`
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-xl text-xs font-semibold border ${statusColors[trip.trip_status] || ''}`}>
                  {(trip.trip_status ? trip.trip_status.replace('-', ' ').toUpperCase() : 'UNKNOWN')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const QuickActions = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-orange-100 animate-fadeIn">
      <div className="p-6 border-b border-orange-100">
        <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
        <p className="text-gray-600 text-sm mt-1">Frequently used actions</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {isManager ? (
            <>
              <button 
                onClick={() => onNavigate('drivers', { action: 'add' })}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all duration-200 transform hover:scale-105 border border-orange-200"
              >
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <span className="font-semibold text-gray-900 block">Add New Driver</span>
                  <span className="text-sm text-gray-600">Register a new driver</span>
                </div>
              </button>
              <button
                onClick={() => onNavigate('vehicles', { action: 'add' })}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-200 transform hover:scale-105 border border-green-200"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Car className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <span className="font-semibold text-gray-900 block">Add New Vehicle</span>
                  <span className="text-sm text-gray-600">Register a new vehicle</span>
                </div>
              </button>
              <button
                onClick={() => onNavigate('trips', { action: 'add' })}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-200 transform hover:scale-105 border border-purple-200"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <MapPin className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <span className="font-semibold text-gray-900 block">Schedule Trip</span>
                  <span className="text-sm text-gray-600">Create a new trip</span>
                </div>
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );

  // Update the user info display in the header section
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fadeIn">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
            <BarChart3 size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {isManager ? 'Fleet Dashboard' : 'Driver Dashboard'}
            </h1>
            <p className="text-gray-600 text-lg mt-1">
              Welcome back,{' '}
              <span className="font-semibold text-orange-600">
                {isManager 
                  ? (user?.email || 'Manager') 
                  : (user?.first_name && user?.last_name 
                      ? `${user.first_name} ${user.last_name}`
                      : user?.email || 'Driver')}
              </span>!
            </p>
            {/* <UserInfo /> */}
          </div>
          {/* Add user avatar if available */}
          {user?.image_url && (
            <div className="flex-shrink-0">
              <img 
                src={user.image_url} 
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-orange-500 object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isManager ? (
          <>
            <StatCard
              icon={Users}
              title="Total Drivers"
              value={stats.totalDrivers}
              subtitle=""
              color="text-white"
              bgColor="bg-gradient-to-r from-orange-500 to-orange-600"
            />
            <StatCard
              icon={Car}
              title="Total Vehicles"
              value={stats.totalVehicles}
              subtitle=""
              color="text-white"
              bgColor="bg-gradient-to-r from-green-500 to-green-600"
            />
            <StatCard
              icon={MapPin}
              title="Active Trips"
              value={stats.activeTrips}
              subtitle={`${stats.scheduledTrips} scheduled`}
              color="text-white"
              bgColor="bg-gradient-to-r from-yellow-500 to-yellow-600"
            />
            <StatCard
              icon={TrendingUp}
              title="Completed Trips"
              value={stats.completedTrips}
              subtitle="This month"
              color="text-white"
              bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
            />
          </>
        ) : (
          <>
            <StatCard
              icon={MapPin}
              title="My Trips"
              value={stats.totalTrips}
              subtitle="Total trips"
              color="text-white"
              bgColor="bg-gradient-to-r from-orange-500 to-orange-600"
            />
            <StatCard
              icon={Activity}
              title="Active Trips"
              value={stats.activeTrips}
              subtitle="In progress"
              color="text-white"
              bgColor="bg-gradient-to-r from-yellow-500 to-yellow-600"
            />
            <StatCard
              icon={CheckCircle}
              title="Completed"
              value={stats.completedTrips}
              subtitle="This month"
              color="text-white"
              bgColor="bg-gradient-to-r from-green-500 to-green-600"
            />
            <StatCard
              icon={Clock}
              title="Scheduled"
              value={stats.scheduledTrips}
              subtitle="Upcoming"
              color="text-white"
              bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
            />
          </>
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <RecentTrips />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Leaderboard Widget - Only for managers */}
      
    </div>
  );

}
