import React, { useEffect, useState } from 'react';
import RulesManager from '../components/RulesManager';
import { useAuth } from '../context/AuthContext';
import { rulesAPI, pointsAPI } from '../services/api';

// Function to convert rule names to the format expected by the backend
const convertRuleName = (ruleName: string): string => {
  return ruleName.replace(/\s+/g, '_').toLowerCase();
};

// Function to trigger leaderboard refresh
const triggerLeaderboardRefresh = () => {
  // Dispatch a custom event that the LeaderboardPage can listen to
  window.dispatchEvent(new CustomEvent('leaderboard-refresh'));
};

export function PointUpdationPage() {
  const { user } = useAuth();
  const [managerData, setManagerData] = useState<any>(null);
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const rulesResponse = await rulesAPI.getRules(user?.id);
        const rulesData = rulesResponse.data || rulesResponse;
        
        // The backend returns an object, not an array
        // If rulesData is an object, use it directly
        if (typeof rulesData === 'object' && !Array.isArray(rulesData)) {
          setManagerData(rulesData);
          setAvailableColumns(Object.keys(rulesData));
        } else if (Array.isArray(rulesData)) {
          // Fallback for array response (if backend changes)
          const managerRow = rulesData.find((row: any) => row.manager_id === user?.id);
          setManagerData(managerRow);
          if (rulesData.length > 0) {
            setAvailableColumns(Object.keys(rulesData[0]));
          }
        } else {
          throw new Error('Invalid rules data format');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    if (user?.id && user.role === 'manager') loadData();
  }, [user]);

  if (!user || user.role !== 'manager') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-red-600 font-semibold">Access denied. Only managers can update points.</div>
      </div>
    );
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!managerData) return <div className="p-8 text-gray-600">No rules found for this manager.</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Rules Management</h1>
      <RulesManager
        managerId={user.id}
        managerData={managerData}
        availableColumns={availableColumns}
        onUpdatePoints={async (managerId, rule, newPoints) => {
          try {
            // Convert the rule name to the format expected by the backend
            const convertedRule = convertRuleName(rule);
            await pointsAPI.updatePoints(parseInt(managerId), convertedRule, newPoints);
            setManagerData((prev: any) => ({ ...prev, [rule]: newPoints }));
            
            // Trigger leaderboard refresh after successful update
            triggerLeaderboardRefresh();
          } catch (error: any) {
            console.error('Update points error:', error);
            throw new Error(error.response?.data?.error || error.message);
          }
        }}
      />
    </div>
  );
}