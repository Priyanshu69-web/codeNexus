import { Users } from "lucide-react";

const ActiveUsers = ({ users = [] }) => {
    // Show top 5 avatars instead of 3 for premium feel
    const displayUsers = users.slice(0, 5);
    const extraCount = users.length > 5 ? users.length - 5 : 0;

    return (
        <div className="flex items-center gap-4">
            <div className="flex -space-x-3 overflow-hidden">
                {displayUsers.map((u, i) => {
                    const isGuest = u.username.startsWith("Guest");
                    return (
                        <div 
                            key={u.socketId || i}
                            className={`inline-block h-8 w-8 rounded-full ring-2 ring-[#0d1117] flex items-center justify-center text-[10px] font-bold text-white border border-[#30363d] relative group transition-transform hover:scale-110 hover:z-50 cursor-default ${
                                isGuest 
                                ? "bg-gradient-to-br from-gray-700 to-gray-900" 
                                : "bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20"
                            }`}
                        >
                            {u.username.charAt(0).toUpperCase()}
                            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-[#0d1117] rounded-full ${isGuest ? "bg-gray-500" : "bg-green-500"}`}></span>
                            
                            {/* Tooltip */}
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#161b22] text-white text-[10px] py-1.5 px-3 rounded-lg border border-[#30363d] whitespace-nowrap z-[100] shadow-2xl font-bold uppercase tracking-wider">
                                {u.username}
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {extraCount > 0 && (
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-[#161b22] px-2 py-1 rounded-md border border-[#30363d]">
                    +{extraCount} more
                </span>
            )}
            
            {users.length === 0 && (
                <div className="flex items-center gap-2 text-gray-500 bg-[#161b22] px-3 py-1 rounded-full border border-[#30363d]">
                    <Users size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Single Mode</span>
                </div>
            )}
        </div>
    );
};

export default ActiveUsers;
