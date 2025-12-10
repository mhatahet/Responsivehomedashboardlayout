import { useState } from 'react';
import { X, LayoutDashboard } from 'lucide-react';

interface AddDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDashboard: (name: string) => void;
}

const dashboardTemplates = [
  { id: 'blank', name: 'Blank Dashboard', description: 'Start from scratch with an empty dashboard' },
  { id: 'sales', name: 'Sales Dashboard', description: 'Pre-configured with sales metrics and charts' },
  { id: 'client', name: 'Client Dashboard', description: 'Track client relationships and engagement' },
  { id: 'rep', name: 'Rep Performance', description: 'Monitor individual sales rep performance' },
];

export function AddDashboardModal({ isOpen, onClose, onAddDashboard }: AddDashboardModalProps) {
  const [dashboardName, setDashboardName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('blank');

  if (!isOpen) return null;

  const handleAdd = () => {
    if (dashboardName.trim()) {
      onAddDashboard(dashboardName.trim());
      setDashboardName('');
      setSelectedTemplate('blank');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div>
            <h2 className="text-neutral-900">Create New Dashboard</h2>
            <p className="text-neutral-500 mt-1">Add a new dashboard to organize your data</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Dashboard Name */}
          <div>
            <label className="block text-neutral-700 mb-2">
              Dashboard Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              placeholder="e.g., Q4 Sales Overview"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-neutral-700 mb-3">Choose Template</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dashboardTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 border-2 rounded-xl text-left transition-all ${
                    selectedTemplate === template.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedTemplate === template.id ? 'bg-blue-100' : 'bg-neutral-100'
                    }`}>
                      <LayoutDashboard className={`w-5 h-5 ${
                        selectedTemplate === template.id ? 'text-blue-600' : 'text-neutral-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className={`mb-1 ${
                        selectedTemplate === template.id ? 'text-blue-900' : 'text-neutral-900'
                      }`}>
                        {template.name}
                      </p>
                      <p className="text-sm text-neutral-500">{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-neutral-700 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!dashboardName.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}