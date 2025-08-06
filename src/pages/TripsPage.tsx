import React, { useEffect, useState } from 'react';
import { MapPin, Plus, Search, Edit, Trash2, Clock, User, Car, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Trip } from '../types';
import api from '../services/api';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface TripFormProps {
  editingTrip: Trip | null;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  drivers: any[];
  vehicles: any[];
}

const TripForm: React.FC<TripFormProps> = ({
  editingTrip,
  formData,
  handleInputChange,
  onSubmit,
  onCancel,
  loading,
  drivers,
  vehicles
}) => (
  <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8 animate-slideDown">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
          <MapPin size={24} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          {editingTrip ? 'Edit Trip' : 'Schedule New Trip'}
        </h3>
      </div>
      <button
        onClick={onCancel}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
      >
        <X size={24} />
      </button>
    </div>
    
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Driver Select */}
        <div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-700">Driver</label>
  <select
    name="driver_username"  
    value={formData.driver_username}  
    onChange={handleInputChange}
    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
    required
  >
    <option value="">Select a driver</option>
    {drivers.map((driver) => (
      <option key={driver.username} value={driver.username}>  
        {`${driver.username}`}
      </option>
    ))}
  </select>
</div>

        {/* Vehicle Select */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Vehicle</label>
          <select
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            required
          >
            <option value="">Select a vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                {`${vehicle.make} ${vehicle.model} - ${vehicle.license_plate}`}
              </option>
            ))}
          </select>
        </div>

        {/* Start Location */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Start Location</label>
          <input
            type="text"
            name="start_location"
            value={formData.start_location}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter start location"
            required
          />
        </div>

        {/* End Location */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">End Location</label>
          <input
            type="text"
            name="end_location"
            value={formData.end_location}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter end location"
            required
          />
        </div>

        {/* Start Time */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time} 
            onChange={handleInputChange}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            required
          />
        </div>

        {/* End Time */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">End Time (Optional)</label>
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
          />
        </div>

        {/* Distance */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Distance (km)</label>
          <input
            type="number"
            name="distance_travelled"
            value={formData.distance_travelled || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            min="0"
            step="0.1"
            placeholder="Enter distance"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Status</label>
          <select
            name="trip_status"
            value={formData.trip_status}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
          >
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Purpose */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Purpose</label>
        <input
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleInputChange}
          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
          placeholder="Enter trip purpose"
          required
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
          rows={3}
          placeholder="Enter additional notes"
        />
      </div>

      {/* Submit and Cancel buttons */}
      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{editingTrip ? 'Updating...' : 'Scheduling...'}</span>
            </div>
          ) : (
            editingTrip ? 'Update Trip' : 'Schedule Trip'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

export function TripsPage({ action }) {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(action === 'add');
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [drivers, setDrivers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [monitoringTrip, setMonitoringTrip] = useState<Trip | null>(null);
  const [showMonitorModal, setShowMonitorModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');


  const token = localStorage.getItem('authToken');

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    if (user?.id && user?.username) {
      fetchTrips();
      fetchDrivers();
      fetchVehicles();
    }
  }, [user?.id , user?.username ]);

  useEffect(() => {
    if (action === 'add') setShowAddForm(true);
    else setShowAddForm(false);
  }, [action]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      let response;
      if (user?.role === 'manager') {
        response = await api.get(`trips/manager/${user.username}`, { headers });
      } else if (user?.role === 'driver') {
        response = await api.get(`trips/driver/${user.username}`, { headers });
      }

      console.log('Fetched trips:', response?.data);
      const data = response?.data;
      if (Array.isArray(data.data)) {
        setTrips(data.data);
      } else {
        console.warn("API response for trips was not an array:", data);
        setTrips([]);
      }
      
    } catch (error) {
      console.error('Error fetching trips:', error);
      setTrips([]); 
    } finally {
      setLoading(false);
    }
  };

  // Move formData state outside of any effects or callbacks
  const [formData, setFormData] = useState({
    vehicle_id: '',
    driver_username: '',
    manager_username: user?.username || '',
    start_time: '',
    end_time: '',
    start_location: '',
    end_location: '',
    distance_travelled: '',
    average_speed: '',
    max_speed: '',
    min_speed: '',
    fuel_consumed: '',
    harsh_events_count: '0',
    trip_status: 'scheduled', // <-- Default for new trip
    purpose: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter trips based on user role
  const filteredTrips = trips.filter(trip => {
    const tripStatus = (trip.trip_status || '').toLowerCase();
    const filter = filterStatus.toLowerCase();

    const driverMatch = user?.role === 'manager' ? true : trip.driver_username === user?.username;
    const statusMatch = filter === 'all' ? true : tripStatus === filter;
    const searchMatch = searchTerm === '' ||
      trip.start_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.end_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.purpose?.toLowerCase().includes(searchTerm.toLowerCase());
    return driverMatch && statusMatch && searchMatch;
  });

  // TODO: Replace with API call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      const requiredFields = ['vehicle_id', 'driver_username', 'start_time', 'start_location', 'end_location'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Format data to match database schema
      const submissionData = {
        vehicle_id: parseInt(formData.vehicle_id),
        driver_username: formData.driver_username,
        manager_username: user?.username as string,
        start_time: new Date(formData.start_time).toISOString(),
        end_time: formData.end_time ? new Date(formData.end_time).toISOString() : null,
        start_location: formData.start_location,
        end_location: formData.end_location,
        distance_travelled: formData.distance_travelled ? parseFloat(formData.distance_travelled) : null,
        average_speed: formData.average_speed ? parseFloat(formData.average_speed) : null,
        max_speed: formData.max_speed ? parseFloat(formData.max_speed) : null,
        min_speed: formData.min_speed ? parseFloat(formData.min_speed) : null,
        fuel_consumed: formData.fuel_consumed ? parseFloat(formData.fuel_consumed) : null,
        harsh_events_count: parseInt(formData.harsh_events_count) || 0,
        trip_status: formData.trip_status  
      };

      if (editingTrip) {
        await api.put(`/trips/${editingTrip.trip_id}`, {
          ...submissionData,
          trip_id: editingTrip.trip_id
        }, { headers });
      } else {
        const response = await api.post('/trips/', submissionData, { headers });
        if(response.status == 201)
        {
          toast.success('Trip scheduled successfully!');
          resetForm();
        }
        else
        {
          toast.error(`Failed to schedule trip: ${response.data?.message || 'Unknown error'}`);
        }
      }

      await fetchTrips();
      setShowAddForm(false);
      resetForm();
    } catch (err: any) {
      console.error('Trip submission error:', err);
      alert(err.response?.data?.error || err.message || 'Failed to save trip');
       const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'An unknown error occurred';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Replace with API call
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await api.delete(`/trips/${id}`);
        await fetchTrips();
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || 'Failed to delete trip';
        toast.error(errorMessage);
        console.error('Failed to delete trip:', err);
      }
    }
  };

  const handleEdit = (trip: Trip) => {
    setEditingTrip(trip);
    setFormData({
      vehicle_id: trip.vehicle_id.toString(),
      driver_username: trip.driver_username || '',
      manager_username: user?.username || '',
      start_time: new Date(trip.start_time).toISOString().slice(0, 16), // Format for datetime-local input
      end_time: trip.end_time ? new Date(trip.end_time).toISOString().slice(0, 16) : '',
      start_location: trip.start_location || '',
      end_location: trip.end_location || '',
      distance_travelled: trip.distance_travelled?.toString() || '',
      average_speed: trip.average_speed?.toString() || '',
      max_speed: trip.max_speed?.toString() || '',
      min_speed: trip.min_speed?.toString() || '',
      fuel_consumed: trip.fuel_consumed?.toString() || '',
      harsh_events_count: trip.harsh_events_count?.toString() || '0',
      trip_status: trip.trip_status,
      purpose: trip.purpose || '',
      notes: trip.notes || ''
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      vehicle_id: '',
      driver_username: '',
      manager_username: user?.username || '',
      start_time: '',
      end_time: '',
      start_location: '',
      end_location: '',
      distance_travelled: '',
      average_speed: '',
      max_speed: '',
      min_speed: '',
      fuel_consumed: '',
      harsh_events_count: '0',
      trip_status: 'scheduled', // <-- Reset to 'scheduled'
      purpose: '',
      notes: ''
    });
    setEditingTrip(null);
    setShowAddForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Add these functions near the top of the TripsPage component
  const fetchDrivers = async () => {
    try {
      const response = await api.get(`/drivers/`, { headers });
      if (response.data && Array.isArray(response.data)) {
        setDrivers(response.data);
      } else {
        console.warn("API response for drivers was not an array:", response.data);
        setDrivers([]);
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
      setDrivers([]);
    }
  };
  
  const fetchVehicles = async () => {
    try {
      let response;
      if (user?.role === 'manager') {
        response = await api.get(`/vehicles/manager/${user?.username}`, { headers });
      } else if (user?.role === 'driver') {
        response = await api.get(`/vehicles/`, { headers });
      }
      if (Array.isArray(response?.data.data)) {
        setVehicles(response.data.data);
      } else {
        console.warn("API response for vehicles was not an array:", response?.data);
        setVehicles([]);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setVehicles([]);
    }
  };

  const handleMonitor = (trip: Trip) => {
    setMonitoringTrip(trip);
    setShowMonitorModal(true);
  };

  const closeMonitorModal = () => {
    setShowMonitorModal(false);
    setMonitoringTrip(null);
  };

  const MonitoringModal: React.FC<{
    trip: Trip;
    driver: any;
    gpsData: {
      latitude: number;
      longitude: number;
      speed: number;
      lastUpdated: string;
    };
    driverStatus: {
      status: string;
      heartRate: number;
      lastAlert: string;
    };
    onClose: () => void;
  }> = ({ trip, driver, gpsData, driverStatus, onClose }) => {
    // Find vehicle for this trip
    const vehicle = vehicles.find(v => v.vehicle_id === trip.vehicle_id);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
       
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-slideDown">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            onClick={onClose}
          >
            <span className="text-2xl">&times;</span>
          </button>
          <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
            <span className="mr-2">🧭</span> Trip Monitoring
          </h2>
          {/* Trip Info */}
          <div className="mb-2 grid grid-cols-1 gap-1 text-sm">
            <div>
              <span className="font-semibold text-gray-700">Trip ID:</span>
              <span className="ml-2 text-gray-900">{trip.trip_id}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Driver Username:</span>
              <span className="ml-2 text-gray-900">{trip.driver_username}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Vehicle:</span>
              <span className="ml-2 text-gray-900">
                {vehicle ? `${vehicle.make} ${vehicle.model}` : `ID: ${trip.vehicle_id}`}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Start:</span>
              <span className="ml-2 text-gray-900">{trip.start_location}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">End:</span>
              <span className="ml-2 text-orange-600">{trip.end_location}</span>
            </div>
          </div>
          {/* GPS Monitoring */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">GPS Monitoring</h3>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <div className="text-orange-600 text-3xl mb-2 flex justify-center">🗺️</div>
              <div className="text-center text-orange-600 font-semibold mb-2">
                Live GPS tracking will appear here.
              </div>
              <div className="text-center">
                <div>
                  <span className="font-semibold text-gray-700">Current Location:</span>
                  <span className="ml-2 text-orange-700">
                    {gpsData.latitude.toFixed(4)}° N, {gpsData.longitude.toFixed(4)}° E
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Speed:</span>
                  <span className="ml-2 text-green-600">{gpsData.speed} km/h</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">
                    Last updated: {gpsData.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Driver Monitoring */}
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Driver Monitoring</h3>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <div className="text-orange-600 text-3xl mb-2 flex justify-center">🧑</div>
              <div className="text-center text-orange-600 font-semibold mb-2">
                Driver status and alerts will appear here.
              </div>
              <div className="text-center">
                <div>
                  <span className="font-semibold text-gray-700">Status:</span>
                  <span className="ml-2 text-green-600">{driverStatus.status}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Heart Rate:</span>
                  <span className="ml-2 text-orange-600">{driverStatus.heartRate} bpm</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Last Alert:</span>
                  <span className="ml-2 text-red-600">{driverStatus.lastAlert}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between animate-fadeIn">
        <div className="flex items-center space-x-4 mb-6 lg:mb-0">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
            <MapPin size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {user?.role === 'manager' ? 'Trips Management' : 'My Trips'}
            </h1>
            <p className="text-gray-600 text-lg mt-1">
              {user?.role === 'manager' 
                ? 'Manage all fleet trips and their status' 
                : 'View and manage your assigned trips'}
            </p>
          </div>
        </div>
        {user?.role === 'manager' && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-3 transform hover:scale-105 shadow-lg"
          >
            <Plus size={24} />
            <span>Add New Trip</span>
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <TripForm
          editingTrip={editingTrip}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          loading={loading}
          handleInputChange={handleInputChange}
          drivers={drivers}
          vehicles={vehicles}
        />
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 animate-fadeIn">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search trips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="text-sm text-gray-600 font-medium bg-orange-50 px-4 py-2 rounded-xl">
              {filteredTrips.length} of {trips.length} trips
            </div>
          </div>
        </div>
      </div>

      {/* Trips List */}
      <div className="space-y-6">
        {filteredTrips.map((trip, index) => {
          const driver = drivers.find(d => d.username === trip.driver_username);
          const vehicle = vehicles.find(v => v.vehicle_id === trip.vehicle_id);

          return (
            <div 
              key={trip.trip_id} 
              className="bg-white rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="font-bold text-gray-900 text-2xl">
                        {trip.start_location} → {trip.end_location}
                      </h3>
                      <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getStatusColor(trip.trip_status)}`}>
                        {trip.trip_status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 font-semibold text-lg">{trip.purpose}</p>
                  </div>
                  {(user?.role === 'manager' || trip.trip_status === 'scheduled') && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(trip)}
                        className="p-3 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 transform hover:scale-110"
                      >
                        <Edit size={20} />
                      </button>
                      {user?.role === 'manager' && (
                        <button
                          onClick={() => handleDelete(trip.trip_id)}
                          className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                      <button
                        onClick={() => handleMonitor(trip)}
                        className="p-3 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 transform hover:scale-110 border border-orange-200"
                      >
                        Monitor
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {user?.role === 'manager' && (
                    <div className="flex items-center text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">
                      <User size={18} className="mr-3 text-orange-500" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {driver ? `${driver.username}` : 'Unknown Driver'}
                        </p>
                        <p className="text-xs text-gray-500">Driver</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">
                    <Car size={18} className="mr-3 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {vehicle
                          ? `${vehicle.make} ${vehicle.model} (ID: ${vehicle.vehicle_id})`
                          : `Unknown Vehicle (ID: ${trip.vehicle_id})`}
                      </p>
                      <p className="text-xs text-gray-500">{vehicle?.license_plate || ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">
                    <Clock size={18} className="mr-3 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">{new Date(trip.start_time).toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Start Time</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">
                    <MapPin size={18} className="mr-3 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">{trip.distance_travelled} km</p>
                      <p className="text-xs text-gray-500">Distance</p>
                    </div>
                  </div>
                </div>
                
                {trip.notes && (
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                    <p className="text-sm text-gray-700 font-medium">{trip.notes}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTrips.length === 0 && (
        <div className="text-center py-16 animate-fadeIn">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin size={48} className="text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No trips found</h3>
          <p className="text-gray-600 text-lg">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search criteria or filters.' 
              : 'Get started by scheduling your first trip.'}
          </p>
        </div>
      )}

      {showMonitorModal && monitoringTrip && (
        <MonitoringModal
          trip={monitoringTrip}
          driver={drivers.find(d => d.driver_id === monitoringTrip.driver_id)}
          gpsData={{
            latitude: 17.3850, // Replace with live data
            longitude: 78.4867, // Replace with live data
            speed: 54, // Replace with live data
            lastUpdated: '2 mins ago', // Replace with live data
          }}
          driverStatus={{
            status: 'Active', // Replace with live data
            heartRate: 82, // Replace with live data
            lastAlert: 'None', // Replace with live data
          }}
          onClose={closeMonitorModal}
        />
      )}
    </div>
  );
} 



// import React, { useEffect, useState } from 'react';
// import { MapPin, Plus, Search, Edit, Trash2, Clock, User, Car, X } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { Trip } from '../types';
// import api from '../services/api';
// import { useSearchParams } from 'react-router-dom';


// interface TripFormProps {
//   editingTrip: Trip | null;
//   formData: any;
//   setFormData: React.Dispatch<React.SetStateAction<any>>;
//   onSubmit: (e: React.FormEvent) => Promise<void>;
//   onCancel: () => void;
//   loading: boolean;
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
//   drivers: any[];
//   vehicles: any[];
// }

// const TripForm: React.FC<TripFormProps> = ({
//   editingTrip,
//   formData,
//   handleInputChange,
//   onSubmit,
//   onCancel,
//   loading,
//   drivers,
//   vehicles
// }) => (
//   <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8 animate-slideDown">
//     <div className="flex items-center justify-between mb-8">
//       <div className="flex items-center space-x-3">
//         <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
//           <MapPin size={24} className="text-white" />
//         </div>
//         <h3 className="text-2xl font-bold text-gray-900">
//           {editingTrip ? 'Edit Trip' : 'Schedule New Trip'}
//         </h3>
//       </div>
//       <button
//         onClick={onCancel}
//         className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
//       >
//         <X size={24} />
//       </button>
//     </div>
    
//     <form onSubmit={onSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Driver Select */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Driver</label>
//           <select
//             name="driver_id"
//             value={formData.driver_id}
//             onChange={handleInputChange}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             required
//           >
//             <option value="">Select a driver</option>
//             {drivers.map((driver) => (
//               <option key={driver.driver_id} value={driver.driver_id}>
//                 {`${driver.first_name} ${driver.last_name}`}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Vehicle Select */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Vehicle</label>
//           <select
//             name="vehicle_id"
//             value={formData.vehicle_id}
//             onChange={handleInputChange}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             required
//           >
//             <option value="">Select a vehicle</option>
//             {vehicles.map((vehicle) => (
//               <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
//                 {`${vehicle.make} ${vehicle.model} - ${vehicle.license_plate}`}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Start Location */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Start Location</label>
//           <input
//             type="text"
//             name="start_location"
//             value={formData.start_location}
//             onChange={handleInputChange}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             placeholder="Enter start location"
//             required
//           />
//         </div>

//         {/* End Location */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">End Location</label>
//           <input
//             type="text"
//             name="end_location"
//             value={formData.end_location}
//             onChange={handleInputChange}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             placeholder="Enter end location"
//             required
//           />
//         </div>

//         {/* Start Time */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Start Time</label>
//           <input
//             type="datetime-local"
//             name="start_time"
//             value={formData.start_time}
//             onChange={handleInputChange}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             required
//           />
//         </div>

//         {/* End Time */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">End Time (Optional)</label>
//           <input
//             type="datetime-local"
//             name="end_time"
//             value={formData.end_time || ''}
//             onChange={handleInputChange}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//           />
//         </div>

//         {/* Distance */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Distance (km)</label>
//           <input
//             type="number"
//             name="distance_travelled"
//             value={formData.distance_travelled || ''}
//             onChange={handleInputChange}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             min="0"
//             step="0.1"
//             placeholder="Enter distance"
//           />
//         </div>

//         {/* Status */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Status</label>
//           <select
//             name="trip_status"
//             value={formData.trip_status}
//             onChange={handleInputChange}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//           >
//             <option value="scheduled">Scheduled</option>
//             <option value="in-progress">In Progress</option>
//             <option value="completed">Completed</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
//       </div>

//       {/* Purpose */}
//       <div className="space-y-2">
//         <label className="block text-sm font-semibold text-gray-700">Purpose</label>
//         <input
//           type="text"
//           name="purpose"
//           value={formData.purpose}
//           onChange={handleInputChange}
//           className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//           placeholder="Enter trip purpose"
//           required
//         />
//       </div>

//       {/* Notes */}
//       <div className="space-y-2">
//         <label className="block text-sm font-semibold text-gray-700">Notes (Optional)</label>
//         <textarea
//           name="notes"
//           value={formData.notes}
//           onChange={handleInputChange}
//           className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//           rows={3}
//           placeholder="Enter additional notes"
//         />
//       </div>

//       {/* Submit and Cancel buttons */}
//       <div className="flex space-x-4 pt-4">
//         <button
//           type="submit"
//           disabled={loading}
//           className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
//         >
//           {loading ? (
//             <div className="flex items-center justify-center space-x-2">
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               <span>{editingTrip ? 'Updating...' : 'Scheduling...'}</span>
//             </div>
//           ) : (
//             editingTrip ? 'Update Trip' : 'Schedule Trip'
//           )}
//         </button>
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   </div>
// );

// export function TripsPage({ action }) {
//   const [searchParams] = useSearchParams();
//   const { user } = useAuth();
//   const [trips, setTrips] = useState<Trip[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(action === 'add');
//   const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [drivers, setDrivers] = useState<any[]>([]);
//   const [vehicles, setVehicles] = useState<any[]>([]);
//   const [monitoringTrip, setMonitoringTrip] = useState<Trip | null>(null);
//   const [showMonitorModal, setShowMonitorModal] = useState(false);
//   const [filterStatus, setFilterStatus] = useState('all');


//   const token = localStorage.getItem('authToken');

//   const headers = {
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json'
//   };

//   useEffect(() => {
//     if (user?.id) {
//       fetchTrips();
//       fetchDrivers();
//       fetchVehicles();
//     }
//   }, [user?.id]);

//   useEffect(() => {
//     if (action === 'add') setShowAddForm(true);
//     else setShowAddForm(false);
//   }, [action]);

//   const fetchTrips = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (user?.role === 'manager') {
//         response = await api.get(`trips/managerTrips/${user.id}`, { headers });
//       } else if (user?.role === 'driver') {
//         response = await api.get(`trips/driver/${user.id}`, { headers });
//       }
//       setTrips(response?.data || []);
//     } catch (error) {
//       console.error('Error fetching trips:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Move formData state outside of any effects or callbacks
//   const [formData, setFormData] = useState({
//     vehicle_id: '',
//     driver_id: '',
//     manager_id: user?.id || '',
//     start_time: '',
//     end_time: '',
//     start_location: '',
//     end_location: '',
//     distance_travelled: '',
//     average_speed: '',
//     max_speed: '',
//     min_speed: '',
//     fuel_consumed: '',
//     harsh_events_count: '0',
//     trip_status: 'scheduled', // <-- Default for new trip
//     purpose: '',
//     notes: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Filter trips based on user role
//   const filteredTrips = trips.filter(trip => {
//     const tripStatus = (trip.trip_status || '').toLowerCase();
//     const filter = filterStatus.toLowerCase();

//     const driverMatch = user?.role === 'manager' ? true : trip.driver_id === user?.id;
//     const statusMatch = filter === 'all' ? true : tripStatus === filter;
//     const searchMatch = searchTerm === '' ||
//       trip.start_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trip.end_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trip.purpose?.toLowerCase().includes(searchTerm.toLowerCase());
//     return driverMatch && statusMatch && searchMatch;
//   });

//   // TODO: Replace with API call
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Validate required fields
//       const requiredFields = ['vehicle_id', 'driver_id', 'start_time', 'start_location', 'end_location'];
//       const missingFields = requiredFields.filter(field => !formData[field]);
//       if (missingFields.length > 0) {
//         throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
//       }

//       // Format data to match database schema
//       const submissionData = {
//         vehicle_id: parseInt(formData.vehicle_id),
//         driver_id: parseInt(formData.driver_id),
//         manager_id: parseInt(user?.id as string),
//         start_time: new Date(formData.start_time).toISOString(),
//         end_time: formData.end_time ? new Date(formData.end_time).toISOString() : null,
//         start_location: formData.start_location,
//         end_location: formData.end_location,
//         distance_travelled: formData.distance_travelled ? parseFloat(formData.distance_travelled) : null,
//         average_speed: formData.average_speed ? parseFloat(formData.average_speed) : null,
//         max_speed: formData.max_speed ? parseFloat(formData.max_speed) : null,
//         min_speed: formData.min_speed ? parseFloat(formData.min_speed) : null,
//         fuel_consumed: formData.fuel_consumed ? parseFloat(formData.fuel_consumed) : null,
//         harsh_events_count: parseInt(formData.harsh_events_count) || 0,
//         trip_status: formData.trip_status // <-- Use selected status
//       };

//       if (editingTrip) {
//         await api.put(`/trips/updateTrip/${editingTrip.trip_id}`, {
//           ...submissionData,
//           trip_id: editingTrip.trip_id
//         }, { headers });
//       } else {
//         const response = await api.post('/trips/addTrip', submissionData, { headers });
//         console.log('Trip created:', response.data);
//       }

//       await fetchTrips();
//       setShowAddForm(false);
//       resetForm();
//     } catch (err: any) {
//       console.error('Trip submission error:', err);
//       alert(err.response?.data?.error || err.message || 'Failed to save trip');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // TODO: Replace with API call
//   const handleDelete = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this trip?')) {
//       try {
//         await api.delete(`/trips/deleteSingleTrip/${id}`);
//         await fetchTrips();
//       } catch (err: any) {
//         console.error('Failed to delete trip:', err);
//         alert(err.response?.data?.error || 'Failed to delete trip');
//       }
//     }
//   };

//   const handleEdit = (trip: Trip) => {
//     setEditingTrip(trip);
//     setFormData({
//       vehicle_id: trip.vehicle_id.toString(),
//       driver_id: trip.driver_id.toString(),
//       manager_id: user?.id || '',
//       start_time: new Date(trip.start_time).toISOString().slice(0, 16), // Format for datetime-local input
//       end_time: trip.end_time ? new Date(trip.end_time).toISOString().slice(0, 16) : '',
//       start_location: trip.start_location || '',
//       end_location: trip.end_location || '',
//       distance_travelled: trip.distance_travelled?.toString() || '',
//       average_speed: trip.average_speed?.toString() || '',
//       max_speed: trip.max_speed?.toString() || '',
//       min_speed: trip.min_speed?.toString() || '',
//       fuel_consumed: trip.fuel_consumed?.toString() || '',
//       harsh_events_count: trip.harsh_events_count?.toString() || '0',
//       trip_status: trip.trip_status,
//       purpose: trip.purpose || '',
//       notes: trip.notes || ''
//     });
//     setShowAddForm(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       vehicle_id: '',
//       driver_id: '',
//       manager_id: user?.id || '',
//       start_time: '',
//       end_time: '',
//       start_location: '',
//       end_location: '',
//       distance_travelled: '',
//       average_speed: '',
//       max_speed: '',
//       min_speed: '',
//       fuel_consumed: '',
//       harsh_events_count: '0',
//       trip_status: 'scheduled', // <-- Reset to 'scheduled'
//       purpose: '',
//       notes: ''
//     });
//     setEditingTrip(null);
//     setShowAddForm(false);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'completed': return 'bg-green-100 text-green-800 border-green-200';
//       case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   // Add these functions near the top of the TripsPage component
//   const fetchDrivers = async () => {
//     try {
//       const response = await api.get(`/drivers/allDriversNames/${user?.id}`, { headers });
//       setDrivers(response.data);
//     } catch (error) {
//       console.error('Error fetching drivers:', error);
//     }
//   };

//   const fetchVehicles = async () => {
//     try {
//       let response;
//       if (user?.role === 'manager') {
//         response = await api.get(`/vehicles/managerVehicles/${user?.id}`, { headers });
//       } else if (user?.role === 'driver') {
//         response = await api.get(`/vehicles/allVehicles`, { headers });
//       }
//       setVehicles(response.data);
//     } catch (error) {
//       console.error('Error fetching vehicles:', error);
//     }
//   };

//   const handleMonitor = (trip: Trip) => {
//     setMonitoringTrip(trip);
//     setShowMonitorModal(true);
//   };

//   const closeMonitorModal = () => {
//     setShowMonitorModal(false);
//     setMonitoringTrip(null);
//   };

//   const MonitoringModal: React.FC<{
//     trip: Trip;
//     driver: any;
//     gpsData: {
//       latitude: number;
//       longitude: number;
//       speed: number;
//       lastUpdated: string;
//     };
//     driverStatus: {
//       status: string;
//       heartRate: number;
//       lastAlert: string;
//     };
//     onClose: () => void;
//   }> = ({ trip, driver, gpsData, driverStatus, onClose }) => {
//     // Find vehicle for this trip
//     const vehicle = vehicles.find(v => v.vehicle_id === trip.vehicle_id);

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-slideDown">
//           <button
//             className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
//             onClick={onClose}
//           >
//             <span className="text-2xl">&times;</span>
//           </button>
//           <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
//             <span className="mr-2">🧭</span> Trip Monitoring
//           </h2>
//           {/* Trip Info */}
//           <div className="mb-2 grid grid-cols-1 gap-1 text-sm">
//             <div>
//               <span className="font-semibold text-gray-700">Trip ID:</span>
//               <span className="ml-2 text-gray-900">{trip.trip_id}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-gray-700">Driver ID:</span>
//               <span className="ml-2 text-gray-900">{trip.driver_id}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-gray-700">Vehicle:</span>
//               <span className="ml-2 text-gray-900">
//                 {vehicle ? `${vehicle.make} ${vehicle.model}` : `ID: ${trip.vehicle_id}`}
//               </span>
//             </div>
//             <div>
//               <span className="font-semibold text-gray-700">Start:</span>
//               <span className="ml-2 text-gray-900">{trip.start_location}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-gray-700">End:</span>
//               <span className="ml-2 text-orange-600">{trip.end_location}</span>
//             </div>
//           </div>
//           {/* GPS Monitoring */}
//           <div className="mb-6">
//             <h3 className="font-semibold text-lg text-gray-800 mb-2">GPS Monitoring</h3>
//             <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
//               <div className="text-orange-600 text-3xl mb-2 flex justify-center">🗺️</div>
//               <div className="text-center text-orange-600 font-semibold mb-2">
//                 Live GPS tracking will appear here.
//               </div>
//               <div className="text-center">
//                 <div>
//                   <span className="font-semibold text-gray-700">Current Location:</span>
//                   <span className="ml-2 text-orange-700">
//                     {gpsData.latitude.toFixed(4)}° N, {gpsData.longitude.toFixed(4)}° E
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-700">Speed:</span>
//                   <span className="ml-2 text-green-600">{gpsData.speed} km/h</span>
//                 </div>
//                 <div>
//                   <span className="text-gray-500 text-sm">
//                     Last updated: {gpsData.lastUpdated}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Driver Monitoring */}
//           <div>
//             <h3 className="font-semibold text-lg text-gray-800 mb-2">Driver Monitoring</h3>
//             <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
//               <div className="text-orange-600 text-3xl mb-2 flex justify-center">🧑</div>
//               <div className="text-center text-orange-600 font-semibold mb-2">
//                 Driver status and alerts will appear here.
//               </div>
//               <div className="text-center">
//                 <div>
//                   <span className="font-semibold text-gray-700">Status:</span>
//                   <span className="ml-2 text-green-600">{driverStatus.status}</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-700">Heart Rate:</span>
//                   <span className="ml-2 text-orange-600">{driverStatus.heartRate} bpm</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-700">Last Alert:</span>
//                   <span className="ml-2 text-red-600">{driverStatus.lastAlert}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between animate-fadeIn">
//         <div className="flex items-center space-x-4 mb-6 lg:mb-0">
//           <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
//             <MapPin size={28} className="text-white" />
//           </div>
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//               {user?.role === 'manager' ? 'Trips Management' : 'My Trips'}
//             </h1>
//             <p className="text-gray-600 text-lg mt-1">
//               {user?.role === 'manager' 
//                 ? 'Manage all fleet trips and their status' 
//                 : 'View and manage your assigned trips'}
//             </p>
//           </div>
//         </div>
//         {user?.role === 'manager' && (
//           <button
//             onClick={() => setShowAddForm(!showAddForm)}
//             className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-3 transform hover:scale-105 shadow-lg"
//           >
//             <Plus size={24} />
//             <span>Add New Trip</span>
//           </button>
//         )}
//       </div>

//       {/* Add/Edit Form */}
//       {showAddForm && (
//         <TripForm
//           editingTrip={editingTrip}
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={handleSubmit}
//           onCancel={resetForm}
//           loading={loading}
//           handleInputChange={handleInputChange}
//           drivers={drivers}
//           vehicles={vehicles}
//         />
//       )}

//       {/* Search and Filters */}
//       <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 animate-fadeIn">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search trips..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             />
//           </div>
//           <div className="flex items-center space-x-4">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             >
//               <option value="all">All Status</option>
//               <option value="scheduled">Scheduled</option>
//               <option value="in-progress">In Progress</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//             <div className="text-sm text-gray-600 font-medium bg-orange-50 px-4 py-2 rounded-xl">
//               {filteredTrips.length} of {trips.length} trips
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Trips List */}
//       <div className="space-y-6">
//         {filteredTrips.map((trip, index) => {
//           const driver = drivers.find(d => d.driver_id === trip.driver_id);
//           const vehicle = vehicles.find(v => v.vehicle_id === trip.vehicle_id);

//           return (
//             <div 
//               key={trip.trip_id} 
//               className="bg-white rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeIn"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="p-8">
//                 <div className="flex items-start justify-between mb-6">
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-4 mb-3">
//                       <h3 className="font-bold text-gray-900 text-2xl">
//                         {trip.start_location} → {trip.end_location}
//                       </h3>
//                       <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getStatusColor(trip.trip_status)}`}>
//                         {trip.trip_status.replace('-', ' ').toUpperCase()}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 font-semibold text-lg">{trip.purpose}</p>
//                   </div>
//                   {(user?.role === 'manager' || trip.trip_status === 'scheduled') && (
//                     <div className="flex space-x-3">
//                       <button
//                         onClick={() => handleEdit(trip)}
//                         className="p-3 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 transform hover:scale-110"
//                       >
//                         <Edit size={20} />
//                       </button>
//                       {user?.role === 'manager' && (
//                         <button
//                           onClick={() => handleDelete(trip.trip_id)}
//                           className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110"
//                         >
//                           <Trash2 size={20} />
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleMonitor(trip)}
//                         className="p-3 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 transform hover:scale-110 border border-orange-200"
//                       >
//                         Monitor
//                       </button>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                   {user?.role === 'manager' && (
//                     <div className="flex items-center text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">
//                       <User size={18} className="mr-3 text-orange-500" />
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {driver ? `${driver.first_name} ${driver.last_name}` : 'Unknown Driver'}
//                         </p>
//                         <p className="text-xs text-gray-500">Driver</p>
//                       </div>
//                     </div>
//                   )}
//                   <div className="flex items-center text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">
//                     <Car size={18} className="mr-3 text-orange-500" />
//                     <div>
//                       <p className="font-medium text-gray-900">
//                         {vehicle
//                           ? `${vehicle.make} ${vehicle.model} (ID: ${vehicle.vehicle_id})`
//                           : `Unknown Vehicle (ID: ${trip.vehicle_id})`}
//                       </p>
//                       <p className="text-xs text-gray-500">{vehicle?.license_plate || ''}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">
//                     <Clock size={18} className="mr-3 text-orange-500" />
//                     <div>
//                       <p className="font-medium text-gray-900">{new Date(trip.start_time).toLocaleString()}</p>
//                       <p className="text-xs text-gray-500">Start Time</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">
//                     <MapPin size={18} className="mr-3 text-orange-500" />
//                     <div>
//                       <p className="font-medium text-gray-900">{trip.distance_travelled} km</p>
//                       <p className="text-xs text-gray-500">Distance</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 {trip.notes && (
//                   <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
//                     <p className="text-sm text-gray-700 font-medium">{trip.notes}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {filteredTrips.length === 0 && (
//         <div className="text-center py-16 animate-fadeIn">
//           <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <MapPin size={48} className="text-orange-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-4">No trips found</h3>
//           <p className="text-gray-600 text-lg">
//             {searchTerm || filterStatus !== 'all' 
//               ? 'Try adjusting your search criteria or filters.' 
//               : 'Get started by scheduling your first trip.'}
//           </p>
//         </div>
//       )}

//       {showMonitorModal && monitoringTrip && (
//         <MonitoringModal
//           trip={monitoringTrip}
//           driver={drivers.find(d => d.driver_id === monitoringTrip.driver_id)}
//           gpsData={{
//             latitude: 17.3850, // Replace with live data
//             longitude: 78.4867, // Replace with live data
//             speed: 54, // Replace with live data
//             lastUpdated: '2 mins ago', // Replace with live data
//           }}
//           driverStatus={{
//             status: 'Active', // Replace with live data
//             heartRate: 82, // Replace with live data
//             lastAlert: 'None', // Replace with live data
//           }}
//           onClose={closeMonitorModal}
//         />
//       )}
//     </div>
//   );
// }