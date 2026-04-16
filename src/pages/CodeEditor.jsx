import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../hooks/useSocket";
import Navbar from "../components/Navbar";
import ChatPanel from "../components/ChatPanel";

const CodeEditor = ({ roomId }) => {
    const { user } = useAuth();
    const socket = useSocket(roomId);
    
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [activeUsers, setActiveUsers] = useState([]);
    const [isEditorLoaded, setIsEditorLoaded] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        if (!socket) return;

        socket.on("room-state", ({ code, language, activeUsers }) => {
            setCode(code);
            setLanguage(language);
            setActiveUsers(activeUsers);
        });

        socket.on("code-change", (newCode) => {
            setCode(newCode);
        });

        socket.on("language-change", (newLang) => {
            setLanguage(newLang);
        });

        socket.on("user-joined", ({ activeUsers }) => {
            setActiveUsers(activeUsers);
        });

        socket.on("user-left", ({ activeUsers }) => {
            setActiveUsers(activeUsers);
        });

        return () => {
            socket.off("room-state");
            socket.off("code-change");
            socket.off("language-change");
            socket.off("user-joined");
            socket.off("user-left");
        };
    }, [socket]);

    const handleCodeChange = (newValue) => {
        setCode(newValue);
        socket.emit("code-change", { roomId, code: newValue });
    };

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        socket.emit("language-change", { roomId, language: newLanguage });
    };

    const handleDownloadCode = () => {
        const extensions = {
            javascript: "js", typescript: "ts", python: "py", cpp: "cpp", java: "java", html: "html", css: "css"
        };
        const extension = extensions[language] || "txt";
        const element = document.createElement("a");
        const file = new Blob([code], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = `code_${roomId}.${extension}`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="h-screen flex flex-col bg-[#0d1117] overflow-hidden selection:bg-pink-500/30"
        >
            <Navbar 
                roomId={roomId}
                language={language}
                onLanguageChange={handleLanguageChange}
                onDownload={handleDownloadCode}
                activeUsers={activeUsers}
            />

            <main className="flex-1 flex min-h-0 relative">
                {/* Editor Container */}
                <section className="flex-1 min-w-0 relative bg-[#0d1117] border-r border-[#30363d]">
                    <AnimatePresence>
                        {!isEditorLoaded && (
                            <motion.div 
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0d1117] gap-5"
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 border-2 border-pink-500/10 border-t-pink-500 rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-[0.3em]">
                                    Establishing Sync
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <div className="h-full w-full">
                        <Editor
                            height="100%"
                            theme="vs-dark"
                            language={language}
                            value={code}
                            onChange={handleCodeChange}
                            onMount={() => setIsEditorLoaded(true)}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 13,
                                fontFamily: "'JetBrains Mono', monospace",
                                cursorSmoothCaretAnimation: "on",
                                smoothScrolling: true,
                                padding: { top: 20, bottom: 20 },
                                wordWrap: "on",
                                tabSize: 4,
                                scrollBeyondLastLine: false,
                                lineNumbersMinChars: 4,
                                lineDecorationsWidth: 10,
                                backgroundColor: "#0d1117",
                                renderLineHighlight: "all",
                                scrollbar: {
                                    vertical: 'visible',
                                    horizontal: 'visible',
                                    useShadows: false,
                                    verticalWidth: 10,
                                    horizontalHeight: 10
                                }
                            }}
                        />
                    </div>
                </section>

                {/* Sidebar (Desktop Chat) */}
                <aside className="hidden xl:block w-[400px] bg-[#0d1117] flex-shrink-0 animate-fadeIn">
                    <ChatPanel socket={socket} roomId={roomId} user={user} />
                </aside>

                {/* Floating Chat Trigger (Mobile & Tablet) */}
                <button 
                    onClick={() => setIsChatOpen(true)}
                    className="xl:hidden fixed bottom-8 right-8 w-14 h-14 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl shadow-[0_8px_32px_rgba(236,72,153,0.4)] flex items-center justify-center z-40 active:scale-90 transition-all group"
                >
                    <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
                </button>

                {/* Mobile Bottom Sheet */}
                <AnimatePresence>
                    {isChatOpen && (
                        <>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsChatOpen(false)}
                                className="fixed inset-0 bg-[#0d1117]/80 backdrop-blur-md z-[60] xl:hidden"
                            />
                            <motion.div 
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="fixed bottom-0 inset-x-0 h-[85vh] bg-[#0d1117] border-t border-[#30363d] rounded-t-[40px] z-[70] xl:hidden flex flex-col shadow-[0_-20px_40px_rgba(0,0,0,0.4)]"
                            >
                                <div className="w-full flex flex-col items-center py-4 cursor-pointer" onClick={() => setIsChatOpen(false)}>
                                    <div className="w-16 h-1 bg-[#30363d] rounded-full mb-1 group-hover:bg-gray-600 transition-colors" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <ChatPanel socket={socket} roomId={roomId} user={user} />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </main>
        </motion.div>
    );
};

export default CodeEditor;
