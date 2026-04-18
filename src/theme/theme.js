import { createTheme, alpha } from "@mui/material/styles";

// ─── Design Tokens ───────────────────────────────────────────────────────────
export const COLORS = {
  bg: {
    primary:   "#0B0F1A",
    secondary: "#111827",
    surface:   "#1A1F2E",
    elevated:  "#222840",
  },
  accent: {
    pink:       "#EC4899",
    pinkLight:  "#F472B6",
    pinkDark:   "#DB2777",
    purple:     "#8B5CF6",
    purpleLight:"#A78BFA",
    indigo:     "#6366F1",
  },
  text: {
    primary:   "#F1F5F9",
    secondary: "#94A3B8",
    muted:     "#475569",
    disabled:  "#334155",
  },
  border:   "#1E2535",
  success:  "#22C55E",
  error:    "#EF4444",
  warning:  "#F59E0B",
};

export const GRADIENT = {
  primary:    `linear-gradient(135deg, ${COLORS.accent.pink} 0%, ${COLORS.accent.purple} 100%)`,
  subtle:     `linear-gradient(135deg, ${alpha(COLORS.accent.pink, 0.15)} 0%, ${alpha(COLORS.accent.purple, 0.15)} 100%)`,
  glow:       `radial-gradient(ellipse at center, ${alpha(COLORS.accent.pink, 0.2)} 0%, transparent 70%)`,
  text:       `linear-gradient(135deg, ${COLORS.accent.pink} 0%, ${COLORS.accent.purpleLight} 100%)`,
};

// ─── MUI Theme ────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main:  COLORS.accent.pink,
      light: COLORS.accent.pinkLight,
      dark:  COLORS.accent.pinkDark,
    },
    secondary: {
      main:  COLORS.accent.purple,
      light: COLORS.accent.purpleLight,
    },
    background: {
      default: COLORS.bg.primary,
      paper:   COLORS.bg.secondary,
    },
    text: {
      primary:   COLORS.text.primary,
      secondary: COLORS.text.secondary,
      disabled:  COLORS.text.disabled,
    },
    divider:  COLORS.border,
    success:  { main: COLORS.success },
    error:    { main: COLORS.error },
    warning:  { main: COLORS.warning },
  },

  typography: {
    fontFamily: "'Inter', 'system-ui', '-apple-system', sans-serif",
    fontWeightLight:   300,
    fontWeightRegular: 400,
    fontWeightMedium:  500,
    fontWeightBold:    700,
    h1: { fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 },
    h2: { fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1  },
    h3: { fontWeight: 800, letterSpacing: "-0.02em"                   },
    h4: { fontWeight: 700, letterSpacing: "-0.01em"                   },
    h5: { fontWeight: 700, letterSpacing: "-0.005em"                  },
    h6: { fontWeight: 700                                              },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
    caption: { letterSpacing: "0.04em", fontWeight: 500 },
    overline: { letterSpacing: "0.15em", fontWeight: 700, fontSize: "0.65rem" },
    button: { fontWeight: 700, letterSpacing: "0.02em", textTransform: "none" },
  },

  shape: { borderRadius: 12 },

  shadows: [
    "none",
    `0 1px 3px ${alpha("#000", 0.4)}`,
    `0 2px 6px ${alpha("#000", 0.4)}`,
    `0 4px 12px ${alpha("#000", 0.4)}`,
    `0 6px 16px ${alpha("#000", 0.45)}`,
    `0 8px 24px ${alpha("#000", 0.5)}`,
    `0 12px 32px ${alpha("#000", 0.5)}`,
    `0 16px 40px ${alpha("#000", 0.55)}`,
    `0 20px 48px ${alpha("#000", 0.6)}`,
    ...Array(16).fill(`0 24px 56px ${alpha("#000", 0.65)}`),
  ],

  components: {
    // ── CssBaseline ──
    MuiCssBaseline: {
      styleOverrides: {
        "*": { boxSizing: "border-box", margin: 0, padding: 0 },
        body: {
          backgroundColor: COLORS.bg.primary,
          color: COLORS.text.primary,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          overflowX: "hidden",
        },
        "::-webkit-scrollbar":       { width: 6, height: 6 },
        "::-webkit-scrollbar-track": { background: COLORS.bg.primary },
        "::-webkit-scrollbar-thumb": {
          background: COLORS.border,
          borderRadius: 10,
          "&:hover": { background: COLORS.bg.elevated },
        },
      },
    },

    // ── Button ──
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 700,
          transition: "all 0.18s ease",
          "&:active": { transform: "scale(0.97)" },
        },
        sizeLarge:  { padding: "14px 28px", fontSize: "1rem"  },
        sizeMedium: { padding: "10px 22px", fontSize: "0.9rem" },
        sizeSmall:  { padding: "6px 14px",  fontSize: "0.8rem" },
        contained: {
          "&:hover": { filter: "brightness(1.1)" },
        },
        outlined: {
          borderColor: COLORS.border,
          "&:hover": { borderColor: COLORS.accent.pink, background: alpha(COLORS.accent.pink, 0.06) },
        },
      },
    },

    // ── TextField ──
    MuiTextField: {
      defaultProps: { variant: "outlined", fullWidth: true },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.bg.primary,
          borderRadius: 12,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: COLORS.border },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: alpha(COLORS.accent.pink, 0.4) },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(COLORS.accent.pink, 0.7),
            boxShadow: `0 0 0 3px ${alpha(COLORS.accent.pink, 0.06)}`,
          },
        },
        input: {
          color: COLORS.text.primary,
          "&::placeholder": { color: COLORS.text.muted, opacity: 1 },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: COLORS.text.muted,
          "&.Mui-focused": { color: COLORS.accent.pink },
        },
      },
    },

    // ── Select ──
    MuiSelect: {
      styleOverrides: {
        icon: { color: COLORS.text.secondary },
        select: { color: COLORS.text.primary },
      },
    },

    // ── Paper / Card ──
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: alpha(COLORS.bg.surface, 0.6),
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${COLORS.border}`,
          backgroundImage: "none",
        },
      },
    },

    // ── AppBar ──
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: alpha(COLORS.bg.primary, 0.85),
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: `1px solid ${COLORS.border}`,
          backgroundImage: "none",
          boxShadow: "none",
        },
      },
    },

    // ── Chip ──
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(COLORS.bg.surface, 0.8),
          border: `1px solid ${COLORS.border}`,
          color: COLORS.text.secondary,
          fontWeight: 600,
          fontSize: "0.72rem",
          "& .MuiChip-icon": { color: COLORS.text.muted },
        },
      },
    },

    // ── Avatar ──
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: "0.75rem",
        },
      },
    },

    // ── MenuItem ──
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "1px 6px",
          transition: "all 0.15s ease",
          "&:hover":   { background: alpha(COLORS.accent.pink, 0.08) },
          "&.Mui-selected": {
            background: alpha(COLORS.accent.pink, 0.12),
            "&:hover":  { background: alpha(COLORS.accent.pink, 0.16) },
          },
        },
      },
    },

    // ── Tooltip ──
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: COLORS.bg.elevated,
          border: `1px solid ${COLORS.border}`,
          color: COLORS.text.primary,
          fontSize: "0.72rem",
          fontWeight: 600,
          borderRadius: 8,
          padding: "6px 10px",
        },
        arrow: { color: COLORS.bg.elevated },
      },
    },

    // ── Snackbar ──
    MuiSnackbar: {
      defaultProps: { anchorOrigin: { vertical: "bottom", horizontal: "center" } },
    },

    // ── Alert ──
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 12 },
        standardError: {
          background: alpha(COLORS.error, 0.1),
          border: `1px solid ${alpha(COLORS.error, 0.2)}`,
          color: COLORS.error,
        },
      },
    },

    // ── Divider ──
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: COLORS.border },
      },
    },

    // ── IconButton ──
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "all 0.18s ease",
          "&:hover": { background: alpha(COLORS.text.primary, 0.06) },
          "&:active": { transform: "scale(0.92)" },
        },
      },
    },
  },
});

export default theme;
