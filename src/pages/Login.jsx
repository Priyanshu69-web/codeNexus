import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import { alpha } from "@mui/material/styles";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import Logo from "../components/Logo";
import GlassCard from "../components/GlassCard";
import GradientButton from "../components/GradientButton";
import { COLORS } from "../theme/theme";

const MotionBox = motion(Box);

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
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: COLORS.bg.primary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Ambient Orbs ── */}
      <Box sx={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <Box sx={{
          position: "absolute", top: "15%", left: "15%",
          width: 500, height: 500,
          background: "radial-gradient(ellipse, rgba(236,72,153,0.08) 0%, transparent 70%)",
          borderRadius: "50%", animation: "orbit 20s linear infinite",
        }} />
        <Box sx={{
          position: "absolute", bottom: "15%", right: "15%",
          width: 500, height: 500,
          background: "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)",
          borderRadius: "50%", animation: "orbit 25s linear infinite reverse",
        }} />
      </Box>

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Logo size="lg" />
            </Box>
            <Typography variant="body1" sx={{ color: COLORS.text.muted, fontWeight: 500 }}>
              Welcome back, developer.
            </Typography>
          </Box>

          {/* Card */}
          <GlassCard topAccent>
            <Box component="form" onSubmit={handleSubmit} noValidate>

              {/* Error */}
              {error && (
                <MotionBox
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  sx={{ mb: 3 }}
                >
                  <Alert
                    severity="error"
                    icon={<AlertCircle size={16} />}
                    sx={{
                      background: alpha(COLORS.error, 0.08),
                      border: `1px solid ${alpha(COLORS.error, 0.2)}`,
                      color: COLORS.error,
                      borderRadius: "12px",
                      "& .MuiAlert-icon": { color: COLORS.error },
                    }}
                  >
                    {error}
                  </Alert>
                </MotionBox>
              )}

              {/* Email */}
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="overline" sx={{ color: COLORS.text.muted, display: "block", mb: 1 }}>
                  Email Address
                </Typography>
                <TextField
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={17} color={COLORS.text.muted} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Password */}
              <Box sx={{ mb: 3.5 }}>
                <Typography variant="overline" sx={{ color: COLORS.text.muted, display: "block", mb: 1 }}>
                  Password
                </Typography>
                <TextField
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={17} color={COLORS.text.muted} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Submit */}
              <GradientButton
                type="submit"
                variant="gradient"
                size="large"
                glow
                loading={loading}
                endIcon={!loading ? <LogIn size={18} /> : null}
                sx={{ width: "100%", borderRadius: "14px" }}
              >
                Sign In
              </GradientButton>
            </Box>
          </GlassCard>

          {/* Register Link */}
          <Box sx={{ textAlign: "center", mt: 3.5 }}>
            <Typography variant="body2" sx={{ color: COLORS.text.muted }}>
              New here?{" "}
              <Box
                component={Link}
                to="/register"
                sx={{
                  color: COLORS.accent.pink,
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "color 0.2s",
                  "&:hover": { color: COLORS.accent.pinkLight },
                }}
              >
                Create a free account
              </Box>
            </Typography>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Login;
