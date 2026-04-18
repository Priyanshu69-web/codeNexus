import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, PanelRightClose, PanelRightOpen } from "lucide-react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../hooks/useSocket";
import Navbar from "../components/Navbar";
import ChatPanel from "../components/ChatPanel";
import { COLORS } from "../theme/theme";

const MotionBox = motion(Box);

const CodeEditor = ({ roomId }) => {
  const { user } = useAuth();
  const socket = useSocket(roomId);

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [activeUsers, setActiveUsers] = useState([]);
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  // ─── Chat panel: collapsed by default ────────────────────────────────────────
  const [chatOpen, setChatOpen] = useState(false);
  // Mobile bottom sheet
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on("room-state", ({ code, language, activeUsers }) => {
      setCode(code);
      setLanguage(language);
      setActiveUsers(activeUsers);
    });
    socket.on("code-change",     (newCode) => setCode(newCode));
    socket.on("language-change", (newLang) => setLanguage(newLang));
    socket.on("user-joined",     ({ activeUsers }) => setActiveUsers(activeUsers));
    socket.on("user-left",       ({ activeUsers }) => setActiveUsers(activeUsers));

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
    socket?.emit("code-change", { roomId, code: newValue });
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    socket?.emit("language-change", { roomId, language: newLang });
  };

  const handleDownload = () => {
    const ext = {
      javascript: "js", typescript: "ts", python: "py",
      cpp: "cpp", java: "java", html: "html", css: "css",
      go: "go", rust: "rs", ruby: "rb", php: "php", csharp: "cs",
    };
    const blob = new Blob([code], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = `code_${roomId}.${ext[language] || "txt"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: COLORS.bg.primary,
        overflow: "hidden",
      }}
    >
      {/* ── Top Navbar ── */}
      <Navbar
        roomId={roomId}
        language={language}
        onLanguageChange={handleLanguageChange}
        onDownload={handleDownload}
        activeUsers={activeUsers}
      />

      {/* ── Main content row ── */}
      <Box sx={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>

        {/* ── Code Editor ── */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            position: "relative",
            bgcolor: COLORS.bg.primary,
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Loading overlay */}
          <AnimatePresence>
            {!isEditorLoaded && (
              <MotionBox
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: COLORS.bg.primary,
                  gap: 2.5,
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: `2px solid ${alpha(COLORS.accent.pink, 0.12)}`,
                      borderTopColor: COLORS.accent.pink,
                      animation: "spin 0.8s linear infinite",
                      "@keyframes spin": { to: { transform: "rotate(360deg)" } },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                        animation: "pulse-dot 1.5s ease infinite",
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  component="span"
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    color: COLORS.text.muted,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  Establishing Sync
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>

          <Editor
            height="100%"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={handleCodeChange}
            onMount={() => setIsEditorLoaded(true)}
            options={{
              minimap:                    { enabled: false },
              fontSize:                   14,
              fontFamily:                 "'JetBrains Mono', 'Fira Code', monospace",
              fontLigatures:              true,
              cursorSmoothCaretAnimation: "on",
              smoothScrolling:            true,
              padding:                    { top: 20, bottom: 20 },
              wordWrap:                   "on",
              tabSize:                    2,
              scrollBeyondLastLine:       false,
              lineNumbersMinChars:        4,
              lineDecorationsWidth:       10,
              renderLineHighlight:        "all",
              bracketPairColorization:    { enabled: true },
              guides:                     { bracketPairs: true },
              scrollbar: {
                vertical:        "visible",
                horizontal:      "visible",
                useShadows:      false,
                verticalWidth:   6,
                horizontalHeight:6,
              },
            }}
          />

          {/* ── Chat Toggle Button (Desktop) ── */}
          <Tooltip
            title={chatOpen ? "Collapse chat" : "Open chat"}
            placement="left"
            arrow
          >
            <Box
              onClick={() => setChatOpen((p) => !p)}
              sx={{
                display: { xs: "none", xl: "flex" },
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
                zIndex: 30,
                width: 28,
                height: 72,
                borderRadius: "8px 0 0 8px",
                background: chatOpen
                  ? alpha(COLORS.accent.pink, 0.15)
                  : alpha(COLORS.bg.elevated, 0.9),
                border: `1px solid ${chatOpen ? alpha(COLORS.accent.pink, 0.3) : COLORS.border}`,
                borderRight: "none",
                backdropFilter: "blur(8px)",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.25s ease",
                "&:hover": {
                  background: alpha(COLORS.accent.pink, 0.2),
                  borderColor: alpha(COLORS.accent.pink, 0.4),
                  width: 32,
                },
              }}
            >
              {chatOpen
                ? <PanelRightClose size={15} color={COLORS.accent.pink} />
                : <PanelRightOpen size={15} color={COLORS.text.muted} />
              }
            </Box>
          </Tooltip>
        </Box>

        {/* ── Chat Panel (Desktop — collapses/expands) ── */}
        <AnimatePresence initial={false}>
          {chatOpen && (
            <MotionBox
              key="chat-panel"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 360, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              sx={{
                display: { xs: "none", xl: "flex" },
                flexDirection: "column",
                flexShrink: 0,
                overflow: "hidden",
                borderLeft: `1px solid ${COLORS.border}`,
              }}
            >
              <Box sx={{ width: 360, height: "100%", flexShrink: 0 }}>
                <ChatPanel socket={socket} roomId={roomId} user={user} />
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>

      {/* ── Mobile Chat FAB ── */}
      <Box
        onClick={() => setMobileChatOpen(true)}
        sx={{
          display: { xs: "flex", xl: "none" },
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 52,
          height: 52,
          borderRadius: "16px",
          background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 40,
          boxShadow: `0 8px 28px ${alpha(COLORS.accent.pink, 0.45)}`,
          transition: "all 0.2s ease",
          "&:hover": { transform: "scale(1.06)" },
          "&:active": { transform: "scale(0.95)" },
        }}
      >
        <MessageSquare size={22} color="#fff" />
      </Box>

      {/* ── Mobile Bottom Sheet ── */}
      <AnimatePresence>
        {mobileChatOpen && (
          <>
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileChatOpen(false)}
              sx={{
                display: { xs: "block", xl: "none" },
                position: "fixed",
                inset: 0,
                bgcolor: "rgba(11,15,26,0.85)",
                backdropFilter: "blur(8px)",
                zIndex: 60,
              }}
            />
            <MotionBox
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              sx={{
                display: { xs: "flex", xl: "none" },
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                height: "88vh",
                bgcolor: COLORS.bg.primary,
                borderTop: `1px solid ${COLORS.border}`,
                borderRadius: "28px 28px 0 0",
                zIndex: 70,
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 -20px 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Drag handle */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 1.5, pb: 0.5, flexShrink: 0 }}>
                <Box sx={{ width: 40, height: 4, borderRadius: "4px", bgcolor: COLORS.border }} />
              </Box>

              {/* Close button */}
              <Box sx={{ position: "absolute", top: 8, right: 12 }}>
                <IconButton
                  size="small"
                  onClick={() => setMobileChatOpen(false)}
                  sx={{
                    color: COLORS.text.muted,
                    background: alpha(COLORS.bg.elevated, 0.7),
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    p: 0.5,
                    "&:hover": { color: COLORS.text.primary },
                  }}
                >
                  <X size={16} />
                </IconButton>
              </Box>

              <Box sx={{ flex: 1, overflow: "hidden" }}>
                <ChatPanel socket={socket} roomId={roomId} user={user} />
              </Box>
            </MotionBox>
          </>
        )}
      </AnimatePresence>
    </MotionBox>
  );
};

export default CodeEditor;
