import { useState } from 'react';
import { FilterPanel } from './components/FilterPanel';
import { KPICard } from './components/KPICard';
import { SalesChart } from './components/SalesChart';
import { ActivitiesChart } from './components/ActivitiesChart';
import { WidgetLibrary } from './components/WidgetLibrary';
import { WidgetWizard } from './components/WidgetWizard';
import { DashboardTabs } from './components/DashboardTabs';
import { AddDashboardModal } from './components/AddDashboardModal';
import { DateRangeSelector, DateRangePreset } from './components/DateRangeSelector';
import { CycleSelector, CycleType } from './components/CycleSelector';
import { Users, UserPlus, RefreshCw, Clock, SlidersHorizontal, Plus } from 'lucide-react';

interface Dashboard {
  id: string;
  name: string;
}

export default function App() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [widgetLibraryOpen, setWidgetLibraryOpen] = useState(false);
  const [widgetWizardOpen, setWidgetWizardOpen] = useState(false);
  const [addDashboardOpen, setAddDashboardOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangePreset>('month');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [selectedCycle, setSelectedCycle] = useState<CycleType>('monthly');
  
  const [dashboards, setDashboards] = useState<Dashboard[]>([
    { id: '1', name: 'Sales Dashboard' },
    { id: '2', name: 'Rep DB' },
    { id: '3', name: 'Client Dashboard' },
    { id: '4', name: 'Product Analytics' },
    { id: '5', name: 'Team Performance' },
  ]);
  const [activeDashboardId, setActiveDashboardId] = useState('1');

  const handleAddDashboard = (name: string) => {
    const newDashboard: Dashboard = {
      id: Date.now().toString(),
      name,
    };
    setDashboards([...dashboards, newDashboard]);
    setActiveDashboardId(newDashboard.id);
  };

  const handleRenameDashboard = (id: string, newName: string) => {
    setDashboards(dashboards.map(d => 
      d.id === id ? { ...d, name: newName } : d
    ));
  };

  const handleDeleteDashboard = (id: string) => {
    if (dashboards.length > 1) {
      const newDashboards = dashboards.filter(d => d.id !== id);
      setDashboards(newDashboards);
      if (activeDashboardId === id) {
        setActiveDashboardId(newDashboards[0].id);
      }
    }
  };

  const kpiData = [
    {
      title: 'Active Clients',
      value: '1,284',
      change: '+12.5%',
      trend: 'up' as const,
      icon: Users,
    },
    {
      title: 'Newly Added Clients',
      value: '156',
      change: '+8.2%',
      trend: 'up' as const,
      icon: UserPlus,
    },
    {
      title: 'Total Refunds',
      value: '$12,450',
      change: '-3.1%',
      trend: 'down' as const,
      icon: RefreshCw,
    },
    {
      title: 'Avg Resolve Time',
      value: '4.2h',
      change: '-15.3%',
      trend: 'down' as const,
      icon: Clock,
    },
  ];

  const activeDashboard = dashboards.find(d => d.id === activeDashboardId);

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Tabs */}
        <DashboardTabs
          dashboards={dashboards}
          activeDashboardId={activeDashboardId}
          onDashboardChange={setActiveDashboardId}
          onAddDashboard={() => setAddDashboardOpen(true)}
          onRenameDashboard={handleRenameDashboard}
          onDeleteDashboard={handleDeleteDashboard}
        />

        {/* Header */}
        <header className="bg-white border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-neutral-900">{activeDashboard?.name || 'Dashboard'}</h1>
              <p className="text-neutral-500 mt-1">
                {activeDashboardId === '1' && 'Track your field sales performance'}
                {activeDashboardId === '2' && 'Monitor individual sales representative performance'}
                {activeDashboardId === '3' && 'Track client relationships and engagement'}
                {!['1', '2', '3'].includes(activeDashboardId) && 'Analyze your key business metrics'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setWidgetLibraryOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Widget</span>
              </button>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Area */}
        <div className="flex-1 overflow-auto">
          <div className="flex">
            {/* Dashboard Content */}
            <div className={`flex-1 p-6 transition-all ${filterOpen ? 'mr-80' : ''}`}>
              {/* KPI Cards - Top Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {kpiData.map((kpi, index) => (
                  <KPICard 
                    key={index} 
                    {...kpi} 
                    dateRange={selectedDateRange}
                    customStartDate={customStartDate}
                    customEndDate={customEndDate}
                  />
                ))}
              </div>

              {/* Charts - Second Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Trends Chart - 2 columns */}
                <div className="lg:col-span-2">
                  <SalesChart 
                    dateRange={selectedDateRange}
                    cycle={selectedCycle}
                    customStartDate={customStartDate}
                    customEndDate={customEndDate}
                  />
                </div>

                {/* Top Activities Chart - 1 column */}
                <div className="lg:col-span-1">
                  <ActivitiesChart 
                    dateRange={selectedDateRange}
                    customStartDate={customStartDate}
                    customEndDate={customEndDate}
                  />
                </div>
              </div>
            </div>

            {/* Right Filter Panel */}
            <FilterPanel isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
          </div>
        </div>
      </div>

      {/* Widget Library Modal */}
      <WidgetLibrary 
        isOpen={widgetLibraryOpen} 
        onClose={() => setWidgetLibraryOpen(false)} 
        onOpenWizard={() => setWidgetWizardOpen(true)}
      />
      {/* Widget Wizard Modal */}
      <WidgetWizard 
        isOpen={widgetWizardOpen} 
        onClose={() => setWidgetWizardOpen(false)}
        onComplete={(config) => {
          console.log('Widget created:', config);
          // Here you would add the widget to the dashboard
        }}
      />
      {/* Add Dashboard Modal */}
      <AddDashboardModal 
        isOpen={addDashboardOpen} 
        onClose={() => setAddDashboardOpen(false)}
        onAddDashboard={handleAddDashboard}
      />
    </div>
  );
}