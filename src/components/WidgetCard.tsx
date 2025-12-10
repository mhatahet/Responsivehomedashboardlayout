import { Plus, Settings } from 'lucide-react';
import { WidgetPreview } from './WidgetPreview';

interface Widget {
  id: string;
  name: string;
  description: string;
  category: string;
  dataType: string;
  popularity: number;
  previewType: 'number' | 'bar' | 'line' | 'pie' | 'table' | 'map' | 'funnel' | 'gauge';
}

interface WidgetCardProps {
  widget: Widget;
  onConfigure?: () => void;
}

export function WidgetCard({ widget, onConfigure }: WidgetCardProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 transition-all group">
      {/* Preview */}
      <div className="bg-neutral-50 rounded-lg p-6 mb-4 flex items-center justify-center h-32">
        <WidgetPreview type={widget.previewType} />
      </div>

      {/* Content */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-neutral-900">{widget.name}</h4>
          <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
            {widget.dataType}
          </span>
        </div>
        <p className="text-neutral-600 text-sm leading-relaxed">{widget.description}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-neutral-500">
            {widget.popularity}% use this
          </span>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={onConfigure}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Configure</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}