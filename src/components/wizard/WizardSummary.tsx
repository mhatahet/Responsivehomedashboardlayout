import { Check, Database, BarChart2, Filter, Palette } from 'lucide-react';
import { WidgetConfig } from '../WidgetWizard';

interface WizardSummaryProps {
  config: WidgetConfig;
}

export function WizardSummary({ config }: WizardSummaryProps) {
  const getDataSourceLabel = (id: string) => {
    const sources: Record<string, string> = {
      sales: 'Sales Data',
      clients: 'Client Data',
      products: 'Product Data',
      performance: 'Team Performance',
    };
    return sources[id] || id;
  };

  const getMetricLabel = (id: string) => {
    const metrics: Record<string, string> = {
      total_revenue: 'Total Revenue',
      avg_order_value: 'Average Order Value',
      return_percentage: 'Return Sales Percentage',
      conversion_rate: 'Conversion Rate',
      sales_growth: 'Sales Growth',
      total_clients: 'Total Clients',
      new_clients: 'New Clients',
      client_retention: 'Client Retention Rate',
      lifetime_value: 'Customer Lifetime Value',
      churn_rate: 'Churn Rate',
      units_sold: 'Units Sold',
      inventory_level: 'Inventory Level',
      product_performance: 'Product Performance',
      stock_turnover: 'Stock Turnover Rate',
      team_quota: 'Team Quota Attainment',
      avg_deal_size: 'Average Deal Size',
      activities_completed: 'Activities Completed',
      response_time: 'Average Response Time',
    };
    return metrics[id] || id;
  };

  const getVisualizationLabel = (id: string) => {
    const visualizations: Record<string, string> = {
      number: 'Number Card',
      bar: 'Bar Chart',
      line: 'Line Chart',
      pie: 'Pie Chart',
      table: 'Table',
      gauge: 'Gauge Chart',
      funnel: 'Funnel Chart',
      map: 'Geographic Map',
    };
    return visualizations[id] || id;
  };

  const getGroupByLabel = (id: string) => {
    const groupings: Record<string, string> = {
      none: 'No Grouping',
      rep: 'Sales Representative',
      client: 'Client',
      region: 'Region',
      product: 'Product Brand',
      time: 'Time Period',
    };
    return groupings[id] || id;
  };

  const hasActiveFilters = 
    config.filters.representatives.length > 0 ||
    config.filters.clients.length > 0 ||
    config.filters.productBrand.length > 0 ||
    config.filters.region.length > 0;

  return (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b border-neutral-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-neutral-900 mb-2">Review Your Widget Configuration</h3>
        <p className="text-neutral-500">
          Please review the details below before creating your widget
        </p>
      </div>

      <div className="space-y-6">
        {/* Data Source & Metric */}
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-5 h-5 text-blue-600" />
            <h4 className="text-neutral-900">Data Source & Metric</h4>
          </div>
          <div className="space-y-2 ml-7">
            <div className="flex justify-between">
              <span className="text-neutral-600">Source:</span>
              <span className="text-neutral-900">{getDataSourceLabel(config.dataSource)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Metric:</span>
              <span className="text-neutral-900">{getMetricLabel(config.metric)}</span>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="w-5 h-5 text-blue-600" />
            <h4 className="text-neutral-900">Visualization</h4>
          </div>
          <div className="ml-7">
            <span className="text-neutral-900">{getVisualizationLabel(config.visualizationType)}</span>
          </div>
        </div>

        {/* Filters & Grouping */}
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-blue-600" />
            <h4 className="text-neutral-900">Filters & Grouping</h4>
          </div>
          <div className="space-y-3 ml-7">
            {config.filters.representatives.length > 0 && (
              <div>
                <span className="text-neutral-600 text-sm">Representatives:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {config.filters.representatives.map((rep) => (
                    <span key={rep} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {rep}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {config.filters.clients.length > 0 && (
              <div>
                <span className="text-neutral-600 text-sm">Clients:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {config.filters.clients.map((client) => (
                    <span key={client} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {config.filters.productBrand.length > 0 && (
              <div>
                <span className="text-neutral-600 text-sm">Product Brands:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {config.filters.productBrand.map((brand) => (
                    <span key={brand} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {config.filters.region.length > 0 && (
              <div>
                <span className="text-neutral-600 text-sm">Regions:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {config.filters.region.map((region) => (
                    <span key={region} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {!hasActiveFilters && (
              <p className="text-neutral-500 text-sm">No filters applied</p>
            )}
            <div className="flex justify-between pt-2 border-t border-neutral-200">
              <span className="text-neutral-600">Group By:</span>
              <span className="text-neutral-900">{getGroupByLabel(config.groupBy)}</span>
            </div>
          </div>
        </div>

        {/* Display Options */}
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-5 h-5 text-blue-600" />
            <h4 className="text-neutral-900">Display Options</h4>
          </div>
          <div className="space-y-2 ml-7">
            <div className="flex justify-between">
              <span className="text-neutral-600">Title:</span>
              <span className="text-neutral-900">{config.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Color Accent:</span>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border border-neutral-200"
                  style={{ backgroundColor: config.colorAccent }}
                ></div>
                <span className="text-neutral-900">{config.colorAccent}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Show in Dashboard:</span>
              <span className="text-neutral-900">{config.showInDashboard ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Share with Team:</span>
              <span className="text-neutral-900">{config.shareWithTeam ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-medium">Ready to create!</span> Click "Create Widget" below to add this widget to your dashboard.
        </p>
      </div>
    </div>
  );
}
