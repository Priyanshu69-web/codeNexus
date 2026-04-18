import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import { Users } from "lucide-react";
import { COLORS } from "../theme/theme";

// Deterministic color per username initial
const userColors = [
  ["#EC4899", "#8B5CF6"],
  ["#10B981", "#3B82F6"],
  ["#F59E0B", "#EF4444"],
  ["#6366F1", "#EC4899"],
  ["#14B8A6", "#8B5CF6"],
];

const getGradient = (username) => {
  const idx = username.charCodeAt(0) % userColors.length;
  const [c1, c2] = userColors[idx];
  return `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
};

const ActiveUsers = ({ users = [] }) => {
  if (users.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 0.75,
          borderRadius: "10px",
          background: alpha(COLORS.bg.surface, 0.7),
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <Users size={12} color={COLORS.text.muted} />
        <Box
          component="span"
          sx={{ fontSize: "0.68rem", fontWeight: 700, color: COLORS.text.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          Solo Mode
        </Box>
      </Box>
    );
  }

  const isGuest = (u) => u.username.startsWith("Guest");

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <AvatarGroup
        max={5}
        sx={{
          "& .MuiAvatar-root": {
            width: 30,
            height: 30,
            fontSize: "0.7rem",
            fontWeight: 700,
            border: `2px solid ${COLORS.bg.primary}`,
            transition: "transform 0.2s ease, z-index 0s",
            cursor: "default",
            "&:hover": { transform: "scale(1.15)", zIndex: 10 },
          },
          "& .MuiAvatarGroup-avatar": {
            background: COLORS.bg.elevated,
            color: COLORS.text.secondary,
            fontSize: "0.65rem",
            border: `2px solid ${COLORS.bg.primary}`,
          },
        }}
      >
        {users.map((u, i) => (
          <Tooltip key={u.socketId || i} title={u.username} arrow placement="bottom">
            <Avatar
              sx={{
                background: isGuest(u)
                  ? `linear-gradient(135deg, ${COLORS.bg.elevated} 0%, ${COLORS.bg.surface} 100%)`
                  : getGradient(u.username),
                position: "relative",
              }}
            >
              {u.username.charAt(0).toUpperCase()}
              {/* Online dot */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: isGuest(u) ? COLORS.text.muted : COLORS.success,
                  border: `1.5px solid ${COLORS.bg.primary}`,
                }}
              />
            </Avatar>
          </Tooltip>
        ))}
      </AvatarGroup>

      {/* Count badge */}
      <Box
        sx={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: COLORS.success,
          letterSpacing: "0.04em",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            bgcolor: COLORS.success,
            animation: "pulse-dot 2s ease infinite",
          }}
        />
        {users.length} online
      </Box>
    </Box>
  );
};

export default ActiveUsers;
