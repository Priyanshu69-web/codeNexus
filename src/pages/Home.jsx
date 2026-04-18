import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Zap, Users, Code2, ArrowRight, Plus, LogOut, GitBranch, Terminal, Globe } from "lucide-react";
import Logo from "../components/Logo";
import GradientButton from "../components/GradientButton";
import { COLORS, GRADIENT } from "../theme/theme";

const generateId = (length = 6) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
  return id;
};

const MotionBox = motion(Box);

// ─── Feature Cards Data ───────────────────────────────────────────────────────
const features = [
  {
    icon: Zap,
    iconColor: "#F59E0B",
    iconBg: "rgba(245,158,11,0.08)",
    title: "Instant Sync",
    desc: "Peer-to-peer code updates with sub-millisecond latency. Every keystroke reflected in real-time.",
    badge: "< 10ms",
  },
  {
    icon: Users,
    iconColor: "#38BDF8",
    iconBg: "rgba(56,189,248,0.08)",
    title: "Live Presence",
    desc: "See who's in the room, their cursor positions, and what they're working on.",
    badge: "Multi-user",
  },
  {
    icon: Code2,
    iconColor: "#34D399",
    iconBg: "rgba(52,211,153,0.08)",
    title: "Smart Highlighting",
    desc: "Full Monaco Editor with syntax highlighting for 15+ languages including JS, Python, Go.",
    badge: "15+ langs",
  },
  {
    icon: Terminal,
    iconColor: "#A78BFA",
    iconBg: "rgba(167,139,250,0.08)",
    title: "Zero Setup",
    desc: "No install, no configuration. Just share a link and start coding together instantly.",
    badge: "Instant",
  },
  {
    icon: Globe,
    iconColor: "#EC4899",
    iconBg: "rgba(236,72,153,0.08)",
    title: "Live Chat",
    desc: "Built-in real-time chat with message history, emoji support, and typing indicators.",
    badge: "Real-time",
  },
  {
    icon: GitBranch,
    iconColor: "#FB923C",
    iconBg: "rgba(251,146,60,0.08)",
    title: "Code Export",
    desc: "Download your session code instantly with the correct file extension for your language.",
    badge: "One-click",
  },
];

// ─── Feature Card ─────────────────────────────────────────────────────────────
const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index + 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      sx={{
        p: 3.5,
        borderRadius: "20px",
        border: `1px solid ${COLORS.border}`,
        background: `linear-gradient(140deg, ${alpha(COLORS.bg.surface, 0.6)} 0%, ${alpha(COLORS.bg.secondary, 0.4)} 100%)`,
        backdropFilter: "blur(12px)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "default",
        height: "100%",
        "&:hover": {
          borderColor: alpha(COLORS.accent.pink, 0.3),
          transform: "translateY(-6px)",
          boxShadow: `0 20px 40px ${alpha(COLORS.accent.pink, 0.08)}`,
          "& .feature-icon-box": {
            background: feature.iconBg.replace("0.08", "0.14"),
            transform: "scale(1.08)",
          },
        },
      }}
    >
      <Box
        className="feature-icon-box"
        sx={{
          width: 52,
          height: 52,
          borderRadius: "14px",
          background: feature.iconBg,
          border: `1px solid ${alpha(feature.iconColor, 0.2)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2.5,
          transition: "all 0.25s ease",
        }}
      >
        <Icon size={22} color={feature.iconColor} strokeWidth={1.8} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.text.primary, fontSize: "1rem" }}>
          {feature.title}
        </Typography>
        <Chip
          label={feature.badge}
          size="small"
          sx={{
            height: 20,
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            background: alpha(feature.iconColor, 0.1),
            border: `1px solid ${alpha(feature.iconColor, 0.2)}`,
            color: feature.iconColor,
            "& .MuiChip-label": { px: 1 },
          }}
        />
      </Box>

      <Typography variant="body2" sx={{ color: COLORS.text.secondary, lineHeight: 1.7, fontSize: "0.85rem" }}>
        {feature.desc}
      </Typography>
    </MotionBox>
  );
};

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [joinId, setJoinId] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const createSession = () => navigate(`/${generateId(6)}`);
  const joinSession = (e) => { e.preventDefault(); if (joinId.trim()) navigate(`/${joinId.trim()}`); };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: COLORS.bg.primary, overflow: "hidden" }}>

      {/* ── Ambient Background ── */}
      <Box sx={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <Box sx={{
          position: "absolute", top: "-20%", left: "-15%",
          width: "55%", height: "55%",
          background: "radial-gradient(ellipse, rgba(236,72,153,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <Box sx={{
          position: "absolute", bottom: "-20%", right: "-15%",
          width: "55%", height: "55%",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <Box sx={{
          position: "absolute", top: "40%", left: "40%",
          width: "30%", height: "30%",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.03) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
      </Box>

      {/* ── Sticky Navbar ── */}
      <AppBar position="sticky" sx={{ zIndex: 50 }}>
        <Toolbar sx={{ maxWidth: "1200px", width: "100%", mx: "auto", px: { xs: 2, sm: 4 }, height: 68, minHeight: "68px !important" }}>
          <Logo size="md" />

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {user ? (
              <>
                <Typography sx={{ color: COLORS.text.secondary, fontSize: "0.85rem", display: { xs: "none", sm: "block" } }}>
                  Hi, <Box component="span" sx={{ color: COLORS.text.primary, fontWeight: 600 }}>{user.username}</Box>
                </Typography>
                <Tooltip title="Logout" arrow>
                  <Box
                    onClick={() => { logout(); }}
                    sx={{
                      p: 1,
                      borderRadius: "10px",
                      cursor: "pointer",
                      color: COLORS.text.muted,
                      transition: "all 0.2s ease",
                      "&:hover": { color: COLORS.error, background: alpha(COLORS.error, 0.08) },
                    }}
                  >
                    <LogOut size={18} />
                  </Box>
                </Tooltip>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  sx={{ color: COLORS.text.secondary, fontSize: "0.87rem", fontWeight: 600, "&:hover": { color: COLORS.text.primary } }}
                >
                  Log in
                </Button>
                <GradientButton
                  variant="gradient"
                  size="small"
                  onClick={() => navigate("/register")}
                  sx={{ borderRadius: "10px", px: 2.5, py: 1 }}
                >
                  Sign up
                </GradientButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Main Content ── */}
      <Box component="main" sx={{ position: "relative", zIndex: 1, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4 } }}>

          {/* ── Hero ── */}
          <Box sx={{ textAlign: "center", pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>

            {/* Badge */}
            <MotionBox
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              sx={{ display: "inline-flex", mb: 4 }}
            >
              <Box sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.75,
                borderRadius: "100px",
                background: alpha(COLORS.bg.surface, 0.8),
                border: `1px solid ${COLORS.border}`,
                backdropFilter: "blur(12px)",
              }}>
                <Zap size={13} color={COLORS.accent.pink} fill={alpha(COLORS.accent.pink, 0.2)} />
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: COLORS.text.secondary, letterSpacing: "0.03em" }}>
                  v2.0 · Peer-to-peer real-time collaboration
                </Typography>
              </Box>
            </MotionBox>

            {/* Headline */}
            <MotionBox
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.8rem", sm: "4.5rem", md: "6rem", lg: "7rem" },
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  mb: 3,
                  color: COLORS.text.primary,
                }}
              >
                Better code,{" "}
                <Box component="br" sx={{ display: { xs: "none", sm: "block" } }} />
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 60%, #6366F1 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  built together.
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: COLORS.text.secondary,
                  fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
                  maxWidth: 560,
                  mx: "auto",
                  lineHeight: 1.7,
                  mb: 6,
                }}
              >
                A minimalist, real-time code editor built for pairing and interviews.
                No setup required — share a link and code together instantly.
              </Typography>
            </MotionBox>

            {/* CTA */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <GradientButton
                variant="gradient"
                size="large"
                glow
                onClick={createSession}
                startIcon={<Plus size={20} />}
                endIcon={<ArrowRight size={18} />}
                sx={{ width: { xs: "100%", sm: "auto" }, borderRadius: "14px", px: 4 }}
              >
                Start Coding
              </GradientButton>

              {/* Divider */}
              <Box sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 2,
              }}>
                <Box sx={{ width: 1, height: 40, bgcolor: COLORS.border }} />
              </Box>

              {/* Join form */}
              <Box
                component="form"
                onSubmit={joinSession}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 1,
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 2.5,
                    py: 1.2,
                    borderRadius: "14px",
                    background: alpha(COLORS.bg.surface, 0.7),
                    border: `1.5px solid ${inputFocused ? alpha(COLORS.accent.pink, 0.5) : COLORS.border}`,
                    backdropFilter: "blur(12px)",
                    transition: "all 0.2s ease",
                    boxShadow: inputFocused ? `0 0 0 3px ${alpha(COLORS.accent.pink, 0.06)}` : "none",
                    width: { xs: "100%", sm: 200 },
                  }}
                >
                  <InputBase
                    value={joinId}
                    onChange={(e) => setJoinId(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="Enter Room ID..."
                    sx={{ color: COLORS.text.primary, fontSize: "0.95rem", fontWeight: 500, flex: 1, "& input::placeholder": { color: COLORS.text.muted } }}
                  />
                </Box>
                <GradientButton
                  type="submit"
                  variant="surface"
                  size="large"
                  sx={{ width: { xs: "100%", sm: "auto" }, borderRadius: "14px", whiteSpace: "nowrap" }}
                >
                  Join Room
                </GradientButton>
              </Box>
            </MotionBox>
          </Box>

          {/* ── Feature Cards Grid ── */}
          <Box sx={{ pb: { xs: 8, md: 12 } }}>
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              sx={{ textAlign: "center", mb: 6 }}
            >
              <Typography
                variant="overline"
                sx={{ color: COLORS.accent.pink, letterSpacing: "0.2em", fontSize: "0.7rem", display: "block", mb: 1 }}
              >
                Everything you need
              </Typography>
              <Typography variant="h4" sx={{ color: COLORS.text.primary, fontWeight: 800, letterSpacing: "-0.02em" }}>
                Built for developers
              </Typography>
            </MotionBox>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 2.5,
              }}
            >
              {features.map((feature, idx) => (
                <FeatureCard feature={feature} index={idx} key={idx} />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Footer ── */}
      <Box
        component="footer"
        sx={{
          borderTop: `1px solid ${COLORS.border}`,
          background: alpha(COLORS.bg.primary, 0.8),
          backdropFilter: "blur(12px)",
          py: 4,
          px: { xs: 2, sm: 4 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "center", sm: "center" }, justifyContent: "space-between", gap: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", sm: "flex-start" }, gap: 0.5 }}>
              <Logo size="sm" />
              <Typography variant="caption" sx={{ color: COLORS.text.muted, mt: 0.5 }}>
                © 2026 CodeNexus · Built for collaborative coding.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: COLORS.success, animation: "pulse-dot 2s ease infinite" }} />
                <Typography variant="caption" sx={{ color: COLORS.text.muted, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Platform Online
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
