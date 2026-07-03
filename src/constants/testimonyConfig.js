import { FormatQuote, RateReview } from "@mui/icons-material";
import { brand } from "./missionCategoryConfig";

export { brand };

export const testimonyTheme = {
  color: "#ff9800",
  gradient: `linear-gradient(135deg, ${brand.navy} 0%, ${brand.navyLight} 55%, ${brand.gold} 100%)`,
  cardGradient: `linear-gradient(145deg, ${brand.navy} 0%, ${brand.navyLight} 70%, ${alphaHex(brand.gold, 0.35)} 100%)`,
  Icon: RateReview,
  QuoteIcon: FormatQuote,
  label: "Testimonial",
};

function alphaHex(hex, opacity) {
  return hex;
}

export const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
};

export const formatTestimonyDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
