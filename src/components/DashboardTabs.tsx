import { useState, useRef, useEffect } from 'react';
import { Plus, MoreVertical, Edit2, Trash2, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Dashboard {
  id: string;
  name: string;
}

interface DashboardTabsProps {
  dashboards: Dashboard[];
  activeDashboardId: string;
  onDashboardChange: (id: string) => void;
  onAddDashboard: () => void;
  onRenameDashboard: (id: string, newName: string) => void;
  onDeleteDashboard: (id: string) => void;
}

export function DashboardTabs({
  dashboards,
  activeDashboardId,
  onDashboardChange,
  onAddDashboard,
  onRenameDashboard,
  onDeleteDashboard,
}: DashboardTabsProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const activeDashboard = dashboards.find(d => d.id === activeDashboardId);

  // Check if scrolling is needed
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
    }

    return () => {
      window.removeEventListener('resize', checkScroll);
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
    };
  }, [dashboards]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleStartEdit = (dashboard: Dashboard) => {
    setEditingId(dashboard.id);
    setEditValue(dashboard.name);
    setOpenMenuId(null);
  };

  const handleSaveEdit = () => {
    if (editingId && editValue.trim()) {
      onRenameDashboard(editingId, editValue.trim());
      setEditingId(null);
      setEditValue('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleDelete = (id: string) => {
    if (dashboards.length > 1) {
      onDeleteDashboard(id);
      setOpenMenuId(null);
    }
  };

  return (
    <div className="bg-white border-b border-neutral-200">
      {/* Desktop View */}
      <div className="hidden md:flex items-center px-4 gap-2">
        {/* Left Scroll Button */}
        {showLeftScroll && (
          <button
            onClick={() => handleScroll('left')}
            className="flex-shrink-0 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-600" />
          </button>
        )}

        {/* Tabs Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-hide py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              className={`flex-shrink-0 group relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeDashboardId === dashboard.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {editingId === dashboard.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  onBlur={handleSaveEdit}
                  autoFocus
                  className="w-32 px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <>
                  <button
                    onClick={() => onDashboardChange(dashboard.id)}
                    className="whitespace-nowrap"
                  >
                    {dashboard.name}
                  </button>
                  {/* Only show options button for active dashboard */}
                  {activeDashboardId === dashboard.id && (
                    <div className="relative" ref={menuRef}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === dashboard.id ? null : dashboard.id);
                        }}
                        className="p-1 rounded hover:bg-neutral-200 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Kebab Menu */}
                      {openMenuId === dashboard.id && (
                        <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-[100]">
                          <button
                            onClick={() => handleStartEdit(dashboard)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors rounded-t-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span>Rename</span>
                          </button>
                          <button
                            onClick={() => handleDelete(dashboard.id)}
                            disabled={dashboards.length === 1}
                            className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors rounded-b-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {/* Add Dashboard Button */}
          <button
            onClick={onAddDashboard}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-neutral-600 border border-dashed border-neutral-300 rounded-lg hover:bg-neutral-50 hover:border-neutral-400 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="whitespace-nowrap">Add Dashboard</span>
          </button>
        </div>

        {/* Right Scroll Button */}
        {showRightScroll && (
          <button
            onClick={() => handleScroll('right')}
            className="flex-shrink-0 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          </button>
        )}
      </div>

      {/* Mobile View - Dropdown */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-neutral-900 hover:bg-neutral-50 transition-colors"
        >
          <span>{activeDashboard?.name || 'Select Dashboard'}</span>
          <ChevronDown className={`w-5 h-5 text-neutral-500 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-50 max-h-96 overflow-y-auto">
            {dashboards.map((dashboard) => (
              <div key={dashboard.id} className="border-b border-neutral-100 last:border-b-0">
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      onDashboardChange(dashboard.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex-1 text-left px-4 py-3 transition-colors ${
                      activeDashboardId === dashboard.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {dashboard.name}
                  </button>
                  <div className="relative px-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === dashboard.id ? null : dashboard.id);
                      }}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-neutral-600" />
                    </button>

                    {openMenuId === dashboard.id && (
                      <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
                        <button
                          onClick={() => {
                            handleStartEdit(dashboard);
                            setMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors rounded-t-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Rename</span>
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(dashboard.id);
                            setMobileMenuOpen(false);
                          }}
                          disabled={dashboards.length === 1}
                          className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors rounded-b-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Add Dashboard Button - Mobile */}
            <button
              onClick={() => {
                onAddDashboard();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-blue-600 border-t border-neutral-200 hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Dashboard</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}