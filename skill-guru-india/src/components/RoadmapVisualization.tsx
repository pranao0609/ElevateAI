import React, { useState } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Lock, 
  Star, 
  Clock,
  BookOpen,
  ExternalLink,
  Target,
  Trophy,
  Zap
} from 'lucide-react';

// Mock shadcn/ui components with Google Material Design 3 styling
const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`border-0 rounded-3xl shadow-lg bg-white ${className}`}>{children}</div>
);

const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-8 border-b border-gray-100">{children}</div>
);

const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <h2 className={`text-2xl font-medium ${className}`} style={{ fontFamily: 'Google Sans, sans-serif' }}>{children}</h2>
);

const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`p-8 ${className}`}>{children}</div>
);

const Button: React.FC<{
  variant?: 'ghost' | 'default';
  size?: 'sm' | 'default';
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
}> = ({ variant = 'default', size = 'default', onClick, children, className }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200";
  const variantStyles = {
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    default: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
  };
  const sizeStyles = {
    sm: "px-3 py-2 text-sm h-8",
    default: "px-6 py-3 text-base h-12"
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={{ fontFamily: 'Google Sans, sans-serif' }}
    >
      {children}
    </button>
  );
};

const Badge: React.FC<{
  variant?: 'outline' | 'secondary' | 'destructive';
  children: React.ReactNode;
  className?: string;
}> = ({ variant = 'outline', children, className }) => {
  const variantStyles = {
    outline: "border border-gray-300 text-gray-700 bg-white",
    secondary: "bg-gray-100 text-gray-800 border border-gray-200",
    destructive: "bg-red-100 text-red-800 border border-red-200"
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
          style={{ fontFamily: 'Roboto, sans-serif' }}>
      {children}
    </span>
  );
};

// TypeScript interfaces (unchanged)
interface Resource {
  name: string;
  url: string;
  type: string;
}

interface Specialization {
  name: string;
  skills: string[];
  resources: Resource[];
}

interface RoadmapNode {
  id: string;
  title: string;
  type: string;
  status: string;
  description: string;
  duration?: string;
  position: { x: number; y: number };
  connections: string[];
  skills?: string[];
  resources?: Resource[];
  specializations?: Specialization[];
  project_ideas?: string[];
  next_steps?: string[];
}

interface RoadmapData {
  user_profile: {
    name: string;
    career_goal: string;
    experience_level: string;
    estimated_duration: string;
  };
  career_outlook: {
    summary: string;
    average_salary_entry_level: string;
    difficulty_level: string;
    key_industries: string[];
  };
  roadmap: {
    title: string;
    description: string;
    nodes: RoadmapNode[];
  };
}

interface RoadmapVisualizationProps {
  roadmapData: RoadmapData;
}

const RoadmapVisualization: React.FC<RoadmapVisualizationProps> = ({ roadmapData }) => {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set(['start']));

  // Calculate node positions to prevent overlap
  const calculateNodePositions = (nodes: RoadmapNode[]): RoadmapNode[] => {
    const nodeLevels: { [key: string]: number } = {};
    const visited: Set<string> = new Set();
    
    const assignLevels = (nodeId: string, level: number) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      nodeLevels[nodeId] = level;
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        node.connections.forEach(connId => assignLevels(connId, level + 1));
      }
    };
    
    assignLevels('start', 0);
    
    const levels: { [key: number]: RoadmapNode[] } = {};
    nodes.forEach(node => {
      const level = nodeLevels[node.id] || 0;
      if (!levels[level]) levels[level] = [];
      levels[level].push(node);
    });
    
    const nodeWidth = 320;
    const nodeHeight = 200;
    const updatedNodes = nodes.map(node => {
      const level = nodeLevels[node.id] || 0;
      const nodesInLevel = levels[level].length;
      const indexInLevel = levels[level].findIndex(n => n.id === node.id);
      
      const totalWidth = nodesInLevel * nodeWidth;
      const startX = (window.innerWidth - totalWidth) / 2;
      const x = startX + indexInLevel * nodeWidth;
      const y = level * nodeHeight;
      
      return { ...node, position: { x, y } };
    });
    
    return updatedNodes;
  };

  const updatedNodes = calculateNodePositions(roadmapData.roadmap.nodes);
  const maxLevel = Math.max(...Object.values(updatedNodes).map(n => n.position.y)) + 200;
  const containerHeight = Math.max(maxLevel, 1400);

  const getNodeIcon = (node: RoadmapNode) => {
    const isCompleted = completedNodes.has(node.id);
    const isUnlocked = isCompleted || node.status === 'current';
    
    switch (node.type) {
      case 'start':
        return <span className="material-icons text-2xl text-green-500">play_circle</span>;
      case 'success':
        return <span className="material-icons text-2xl text-yellow-500">emoji_events</span>;
      case 'milestone':
        return <span className="material-icons text-2xl text-purple-500">flag</span>;
      case 'choice':
        return <span className="material-icons text-2xl text-orange-500">alt_route</span>;
      default:
        if (isCompleted) {
          return <span className="material-icons text-2xl text-green-500">check_circle</span>;
        } else if (isUnlocked) {
          return <span className="material-icons text-2xl text-blue-500">radio_button_unchecked</span>;
        } else {
          return <span className="material-icons text-2xl text-gray-400">lock</span>;
        }
    }
  };

  const getNodeStyle = (node: RoadmapNode) => {
    const isCompleted = completedNodes.has(node.id);
    const isUnlocked = isCompleted || node.status === 'current';
    
    let baseStyle = "relative p-6 rounded-3xl border-0 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 min-w-[280px] max-w-[300px] shadow-lg";
    
    if (isCompleted) {
      return `${baseStyle} bg-gradient-to-br from-green-50 to-green-100 ring-2 ring-green-200`;
    } else if (isUnlocked) {
      return `${baseStyle} bg-gradient-to-br from-blue-50 to-blue-100 ring-2 ring-blue-200`;
    } else {
      return `${baseStyle} bg-gray-50 ring-2 ring-gray-200 opacity-60 cursor-not-allowed`;
    }
  };

  const toggleNodeCompletion = (nodeId: string) => {
    const newCompleted = new Set(completedNodes);
    if (completedNodes.has(nodeId)) {
      newCompleted.delete(nodeId);
    } else {
      newCompleted.add(nodeId);
    }
    setCompletedNodes(newCompleted);
  };

  const { user_profile, career_outlook, roadmap } = roadmapData;

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

      <div className="w-full max-w-8xl mx-auto p-8 space-y-12 bg-gradient-to-br from-gray-50 via-blue-50 to-white min-h-screen">
        {/* Google Material Header */}
        <div className="text-center space-y-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-green-400/8 to-yellow-400/8 blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-blue-200 rounded-full text-sm font-medium text-blue-700 shadow-sm mb-8">
              <span className="material-icons text-base">route</span>
              <span style={{ fontFamily: 'Google Sans, sans-serif' }}>Learning Pathway</span>
            </div>

            <h1 
              className="text-5xl lg:text-7xl font-normal text-gray-900 leading-tight mb-6"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              {roadmap.title}
            </h1>
            
            <p 
              className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              {roadmap.description}
            </p>

            <div className="flex justify-center items-center space-x-12 text-base">
              <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="material-icons text-blue-600 text-lg">schedule</span>
                <span style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Duration: <span className="font-medium">{user_profile.estimated_duration}</span>
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="material-icons text-green-500 text-lg">trending_up</span>
                <span style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Level: <span className="font-medium">{career_outlook.difficulty_level}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Google Learning Path Roadmap Visualization */}
        <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Connection Lines with Google-style gradients */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1, height: `${containerHeight}px` }}>
            {updatedNodes.map((node) =>
              node.connections.map((connectionId) => {
                const targetNode = updatedNodes.find(n => n.id === connectionId);
                if (!targetNode) return null;
                
                return (
                  <defs key={`${node.id}-${connectionId}-defs`}>
                    <linearGradient id={`gradient-${node.id}-${connectionId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
                    </linearGradient>
                    <line
                      key={`${node.id}-${connectionId}`}
                      x1={node.position.x + 150}
                      y1={node.position.y + 90}
                      x2={targetNode.position.x + 150}
                      y2={targetNode.position.y + 30}
                      stroke={`url(#gradient-${node.id}-${connectionId})`}
                      strokeWidth="3"
                      strokeDasharray="8,4"
                      strokeLinecap="round"
                    />
                  </defs>
                );
              })
            )}
          </svg>

          {/* Roadmap Nodes */}
          <div className="relative p-12" style={{ height: `${containerHeight}px`, zIndex: 2 }}>
            {updatedNodes.map((node) => (
              <div
                key={node.id}
                className="absolute"
                style={{
                  left: `${node.position.x}px`,
                  top: `${node.position.y}px`,
                }}
              >
                <div
                  className={getNodeStyle(node)}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="flex items-center justify-between mb-4">
                    {getNodeIcon(node)}
                    {node.type !== 'start' && node.type !== 'success' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleNodeCompletion(node.id);
                        }}
                        className="w-8 h-8 rounded-full hover:bg-white/50"
                      >
                        {completedNodes.has(node.id) ? 
                          <span className="material-icons text-green-600 text-lg">check</span> : 
                          <span className="material-icons text-gray-400 text-lg">radio_button_unchecked</span>
                        }
                      </Button>
                    )}
                  </div>
                  
                  <h3 
                    className="font-medium text-lg mb-2 text-gray-900"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {node.title}
                  </h3>
                  <p 
                    className="text-sm text-gray-600 mb-4 leading-relaxed"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {node.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {node.duration && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <span className="material-icons mr-1 text-xs">schedule</span>
                        {node.duration}
                      </Badge>
                    )}
                    
                    {node.type === 'required' && (
                      <Badge variant="destructive">
                        <span className="material-icons mr-1 text-xs">priority_high</span>
                        Required
                      </Badge>
                    )}
                    
                    {node.type === 'optional' && (
                      <Badge variant="secondary">
                        <span className="material-icons mr-1 text-xs">more_horiz</span>
                        Optional
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google-style Node Details Panel */}
        {selectedNode && (
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-white to-blue-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3">
                  {getNodeIcon(selectedNode)}
                  <span>{selectedNode.title}</span>
                </CardTitle>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedNode(null)}
                  className="w-10 h-10 rounded-full hover:bg-red-50 hover:text-red-600"
                >
                  <span className="material-icons">close</span>
                </Button>
              </div>
              <p 
                className="text-gray-600 leading-relaxed mt-4"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {selectedNode.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {selectedNode.skills && (
                <div>
                  <h4 
                    className="font-medium mb-4 flex items-center text-lg"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <span className="material-icons mr-2 text-blue-600">psychology</span>
                    Skills to Learn
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.resources && (
                <div>
                  <h4 
                    className="font-medium mb-4 flex items-center text-lg"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <span className="material-icons mr-2 text-green-600">library_books</span>
                    Learning Resources
                  </h4>
                  <div className="space-y-3">
                    {selectedNode.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                        <div>
                          <div 
                            className="font-medium text-gray-900 mb-1"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            {resource.name}
                          </div>
                          <Badge variant="outline" className="bg-gray-50">
                            {resource.type}
                          </Badge>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => window.open(resource.url, '_blank')}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <span className="material-icons">open_in_new</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.specializations && (
                <div>
                  <h4 
                    className="font-medium mb-4 flex items-center text-lg"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <span className="material-icons mr-2 text-purple-600">tune</span>
                    Choose Your Specialization
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedNode.specializations.map((spec, index) => (
                      <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
                        <h5 
                          className="font-medium mb-3 text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          {spec.name}
                        </h5>
                        <div className="space-y-2">
                          {spec.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs mr-1 mb-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.project_ideas && (
                <div>
                  <h4 
                    className="font-medium mb-4 flex items-center text-lg"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <span className="material-icons mr-2 text-yellow-600">lightbulb</span>
                    Project Ideas
                  </h4>
                  <ul className="space-y-2">
                    {selectedNode.project_ideas.map((project, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="material-icons text-green-500 text-base mt-0.5">check_circle_outline</span>
                        <span 
                          className="text-gray-700"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          {project}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedNode.next_steps && (
                <div>
                  <h4 
                    className="font-medium mb-4 flex items-center text-lg"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <span className="material-icons mr-2 text-orange-600">trending_up</span>
                    Next Steps
                  </h4>
                  <ul className="space-y-2">
                    {selectedNode.next_steps.map((step, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="material-icons text-blue-500 text-base mt-0.5">arrow_forward</span>
                        <span 
                          className="text-gray-700"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          {step}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Google-style Progress Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="material-icons text-white text-2xl">task_alt</span>
                </div>
                <div 
                  className="text-3xl font-bold text-blue-600"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {completedNodes.size}/{roadmap.nodes.length}
                </div>
                <div 
                  className="text-gray-600"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Steps Completed
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="material-icons text-white text-2xl">trending_up</span>
                </div>
                <div 
                  className="text-3xl font-bold text-green-500"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {Math.round((completedNodes.size / roadmap.nodes.length) * 100)}%
                </div>
                <div 
                  className="text-gray-600"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Progress
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="material-icons text-white text-2xl">payments</span>
                </div>
                <div 
                  className="text-3xl font-bold text-yellow-600"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {career_outlook.average_salary_entry_level}
                </div>
                <div 
                  className="text-gray-600"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Expected Salary
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Google-style Help Text */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <span className="material-icons text-blue-500 text-sm">info</span>
            <span style={{ fontFamily: 'Roboto, sans-serif' }}>
              Click on any step to view detailed learning resources and requirements
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadmapVisualization;
