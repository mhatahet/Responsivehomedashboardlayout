interface WidgetPreviewProps {
  type: 'number' | 'bar' | 'line' | 'pie' | 'table' | 'map' | 'funnel' | 'gauge';
}

export function WidgetPreview({ type }: WidgetPreviewProps) {
  switch (type) {
    case 'number':
      return (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-3xl text-blue-600 mb-1">1,284</div>
          <div className="w-12 h-1 bg-blue-200 rounded"></div>
        </div>
      );

    case 'bar':
      return (
        <div className="flex items-end justify-center gap-2 w-full h-16">
          <div className="w-6 bg-blue-300 rounded-t" style={{ height: '60%' }}></div>
          <div className="w-6 bg-blue-400 rounded-t" style={{ height: '80%' }}></div>
          <div className="w-6 bg-blue-500 rounded-t" style={{ height: '100%' }}></div>
          <div className="w-6 bg-blue-400 rounded-t" style={{ height: '70%' }}></div>
          <div className="w-6 bg-blue-300 rounded-t" style={{ height: '50%' }}></div>
        </div>
      );

    case 'line':
      return (
        <svg className="w-full h-16" viewBox="0 0 100 40" preserveAspectRatio="none">
          <polyline
            points="0,30 20,25 40,15 60,20 80,10 100,12"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="0" cy="30" r="2" fill="#3b82f6" />
          <circle cx="20" cy="25" r="2" fill="#3b82f6" />
          <circle cx="40" cy="15" r="2" fill="#3b82f6" />
          <circle cx="60" cy="20" r="2" fill="#3b82f6" />
          <circle cx="80" cy="10" r="2" fill="#3b82f6" />
          <circle cx="100" cy="12" r="2" fill="#3b82f6" />
        </svg>
      );

    case 'pie':
      return (
        <svg className="w-16 h-16" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="#93c5fd" />
          <path
            d="M 50 50 L 50 10 A 40 40 0 0 1 85.36 64.64 Z"
            fill="#3b82f6"
          />
          <path
            d="M 50 50 L 85.36 64.64 A 40 40 0 0 1 50 90 Z"
            fill="#60a5fa"
          />
        </svg>
      );

    case 'table':
      return (
        <div className="w-full space-y-2">
          <div className="flex gap-2">
            <div className="flex-1 h-3 bg-blue-600 rounded"></div>
            <div className="flex-1 h-3 bg-blue-600 rounded"></div>
            <div className="flex-1 h-3 bg-blue-600 rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-3 bg-blue-200 rounded"></div>
            <div className="flex-1 h-3 bg-blue-200 rounded"></div>
            <div className="flex-1 h-3 bg-blue-200 rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-3 bg-blue-200 rounded"></div>
            <div className="flex-1 h-3 bg-blue-200 rounded"></div>
            <div className="flex-1 h-3 bg-blue-200 rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-3 bg-blue-200 rounded"></div>
            <div className="flex-1 h-3 bg-blue-200 rounded"></div>
            <div className="flex-1 h-3 bg-blue-200 rounded"></div>
          </div>
        </div>
      );

    case 'map':
      return (
        <div className="relative w-20 h-16 bg-blue-100 rounded">
          <div className="absolute top-2 left-3 w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="absolute top-4 left-8 w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="absolute top-6 left-5 w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="absolute top-8 left-12 w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="absolute top-10 left-7 w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      );

    case 'funnel':
      return (
        <div className="flex flex-col items-center gap-1 w-full">
          <div className="w-full h-3 bg-blue-600 rounded"></div>
          <div className="w-4/5 h-3 bg-blue-500 rounded"></div>
          <div className="w-3/5 h-3 bg-blue-400 rounded"></div>
          <div className="w-2/5 h-3 bg-blue-300 rounded"></div>
        </div>
      );

    case 'gauge':
      return (
        <svg className="w-20 h-16" viewBox="0 0 100 60">
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 10 50 A 40 40 0 0 1 70 20"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="4" fill="#1f2937" />
          <line
            x1="50"
            y1="50"
            x2="70"
            y2="25"
            stroke="#1f2937"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return null;
  }
}
