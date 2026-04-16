import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Code2, Users, Zap, GitBranch, ArrowRight, Plus, LogOut } from "lucide-react";

const generateId = (length = 6) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

export default function HomePage() {
    const [joinId, setJoinId] = useState("");
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const createSession = () => {
        const roomId = generateId(6);
        navigate(`/${roomId}`);
    };

    const joinSession = (e) => {
        e.preventDefault();
        if (joinId.trim()) {
            navigate(`/${joinId.trim()}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0d1117] text-white overflow-hidden selection:bg-pink-500/30">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px]"></div>
            </div>

            {/* Top Navigation */}
            <nav className="w-full h-20 border-b border-[#30363d] bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-pink-500/20">
                            <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">CodeNexus</span>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 text-sm hidden sm:inline">
                                    <span className="opacity-60">Hi,</span> <span className="text-white font-medium">{user.username}</span>
                                </span>
                                <button
                                    onClick={logout}
                                    className="p-2.5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-xl transition-all active:scale-95"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                                >
                                    Log in
                                </button>
                                <button
                                    onClick={() => navigate("/register")}
                                    className="text-sm font-semibold bg-[#21262d] py-2 px-5 rounded-lg border border-[#30363d] hover:bg-[#30363d] transition-all active:scale-95"
                                >
                                    Sign up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-12">
                <div className="max-w-4xl w-full text-center space-y-12">
                    {/* Badge */}
                    <div className="animate-fadeIn opacity-0 [animation-fill-mode:forwards]">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-medium text-gray-300">
                            <Zap className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20" />
                            <span>v2.0 • Peer-to-peer code collaboration</span>
                        </div>
                    </div>

                    {/* Headline */}
                    <div className="space-y-6 animate-slideUp">
                        <h2 className="text-5xl sm:text-8xl font-black tracking-tight leading-[1.1]">
                            Better code, <br />
                            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                                built together.
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                            A minimalist, real-time code editor built for pairing and interviews. No setup required, just share a link and start coding instantly.
                        </p>
                    </div>

                    {/* CTA Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fadeIn opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
                        <button
                            onClick={createSession}
                            className="w-full sm:w-auto px-10 py-5 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl text-lg font-bold transition-all shadow-2xl shadow-pink-500/20 flex items-center justify-center gap-3 relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            <Plus className="w-6 h-6" />
                            Start Coding
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                        </button>

                        <div className="w-full sm:w-[1px] h-[1px] sm:h-12 bg-[#30363d]"></div>

                        <form onSubmit={joinSession} className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={joinId}
                                    onChange={(e) => setJoinId(e.target.value)}
                                    placeholder="Room ID"
                                    className="w-full sm:w-56 bg-[#161b22] border border-[#30363d] rounded-2xl px-6 py-5 text-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/5 transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-10 py-5 bg-[#21262d] hover:bg-[#30363d] text-white rounded-2xl text-lg font-bold transition-all border border-[#30363d] active:scale-95 shadow-xl"
                            >
                                Join Room
                            </button>
                        </form>
                    </div>

                    {/* Features Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 animate-fadeIn opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
                        {[
                            { icon: <Zap className="text-amber-400" />, title: "Instant Sync", desc: "Peer-to-peer code updates with millisecond latency." },
                            { icon: <Users className="text-sky-400" />, title: "Live Presence", desc: "See who's in the room and what they're up to." },
                            { icon: <Code2 className="text-emerald-400" />, title: "Smart Highlighting", desc: "Full support for all major programming languages." }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-[#161b22]/30 border border-[#30363d]/50 p-8 rounded-3xl hover:bg-[#161b22]/50 hover:border-pink-500/20 transition-all group backdrop-blur-sm">
                                <div className="w-14 h-14 bg-[#0d1117] rounded-2xl flex items-center justify-center mb-6 border border-[#30363d] group-hover:border-pink-500/30 group-hover:bg-[#161b22] transition-all shadow-inner">
                                    {React.cloneElement(feature.icon, { className: `w-6 h-6 ${feature.icon.props.className}` })}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="w-full py-10 px-6 border-t border-[#30363d] bg-[#0d1117]/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-center sm:items-start gap-2">
                        <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-pink-500" />
                            <span className="font-bold tracking-tight">CodeNexus</span>
                        </div>
                        <p className="text-gray-500 text-xs">
                            © 2026 CodeNexus • Built for collaborative coding.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <a href="#" className="p-2 bg-[#161b22] border border-[#30363d] rounded-lg text-gray-400 hover:text-white transition-all hover:scale-110">
                            <GitBranch className="w-5 h-5" />
                        </a>
                        <div className="flex items-center gap-4">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Platform Online</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
