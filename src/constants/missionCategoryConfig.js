import {
  School,
  Psychology,
  VolunteerActivism,
  LocalHospital,
  Group,
  EmojiPeople,
} from "@mui/icons-material";
import { BRAND } from "../brand";

/** Legacy keys mapped to logo navy / sky blue / green / gold */
export const brand = {
  navy: BRAND.navy,
  navyLight: BRAND.navyMid,
  green: BRAND.green,
  greenLight: BRAND.greenMuted,
  gold: BRAND.gold,
  blue: BRAND.skyBlue,
  oldPaper: BRAND.oldPaper,
  oldPaperSoft: BRAND.oldPaperSoft,
  deepUmber: BRAND.navy,
  deepUmberDark: BRAND.navyDark,
  deepUmberMid: BRAND.navyMid,
  morphoBlue: BRAND.green,
  morphoBlueDark: BRAND.greenDark,
  morphoBlueMuted: BRAND.greenMuted,
  skyBlue: BRAND.skyBlue,
  skyBlueLight: BRAND.skyBlueLight,
};

export const categoryConfig = {
  educational_support: {
    icon: School,
    color: BRAND.skyBlue,
    gradient: `linear-gradient(135deg, ${BRAND.skyBlue}, ${BRAND.skyBlueLight})`,
  },
  mental_health_awareness: {
    icon: Psychology,
    color: BRAND.navyMid,
    gradient: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.navyMid})`,
  },
  poverty_alleviation: {
    icon: VolunteerActivism,
    color: BRAND.gold,
    gradient: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldMuted})`,
  },
  community_empowerment: {
    icon: Group,
    color: BRAND.green,
    gradient: `linear-gradient(135deg, ${BRAND.greenDark}, ${BRAND.green})`,
  },
  healthcare_access: {
    icon: LocalHospital,
    color: BRAND.greenMuted,
    gradient: `linear-gradient(135deg, ${BRAND.green}, ${BRAND.greenMuted})`,
  },
  youth_development: {
    icon: EmojiPeople,
    color: BRAND.skyBlueLight,
    gradient: `linear-gradient(135deg, ${BRAND.skyBlue}, ${BRAND.navyMid})`,
  },
};

export const buildImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("uploads/")) return `/${imagePath}`;
  if (imagePath.startsWith("/uploads/")) return imagePath;
  return imagePath;
};

export const getCategoryLabel = (categoryType) => {
  const labels = {
    educational_support: "Educational Support",
    mental_health_awareness: "Mental Health Awareness",
    poverty_alleviation: "Poverty Alleviation",
    community_empowerment: "Community Empowerment",
    healthcare_access: "Healthcare Access",
    youth_development: "Youth Development",
  };
  return labels[categoryType] || categoryType?.replace(/_/g, " ");
};

export const getCategoryImages = (cat) => {
  let images = cat?.images;
  if (typeof images === "string") {
    try {
      images = JSON.parse(images);
    } catch {
      images = [];
    }
  }
  if (Array.isArray(images) && images.length > 0) {
    return images
      .map((img) => buildImageUrl(typeof img === "object" ? img.path : img))
      .filter(Boolean);
  }
  if (cat?.image) return [buildImageUrl(cat.image)];
  return [];
};
