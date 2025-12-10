import { Database, TrendingUp, Users, Package, DollarSign, Target } from 'lucide-react';
import { WidgetConfig } from '../WidgetWizard';

interface WizardStep1Props {
  config: WidgetConfig;
  setConfig: (config: WidgetConfig) => void;
}

const dataSources = [
  { id: 'sales', label: 'Sales Data', icon: DollarSign, description: 'Revenue and transaction metrics' },
  { id: 'clients', label: 'Client Data', icon: Users, description: 'Customer information and analytics' },
  { id: 'products', label: 'Product Data', icon: Package, description: 'Inventory and product performance' },
  { id: 'performance', label: 'Team Performance', icon: Target, description: 'Employee and team metrics' },
];

const metricsBySource: Record<string, Array<{ id: string; label: string; description: string }>> = {
  sales: [
    { id: 'total_revenue', label: 'Total Revenue', description: 'Sum of all sales transactions' },
    { id: 'avg_order_value', label: 'Average Order Value', description: 'Mean transaction amount' },
    { id: 'return_percentage', label: 'Return Sales Percentage', description: 'Percentage of sales that were returned' },
    { id: 'conversion_rate', label: 'Conversion Rate', description: 'Leads converted to customers' },
    { id: 'sales_growth', label: 'Sales Growth', description: 'Period-over-period growth rate' },
  ],
  clients: [
    { id: 'total_clients', label: 'Total Clients', description: 'Count of all active clients' },
    { id: 'new_clients', label: 'New Clients', description: 'Recently acquired customers' },
    { id: 'client_retention', label: 'Client Retention Rate', description: 'Percentage of retained customers' },
    { id: 'lifetime_value', label: 'Customer Lifetime Value', description: 'Average revenue per customer' },
    { id: 'churn_rate', label: 'Churn Rate', description: 'Rate of customer attrition' },
  ],
  products: [
    { id: 'units_sold', label: 'Units Sold', description: 'Total quantity of products sold' },
    { id: 'inventory_level', label: 'Inventory Level', description: 'Current stock quantities' },
    { id: 'product_performance', label: 'Product Performance', description: 'Sales by product category' },
    { id: 'stock_turnover', label: 'Stock Turnover Rate', description: 'How quickly inventory sells' },
  ],
  performance: [
    { id: 'team_quota', label: 'Team Quota Attainment', description: 'Percentage of sales target achieved' },
    { id: 'avg_deal_size', label: 'Average Deal Size', description: 'Mean value of closed deals' },
    { id: 'activities_completed', label: 'Activities Completed', description: 'Number of completed tasks' },
    { id: 'response_time', label: 'Average Response Time', description: 'Time to respond to leads' },
  ],
};

export function WizardStep1DataSource({ config, setConfig }: WizardStep1Props) {
  const availableMetrics = config.dataSource ? metricsBySource[config.dataSource] : [];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-neutral-900 mb-2">Select Data Source</h3>
        <p className="text-neutral-500 text-sm mb-4">Choose the category of data you want to visualize</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataSources.map((source) => {
            const Icon = source.icon;
            return (
              <button
                key={source.id}
                onClick={() => {
                  setConfig({ ...config, dataSource: source.id, metric: '' });
                }}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  config.dataSource === source.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    config.dataSource === source.id ? 'bg-blue-100' : 'bg-neutral-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      config.dataSource === source.id ? 'text-blue-600' : 'text-neutral-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className={`mb-1 ${
                      config.dataSource === source.id ? 'text-blue-900' : 'text-neutral-900'
                    }`}>
                      {source.label}
                    </p>
                    <p className="text-sm text-neutral-500">{source.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {config.dataSource && (
        <div>
          <h3 className="text-neutral-900 mb-2">Select Metric</h3>
          <p className="text-neutral-500 text-sm mb-4">Choose the specific metric to track</p>
          
          <div className="space-y-2">
            {availableMetrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => {
                  setConfig({ ...config, metric: metric.id });
                }}
                className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                  config.metric === metric.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`mb-1 ${
                      config.metric === metric.id ? 'text-blue-900' : 'text-neutral-900'
                    }`}>
                      {metric.label}
                    </p>
                    <p className="text-sm text-neutral-500">{metric.description}</p>
                  </div>
                  {config.metric === metric.id && (
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
