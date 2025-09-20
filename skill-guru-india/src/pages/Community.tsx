import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  MessageCircle, 
  Hash, 
  Send, 
  Plus, 
  Search,
  Settings,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Bell,
  Wifi,
  WifiOff,
  ChevronDown,
  CheckCheck,
  Menu,
  X,
  MicOff,
  Upload,
  Loader2,
  Volume2,
  VolumeX,
  Share
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Types
interface ChatRoom {
  _id: string;
  room_id: string;
  name: string;
  description: string;
  room_type: string;
  members: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  max_members?: number;
  member_count: number;
}

interface Message {
  _id: string;
  message_id: string;
  room_id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  message_type: string;
  timestamp: string;
  is_edited: boolean;
  is_deleted: boolean;
  reply_to?: string;
  file_url?: string;
  file_name?: string;
  file_type?: string;
}

interface User {
  user_id: string;
  username: string;
  email: string;
  avatar_url?: string;
  is_online?: boolean;
  last_seen?: string;
}

// Mock data
const MOCK_ROOMS: ChatRoom[] = [
  {
    _id: "1",
    room_id: "general",
    name: "General Discussion",
    description: "General chat for all topics",
    room_type: "general",
    members: ["user1", "user2", "user3"],
    created_by: "admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    member_count: 24
  },
  {
    _id: "2",
    room_id: "study",
    name: "Study Group",
    description: "Study together and share resources",
    room_type: "study_group",
    members: ["user1", "user4", "user5"],
    created_by: "user1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    member_count: 15
  },
  {
    _id: "3",
    room_id: "help",
    name: "Help & Support",
    description: "Get help with your studies",
    room_type: "help",
    members: ["user1", "user2"],
    created_by: "admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    member_count: 8
  }
];

const MOCK_MESSAGES: Message[] = [
  {
    _id: "1",
    message_id: "msg1",
    room_id: "general",
    sender_id: "user2",
    sender_name: "Alice Johnson",
    content: "Welcome to the community! 👋",
    message_type: "text",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    is_edited: false,
    is_deleted: false
  },
  {
    _id: "2",
    message_id: "msg2",
    room_id: "general",
    sender_id: "user3",
    sender_name: "Bob Smith",
    content: "Great to be here! Looking forward to collaborating with everyone.",
    message_type: "text",
    timestamp: new Date(Date.now() - 240000).toISOString(),
    is_edited: false,
    is_deleted: false
  },
  {
    _id: "3",
    message_id: "msg3",
    room_id: "general",
    sender_id: "user4",
    sender_name: "Carol Davis",
    content: "Does anyone have experience with React development?",
    message_type: "text",
    timestamp: new Date(Date.now() - 120000).toISOString(),
    is_edited: false,
    is_deleted: false
  }
];

// Real-time timestamp hook
const useRealTimeTimestamp = (timestamp: string) => {
  const [timeAgo, setTimeAgo] = useState('');
  
  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date();
      const messageTime = new Date(timestamp);
      const diffInSeconds = Math.floor((now.getTime() - messageTime.getTime()) / 1000);
      
      if (diffInSeconds < 60) {
        setTimeAgo('now');
      } else if (diffInSeconds < 3600) {
        setTimeAgo(`${Math.floor(diffInSeconds / 60)}m ago`);
      } else if (diffInSeconds < 86400) {
        setTimeAgo(`${Math.floor(diffInSeconds / 3600)}h ago`);
      } else {
        setTimeAgo(messageTime.toLocaleDateString());
      }
    };
    
    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 30000);
    return () => clearInterval(interval);
  }, [timestamp]);
  
  return timeAgo;
};

// Fixed WebSocket hook with better error handling
const useWebSocket = (userId: string, onMessage: (msg: Message) => void) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3;
  
  const connect = useRef(() => {
    if (!userId || wsRef.current?.readyState === WebSocket.CONNECTING || 
        wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    if (reconnectAttempts.current >= maxReconnectAttempts) {
      setConnectionStatus('error');
      setIsConnected(false);
      return;
    }

    try {
      setConnectionStatus('connecting');
      // Try multiple WebSocket URLs
      const wsUrls = [
        `ws://localhost:8000/api/chat/ws/${encodeURIComponent(userId)}`,
        `ws://127.0.0.1:8000/api/chat/ws/${encodeURIComponent(userId)}`,
        `wss://localhost:8000/api/chat/ws/${encodeURIComponent(userId)}`
      ];
      
      const wsUrl = wsUrls[reconnectAttempts.current] || wsUrls[0];
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        setIsConnected(true);
        setConnectionStatus('connected');
        reconnectAttempts.current = 0;
        console.log('WebSocket connected successfully');
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'message') {
            onMessage(data.data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      wsRef.current.onclose = (event) => {
        setIsConnected(false);
        
        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          setConnectionStatus('connecting');
          reconnectAttempts.current++;
          const delay = Math.min(2000 * reconnectAttempts.current, 10000);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect.current();
          }, delay);
        } else {
          setConnectionStatus('disconnected');
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
        setIsConnected(false);
      };

    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      setConnectionStatus('error');
      setIsConnected(false);
    }
  });

  const sendMessage = useRef((roomId: string, content: string, senderName: string, messageType = 'text') => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        data: { 
          room_id: roomId, 
          content, 
          sender_name: senderName, 
          message_type: messageType
        }
      }));
      return true;
    }
    
    // Fallback: Add message locally if WebSocket not connected
    const mockMessage: Message = {
      _id: Date.now().toString(),
      message_id: Date.now().toString(),
      room_id: roomId,
      sender_id: userId,
      sender_name: senderName,
      content,
      message_type: messageType,
      timestamp: new Date().toISOString(),
      is_edited: false,
      is_deleted: false
    };
    
    setTimeout(() => onMessage(mockMessage), 100);
    return false;
  });

  const joinRoom = useRef((roomId: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'join_room',
        data: { room_id: roomId }
      }));
    }
  });

  const disconnect = useRef(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.close(1000, 'User disconnected');
    }
    
    wsRef.current = null;
    setIsConnected(false);
    setConnectionStatus('disconnected');
    reconnectAttempts.current = 0;
  });

  useEffect(() => {
    if (userId) {
      // Try to connect, but don't require it
      const timer = setTimeout(() => {
        connect.current();
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        disconnect.current();
      };
    }
  }, [userId]);

  return { 
    isConnected, 
    connectionStatus,
    sendMessage: sendMessage.current, 
    joinRoom: joinRoom.current 
  };
};

const Community: React.FC = () => {
  // Get user data from auth context
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State management
  const [rooms, setRooms] = useState<ChatRoom[]>(MOCK_ROOMS);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [activeRoom, setActiveRoom] = useState<string>("general");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [newRoomType, setNewRoomType] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mobile responsiveness
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Emoji and other UI state
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Audio recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  // User list
  const [showUserList, setShowUserList] = useState(false);
  const [onlineUsers] = useState<User[]>([
    {
      user_id: user?.id || "current_user",
      username: user?.firstName || "You",
      email: user?.email || "you@example.com",
      is_online: true
    },
    {
      user_id: "user2",
      username: "Alice Johnson",
      email: "alice@example.com",
      is_online: true
    },
    {
      user_id: "user3", 
      username: "Bob Smith",
      email: "bob@example.com",
      is_online: true
    },
    {
      user_id: "user4",
      username: "Carol Davis", 
      email: "carol@example.com",
      is_online: false
    }
  ]);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Current user data
  const currentUser: User = {
    user_id: user?.id || "current_user",
    username: user?.firstName || "You",
    email: user?.email || "you@example.com",
    is_online: true
  };

  // WebSocket connection
  const { isConnected, connectionStatus, sendMessage, joinRoom } = useWebSocket(
    currentUser.user_id,
    React.useCallback((message: Message) => {
      if (message.room_id === activeRoom) {
        setMessages(prev => [...prev, message]);
      }
    }, [activeRoom])
  );

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setShowSidebar(false);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Authentication check
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initialize room messages
  useEffect(() => {
    const roomMessages = MOCK_MESSAGES.filter(msg => msg.room_id === activeRoom);
    setMessages(roomMessages);
    
    if (isConnected) {
      joinRoom(activeRoom);
    }
  }, [activeRoom, isConnected, joinRoom]);

  // Utility functions
  const getActiveRoomData = () => rooms.find(room => room.room_id === activeRoom);
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoomIcon = (roomType: string) => {
    const icons: Record<string, string> = {
      general: 'forum',
      course: 'school', 
      study_group: 'group',
      help: 'help',
      project: 'assignment'
    };
    return icons[roomType] || 'forum';
  };

  // Message handling
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeRoom) return;

    const success = sendMessage(activeRoom, newMessage.trim(), currentUser.username);
    
    if (success && isConnected) {
      toast({
        title: "Message Sent",
        description: "Your message was sent successfully.",
      });
    } else {
      toast({
        title: "Message Added",
        description: "Message added locally. Connection will sync when available.",
        variant: "default",
      });
    }
    
    setNewMessage("");
    messageInputRef.current?.focus();
  };

  // Room change handling
  const handleRoomChange = (roomId: string) => {
    setActiveRoom(roomId);
    if (isMobile) setShowSidebar(false);
  };

  // Create room
  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;

    const newRoom: ChatRoom = {
      _id: Date.now().toString(),
      room_id: newRoomName.toLowerCase().replace(/\s+/g, '_'),
      name: newRoomName,
      description: newRoomDescription,
      room_type: newRoomType,
      members: [currentUser.user_id],
      created_by: currentUser.user_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: true,
      member_count: 1
    };

    setRooms(prev => [newRoom, ...prev]);
    setShowCreateRoom(false);
    setNewRoomName("");
    setNewRoomDescription("");
    setNewRoomType("general");
    
    toast({
      title: "Room Created",
      description: `${newRoomName} created successfully!`,
    });
  };

  // Emoji handling
  const insertSimpleEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    messageInputRef.current?.focus();
  };

  // Filter rooms
  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Connection status display
  const getConnectionBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return (
          <Badge className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <Wifi className="h-4 w-4" />
            Connected
          </Badge>
        );
      case 'connecting':
        return (
          <Badge className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting
          </Badge>
        );
      case 'error':
        return (
          <Badge className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-700 border border-red-200">
            <WifiOff className="h-4 w-4" />
            Connection Error
          </Badge>
        );
      default:
        return (
          <Badge className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
            <WifiOff className="h-4 w-4" />
            Offline Mode
          </Badge>
        );
    }
  };

  // Real-time timestamp component
  const RealTimeTimestamp: React.FC<{ timestamp: string }> = ({ timestamp }) => {
    const timeAgo = useRealTimeTimestamp(timestamp);
    return (
      <span className="text-xs text-gray-500">
        {timeAgo}
      </span>
    );
  };

  // Simple emoji selector
  const SimpleEmojiSelector = () => (
    <div className="absolute bottom-16 left-0 z-50 bg-white border border-gray-200 rounded-2xl shadow-lg p-4">
      <div className="text-sm text-gray-600 mb-3">Quick Emojis</div>
      <div className="grid grid-cols-6 gap-2">
        {['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🎉', '😢', '😡', '🔥', '✨'].map((emoji) => (
          <button
            key={emoji}
            onClick={() => insertSimpleEmoji(emoji)}
            className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
      <div className="mt-3 text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowEmojiPicker(false)}
          className="text-xs"
        >
          Close
        </Button>
      </div>
    </div>
  );

  // User list dialog
  const UserListDialog = () => (
    <Dialog open={showUserList} onOpenChange={setShowUserList}>
      <DialogContent className="sm:max-w-md border-0 rounded-3xl">
        <DialogHeader>
          <DialogTitle>Room Members ({onlineUsers.length})</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {onlineUsers.map((user, index) => (
            <div key={user.user_id || index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-green-500 text-white">
                  {getInitials(user.username)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">
                  {user.username}
                  {user.user_id === currentUser.user_id && " (You)"}
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <div className={`h-2 w-2 rounded-full ${user.is_online ? 'bg-green-500' : 'bg-gray-400'}`} />
                  {user.is_online ? 'Online' : 'Away'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {/* Google Fonts */}
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
        
        <UserListDialog />
        
        <main className="container mx-auto px-6 py-8 max-w-8xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="material-icons text-white text-2xl">forum</span>
                  </div>
                  <div>
                    <h1 className="text-4xl font-medium text-gray-900" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      Student Community
                    </h1>
                    <p className="text-lg text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Connect, collaborate, and learn together
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {getConnectionBadge()}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 rounded-full border-2 border-gray-300 hover:bg-blue-50 hover:border-blue-300 h-10 px-4"
                  onClick={() => {
                    toast({
                      title: "Notifications",
                      description: isConnected ? "All notifications enabled" : "Limited notifications in offline mode",
                    });
                  }}
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                </Button>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div className={`${isMobile ? 'block' : 'grid grid-cols-12 gap-8'}`} style={{ height: '700px' }}>
            {/* Mobile sidebar overlay */}
            {isMobile && showSidebar && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/50" onClick={() => setShowSidebar(false)} />
                <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
                  <Card className="h-full flex flex-col border-0 rounded-none">
                    <CardHeader className="p-6 border-b border-gray-100 flex-shrink-0">
                      <div className="flex items-center justify-between mb-4">
                        <CardTitle className="text-xl font-medium flex items-center gap-3 text-gray-900">
                          <span className="material-icons text-blue-600 text-xl">chat</span>
                          Chat Rooms
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setShowSidebar(false)} className="h-10 w-10">
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search rooms..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    </CardHeader>
                    <div className="flex-1 overflow-y-auto">
                      <div className="space-y-2 p-4">
                        {filteredRooms.map((room) => (
                          <div
                            key={room.room_id}
                            onClick={() => handleRoomChange(room.room_id)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                              activeRoom === room.room_id
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                                : 'hover:bg-gray-50 border border-gray-100'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-xl ${
                                activeRoom === room.room_id 
                                  ? 'bg-white/20' 
                                  : 'bg-blue-50 text-blue-600'
                              }`}>
                                <span className="material-icons text-lg">
                                  {getRoomIcon(room.room_type)}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-base truncate">
                                  {room.name}
                                </div>
                                <div className={`text-sm truncate ${
                                  activeRoom === room.room_id ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {room.member_count} members • {room.room_type}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Sidebar - Desktop */}
            <div className={`${isMobile ? 'hidden' : 'col-span-12 lg:col-span-4'} h-full`}>
              <Card className="h-full flex flex-col border-0 rounded-3xl shadow-lg bg-white">
                <CardHeader className="p-6 border-b border-gray-100 flex-shrink-0">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-xl font-medium flex items-center gap-3 text-gray-900">
                      <span className="material-icons text-blue-600 text-xl">chat</span>
                      Chat Rooms
                    </CardTitle>
                    
                    <Dialog open={showCreateRoom} onOpenChange={setShowCreateRoom}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
                          <Plus className="h-5 w-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg border-0 rounded-3xl shadow-2xl">
                        <DialogHeader className="p-6">
                          <DialogTitle className="text-2xl font-medium text-gray-900">
                            Create New Room
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 p-6 pt-0">
                          <div>
                            <Label htmlFor="roomName" className="text-base font-medium text-gray-900">
                              Room Name
                            </Label>
                            <Input
                              id="roomName"
                              value={newRoomName}
                              onChange={(e) => setNewRoomName(e.target.value)}
                              placeholder="Enter room name"
                              className="mt-2 h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <Label htmlFor="roomDescription" className="text-base font-medium text-gray-900">
                              Description
                            </Label>
                            <Textarea
                              id="roomDescription"
                              value={newRoomDescription}
                              onChange={(e) => setNewRoomDescription(e.target.value)}
                              placeholder="Describe your room"
                              className="mt-2 rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <Label className="text-base font-medium text-gray-900">Room Type</Label>
                            <RadioGroup value={newRoomType} onValueChange={setNewRoomType} className="mt-3">
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="general" id="general" />
                                <Label htmlFor="general">General</Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="course" id="course" />
                                <Label htmlFor="course">Course</Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="study_group" id="study_group" />
                                <Label htmlFor="study_group">Study Group</Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="help" id="help" />
                                <Label htmlFor="help">Help & Support</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button 
                              onClick={handleCreateRoom} 
                              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl"
                            >
                              Create Room
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setShowCreateRoom(false)}
                              className="flex-1 h-12 rounded-2xl border-2 border-gray-300"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search rooms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </CardHeader>

                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-2 p-4">
                    {filteredRooms.map((room) => (
                      <div
                        key={room.room_id}
                        onClick={() => handleRoomChange(room.room_id)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                          activeRoom === room.room_id
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                            : 'hover:bg-gray-50 border border-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${
                            activeRoom === room.room_id 
                              ? 'bg-white/20' 
                              : 'bg-blue-50 text-blue-600'
                          }`}>
                            <span className="material-icons text-lg">
                              {getRoomIcon(room.room_type)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-base truncate">
                              {room.name}
                            </div>
                            <div className={`text-sm truncate ${
                              activeRoom === room.room_id ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {room.member_count} members • {room.room_type}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Chat */}
            <div className={`${isMobile ? 'h-full' : 'col-span-12 lg:col-span-8'} h-full`}>
              <Card className="h-full flex flex-col border-0 rounded-3xl shadow-lg bg-white">
                {/* Mobile header */}
                {isMobile && (
                  <div className="lg:hidden p-4 border-b flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => setShowSidebar(true)} className="h-10 w-10">
                      <Menu className="h-5 w-5" />
                    </Button>
                    <h1 className="font-semibold">{getActiveRoomData()?.name || "Select a room"}</h1>
                  </div>
                )}
                
                {/* Chat Header */}
                <CardHeader className="p-6 border-b border-gray-100 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-blue-50">
                        <span className="material-icons text-blue-600 text-xl">
                          {getRoomIcon(getActiveRoomData()?.room_type || "general")}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-medium text-gray-900">
                          {getActiveRoomData()?.name || "Select a room"}
                        </CardTitle>
                        <p className="text-gray-600">
                          {getActiveRoomData()?.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge 
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-300 cursor-pointer hover:bg-gray-200"
                        onClick={() => setShowUserList(true)}
                      >
                        <Users className="h-4 w-4" />
                        {onlineUsers.length} members
                      </Badge>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-10 w-10 rounded-full hover:bg-gray-100">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl shadow-lg border-0">
                          <DropdownMenuItem onClick={() => setSoundEnabled(!soundEnabled)}>
                            {soundEnabled ? <Volume2 className="mr-2 h-4 w-4 text-blue-600" /> : <VolumeX className="mr-2 h-4 w-4 text-gray-400" />}
                            {soundEnabled ? "Mute Sounds" : "Enable Sounds"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="mr-2 h-4 w-4" />
                            Share Room
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages Container */}
                <div className="flex-1 relative bg-gradient-to-b from-gray-50/30 to-white overflow-hidden">
                  <ScrollArea className="absolute inset-0 px-6 py-4">
                    <div className="space-y-6 min-h-full flex flex-col justify-end">
                      {messages.map((message, index) => {
                        const isOwnMessage = message.sender_id === currentUser.user_id;
                        
                        return (
                          <div key={message.message_id || index} className="group">
                            <div className={`flex gap-3 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                              {!isOwnMessage && (
                                <Avatar className="h-10 w-10 flex-shrink-0">
                                  <AvatarFallback className="text-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                                    {getInitials(message.sender_name)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              
                              <div className={`flex flex-col max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                                <div className={`flex items-center gap-2 mb-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                                  <span className="font-medium text-sm text-gray-700">
                                    {isOwnMessage ? 'You' : message.sender_name}
                                  </span>
                                  <RealTimeTimestamp timestamp={message.timestamp} />
                                </div>
                                
                                <div className={`px-4 py-3 rounded-2xl shadow-sm break-words ${
                                  isOwnMessage 
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                                }`}>
                                  <div className="text-sm leading-relaxed">
                                    {message.content}
                                  </div>
                                  
                                  {isOwnMessage && (
                                    <div className="flex justify-end mt-1">
                                      <CheckCheck className="h-4 w-4 text-blue-200" />
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {isOwnMessage && (
                                <Avatar className="h-10 w-10 flex-shrink-0">
                                  <AvatarFallback className="text-sm bg-gradient-to-br from-green-500 to-green-600 text-white">
                                    {getInitials(currentUser.username)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-100 bg-white p-6 flex-shrink-0 relative">
                  <div className="flex items-end gap-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" className="h-10 w-10 rounded-full hover:bg-gray-100">
                        <Paperclip className="h-5 w-5 text-gray-500" />
                      </Button>
                      
                      <div className="relative">
                        <Button 
                          variant="ghost" 
                          className="h-10 w-10 rounded-full hover:bg-gray-100"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                          <Smile className="h-5 w-5 text-gray-500" />
                        </Button>
                        
                        {showEmojiPicker && <SimpleEmojiSelector />}
                      </div>
                    </div>
                    
                    <div className="flex-1 relative">
                      <Textarea
                        ref={messageInputRef}
                        placeholder={`Message ${getActiveRoomData()?.name || 'this room'}...`}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="min-h-[48px] max-h-32 resize-none pr-14 rounded-3xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
                        disabled={!activeRoom}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || !activeRoom}
                        className="absolute bottom-2 right-2 h-10 w-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full shadow-md disabled:opacity-50"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className={`h-10 w-10 rounded-full hover:bg-gray-100 ${isRecording ? 'bg-red-100 text-red-600' : ''}`}
                      onClick={() => {
                        setIsRecording(!isRecording);
                        toast({
                          title: isRecording ? "Recording Stopped" : "Recording Started",
                          description: isRecording ? "Voice message feature coming soon!" : "Voice recording feature coming soon!",
                        });
                      }}
                    >
                      {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5 text-gray-500" />}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
        
      </div>
    </>
  );
};

export default Community;
