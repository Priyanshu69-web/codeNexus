import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { alpha } from "@mui/material/styles";
import { Globe } from "lucide-react";
import { COLORS } from "../theme/theme";

const languages = [
  { value: "javascript",  label: "JavaScript"  },
  { value: "typescript",  label: "TypeScript"  },
  { value: "python",      label: "Python"      },
  { value: "cpp",         label: "C++"         },
  { value: "java",        label: "Java"        },
  { value: "go",          label: "Go"          },
  { value: "rust",        label: "Rust"        },
  { value: "html",        label: "HTML"        },
  { value: "css",         label: "CSS"         },
  { value: "json",        label: "JSON"        },
  { value: "sql",         label: "SQL"         },
  { value: "markdown",    label: "Markdown"    },
  { value: "php",         label: "PHP"         },
  { value: "ruby",        label: "Ruby"        },
  { value: "csharp",      label: "C#"          },
];

const LanguageSelector = ({ selected, onChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1.5,
        py: 0.5,
        borderRadius: "10px",
        background: alpha(COLORS.bg.surface, 0.8),
        border: `1px solid ${COLORS.border}`,
        transition: "border-color 0.2s",
        "&:focus-within": { borderColor: alpha(COLORS.accent.pink, 0.4) },
      }}
    >
      <Globe size={14} color={COLORS.text.muted} />
      <Select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        variant="standard"
        disableUnderline
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: COLORS.bg.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "14px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              mt: 0.5,
              maxHeight: 280,
            },
          },
          transformOrigin: { horizontal: "left", vertical: "top" },
          anchorOrigin: { horizontal: "left", vertical: "bottom" },
        }}
        sx={{
          color: COLORS.text.primary,
          fontSize: "0.82rem",
          fontWeight: 600,
          fontFamily: "inherit",
          "& .MuiSelect-select": { py: 0, pr: "24px !important" },
          "& .MuiSelect-icon": { color: COLORS.text.muted, right: 0 },
          "&::before, &::after": { display: "none" },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.value}
            value={lang.value}
            sx={{
              fontSize: "0.82rem",
              fontWeight: 500,
              py: 0.9,
              color: COLORS.text.secondary,
              "&.Mui-selected": { color: COLORS.accent.pink, fontWeight: 700 },
            }}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default LanguageSelector;
