const TypingIndicator = ({ username }) => {
    if (!username) return null;

    return (
        <div className="flex items-center gap-2 px-1 mb-2 animate-fadeIn">
            <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"></span>
            </div>
            <span className="text-[10px] font-medium text-gray-500 italic">
                {username} is typing...
            </span>
        </div>
    );
};

export default TypingIndicator;
