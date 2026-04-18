import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import { COLORS } from "../theme/theme";

const TypingIndicator = ({ username }) => {
  if (!username) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        gap: 1,
        mb: 2,
        animation: "fadeIn 0.25s ease-out",
      }}
    >
      {/* Mini avatar */}
      <Avatar
        sx={{
          width: 24,
          height: 24,
          fontSize: "0.62rem",
          fontWeight: 700,
          background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
          flexShrink: 0,
        }}
      >
        {username.charAt(0).toUpperCase()}
      </Avatar>

      {/* Bubble */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.25,
          borderRadius: "4px 18px 18px 18px",
          background: alpha(COLORS.bg.elevated, 0.9),
          border: `1px solid ${COLORS.border}`,
        }}
      >
        {/* Three animated dots */}
        {[0, 0.18, 0.36].map((delay, i) => (
          <Box
            key={i}
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
              animation: `typing-bounce 1.2s ease infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
        <Typography
          sx={{
            fontSize: "0.72rem",
            color: COLORS.text.muted,
            fontStyle: "italic",
            ml: 0.5,
          }}
        >
          {username} is typing…
        </Typography>
      </Box>
    </Box>
  );
};

export default TypingIndicator;
