import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { WizardStep1DataSource } from './wizard/WizardStep1DataSource';
import { WizardStep2Visualization } from './wizard/WizardStep2Visualization';
import { WizardStep3Filters } from './wizard/WizardStep3Filters';
import { WizardStep4Display } from './wizard/WizardStep4Display';
import { WizardSummary } from './wizard/WizardSummary';

interface WidgetWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (config: WidgetConfig) => void;
}

export interface WidgetConfig {
  // Step 1
  dataSource: string;
  metric: string;
  
  // Step 2
  visualizationType: string;
  
  // Step 3
  filters: {
    representatives: string[];
    clients: string[];
    productBrand: string[];
    region: string[];
    dateRange: string;
  };
  groupBy: string;
  
  // Step 4
  title: string;
  colorAccent: string;
  shareWithTeam: boolean;
  showInDashboard: boolean;
}

const steps = [
  { id: 1, title: 'Data Source', description: 'Select metric' },
  { id: 2, title: 'Visualization', description: 'Choose chart type' },
  { id: 3, title: 'Filters', description: 'Refine data' },
  { id: 4, title: 'Display', description: 'Customize appearance' },
  { id: 5, title: 'Review', description: 'Confirm settings' },
];

export function WidgetWizard({ isOpen, onClose, onComplete }: WidgetWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<WidgetConfig>({
    dataSource: '',
    metric: '',
    visualizationType: '',
    filters: {
      representatives: [],
      clients: [],
      productBrand: [],
      region: [],
      dateRange: 'all',
    },
    groupBy: 'none',
    title: '',
    colorAccent: '#2563eb',
    shareWithTeam: false,
    showInDashboard: true,
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(config);
    }
    onClose();
    // Reset wizard
    setCurrentStep(1);
    setConfig({
      dataSource: '',
      metric: '',
      visualizationType: '',
      filters: {
        representatives: [],
        clients: [],
        productBrand: [],
        region: [],
        dateRange: 'all',
      },
      groupBy: 'none',
      title: '',
      colorAccent: '#2563eb',
      shareWithTeam: false,
      showInDashboard: true,
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return config.dataSource && config.metric;
      case 2:
        return config.visualizationType;
      case 3:
        return true; // Filters are optional
      case 4:
        return config.title;
      case 5:
        return true; // Summary step
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-neutral-900">Create New Widget</h2>
              <p className="text-neutral-500 mt-1">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      currentStep > step.id
                        ? 'bg-green-600 text-white'
                        : currentStep === step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <p className={`text-sm ${currentStep >= step.id ? 'text-neutral-900' : 'text-neutral-500'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-neutral-400 hidden sm:block">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-colors ${
                      currentStep > step.id ? 'bg-green-600' : 'bg-neutral-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 1 && (
            <WizardStep1DataSource config={config} setConfig={setConfig} />
          )}
          {currentStep === 2 && (
            <WizardStep2Visualization config={config} setConfig={setConfig} />
          )}
          {currentStep === 3 && (
            <WizardStep3Filters config={config} setConfig={setConfig} />
          )}
          {currentStep === 4 && (
            <WizardStep4Display config={config} setConfig={setConfig} />
          )}
          {currentStep === 5 && (
            <WizardSummary config={config} />
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 text-neutral-700 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-sm text-neutral-500">
            {currentStep === 5 ? 'Review your configuration' : `${currentStep} of ${steps.length - 1} steps completed`}
          </div>

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              Create Widget
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
