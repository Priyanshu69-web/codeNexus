import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Code2 } from "lucide-react";
import { alpha } from "@mui/material/styles";
import { COLORS } from "../theme/theme";

/**
 * Logo — CodeNexus brand logo with icon.
 * Props:
 *  - size: "sm" | "md" | "lg"
 *  - clickable: boolean — navigate to home on click
 *  - showText: boolean — show "CodeNexus" text
 */
const Logo = ({ size = "md", clickable = true, showText = true, sx = {} }) => {
  const navigate = useNavigate();

  const sizeMap = {
    sm: { icon: 18, box: 30, fontSize: "1rem"  },
    md: { icon: 20, box: 36, fontSize: "1.2rem" },
    lg: { icon: 26, box: 48, fontSize: "1.6rem" },
  };

  const s = sizeMap[size] || sizeMap.md;

  return (
    <Box
      onClick={clickable ? () => navigate("/") : undefined}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        cursor: clickable ? "pointer" : "default",
        userSelect: "none",
        "&:hover .logo-icon": clickable ? {
          transform: "scale(1.08) rotate(-4deg)",
          boxShadow: `0 6px 20px ${alpha(COLORS.accent.pink, 0.4)}`,
        } : {},
        ...sx,
      }}
    >
      <Box
        className="logo-icon"
        sx={{
          width: s.box,
          height: s.box,
          background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: `0 4px 16px ${alpha(COLORS.accent.pink, 0.3)}`,
        }}
      >
        <Code2 size={s.icon} color="#fff" strokeWidth={2.2} />
      </Box>
      {showText && (
        <Typography
          sx={{
            fontSize: s.fontSize,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            background: "linear-gradient(135deg, #F1F5F9 0%, #94A3B8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
          }}
        >
          CodeNexus
        </Typography>
      )}
    </Box>
  );
};

export default Logo;
