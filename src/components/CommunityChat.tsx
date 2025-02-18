import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Image, Smile, Mic, X } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';
import { User } from '../types/user';
import { toast } from 'react-hot-toast';
import AudioMessage from './AudioMessage';

interface ChatMedia {
  type: 'image' | 'gif' | 'audio';
  url: string;
  thumbnail?: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'gif' | 'audio';
  mediaUrl?: string;
  media?: ChatMedia;
  reactions?: { [key: string]: string[] }; // userId: emoji
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

const hasRequiredPoints = (user: User | null): boolean => {
  return user?.ecoPoints ? user.ecoPoints >= 1000 : false;
};

const CommunityChat = () => {
  const { user } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const audioRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const handleClick = () => {
    if (!user || user.ecoPoints < 1000) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      setShowChat(!showChat);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (content: string, type: ChatMessage['type'] = 'text', mediaUrl?: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      userId: user?.id || '',
      username: user?.username || 'Anonymous',
      content,
      timestamp: new Date(),
      type,
      mediaUrl
    };
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim()) {
        sendMessage(newMessage);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      const mockUrl = URL.createObjectURL(file);
      sendMessage(file.name, 'image', mockUrl);
    } else {
      toast.error('File size must be less than 5MB');
    }
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setNewMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioRef.current = recorder;
      audioChunks.current = [];

      recorder.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        sendMessage('Audio message', 'audio', audioUrl);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    audioRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
      >
        <MessageCircle className="text-[#D0FD3E]" />
        {user && user.ecoPoints >= 1000 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
        )}
      </button>

      <AnimatePresence>
        {showChat && hasRequiredPoints(user) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-0 bottom-12 w-96 h-[32rem] bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-[#D0FD3E]">Global Chat</h3>
                <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.userId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${msg.userId === user?.id ? 'bg-[#D0FD3E]/20' : 'bg-white/10'} rounded-lg p-3`}>
                      <div className="text-xs text-gray-400">{msg.username}</div>
                      {msg.type === 'image' && msg.mediaUrl && (
                        <img src={msg.mediaUrl} alt="shared" className="max-w-full rounded-lg my-2" />
                      )}
                      {msg.type === 'audio' && msg.mediaUrl && (
                        <AudioMessage url={msg.mediaUrl} />
                      )}
                      <p className="text-sm">{msg.content}</p>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10">
                <div className="flex flex-col">
                  {showEmojiPicker && (
                    <div className="absolute bottom-20 right-4">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        width={300}
                        height={400}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D0FD3E]/50"
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 hover:bg-white/10 rounded-lg"
                    >
                      <Image size={20} className="text-[#D0FD3E]" />
                    </button>
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 hover:bg-white/10 rounded-lg"
                    >
                      <Smile size={20} className="text-[#D0FD3E]" />
                    </button>
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`p-2 hover:bg-white/10 rounded-lg ${isRecording ? 'text-red-500' : ''}`}
                    >
                      <Mic size={20} className={isRecording ? 'text-red-500' : 'text-[#D0FD3E]'} />
                    </button>
                    <button
                      onClick={() => {
                        if (newMessage.trim()) {
                          sendMessage(newMessage);
                        }
                      }}
                      disabled={!newMessage.trim() && !isRecording}
                      className="p-2 hover:bg-white/10 rounded-lg disabled:opacity-50"
                    >
                      <Send size={20} className="text-[#D0FD3E]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-12 w-64 p-4 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg"
          >
            <p className="text-sm text-white">
              Unlock global chat by earning 1,000 Eco-Points! Keep making a difference!
            </p>
            <div className="mt-2 text-xs text-gray-300">
              Current: {user?.ecoPoints || 0} / 1,000 points
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommunityChat;