import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { badgesMappingAPI } from '../services/api';

const AssignBadgesPage: React.FC = () => {
  const { user } = useAuth();
  const [driverId, setDriverId] = useState('');
  const [badgeId, setBadgeId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'manager') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-red-600 font-semibold">Access denied. Only managers can assign badges.</div>
      </div>
    );
  }

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!driverId || !badgeId) {
      setMessage('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      await badgesMappingAPI.assignBadge(parseInt(driverId), parseInt(badgeId), user.id);
      setMessage('Badge successfully assigned!');
      setDriverId('');
      setBadgeId('');
    } catch (error: any) {
      console.error('Assign badge error:', error);
      setMessage('Failed to assign badge: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form
        onSubmit={handleAssign}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-orange-100 animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Assign Badge to Driver</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Driver ID</label>
          <input
            type="number"
            value={driverId}
            onChange={e => setDriverId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter Driver ID"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Badge ID</label>
          <input
            type="number"
            value={badgeId}
            onChange={e => setBadgeId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter Badge ID"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Manager ID</label>
          <input
            type="number"
            value={user.id}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Assigning...' : 'Assign Badge'}
        </button>
        {message && (
          <div className={`mt-6 text-center font-semibold ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>
        )}
      </form>
    </div>
  );
};

export default AssignBadgesPage; 