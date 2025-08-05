import React, { useState } from 'react';

interface RulesManagerProps {
  managerId: string;
  managerData: any;
  availableColumns: string[];
  onUpdatePoints: (managerId: string, rule: string, newPoints: number) => Promise<void>;
}

// Function to convert rule names to display format
const formatRuleName = (ruleName: string): string => {
  return ruleName
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
    .replace(/_/g, ' ') // Replace underscores with spaces
    .trim();
};

const RulesManager: React.FC<RulesManagerProps> = ({
  managerId,
  managerData,
  availableColumns,
  onUpdatePoints,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [newPoints, setNewPoints] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const openModal = (rule: string) => {
    setSelectedRule(rule);
    setNewPoints(managerData[rule]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRule(null);
    setNewPoints('');
  };

  const handleUpdate = async () => {
    if (!selectedRule) return;
    const points = Number(newPoints);
    if (isNaN(points)) {
      setToast({ type: 'error', message: 'Please enter a valid number.' });
      return;
    }
    setLoading(true);
    try {
      await onUpdatePoints(managerId, selectedRule, points);
      setToast({ type: 'success', message: `Points for "${formatRuleName(selectedRule)}" updated!` });
      closeModal();
    } catch (err: any) {
      setToast({ type: 'error', message: err.message || 'Update failed.' });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 2000);
    }
  };

  return (
    <div>
      {toast && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            toast.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {toast.message}
        </div>
      )}
      <div className="overflow-x-auto rounded-xl shadow border">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-orange-50">
              <th className="p-3 text-left font-semibold text-gray-700">Rule</th>
              <th className="p-3 text-left font-semibold text-gray-700">Points</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {availableColumns
              .filter((col) => col !== 'manager_id')
              .map((rule) => (
                <tr key={rule} className="border-t hover:bg-orange-50 transition">
                  <td className="p-3 capitalize">{formatRuleName(rule)}</td>
                  <td className="p-3">{managerData[rule]}</td>
                  <td className="p-3">
                    <button
                      className="px-4 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded transition"
                      onClick={() => openModal(rule)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-orange-600">
              Update Points for "{selectedRule ? formatRuleName(selectedRule) : ''}"
            </h3>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={newPoints}
              onChange={(e) => setNewPoints(e.target.value)}
              disabled={loading}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={closeModal}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RulesManager;