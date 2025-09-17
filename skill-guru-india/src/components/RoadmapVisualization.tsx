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

// Mock shadcn/ui components
const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`border rounded-lg shadow-sm bg-white ${className}`}>{children}</div>
);

const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);

const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Button: React.FC<{
  variant?: 'ghost' | 'default';
  size?: 'sm' | 'default';
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
}> = ({ variant = 'default', size = 'default', onClick, children, className }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md font-medium";
  const variantStyles = {
    ghost: "text-gray-600 hover:bg-gray-100",
    default: "bg-blue-600 text-white hover:bg-blue-700"
  };
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    default: "px-4 py-2"
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
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
    outline: "border border-gray-300 text-gray-700",
    secondary: "bg-gray-200 text-gray-800",
    destructive: "bg-red-100 text-red-800"
  };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

// TypeScript interfaces
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
    
    // Assign levels based on connections (simple topological sort)
    const assignLevels = (nodeId: string, level: number) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      nodeLevels[nodeId] = level;
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        node.connections.forEach(connId => assignLevels(connId, level + 1));
      }
    };
    
    // Start with the 'start' node
    assignLevels('start', 0);
    
    // Group nodes by level
    const levels: { [key: number]: RoadmapNode[] } = {};
    nodes.forEach(node => {
      const level = nodeLevels[node.id] || 0;
      if (!levels[level]) levels[level] = [];
      levels[level].push(node);
    });
    
    // Assign positions
    const nodeWidth = 300; // Width per node (including padding)
    const nodeHeight = 150; // Height per node (including padding)
    const updatedNodes = nodes.map(node => {
      const level = nodeLevels[node.id] || 0;
      const nodesInLevel = levels[level].length;
      const indexInLevel = levels[level].findIndex(n => n.id === node.id);
      
      // Center nodes horizontally, spread them across the level
      const totalWidth = nodesInLevel * nodeWidth;
      const startX = (window.innerWidth - totalWidth) / 2; // Center the level
      const x = startX + indexInLevel * nodeWidth;
      const y = level * nodeHeight;
      
      return { ...node, position: { x, y } };
    });
    
    return updatedNodes;
  };

  const updatedNodes = calculateNodePositions(roadmapData.roadmap.nodes);

  // Calculate container height based on max level
  const maxLevel = Math.max(...Object.values(updatedNodes).map(n => n.position.y)) + 150;
  const containerHeight = Math.max(maxLevel, 1300);

  const getNodeIcon = (node: RoadmapNode) => {
    const isCompleted = completedNodes.has(node.id);
    const isUnlocked = isCompleted || node.status === 'current';
    
    switch (node.type) {
      case 'start':
        return <Star className="h-6 w-6 text-green-500" />;
      case 'success':
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 'milestone':
        return <Target className="h-6 w-6 text-purple-500" />;
      case 'choice':
        return <Zap className="h-6 w-6 text-orange-500" />;
      default:
        if (isCompleted) {
          return <CheckCircle className="h-6 w-6 text-green-500" />;
        } else if (isUnlocked) {
          return <Circle className="h-6 w-6 text-blue-500" />;
        } else {
          return <Lock className="h-6 w-6 text-gray-400" />;
        }
    }
  };

  const getNodeStyle = (node: RoadmapNode) => {
    const isCompleted = completedNodes.has(node.id);
    const isUnlocked = isCompleted || node.status === 'current';
    
    let baseStyle = "relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg min-w-[200px] max-w-[250px]";
    
    if (isCompleted) {
      return `${baseStyle} bg-green-50 border-green-200 hover:border-green-300`;
    } else if (isUnlocked) {
      return `${baseStyle} bg-blue-50 border-blue-200 hover:border-blue-300`;
    } else {
      return `${baseStyle} bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed`;
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
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          {roadmap.title}
        </h1>
        <p className="text-lg text-gray-600">{roadmap.description}</p>
        <div className="flex justify-center items-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Duration: {user_profile.estimated_duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-green-500" />
            <span>Difficulty: {career_outlook.difficulty_level}</span>
          </div>
        </div>
      </div>

      {/* Roadmap Visualization */}
      <div className="relative">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1, height: `${containerHeight}px` }}>
          {updatedNodes.map((node) =>
            node.connections.map((connectionId) => {
              const targetNode = updatedNodes.find(n => n.id === connectionId);
              if (!targetNode) return null;
              
              return (
                <line
                  key={`${node.id}-${connectionId}`}
                  x1={node.position.x + 125}
                  y1={node.position.y + 60}
                  x2={targetNode.position.x + 125}
                  y2={targetNode.position.y + 20}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              );
            })
          )}
        </svg>

        {/* Roadmap Nodes */}
        <div className="relative" style={{ height: `${containerHeight}px`, zIndex: 2 }}>
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
                <div className="flex items-center justify-between mb-2">
                  {getNodeIcon(node)}
                  {node.type !== 'start' && node.type !== 'success' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleNodeCompletion(node.id);
                      }}
                    >
                      {completedNodes.has(node.id) ? '✓' : '○'}
                    </Button>
                  )}
                </div>
                
                <h3 className="font-semibold text-sm mb-1">{node.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{node.description}</p>
                
                {node.duration && (
                  <Badge variant="outline" className="text-xs">
                    {node.duration}
                  </Badge>
                )}
                
                {node.type === 'required' && (
                  <Badge variant="destructive" className="text-xs ml-1">
                    Required
                  </Badge>
                )}
                
                {node.type === 'optional' && (
                  <Badge variant="secondary" className="text-xs ml-1">
                    Optional
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Node Details Modal/Panel */}
      {selectedNode && (
        <Card className="mt-8 border-l-4 border-l-blue-600">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                {getNodeIcon(selectedNode)}
                <span className="ml-3">{selectedNode.title}</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setSelectedNode(null)}>
                ×
              </Button>
            </div>
            <p className="text-gray-600">{selectedNode.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {selectedNode.skills && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                  Skills to Learn
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedNode.resources && (
              <div>
                <h4 className="font-semibold mb-3">Learning Resources</h4>
                <div className="space-y-2">
                  {selectedNode.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded p-3">
                      <div>
                        <div className="font-medium">{resource.name}</div>
                        <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => window.open(resource.url, '_blank')}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedNode.specializations && (
              <div>
                <h4 className="font-semibold mb-3">Choose Your Specialization</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedNode.specializations.map((spec, index) => (
                    <Card key={index} className="p-4">
                      <h5 className="font-semibold mb-2">{spec.name}</h5>
                      <div className="space-y-2">
                        {spec.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs mr-1">
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
                <h4 className="font-semibold mb-3">Project Ideas</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedNode.project_ideas.map((project, index) => (
                    <li key={index} className="text-sm">{project}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedNode.next_steps && (
              <div>
                <h4 className="font-semibold mb-3">Next Steps</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedNode.next_steps.map((step, index) => (
                    <li key={index} className="text-sm">{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Progress Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {completedNodes.size}/{roadmap.nodes.length}
              </div>
              <div className="text-sm text-gray-600">Nodes Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                {Math.round((completedNodes.size / roadmap.nodes.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">
                {career_outlook.average_salary_entry_level}
              </div>
              <div className="text-sm text-gray-600">Expected Salary</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoadmapVisualization;