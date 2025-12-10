import { useState } from 'react';
import { Filter, Info } from 'lucide-react';
import { WidgetConfig } from '../WidgetWizard';

interface WizardStep3Props {
  config: WidgetConfig;
  setConfig: (config: WidgetConfig) => void;
}

const representatives = [
  'John Smith',
  'Sarah Johnson',
  'Michael Chen',
  'Emma Davis',
  'David Wilson',
  'Lisa Anderson',
];

const clients = [
  'Acme Corporation',
  'TechStart Inc',
  'Global Solutions',
  'Premier Industries',
  'Innovation Labs',
  'Enterprise Group',
];

const productBrands = [
  'Premium Line',
  'Standard Series',
  'Economy Range',
  'Professional Suite',
  'Enterprise Edition',
];

const regions = [
  'North America',
  'Europe',
  'Asia Pacific',
  'Latin America',
  'Middle East',
];

const groupByOptions = [
  { id: 'none', label: 'No Grouping', description: 'Show data in aggregate' },
  { id: 'rep', label: 'Sales Representative', description: 'Group by individual sales reps' },
  { id: 'client', label: 'Client', description: 'Group by customer accounts' },
  { id: 'region', label: 'Region', description: 'Group by geographic region' },
  { id: 'product', label: 'Product Brand', description: 'Group by product line' },
  { id: 'time', label: 'Time Period', description: 'Group by date/time intervals' },
];

export function WizardStep3Filters({ config, setConfig }: WizardStep3Props) {
  const handleFilterToggle = (filterType: keyof typeof config.filters, value: string) => {
    const currentFilters = config.filters[filterType] as string[];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(v => v !== value)
      : [...currentFilters, value];
    
    setConfig({
      ...config,
      filters: {
        ...config.filters,
        [filterType]: newFilters,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start gap-2 mb-4">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-neutral-900 mb-1">Refine Your Data</h3>
            <p className="text-neutral-500 text-sm">
              Apply filters to narrow down the data shown in your widget. All filters are optional.
            </p>
          </div>
        </div>
      </div>

      {/* Representatives Filter */}
      <div>
        <label className="block text-neutral-700 mb-3">
          Sales Representatives
          <span className="text-neutral-400 text-sm ml-2">
            ({config.filters.representatives.length} selected)
          </span>
        </label>
        <p className="text-sm text-neutral-500 mb-3">Filter data by specific sales team members</p>
        <div className="grid grid-cols-2 gap-2">
          {representatives.map((rep) => (
            <label
              key={rep}
              className="flex items-center gap-2 p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={config.filters.representatives.includes(rep)}
                onChange={() => handleFilterToggle('representatives', rep)}
                className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-neutral-700">{rep}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clients Filter */}
      <div>
        <label className="block text-neutral-700 mb-3">
          Clients
          <span className="text-neutral-400 text-sm ml-2">
            ({config.filters.clients.length} selected)
          </span>
        </label>
        <p className="text-sm text-neutral-500 mb-3">Include only specific client accounts</p>
        <div className="grid grid-cols-2 gap-2">
          {clients.map((client) => (
            <label
              key={client}
              className="flex items-center gap-2 p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={config.filters.clients.includes(client)}
                onChange={() => handleFilterToggle('clients', client)}
                className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-neutral-700">{client}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Product Brand Filter */}
      <div>
        <label className="block text-neutral-700 mb-3">
          Product Brands
          <span className="text-neutral-400 text-sm ml-2">
            ({config.filters.productBrand.length} selected)
          </span>
        </label>
        <p className="text-sm text-neutral-500 mb-3">Filter by product line or brand</p>
        <div className="grid grid-cols-2 gap-2">
          {productBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={config.filters.productBrand.includes(brand)}
                onChange={() => handleFilterToggle('productBrand', brand)}
                className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-neutral-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Region Filter */}
      <div>
        <label className="block text-neutral-700 mb-3">
          Regions
          <span className="text-neutral-400 text-sm ml-2">
            ({config.filters.region.length} selected)
          </span>
        </label>
        <p className="text-sm text-neutral-500 mb-3">Limit data to specific geographic regions</p>
        <div className="grid grid-cols-2 gap-2">
          {regions.map((region) => (
            <label
              key={region}
              className="flex items-center gap-2 p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={config.filters.region.includes(region)}
                onChange={() => handleFilterToggle('region', region)}
                className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-neutral-700">{region}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Group By */}
      <div className="pt-4 border-t border-neutral-200">
        <label className="block text-neutral-700 mb-3">Group Data By</label>
        <p className="text-sm text-neutral-500 mb-3">
          Choose how to organize and segment your data for better insights
        </p>
        <div className="space-y-2">
          {groupByOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setConfig({ ...config, groupBy: option.id });
              }}
              className={`w-full p-3 border-2 rounded-lg text-left transition-all ${
                config.groupBy === option.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`mb-1 ${
                    config.groupBy === option.id ? 'text-blue-900' : 'text-neutral-900'
                  }`}>
                    {option.label}
                  </p>
                  <p className="text-sm text-neutral-500">{option.description}</p>
                </div>
                {config.groupBy === option.id && (
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
