import React, { useState, useEffect, useCallback } from 'react';
import { Users, Plus, Search, Edit, Trash2, Phone, Mail, Calendar, Award, X } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';


export interface Driver {
  mail: any;
  driver_id: number;
  username: string;
  manager_id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  license_number: string;
  license_class: string;
  date_of_birth: string;
  insurance_policy_number: string;
  address: string;
  password?: string; // Optional for display
  image_url?: string;
}

// Move DriverForm outside as a separate component
interface DriverFormProps {
  editingDriver: Driver | null;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const DriverForm: React.FC<DriverFormProps> = ({
  editingDriver,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  loading
}) => (
  <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8 animate-slideDown">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
          <Users size={24} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          {editingDriver ? 'Edit Driver' : 'Add New Driver'}
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
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">First Name</label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter driver first name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Last Name</label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter driver last name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Phone</label>
          <input
            type="tel"
            value={formData.mobile_number}
            onChange={(e) => setFormData(prev => ({ ...prev, mobile_number: e.target.value }))}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">License Number</label>
          <input
            type="text"
            value={formData.license_number}
            onChange={(e) => setFormData(prev => ({ ...prev, license_number: e.target.value }))}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter license number"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={formData.date_of_birth}
            onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Insurance Policy Number</label>
          <input
            type="text"
            value={formData.insurance_policy_number}
            onChange={(e) => setFormData(prev => ({ ...prev, insurance_policy_number: e.target.value }))}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter insurance policy number"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter password for driver login"
            required={!editingDriver}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Address</label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
          rows={3}
          placeholder="Enter full address"
          required
        />
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{editingDriver ? 'Updating...' : 'Adding...'}</span>
            </div>
          ) : (
            editingDriver ? 'Update Driver' : 'Add Driver'
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

export function DriversPage({ action }) {
  const [showAddForm, setShowAddForm] = useState(action === 'add');
  useEffect(() => {
    if (action === 'add') setShowAddForm(true);
    else setShowAddForm(false);
  }, [action]);
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    license_number: '',
    license_class: '',
    date_of_birth: '',
    insurance_policy_number: '',
    address: '',
    password: ''
  });

  // Fetch drivers from API - use useCallback to prevent unnecessary re-renders
  const fetchDrivers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const username = user?.username || 0;
    const id = user?.id || 0;
    try {
      const res = await api.get(`/drivers/manager/${username}`);
      console.log(`Fetched drivers under manager : ${username} `, res.data);
      setDrivers(res.data);
    } catch (err) {
      console.error('Failed to fetch drivers:', err);
      setError('Failed to fetch drivers');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchDrivers();
    }
  }, [fetchDrivers, user?.id]);

  // Filtered drivers based on search
  const filteredDrivers = drivers.filter(driver =>
    (`${driver.first_name} ${driver.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.license_number.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addDriver = async (driverData: any) => {
    try {
      // Validate required fields
      const requiredFields = [
        'first_name',
        'last_name',
        'email',
        'mobile_number',
        'license_number',
        'password',
        'manager_id',
        'manager_username'
      ];

      const missingFields = requiredFields.filter(field => !driverData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Format dates properly
      if (driverData.date_of_birth) {
        driverData.date_of_birth = new Date(driverData.date_of_birth).toISOString();
      }

      console.log('Sending driver data:', {
        ...driverData,
        password: '[REDACTED]'
      });

      const response = await api.post('/auth/register', driverData);
      console.log('Server response for driver registration:', response.data);
      await fetchDrivers();
      return response.data;
    } catch (err: any) {
      console.error('Driver creation failed:', {
        error: err,
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      throw new Error(err.response?.data?.error || 'Failed to create driver');
    }
  };

  const updateDriver = async (driverData: any) => {
    try {
      const response = await api.put('/drivers/', driverData);
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to update driver');
      }
      await fetchDrivers();
      return response.data;
    } catch (err: any) {
      console.error('Failed to update driver:', err);
      throw new Error(err.response?.data?.error || 'Failed to update driver');
    }
  };

  const deleteDriver = async (id: number) => {
    try {
      await api.delete(`/drivers/${id}`);
      await fetchDrivers();
    } catch (err) {
      console.error('Failed to delete driver:', err);
      setError('Failed to delete driver');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingDriver) {
        // Update existing driver
        await api.put('/drivers/', {
          ...formData,
          driver_id: editingDriver.driver_id,
          manager_id: user?.id
        });
      } else {
        // Add new driver
        await addDriver({
          ...formData,
          username: formData.email.split('@')[0],
          role: "driver",
          manager_id: user?.id,
          manager_username: user?.username,
        });
      }

      await fetchDrivers(); // Refresh the drivers list
      resetForm(); // Reset form and close it
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.response?.data?.error || 'Failed to save driver');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (driver: Driver) => {
    setEditingDriver(driver);
    setFormData({
      first_name: driver.first_name,
      last_name: driver.last_name,
      email: driver.email,
      mobile_number: driver.mobile_number || '',
      license_number: driver.license_number,
      license_class: driver.license_class || '',
      date_of_birth: driver.date_of_birth ? driver.date_of_birth.split('T')[0] : '',
      insurance_policy_number: driver.insurance_policy_number || '',
      address: driver.address || '',
      password: '' // Don't populate password for security
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      await deleteDriver(id);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      mobile_number: '',
      license_number: '',
      license_class: '',
      date_of_birth: '',
      insurance_policy_number: '',
      address: '',
      password: ''
    });
    setEditingDriver(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between animate-fadeIn">
        <div className="flex items-center space-x-4 mb-6 lg:mb-0">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
            <Users size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Drivers Management
            </h1>
            <p className="text-gray-600 text-lg mt-1">Manage your fleet drivers and their information</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-3 transform hover:scale-105 shadow-lg"
        >
          <Plus size={24} />
          <span>Add Driver</span>
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fadeIn">
          <p className="text-red-800 font-medium">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-red-600 underline text-sm mt-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <DriverForm
          editingDriver={editingDriver}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          loading={loading}
        />
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>
          <div className="text-sm text-gray-600 font-medium bg-orange-50 px-4 py-2 rounded-xl">
            {filteredDrivers.length} of {drivers.length} drivers
          </div>
        </div>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDrivers.map((driver, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-xl mb-2">{driver.first_name} {driver.last_name}</h3>
                  <span>
                    <span className="text-sm text-gray-600">Driver Username: </span>
                    <span className="font-medium text-gray-800">{driver.username}</span>
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(driver)}
                    className="p-3 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 transform hover:scale-110"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(driver.driver_id)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-xl">
                  <Mail size={16} className="mr-3 text-orange-500" />
                  <span className="font-medium">{driver.mail}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-xl">
                  <Phone size={16} className="mr-3 text-orange-500" />
                  <span className="font-medium">{driver.mobile_number}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-xl">
                  <Award size={16} className="mr-3 text-orange-500" />
                  <span className="font-medium">{driver.license_number}</span>
                </div>
                {driver.insurance_policy_number && (
                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-xl">
                    <Calendar size={16} className="mr-3 text-orange-500" />
                    <span className="font-medium">Policy: {driver.insurance_policy_number}</span>
                  </div>
                )}
                {driver.date_of_birth && (
                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-xl">
                    <Calendar size={16} className="mr-3 text-orange-500" />
                    <span className="font-medium">DOB: {new Date(driver.date_of_birth).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-2 font-medium">Address:</p>
                <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-xl">{driver.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDrivers.length === 0 && !loading && (
        <div className="text-center py-16 animate-fadeIn">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users size={48} className="text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No drivers found</h3>
          <p className="text-gray-600 text-lg">
            {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first driver.'}
          </p>
        </div>
      )}
    </div>
  );
};







//! FIX SEARCH DRIVERS
//! FIX ADD DRIVER
//! FIX EDIT DRIVER