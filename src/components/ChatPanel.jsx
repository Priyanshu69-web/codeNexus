import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import { Send, MessageSquareOff, MessageSquare, Lock, Smile } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import API from "../utils/api";
import { COLORS } from "../theme/theme";

const ChatPanel = ({ socket, roomId, user }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [typingUser, setTypingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const emojiRef = useRef(null);

  // Fetch history
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: msgs } = await API.get(`/room/${roomId}/messages`);
        setMessages(msgs);
      } catch { /* silent */ }
      finally { setLoading(false); }
    };
    fetch();
  }, [roomId]);

  // Socket events
  useEffect(() => {
    if (!socket) return;
    socket.on("receive-message",  (msg) => setMessages((p) => [...p, msg]));
    socket.on("user-joined", ({ message }) => {
      if (message) setMessages((p) => [...p, { _id: Date.now(), type: "system", text: message, createdAt: new Date().toISOString() }]);
    });
    socket.on("user-left", ({ message }) => {
      if (message) setMessages((p) => [...p, { _id: Date.now(), type: "system", text: message, createdAt: new Date().toISOString() }]);
    });
    socket.on("user-typing",      ({ username }) => setTypingUser(username));
    socket.on("user-stop-typing", () => setTypingUser(null));
    return () => {
      socket.off("receive-message");
      socket.off("user-joined");
      socket.off("user-left");
      socket.off("user-typing");
      socket.off("user-stop-typing");
    };
  }, [socket]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUser]);

  // Close emoji on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) setShowEmoji(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const sendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim() || !socket) return;
    socket.emit("send-message", { roomId, userId: user._id, username: user.username, text: inputText.trim() });
    setInputText("");
    socket.emit("stop-typing", { roomId });
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (!socket) return;
    socket.emit("typing", { roomId, username: user.username });
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => socket.emit("stop-typing", { roomId }), 3000);
  };

  const handleEmojiSelect = (emoji) => {
    setInputText((prev) => prev + emoji.native);
    setShowEmoji(false);
    inputRef.current?.focus();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", bgcolor: COLORS.bg.primary, borderLeft: `1px solid ${COLORS.border}`, overflow: "hidden" }}>

      {/* ── Header ── */}
      <Box
        sx={{
          height: 56,
          px: 2.5,
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          background: alpha(COLORS.bg.secondary, 0.8),
          backdropFilter: "blur(12px)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              background: alpha(COLORS.accent.pink, 0.1),
              border: `1px solid ${alpha(COLORS.accent.pink, 0.2)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MessageSquare size={15} color={COLORS.accent.pink} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: COLORS.text.primary, lineHeight: 1.2 }}>
              Live Chat
            </Typography>
            <Typography sx={{ fontSize: "0.62rem", color: COLORS.text.muted, lineHeight: 1 }}>
              {messages.filter(m => m.type !== "system").length} messages
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            px: 1.5,
            py: 0.5,
            borderRadius: "8px",
            background: alpha(COLORS.success, 0.08),
            border: `1px solid ${alpha(COLORS.success, 0.2)}`,
          }}
        >
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: COLORS.success, animation: "pulse-dot 2s ease infinite" }} />
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: COLORS.success, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Live
          </Typography>
        </Box>
      </Box>

      {/* ── Messages ── */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2, position: "relative" }}>
        {!user ? (
          // Login prompt overlay
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              background: alpha(COLORS.bg.primary, 0.9),
              backdropFilter: "blur(16px)",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "18px",
                background: alpha(COLORS.accent.pink, 0.08),
                border: `1px solid ${alpha(COLORS.accent.pink, 0.2)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2.5,
              }}
            >
              <Lock size={26} color={COLORS.accent.pink} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.text.primary, mb: 1, fontSize: "1rem" }}>
              Members Only Chat
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.text.muted, mb: 3, lineHeight: 1.6, maxWidth: 220 }}>
              Sign in to join the conversation and collaborate.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, width: "100%" }}>
              <Box
                onClick={() => window.location.href = "/login"}
                sx={{
                  py: 1.25,
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "filter 0.2s",
                  "&:hover": { filter: "brightness(1.1)" },
                }}
              >
                Sign In
              </Box>
              <Box
                onClick={() => window.location.href = "/register"}
                sx={{
                  py: 1.25,
                  borderRadius: "12px",
                  background: alpha(COLORS.bg.elevated, 0.8),
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text.secondary,
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": { borderColor: alpha(COLORS.accent.pink, 0.3), color: COLORS.text.primary },
                }}
              >
                Create Account
              </Box>
            </Box>
          </Box>
        ) : loading ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: `2.5px solid ${alpha(COLORS.accent.pink, 0.2)}`,
                borderTopColor: COLORS.accent.pink,
                animation: "spin 0.8s linear infinite",
                "@keyframes spin": { to: { transform: "rotate(360deg)" } },
              }}
            />
            <Typography sx={{ fontSize: "0.72rem", color: COLORS.text.muted, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Loading messages…
            </Typography>
          </Box>
        ) : messages.length === 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.4, gap: 1.5, textAlign: "center" }}>
            <MessageSquareOff size={40} color={COLORS.text.muted} />
            <Typography sx={{ fontWeight: 700, color: COLORS.text.secondary }}>Quiet room</Typography>
            <Typography sx={{ fontSize: "0.78rem", color: COLORS.text.muted }}>Break the ice and start talking!</Typography>
          </Box>
        ) : (
          <Box>
            {messages.map((msg) => (
              <ChatMessage key={msg._id} message={msg} />
            ))}
            <TypingIndicator username={typingUser} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* ── Input Bar (authenticated only) ── */}
      {user && (
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${COLORS.border}`,
            background: alpha(COLORS.bg.secondary, 0.9),
            flexShrink: 0,
            position: "relative",
          }}
        >
          {/* Emoji Picker */}
          {showEmoji && (
            <Box
              ref={emojiRef}
              sx={{
                position: "absolute",
                bottom: "100%",
                right: 16,
                mb: 1,
                zIndex: 200,
                "& em-emoji-picker": { colorScheme: "dark" },
              }}
            >
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                theme="dark"
                previewPosition="none"
                skinTonePosition="none"
                searchPosition="top"
              />
            </Box>
          )}

          {/* Input row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: 1,
            }}
          >
            {/* Emoji button */}
            <Tooltip title="Emoji" arrow>
              <IconButton
                onClick={() => setShowEmoji((p) => !p)}
                size="small"
                sx={{
                  color: showEmoji ? COLORS.accent.pink : COLORS.text.muted,
                  background: showEmoji ? alpha(COLORS.accent.pink, 0.1) : "transparent",
                  border: `1px solid ${showEmoji ? alpha(COLORS.accent.pink, 0.3) : "transparent"}`,
                  borderRadius: "10px",
                  p: 0.75,
                  flexShrink: 0,
                  alignSelf: "center",
                  "&:hover": { color: COLORS.accent.pink, background: alpha(COLORS.accent.pink, 0.08) },
                }}
              >
                <Smile size={18} />
              </IconButton>
            </Tooltip>

            {/* Text area */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                borderRadius: "14px",
                background: COLORS.bg.primary,
                border: `1.5px solid ${COLORS.border}`,
                px: 2,
                py: 1,
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                "&:focus-within": {
                  borderColor: alpha(COLORS.accent.pink, 0.5),
                  boxShadow: `0 0 0 3px ${alpha(COLORS.accent.pink, 0.06)}`,
                },
              }}
            >
              <InputBase
                inputRef={inputRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Message…"
                multiline
                maxRows={4}
                fullWidth
                sx={{
                  color: COLORS.text.primary,
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  "& textarea::placeholder": { color: COLORS.text.muted },
                  "& .MuiInputBase-inputMultiline": {
                    resize: "none",
                  },
                }}
              />
            </Box>

            {/* Send button */}
            <Tooltip title="Send (Enter)" arrow>
              <Box
                onClick={sendMessage}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  background: inputText.trim()
                    ? "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)"
                    : alpha(COLORS.bg.elevated, 0.7),
                  border: `1px solid ${inputText.trim() ? "transparent" : COLORS.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: inputText.trim() ? "pointer" : "default",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                  boxShadow: inputText.trim() ? `0 4px 16px ${alpha(COLORS.accent.pink, 0.3)}` : "none",
                  "&:hover": inputText.trim()
                    ? { filter: "brightness(1.1)", transform: "scale(1.05)" }
                    : {},
                  "&:active": inputText.trim()
                    ? { transform: "scale(0.95)" }
                    : {},
                }}
              >
                <Send size={16} color={inputText.trim() ? "#fff" : COLORS.text.muted} />
              </Box>
            </Tooltip>
          </Box>

          <Typography sx={{ fontSize: "0.62rem", color: COLORS.text.disabled, mt: 0.75, textAlign: "center" }}>
            Enter to send · Shift+Enter for new line
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatPanel;
