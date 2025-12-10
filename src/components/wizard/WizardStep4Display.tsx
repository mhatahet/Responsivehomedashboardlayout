import { Palette, Eye, Share2 } from 'lucide-react';
import { WidgetConfig } from '../WidgetWizard';

interface WizardStep4Props {
  config: WidgetConfig;
  setConfig: (config: WidgetConfig) => void;
}

const colorPresets = [
  { id: '#2563eb', label: 'Blue', color: 'bg-blue-600' },
  { id: '#7c3aed', label: 'Purple', color: 'bg-purple-600' },
  { id: '#059669', label: 'Green', color: 'bg-emerald-600' },
  { id: '#dc2626', label: 'Red', color: 'bg-red-600' },
  { id: '#ea580c', label: 'Orange', color: 'bg-orange-600' },
  { id: '#0891b2', label: 'Cyan', color: 'bg-cyan-600' },
  { id: '#db2777', label: 'Pink', color: 'bg-pink-600' },
  { id: '#65a30d', label: 'Lime', color: 'bg-lime-600' },
];

export function WizardStep4Display({ config, setConfig }: WizardStep4Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-neutral-900 mb-2">Customize Widget Appearance</h3>
        <p className="text-neutral-500 text-sm mb-6">
          Personalize how your widget appears on the dashboard
        </p>
      </div>

      {/* Widget Title */}
      <div>
        <label className="block text-neutral-700 mb-2">
          Widget Title <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-neutral-500 mb-3">
          Give your widget a descriptive name that will appear on the dashboard
        </p>
        <input
          type="text"
          value={config.title}
          onChange={(e) => setConfig({ ...config, title: e.target.value })}
          placeholder="e.g., Return Sales Percentage - Q4 2024"
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {config.title && (
          <p className="text-xs text-neutral-400 mt-2">
            Preview: <span className="text-neutral-700">{config.title}</span>
          </p>
        )}
      </div>

      {/* Color Accent */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-neutral-600" />
          <label className="text-neutral-700">Color Accent</label>
        </div>
        <p className="text-sm text-neutral-500 mb-3">
          Choose a color theme for your widget to help categorize or highlight important data
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {colorPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setConfig({ ...config, colorAccent: preset.id })}
              className={`group relative aspect-square rounded-lg transition-all ${
                config.colorAccent === preset.id
                  ? 'ring-2 ring-offset-2 ring-blue-600 scale-110'
                  : 'hover:scale-105'
              }`}
            >
              <div className={`w-full h-full rounded-lg ${preset.color}`}></div>
              {config.colorAccent === preset.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {preset.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Display Options */}
      <div className="pt-4 border-t border-neutral-200">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-neutral-600" />
          <label className="text-neutral-700">Display Options</label>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-4 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
            <input
              type="checkbox"
              checked={config.showInDashboard}
              onChange={(e) => setConfig({ ...config, showInDashboard: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex-1">
              <p className="text-neutral-900 mb-1">Show in Dashboard</p>
              <p className="text-sm text-neutral-500">
                Display this widget on your main dashboard immediately after creation
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Sharing Options */}
      <div className="pt-4 border-t border-neutral-200">
        <div className="flex items-center gap-2 mb-4">
          <Share2 className="w-4 h-4 text-neutral-600" />
          <label className="text-neutral-700">Sharing Settings</label>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-4 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
            <input
              type="checkbox"
              checked={config.shareWithTeam}
              onChange={(e) => setConfig({ ...config, shareWithTeam: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex-1">
              <p className="text-neutral-900 mb-1">Share with Team</p>
              <p className="text-sm text-neutral-500">
                Make this widget visible to other team members on their dashboards
              </p>
            </div>
          </label>
          
          {config.shareWithTeam && (
            <div className="ml-7 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                This widget will be available in the team widget library for others to add to their dashboards.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
