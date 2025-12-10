import { WidgetConfig } from '../WidgetWizard';
import { WidgetPreview } from '../WidgetPreview';

interface WizardStep2Props {
  config: WidgetConfig;
  setConfig: (config: WidgetConfig) => void;
}

const visualizationTypes = [
  {
    id: 'number',
    label: 'Number Card',
    description: 'Display a single key metric with optional trend indicator',
    bestFor: 'KPIs and summary statistics',
    previewType: 'number' as const,
  },
  {
    id: 'bar',
    label: 'Bar Chart',
    description: 'Compare values across categories or time periods',
    bestFor: 'Categorical comparisons and rankings',
    previewType: 'bar' as const,
  },
  {
    id: 'line',
    label: 'Line Chart',
    description: 'Show trends and changes over time',
    bestFor: 'Time series data and trend analysis',
    previewType: 'line' as const,
  },
  {
    id: 'pie',
    label: 'Pie Chart',
    description: 'Show proportions and percentage breakdown',
    bestFor: 'Part-to-whole relationships',
    previewType: 'pie' as const,
  },
  {
    id: 'table',
    label: 'Table',
    description: 'Display detailed data in rows and columns',
    bestFor: 'Detailed listings and multiple metrics',
    previewType: 'table' as const,
  },
  {
    id: 'gauge',
    label: 'Gauge Chart',
    description: 'Show progress toward a goal or target',
    bestFor: 'Progress tracking and goal achievement',
    previewType: 'gauge' as const,
  },
  {
    id: 'funnel',
    label: 'Funnel Chart',
    description: 'Visualize stages in a process or conversion flow',
    bestFor: 'Sales pipelines and conversion tracking',
    previewType: 'funnel' as const,
  },
  {
    id: 'map',
    label: 'Geographic Map',
    description: 'Show data distribution across locations',
    bestFor: 'Location-based data and regional analysis',
    previewType: 'map' as const,
  },
];

export function WizardStep2Visualization({ config, setConfig }: WizardStep2Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-neutral-900 mb-2">Choose Visualization Type</h3>
        <p className="text-neutral-500 text-sm mb-6">
          Select how you want to display your data. Each type is optimized for different use cases.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visualizationTypes.map((viz) => (
            <button
              key={viz.id}
              onClick={() => {
                setConfig({ ...config, visualizationType: viz.id });
              }}
              className={`p-4 border-2 rounded-xl text-left transition-all ${
                config.visualizationType === viz.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              {/* Preview */}
              <div className={`h-24 rounded-lg mb-3 flex items-center justify-center ${
                config.visualizationType === viz.id ? 'bg-white' : 'bg-neutral-50'
              }`}>
                <WidgetPreview type={viz.previewType} />
              </div>

              {/* Content */}
              <div className="flex items-start justify-between mb-2">
                <p className={`${
                  config.visualizationType === viz.id ? 'text-blue-900' : 'text-neutral-900'
                }`}>
                  {viz.label}
                </p>
                {config.visualizationType === viz.id && (
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <p className="text-sm text-neutral-500 mb-2">{viz.description}</p>
              <p className="text-xs text-neutral-400">
                <span className="text-neutral-600">Best for:</span> {viz.bestFor}
              </p>
            </button>
          ))}
        </div>
      </div>

      {config.visualizationType && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <span className="font-medium">Tip:</span> {
              visualizationTypes.find(v => v.id === config.visualizationType)?.description
            }
          </p>
        </div>
      )}
    </div>
  );
}
