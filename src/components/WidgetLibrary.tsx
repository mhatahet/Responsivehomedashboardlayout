import { useState } from 'react';
import { X, Search, TrendingUp, SortAsc } from 'lucide-react';
import { WidgetCard } from './WidgetCard';

interface Widget {
  id: string;
  name: string;
  description: string;
  category: string;
  dataType: string;
  popularity: number;
  previewType: 'number' | 'bar' | 'line' | 'pie' | 'table' | 'map' | 'funnel' | 'gauge';
}

interface WidgetLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWizard?: () => void;
}

const categories = [
  { id: 'all', label: 'All Widgets' },
  { id: 'kpis', label: 'KPIs' },
  { id: 'clients', label: 'Clients' },
  { id: 'sales', label: 'Sales' },
  { id: 'visits', label: 'Visits' },
  { id: 'performance', label: 'Performance' },
  { id: 'analytics', label: 'Analytics' },
];

const widgets: Widget[] = [
  // KPIs
  { id: '1', name: 'Total Revenue', description: 'Display total revenue across all sales channels', category: 'kpis', dataType: 'Number Card', popularity: 95, previewType: 'number' },
  { id: '2', name: 'Conversion Rate', description: 'Track lead-to-customer conversion percentage', category: 'kpis', dataType: 'Number Card', popularity: 88, previewType: 'gauge' },
  { id: '3', name: 'Active Deals', description: 'Count of currently active sales opportunities', category: 'kpis', dataType: 'Number Card', popularity: 82, previewType: 'number' },
  { id: '4', name: 'Customer Satisfaction', description: 'Average satisfaction score from recent surveys', category: 'kpis', dataType: 'Gauge Chart', popularity: 76, previewType: 'gauge' },
  
  // Clients
  { id: '5', name: 'Client List', description: 'Comprehensive table of all active clients', category: 'clients', dataType: 'Table', popularity: 91, previewType: 'table' },
  { id: '6', name: 'New Clients Trend', description: 'Line chart showing client acquisition over time', category: 'clients', dataType: 'Line Chart', popularity: 85, previewType: 'line' },
  { id: '7', name: 'Client Distribution', description: 'Geographic distribution of your client base', category: 'clients', dataType: 'Map', popularity: 72, previewType: 'map' },
  { id: '8', name: 'Client Segments', description: 'Breakdown of clients by industry or size', category: 'clients', dataType: 'Pie Chart', popularity: 78, previewType: 'pie' },
  { id: '9', name: 'Top Clients', description: 'List of highest value clients by revenue', category: 'clients', dataType: 'Bar Chart', popularity: 84, previewType: 'bar' },
  
  // Sales
  { id: '10', name: 'Sales Pipeline', description: 'Visual funnel of deals through sales stages', category: 'sales', dataType: 'Funnel Chart', popularity: 93, previewType: 'funnel' },
  { id: '11', name: 'Monthly Sales', description: 'Bar chart comparing sales across months', category: 'sales', dataType: 'Bar Chart', popularity: 89, previewType: 'bar' },
  { id: '12', name: 'Sales by Rep', description: 'Performance comparison across sales team', category: 'sales', dataType: 'Bar Chart', popularity: 87, previewType: 'bar' },
  { id: '13', name: 'Deal Forecast', description: 'Projected revenue based on pipeline data', category: 'sales', dataType: 'Line Chart', popularity: 81, previewType: 'line' },
  { id: '14', name: 'Win Rate', description: 'Percentage of deals won vs lost', category: 'sales', dataType: 'Number Card', popularity: 80, previewType: 'number' },
  
  // Visits
  { id: '15', name: 'Visit Schedule', description: 'Calendar view of upcoming client visits', category: 'visits', dataType: 'Table', popularity: 77, previewType: 'table' },
  { id: '16', name: 'Visits This Month', description: 'Total number of completed field visits', category: 'visits', dataType: 'Number Card', popularity: 75, previewType: 'number' },
  { id: '17', name: 'Visit Locations', description: 'Map showing all visit locations', category: 'visits', dataType: 'Map', popularity: 70, previewType: 'map' },
  { id: '18', name: 'Visit Trends', description: 'Track visit frequency over time', category: 'visits', dataType: 'Line Chart', popularity: 68, previewType: 'line' },
  
  // Performance
  { id: '19', name: 'Team Performance', description: 'Compare metrics across team members', category: 'performance', dataType: 'Table', popularity: 86, previewType: 'table' },
  { id: '20', name: 'Target vs Actual', description: 'Track performance against sales targets', category: 'performance', dataType: 'Line Chart', popularity: 90, previewType: 'line' },
  { id: '21', name: 'Activity Breakdown', description: 'Distribution of activities by type', category: 'performance', dataType: 'Pie Chart', popularity: 73, previewType: 'pie' },
  
  // Analytics
  { id: '22', name: 'Revenue Analytics', description: 'Deep dive into revenue sources and trends', category: 'analytics', dataType: 'Line Chart', popularity: 83, previewType: 'line' },
  { id: '23', name: 'Customer Lifetime Value', description: 'Average value per customer over time', category: 'analytics', dataType: 'Number Card', popularity: 79, previewType: 'number' },
  { id: '24', name: 'Churn Analysis', description: 'Track and analyze customer churn rates', category: 'analytics', dataType: 'Bar Chart', popularity: 74, previewType: 'bar' },
];

export function WidgetLibrary({ isOpen, onClose, onOpenWizard }: WidgetLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'module'>('popularity');

  if (!isOpen) return null;

  // Filter widgets based on category and search
  let filteredWidgets = widgets.filter(widget => {
    const matchesCategory = selectedCategory === 'all' || widget.category === selectedCategory;
    const matchesSearch = widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         widget.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         widget.dataType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort widgets
  if (sortBy === 'popularity') {
    filteredWidgets.sort((a, b) => b.popularity - a.popularity);
  } else {
    filteredWidgets.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <h2 className="text-neutral-900">Widget Library</h2>
            <p className="text-neutral-500 mt-1">Add widgets to customize your dashboard</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* Search and Sort Bar */}
        <div className="px-6 py-4 border-b border-neutral-200 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search widgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('popularity')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                sortBy === 'popularity'
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Popularity</span>
            </button>
            <button
              onClick={() => setSortBy('module')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                sortBy === 'module'
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <SortAsc className="w-4 h-4" />
              <span className="hidden sm:inline">Module</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Categories Sidebar */}
          <div className="w-48 border-r border-neutral-200 p-4 overflow-y-auto">
            <p className="text-neutral-500 mb-3 px-3">Categories</p>
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {category.label}
                  <span className="ml-2 text-neutral-400">
                    ({widgets.filter(w => category.id === 'all' ? true : w.category === category.id).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Widget Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredWidgets.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-neutral-500 mb-2">No widgets found</p>
                <p className="text-neutral-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWidgets.map(widget => (
                  <WidgetCard 
                    key={widget.id} 
                    widget={widget} 
                    onConfigure={() => {
                      if (onOpenWizard) {
                        onClose();
                        onOpenWizard();
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}