import {
  School,
  Psychology,
  VolunteerActivism,
  LocalHospital,
  Group,
  EmojiPeople,
} from "@mui/icons-material";
import { brand } from "./missionCategoryConfig";

export { brand };

export const projectCategoryConfig = {
  education: {
    icon: School,
    color: brand.morphoBlue,
    gradient: `linear-gradient(135deg, ${brand.morphoBlue}, ${brand.morphoBlueMuted})`,
    label: "Education",
  },
  mental_health: {
    icon: Psychology,
    color: brand.deepUmber,
    gradient: `linear-gradient(135deg, ${brand.deepUmberDark}, ${brand.deepUmber})`,
    label: "Mental Health",
  },
  volunteer: {
    icon: VolunteerActivism,
    color: brand.morphoBlueDark,
    gradient: `linear-gradient(135deg, ${brand.morphoBlueDark}, ${brand.morphoBlue})`,
    label: "Volunteer Program",
  },
  health: {
    icon: LocalHospital,
    color: brand.morphoBlue,
    gradient: `linear-gradient(135deg, ${brand.morphoBlueDark}, ${brand.morphoBlueMuted})`,
    label: "Healthcare",
  },
  empowerment: {
    icon: Group,
    color: brand.deepUmberMid || brand.navyLight,
    gradient: `linear-gradient(135deg, ${brand.deepUmber}, ${brand.navyLight})`,
    label: "Empowerment",
  },
  poverty: {
    icon: EmojiPeople,
    color: brand.morphoBlueMuted,
    gradient: `linear-gradient(135deg, ${brand.morphoBlue}, ${brand.morphoBlueMuted})`,
    label: "Poverty Alleviation",
  },
};

export const getProjectCategoryLabel = (category) =>
  projectCategoryConfig[category]?.label || category?.replace(/_/g, " ") || "Project";

export const getStatusLabel = (status) => {
  const labels = {
    in_progress: "In Progress",
    completed: "Completed",
    planning: "Planning",
    on_hold: "On Hold",
    pending: "Pending",
  };
  return labels[status] || status?.replace(/_/g, " ") || "Unknown";
};

export const getStatusColor = (status) => {
  const colors = {
    in_progress: brand.morphoBlue,
    completed: brand.morphoBlueDark,
    planning: brand.deepUmberMid || brand.navyLight,
    on_hold: brand.deepUmber,
    pending: brand.morphoBlueMuted,
  };
  return colors[status] || brand.navy;
};

export const getProjectImages = (project) => {
  if (!project?.update_images?.length) return [];
  return project.update_images
    .filter((img) => img?.path && typeof img.path === "string" && img.path.trim())
    .map((img) => (img.path.startsWith("/") ? img.path : `/${img.path}`));
};

export const mapPublicProject = (project) => {
  const images = getProjectImages(project);
  return {
    id: project.id,
    title: project.name,
    description: project.description,
    image: images[0] || "/foundation-logo-removebg-preview.png",
    images: images.length ? images : ["/foundation-logo-removebg-preview.png"],
    location: [project.subcounty, project.county].filter(Boolean).join(", "),
    category: project.category,
    status: project.status,
    startDate: project.start_date,
    endDate: project.end_date,
    progress: project.progress || 0,
    targetIndividual: project.target_individual,
    updateImages: project.update_images || [],
  };
};
