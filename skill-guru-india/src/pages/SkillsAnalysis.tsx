import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Brain,
  Target,
  TrendingUp,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Star,
  PlayCircle,
  FileText,
  Users,
  Zap,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  Filter,
  Trophy,
  Medal,
  Flame,
  Rocket,
  Shield,
  Crown,
  Gem,
  Sparkles,
  Bolt,
  Lock,
  Unlock
} from "lucide-react";

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
  BarElement,
  Filler
} from 'chart.js';

import {
  Radar,
  Pie,
  Bar,
  Line,
  Doughnut
} from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
  BarElement,
  Filler
);

const SkillsAnalysis = () => {
  // State variables
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [skillsScore, setSkillsScore] = useState(68);
  const [strongSkillsCount, setStrongSkillsCount] = useState(8);
  const [skillGapsCount, setSkillGapsCount] = useState(6);
  const [criticalAreasCount, setCriticalAreasCount] = useState(4);
  const [quizStats, setQuizStats] = useState({
    questionsAnswered: 45,
    timeSpent: "18m 32s",
    accuracy: 78,
    completionDate: "Today"
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [chartType, setChartType] = useState("radar");

  // Badge system states
  const [userBadges, setUserBadges] = useState([]);
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false);
  const [newlyEarnedBadge, setNewlyEarnedBadge] = useState(null);
  const [userStats, setUserStats] = useState({
    totalXP: 1250,
    level: 5,
    currentStreak: 7,
    totalAssessments: 12,
    perfectScores: 3,
    improvementStreak: 5
  });

  // Badge definitions
  const badgeDefinitions = [
    {
      id: 'first_assessment',
      title: 'First Steps',
      description: 'Complete your first skills assessment',
      icon: Brain,
      color: 'bg-blue-500',
      gradient: 'from-blue-400 to-blue-600',
      xpReward: 50,
      rarity: 'common',
      category: 'milestone',
      condition: (stats, skills) => stats.totalAssessments >= 1
    },
    {
      id: 'skill_master',
      title: 'Skill Master',
      description: 'Achieve 90% or higher in any skill category',
      icon: Trophy,
      color: 'bg-yellow-500',
      gradient: 'from-yellow-400 to-orange-500',
      xpReward: 200,
      rarity: 'rare',
      category: 'achievement',
      condition: (stats, skills) => skills.some(cat => cat.overall >= 90)
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Score 100% on any assessment',
      icon: Star,
      color: 'bg-purple-500',
      gradient: 'from-purple-400 to-pink-500',
      xpReward: 300,
      rarity: 'epic',
      category: 'achievement',
      condition: (stats, skills) => stats.perfectScores >= 1
    },
    {
      id: 'streak_warrior',
      title: 'Streak Warrior',
      description: 'Complete assessments for 7 consecutive days',
      icon: Flame,
      color: 'bg-red-500',
      gradient: 'from-red-400 to-orange-500',
      xpReward: 150,
      rarity: 'uncommon',
      category: 'engagement',
      condition: (stats, skills) => stats.currentStreak >= 7
    },
    {
      id: 'rapid_learner',
      title: 'Rapid Learner',
      description: 'Improve 5 skills in a single session',
      icon: Bolt,
      color: 'bg-yellow-400',
      gradient: 'from-yellow-300 to-yellow-500',
      xpReward: 175,
      rarity: 'uncommon',
      category: 'progress',
      condition: (stats, skills) => stats.improvementStreak >= 5
    },
    {
      id: 'tech_guru',
      title: 'Tech Guru',
      description: 'Master all technical skills (80%+ average)',
      icon: Rocket,
      color: 'bg-green-500',
      gradient: 'from-green-400 to-blue-500',
      xpReward: 250,
      rarity: 'rare',
      category: 'mastery',
      condition: (stats, skills) => {
        const techSkills = skills.find(cat => cat.name === 'Technical Skills');
        return techSkills && techSkills.overall >= 80;
      }
    },
    {
      id: 'communication_ace',
      title: 'Communication Ace',
      description: 'Excel in all soft skills (85%+ average)',
      icon: Users,
      color: 'bg-pink-500',
      gradient: 'from-pink-400 to-red-500',
      xpReward: 250,
      rarity: 'rare',
      category: 'mastery',
      condition: (stats, skills) => {
        const softSkills = skills.find(cat => cat.name === 'Soft Skills');
        return softSkills && softSkills.overall >= 85;
      }
    },
    {
      id: 'industry_expert',
      title: 'Industry Expert',
      description: 'Demonstrate deep industry knowledge (90%+ average)',
      icon: Shield,
      color: 'bg-indigo-500',
      gradient: 'from-indigo-400 to-purple-500',
      xpReward: 300,
      rarity: 'epic',
      category: 'mastery',
      condition: (stats, skills) => {
        const industrySkills = skills.find(cat => cat.name === 'Industry Knowledge');
        return industrySkills && industrySkills.overall >= 90;
      }
    },
    {
      id: 'all_rounder',
      title: 'All-Rounder',
      description: 'Score 75%+ in all skill categories',
      icon: Crown,
      color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      xpReward: 400,
      rarity: 'legendary',
      category: 'mastery',
      condition: (stats, skills) => skills.every(cat => cat.overall >= 75)
    },
    {
      id: 'xp_collector',
      title: 'XP Collector',
      description: 'Earn 1000+ experience points',
      icon: Gem,
      color: 'bg-cyan-500',
      gradient: 'from-cyan-400 to-blue-500',
      xpReward: 100,
      rarity: 'uncommon',
      category: 'progression',
      condition: (stats, skills) => stats.totalXP >= 1000
    }
  ];

  const skillCategories = [
    {
      name: "Technical Skills",
      overall: 75,
      skills: [
        { name: "JavaScript", level: 85, status: "strong", trend: "up", improvement: 15 },
        { name: "React", level: 80, status: "strong", trend: "up", improvement: 12 },
        { name: "Node.js", level: 70, status: "good", trend: "stable", improvement: 5 },
        { name: "Python", level: 45, status: "gap", trend: "down", improvement: -8 },
        { name: "TypeScript", level: 35, status: "gap", trend: "down", improvement: -5 },
        { name: "AWS", level: 25, status: "critical", trend: "down", improvement: -10 }
      ]
    },
    {
      name: "Soft Skills",
      overall: 68,
      skills: [
        { name: "Communication", level: 78, status: "good", trend: "up", improvement: 8 },
        { name: "Leadership", level: 65, status: "good", trend: "stable", improvement: 2 },
        { name: "Problem Solving", level: 82, status: "strong", trend: "up", improvement: 18 },
        { name: "Team Collaboration", level: 70, status: "good", trend: "up", improvement: 10 },
        { name: "Time Management", level: 55, status: "gap", trend: "stable", improvement: 0 },
        { name: "Presentation", level: 45, status: "gap", trend: "down", improvement: -12 }
      ]
    },
    {
      name: "Industry Knowledge",
      overall: 60,
      skills: [
        { name: "Agile Methodology", level: 70, status: "good", trend: "up", improvement: 14 },
        { name: "DevOps", level: 40, status: "gap", trend: "stable", improvement: 1 },
        { name: "System Design", level: 35, status: "gap", trend: "down", improvement: -6 },
        { name: "Database Design", level: 75, status: "strong", trend: "up", improvement: 20 },
        { name: "Security Best Practices", level: 30, status: "critical", trend: "down", improvement: -15 },
        { name: "Testing", level: 65, status: "good", trend: "stable", improvement: 3 }
      ]
    }
  ];

  const learningPaths = [
    {
      title: "Python for Full Stack Development",
      description: "Bridge your Python knowledge gap with hands-on projects",
      priority: "High",
      duration: "4 weeks",
      modules: 8,
      skillsGained: ["Python", "Django", "Flask", "API Development"],
      difficulty: "Intermediate",
      rating: 4.8,
      gradient: "gradient-primary"
    },
    {
      title: "AWS Cloud Fundamentals",
      description: "Learn cloud computing essentials for modern development",
      priority: "High", 
      duration: "6 weeks",
      modules: 12,
      skillsGained: ["AWS", "EC2", "S3", "Lambda", "RDS"],
      difficulty: "Beginner",
      rating: 4.9,
      gradient: "bg-gradient-to-br from-warning to-orange-400"
    },
    {
      title: "Advanced TypeScript",
      description: "Master type-safe JavaScript for better code quality",
      priority: "Medium",
      duration: "3 weeks", 
      modules: 6,
      skillsGained: ["TypeScript", "Advanced Types", "Generics", "Decorators"],
      difficulty: "Advanced",
      rating: 4.7,
      gradient: "gradient-success"
    }
  ];

  // Badge Components
  const BadgeCard = ({ badge, earned = false, showAnimation = false }) => {
    const Icon = badge.icon;
    
    return (
      <div className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
        earned 
          ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg scale-105' 
          : 'border-gray-200 bg-gray-50 opacity-60'
      } ${showAnimation ? 'animate-bounce' : ''}`}>
        
        <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
          earned ? `bg-gradient-to-br ${badge.gradient}` : 'bg-gray-300'
        } shadow-lg`}>
          <Icon className={`h-8 w-8 ${earned ? 'text-white' : 'text-gray-500'}`} />
        </div>

        <div className="text-center">
          <h3 className={`font-bold text-sm mb-1 ${earned ? 'text-gray-800' : 'text-gray-500'}`}>
            {badge.title}
          </h3>
          <p className={`text-xs mb-2 ${earned ? 'text-gray-600' : 'text-gray-400'}`}>
            {badge.description}
          </p>
          
          <div className="space-y-1">
            <Badge 
              variant={earned ? 'default' : 'secondary'} 
              className={`text-xs ${getRarityColor(badge.rarity)}`}
            >
              {badge.rarity.toUpperCase()}
            </Badge>
            
            {earned && (
              <div className="flex items-center justify-center space-x-1">
                <Sparkles className="h-3 w-3 text-yellow-500" />
                <span className="text-xs font-semibold text-yellow-600">
                  +{badge.xpReward} XP
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute top-2 right-2">
          {earned ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Lock className="h-4 w-4 text-gray-400" />
          )}
        </div>

        {earned && badge.rarity === 'legendary' && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-20 animate-pulse" />
        )}
      </div>
    );
  };

  const BadgeUnlockAnimation = ({ badge, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }, [onClose]);

    const Icon = badge.icon;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-bounce">
          <div className="mb-4">
            <Sparkles className="h-8 w-8 text-yellow-500 mx-auto mb-2 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Badge Unlocked!</h2>
          </div>
          
          <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${badge.gradient} shadow-xl`}>
            <Icon className="h-12 w-12 text-white" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">{badge.title}</h3>
          <p className="text-gray-600 mb-4">{badge.description}</p>
          
          <div className="flex items-center justify-center space-x-2">
            <Gem className="h-5 w-5 text-yellow-500" />
            <span className="text-lg font-bold text-yellow-600">+{badge.xpReward} XP</span>
          </div>
          
          <Button 
            onClick={onClose}
            className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
          >
            Awesome!
          </Button>
        </div>
      </div>
    );
  };

  const XPProgressBar = ({ currentXP, level }) => {
    const xpForNextLevel = level * 300;
    const xpProgress = (currentXP % 300) / 300 * 100;
    
    return (
      <div className="bg-white rounded-lg p-4 border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            <span className="font-bold text-gray-800">Level {level}</span>
          </div>
          <span className="text-sm text-gray-600">{currentXP} XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1 text-center">
          {Math.round((300 - (currentXP % 300)))} XP to Level {level + 1}
        </div>
      </div>
    );
  };

  // Chart data preparation
  const prepareChartData = () => {
    const allSkills = skillCategories.flatMap(category => 
      category.skills.map(skill => ({
        ...skill,
        category: category.name
      }))
    );

    return selectedCategory === "all" 
      ? allSkills 
      : skillCategories.find(cat => cat.name === selectedCategory)?.skills || [];
  };

  const chartData = prepareChartData();

  // Chart.js data configurations
  const getRadarData = () => ({
    labels: chartData.map(skill => skill.name),
    datasets: [
      {
        label: 'Your Level',
        data: chartData.map(skill => skill.level),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
      },
      {
        label: 'Industry Average',
        data: chartData.map(() => 75),
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff'
      }
    ]
  });

  const getBarData = () => ({
    labels: chartData.map(skill => skill.name),
    datasets: [
      {
        label: 'Skill Level (%)',
        data: chartData.map(skill => skill.level),
        backgroundColor: chartData.map(skill => {
          switch(skill.status) {
            case 'strong': return 'rgba(34, 197, 94, 0.8)';
            case 'good': return 'rgba(59, 130, 246, 0.8)';
            case 'gap': return 'rgba(245, 158, 11, 0.8)';
            case 'critical': return 'rgba(239, 68, 68, 0.8)';
            default: return 'rgba(156, 163, 175, 0.8)';
          }
        }),
        borderColor: chartData.map(skill => {
          switch(skill.status) {
            case 'strong': return 'rgba(34, 197, 94, 1)';
            case 'good': return 'rgba(59, 130, 246, 1)';
            case 'gap': return 'rgba(245, 158, 11, 1)';
            case 'critical': return 'rgba(239, 68, 68, 1)';
            default: return 'rgba(156, 163, 175, 1)';
          }
        }),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  });

  const getPieData = () => {
    const statusCounts = {
      strong: chartData.filter(s => s.status === 'strong').length,
      good: chartData.filter(s => s.status === 'good').length,
      gap: chartData.filter(s => s.status === 'gap').length,
      critical: chartData.filter(s => s.status === 'critical').length
    };

    return {
      labels: ['Strong', 'Good', 'Gap', 'Critical'],
      datasets: [
        {
          data: [statusCounts.strong, statusCounts.good, statusCounts.gap, statusCounts.critical],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)', 
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(245, 158, 11, 1)', 
            'rgba(239, 68, 68, 1)'
          ],
          borderWidth: 2,
          hoverOffset: 4
        }
      ]
    };
  };

  const getLineData = () => ({
    labels: chartData.map(skill => skill.name),
    datasets: [
      {
        label: 'Improvement Trend',
        data: chartData.map(skill => skill.improvement),
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 3,
        pointBackgroundColor: chartData.map(skill => 
          skill.improvement > 0 ? 'rgba(34, 197, 94, 1)' : 'rgba(239, 68, 68, 1)'
        ),
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        tension: 0.4
      }
    ]
  });

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  // Progress Circle Component
  const ProgressCircle = ({ percentage, size = 120, strokeWidth = 8, color = "#3b82f6" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-700">{percentage}%</span>
        </div>
      </div>
    );
  };

  // Helper functions
  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'common': return 'bg-gray-100 text-gray-700';
      case 'uncommon': return 'bg-green-100 text-green-700';
      case 'rare': return 'bg-blue-100 text-blue-700';
      case 'epic': return 'bg-purple-100 text-purple-700';
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const checkBadgeUnlocks = (stats, skills) => {
    const newBadges = [];
    
    badgeDefinitions.forEach(badge => {
      const alreadyEarned = userBadges.some(earned => earned.id === badge.id);
      
      if (!alreadyEarned && badge.condition(stats, skills)) {
        newBadges.push({
          ...badge,
          unlockedAt: new Date(),
          xpEarned: badge.xpReward
        });
      }
    });

    if (newBadges.length > 0) {
      setUserBadges(prev => [...prev, ...newBadges]);
      setUserStats(prev => ({
        ...prev,
        totalXP: prev.totalXP + newBadges.reduce((sum, badge) => sum + badge.xpReward, 0)
      }));
      
      if (newBadges[0]) {
        setNewlyEarnedBadge(newBadges[0]);
        setShowBadgeAnimation(true);
      }
    }
  };

  // Handler functions
  const handleStartQuiz = async () => {
    setIsQuizLoading(true);
    setTimeout(() => {
      console.log("Starting comprehensive skills assessment...");
      setIsQuizLoading(false);
      setTimeout(() => {
        handleQuizCompletion();
      }, 2000);
    }, 2000);
  };

  const handleQuizCompletion = () => {
    setSkillsScore(72);
    setStrongSkillsCount(9);
    setSkillGapsCount(5);
    setCriticalAreasCount(3);
    setQuizStats({
      questionsAnswered: 48,
      timeSpent: "17m 45s",
      accuracy: 81,
      completionDate: "Just now"
    });
    setHasCompletedQuiz(true);
    
    const newStats = {
      ...userStats,
      totalAssessments: userStats.totalAssessments + 1,
      perfectScores: userStats.perfectScores + (skillsScore === 100 ? 1 : 0)
    };
    setUserStats(newStats);
    
    setTimeout(() => {
      checkBadgeUnlocks(newStats, skillCategories);
    }, 1000);
  };

  const handleRetakeQuiz = () => {
    setHasCompletedQuiz(false);
    setSkillsScore(0);
    setIsQuizLoading(false);
  };

  const handleCategoryQuiz = (categoryName) => {
    console.log(`Starting ${categoryName} specific assessment...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "strong": return "text-success";
      case "good": return "text-primary";
      case "gap": return "text-warning";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "strong": return <Badge className="bg-success/10 text-success border-success/20">Strong</Badge>;
      case "good": return <Badge className="bg-primary/10 text-primary border-primary/20">Good</Badge>;
      case "gap": return <Badge className="bg-warning/10 text-warning border-warning/20">Gap</Badge>;
      case "critical": return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Critical</Badge>;
      default: return null;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-success" />;
      case "down": return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
      case "stable": return <div className="w-4 h-4 rounded-full bg-muted-foreground/50" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Badge Unlock Animation */}
      {showBadgeAnimation && newlyEarnedBadge && (
        <BadgeUnlockAnimation 
          badge={newlyEarnedBadge}
          onClose={() => {
            setShowBadgeAnimation(false);
            setNewlyEarnedBadge(null);
          }}
        />
      )}
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container px-4">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                <Brain className="h-4 w-4" />
                <span>AI Skills Assessment</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Analyze & Improve
                <span className="block gradient-text bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Your Skills
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Get detailed insights into your skill levels, identify gaps, and receive 
                personalized learning recommendations to accelerate your career growth.
              </p>
              
              {/* XP Progress Bar */}
              <div className="max-w-md mx-auto mt-8">
                <XPProgressBar currentXP={userStats.totalXP} level={userStats.level} />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Analysis */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <div className="text-center">
                <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed</TabsTrigger>
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                  <TabsTrigger value="learning">Learning</TabsTrigger>
                </TabsList>
              </div>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Your Skills Overview
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {!hasCompletedQuiz 
                      ? "Take our AI-powered assessment to analyze your skills across different categories."
                      : "Based on your AI assessment, here's your comprehensive skills analysis."
                    }
                  </p>
                </div>

                {/* Quiz section - before/after */}
                {!hasCompletedQuiz ? (
                  <Card className="max-w-2xl mx-auto">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Brain className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">Skills Assessment</CardTitle>
                      <CardDescription>
                        Take our comprehensive AI-powered quiz to evaluate your skills and get personalized insights
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 text-center">
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>15-20 minutes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span>50+ questions</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4" />
                            <span>All skill areas</span>
                          </div>
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                          <h4 className="font-semibold text-sm">Assessment Includes:</h4>
                          <div className="flex flex-wrap justify-center gap-2">
                            <Badge variant="secondary" className="text-xs">Technical Skills</Badge>
                            <Badge variant="secondary" className="text-xs">Soft Skills</Badge>
                            <Badge variant="secondary" className="text-xs">Industry Knowledge</Badge>
                            <Badge variant="secondary" className="text-xs">Problem Solving</Badge>
                          </div>
                        </div>
                      </div>

                      <Button 
                        size="lg" 
                        className="w-full max-w-xs mx-auto gradient-primary"
                        onClick={handleStartQuiz}
                        disabled={isQuizLoading}
                      >
                        {isQuizLoading ? (
                          <>
                            <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                            Preparing Quiz...
                          </>
                        ) : (
                          <>
                            <Brain className="mr-2 h-5 w-5" />
                            Take Skills Quiz
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground">
                        Your responses will be analyzed by our ML model to provide accurate skill assessments
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Quiz completed - show results */}
                    <Card className="max-w-2xl mx-auto">
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-8 w-8 text-success" />
                        </div>
                        <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
                        <CardDescription>
                          Your comprehensive skill assessment across all categories
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="text-center">
                          <div className="text-6xl font-bold text-primary mb-2">
                            {skillsScore}
                          </div>
                          <div className="text-lg text-muted-foreground">out of 100</div>
                          <Badge 
                            className={`mt-2 ${
                              skillsScore >= 80 ? 'bg-success/10 text-success border-success/20' :
                              skillsScore >= 60 ? 'bg-primary/10 text-primary border-primary/20' :
                              skillsScore >= 40 ? 'bg-warning/10 text-warning border-warning/20' :
                              'bg-destructive/10 text-destructive border-destructive/20'
                            }`}
                          >
                            {skillsScore >= 80 ? 'Expert Level' :
                             skillsScore >= 60 ? 'Advanced' :
                             skillsScore >= 40 ? 'Intermediate' : 'Beginner'}
                          </Badge>
                        </div>

                        <Progress value={skillsScore} className="h-4" />
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-success">{strongSkillsCount}</div>
                            <div className="text-sm text-muted-foreground">Strong Skills</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-warning">{skillGapsCount}</div>
                            <div className="text-sm text-muted-foreground">Skill Gaps</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-destructive">{criticalAreasCount}</div>
                            <div className="text-sm text-muted-foreground">Critical Areas</div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={handleRetakeQuiz}
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Retake Assessment
                          </Button>
                          <Button 
                            className="flex-1 gradient-success"
                            onClick={() => setActiveTab('learning')}
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            View Learning Path
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Category Overview */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {skillCategories.map((category, index) => (
                        <Card key={index} className="hover:shadow-lg transition-smooth">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Target className="h-5 w-5 text-primary" />
                              <span>{category.name}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="text-center">
                              <ProgressCircle 
                                percentage={category.overall} 
                                size={100} 
                                color={
                                  category.overall >= 80 ? '#22c55e' :
                                  category.overall >= 60 ? '#3b82f6' :
                                  '#f59e0b'
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              {category.skills.slice(0, 3).map((skill, skillIndex) => (
                                <div key={skillIndex} className="flex justify-between items-center text-sm">
                                  <span>{skill.name}</span>
                                  <div className="flex items-center space-x-2">
                                    <span className={getStatusColor(skill.status)}>{skill.level}%</span>
                                    {getTrendIcon(skill.trend)}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              onClick={() => handleCategoryQuiz(category.name)}
                            >
                              <Brain className="h-4 w-4 mr-2" />
                              Retake {category.name}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>

              {/* Detailed Tab */}
              <TabsContent value="detailed" className="space-y-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Advanced Skills Analytics
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Interactive data visualizations showing comprehensive analysis of your skills.
                  </p>
                </div>

                {/* Control Panel */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Visualization Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <select 
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="px-3 py-1 rounded-md border bg-background text-sm"
                        >
                          <option value="all">All Categories</option>
                          {skillCategories.map(cat => (
                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <div className="flex gap-1">
                          {[
                            { type: 'radar', icon: Target, label: 'Radar' },
                            { type: 'bar', icon: BarChart3, label: 'Bar Chart' },
                            { type: 'pie', icon: PieChart, label: 'Distribution' },
                            { type: 'line', icon: TrendingUp, label: 'Trends' }
                          ].map(({ type, icon: Icon, label }) => (
                            <Button
                              key={type}
                              size="sm"
                              variant={chartType === type ? "default" : "outline"}
                              onClick={() => setChartType(type)}
                              className="text-xs"
                            >
                              <Icon className="h-3 w-3 mr-1" />
                              {label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Main Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Analysis - {chartType.charAt(0).toUpperCase() + chartType.slice(1)} View</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ height: '400px' }}>
                      {chartData.length > 0 ? (
                        <>
                          {chartType === 'radar' && <Radar data={getRadarData()} options={radarOptions} />}
                          {chartType === 'bar' && <Bar data={getBarData()} options={chartOptions} />}
                          {chartType === 'pie' && <Pie data={getPieData()} options={{ responsive: true, maintainAspectRatio: false }} />}
                          {chartType === 'line' && <Line data={getLineData()} options={chartOptions} />}
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-muted-foreground">No data available</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Badges Tab */}
              <TabsContent value="badges" className="space-y-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Achievement Badges
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Unlock badges by completing assessments, improving skills, and reaching milestones. 
                    Each badge rewards you with XP to level up your profile!
                  </p>
                </div>

                {/* Stats Dashboard */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{userBadges.length}</div>
                      <div className="text-sm text-muted-foreground">Badges Earned</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{userStats.totalXP}</div>
                      <div className="text-sm text-muted-foreground">Total XP</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Crown className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{userStats.level}</div>
                      <div className="text-sm text-muted-foreground">Current Level</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Flame className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{userStats.currentStreak}</div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Badge Categories */}
                <div className="space-y-8">
                  {['milestone', 'achievement', 'mastery', 'engagement', 'progression'].map(category => (
                    <div key={category}>
                      <h3 className="text-xl font-semibold text-foreground mb-4 capitalize flex items-center">
                        <Award className="h-5 w-5 mr-2 text-primary" />
                        {category} Badges
                      </h3>
                      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {badgeDefinitions
                          .filter(badge => badge.category === category)
                          .map(badge => {
                            const earned = userBadges.some(earned => earned.id === badge.id);
                            return (
                              <BadgeCard 
                                key={badge.id} 
                                badge={badge} 
                                earned={earned}
                              />
                            );
                          })
                        }
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress Towards Next Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Progress Towards Next Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {badgeDefinitions
                        .filter(badge => !userBadges.some(earned => earned.id === badge.id))
                        .slice(0, 3)
                        .map(badge => (
                          <div key={badge.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <badge.icon className={`h-6 w-6 text-gray-400`} />
                              <div>
                                <div className="font-medium">{badge.title}</div>
                                <div className="text-sm text-muted-foreground">{badge.description}</div>
                              </div>
                            </div>
                            <Badge variant="outline" className={getRarityColor(badge.rarity)}>
                              {badge.rarity}
                            </Badge>
                          </div>
                        ))
                      }
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Learning Paths Tab */}
              <TabsContent value="learning" className="space-y-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Personalized Learning Paths
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    AI-curated learning paths designed specifically to address your skill gaps and career goals.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {learningPaths.map((path, index) => (
                    <Card key={index} className="group hover:shadow-xl transition-smooth">
                      <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 rounded-lg ${path.gradient} flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                            <BookOpen className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <Badge variant={path.priority === "High" ? "destructive" : "secondary"}>
                            {path.priority} Priority
                          </Badge>
                        </div>
                        
                        <div>
                          <CardTitle className="group-hover:text-primary transition-smooth">
                            {path.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {path.description}
                          </CardDescription>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{path.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{path.modules} Modules</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Zap className="h-4 w-4 text-muted-foreground" />
                            <span>{path.difficulty}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Star className="h-4 w-4 text-warning" />
                            <span>{path.rating}/5.0</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold">Skills You'll Gain</h4>
                          <div className="flex flex-wrap gap-2">
                            {path.skillsGained.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Button className="flex-1 gradient-primary group">
                            Start Learning
                            <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <PlayCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center space-y-6 bg-gradient-card rounded-2xl p-8 border">
                  <h3 className="text-2xl font-bold text-foreground">
                    Ready to Bridge Your Skill Gaps?
                  </h3>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Take action on your skill development with our personalized learning paths and expert guidance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="gradient-success">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Create Learning Plan
                    </Button>
                    <Button size="lg" variant="outline">
                      <Users className="mr-2 h-5 w-5" />
                      Get Expert Guidance
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SkillsAnalysis;
