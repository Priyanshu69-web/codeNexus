import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { UserPlus, User, Mail, Lock as LockIcon, AlertCircle, Code2 } from "lucide-react";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);
        try {
            await register(formData.username, formData.email, formData.password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-6 selection:bg-pink-500/30">
            {/* Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:1s]"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl relative z-10"
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
                    <p className="text-gray-500 font-medium">Join the community of collaborative creators.</p>
                </div>

                {/* Card */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-50"></div>
                    
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1 block">Username</label>
                                <div className="relative group/field">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-pink-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="octocat"
                                        className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/5 transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1 block">Email</label>
                                <div className="relative group/field">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-pink-500 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="dev@codenexus.com"
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
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/5 transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1 block">Confirm</label>
                                <div className="relative group/field">
                                    <LockIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-pink-500 transition-colors" size={18} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full bg-[#0d1117] border border-[#30363d] rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/5 transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-pink-500/20 active:scale-[0.98] flex items-center justify-center gap-3 mt-4 group/btn"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <UserPlus size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-10">
                    <p className="text-gray-500 text-sm font-medium">
                        Already have an account? {" "}
                        <Link to="/login" className="text-pink-500 hover:text-pink-400 underline decoration-pink-500/30 underline-offset-4 transition-colors">
                            Sign in to Nexus
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
