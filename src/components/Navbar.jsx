import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
    Code2, 
    Copy, 
    Check, 
    Link as LinkIcon, 
    Download as DownloadIcon, 
    LogOut, 
    ChevronLeft 
} from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import ActiveUsers from "./ActiveUsers";

const Navbar = ({ 
    roomId = "CodeNexus", 
    language = "javascript", 
    onLanguageChange = () => {}, 
    onDownload = () => {}, 
    activeUsers = [] 
}) => {
    const [copiedId, setCopiedId] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const copyRoomId = () => {
        if (roomId === "CodeNexus") return;
        navigator.clipboard.writeText(roomId);
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
    };

    const handleLanguageChange = (newLang) => {
        if (typeof onLanguageChange === "function") {
            onLanguageChange(newLang);
        }
    };

    return (
        <nav className="h-14 bg-[#0d1117] border-b border-[#30363d] flex items-center justify-between px-6 z-50 shadow-sm flex-shrink-0">
            {/* Left: Logo & Room Info */}
            <div className="flex items-center gap-6">
                <div 
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <div className="w-8 h-8 bg-pink-500 rounded-xl flex items-center justify-center group-hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/10 group-hover:scale-105">
                        <Code2 className="w-5 h-5 text-white" />
                    </div>
                </div>
                
                <div className="h-6 w-px bg-[#30363d] hidden sm:block"></div>

                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] hidden lg:inline">Workspace</span>
                    <button 
                        onClick={copyRoomId}
                        disabled={roomId === "CodeNexus"}
                        className="flex items-center gap-3 bg-[#161b22]/50 hover:bg-[#161b22] px-3 py-1.5 rounded-xl border border-[#30363d] transition-all group active:scale-95 disabled:opacity-50 disabled:cursor-default"
                    >
                        <span className="font-mono text-xs font-bold text-gray-300 tracking-tight">{roomId}</span>
                        <div className="w-4 h-4 flex items-center justify-center">
                            {copiedId ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-300" />}
                        </div>
                    </button>
                </div>
            </div>

            {/* Right: Actions & Auth */}
            <div className="flex items-center gap-3 md:gap-6">
                {activeUsers.length > 0 && (
                    <div className="hidden md:flex items-center pr-2">
                        <ActiveUsers users={activeUsers} />
                    </div>
                )}
                
                {activeUsers.length > 0 && <div className="h-6 w-px bg-[#30363d] hidden md:block"></div>}

                <div className="flex items-center gap-2">
                    <LanguageSelector 
                        selected={language} 
                        onChange={handleLanguageChange} 
                    />

                    <button 
                        onClick={onDownload}
                        className="p-2 hover:bg-[#161b22] text-gray-400 hover:text-white rounded-xl transition-all active:scale-90 border border-transparent hover:border-[#30363d]"
                        title="Download Code"
                    >
                        <DownloadIcon className="w-4.5 h-4.5" />
                    </button>
                </div>

                <div className="h-6 w-px bg-[#30363d]"></div>

                {user ? (
                    <button 
                        onClick={() => { logout(); navigate("/login"); }}
                        className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-xl transition-all group"
                        title="Logout"
                    >
                        <LogOut className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                ) : (
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate("/login")}
                            className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all"
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => navigate("/register")}
                            className="hidden sm:block text-[11px] font-black uppercase tracking-widest bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-pink-500/20 active:scale-95"
                        >
                            Join
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
