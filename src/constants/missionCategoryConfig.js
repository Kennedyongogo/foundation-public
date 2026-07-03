import {
  School,
  Psychology,
  VolunteerActivism,
  LocalHospital,
  Group,
  EmojiPeople,
} from "@mui/icons-material";

export const brand = {
  navy: "#0E3B5E",
  navyLight: "#14527a",
  green: "#438B3E",
  greenLight: "#5da358",
  gold: "#F9A825",
  blue: "#0078D4",
};

export const categoryConfig = {
  educational_support: {
    icon: School,
    color: brand.blue,
    gradient: `linear-gradient(135deg, ${brand.blue}, #42a5f5)`,
  },
  mental_health_awareness: {
    icon: Psychology,
    color: "#e91e63",
    gradient: "linear-gradient(135deg, #e91e63, #f06292)",
  },
  poverty_alleviation: {
    icon: VolunteerActivism,
    color: brand.green,
    gradient: `linear-gradient(135deg, ${brand.green}, ${brand.greenLight})`,
  },
  community_empowerment: {
    icon: Group,
    color: brand.gold,
    gradient: `linear-gradient(135deg, ${brand.gold}, #fbc02d)`,
  },
  healthcare_access: {
    icon: LocalHospital,
    color: "#9c27b0",
    gradient: "linear-gradient(135deg, #9c27b0, #ba68c8)",
  },
  youth_development: {
    icon: EmojiPeople,
    color: "#00bcd4",
    gradient: "linear-gradient(135deg, #00bcd4, #4dd0e1)",
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
