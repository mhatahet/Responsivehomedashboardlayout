import { LucideIcon, TrendingUp, TrendingDown, RefreshCw, Download, Info, Loader2, Filter } from 'lucide-react';
import { DateRangePreset } from './DateRangeSelector';
import { useState, useRef, useEffect } from 'react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  dateRange: DateRangePreset;
  customStartDate?: string;
  customEndDate?: string;
}

export function KPICard({ title, value, change, trend, icon: Icon, dateRange, customStartDate, customEndDate }: KPICardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setShowInfo(false);
      }
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTimeAgo = () => {
    const seconds = Math.floor((new Date().getTime() - lastUpdated.getTime()) / 1000);
    if (seconds < 60) return 'Updated a few seconds ago';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Updated ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Updated ${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `Updated ${days} day${days > 1 ? 's' : ''} ago`;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    setLastUpdated(new Date());
  };

  const handleExportCSV = () => {
    const csvContent = `Metric,Value,Change,Trend\n${title},${value},${change},${trend}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const getDateRangeLabel = () => {
    if (dateRange === 'custom' && customStartDate && customEndDate) {
      const start = new Date(customStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const end = new Date(customEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `${start} - ${end}`;
    }
    switch (dateRange) {
      case 'today': return 'Today';
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'year': return 'This Year';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-200 relative">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm">{change}</span>
          </div>
          
          {/* Action buttons - always visible with background */}
          <div className="flex items-center gap-1 bg-neutral-50 rounded-lg p-1 border border-neutral-100 shadow-sm">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-1.5 hover:bg-white rounded-md transition-colors disabled:opacity-50"
              title="Refresh data"
            >
              {isRefreshing ? (
                <Loader2 className="w-4 h-4 text-neutral-600 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 text-neutral-600" />
              )}
            </button>
            
            <div className="relative" ref={filterMenuRef}>
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="p-1.5 hover:bg-white rounded-md transition-colors"
                title="Filter data"
              >
                <Filter className="w-4 h-4 text-neutral-600" />
              </button>
              
              {showFilterMenu && (
                <div className="absolute top-full right-0 mt-1 w-44 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => setShowFilterMenu(false)}
                    className="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors rounded-t-lg"
                  >
                    All Values
                  </button>
                  <button
                    onClick={() => setShowFilterMenu(false)}
                    className="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    Above Average
                  </button>
                  <button
                    onClick={() => setShowFilterMenu(false)}
                    className="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors rounded-b-lg"
                  >
                    Below Average
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative" ref={exportMenuRef}>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="p-1.5 hover:bg-white rounded-md transition-colors"
                title="Export data"
              >
                <Download className="w-4 h-4 text-neutral-600" />
              </button>
              
              {showExportMenu && (
                <div className="absolute top-full right-0 mt-1 w-36 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleExportCSV}
                    className="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors rounded-lg"
                  >
                    Export as CSV
                  </button>
                </div>
              )}
            </div>

            <div className="relative" ref={infoRef}>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-1.5 hover:bg-white rounded-md transition-colors"
                title="Information"
              >
                <Info className="w-4 h-4 text-neutral-600" />
              </button>
              
              {showInfo && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 p-3">
                  <p className="text-xs text-neutral-600">{getTimeAgo()}</p>
                  <p className="text-xs text-neutral-400 mt-1">Last refreshed: {lastUpdated.toLocaleTimeString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-neutral-500 mb-1">{title}</p>
        <p className="text-neutral-900 mb-2">{value}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-neutral-400">{getDateRangeLabel()}</p>
          <p className="text-xs text-neutral-400">{getTimeAgo()}</p>
        </div>
      </div>
    </div>
  );
}