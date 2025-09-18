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
  UserPlus,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Video,
  Phone,
  Info,
  Bell,
  Star,
  Archive,
  Trash2,
  Edit3,
  Share,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  ChevronDown,
  Check,
  CheckCheck
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

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
}

interface User {
  user_id: string;
  username: string;
  email: string;
  avatar_url?: string;
}

// Google Chat-style Auto-Scroll Hook
const useFixedChatScroll = (messages: Message[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolled, setIsUserScrolled] = useState(false);
  
  useEffect(() => {
    if (!isUserScrolled && messagesEndRef.current && containerRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isUserScrolled]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
    
    setIsUserScrolled(!isAtBottom);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsUserScrolled(false);
    }
  };

  return { containerRef, messagesEndRef, isUserScrolled, handleScroll, scrollToBottom };
};

// WebSocket Hook (keeping working version)
const useWebSocket = (userId: string, onMessage: (msg: Message) => void) => {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3;
  const isManualDisconnect = useRef(false);
  
  const onMessageRef = useRef(onMessage);
  
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const connect = useRef(() => {
    if (wsRef.current?.readyState === WebSocket.CONNECTING || 
        wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    if (reconnectAttempts.current >= maxReconnectAttempts) {
      return;
    }

    try {
      const wsUrl = `ws://localhost:8000/api/chat/ws/${encodeURIComponent(userId)}`;
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        setIsConnected(true);
        reconnectAttempts.current = 0;
        isManualDisconnect.current = false;
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'message') {
            onMessageRef.current(data.data);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      wsRef.current.onclose = (event) => {
        setIsConnected(false);
        
        if (!isManualDisconnect.current && 
            reconnectAttempts.current < maxReconnectAttempts &&
            event.code !== 1000) {
          
          reconnectAttempts.current++;
          const delay = Math.min(2000 * reconnectAttempts.current, 10000);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect.current();
          }, delay);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

    } catch (error) {
      console.error('Failed to create WebSocket:', error);
    }
  });

  const sendMessage = useRef((roomId: string, content: string, senderName: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        data: { room_id: roomId, content, sender_name: senderName, message_type: 'text' }
      }));
    }
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
    isManualDisconnect.current = true;
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.close(1000, 'User disconnected');
    }
    
    wsRef.current = null;
    setIsConnected(false);
    reconnectAttempts.current = 0;
  });

  useEffect(() => {
    if (userId) {
      connect.current();
    }

    return () => {
      disconnect.current();
    };
  }, [userId]);

  return { 
    isConnected, 
    sendMessage: sendMessage.current, 
    joinRoom: joinRoom.current 
  };
};

const Community: React.FC = () => {
  // State management
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeRoom, setActiveRoom] = useState<string>("");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [newRoomType, setNewRoomType] = useState("general");
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Refs
  const activeRoomRef = useRef(activeRoom);
  const soundEnabledRef = useRef(soundEnabled);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Google Chat-style scroll
  const { containerRef, messagesEndRef, isUserScrolled, handleScroll, scrollToBottom } = useFixedChatScroll(messages);

  // User data
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const currentUser: User = user
    ? {
        user_id: user.user_id,
        username: user.firstName,
        email: user.email,
        avatar_url: ""
      }
    : {
        user_id: "",
        username: "",
        email: "",
        avatar_url: ""
      };

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/sign-in');
    }
  }, [navigate]);

  // Update refs when state changes
  useEffect(() => {
    activeRoomRef.current = activeRoom;
  }, [activeRoom]);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // WebSocket connection
  const { isConnected, sendMessage, joinRoom } = useWebSocket(
    currentUser.user_id,
    React.useCallback((message: Message) => {
      if (message.room_id === activeRoomRef.current) {
        setMessages(prev => [...prev, message]);
        
        if (soundEnabledRef.current && message.sender_id !== currentUser.user_id) {
          console.log('🔊 New message notification');
        }
      }
    }, [currentUser.user_id])
  );

  // API functions
  const fetchRooms = React.useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/chat/rooms');
      const data = await response.json();
      setRooms(data);
      if (data.length > 0 && !activeRoom) {
        setActiveRoom(data[0].room_id);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast({
        title: "Connection Error",
        description: "Failed to load chat rooms.",
        variant: "destructive",
      });
    }
  }, [activeRoom, toast]);

  const fetchMessages = React.useCallback(async (roomId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/chat/rooms/${roomId}/messages`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  // Create new room
  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;

    try {
      const response = await fetch('http://localhost:8000/api/chat/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: newRoomName,
          description: newRoomDescription,
          room_type: newRoomType
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setRooms(prev => [result.data.room, ...prev]);
        setShowCreateRoom(false);
        setNewRoomName("");
        setNewRoomDescription("");
        setNewRoomType("general");
        toast({
          title: "Room Created",
          description: `${newRoomName} created successfully!`,
        });
      }
    } catch (error) {
      console.error('Error creating room:', error);
      toast({
        title: "Error",
        description: "Failed to create room.",
        variant: "destructive",
      });
    }
  };

  // Send message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeRoom || !isConnected) return;

    sendMessage(activeRoom, newMessage.trim(), currentUser.username);
    setNewMessage("");
    messageInputRef.current?.focus();
  };

  // Handle room change
  const handleRoomChange = (roomId: string) => {
    setActiveRoom(roomId);
    joinRoom(roomId);
    fetchMessages(roomId);
  };

  // Effects
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    if (activeRoom && isConnected) {
      joinRoom(activeRoom);
      fetchMessages(activeRoom);
    }
  }, [activeRoom, isConnected, joinRoom, fetchMessages]);

  useEffect(() => {
    if (rooms.length > 0) {
      setIsLoading(false);
    }
  }, [rooms]);

  // Utility functions
  const getActiveRoomData = () => rooms.find(room => room.room_id === activeRoom);
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoomIcon = (roomType: string) => {
    const icons = {
      general: 'tag',
      course: 'chat',
      study_group: 'groups',
      help: 'help',
      project: 'star'
    };
    return icons[roomType as keyof typeof icons] || 'tag';
  };

  if (isLoading) {
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
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
              <div 
                className="text-2xl text-gray-700 mb-2"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Loading Community
              </div>
              <div 
                className="text-gray-500"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Connecting to Google Chat...
              </div>
            </div>
          </div>
          <Footer />
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
        
        <main className="container mx-auto px-6 py-8 max-w-8xl">
          {/* Google Chat-style Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="material-icons text-white text-2xl">forum</span>
                  </div>
                  <div>
                    <h1 
                      className="text-4xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Student Community
                    </h1>
                    <p 
                      className="text-lg text-gray-600"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      Connect, collaborate, and learn together
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge 
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    isConnected 
                      ? "bg-green-100 text-green-700 border border-green-200" 
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  {isConnected ? (
                    <>
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="material-icons text-sm">wifi</span>
                      Online
                    </>
                  ) : (
                    <>
                      <span className="material-icons text-sm">wifi_off</span>
                      Offline
                    </>
                  )}
                </Badge>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 rounded-full border-2 border-gray-300 hover:bg-blue-50 hover:border-blue-300 h-10 px-4"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  <span className="material-icons text-base">notifications</span>
                  Notifications
                </Button>
              </div>
            </div>
          </div>

          {/* Google Chat Layout */}
          <div 
            className="grid grid-cols-12 gap-8" 
            style={{ height: '700px' }}
          >
            {/* Google Chat-style Sidebar */}
            <div className="col-span-12 lg:col-span-4 h-full">
              <Card className="h-full flex flex-col border-0 rounded-3xl shadow-lg bg-white">
                <CardHeader className="p-6 border-b border-gray-100 flex-shrink-0">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle 
                      className="text-xl font-medium flex items-center gap-3 text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      <span className="material-icons text-blue-600 text-xl">chat</span>
                      Chat Rooms
                    </CardTitle>
                    
                    <Dialog open={showCreateRoom} onOpenChange={setShowCreateRoom}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                        >
                          <span className="material-icons text-lg">add</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg border-0 rounded-3xl shadow-2xl">
                        <DialogHeader className="p-6">
                          <DialogTitle 
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                            className="text-2xl font-medium text-gray-900"
                          >
                            Create New Room
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 p-6 pt-0">
                          <div>
                            <Label 
                              htmlFor="roomName"
                              className="text-base font-medium text-gray-900"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Room Name
                            </Label>
                            <Input
                              id="roomName"
                              value={newRoomName}
                              onChange={(e) => setNewRoomName(e.target.value)}
                              placeholder="Enter room name"
                              className="mt-2 h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            />
                          </div>
                          <div>
                            <Label 
                              htmlFor="roomDescription"
                              className="text-base font-medium text-gray-900"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Description
                            </Label>
                            <Textarea
                              id="roomDescription"
                              value={newRoomDescription}
                              onChange={(e) => setNewRoomDescription(e.target.value)}
                              placeholder="Describe your room"
                              className="mt-2 rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            />
                          </div>
                          <div>
                            <Label 
                              className="text-base font-medium text-gray-900"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Room Type
                            </Label>
                            <RadioGroup value={newRoomType} onValueChange={setNewRoomType} className="mt-3">
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="general" id="general" />
                                <Label htmlFor="general" style={{ fontFamily: 'Roboto, sans-serif' }}>General</Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="course" id="course" />
                                <Label htmlFor="course" style={{ fontFamily: 'Roboto, sans-serif' }}>Course</Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="study_group" id="study_group" />
                                <Label htmlFor="study_group" style={{ fontFamily: 'Roboto, sans-serif' }}>Study Group</Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="help" id="help" />
                                <Label htmlFor="help" style={{ fontFamily: 'Roboto, sans-serif' }}>Help & Support</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button 
                              onClick={handleCreateRoom} 
                              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Create Room
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setShowCreateRoom(false)}
                              className="flex-1 h-12 rounded-2xl border-2 border-gray-300"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="relative">
                    <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">search</span>
                    <Input
                      placeholder="Search rooms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    />
                  </div>
                </CardHeader>
                
                {/* Room List */}
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
                            <div 
                              className="font-medium text-base truncate"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              {room.name}
                            </div>
                            <div 
                              className={`text-sm truncate ${
                                activeRoom === room.room_id ? 'text-blue-100' : 'text-gray-500'
                              }`}
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
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

            {/* Google Chat-style Main Chat Area */}
            <div className="col-span-12 lg:col-span-8 h-full">
              <Card className="h-full flex flex-col border-0 rounded-3xl shadow-lg bg-white">
                {/* Google Chat Header */}
                <CardHeader className="p-6 border-b border-gray-100 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-blue-50">
                        <span className="material-icons text-blue-600 text-xl">
                          {getRoomIcon(getActiveRoomData()?.room_type || "general")}
                        </span>
                      </div>
                      <div>
                        <CardTitle 
                          className="text-2xl font-medium text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          {getActiveRoomData()?.name || "Select a room"}
                        </CardTitle>
                        <p 
                          className="text-gray-600"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          {getActiveRoomData()?.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge 
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-300"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <span className="material-icons text-sm">groups</span>
                        {getActiveRoomData()?.member_count || 0} members
                      </Badge>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="h-10 w-10 rounded-full hover:bg-gray-100"
                          >
                            <span className="material-icons">more_vert</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl shadow-lg border-0">
                          <DropdownMenuItem onClick={() => setSoundEnabled(!soundEnabled)}>
                            <span className={`material-icons mr-2 ${soundEnabled ? 'text-blue-600' : 'text-gray-400'}`}>
                              {soundEnabled ? 'volume_up' : 'volume_off'}
                            </span>
                            {soundEnabled ? "Mute Sounds" : "Enable Sounds"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span className="material-icons mr-2">share</span>
                            Share Room
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                {/* Google Chat Messages Container */}
                <div className="flex-1 relative bg-gradient-to-b from-gray-50/30 to-white overflow-hidden">
                  <div 
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="absolute inset-0 overflow-y-auto px-6 py-4"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    <div className="space-y-6 min-h-full flex flex-col justify-end">
                      {messages.map((message, index) => {
                        const isOwnMessage = message.sender_id === currentUser.user_id;
                        
                        return (
                          <div key={message.message_id} className="group">
                            <div className={`flex gap-3 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                              {!isOwnMessage && (
                                <Avatar className="h-10 w-10 flex-shrink-0">
                                  <AvatarImage src="" />
                                  <AvatarFallback 
                                    className="text-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                                  >
                                    {getInitials(message.sender_name)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              
                              <div className={`flex flex-col max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                                <div className={`flex items-center gap-2 mb-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                                  <span 
                                    className="font-medium text-sm text-gray-700"
                                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                                  >
                                    {isOwnMessage ? 'You' : message.sender_name}
                                  </span>
                                  <span 
                                    className="text-xs text-gray-500"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                  >
                                    {formatTime(message.timestamp)}
                                  </span>
                                  {message.is_edited && (
                                    <Badge variant="secondary" className="text-xs">edited</Badge>
                                  )}
                                </div>
                                
                                <div className={`px-4 py-3 rounded-2xl shadow-sm break-words ${
                                  isOwnMessage 
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                                }`}>
                                  <div 
                                    className="text-sm leading-relaxed"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                  >
                                    {message.content}
                                  </div>
                                  
                                  {isOwnMessage && (
                                    <div className="flex justify-end mt-1">
                                      <span className="material-icons text-blue-200 text-sm">done_all</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {isOwnMessage && (
                                <Avatar className="h-10 w-10 flex-shrink-0">
                                  <AvatarImage src="" />
                                  <AvatarFallback 
                                    className="text-sm bg-gradient-to-br from-green-500 to-green-600 text-white"
                                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                                  >
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
                  </div>

                  {/* Scroll to Bottom Button */}
                  {isUserScrolled && (
                    <div className="absolute bottom-20 right-6">
                      <Button
                        onClick={scrollToBottom}
                        className="h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      >
                        <span className="material-icons">keyboard_arrow_down</span>
                      </Button>
                    </div>
                  )}

                  {/* Google Chat-style Typing Indicator */}
                  {isTyping && (
                    <div className="absolute bottom-20 left-6">
                      <div className="flex items-center gap-3 text-sm text-gray-500 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-gray-200">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                        </div>
                        <span style={{ fontFamily: 'Roboto, sans-serif' }}>Someone is typing...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Google Chat-style Message Input */}
                <div className="border-t border-gray-100 bg-white p-6 flex-shrink-0">
                  <div className="flex items-end gap-3">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        className="h-10 w-10 rounded-full hover:bg-gray-100"
                      >
                        <span className="material-icons text-gray-500">attach_file</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="h-10 w-10 rounded-full hover:bg-gray-100"
                      >
                        <span className="material-icons text-gray-500">emoji_emotions</span>
                      </Button>
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
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                        disabled={!activeRoom || !isConnected}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || !activeRoom || !isConnected}
                        className="absolute bottom-2 right-2 h-10 w-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full shadow-md disabled:opacity-50"
                      >
                        <span className="material-icons text-lg">send</span>
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="h-10 w-10 rounded-full hover:bg-gray-100"
                    >
                      <span className="material-icons text-gray-500">mic</span>
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
