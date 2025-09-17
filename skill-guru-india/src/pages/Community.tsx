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

// PERFECT: Fixed Height Auto-Scroll Hook
const useFixedChatScroll = (messages: Message[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolled, setIsUserScrolled] = useState(false);
  
  // Auto scroll to bottom for new messages (only if user hasn't manually scrolled up)
  useEffect(() => {
    if (!isUserScrolled && messagesEndRef.current && containerRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isUserScrolled]);

  // Handle scroll detection
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 10; // 10px threshold
    
    setIsUserScrolled(!isAtBottom);
  };

  // Force scroll to bottom
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

  // PERFECT: Fixed height chat scroll
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
      general: Hash,
      course: MessageCircle, 
      study_group: Users,
      help: Info,
      project: Star
    };
    const IconComponent = icons[roomType as keyof typeof icons] || Hash;
    return <IconComponent className="h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-xl text-slate-600">Loading community...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  🎓
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Student Community</h1>
                  <p className="text-slate-600">Connect, collaborate, and learn together</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                variant={isConnected ? "default" : "destructive"} 
                className="flex items-center gap-2 px-3 py-1.5"
              >
                {isConnected ? (
                  <>
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                    <Wifi className="h-3 w-3" />
                    Online
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3 w-3" />
                    Offline
                  </>
                )}
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
            </div>
          </div>
        </div>

        {/* PERFECT: Fixed Height Chat Layout */}
        <div 
          className="grid grid-cols-12 gap-6" 
          style={{ height: '600px' }} // FIXED HEIGHT - No stretching!
        >
          {/* Sidebar - Room List */}
          <div className="col-span-12 lg:col-span-3 h-full">
            <Card className="h-full flex flex-col shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4 border-b border-slate-200/60 flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    Chat Rooms
                  </CardTitle>
                  <Dialog open={showCreateRoom} onOpenChange={setShowCreateRoom}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New Room</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label htmlFor="roomName">Room Name</Label>
                          <Input
                            id="roomName"
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            placeholder="Enter room name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="roomDescription">Description</Label>
                          <Textarea
                            id="roomDescription"
                            value={newRoomDescription}
                            onChange={(e) => setNewRoomDescription(e.target.value)}
                            placeholder="Describe your room"
                          />
                        </div>
                        <div>
                          <Label>Room Type</Label>
                          <RadioGroup value={newRoomType} onValueChange={setNewRoomType}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="general" id="general" />
                              <Label htmlFor="general">General</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="course" id="course" />
                              <Label htmlFor="course">Course</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="study_group" id="study_group" />
                              <Label htmlFor="study_group">Study Group</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="help" id="help" />
                              <Label htmlFor="help">Help & Support</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleCreateRoom} className="flex-1">
                            Create Room
                          </Button>
                          <Button variant="outline" onClick={() => setShowCreateRoom(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardHeader>
              
              {/* FIXED: Scrollable Room List */}
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-1 p-4">
                  {filteredRooms.map((room) => (
                    <div
                      key={room.room_id}
                      onClick={() => handleRoomChange(room.room_id)}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${
                        activeRoom === room.room_id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          activeRoom === room.room_id 
                            ? 'bg-white/20' 
                            : 'bg-blue-500/10 text-blue-600'
                        }`}>
                          {getRoomIcon(room.room_type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{room.name}</div>
                          <div className={`text-xs truncate ${
                            activeRoom === room.room_id ? 'text-blue-100' : 'text-slate-500'
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

          {/* PERFECT: Fixed Height Chat Area */}
          <div className="col-span-12 lg:col-span-9 h-full">
            <Card className="h-full flex flex-col shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              {/* Chat Header - FIXED HEIGHT */}
              <CardHeader className="pb-4 border-b border-slate-200/60 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600">
                      {getRoomIcon(getActiveRoomData()?.room_type || "general")}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-slate-900">
                        {getActiveRoomData()?.name || "Select a room"}
                      </CardTitle>
                      <p className="text-sm text-slate-600">
                        {getActiveRoomData()?.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="flex items-center gap-1.5">
                      <Users className="h-3 w-3" />
                      {getActiveRoomData()?.member_count || 0} members
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSoundEnabled(!soundEnabled)}>
                          {soundEnabled ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
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

              {/* PERFECT: Fixed Height Messages Container - THIS IS THE KEY! */}
              <div className="flex-1 relative bg-gradient-to-b from-slate-50/30 to-white/50 overflow-hidden">
                {/* Messages scroll container with FIXED HEIGHT */}
                <div 
                  ref={containerRef}
                  onScroll={handleScroll}
                  className="absolute inset-0 overflow-y-auto px-6 py-4" // ABSOLUTE positioning for fixed height
                  style={{ scrollBehavior: 'smooth' }}
                >
                  <div className="space-y-4 min-h-full flex flex-col justify-end">
                    {messages.map((message, index) => {
                      const isOwnMessage = message.sender_id === currentUser.user_id;
                      
                      return (
                        <div key={message.message_id} className="group">
                          <div className={`flex gap-3 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                            {!isOwnMessage && (
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src="" />
                                <AvatarFallback className="text-xs bg-blue-500 text-white">
                                  {getInitials(message.sender_name)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div className={`flex flex-col max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                              <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                                <span className="font-medium text-sm text-slate-700">
                                  {isOwnMessage ? 'You' : message.sender_name}
                                </span>
                                <span className="text-xs text-slate-500">
                                  {formatTime(message.timestamp)}
                                </span>
                                {message.is_edited && (
                                  <Badge variant="secondary" className="text-xs">edited</Badge>
                                )}
                              </div>
                              
                              <div className={`px-4 py-3 rounded-2xl shadow-sm border break-words ${
                                isOwnMessage 
                                  ? 'bg-blue-600 text-white border-blue-600' 
                                  : 'bg-white text-slate-800 border-slate-200'
                              }`}>
                                <div className="text-sm leading-relaxed">
                                  {message.content}
                                </div>
                                
                                {isOwnMessage && (
                                  <div className="flex justify-end mt-1">
                                    <CheckCheck className="h-3 w-3 text-blue-200" />
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {isOwnMessage && (
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src="" />
                                <AvatarFallback className="text-xs bg-green-500 text-white">
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
                      size="sm"
                      className="h-10 w-10 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white p-0"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="absolute bottom-16 left-6">
                    <div className="flex items-center gap-3 text-sm text-slate-500 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                      </div>
                      <span>Someone is typing...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input - FIXED HEIGHT */}
              <div className="border-t border-slate-200/60 bg-white/80 backdrop-blur-sm p-4 flex-shrink-0">
                <div className="flex items-end gap-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                      <Paperclip className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                      <Smile className="h-4 w-4 text-slate-500" />
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
                      className="min-h-[44px] max-h-32 resize-none pr-12 rounded-xl"
                      disabled={!activeRoom || !isConnected}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || !activeRoom || !isConnected}
                      className="absolute bottom-2 right-2 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 rounded-lg"
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                    <Mic className="h-4 w-4 text-slate-500" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
      </main>

    </div>
  );
};

export default Community;
