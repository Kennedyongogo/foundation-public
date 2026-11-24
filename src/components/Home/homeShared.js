import { alpha } from "@mui/material/styles";
import { BRAND } from "../../brand";

export { BRAND, BRAND_LOGO_SRC } from "../../brand";

export const HOME = {
  ...BRAND,
  cream: BRAND.oldPaper,
  warmWhite: BRAND.oldPaperSoft,
  ink: BRAND.navy,
  inkMuted: "rgba(0, 60, 108, 0.72)",
  inkSoft: "rgba(0, 60, 108, 0.55)",
  border: "rgba(0, 60, 108, 0.12)",
  borderBlue: "rgba(0, 120, 204, 0.35)",
  borderGreen: "rgba(48, 120, 36, 0.35)",
  shadowSm: "0 8px 24px rgba(0, 40, 73, 0.08)",
  shadowMd: "0 16px 40px rgba(0, 40, 73, 0.12)",
  shadowLg: "0 24px 56px rgba(0, 40, 73, 0.16)",
  heroSplitWhite: BRAND.oldPaperSoft,
  heroSplitAccent: BRAND.green,
  heroSplitAccentDark: BRAND.navyDark,
  heroSplitAccentMid: BRAND.navy,
  goldMuted: BRAND.goldMuted,
  umberGradient: `linear-gradient(135deg, ${BRAND.navyDark} 0%, ${BRAND.navy} 52%, ${BRAND.navyMid} 100%)`,
  navyGradient: `linear-gradient(135deg, ${BRAND.navyDark} 0%, ${BRAND.navy} 52%, ${BRAND.navyMid} 100%)`,
  fontDisplay: '"Cormorant Garamond", Georgia, serif',
  fontBody: '"Plus Jakarta Sans", "Open Sans", system-ui, sans-serif',
};

export const homeSectionPadding = {
  // ~1/4 of previous top padding for tighter scroll rhythm
  pt: { xs: 1.25, md: 1.75 },
  pb: { xs: 4, md: 6 },
  px: { xs: 0, sm: 0 },
};

/** Alternating homepage section shells for scroll rhythm */
export function homeSectionShellSx(variant = "paper") {
  const shells = {
    paper: {
      background: `linear-gradient(180deg, ${HOME.oldPaperSoft} 0%, #fff 42%, ${alpha(HOME.skyBlue, 0.06)} 100%)`,
      accentA: alpha(HOME.skyBlue, 0.12),
      accentB: alpha(HOME.green, 0.08),
    },
    soft: {
      background: `linear-gradient(180deg, ${alpha(HOME.skyBlue, 0.07)} 0%, ${HOME.oldPaperSoft} 48%, #fff 100%)`,
      accentA: alpha(HOME.navy, 0.06),
      accentB: alpha(HOME.green, 0.08),
    },
    umber: {
      background: `linear-gradient(180deg, ${HOME.navyDark} 0%, ${HOME.navy} 55%, ${HOME.navyMid} 100%)`,
      accentA: alpha(HOME.gold, 0.2),
      accentB: alpha(HOME.skyBlue, 0.12),
      dark: true,
    },
    white: {
      background: `linear-gradient(180deg, #fff 0%, ${HOME.oldPaperSoft} 100%)`,
      accentA: alpha(HOME.skyBlue, 0.08),
      accentB: alpha(HOME.green, 0.06),
    },
  };

  const shell = shells[variant] || shells.paper;

  return {
    width: "100%",
    position: "relative",
    overflow: "hidden",
    ...homeSectionPadding,
    background: shell.background,
    color: shell.dark ? HOME.oldPaperSoft : HOME.ink,
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-18%",
      right: "-10%",
      width: "42%",
      height: "55%",
      borderRadius: "50%",
      background: `radial-gradient(circle, ${shell.accentA} 0%, transparent 70%)`,
      pointerEvents: "none",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-14%",
      left: "-8%",
      width: "38%",
      height: "48%",
      borderRadius: "50%",
      background: `radial-gradient(circle, ${shell.accentB} 0%, transparent 70%)`,
      pointerEvents: "none",
    },
  };
}

export const homeSectionHeaderSx = {
  overline: {
    fontFamily: HOME.fontBody,
    letterSpacing: "0.18em",
    fontWeight: 700,
    color: HOME.morphoBlue,
    fontSize: "0.72rem",
    textTransform: "uppercase",
  },
  title: {
    fontFamily: HOME.fontDisplay,
    mt: 1,
    mb: 1.5,
    fontWeight: 800,
    fontSize: { xs: "1.85rem", sm: "2.35rem", md: "2.75rem" },
    color: HOME.deepUmber,
    letterSpacing: "-0.02em",
    lineHeight: 1.12,
  },
  titleOnDark: {
    fontFamily: HOME.fontDisplay,
    mt: 1,
    mb: 1.5,
    fontWeight: 800,
    fontSize: { xs: "1.85rem", sm: "2.35rem", md: "2.75rem" },
    color: HOME.oldPaperSoft,
    letterSpacing: "-0.02em",
    lineHeight: 1.12,
  },
  rule: {
    width: 64,
    height: 3,
    mx: "auto",
    mb: 2,
    borderRadius: 2,
    background: `linear-gradient(90deg, ${HOME.green}, ${HOME.gold}, ${HOME.skyBlue})`,
  },
  body: {
    maxWidth: 760,
    mx: "auto",
    px: { xs: 2, sm: 0 },
    fontFamily: HOME.fontBody,
    fontSize: { xs: "0.95rem", md: "1.05rem" },
    lineHeight: 1.75,
    color: alpha(HOME.deepUmber, 0.72),
  },
  bodyOnDark: {
    maxWidth: 760,
    mx: "auto",
    px: { xs: 2, sm: 0 },
    fontFamily: HOME.fontBody,
    fontSize: { xs: "0.95rem", md: "1.05rem" },
    lineHeight: 1.75,
    color: alpha(HOME.oldPaperSoft, 0.82),
  },
};

export function homeCardSx() {
  return {
    borderRadius: "18px",
    overflow: "hidden",
    border: `1px solid ${HOME.border}`,
    bgcolor: "#fff",
    boxShadow: HOME.shadowSm,
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: HOME.shadowMd,
      borderColor: HOME.borderBlue,
    },
  };
}

export function homeCarouselArrowSx(disabled) {
  return {
    flexShrink: 0,
    width: { xs: 44, sm: 52 },
    height: { xs: 44, sm: 52 },
    bgcolor: disabled ? alpha(HOME.deepUmber, 0.08) : HOME.deepUmber,
    color: disabled ? alpha(HOME.deepUmber, 0.35) : HOME.oldPaperSoft,
    border: `2px solid ${disabled ? alpha(HOME.deepUmber, 0.15) : HOME.morphoBlue}`,
    boxShadow: disabled ? "none" : `0 8px 24px ${alpha(HOME.deepUmber, 0.25)}`,
    transition: "all 0.25s ease",
    "&:hover": disabled
      ? {}
      : {
          bgcolor: HOME.deepUmberMid,
          transform: "scale(1.06)",
          boxShadow: `0 12px 28px ${alpha(HOME.deepUmber, 0.35)}`,
        },
  };
}

export const homeBodyFontSize = { xs: "1rem", md: "1.08rem" };

export function homePrimaryButtonSx() {
  return {
    textTransform: "none",
    fontWeight: 700,
    fontFamily: HOME.fontBody,
    borderRadius: "12px",
    px: 3,
    py: 1.25,
    fontSize: "0.95rem",
    color: "#fff",
    bgcolor: HOME.morphoBlue,
    boxShadow: `0 8px 22px ${alpha(BRAND.morphoBlue, 0.38)}`,
    "&:hover": {
      bgcolor: HOME.morphoBlueDark,
      boxShadow: `0 12px 28px ${alpha(BRAND.morphoBlue, 0.45)}`,
    },
  };
}

export function homeGhostButtonSx({ light = false } = {}) {
  return {
    textTransform: "none",
    fontWeight: 700,
    fontFamily: HOME.fontBody,
    borderRadius: "12px",
    px: 3,
    py: 1.25,
    fontSize: "0.95rem",
    color: light ? HOME.oldPaperSoft : HOME.deepUmber,
    borderColor: light ? "rgba(243, 237, 227, 0.42)" : HOME.border,
    borderWidth: 1.5,
    bgcolor: light ? "rgba(243, 237, 227, 0.08)" : "transparent",
    "&:hover": {
      borderColor: HOME.green,
      bgcolor: light ? alpha(HOME.gold, 0.16) : alpha(HOME.green, 0.08),
      borderWidth: 1.5,
      color: light ? HOME.oldPaperSoft : HOME.greenDark,
    },
  };
}

export function homeFieldSx() {
  return {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      bgcolor: "#fff",
      fontFamily: HOME.fontBody,
      "& fieldset": { borderColor: alpha(HOME.deepUmber, 0.18) },
      "&:hover fieldset": { borderColor: HOME.morphoBlue },
      "&.Mui-focused fieldset": { borderColor: HOME.morphoBlue, borderWidth: 2 },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: HOME.morphoBlue },
  };
}
