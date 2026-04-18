import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha } from "@mui/material/styles";
import { COLORS, GRADIENT } from "../theme/theme";

/**
 * GradientButton — Primary CTA button with pink→purple gradient.
 * Props:
 *  - variant: "gradient" | "gradient-outline" | "surface"
 *  - size: "small" | "medium" | "large"
 *  - loading: boolean
 *  - glow: boolean — show shadow glow
 *  - All standard MUI Button props
 */
const GradientButton = ({
  children,
  variant = "gradient",
  size = "large",
  loading = false,
  glow = false,
  sx = {},
  disabled,
  ...props
}) => {
  const baseStyles = {
    position: "relative",
    overflow: "hidden",
    fontWeight: 700,
    transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
    "&:active": { transform: "scale(0.97)" },
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: "linear-gradient(90deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
      transform: "translateX(-101%)",
      transition: "transform 0.5s ease",
    },
    "&:hover::before": { transform: "translateX(101%)" },
  };

  if (variant === "gradient") {
    return (
      <Button
        size={size}
        disabled={disabled || loading}
        sx={{
          ...baseStyles,
          background: GRADIENT.primary,
          color: "#fff",
          boxShadow: glow ? `0 8px 24px ${alpha(COLORS.accent.pink, 0.35)}` : "none",
          "&:hover": {
            background: GRADIENT.primary,
            filter: "brightness(1.1)",
            boxShadow: glow ? `0 12px 32px ${alpha(COLORS.accent.pink, 0.45)}` : "none",
          },
          "&.Mui-disabled": {
            background: GRADIENT.primary,
            opacity: 0.5,
            color: "#fff",
          },
          ...sx,
        }}
        {...props}
      >
        {loading ? (
          <CircularProgress size={20} sx={{ color: "rgba(255,255,255,0.8)" }} />
        ) : children}
      </Button>
    );
  }

  if (variant === "gradient-outline") {
    return (
      <Button
        size={size}
        disabled={disabled || loading}
        sx={{
          ...baseStyles,
          background: "transparent",
          color: COLORS.accent.pink,
          border: `1.5px solid ${alpha(COLORS.accent.pink, 0.5)}`,
          "&:hover": {
            background: alpha(COLORS.accent.pink, 0.06),
            borderColor: COLORS.accent.pink,
          },
          "&.Mui-disabled": { opacity: 0.5 },
          ...sx,
        }}
        {...props}
      >
        {loading ? (
          <CircularProgress size={20} sx={{ color: COLORS.accent.pink }} />
        ) : children}
      </Button>
    );
  }

  // surface variant
  return (
    <Button
      size={size}
      disabled={disabled || loading}
      sx={{
        ...baseStyles,
        background: alpha(COLORS.bg.elevated, 0.8),
        color: COLORS.text.primary,
        border: `1px solid ${COLORS.border}`,
        backdropFilter: "blur(8px)",
        "&:hover": {
          background: COLORS.bg.elevated,
          borderColor: alpha(COLORS.accent.pink, 0.3),
        },
        "&.Mui-disabled": { opacity: 0.5 },
        ...sx,
      }}
      {...props}
    >
      {loading ? (
        <CircularProgress size={20} sx={{ color: COLORS.text.secondary }} />
      ) : children}
    </Button>
  );
};

export default GradientButton;
