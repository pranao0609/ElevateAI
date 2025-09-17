import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Target, TrendingUp, Users, Zap, School } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
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

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 lg:py-5">
        {/* Google-style Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary Google Blue Gradient */}
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-30"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(26, 115, 232, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(52, 168, 83, 0.10) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(251, 188, 4, 0.08) 0%, transparent 50%)
              `
            }}
          />
          
          {/* Google-style geometric shapes */}
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-green-400/8 to-yellow-400/6 blur-3xl" />
          
          {/* Material Design inspired dots pattern */}
          <div className="absolute top-1/3 right-1/4 grid grid-cols-6 gap-2 opacity-20">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i % 4 === 0 ? 'bg-blue-500' :
                  i % 4 === 1 ? 'bg-green-500' :
                  i % 4 === 2 ? 'bg-red-500' : 'bg-yellow-500'
                }`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animation: 'pulse 2s infinite'
                }}
              />
            ))}
          </div>
        </div>

        <div className="container relative z-10 px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-10">
              <div className="space-y-8">
                {/* Google-style Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
                  <span className="material-icons text-base">auto_awesome</span>
                  <span style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    Powered by Google AI
                  </span>
                </div>

                <h1 
                  className="text-5xl lg:text-7xl font-normal text-gray-900 leading-tight"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  Shape Your
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent font-medium">
                    Dream Career
                  </span>
                  <span className="block text-4xl lg:text-5xl text-gray-700 font-light mt-2">
                    with AI Guidance
                  </span>
                </h1>

                <p 
                  className="text-xl lg:text-2xl text-gray-600 max-w-2xl leading-relaxed"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Discover personalized career paths, bridge skill gaps, and unlock opportunities 
                  tailored for students with our <span className="font-medium text-blue-600">AI-powered platform</span>.
                </p>
              </div>

              {/* Google Material Design CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  <span className="material-icons mr-3">rocket_launch</span>
                  Start Your Journey
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-full transition-all duration-300"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  <Play className="mr-3 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Google-style Stats with Material Icons */}
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-200">
                <div className="text-center group">
                  <div className="flex items-center justify-center mb-2">
                    <span className="material-icons text-blue-600 mr-2">school</span>
                    <div 
                      className="text-3xl lg:text-4xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      50K+
                    </div>
                  </div>
                  <div 
                    className="text-sm text-gray-600 font-medium"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Students Guided
                  </div>
                </div>
                
                <div className="text-center group">
                  <div className="flex items-center justify-center mb-2">
                    <span className="material-icons text-green-600 mr-2">trending_up</span>
                    <div 
                      className="text-3xl lg:text-4xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      95%
                    </div>
                  </div>
                  <div 
                    className="text-sm text-gray-600 font-medium"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Success Rate
                  </div>
                </div>
                
                <div className="text-center group">
                  <div className="flex items-center justify-center mb-2">
                    <span className="material-icons text-yellow-600 mr-2">explore</span>
                    <div 
                      className="text-3xl lg:text-4xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      500+
                    </div>
                  </div>
                  <div 
                    className="text-sm text-gray-600 font-medium"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Career Paths
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image with Google Material Design Cards */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white">
                <img 
                  src={heroImage}
                  alt="AI Career & Skills Advisor Platform"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Google Material Design Floating Cards */}
              <div 
                className="absolute -top-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 animate-bounce"
                style={{ animation: 'bounce 3s infinite' }}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div 
                      className="text-sm font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Career Match
                    </div>
                    <div className="text-2xl font-bold text-blue-600">94%</div>
                  </div>
                </div>
              </div>
              
              <div 
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 shadow-xl text-white"
                style={{ 
                  animation: 'float 4s ease-in-out infinite',
                }}
              >
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-2xl">psychology</span>
                  <div>
                    <div 
                      className="text-sm font-medium"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Skills Growing
                    </div>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-xs">+12% this week</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Google-style notification card */}
              <div 
                className="absolute top-1/2 -left-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-4 shadow-lg"
                style={{ 
                  animation: 'slideInLeft 2s ease-out 1s both',
                }}
              >
                <div className="flex items-center space-x-2">
                  <span className="material-icons text-yellow-600">notifications_active</span>
                  <div>
                    <div 
                      className="text-xs font-medium text-yellow-800"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      New Opportunity
                    </div>
                    <div className="text-xs text-yellow-700">3 matches found</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Material Design Animations */}
      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideInLeft {
          0% { 
            transform: translateX(-100px);
            opacity: 0;
          }
          100% { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </>
  );
};

export default Hero;
