import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock as LockIcon, AlertCircle, Code2 } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-6 selection:bg-pink-500/30">
            {/* Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse [animation-delay:1s]"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <div 
                        onClick={() => navigate("/")}
                        className="inline-flex items-center gap-3 cursor-pointer group mb-4"
                    >
                        <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-white">CodeNexus</h1>
                    </div>
                    <p className="text-gray-500 font-medium">Welcome back, developer.</p>
                </div>

                {/* Card */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-[32px] p-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600 opacity-50"></div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-medium animate-shake"
                            >
                                <AlertCircle size={18} />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1 block">Email Address</label>
                            <div className="relative group/field">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-pink-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/5 transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1 block">Password</label>
                            <div className="relative group/field">
                                <LockIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-pink-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/5 transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-500/50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-pink-500/20 active:scale-[0.98] flex items-center justify-center gap-3 group/btn"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm font-medium">
                        New here? {" "}
                        <Link to="/register" className="text-pink-500 hover:text-pink-400 underline decoration-pink-500/30 underline-offset-4 transition-colors">
                            Create a free account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
