import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { MessageCircle, Search, Plus, ArrowLeft, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

interface ChatRoom {
  id: number;
  name: string;
  country: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  avatar?: string;
}

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const mockChatRooms: ChatRoom[] = [
  {
    id: 1,
    name: "사라 (Sarah)",
    country: "🇺🇸",
    lastMessage: "한국어 문법 질문이 있어요!",
    timestamp: "10분 전",
    unreadCount: 2,
    isOnline: true
  },
  {
    id: 2,
    name: "리나 (Lina)",
    country: "🇻🇳",
    lastMessage: "오늘 시간 있으세요?",
    timestamp: "1시간 전",
    unreadCount: 0,
    isOnline: true
  },
  {
    id: 3,
    name: "마리아 (Maria)",
    country: "🇵🇭",
    lastMessage: "감사합니다! 정말 도움이 되었어요",
    timestamp: "2시간 전",
    unreadCount: 0,
    isOnline: false
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    senderId: 1,
    content: "안녕하세요! 한국어 공부하고 있는 사라예요",
    timestamp: "14:30",
    isOwn: false
  },
  {
    id: 2,
    senderId: 2,
    content: "안녕하세요 사라! 저는 영어 배우고 싶어요",
    timestamp: "14:32",
    isOwn: true
  },
  {
    id: 3,
    senderId: 1,
    content: "좋아요! 서로 도와주면 좋겠어요 😊",
    timestamp: "14:33",
    isOwn: false
  },
  {
    id: 4,
    senderId: 1,
    content: "한국어 문법 질문이 있어요!",
    timestamp: "14:45",
    isOwn: false
  }
];

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const selectedChat = mockChatRooms.find(room => room.id === selectedChatId);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChatId) return;

    const message: Message = {
      id: messages.length + 1,
      senderId: 2, // current user
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (selectedChatId && selectedChat) {
    return (
      <Layout>
        <div className="space-y-4">
          {/* Chat Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedChatId(null)}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-primary text-white">
                {selectedChat.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">{selectedChat.name}</h2>
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedChat.country}</span>
                <div className={`w-2 h-2 rounded-full ${
                  selectedChat.isOnline ? "bg-green-500" : "bg-gray-400"
                }`} />
                <span className="text-sm text-muted-foreground">
                  {selectedChat.isOnline ? "온라인" : "오프라인"}
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-3 min-h-[400px] max-h-[400px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] ${message.isOwn ? "order-1" : "order-2"}`}>
                  <div
                    className={`p-3 rounded-2xl ${
                      message.isOwn
                        ? "bg-gradient-primary text-white ml-auto"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <p className={`text-xs text-muted-foreground mt-1 ${
                    message.isOwn ? "text-right" : "text-left"
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex gap-2 items-end pt-4 border-t border-border">
            <Textarea
              placeholder="메시지를 입력하세요..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 min-h-[44px] max-h-[120px] resize-none bg-card border-border"
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-primary hover:opacity-90 text-white border-0 shadow-soft"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">채팅</h1>
          <Button className="bg-gradient-primary hover:opacity-90 text-white border-0 shadow-soft">
            <Plus className="h-4 w-4 mr-2" />
            새 채팅
          </Button>
        </div>

        {/* Chat Rooms */}
        <div className="space-y-3">
          {mockChatRooms.map((room) => (
            <Card 
              key={room.id} 
              className="p-4 border-0 shadow-card hover:shadow-floating transition-spring cursor-pointer bg-gradient-card"
              onClick={() => setSelectedChatId(room.id)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={room.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {room.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    room.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{room.name}</h3>
                      <span className="text-lg">{room.country}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{room.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate flex-1">
                      {room.lastMessage}
                    </p>
                    {room.unreadCount > 0 && (
                      <Badge className="bg-primary text-primary-foreground ml-2">
                        {room.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {mockChatRooms.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">채팅방이 없습니다.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Chat;