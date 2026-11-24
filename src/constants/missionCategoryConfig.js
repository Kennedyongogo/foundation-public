import {
  School,
  Psychology,
  VolunteerActivism,
  LocalHospital,
  Group,
  EmojiPeople,
} from "@mui/icons-material";
import { BRAND } from "../brand";

/** Legacy keys mapped to old paper / deep umber / morpho blue */
export const brand = {
  navy: BRAND.deepUmber,
  navyLight: BRAND.deepUmberMid,
  green: BRAND.morphoBlue,
  greenLight: BRAND.morphoBlueMuted,
  gold: BRAND.morphoBlue,
  blue: BRAND.morphoBlueDark,
  oldPaper: BRAND.oldPaper,
  oldPaperSoft: BRAND.oldPaperSoft,
  deepUmber: BRAND.deepUmber,
  deepUmberDark: BRAND.deepUmberDark,
  deepUmberMid: BRAND.deepUmberMid,
  morphoBlue: BRAND.morphoBlue,
  morphoBlueDark: BRAND.morphoBlueDark,
  morphoBlueMuted: BRAND.morphoBlueMuted,
};

export const categoryConfig = {
  educational_support: {
    icon: School,
    color: BRAND.morphoBlue,
    gradient: `linear-gradient(135deg, ${BRAND.morphoBlue}, ${BRAND.morphoBlueMuted})`,
  },
  mental_health_awareness: {
    icon: Psychology,
    color: BRAND.deepUmberMid,
    gradient: `linear-gradient(135deg, ${BRAND.deepUmber}, ${BRAND.deepUmberMid})`,
  },
  poverty_alleviation: {
    icon: VolunteerActivism,
    color: BRAND.morphoBlueDark,
    gradient: `linear-gradient(135deg, ${BRAND.morphoBlueDark}, ${BRAND.morphoBlue})`,
  },
  community_empowerment: {
    icon: Group,
    color: BRAND.deepUmber,
    gradient: `linear-gradient(135deg, ${BRAND.deepUmberDark}, ${BRAND.deepUmber})`,
  },
  healthcare_access: {
    icon: LocalHospital,
    color: BRAND.morphoBlue,
    gradient: `linear-gradient(135deg, ${BRAND.morphoBlueDark}, ${BRAND.morphoBlueMuted})`,
  },
  youth_development: {
    icon: EmojiPeople,
    color: BRAND.morphoBlueMuted,
    gradient: `linear-gradient(135deg, ${BRAND.morphoBlue}, ${BRAND.morphoBlueMuted})`,
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
