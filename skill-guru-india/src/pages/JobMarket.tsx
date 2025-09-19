import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { 
  MapPin, 
  Briefcase, 
  TrendingUp, 
  Clock,
  Users,
  DollarSign,
  Search,
  Filter,
  Star,
  ExternalLink,
  Calendar,
  BarChart3,
  Target,
  Building,
  Globe,
  ArrowUpRight,
  RefreshCw,
  Heart,
  Share2,
  Bookmark,
  Eye,
  ChevronRight,
  Navigation
} from "lucide-react";

// Interfaces remain the same...
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  distance?: string;
  salary: string;
  type: string;
  postedTime: string;
  description: string;
  skills: string[];
  logo?: string;
  urgent?: boolean;
  remote?: boolean;
}

interface MarketTrend {
  id: string;
  title: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
  category: string;
  timeframe: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  category: string;
  readTime: string;
}

const JobMarket = () => {
  const [nearbyJobs, setNearbyJobs] = useState<Job[]>([]);
  const [roleBasedJobs, setRoleBasedJobs] = useState<Job[]>([]);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [marketNews, setMarketNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedLocation, setSelectedLocation] = useState("Current Location");
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState("Mumbai, India");

  useEffect(() => {
    fetchJobMarketData();
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation("Mumbai, India");
        },
        (error) => {
          console.log("Location access denied");
        }
      );
    }
  };

  const fetchJobMarketData = async () => {
    try {
      setLoading(true);
      
      // Simulate API calls with sample data
      setTimeout(() => {
        setNearbyJobs(sampleNearbyJobs);
        setRoleBasedJobs(sampleRoleBasedJobs);
        setMarketTrends(sampleMarketTrends);
        setMarketNews(sampleMarketNews);
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error fetching job market data:', error);
      setLoading(false);
    }
  };

  // Sample data (same as before but shortened for brevity)
  const sampleNearbyJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'Bandra, Mumbai',
      distance: '2.3 km',
      salary: '₹12-18 LPA',
      type: 'Full-time',
      postedTime: '2 hours ago',
      description: 'Looking for an experienced React developer to join our dynamic team.',
      skills: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
      urgent: true,
      remote: false
    },
    {
      id: '2',
      title: 'Data Scientist',
      company: 'Analytics Pro',
      location: 'Andheri, Mumbai',
      distance: '4.1 km',
      salary: '₹15-22 LPA',
      type: 'Full-time',
      postedTime: '5 hours ago',
      description: 'Join our AI/ML team to build cutting-edge data solutions.',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      remote: true
    },
    {
      id: '3',
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Powai, Mumbai',
      distance: '6.8 km',
      salary: '₹20-28 LPA',
      type: 'Full-time',
      postedTime: '1 day ago',
      description: 'Lead product strategy and development for our fintech platform.',
      skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile'],
      urgent: true
    }
  ];

  const sampleRoleBasedJobs: Job[] = [
    {
      id: '4',
      title: 'Full Stack Developer',
      company: 'Startup Hub',
      location: 'Bangalore',
      salary: '₹10-15 LPA',
      type: 'Full-time',
      postedTime: '3 hours ago',
      description: 'Build scalable web applications using modern tech stack.',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      remote: true
    },
    {
      id: '5',
      title: 'UI/UX Designer',
      company: 'Design Studio',
      location: 'Pune',
      salary: '₹8-12 LPA',
      type: 'Full-time',
      postedTime: '6 hours ago',
      description: 'Create beautiful and intuitive user experiences.',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research']
    }
  ];

  const sampleMarketTrends: MarketTrend[] = [
    {
      id: '1',
      title: 'AI/ML Jobs',
      description: 'Strong growth in AI and ML positions',
      trend: 'up',
      percentage: 35,
      category: 'Technology',
      timeframe: 'Last 3 months'
    },
    {
      id: '2',
      title: 'Remote Work',
      description: 'Remote positions increasing across sectors',
      trend: 'up',
      percentage: 42,
      category: 'Work Culture',
      timeframe: 'Last 6 months'
    }
  ];

  const sampleMarketNews: NewsItem[] = [
    {
      id: '1',
      title: 'Tech Giants Announce Major Hiring Drive for 2025',
      summary: 'Major technology companies plan to hire over 100,000 new employees across India.',
      source: 'TechNews Today',
      publishedAt: '2 hours ago',
      category: 'Technology',
      readTime: '3 min read'
    },
    {
      id: '2',
      title: 'Remote Work Policies: What Employees Can Expect',
      summary: 'How companies are adapting remote work policies in the post-pandemic era.',
      source: 'Career Insights',
      publishedAt: '5 hours ago',
      category: 'Work Culture',
      readTime: '5 min read'
    }
  ];

  const JobCard: React.FC<{ job: Job; showDistance?: boolean }> = ({ job, showDistance = false }) => (
    <Card className="group border-0 rounded-2xl shadow-md bg-white hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle 
                className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-1"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                {job.title}
              </CardTitle>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {job.company}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {job.urgent && (
              <Badge className="bg-red-100 text-red-700 text-xs rounded-full px-2 py-1">
                Urgent
              </Badge>
            )}
            {job.remote && (
              <Badge className="bg-green-100 text-green-700 text-xs rounded-full px-2 py-1">
                Remote
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-5 pt-0 space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
              {showDistance && job.distance && (
                <span className="text-blue-600 font-medium">({job.distance})</span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{job.postedTime}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-medium text-green-600">{job.salary}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 rounded-full px-2 py-1 text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3">
          <Badge variant="outline" className="rounded-full px-2 py-1 text-xs">
            {job.type}
          </Badge>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-4 py-2 text-sm hover:shadow-md transition-all duration-300"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TrendCard: React.FC<{ trend: MarketTrend }> = ({ trend }) => (
    <Card className="border-0 rounded-xl shadow-sm bg-white hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`flex items-center space-x-2 ${
            trend.trend === 'up' ? 'text-green-600' :
            trend.trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            <TrendingUp className={`w-4 h-4 ${trend.trend === 'down' ? 'rotate-180' : ''}`} />
            <span className="font-semibold text-lg">{trend.percentage}%</span>
          </div>
          <Badge variant="outline" className="text-xs rounded-full">
            {trend.category}
          </Badge>
        </div>
        <h4 className="font-semibold text-base text-gray-900 mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
          {trend.title}
        </h4>
        <p className="text-gray-600 text-sm mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
          {trend.description}
        </p>
        <div className="text-xs text-gray-500">
          {trend.timeframe}
        </div>
      </CardContent>
    </Card>
  );

  const NewsCard: React.FC<{ news: NewsItem }> = ({ news }) => (
    <Card className="border-0 rounded-xl shadow-sm bg-white hover:shadow-md transition-all duration-300 group cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="bg-purple-50 text-purple-700 rounded-full px-2 py-1 text-xs">
            {news.category}
          </Badge>
          <div className="text-xs text-gray-500">
            {news.publishedAt}
          </div>
        </div>
        
        <h4 className="font-semibold text-base text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2" 
            style={{ fontFamily: 'Google Sans, sans-serif' }}>
          {news.title}
        </h4>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
          {news.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span>{news.source}</span>
            <span>•</span>
            <span>{news.readTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
              <Heart className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
              <Share2 className="h-3 w-3" />
            </Button>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap" 
          rel="stylesheet" 
        />
        
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                Loading Job Market Data
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Fetching the latest opportunities...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

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
        <Header />
        
        {/* Hero Section - Reduced sizes */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-10 w-60 h-60 rounded-full bg-gradient-to-br from-green-400/8 to-yellow-400/8 blur-3xl" />
          </div>

          <div className="container px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-full text-sm font-medium text-blue-700 shadow-sm">
                <span className="material-icons text-base">trending_up</span>
                <span style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  Live Job Market Intelligence
                </span>
              </div>

              <h1 
                className="text-4xl lg:text-5xl font-normal text-gray-900 leading-tight"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Explore the
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent font-medium mt-2">
                  Job Market
                </span>
              </h1>

              <p 
                className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Discover opportunities near you, track market trends, and stay updated with 
                the latest <span className="font-medium text-blue-600">industry insights</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-6 bg-white border-t border-gray-100">
          <div className="container px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span className="text-sm" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Current Location: <span className="font-medium text-gray-900">{userLocation}</span>
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 w-64 rounded-full border-2 border-gray-200 focus:border-blue-500 text-sm"
                  />
                </div>
                
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-40 rounded-full border-2 border-gray-200 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Roles">All Roles</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  className="rounded-full px-4 py-2 border-2 border-gray-200 hover:border-blue-500 text-sm"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - Reduced spacing */}
        <section className="py-8">
          <div className="container px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Left Column - Jobs */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Nearby Jobs */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 
                      className="text-2xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Jobs Near You
                    </h2>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-800 text-sm">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {nearbyJobs.map((job) => (
                      <JobCard key={job.id} job={job} showDistance={true} />
                    ))}
                  </div>
                </div>

                {/* Role-Based Jobs */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 
                      className="text-2xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Recommended for You
                    </h2>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-800 text-sm">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {roleBasedJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Trends and News - Reduced sizes */}
              <div className="space-y-6">
                
                {/* Market Trends */}
                <Card className="border-0 rounded-2xl shadow-md bg-white">
                  <CardHeader className="p-5">
                    <CardTitle 
                      className="flex items-center text-lg font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                      Market Trends
                    </CardTitle>
                    <CardDescription className="text-sm" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Current hiring trends and insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 space-y-3">
                    {marketTrends.map((trend) => (
                      <TrendCard key={trend.id} trend={trend} />
                    ))}
                  </CardContent>
                </Card>

                {/* Market News */}
                <Card className="border-0 rounded-2xl shadow-md bg-white">
                  <CardHeader className="p-5">
                    <div className="flex items-center justify-between">
                      <CardTitle 
                        className="flex items-center text-lg font-medium text-gray-900"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        <Globe className="w-5 h-5 mr-2 text-green-600" />
                        Market News
                      </CardTitle>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-sm" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Latest industry news and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 space-y-3">
                    {marketNews.map((news) => (
                      <NewsCard key={news.id} news={news} />
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Stats - Smaller */}
                <Card className="border-0 rounded-2xl shadow-md bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardHeader className="p-5">
                    <CardTitle 
                      className="text-lg font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Market Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 space-y-3">
                    {[
                      { label: "Active Jobs", value: "12,543", icon: "work", color: "text-blue-600" },
                      { label: "Companies Hiring", value: "2,847", icon: "apartment", color: "text-green-600" },
                      { label: "Remote Positions", value: "5,291", icon: "home", color: "text-purple-600" },
                      { label: "New This Week", value: "1,023", icon: "trending_up", color: "text-orange-600" }
                    ].map((stat, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                        <div className="flex items-center space-x-2">
                          <span className={`material-icons ${stat.color} text-lg`}>
                            {stat.icon}
                          </span>
                          <span 
                            className="text-gray-700 font-medium text-sm"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            {stat.label}
                          </span>
                        </div>
                        <span 
                          className="font-bold text-lg text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom Styles */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default JobMarket;
