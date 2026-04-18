import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import { alpha } from "@mui/material/styles";
import { Copy, Check, Download, LogOut } from "lucide-react";
import Logo from "./Logo";
import GradientButton from "./GradientButton";
import LanguageSelector from "./LanguageSelector";
import ActiveUsers from "./ActiveUsers";
import { COLORS } from "../theme/theme";

const Navbar = ({
  roomId = "CodeNexus",
  language = "javascript",
  onLanguageChange = () => {},
  onDownload = () => {},
  activeUsers = [],
}) => {
  const [copied, setCopied] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const copyRoomId = () => {
    if (!roomId || roomId === "CodeNexus") return;
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setSnackOpen(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <AppBar position="static" sx={{ zIndex: 50, flexShrink: 0 }}>
        <Toolbar
          sx={{
            minHeight: "56px !important",
            height: 56,
            px: { xs: 2, sm: 3 },
            gap: 2,
          }}
        >
          {/* ── Left: Logo + Workspace + Room ID ── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
            <Logo size="sm" />

            <Box sx={{ width: 1, height: 24, bgcolor: COLORS.border, display: { xs: "none", sm: "block" } }} />

            {/* Room ID chip */}
            <Tooltip title={copied ? "Copied!" : "Copy Room ID"} arrow>
              <Box
                onClick={copyRoomId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 0.75,
                  borderRadius: "10px",
                  background: alpha(COLORS.bg.surface, 0.8),
                  border: `1px solid ${copied ? alpha(COLORS.success, 0.4) : COLORS.border}`,
                  cursor: roomId !== "CodeNexus" ? "pointer" : "default",
                  transition: "all 0.2s ease",
                  "&:hover": roomId !== "CodeNexus" ? {
                    borderColor: alpha(COLORS.accent.pink, 0.4),
                    background: COLORS.bg.surface,
                  } : {},
                  "&:active": { transform: "scale(0.97)" },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: { xs: "none", lg: "inline" },
                    fontSize: "0.62rem",
                    fontWeight: 800,
                    color: COLORS.text.muted,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Workspace
                </Box>
                <Box
                  component="span"
                  sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: COLORS.text.primary,
                    letterSpacing: "0.04em",
                  }}
                >
                  {roomId}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", width: 14, flexShrink: 0 }}>
                  {copied
                    ? <Check size={13} color={COLORS.success} />
                    : <Copy size={13} color={COLORS.text.muted} />
                  }
                </Box>
              </Box>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* ── Center/Right: Active Users + Controls ── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Active Users */}
            {activeUsers.length > 0 && (
              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", pr: 1 }}>
                <ActiveUsers users={activeUsers} />
              </Box>
            )}

            {activeUsers.length > 0 && (
              <Box sx={{ width: 1, height: 24, bgcolor: COLORS.border, display: { xs: "none", md: "block" } }} />
            )}

            {/* Language Selector */}
            <LanguageSelector selected={language} onChange={onLanguageChange} />

            {/* Download */}
            <Tooltip title="Download Code" arrow>
              <Box
                onClick={onDownload}
                sx={{
                  p: 1,
                  borderRadius: "10px",
                  border: `1px solid transparent`,
                  cursor: "pointer",
                  color: COLORS.text.muted,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: COLORS.text.primary,
                    background: alpha(COLORS.bg.surface, 0.8),
                    borderColor: COLORS.border,
                  },
                  "&:active": { transform: "scale(0.92)" },
                }}
              >
                <Download size={17} />
              </Box>
            </Tooltip>

            <Box sx={{ width: 1, height: 24, bgcolor: COLORS.border }} />

            {/* Auth Controls */}
            {user ? (
              <Tooltip title="Logout" arrow>
                <Box
                  onClick={() => { logout(); navigate("/"); }}
                  sx={{
                    p: 1,
                    borderRadius: "10px",
                    cursor: "pointer",
                    color: COLORS.text.muted,
                    transition: "all 0.2s ease",
                    "&:hover": { color: COLORS.error, background: alpha(COLORS.error, 0.07) },
                    "&:active": { transform: "scale(0.92)" },
                  }}
                >
                  <LogOut size={17} />
                </Box>
              </Tooltip>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  onClick={() => navigate("/login")}
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: COLORS.text.muted,
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    transition: "color 0.2s",
                    "&:hover": { color: COLORS.text.primary },
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  Login
                </Box>
                <GradientButton
                  variant="gradient"
                  size="small"
                  onClick={() => navigate("/register")}
                  sx={{ borderRadius: "8px", px: 2, py: 0.75, fontSize: "0.78rem" }}
                >
                  Join
                </GradientButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Copy feedback */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message="Room ID copied to clipboard"
        sx={{
          "& .MuiSnackbarContent-root": {
            background: COLORS.bg.elevated,
            border: `1px solid ${COLORS.border}`,
            color: COLORS.text.primary,
            fontWeight: 600,
            borderRadius: "12px",
            fontSize: "0.85rem",
          },
        }}
      />
    </>
  );
};

export default Navbar;
