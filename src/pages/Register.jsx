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
import { UserPlus, User, Mail, Lock, AlertCircle } from "lucide-react";
import Logo from "../components/Logo";
import GlassCard from "../components/GlassCard";
import GradientButton from "../components/GradientButton";
import { COLORS } from "../theme/theme";

const MotionBox = motion(Box);

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");
    if (formData.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      await register(formData.username, formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
          position: "absolute", top: "15%", right: "15%",
          width: 500, height: 500,
          background: "radial-gradient(ellipse, rgba(236,72,153,0.08) 0%, transparent 70%)",
          borderRadius: "50%", animation: "orbit 22s linear infinite",
        }} />
        <Box sx={{
          position: "absolute", bottom: "15%", left: "15%",
          width: 500, height: 500,
          background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
          borderRadius: "50%", animation: "orbit 28s linear infinite reverse",
        }} />
      </Box>

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
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
              Join the community of collaborative creators.
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

              {/* ── Fields: 2×2 Grid ── */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2.5,
                  mb: 3.5,
                }}
              >
                {/* Username */}
                <Box>
                  <Typography variant="overline" sx={{ color: COLORS.text.muted, display: "block", mb: 1 }}>
                    Username
                  </Typography>
                  <TextField
                    id="register-username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="octocat"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <User size={17} color={COLORS.text.muted} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* Email */}
                <Box>
                  <Typography variant="overline" sx={{ color: COLORS.text.muted, display: "block", mb: 1 }}>
                    Email Address
                  </Typography>
                  <TextField
                    id="register-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="dev@codenexus.io"
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
                <Box>
                  <Typography variant="overline" sx={{ color: COLORS.text.muted, display: "block", mb: 1 }}>
                    Password
                  </Typography>
                  <TextField
                    id="register-password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
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

                {/* Confirm Password */}
                <Box>
                  <Typography variant="overline" sx={{ color: COLORS.text.muted, display: "block", mb: 1 }}>
                    Confirm Password
                  </Typography>
                  <TextField
                    id="register-confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
              </Box>

              {/* Submit */}
              <GradientButton
                type="submit"
                variant="gradient"
                size="large"
                glow
                loading={loading}
                endIcon={!loading ? <UserPlus size={18} /> : null}
                sx={{ width: "100%", borderRadius: "14px" }}
              >
                Create Account
              </GradientButton>
            </Box>
          </GlassCard>

          {/* Login Link */}
          <Box sx={{ textAlign: "center", mt: 3.5 }}>
            <Typography variant="body2" sx={{ color: COLORS.text.muted }}>
              Already have an account?{" "}
              <Box
                component={Link}
                to="/login"
                sx={{
                  color: COLORS.accent.pink,
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "color 0.2s",
                  "&:hover": { color: COLORS.accent.pinkLight },
                }}
              >
                Sign in to Nexus
              </Box>
            </Typography>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Register;
