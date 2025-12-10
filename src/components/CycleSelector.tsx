import { useState, useRef, useEffect } from 'react';
import { BarChart3, ChevronDown } from 'lucide-react';

export type CycleType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface CycleSelectorProps {
  selectedCycle: CycleType;
  onCycleChange: (cycle: CycleType) => void;
}

export function CycleSelector({ selectedCycle, onCycleChange }: CycleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cycles = [
    { id: 'daily' as const, label: 'Daily' },
    { id: 'weekly' as const, label: 'Weekly' },
    { id: 'monthly' as const, label: 'Monthly' },
    { id: 'yearly' as const, label: 'Yearly' },
  ];

  const getDisplayLabel = () => {
    return cycles.find(c => c.id === selectedCycle)?.label || 'Select Cycle';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCycleClick = (cycle: CycleType) => {
    onCycleChange(cycle);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
      >
        <BarChart3 className="w-4 h-4 text-neutral-600" />
        <span className="text-neutral-700">{getDisplayLabel()}</span>
        <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
          <div className="p-2">
            {cycles.map(cycle => (
              <button
                key={cycle.id}
                onClick={() => handleCycleClick(cycle.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedCycle === cycle.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {cycle.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
