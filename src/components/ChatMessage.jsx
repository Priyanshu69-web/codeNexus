import { useAuth } from "../context/AuthContext";

const ChatMessage = ({ message }) => {
    const { user } = useAuth();
    const isSelf = message.user === user?._id || message.username === user?.username;
    const isSystem = message.type === "system";

    if (isSystem) {
        return (
            <div className="flex justify-center my-2">
                <span className="bg-[#21262d] text-gray-400 text-[10px] px-2 py-0.5 rounded-full border border-[#30363d]">
                    {message.text}
                </span>
            </div>
        );
    }

    return (
        <div className={`flex flex-col mb-4 ${isSelf ? "items-end" : "items-start animate-fadeIn"}`}>
            <div className="flex items-center gap-2 mb-1 px-1">
                <span className={`text-[10px] font-bold tracking-wide uppercase ${isSelf ? "text-pink-500" : "text-purple-400"}`}>
                    {isSelf ? "You" : message.username}
                </span>
                <span className="text-[10px] text-gray-600 font-medium">
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
            
            <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
                isSelf 
                ? "bg-pink-500 text-white rounded-tr-none" 
                : "bg-[#21262d] text-[#e6edf3] rounded-tl-none border border-[#30363d]"
            }`}>
                {message.text}
            </div>
        </div>
    );
};

export default ChatMessage;
