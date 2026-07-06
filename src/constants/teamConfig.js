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
    color: brand.gold,
    gradient: `linear-gradient(135deg, ${brand.gold}, #fbc02d)`,
    Icon: AdminPanelSettings,
  },
  admin: {
    label: "Team Lead",
    color: brand.blue,
    gradient: `linear-gradient(135deg, ${brand.blue}, #42a5f5)`,
    Icon: Groups,
  },
  "regular user": {
    label: "Team Member",
    color: brand.green,
    gradient: `linear-gradient(135deg, ${brand.green}, #66bb6a)`,
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
