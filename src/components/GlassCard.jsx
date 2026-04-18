import React from "react";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import { COLORS } from "../theme/theme";

/**
 * GlassCard — Glassmorphism card with optional gradient top border.
 * Props:
 *  - topAccent: boolean — show gradient top border line
 *  - glowColor: string — optional border glow color on hover
 *  - noPadding: boolean — remove default padding
 *  - sx: MUI sx prop
 */
const GlassCard = ({ children, topAccent = false, glowColor, noPadding = false, sx = {}, ...props }) => {
  return (
    <Box
      sx={{
        position: "relative",
        background: `linear-gradient(140deg, ${alpha(COLORS.bg.surface, 0.85)} 0%, ${alpha(COLORS.bg.secondary, 0.9)} 100%)`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "24px",
        overflow: "hidden",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        padding: noPadding ? 0 : { xs: "32px 24px", sm: "40px 40px" },
        "&:hover": glowColor ? {
          borderColor: alpha(glowColor, 0.3),
          boxShadow: `0 0 40px ${alpha(glowColor, 0.08)}`,
        } : {},
        ...sx,
      }}
      {...props}
    >
      {/* Gradient top accent line */}
      {topAccent && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, #EC4899 0%, #8B5CF6 50%, #6366F1 100%)",
            opacity: 0.8,
          }}
        />
      )}

      {/* Subtle inner glow */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(236,72,153,0.15), transparent)",
          pointerEvents: "none",
        }}
      />

      {children}
    </Box>
  );
};

export default GlassCard;
