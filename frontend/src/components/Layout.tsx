import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  stepLabels?: string[];
}

export const Layout = ({ 
  children, 
  showProgress = false, 
  currentStep, 
  totalSteps, 
  stepLabels 
}: LayoutProps) => {
  return (
    <>
      {/* Google Fonts Import */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link 
        href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap" 
        rel="stylesheet" 
      />
      <link 
        href="https://fonts.googleapis.com/icon?family=Material+Icons" 
        rel="stylesheet" 
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white">
        {/* Google Material Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Google-style Brand */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="material-icons text-white text-xl">school</span>
                  </div>
                  <div>
                    <h1 
                      className="text-2xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Student Advisor Portal
                    </h1>
                    <div 
                      className="text-sm text-blue-600 -mt-1"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      Powered by Google AI
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Google Material Progress Stepper */}
              {showProgress && currentStep && totalSteps && (
                <div className="hidden lg:flex items-center space-x-6">
                  {/* Step Labels */}
                  {stepLabels && stepLabels.length > 0 && (
                    <div className="flex items-center space-x-4">
                      {stepLabels.map((label, index) => {
                        const stepNumber = index + 1;
                        const isActive = stepNumber === currentStep;
                        const isCompleted = stepNumber < currentStep;
                        const isUpcoming = stepNumber > currentStep;

                        return (
                          <div key={index} className="flex items-center">
                            <div className="flex flex-col items-center">
                              {/* Step Circle */}
                              <div className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isCompleted 
                                  ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg' 
                                  : isActive 
                                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg ring-4 ring-blue-100' 
                                    : 'bg-gray-200 border-2 border-gray-300'
                              }`}>
                                {isCompleted ? (
                                  <span className="material-icons text-white text-sm">check</span>
                                ) : (
                                  <span className={`text-sm font-medium ${
                                    isActive ? 'text-white' : isUpcoming ? 'text-gray-500' : 'text-gray-600'
                                  }`} style={{ fontFamily: 'Google Sans, sans-serif' }}>
                                    {stepNumber}
                                  </span>
                                )}
                              </div>
                              
                              {/* Step Label */}
                              <span className={`mt-2 text-xs font-medium whitespace-nowrap ${
                                isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                              }`} style={{ fontFamily: 'Roboto, sans-serif' }}>
                                {label}
                              </span>
                            </div>
                            
                            {/* Connector Line */}
                            {index < stepLabels.length - 1 && (
                              <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                                stepNumber < currentStep ? 'bg-green-400' : 'bg-gray-300'
                              }`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Fallback Progress Bar */}
                  {(!stepLabels || stepLabels.length === 0) && (
                    <div className="flex items-center space-x-4">
                      <span 
                        className="text-sm font-medium text-gray-700"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        Step {currentStep} of {totalSteps}
                      </span>
                      <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out relative overflow-hidden"
                          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </div>
                      </div>
                      <span 
                        className="text-sm text-gray-500"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        {Math.round((currentStep / totalSteps) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Progress */}
              {showProgress && currentStep && totalSteps && (
                <div className="flex lg:hidden items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span 
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      {currentStep}/{totalSteps}
                    </span>
                    <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Step Labels */}
          {showProgress && stepLabels && stepLabels.length > 0 && currentStep && (
            <div className="lg:hidden border-t border-gray-100 px-6 py-3 bg-gray-50">
              <div className="text-center">
                <div 
                  className="text-sm font-medium text-blue-600"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {stepLabels[currentStep - 1]}
                </div>
                <div 
                  className="text-xs text-gray-500 mt-1"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Step {currentStep} of {totalSteps}
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Main Content with Google Material styling */}
        <main className="flex-1 px-6 py-12">
          <div className="max-w-4xl mx-auto relative">
            {/* Google-style Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/5 to-purple-400/5 blur-3xl" />
              <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-gradient-to-br from-green-400/5 to-yellow-400/5 blur-3xl" />
            </div>
            
            {children}
          </div>
        </main>

        {/* Footer with Google branding */}
       
          
      </div>
    </>
  );
};
