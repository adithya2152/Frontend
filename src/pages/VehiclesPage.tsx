// import React, { useEffect, useState, useCallback } from 'react';
// import { Car, Plus, Search, Edit, Trash2, Calendar, Gauge, Settings, X } from 'lucide-react';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { Vehicle } from '../types';
// import { useSearchParams } from 'react-router-dom';

// interface VehicleFormProps {
//   editingVehicle: Vehicle | null;
//   formData: any;
//   setFormData: React.Dispatch<React.SetStateAction<any>>;
//   onSubmit: (e: React.FormEvent) => Promise<void>;
//   onCancel: () => void;
//   loading: boolean;
// }

// const VehicleForm: React.FC<VehicleFormProps> = ({
//   editingVehicle,
//   formData,
//   setFormData,
//   onSubmit,
//   onCancel,
//   loading
// }) => (
//   <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8 animate-slideDown">
//     <div className="flex items-center justify-between mb-8">
//       <div className="flex items-center space-x-3">
//         <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
//           <Car size={24} className="text-white" />
//         </div>
//         <h3 className="text-2xl font-bold text-gray-900">
//           {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
//         </h3>
//       </div>
//       <button
//         onClick={onCancel}
//         className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
//       >
//         <X size={24} />
//       </button>
//     </div>
    
//     <form 
//       onSubmit={onSubmit}
//       className="space-y-6"
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Basic Information */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">License Plate</label>
//           <input
//             type="text"
//             name="license_plate"
//             value={formData.license_plate}
//             onChange={(e) => setFormData(prev => ({ 
//               ...prev, 
//               license_plate: e.target.value.toUpperCase() // Normalize license plates to uppercase
//             }))}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             placeholder="Enter license plate number"
//             required
//             maxLength={20} // Match VARCHAR(20) constraint
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Make</label>
//           <input
//             type="text"
//             name="make"
//             value={formData.make}
//             onChange={(e) => setFormData(prev => ({ ...prev, make: e.target.value }))}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             placeholder="Enter vehicle make"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Model</label>
//           <input
//             type="text"
//             name="model"
//             value={formData.model}
//             onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             placeholder="Enter model"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Vehicle Type</label>
//           <select
//             name="vehicle_type"
//             value={formData.vehicle_type}
//             onChange={(e) => setFormData(prev => ({ ...prev, vehicle_type: e.target.value }))}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             required
//           >
//             <option value="">Select type</option>
//             <option value="sedan">Sedan</option>
//             <option value="suv">SUV</option>
//             <option value="truck">Truck</option>
//             <option value="van">Van</option>
//             <option value="bus">Bus</option>
//             <option value="muv">MUV</option>
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Year</label>
//           <input
//             type="number"
//             name="year"
//             value={formData.year}
//             onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             min="1990"
//             max={new Date().getFullYear() + 1}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Location</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             placeholder="Enter vehicle location"
//             required
//           />
//         </div>

//         {/* Vehicle Status */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Kilometers Driven</label>
//           <input
//             type="number"
//             name="km_driven"
//             value={formData.km_driven}
//             onChange={(e) => setFormData(prev => ({ ...prev, km_driven: e.target.value }))}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             min="0"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Remaining Fuel (%)</label>
//           <input
//             type="number"
//             name="remaining_fuel"
//             value={formData.remaining_fuel}
//             onChange={(e) => setFormData(prev => ({ ...prev, remaining_fuel: e.target.value }))}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             min="0"
//             max="100"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Tire Pressure</label>
//           <input
//             type="text"
//             name="tire_pressure"
//             value={formData.tire_pressure}
//             onChange={(e) => setFormData(prev => ({ ...prev, tire_pressure: e.target.value }))}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             placeholder="Enter tire pressure"
//             required
//           />
//         </div>

//         {/* Maintenance Info */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Service Date</label>
//           <input
//             type="date"
//             name="service_date"
//             value={formData.service_date}
//             onChange={(e) => setFormData(prev => ({ ...prev, service_date: e.target.value }))}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Inspection Date</label>
//           <input
//             type="date"
//             name="inspection_date"
//             value={formData.inspection_date}
//             onChange={(e) => setFormData(prev => ({ ...prev, inspection_date: e.target.value }))}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700">Service Type</label>
//           <select
//             name="service_type"
//             value={formData.service_type}
//             onChange={(e) => setFormData(prev => ({ ...prev, service_type: e.target.value }))}
//             className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//             required
//           >
//             <option value="">Select service type</option>
//             <option value="routine">Routine Maintenance</option>
//             <option value="repair">Repair</option>
//             <option value="inspection">Inspection</option>
//           </select>
//         </div>
//       </div>

//       <div className="flex space-x-4 pt-4">
//         <button
//           type="submit"
//           disabled={loading}
//           className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
//         >
//           {loading ? 'Saving...' : (editingVehicle ? 'Update Vehicle' : 'Add Vehicle')}
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

// export function VehiclesPage({ action }) {
//   const [searchParams] = useSearchParams();
//   const { user } = useAuth();
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(action === 'add');
//   const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Form state
//   const [formData, setFormData] = useState({
//     vehicle_type: '',
//     make: '',
//     model: '', 
//     year: new Date().getFullYear().toString(),
//     license_plate: '',
//     image_url: null,
//     location: '',
//     accidents: '0',
//     km_driven: '0',
//     remaining_fuel: '',
//     tire_pressure: '',
//     service_date: '',
//     inspection_date: '',
//     service_type: '',
//     status: 'available' // Changed from recall_status to status
//   });

//   const fetchVehicles = useCallback(async () => {
//     setLoading(true);
//     const id = user?.id;
//     const username = user?.username;
//     try {
//       const response = await api.get<Vehicle[]>(`/vehicles/manager/${username}`);
//       setVehicles(response.data.data);
//     } catch (err) {
//       console.error('Failed to fetch vehicles:', err);
//       alert('Failed to fetch vehicles');
//     } finally {
//       setLoading(false);
//     }
//   }, [user?.id]);

//   // Use effect to fetch vehicles when component mounts
//   useEffect(() => {
//     if (user?.id) {
//       fetchVehicles();
//     }
//   }, [fetchVehicles, user?.id]);

//   useEffect(() => {
//     if (action === 'add') setShowAddForm(true);
//     else setShowAddForm(false);
//   }, [action]);

//   const validateForm = (data: typeof formData) => {
//     if (!data.license_plate) {
//       throw new Error('License plate is required');
//     }
    
//     if (data.year && (parseInt(data.year) < 1900 || parseInt(data.year) > new Date().getFullYear() + 1)) {
//       throw new Error('Invalid year');
//     }

//     // Validate numeric fields
//     if (data.km_driven && isNaN(parseFloat(data.km_driven))) {
//       throw new Error('Invalid kilometers driven value');
//     }

//     if (data.remaining_fuel && (parseFloat(data.remaining_fuel) < 0 || parseFloat(data.remaining_fuel) > 100)) {
//       throw new Error('Remaining fuel must be between 0 and 100');
//     }

//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Validate form data
//       validateForm(formData);

//       // Format data to match database schema
//       const submissionData = {
//         manager_id: parseInt(user?.id as string ),
//         vehicle_type: formData.vehicle_type,
//         make: formData.make,
//         model: formData.model,
//         year: parseInt(formData.year),
//         license_plate: formData.license_plate.trim().toUpperCase(),
//         image_url: formData.image_url,
//         location: formData.location,
//         accidents: parseInt(formData.accidents) || 0,
//         km_driven: parseFloat(formData.km_driven) || 0,
//         remaining_fuel: formData.remaining_fuel,
//         tire_pressure: formData.tire_pressure,
//         service_date: formData.service_date,
//         inspection_date: formData.inspection_date,
//         service_type: formData.service_type,
//         status: 'available' // Use valid enum value
//       };

//       if (editingVehicle) {
//         await api.put(`/vehicles/${user?.id}`, {
//           ...submissionData,
//           vehicle_id: editingVehicle.vehicle_id
//         });
//       } else {
//         await api.post('/vehicles/', submissionData);
//       }

//       await fetchVehicles();
//       setShowAddForm(false);
//       resetForm();
//     } catch (err: any) {
//       console.error('Vehicle submission error:', err);
//       alert(err.response?.data?.error || 'Failed to save vehicle');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this vehicle?')) {
//       try {
//         await api.delete(`/vehicles/${id}`);
//         await fetchVehicles(); // Refresh list after deletion
//       } catch (err) {
//         console.error('Failed to delete vehicle:', err);
//         alert('Failed to delete vehicle');
//       }
//     }
//   };

//   const handleEdit = (vehicle: Vehicle) => {
//     setEditingVehicle(vehicle);
//     setFormData(vehicle);
//     setShowAddForm(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       vehicle_type: '',
//       make: '',
//       model: '', 
//       year: new Date().getFullYear().toString(),
//       license_plate: '',
//       image_url: null,
//       location: '',
//       accidents: '0',
//       km_driven: '0',
//       remaining_fuel: '',
//       tire_pressure: '',
//       service_date: '',
//       inspection_date: '',
//       service_type: '',
//       status: 'available' // Changed from recall_status to status
//     });
//     setEditingVehicle(null);
//     setShowAddForm(false);
//   };

//   // Filter vehicles based on search term
//   const filteredVehicles = vehicles.filter(vehicle =>
//     vehicle.vehicle_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     vehicle.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     vehicle.license_plate?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   const getStatusColor = (status: Vehicle['status']) => {
//     switch (status) {
//       case 'available': return 'bg-green-100 text-green-800 border-green-200';
//       case 'in-use': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between animate-fadeIn">
//         <div className="flex items-center space-x-4 mb-6 lg:mb-0">
//           <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
//             <Car size={28} className="text-white" />
//           </div>
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//               Vehicles Management
//             </h1>
//             <p className="text-gray-600 text-lg mt-1">Manage your fleet vehicles and their information</p>
//           </div>
//         </div>
//         <button
//           onClick={() => setShowAddForm(!showAddForm)}
//           className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-3 transform hover:scale-105 shadow-lg"
//         >
//           <Plus size={24} />
//           <span>Add Vehicle</span>
//         </button>
//       </div>

//       {/* Add/Edit Form */}
//       {showAddForm && (
//         <VehicleForm
//           editingVehicle={editingVehicle}
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={handleSubmit}
//           onCancel={resetForm}
//           loading={loading}
//         />
//       )}

//       {/* Search and Filters */}
//       <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 animate-fadeIn">
//   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//     <div className="relative flex-1 max-w-md">
//       <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//       <input
//         type="text"
//         placeholder="Search vehicles..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
//       />
//     </div>
//     <div className="text-sm text-gray-600 font-medium bg-orange-50 px-4 py-2 rounded-xl">
//       {filteredVehicles.length} of {vehicles.length} vehicles
//     </div>
//   </div>
// </div>

//       {/* Vehicles Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {filteredVehicles.map((vehicle, index) => (
//           <div 
//             key={index} 
//             className="bg-white rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeIn"
//             style={{ animationDelay: `${index * 100}ms` }}
//           >
//             <div className="p-6">
//               <div className="flex items-start justify-between mb-6">
//                 <div className="flex-1">
//                   <h3 className="font-bold text-gray-900 text-xl mb-2">
//                         {vehicle.model}
//                   </h3>
//                   <p className="text-gray-600 font-semibold text-lg mb-3">{vehicle.license_plate}</p>
//                   <span className={`inline-block px-4 py-2 rounded-xl text-sm font-semibold border ${getStatusColor(vehicle.recall_status)}`}>
//                     {(vehicle.status ?? 'unknown').charAt(0).toUpperCase() + (vehicle.status ?? 'unknown').slice(1)}
//                   </span>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEdit(vehicle)}
//                     className="p-3 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 transform hover:scale-110"
//                   >
//                     <Edit size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(String(vehicle.vehicle_id))}
//                     className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-gray-50 p-3 rounded-xl">
//                     <p className="text-xs text-gray-500 font-medium">Year</p>
//                     <p className="font-semibold text-gray-900">{vehicle.year}</p>
//                   </div>
//                   <div className="bg-gray-50 p-3 rounded-xl">
//                     <p className="text-xs text-gray-500 font-medium">Fuel</p>
//                     <p className="font-semibold text-gray-900">{vehicle.remaining_fuel}</p>
//                   </div>
//                 </div>
                
//                 <div className="bg-gray-50 p-3 rounded-xl">
//                   <p className="text-xs text-gray-500 font-medium">Type</p>
//                   <p className="font-semibold text-gray-900 capitalize">{vehicle.vehicle_type}</p>
//                 </div>
                
//                 {/* <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-xl">
//                   <Gauge size={16} className="mr-3 text-orange-500" />
//                   <span className="font-medium">{vehicle.mileage.toLocaleString()} miles</span>
//                 </div> */}
                
//                 <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-xl">
//                   <Settings size={16} className="mr-3 text-orange-500" />
//                   <div>
//                     <p className="font-medium">Last maintenance</p>
//                     <p className="text-xs text-gray-500">
//                       {vehicle.service_date
//                         ? new Date(vehicle.service_date).toLocaleDateString()
//                         : 'N/A'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredVehicles.length === 0 && (
//         <div className="text-center py-16 animate-fadeIn">
//           <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Car size={48} className="text-orange-500" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-4">No vehicles found</h3>
//           <p className="text-gray-600 text-lg">
//             {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first vehicle.'}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback } from 'react';
import { Car, Plus, Search, Edit, Trash2, Calendar, Gauge, Settings, X } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Vehicle } from '../types';
import { useSearchParams } from 'react-router-dom';

 

interface VehicleFormProps {
  editingVehicle: Vehicle | null;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  editingVehicle,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  loading
}) => {
 
  const isEditing = !!editingVehicle;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8 animate-slideDown">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Car size={24} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          <X size={24} />
        </button>
      </div>
      
      <form 
        onSubmit={onSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">License Plate</label>
            <input
              type="text"
              name="license_plate"
              value={formData.license_plate}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                license_plate: e.target.value.toUpperCase()
              }))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="Enter license plate number"
              required // License plate is always required
              maxLength={20}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Make</label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={(e) => setFormData(prev => ({ ...prev, make: e.target.value }))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="Enter vehicle make"
              required={!isEditing} // <-- MODIFIED
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="Enter model"
              required={!isEditing} // <-- MODIFIED
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Vehicle Type</label>
            <select
              name="vehicle_type"
              value={formData.vehicle_type}
              onChange={(e) => setFormData(prev => ({ ...prev, vehicle_type: e.target.value }))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              required={!isEditing} // <-- MODIFIED
            >
              <option value="">Select type</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="truck">Truck</option>
              <option value="van">Van</option>
              <option value="bus">Bus</option>
              <option value="muv">MUV</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              min="1990"
              max={new Date().getFullYear() + 1}
              required={!isEditing} // <-- MODIFIED
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="Enter vehicle location"
              required={!isEditing} // <-- MODIFIED
            />
          </div>

          {/* Vehicle Status */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Kilometers Driven</label>
            <input
              type="number"
              name="km_driven"
              value={formData.km_driven}
              onChange={(e) => setFormData(prev => ({ ...prev, km_driven: e.target.value }))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              min="0"
              required={!isEditing} // <-- MODIFIED
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Remaining Fuel (%)</label>
            <input
              type="text"
              name="remaining_fuel"
              value={formData.remaining_fuel}
              onChange={(e) => setFormData(prev => ({ ...prev, remaining_fuel: e.target.value }))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              min="0"
              max="100"
              required={!isEditing} // <-- MODIFIED
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Tire Pressure</label>
            <input
              type="text"
              name="tire_pressure"
              value={formData.tire_pressure}
              onChange={(e) => setFormData(prev => ({ ...prev, tire_pressure: e.target.value }))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="Enter tire pressure"
              required={!isEditing} // <-- MODIFIED
            />
          </div>

          {/* Maintenance Info */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Service Date</label>
            <input
              type="date"
              name="service_date"
              value={formData.service_date}
              onChange={(e) => setFormData(prev => ({ ...prev, service_date: e.target.value }))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              required={!isEditing} // <-- MODIFIED
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Inspection Date</label>
            <input
              type="date"
              name="inspection_date"
              value={formData.inspection_date}
              onChange={(e) => setFormData(prev => ({ ...prev, inspection_date: e.target.value }))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              required={!isEditing} // <-- MODIFIED
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Service Type</label>
            <select
              name="service_type"
              value={formData.service_type}
              onChange={(e) => setFormData(prev => ({ ...prev, service_type: e.target.value }))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              required={!isEditing} // <-- MODIFIED
            >
              <option value="">Select service type</option>
              <option value="routine">Routine Maintenance</option>
              <option value="repair">Repair</option>
              <option value="inspection">Inspection</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Vehicle' : 'Add Vehicle')}
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
};

 

export function VehiclesPage({ action }) {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(action === 'add');
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // *** IMPROVEMENT: Defined initial form state as a constant for reusability ***
  const initialFormData = {
    vehicle_type: '',
    make: '',
    model: '', 
    year: new Date().getFullYear().toString(),
    license_plate: '',
    image_url: null,
    location: '',
    accidents: '0',
    km_driven: '0',
    remaining_fuel: '',
    tire_pressure: '',
    service_date: '',
    inspection_date: '',
    service_type: '',
    status: 'available'
  };

  const [formData, setFormData] = useState(initialFormData);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    const username = user?.username;
    if (!username) {
      console.error("Username not found, cannot fetch vehicles.");
      setLoading(false);
      return;
    }
    try {
      const response = await api.get<{ data: Vehicle[] }>(`/vehicles/manager/${username}`);
      setVehicles(response.data.data);
    } catch (err) {
      console.error('Failed to fetch vehicles:', err);
      alert('Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  }, [user?.username]);

  useEffect(() => {
    if (user?.username) {
      fetchVehicles();
    }
  }, [fetchVehicles, user?.username]);

  useEffect(() => {
    if (action === 'add') {
      setShowAddForm(true);
      setEditingVehicle(null);
      setFormData(initialFormData);
    } else {
      setShowAddForm(false);
    }
  }, [action]);

  // *** IMPROVEMENT: Validation is now aware of the editing context ***
  const validateForm = (data: typeof formData, isEditing: boolean) => {
    if (!data.license_plate) {
      throw new Error('License plate is required');
    }
    
    if (data.year && (parseInt(data.year) < 1900 || parseInt(data.year) > new Date().getFullYear() + 2)) {
      throw new Error('Invalid year');
    }

    if (data.km_driven && isNaN(parseFloat(data.km_driven))) {
      throw new Error('Invalid kilometers driven value');
    }

    if (data.remaining_fuel && (parseFloat(data.remaining_fuel) < 0 || parseFloat(data.remaining_fuel) > 100)) {
      throw new Error('Remaining fuel must be between 0 and 100');
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const isEditing = !!editingVehicle;

    try {
      validateForm(formData, isEditing);
 
      const submissionData = {
        manager_username: user?.username,
        vehicle_type: formData.vehicle_type || null,
        make: formData.make || null,
        model: formData.model || null,
        year: formData.year ? parseInt(formData.year) : null,
        license_plate: formData.license_plate.trim().toUpperCase(),
        image_url: formData.image_url,
        location: formData.location || null,
        accidents: formData.accidents ? parseInt(formData.accidents) : 0,
        km_driven: formData.km_driven ? parseFloat(formData.km_driven) : 0,
        remaining_fuel: formData.remaining_fuel || null,
        tire_pressure: formData.tire_pressure || null,
        service_date: formData.service_date || null,
        inspection_date: formData.inspection_date || null,
        service_type: formData.service_type || null,
        status: formData.status
      };

      if (isEditing) {
       
        await api.put(`/vehicles/${editingVehicle.vehicle_id}`, {
          ...submissionData,
          vehicle_id: editingVehicle.vehicle_id
        });
      } else {
        await api.post('/vehicles/', submissionData);
      }

      await fetchVehicles();
      resetForm();
    } catch (err: any) {
      console.error('Vehicle submission error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to save vehicle';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await api.delete(`/vehicles/${id}`);
        await fetchVehicles();
      } catch (err) {
        console.error('Failed to delete vehicle:', err);
        alert('Failed to delete vehicle');
      }
    }
  };

  // *** IMPROVEMENT: More robustly populates form, handles nulls and date formats ***
  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);

    const formReadyData = {
      ...initialFormData,
      ...Object.fromEntries(
        Object.entries(vehicle).map(([key, value]) => [
          key,
          value === null || value === undefined ? '' : String(value),
        ])
      ),
      // Ensure date fields are in 'YYYY-MM-DD' format if they exist
      service_date: vehicle.service_date ? new Date(vehicle.service_date).toISOString().split('T')[0] : '',
      inspection_date: vehicle.inspection_date ? new Date(vehicle.inspection_date).toISOString().split('T')[0] : ''
    };
    
    setFormData(formReadyData);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingVehicle(null);
    setShowAddForm(false);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.vehicle_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.license_plate?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-use': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between animate-fadeIn">
        <div className="flex items-center space-x-4 mb-6 lg:mb-0">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Car size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Vehicles Management
            </h1>
            <p className="text-gray-600 text-md lg:text-lg mt-1">Manage your fleet vehicles and their information</p>
          </div>
        </div>
        <button
          onClick={() => {
            // If form is open for editing, clicking again should close it.
            // If closed, open it for adding.
            if (showAddForm && editingVehicle) {
              resetForm();
            } else if (showAddForm && !editingVehicle) {
              setShowAddForm(false);
            } else {
              resetForm();
              setShowAddForm(true);
            }
          }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-3 transform hover:scale-105 shadow-lg w-full lg:w-auto mt-4 lg:mt-0"
        >
          <Plus size={24} />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <VehicleForm
          editingVehicle={editingVehicle}
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
              placeholder="Search by make, model, type, license plate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>
          <div className="text-sm text-gray-600 font-medium bg-orange-50 px-4 py-2 rounded-xl border border-orange-200">
            {filteredVehicles.length} of {vehicles.length} vehicles
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading && <p>Loading vehicles...</p>}
        {!loading && filteredVehicles.map((vehicle, index) => (
          <div 
            key={vehicle.vehicle_id || index} 
            className="bg-white rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-xl mb-1">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-gray-600 font-semibold text-lg mb-3">{vehicle.license_plate}</p>
                   {/* There was a bug here, using recall_status which does not exist in the form state. Corrected to 'status' */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(vehicle.status)}`}>
                    {(vehicle.status ?? 'unknown').charAt(0).toUpperCase() + (vehicle.status ?? 'unknown').slice(1)}
                  </span>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="p-3 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
                    aria-label={`Edit ${vehicle.make} ${vehicle.model}`}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(String(vehicle.vehicle_id))}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                    aria-label={`Delete ${vehicle.make} ${vehicle.model}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-xs text-gray-500 font-medium">Year</p>
                    <p className="font-semibold text-gray-900">{vehicle.year}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-xs text-gray-500 font-medium">Fuel</p>
                    <p className="font-semibold text-gray-900">{vehicle.remaining_fuel}%</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 font-medium">Type</p>
                  <p className="font-semibold text-gray-900 capitalize">{vehicle.vehicle_type}</p>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-xl">
                  <Gauge size={16} className="mr-3 text-orange-500 flex-shrink-0" />
                  <span className="font-medium">{Number(vehicle.km_driven).toLocaleString()} km driven</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-xl">
                  <Settings size={16} className="mr-3 text-orange-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Last Service</p>
                    <p className="text-xs text-gray-500">
                      {vehicle.service_date
                        ? new Date(vehicle.service_date).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && vehicles.length > 0 && filteredVehicles.length === 0 && (
        <div className="text-center py-16 animate-fadeIn">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={48} className="text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Vehicles Match Your Search</h3>
            <p className="text-gray-600 text-lg">
                Try adjusting your search criteria to find what you're looking for.
            </p>
        </div>
      )}

      {!loading && vehicles.length === 0 && (
        <div className="text-center py-16 animate-fadeIn">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Car size={48} className="text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No Vehicles Found</h3>
          <p className="text-gray-600 text-lg">
            Get started by adding your first vehicle using the button above.
          </p>
        </div>
      )}
    </div>
  );
}