import { Groups, AdminPanelSettings, Person } from "@mui/icons-material";
import { brand } from "./missionCategoryConfig";

export { brand };

export const buildTeamImageUrl = (imageUrl) => {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  if (imageUrl.startsWith("uploads/")) return `/${imageUrl}`;
  if (imageUrl.startsWith("/uploads/")) return imageUrl;
  return imageUrl;
};

export const roleConfig = {
  "super-admin": {
    label: "Leadership",
    color: brand.deepUmber,
    gradient: `linear-gradient(135deg, ${brand.deepUmberDark}, ${brand.deepUmber})`,
    Icon: AdminPanelSettings,
  },
  admin: {
    label: "Team Lead",
    color: brand.morphoBlue,
    gradient: `linear-gradient(135deg, ${brand.morphoBlueDark}, ${brand.morphoBlue})`,
    Icon: Groups,
  },
  "regular user": {
    label: "Team Member",
    color: brand.morphoBlueMuted,
    gradient: `linear-gradient(135deg, ${brand.morphoBlue}, ${brand.morphoBlueMuted})`,
    Icon: Person,
  },
};

export const getRoleConfig = (role) =>
  roleConfig[role] || {
    label: "Team Member",
    color: brand.navy,
    gradient: `linear-gradient(135deg, ${brand.navy}, ${brand.navyLight})`,
    Icon: Person,
  };
