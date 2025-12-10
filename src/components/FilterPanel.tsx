import { X, Calendar } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterPanel({ isOpen, onClose }: FilterPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed lg:absolute right-0 top-0 h-full w-80 bg-white border-l border-neutral-200 shadow-lg z-50 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
        <h3 className="text-neutral-900">Filters</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-neutral-100 rounded transition-colors"
        >
          <X className="w-5 h-5 text-neutral-500" />
        </button>
      </div>

      {/* Filter Content */}
      <div className="p-6 space-y-6">
        {/* Date Range */}
        <div>
          <label className="block text-neutral-700 mb-2">Date Range</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <select className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 12 months</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>

        {/* Region */}
        <div>
          <label className="block text-neutral-700 mb-2">Region</label>
          <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Regions</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Asia Pacific</option>
            <option>Latin America</option>
          </select>
        </div>

        {/* Sales Rep */}
        <div>
          <label className="block text-neutral-700 mb-2">Sales Rep</label>
          <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Reps</option>
            <option>John Smith</option>
            <option>Sarah Johnson</option>
            <option>Michael Chen</option>
            <option>Emma Davis</option>
          </select>
        </div>

        {/* Client Status */}
        <div>
          <label className="block text-neutral-700 mb-3">Client Status</label>
          <div className="space-y-2">
            {['Active', 'Inactive', 'Pending', 'Churned'].map((status) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={status === 'Active'}
                  className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-neutral-700">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Deal Size */}
        <div>
          <label className="block text-neutral-700 mb-2">Deal Size</label>
          <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Sizes</option>
            <option>Small ($0 - $10k)</option>
            <option>Medium ($10k - $50k)</option>
            <option>Large ($50k+)</option>
          </select>
        </div>

        {/* Actions */}
        <div className="pt-4 flex gap-3">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Apply Filters
          </button>
          <button className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
