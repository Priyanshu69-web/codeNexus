import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../theme/theme";

// Deterministic avatar gradient
const gradients = [
  "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
  "linear-gradient(135deg, #6366F1 0%, #EC4899 100%)",
  "linear-gradient(135deg, #14B8A6 0%, #8B5CF6 100%)",
];
const getGradient = (name = "") => gradients[name.charCodeAt(0) % gradients.length];

const formatTime = (ts) =>
  new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ─── System Message ───────────────────────────────────────────────────────────
const SystemMessage = ({ message }) => (
  <Box sx={{ display: "flex", justifyContent: "center", my: 1.5 }}>
    <Box
      sx={{
        px: 2,
        py: 0.5,
        borderRadius: "100px",
        background: alpha(COLORS.bg.elevated, 0.7),
        border: `1px solid ${COLORS.border}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <Typography sx={{ fontSize: "0.7rem", color: COLORS.text.muted, fontWeight: 500 }}>
        {message.text}
      </Typography>
    </Box>
  </Box>
);

// ─── Chat Message ─────────────────────────────────────────────────────────────
const ChatMessage = ({ message }) => {
  const { user } = useAuth();
  const isSelf = message.user === user?._id || message.username === user?.username;
  const isSystem = message.type === "system";

  if (isSystem) return <SystemMessage message={message} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isSelf ? "flex-end" : "flex-start",
        mb: 2,
        animation: "fadeIn 0.25s ease-out",
      }}
    >
      {/* Sender label + time */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5, px: 0.5 }}>
        {!isSelf && (
          <Avatar
            sx={{
              width: 20,
              height: 20,
              fontSize: "0.6rem",
              fontWeight: 700,
              background: getGradient(message.username),
              flexShrink: 0,
            }}
          >
            {message.username?.charAt(0).toUpperCase()}
          </Avatar>
        )}

        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: isSelf ? COLORS.accent.pink : COLORS.accent.purpleLight,
            textTransform: "uppercase",
          }}
        >
          {isSelf ? "You" : message.username}
        </Typography>

        <Typography sx={{ fontSize: "0.65rem", color: COLORS.text.muted }}>
          {formatTime(message.createdAt)}
        </Typography>
      </Box>

      {/* Bubble */}
      <Box
        sx={{
          maxWidth: "80%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.25,
            borderRadius: isSelf
              ? "18px 4px 18px 18px"
              : "4px 18px 18px 18px",
            ...(isSelf
              ? {
                  background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
                  color: "#fff",
                  boxShadow: `0 4px 16px ${alpha(COLORS.accent.pink, 0.3)}`,
                }
              : {
                  background: alpha(COLORS.bg.elevated, 0.9),
                  color: COLORS.text.primary,
                  border: `1px solid ${COLORS.border}`,
                }),
            wordBreak: "break-word",
            lineHeight: 1.6,
            fontSize: "0.88rem",
          }}
        >
          {message.text}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessage;
