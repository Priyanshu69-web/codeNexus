import { useState, useEffect, useRef } from "react";
import { Send, MessageSquareOff, MessageSquare, Lock as LockIcon } from "lucide-react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import API from "../utils/api";

const ChatPanel = ({ socket, roomId, user }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [typingUser, setTypingUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    // Fetch message history
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await API.get(`/room/${roomId}/messages`);
                setMessages(data);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, [roomId]);

    // Socket listeners
    useEffect(() => {
        if (!socket) return;

        socket.on("receive-message", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        socket.on("user-joined", ({ message, username }) => {
            setMessages((prev) => [...prev, {
                _id: Date.now(),
                type: "system",
                text: message,
                createdAt: new Date().toISOString()
            }]);
        });

        socket.on("user-left", ({ message, username }) => {
            if (message) {
                setMessages((prev) => [...prev, {
                    _id: Date.now(),
                    type: "system",
                    text: message,
                    createdAt: new Date().toISOString()
                }]);
            }
        });

        socket.on("user-typing", ({ username }) => {
            setTypingUser(username);
        });

        socket.on("user-stop-typing", () => {
            setTypingUser(null);
        });

        return () => {
            socket.off("receive-message");
            socket.off("user-joined");
            socket.off("user-left");
            socket.off("user-typing");
            socket.off("user-stop-typing");
        };
    }, [socket]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typingUser]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        socket.emit("send-message", {
            roomId,
            userId: user._id,
            username: user.username,
            text: inputText
        });

        setInputText("");
        socket.emit("stop-typing", { roomId });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSendMessage(e);
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);

        socket.emit("typing", { roomId, username: user.username });

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("stop-typing", { roomId });
        }, 3000);
    };

    return (
        <div className="flex flex-col h-full bg-[#0d1117] border-l border-[#30363d] overflow-hidden">
            {/* Header */}
            <div className="h-14 px-4 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117] flex-shrink-0">
                <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-pink-500" />
                    <span className="font-bold text-[10px] uppercase tracking-widest text-gray-400">Live Chat</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-0.5 bg-green-500/10 rounded border border-green-500/20">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Live</span>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 custom-scrollbar relative">
                {!user ? (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 bg-[#0d1117]/80 backdrop-blur-md text-center">
                        <div className="w-16 h-16 bg-[#161b22] rounded-2xl flex items-center justify-center mb-6 border border-[#30363d]">
                            <LockIcon className="w-8 h-8 text-pink-500" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2 tracking-tight">Members Only Chat</h4>
                        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                            Sign in to join the conversation and see what others are saying.
                        </p>
                        <div className="flex flex-col w-full gap-3">
                            <button
                                onClick={() => window.location.href = "/login"}
                                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-pink-500/20"
                            >
                                Log in
                            </button>
                            <button
                                onClick={() => window.location.href = "/register"}
                                className="w-full bg-[#21262d] hover:bg-[#30363d] text-white font-bold py-3 rounded-xl transition-all border border-[#30363d] active:scale-95"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                ) : loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Hydrating...</span>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-30">
                        <MessageSquareOff className="w-12 h-12 mb-4 text-gray-600" />
                        <h4 className="font-bold text-gray-400 mb-1">Quiet room</h4>
                        <p className="text-xs text-gray-500">Break the ice and start talking!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <ChatMessage key={msg._id} message={msg} isOwn={msg.user === user?._id} />
                        ))}
                        <TypingIndicator username={typingUser} />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input - Only for Authenticated Users */}
            {user && (
                <div className="p-4 bg-[#0d1117] border-t border-[#30363d] flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="relative">
                        <textarea
                            value={inputText}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Message..."
                            className="w-full bg-[#161b22] border border-[#30363d] rounded-xl py-3 pl-4 pr-12 text-sm text-[#e6edf3] placeholder:text-gray-600 outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all resize-none min-h-[44px] max-h-32"
                            rows="1"
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="absolute right-2 top-1.5 p-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-20 text-white rounded-lg transition-all active:scale-95 shadow-lg shadow-pink-500/20"
                        >
                            <Send size={15} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatPanel;
