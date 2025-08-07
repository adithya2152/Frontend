//   // import React, { useEffect, useState } from 'react';
//   // import { MapPin, Plus, Search, Edit, Trash2, Clock, User, Car, X } from 'lucide-react';
//   // import { useAuth } from '../context/AuthContext';
//   // import { Trip } from '../types';
//   // import api from '../services/api';
//   // import { useSearchParams } from 'react-router-dom';
//   // import { toast } from 'react-toastify';

//   // // =================================================================================
//   // // TripForm Component (Modified to remove Purpose and Notes)
//   // // =================================================================================
//   // interface TripFormProps {
//   //   editingTrip: Trip | null;
//   //   formData: any;
//   //   setFormData: React.Dispatch<React.SetStateAction<any>>;
//   //   onSubmit: (e: React.FormEvent) => Promise<void>;
//   //   onCancel: () => void;
//   //   loading: boolean;
//   //   handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
//   //   drivers: any[];
//   //   vehicles: any[];
//   // }

//   // const TripForm: React.FC<TripFormProps> = ({
//   //   editingTrip,
//   //   formData,
//   //   handleInputChange,
//   //   onSubmit,
//   //   onCancel,
//   //   loading,
//   //   drivers,
//   //   vehicles
//   // }) => (
//   //   // The content of the form itself is wrapped for reuse in both inline "add" and modal "edit"
//   //   <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8">
//   //     <div className="flex items-center justify-between mb-8">
//   //       <div className="flex items-center space-x-3">
//   //         <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
//   //           <MapPin size={24} className="text-white" />
//   //         </div>
//   //         <h3 className="text-2xl font-bold text-gray-900">
//   //           {editingTrip ? 'Edit Trip' : 'Schedule New Trip'}
//   //         </h3>
//   //       </div>
//   //       <button
//   //         onClick={onCancel}
//   //         className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
//   //       >
//   //         <X size={24} />
//   //       </button>
//   //     </div>
      
//   //     <form onSubmit={onSubmit} className="space-y-6">
//   //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//   //         {/* Driver Select */}
//   //         <div className="space-y-2">
//   //           <label className="block text-sm font-semibold text-gray-700">Driver</label>
//   //           <select
//   //             name="driver_username"  
//   //             value={formData.driver_username}  
//   //             onChange={handleInputChange}
//   //             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//   //             required={!editingTrip} 
//   //           >
//   //             <option value="">Select a driver</option>
//   //             {drivers.map((driver) => (
//   //               <option key={driver.username} value={driver.username}>  
//   //                 {`${driver.username}`}
//   //               </option>
//   //             ))}
//   //           </select>
//   //         </div>

//   //         {/* Vehicle Select */}
//   //         <div className="space-y-2">
//   //           <label className="block text-sm font-semibold text-gray-700">Vehicle</label>
//   //           <select
//   //             name="vehicle_id"
//   //             value={formData.vehicle_id}
//   //             onChange={handleInputChange}
//   //             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//   //             required={!editingTrip}
//   //           >
//   //             <option value="">Select a vehicle</option>
//   //             {vehicles.map((vehicle) => (
//   //               <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
//   //                 {`${vehicle.make} ${vehicle.model} - ${vehicle.license_plate}`}
//   //               </option>
//   //             ))}
//   //           </select>
//   //         </div>

//   //         {/* Start Location */}
//   //         <div className="space-y-2">
//   //           <label className="block text-sm font-semibold text-gray-700">Start Location</label>
//   //           <input
//   //             type="text"
//   //             name="start_location"
//   //             value={formData.start_location}
//   //             onChange={handleInputChange}
//   //             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//   //             placeholder="Enter start location"
//   //             required={!editingTrip}
//   //           />
//   //         </div>

//   //         {/* End Location */}
//   //         <div className="space-y-2">
//   //           <label className="block text-sm font-semibold text-gray-700">End Location</label>
//   //           <input
//   //             type="text"
//   //             name="end_location"
//   //             value={formData.end_location}
//   //             onChange={handleInputChange}
//   //             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//   //             placeholder="Enter end location"
//   //             required={!editingTrip}
//   //           />
//   //         </div>

//   //         {/* Start Time */}
//   //         <div className="space-y-2">
//   //           <label className="block text-sm font-semibold text-gray-700">Start Time</label>
//   //           <input
//   //             type="datetime-local"
//   //             name="start_time"
//   //             value={formData.start_time} 
//   //             onChange={handleInputChange}
//   //             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//   //             required={!editingTrip}
//   //           />
//   //         </div>

//   //         {/* End Time */}
//   //         <div className="space-y-2">
//   //           <label className="block text-sm font-semibold text-gray-700">End Time (Optional)</label>
//   //           <input
//   //             type="datetime-local"
//   //             name="end_time"
//   //             value={formData.end_time || ''}
//   //             onChange={handleInputChange}
//   //             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//   //           />
//   //         </div>

//   //         {/* Distance */}
//   //         <div className="space-y-2">
//   //           <label className="block text-sm font-semibold text-gray-700">Distance (km)</label>
//   //           <input
//   //             type="number"
//   //             name="distance_travelled"
//   //             value={formData.distance_travelled || ''}
//   //             onChange={handleInputChange}
//   //             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//   //             min="0"
//   //             step="0.1"
//   //             placeholder="Enter distance"
//   //           />
//   //         </div>

//   //         {/* Status */}
//   //         <div className="space-y-2">
//   //           <label className="block text-sm font-semibold text-gray-700">Status</label>
//   //           <select
//   //             name="trip_status"
//   //             value={formData.trip_status}
//   //             onChange={handleInputChange}
//   //             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//   //           >
//   //             <option value="scheduled">Scheduled</option>
//   //             <option value="in-progress">In Progress</option>
//   //             <option value="completed">Completed</option>
//   //             <option value="cancelled">Cancelled</option>
//   //           </select>
//   //         </div>
//   //       </div>

//   //       {/* Submit and Cancel buttons */}
//   //       <div className="flex space-x-4 pt-4">
//   //         <button
//   //           type="submit"
//   //           disabled={loading}
//   //           className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
//   //         >
//   //           {loading ? (
//   //             <div className="flex items-center justify-center space-x-2">
//   //               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//   //               <span>{editingTrip ? 'Updating...' : 'Scheduling...'}</span>
//   //             </div>
//   //           ) : (
//   //             editingTrip ? 'Update Trip' : 'Schedule Trip'
//   //           )}
//   //         </button>
//   //         <button
//   //           type="button"
//   //           onClick={onCancel}
//   //           className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
//   //         >
//   //           Cancel
//   //         </button>
//   //       </div>
//   //     </form>
//   //   </div>
//   // );

//   // // =================================================================================
//   // // EditTripModal Component
//   // // =================================================================================
//   // const EditTripModal: React.FC<TripFormProps> = (props) => (
//   //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//   //     <div className="w-full max-w-3xl animate-slideDown">
//   //         <TripForm {...props} />
//   //     </div>
//   //   </div>
//   // );


//   // export function TripsPage({ action }) {
//   //   const [searchParams] = useSearchParams();
//   //   const { user } = useAuth();
//   //   const [trips, setTrips] = useState<Trip[]>([]);
//   //   const [loading, setLoading] = useState(false);
//   //   const [showAddForm, setShowAddForm] = useState(action === 'add');
//   //   const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
//   //   const [searchTerm, setSearchTerm] = useState('');
//   //   const [drivers, setDrivers] = useState<any[]>([]);
//   //   const [vehicles, setVehicles] = useState<any[]>([]);
//   //   const [monitoringTrip, setMonitoringTrip] = useState<Trip | null>(null);
//   //   const [showMonitorModal, setShowMonitorModal] = useState(false);
//   //   const [filterStatus, setFilterStatus] = useState('all');
//   //   const [showEditModal, setShowEditModal] = useState(false);


//   //   const token = localStorage.getItem('authToken');

//   //   const headers = {
//   //     'Authorization': `Bearer ${token}`,
//   //     'Content-Type': 'application/json'
//   //   };

//   //   useEffect(() => {
//   //     if (user?.id && user?.username) {
//   //       fetchTrips();
//   //       fetchDrivers();
//   //       fetchVehicles();
//   //     }
//   //   }, [user?.id , user?.username ]);

//   //   useEffect(() => {
//   //     if (action === 'add') setShowAddForm(true);
//   //     else setShowAddForm(false);
//   //   }, [action]);

//   //   const fetchTrips = async () => {
//   //     setLoading(true);
//   //     try {
//   //       let response;
//   //       if (user?.role === 'manager') {
//   //         response = await api.get(`trips/manager/${user.username}`, { headers });
//   //       } else if (user?.role === 'driver') {
//   //         response = await api.get(`trips/driver/${user.username}`, { headers });
//   //       }

//   //       const data = response?.data;
//   //       if (Array.isArray(data.data)) {
//   //         setTrips(data.data);
//   //       } else {
//   //         console.warn("API response for trips was not an array:", data);
//   //         setTrips([]);
//   //       }
        
//   //     } catch (error) {
//   //       console.error('Error fetching trips:', error);
//   //       setTrips([]); 
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   const [formData, setFormData] = useState({
//   //     vehicle_id: '',
//   //     driver_username: '',
//   //     manager_username: user?.username || '',
//   //     start_time: '',
//   //     end_time: '',
//   //     start_location: '',
//   //     end_location: '',
//   //     distance_travelled: '',
//   //     trip_status: 'scheduled',
//   //   });

//   //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//   //     const { name, value } = e.target;
//   //     setFormData(prev => ({
//   //       ...prev,
//   //       [name]: value
//   //     }));
//   //   };

//   //   const filteredTrips = trips.filter(trip => {
//   //     const tripStatus = (trip.trip_status || '').toLowerCase();
//   //     const filter = filterStatus.toLowerCase();

//   //     const driverMatch = user?.role === 'manager' ? true : trip.driver_username === user?.username;
//   //     const statusMatch = filter === 'all' ? true : tripStatus === filter;
//   //     const searchMatch = searchTerm === '' ||
//   //       trip.start_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //       trip.end_location?.toLowerCase().includes(searchTerm.toLowerCase());
//   //     return driverMatch && statusMatch && searchMatch;
//   //   });

//   //   const handleSubmit = async (e: React.FormEvent) => {
//   //     e.preventDefault();
//   //     setLoading(true);

//   //     try {
//   //       if (!editingTrip) {
//   //         const requiredFields = ['vehicle_id', 'driver_username', 'start_time', 'start_location', 'end_location'];
//   //         const missingFields = requiredFields.filter(field => !formData[field]);
//   //         if (missingFields.length > 0) {
//   //           toast.error(`Missing required fields: ${missingFields.join(', ')}`);
//   //           setLoading(false);
//   //           return;
//   //         }
//   //       }

//   //       const submissionData = {
//   //         vehicle_id: parseInt(formData.vehicle_id),
//   //         driver_username: formData.driver_username,
//   //         manager_username: user?.username as string,
//   //         start_time: new Date(formData.start_time).toISOString(),
//   //         end_time: formData.end_time ? new Date(formData.end_time).toISOString() : null,
//   //         start_location: formData.start_location,
//   //         end_location: formData.end_location,
//   //         distance_travelled: formData.distance_travelled ? parseFloat(formData.distance_travelled) : null,
//   //         trip_status: formData.trip_status  
//   //       };

//   //       if (editingTrip) {
//   //         await api.put(`/trips/${editingTrip.trip_id}`, {
//   //           ...submissionData,
//   //           trip_id: editingTrip.trip_id
//   //         }, { headers });
//   //         toast.success('Trip updated successfully!');
//   //       } else {
//   //         const response = await api.post('/trips/', submissionData, { headers });
//   //         if(response.status == 201) {
//   //           toast.success('Trip scheduled successfully!');
//   //         } else {
//   //           toast.error(`Failed to schedule trip: ${response.data?.message || 'Unknown error'}`);
//   //         }
//   //       }

//   //       await fetchTrips();
//   //       resetForm();
//   //     } catch (err: any) {
//   //       console.error('Trip submission error:', err);
//   //       const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'An unknown error occurred';
//   //       toast.error(errorMessage);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   const handleDelete = async (id: number) => {
//   //     if (window.confirm('Are you sure you want to delete this trip?')) {
//   //       try {
//   //         await api.delete(`/trips/${id}`);
//   //         await fetchTrips();
//   //         toast.success('Trip deleted successfully.');
//   //       } catch (err: any) {
//   //         const errorMessage = err.response?.data?.error || 'Failed to delete trip';
//   //         toast.error(errorMessage);
//   //         console.error('Failed to delete trip:', err);
//   //       }
//   //     }
//   //   };

//   //   const handleEdit = (trip: Trip) => {
//   //     setEditingTrip(trip);
//   //     setFormData({
//   //       vehicle_id: trip.vehicle_id.toString(),
//   //       driver_username: trip.driver_username || '',
//   //       manager_username: user?.username || '',
//   //       start_time: new Date(trip.start_time).toISOString().slice(0, 16),
//   //       end_time: trip.end_time ? new Date(trip.end_time).toISOString().slice(0, 16) : '',
//   //       start_location: trip.start_location || '',
//   //       end_location: trip.end_location || '',
//   //       distance_travelled: trip.distance_travelled?.toString() || '',
//   //       trip_status: trip.trip_status,
//   //     });
//   //     setShowEditModal(true);
//   //     setShowAddForm(false);
//   //   };

//   //   const resetForm = () => {
//   //     setFormData({
//   //       vehicle_id: '',
//   //       driver_username: '',
//   //       manager_username: user?.username || '',
//   //       start_time: '',
//   //       end_time: '',
//   //       start_location: '',
//   //       end_location: '',
//   //       distance_travelled: '',
//   //       trip_status: 'scheduled',
//   //     });
//   //     setEditingTrip(null);
//   //     setShowAddForm(false);
//   //     setShowEditModal(false);
//   //   };

//   //   const getStatusColor = (status: string) => {
//   //     switch (status) {
//   //       case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
//   //       case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//   //       case 'completed': return 'bg-green-100 text-green-800 border-green-200';
//   //       case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
//   //       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//   //     }
//   //   };

//   //   const fetchDrivers = async () => {
//   //     try {
//   //       const response = await api.get(`/drivers/`, { headers });
//   //       if (response.data && Array.isArray(response.data)) {
//   //         setDrivers(response.data);
//   //       } else {
//   //         console.warn("API response for drivers was not an array:", response.data);
//   //         setDrivers([]);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching drivers:', error);
//   //       setDrivers([]);
//   //     }
//   //   };
    
//   //   const fetchVehicles = async () => {
//   //     try {
//   //       let response;
//   //       if (user?.role === 'manager') {
//   //         response = await api.get(`/vehicles/manager/${user?.username}`, { headers });
//   //       } else if (user?.role === 'driver') {
//   //         response = await api.get(`/vehicles/`, { headers });
//   //       }
//   //       if (Array.isArray(response?.data.data)) {
//   //         setVehicles(response.data.data);
//   //       } else {
//   //         console.warn("API response for vehicles was not an array:", response?.data);
//   //         setVehicles([]);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching vehicles:', error);
//   //       setVehicles([]);
//   //     }
//   //   };

//   //   const handleMonitor = (trip: Trip) => {
//   //     setMonitoringTrip(trip);
//   //     setShowMonitorModal(true);
//   //   };

//   //   const closeMonitorModal = () => {
//   //     setShowMonitorModal(false);
//   //     setMonitoringTrip(null);
//   //   };

//   //   const MonitoringModal: React.FC<{ trip: Trip; onClose: () => void; }> = ({ trip, onClose }) => {
//   //     const vehicle = vehicles.find(v => v.vehicle_id === trip.vehicle_id);
//   //     return (
//   //       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//   //         <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-slideDown">
//   //           <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={onClose} >
//   //             <X size={24} />
//   //           </button>
//   //           <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">🧭 Trip Monitoring</h2>
//   //         </div>
//   //       </div>
//   //     );
//   //   };

//   //   return (
//   //     <div className="space-y-8">
//   //       {/* Header */}
//   //       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between animate-fadeIn">
//   //         <div className="flex items-center space-x-4 mb-6 lg:mb-0">
//   //           <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
//   //             <MapPin size={28} className="text-white" />
//   //           </div>
//   //           <div>
//   //             <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//   //               {user?.role === 'manager' ? 'Trips Management' : 'My Trips'}
//   //             </h1>
//   //             <p className="text-gray-600 text-lg mt-1">
//   //               {user?.role === 'manager' 
//   //                 ? 'Manage all fleet trips and their status' 
//   //                 : 'View and manage your assigned trips'}
//   //             </p>
//   //           </div>
//   //         </div>
//   //         {user?.role === 'manager' && (
//   //           <button
//   //             onClick={() => setShowAddForm(!showAddForm)}
//   //             className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-3 transform hover:scale-105 shadow-lg"
//   //           >
//   //             <Plus size={24} />
//   //             <span>Add New Trip</span>
//   //           </button>
//   //         )}
//   //       </div>

//   //       {/* Add Form (Inline) */}
//   //       {showAddForm && (
//   //         <div className="animate-slideDown">
//   //             <TripForm
//   //             editingTrip={null}
//   //             formData={formData}
//   //             setFormData={setFormData}
//   //             onSubmit={handleSubmit}
//   //             onCancel={resetForm}
//   //             loading={loading}
//   //             handleInputChange={handleInputChange}
//   //             drivers={drivers}
//   //             vehicles={vehicles}
//   //             />
//   //         </div>
//   //       )}
        
//   //       {/* Edit Trip Modal */}
//   //       {showEditModal && editingTrip && (
//   //         <EditTripModal
//   //           editingTrip={editingTrip}
//   //           formData={formData}
//   //           setFormData={setFormData}
//   //           onSubmit={handleSubmit}
//   //           onCancel={resetForm}
//   //           loading={loading}
//   //           handleInputChange={handleInputChange}
//   //           drivers={drivers}
//   //           vehicles={vehicles}
//   //         />
//   //       )}

//   //       {/* Search and Filters */}
//   //       <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 animate-fadeIn">
//   //         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
//   //           <div className="relative flex-1 max-w-md">
//   //             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//   //             <input
//   //               type="text"
//   //               placeholder="Search trips..."
//   //               value={searchTerm}
//   //               onChange={(e) => setSearchTerm(e.target.value)}
//   //               className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//   //             />
//   //           </div>
//   //           <div className="flex items-center space-x-4">
//   //             <select
//   //               value={filterStatus}
//   //               onChange={(e) => setFilterStatus(e.target.value)}
//   //               className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//   //             >
//   //               <option value="all">All Status</option>
//   //               <option value="scheduled">Scheduled</option>
//   //               <option value="in-progress">In Progress</option>
//   //               <option value="completed">Completed</option>
//   //               <option value="cancelled">Cancelled</option>
//   //             </select>
//   //             <div className="text-sm text-gray-600 font-medium bg-orange-50 px-4 py-2 rounded-xl">
//   //               {filteredTrips.length} of {trips.length} trips
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>

//   //       {/* Trips List */}
//   //       <div className="space-y-6">
//   //         {filteredTrips.map((trip, index) => {
//   //           const driver = drivers.find(d => d.username === trip.driver_username);
//   //           const vehicle = vehicles.find(v => v.vehicle_id === trip.vehicle_id);

//   //           return (
//   //             <div 
//   //               key={trip.trip_id} 
//   //               className="bg-white rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeIn"
//   //               style={{ animationDelay: `${index * 100}ms` }}
//   //             >
//   //               <div className="p-8">
//   //                 <div className="flex items-start justify-between mb-6">
//   //                   <div className="flex-1">
//   //                     <div className="flex items-center space-x-4 mb-3">
//   //                       <h3 className="font-bold text-gray-900 text-2xl">
//   //                         {trip.start_location} → {trip.end_location}
//   //                       </h3>
//   //                       <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getStatusColor(trip.trip_status)}`}>
//   //                         {trip.trip_status.replace('-', ' ').toUpperCase()}
//   //                       </span>
//   //                     </div>
//   //                   </div>
//   //                   {(user?.role === 'manager' || trip.trip_status === 'scheduled') && (
//   //                     <div className="flex space-x-3">
//   //                       <button
//   //                         onClick={() => handleEdit(trip)}
//   //                         className="p-3 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 transform hover:scale-110"
//   //                       >
//   //                         <Edit size={20} />
//   //                       </button>
//   //                       {user?.role === 'manager' && (
//   //                         <button
//   //                           onClick={() => handleDelete(trip.trip_id)}
//   //                           className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110"
//   //                         >
//   //                           <Trash2 size={20} />
//   //                         </button>
//   //                       )}
//   //                       <button
//   //                         onClick={() => handleMonitor(trip)}
//   //                         className="p-3 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 transform hover:scale-110 border border-orange-200"
//   //                       >
//   //                         Monitor
//   //                       </button>
//   //                     </div>
//   //                   )}
//   //                 </div>
                  
//   //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//   //                   {user?.role === 'manager' && (
//   //                     <div className="flex items-center text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">
//   //                       <User size={18} className="mr-3 text-orange-500" />
//   //                       <div>
//   //                         <p className="font-medium text-gray-900">
//   //                           {driver ? `${driver.username}` : 'Unknown Driver'}
//   //                         </p>
//   //                         <p className="text-xs text-gray-500">Driver</p>
//   //                       </div>
//   //                     </div>
//   //                   )}
//   //                   <div className="flex items-center text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">
//   //                     <Car size={18} className="mr-3 text-orange-500" />
//   //                     <div>
//   //                       <p className="font-medium text-gray-900">
//   //                         {vehicle
//   //                           ? `${vehicle.make} ${vehicle.model} (ID: ${vehicle.vehicle_id})`
//   //                           : `Unknown Vehicle (ID: ${trip.vehicle_id})`}
//   //                       </p>
//   //                       <p className="text-xs text-gray-500">{vehicle?.license_plate || ''}</p>
//   //                     </div>
//   //                   </div>
//   //                   <div className="flex items-center text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">
//   //                     <Clock size={18} className="mr-3 text-orange-500" />
//   //                     <div>
//   //                       <p className="font-medium text-gray-900">{new Date(trip.start_time).toLocaleString()}</p>
//   //                       <p className="text-xs text-gray-500">Start Time</p>
//   //                     </div>
//   //                   </div>
//   //                   <div className="flex items-center text-sm text-gray-600 p-4 bg-gray-50 rounded-xl">
//   //                     <MapPin size={18} className="mr-3 text-orange-500" />
//   //                     <div>
//   //                       <p className="font-medium text-gray-900">{trip.distance_travelled || 'N/A'} km</p>
//   //                       <p className="text-xs text-gray-500">Distance</p>
//   //                     </div>
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           );
//   //         })}
//   //       </div>

//   //       {filteredTrips.length === 0 && (
//   //         <div className="text-center py-16 animate-fadeIn">
//   //           <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
//   //             <MapPin size={48} className="text-orange-500" />
//   //           </div>
//   //           <h3 className="text-2xl font-bold text-gray-900 mb-4">No trips found</h3>
//   //           <p className="text-gray-600 text-lg">
//   //             {searchTerm || filterStatus !== 'all' 
//   //               ? 'Try adjusting your search criteria or filters.' 
//   //               : 'Get started by scheduling your first trip.'}
//   //           </p>
//   //         </div>
//   //       )}

//   //       {showMonitorModal && monitoringTrip && (
//   //         <MonitoringModal
//   //           trip={monitoringTrip}
//   //           onClose={closeMonitorModal}
//   //         />
//   //       )}
//   //     </div>
//   //   );
//   // }
//   import React, { useEffect, useState } from 'react';
// import { MapPin, Plus, Search, Edit, Trash2, Clock, User, Car, X } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { Trip } from '../types';
// import api from '../services/api';
// import { useSearchParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // =================================================================================
// // TripForm Component (Modified to be role-aware)
// // =================================================================================
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
//   // NEW PROPS to handle role-specific logic
//   managers: any[];
//   user: any; 
// }

// const TripForm: React.FC<TripFormProps> = ({
//   editingTrip,
//   formData,
//   handleInputChange,
//   onSubmit,
//   onCancel,
//   loading,
//   drivers,
//   vehicles,
//   // NEW PROPS
//   managers,
//   user
// }) => (
//   <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8">
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

//         {/* --- MODIFICATION: Conditional Driver/Manager Select --- */}

//         {/* Show Driver Select if the user is a MANAGER */}
//         {user?.role === 'manager' && (
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700">Driver</label>
//             <select
//               name="driver_username"  
//               value={formData.driver_username}  
//               onChange={handleInputChange}
//               className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//               required={!editingTrip} 
//             >
//               <option value="">Select a driver</option>
//               {drivers.map((driver) => (
//                 <option key={driver.username} value={driver.username}>  
//                   {`${driver.username}`}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Show Manager Select if the user is a DRIVER and is CREATING a new trip */}
//         {user?.role === 'driver' && !editingTrip && (
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700">Manager</label>
//             <select
//               name="manager_username"  
//               value={formData.manager_username}  
//               onChange={handleInputChange}
//               className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//               required={!editingTrip} 
//             >
//               <option value="">Select a manager</option>
//               {managers.map((manager) => (
//                 <option key={manager.username} value={manager.username}>  
//                   {`${manager.username}`}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
        
//         {/* --- End of Conditional Select --- */}

//         {/* Vehicle Select */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Vehicle</label>
//           <select
//             name="vehicle_id"
//             value={formData.vehicle_id}
//             onChange={handleInputChange}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             required={!editingTrip}
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
//             required={!editingTrip}
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
//             required={!editingTrip}
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
//             required={!editingTrip}
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

// // =================================================================================
// // EditTripModal Component (Passes new props down)
// // =================================================================================
// const EditTripModal: React.FC<TripFormProps> = (props) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//     <div className="w-full max-w-3xl animate-slideDown">
//         <TripForm {...props} />
//     </div>
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
//   const [showEditModal, setShowEditModal] = useState(false);
//   // NEW: State for managers list
//   const [managers, setManagers] = useState<any[]>([]);

//   const token = localStorage.getItem('authToken');
//   const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

//   useEffect(() => {
//     if (user?.id && user?.username) {
//       fetchTrips();
//       fetchDrivers();
//       fetchVehicles();
//       // NEW: Fetch managers list for the dropdown
//       if (user.role === 'driver') {
//         fetchManagers();
//       }
//     }
//   }, [user?.id, user?.username, user?.role]);

//   useEffect(() => {
//     if (action === 'add') {
//       handleShowAddForm(); // Use new handler to correctly init form
//     } else {
//       setShowAddForm(false);
//     }
//   }, [action]);

//   const fetchTrips = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (user?.role === 'manager') {
//         response = await api.get(`trips/manager/${user.username}`, { headers });
//       } else if (user?.role === 'driver') {
//         response = await api.get(`trips/driver/${user.username}`, { headers });
//       }

//       const data = response?.data;
//       if (Array.isArray(data.data)) {
//         setTrips(data.data);
//       } else {
//         console.warn("API response for trips was not an array:", data);
//         setTrips([]);
//       }
//     } catch (error) {
//       console.error('Error fetching trips:', error);
//       setTrips([]); 
//     } finally {
//       setLoading(false);
//     }
//   };

//   // MODIFIED: formData initial state includes manager_username
//   const [formData, setFormData] = useState({
//     vehicle_id: '',
//     driver_username: '',
//     manager_username: '',
//     start_time: '',
//     end_time: '',
//     start_location: '',
//     end_location: '',
//     distance_travelled: '',
//     trip_status: 'scheduled',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const filteredTrips = trips.filter(trip => {
//     const tripStatus = (trip.trip_status || '').toLowerCase();
//     const filter = filterStatus.toLowerCase();
//     const driverMatch = user?.role === 'manager' ? true : trip.driver_username === user?.username;
//     const statusMatch = filter === 'all' ? true : tripStatus === filter;
//     const searchMatch = searchTerm === '' ||
//       trip.start_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trip.end_location?.toLowerCase().includes(searchTerm.toLowerCase());
//     return driverMatch && statusMatch && searchMatch;
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // MODIFIED: Required fields check is now role-aware
//       if (!editingTrip) {
//         const baseRequired = ['vehicle_id', 'start_time', 'start_location', 'end_location'];
//         const roleRequired = user?.role === 'manager' ? ['driver_username'] : ['manager_username'];
//         const requiredFields = [...baseRequired, ...roleRequired];
        
//         const missingFields = requiredFields.filter(field => !formData[field]);
//         if (missingFields.length > 0) {
//           toast.error(`Missing required fields: ${missingFields.join(', ')}`);
//           setLoading(false);
//           return;
//         }
//       }

//       // MODIFIED: Submission data is built from the complete formData state
//       const submissionData = {
//         vehicle_id: parseInt(formData.vehicle_id),
//         driver_username: formData.driver_username,
//         manager_username: formData.manager_username,
//         start_time: new Date(formData.start_time).toISOString(),
//         end_time: formData.end_time ? new Date(formData.end_time).toISOString() : null,
//         start_location: formData.start_location,
//         end_location: formData.end_location,
//         distance_travelled: formData.distance_travelled ? parseFloat(formData.distance_travelled) : null,
//         trip_status: formData.trip_status  
//       };

//       if (editingTrip) {
//         await api.put(`/trips/${editingTrip.trip_id}`, { ...submissionData, trip_id: editingTrip.trip_id }, { headers });
//         toast.success('Trip updated successfully!');
//       } else {
//         const response = await api.post('/trips/', submissionData, { headers });
//         if (response.status === 201) {
//           toast.success('Trip scheduled successfully!');
//         } else {
//           toast.error(`Failed to schedule trip: ${response.data?.message || 'Unknown error'}`);
//         }
//       }

//       await fetchTrips();
//       resetForm();
//     } catch (err: any) {
//       console.error('Trip submission error:', err);
//       const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'An unknown error occurred';
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this trip?')) {
//       try {
//         await api.delete(`/trips/${id}`);
//         await fetchTrips();
//         toast.success('Trip deleted successfully.');
//       } catch (err: any) {
//         const errorMessage = err.response?.data?.error || 'Failed to delete trip';
//         toast.error(errorMessage);
//         console.error('Failed to delete trip:', err);
//       }
//     }
//   };

//   const handleEdit = (trip: Trip) => {
//     setEditingTrip(trip);
//     // MODIFIED: Now populates manager_username as well for editing
//     setFormData({
//       vehicle_id: trip.vehicle_id.toString(),
//       driver_username: trip.driver_username || '',
//       manager_username: trip.manager_username || '',
//       start_time: new Date(trip.start_time).toISOString().slice(0, 16),
//       end_time: trip.end_time ? new Date(trip.end_time).toISOString().slice(0, 16) : '',
//       start_location: trip.start_location || '',
//       end_location: trip.end_location || '',
//       distance_travelled: trip.distance_travelled?.toString() || '',
//       trip_status: trip.trip_status,
//     });
//     setShowEditModal(true);
//     setShowAddForm(false);
//   };

//   // MODIFIED: Resets all relevant form fields
//   const resetForm = () => {
//     setFormData({
//       vehicle_id: '',
//       driver_username: '',
//       manager_username: '',
//       start_time: '',
//       end_time: '',
//       start_location: '',
//       end_location: '',
//       distance_travelled: '',
//       trip_status: 'scheduled',
//     });
//     setEditingTrip(null);
//     setShowAddForm(false);
//     setShowEditModal(false);
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

//   const fetchDrivers = async () => {
//     try {
//       const response = await api.get(`/drivers/`, { headers });
//       if (response.data && Array.isArray(response.data)) {
//         setDrivers(response.data);
//       } else {
//         console.warn("API response for drivers was not an array:", response.data);
//         setDrivers([]);
//       }
//     } catch (error) {
//       console.error('Error fetching drivers:', error);
//       setDrivers([]);
//     }
//   };
  
//   // NEW: Function to fetch the list of managers
//   const fetchManagers = async () => {
//     try {
//       // NOTE: This assumes you have an API endpoint to get users with the 'manager' role.
//       const response = await api.get(`/users/role/manager`, { headers });
//       if (response.data && Array.isArray(response.data.data)) {
//         setManagers(response.data.data);
//       } else {
//         console.warn("API response for managers was not an array:", response.data);
//         setManagers([]);
//       }
//     } catch (error) {
//       console.error('Error fetching managers:', error);
//       toast.error("Could not load the list of managers.");
//       setManagers([]);
//     }
//   };
  
//   const fetchVehicles = async () => {
//     try {
//       let response;
//       if (user?.role === 'manager') {
//         response = await api.get(`/vehicles/manager/${user?.username}`, { headers });
//       } else if (user?.role === 'driver') {
//         // Drivers might need to see all available vehicles to create a trip
//         response = await api.get(`/vehicles/`, { headers });
//       }
//       if (Array.isArray(response?.data.data)) {
//         setVehicles(response.data.data);
//       } else {
//         console.warn("API response for vehicles was not an array:", response?.data);
//         setVehicles([]);
//       }
//     } catch (error) {
//       console.error('Error fetching vehicles:', error);
//       setVehicles([]);
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
  
//   // NEW: Handler to open the Add form and pre-fill role-specific data
//   const handleShowAddForm = () => {
//     resetForm();
//     setFormData(prev => ({
//         ...prev,
//         driver_username: user?.role === 'driver' ? user.username : '',
//         manager_username: user?.role === 'manager' ? user.username : '',
//     }));
//     setShowAddForm(true);
//   };

//   const MonitoringModal: React.FC<{ trip: Trip; onClose: () => void; }> = ({ trip, onClose }) => {
//      const vehicle = vehicles.find(v => v.vehicle_id === trip.vehicle_id);
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-slideDown">
//           <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={onClose} >
//             <X size={24} />
//           </button>
//           <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">🧭 Trip Monitoring</h2>
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
        
//         {/* MODIFIED: Add Trip button visible to drivers and managers */}
//         {(user?.role === 'manager' || user?.role === 'driver') && (
//           <button
//             onClick={handleShowAddForm}
//             className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-3 transform hover:scale-105 shadow-lg"
//           >
//             <Plus size={24} />
//             <span>Add New Trip</span>
//           </button>
//         )}
//       </div>

//       {/* Add Form (Inline) - MODIFIED to pass new props */}
//       {showAddForm && (
//         <div className="animate-slideDown">
//             <TripForm
//             editingTrip={null}
//             formData={formData}
//             setFormData={setFormData}
//             onSubmit={handleSubmit}
//             onCancel={resetForm}
//             loading={loading}
//             handleInputChange={handleInputChange}
//             drivers={drivers}
//             vehicles={vehicles}
//             managers={managers}
//             user={user}
//             />
//         </div>
//       )}
      
//       {/* Edit Trip Modal - MODIFIED to pass new props */}
//       {showEditModal && editingTrip && (
//         <EditTripModal
//           editingTrip={editingTrip}
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={handleSubmit}
//           onCancel={resetForm}
//           loading={loading}
//           handleInputChange={handleInputChange}
//           drivers={drivers}
//           vehicles={vehicles}
//           managers={managers}
//           user={user}
//         />
//       )}

//       {/* Search and Filters */}
//       <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 animate-fadeIn">
//          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
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
//           const driver = drivers.find(d => d.username === trip.driver_username);
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
//                           {driver ? `${driver.username}` : 'Unknown Driver'}
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
//                       <p className="font-medium text-gray-900">{trip.distance_travelled || 'N/A'} km</p>
//                       <p className="text-xs text-gray-500">Distance</p>
//                     </div>
//                   </div>
//                 </div>
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
//               : (user?.role === 'manager' || user?.role === 'driver' ? 'Get started by scheduling your first trip.' : 'There are no trips assigned to you.')}
//           </p>
//         </div>
//       )}

//       {showMonitorModal && monitoringTrip && (
//         <MonitoringModal
//           trip={monitoringTrip}
//           onClose={closeMonitorModal}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
// MODIFIED: Added new icons for the new stats
import { MapPin, Plus, Search, Edit, Trash2, Clock, User, Car, X, Compass, Gauge, AlertTriangle, Timer, Zap, Droplets } from 'lucide-react';
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
  managers: any[];
  user: any; 
}

const TripForm: React.FC<TripFormProps> = ({
  editingTrip,
  formData,
  handleInputChange,
  onSubmit,
  onCancel,
  loading,
  drivers,
  vehicles,
  managers,
  user
}) => (
  <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8">
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
        {user?.role === 'manager' && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Driver</label>
            <select
              name="driver_username"  
              value={formData.driver_username}  
              onChange={handleInputChange}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              required={!editingTrip} 
            >
              <option value="">Select a driver</option>
              {drivers.map((driver) => (
                <option key={driver.username} value={driver.username}>  
                  {`${driver.username}`}
                </option>
              ))}
            </select>
          </div>
        )}
        {user?.role === 'driver' && !editingTrip && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Manager</label>
            <select
              name="manager_username"  
              value={formData.manager_username}  
              onChange={handleInputChange}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              required={!editingTrip} 
            >
              <option value="">Select a manager</option>
              {managers.map((manager) => (
                <option key={manager.username} value={manager.username}>  
                  {`${manager.username}`}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Vehicle</label>
          <select
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            required={!editingTrip}
          >
            <option value="">Select a vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                {`${vehicle.make} ${vehicle.model} - ${vehicle.license_plate}`}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Start Location</label>
          <input
            type="text"
            name="start_location"
            value={formData.start_location}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter start location"
            required={!editingTrip}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">End Location</label>
          <input
            type="text"
            name="end_location"
            value={formData.end_location}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter end location"
            required={!editingTrip}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time} 
            onChange={handleInputChange}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            required={!editingTrip}
          />
        </div>
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

const EditTripModal: React.FC<TripFormProps> = (props) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="w-full max-w-3xl animate-slideDown">
        <TripForm {...props} />
    </div>
  </div>
);


const MonitoringModal: React.FC<{
  trip: Trip;
  onClose: () => void;
  drivers: any[];
  vehicles: any[];
}> = ({ trip, onClose, drivers, vehicles }) => {
  const driver = drivers.find(d => d.username === trip.driver_username);
  const vehicle = vehicles.find(v => v.vehicle_id === trip.vehicle_id);
  const [lastUpdated, setLastUpdated] = useState(0);

  // Effect for the "Last updated" timer
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(prev => prev + 1);
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  // Helper to format any data point, providing a fallback for null/undefined values
  const formatData = (value: string | number | null | undefined, unit: string = '') => {
    if (value === null || typeof value === 'undefined' || value === '') {
      return <span className="text-gray-400">N/A</span>;
    }
    return <>{value}{unit && ` ${unit}`}</>;
  };
  
  // Helper to calculate and format trip duration
  const getTripDuration = () => {
    if (!trip.start_time) return 'N/A';
    const startTime = new Date(trip.start_time);
    const endTime = (trip.trip_status === 'completed' && trip.end_time) ? new Date(trip.end_time) : new Date();
    
    let diff = Math.abs(endTime.getTime() - startTime.getTime());

    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl relative animate-slideDown max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <Compass size={28} className="mr-3 text-orange-500" />
            Live Trip Monitoring
          </h2>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Main Sections */}
        <div className="space-y-6">
            {/* Top Row: Route, Units, and Location */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Trip Route</h3>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 h-full">
                        <div className="flex items-start"><MapPin className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} /><div><p className="text-xs text-gray-500">From</p><p className="font-medium text-gray-800">{trip.start_location}</p></div></div>
                        <div className="flex items-start"><MapPin className="text-red-500 mr-3 mt-1 flex-shrink-0" size={20} /><div><p className="text-xs text-gray-500">To</p><p className="font-medium text-gray-800">{trip.end_location}</p></div></div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Assigned Units</h3>
                    <div className="space-y-3">
                        <div className="flex items-center text-sm p-4 bg-gray-50 rounded-xl border border-gray-200"><User size={20} className="mr-4 text-orange-500" /><div><p className="font-bold text-gray-900">{driver ? driver.username : 'Unknown Driver'}</p><p className="text-xs text-gray-500">Driver</p></div></div>
                        <div className="flex items-center text-sm p-4 bg-gray-50 rounded-xl border border-gray-200"><Car size={20} className="mr-4 text-orange-500" /><div><p className="font-bold text-gray-900">{vehicle ? `${vehicle.make} ${vehicle.model}` : `Vehicle ID: ${trip.vehicle_id}`}</p><p className="text-xs text-gray-500">{vehicle?.license_plate || 'N/A'}</p></div></div>
                    </div>
                </div>
                 <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Live Location</h3>
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500"><p>Map View of ({formatData(trip.latitude?.toFixed(4))}, {formatData(trip.longitude?.toFixed(4))})</p></div>
                    <p className="text-xs text-gray-500 mt-2">Current Address: {formatData(trip.address)}</p>
                </div>
            </div>

            {/* Bottom Row: Statistics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Performance & Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-orange-50 rounded-xl text-center border border-orange-200"><Gauge size={24} className="mx-auto text-orange-600 mb-2" /><p className="text-2xl font-bold text-orange-800">{formatData(trip.average_speed, 'km/h')}</p><p className="text-xs font-semibold text-orange-700">Avg. Speed</p></div>
                <div className="p-4 bg-blue-50 rounded-xl text-center border border-blue-200"><MapPin size={24} className="mx-auto text-blue-600 mb-2" /><p className="text-2xl font-bold text-blue-800">{formatData(trip.distance_travelled, 'km')}</p><p className="text-xs font-semibold text-blue-700">Distance</p></div>
                <div className="p-4 bg-red-50 rounded-xl text-center border border-red-200"><AlertTriangle size={24} className="mx-auto text-red-600 mb-2" /><p className="text-2xl font-bold text-red-800">{formatData(trip.harsh_events_count)}</p><p className="text-xs font-semibold text-red-700">Harsh Events</p></div>
                <div className="p-4 bg-green-50 rounded-xl text-center border border-green-200"><Clock size={24} className="mx-auto text-green-600 mb-2" /><p className="text-xl font-bold text-green-800 capitalize">{trip.trip_status.replace('-', ' ')}</p><p className="text-xs font-semibold text-green-700">Status</p></div>
                
                {/* NEWLY ADDED STATS */}
                <div className="p-4 bg-indigo-50 rounded-xl text-center border border-indigo-200"><Timer size={24} className="mx-auto text-indigo-600 mb-2" /><p className="text-2xl font-bold text-indigo-800">{getTripDuration()}</p><p className="text-xs font-semibold text-indigo-700">Trip Duration</p></div>
                <div className="p-4 bg-yellow-50 rounded-xl text-center border border-yellow-200"><Zap size={24} className="mx-auto text-yellow-600 mb-2" /><p className="text-2xl font-bold text-yellow-800">{formatData(trip.max_speed, 'km/h')}</p><p className="text-xs font-semibold text-yellow-700">Max Speed</p></div>
                <div className="p-4 bg-cyan-50 rounded-xl text-center border border-cyan-200"><Droplets size={24} className="mx-auto text-cyan-600 mb-2" /><p className="text-2xl font-bold text-cyan-800">{formatData(trip.fuel_consumed, 'L')}</p><p className="text-xs font-semibold text-cyan-700">Fuel Used</p></div>
              </div>
            </div>
        </div>

        {/* Footer with updated timer */}
        <p className="text-center text-sm text-gray-500 mt-6 pt-4 border-t border-gray-200">
          Last updated: {lastUpdated < 5 ? 'Just now' : `${lastUpdated}s ago`}
        </p>
      </div>
    </div>
  );
};


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
  const [showEditModal, setShowEditModal] = useState(false);
  const [managers, setManagers] = useState<any[]>([]);

  const token = localStorage.getItem('authToken');
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    if (user?.id && user?.username) {
      fetchTrips();
      fetchDrivers();
      fetchVehicles();
      if (user.role === 'driver') {
        fetchManagers();
      }
    }
  }, [user?.id, user?.username, user?.role]);

  useEffect(() => {
    if (action === 'add') {
      handleShowAddForm();
    } else {
      setShowAddForm(false);
    }
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

  const [formData, setFormData] = useState({
    vehicle_id: '',
    driver_username: '',
    manager_username: '',
    start_time: '',
    end_time: '',
    start_location: '',
    end_location: '',
    distance_travelled: '',
    trip_status: 'scheduled',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredTrips = trips.filter(trip => {
    const tripStatus = (trip.trip_status || '').toLowerCase();
    const filter = filterStatus.toLowerCase();
    const driverMatch = user?.role === 'manager' ? true : trip.driver_username === user?.username;
    const statusMatch = filter === 'all' ? true : tripStatus === filter;
    const searchMatch = searchTerm === '' ||
      trip.start_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.end_location?.toLowerCase().includes(searchTerm.toLowerCase());
    return driverMatch && statusMatch && searchMatch;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!editingTrip) {
        const baseRequired = ['vehicle_id', 'start_time', 'start_location', 'end_location'];
        const roleRequired = user?.role === 'manager' ? ['driver_username'] : ['manager_username'];
        const requiredFields = [...baseRequired, ...roleRequired];
        
        const missingFields = requiredFields.filter(field => !formData[field]);
        if (missingFields.length > 0) {
          toast.error(`Missing required fields: ${missingFields.join(', ')}`);
          setLoading(false);
          return;
        }
      }

      const submissionData = {
        vehicle_id: parseInt(formData.vehicle_id),
        driver_username: formData.driver_username,
        manager_username: formData.manager_username,
        start_time: new Date(formData.start_time).toISOString(),
        end_time: formData.end_time ? new Date(formData.end_time).toISOString() : null,
        start_location: formData.start_location,
        end_location: formData.end_location,
        distance_travelled: formData.distance_travelled ? parseFloat(formData.distance_travelled) : null,
        trip_status: formData.trip_status  
      };

      if (editingTrip) {
        await api.put(`/trips/${editingTrip.trip_id}`, { ...submissionData, trip_id: editingTrip.trip_id }, { headers });
        toast.success('Trip updated successfully!');
      } else {
        const response = await api.post('/trips/', submissionData, { headers });
        if (response.status === 201) {
          toast.success('Trip scheduled successfully!');
        } else {
          toast.error(`Failed to schedule trip: ${response.data?.message || 'Unknown error'}`);
        }
      }

      await fetchTrips();
      resetForm();
    } catch (err: any) {
      console.error('Trip submission error:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'An unknown error occurred';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await api.delete(`/trips/${id}`);
        await fetchTrips();
        toast.success('Trip deleted successfully.');
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
      manager_username: trip.manager_username || '',
      start_time: new Date(trip.start_time).toISOString().slice(0, 16),
      end_time: trip.end_time ? new Date(trip.end_time).toISOString().slice(0, 16) : '',
      start_location: trip.start_location || '',
      end_location: trip.end_location || '',
      distance_travelled: trip.distance_travelled?.toString() || '',
      trip_status: trip.trip_status,
    });
    setShowEditModal(true);
    setShowAddForm(false);
  };

  const resetForm = () => {
    setFormData({
      vehicle_id: '',
      driver_username: '',
      manager_username: '',
      start_time: '',
      end_time: '',
      start_location: '',
      end_location: '',
      distance_travelled: '',
      trip_status: 'scheduled',
    });
    setEditingTrip(null);
    setShowAddForm(false);
    setShowEditModal(false);
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
  
  const fetchManagers = async () => {
    try {
      const response = await api.get(`/users/role/manager`, { headers });
      if (response.data && Array.isArray(response.data.data)) {
        setManagers(response.data.data);
      } else {
        console.warn("API response for managers was not an array:", response.data);
        setManagers([]);
      }
    } catch (error) {
      console.error('Error fetching managers:', error);
      toast.error("Could not load the list of managers.");
      setManagers([]);
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
  
  const handleShowAddForm = () => {
    resetForm();
    setFormData(prev => ({
        ...prev,
        driver_username: user?.role === 'driver' ? user.username : '',
        manager_username: user?.role === 'manager' ? user.username : '',
    }));
    setShowAddForm(true);
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
        
        {(user?.role === 'manager' || user?.role === 'driver') && (
          <button
            onClick={handleShowAddForm}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-3 transform hover:scale-105 shadow-lg"
          >
            <Plus size={24} />
            <span>Add New Trip</span>
          </button>
        )}
      </div>

      {/* Add Form (Inline) */}
      {showAddForm && (
        <div className="animate-slideDown">
            <TripForm
            editingTrip={null}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            loading={loading}
            handleInputChange={handleInputChange}
            drivers={drivers}
            vehicles={vehicles}
            managers={managers}
            user={user}
            />
        </div>
      )}
      
      {/* Edit Trip Modal */}
      {showEditModal && editingTrip && (
        <EditTripModal
          editingTrip={editingTrip}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          loading={loading}
          handleInputChange={handleInputChange}
          drivers={drivers}
          vehicles={vehicles}
          managers={managers}
          user={user}
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
                      <p className="font-medium text-gray-900">{trip.distance_travelled || 'N/A'} km</p>
                      <p className="text-xs text-gray-500">Distance</p>
                    </div>
                  </div>
                </div>
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
              : (user?.role === 'manager' || user?.role === 'driver' ? 'Get started by scheduling your first trip.' : 'There are no trips assigned to you.')}
          </p>
        </div>
      )}

      {/* MODIFIED: Passing props to the modal remains the same, but the modal itself is updated */}
      {showMonitorModal && monitoringTrip && (
        <MonitoringModal
          trip={monitoringTrip}
          onClose={closeMonitorModal}
          drivers={drivers}
          vehicles={vehicles}
        />
      )}
    </div>
  );
}