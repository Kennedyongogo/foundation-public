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
    color: brand.blue,
    gradient: `linear-gradient(135deg, ${brand.blue}, #42a5f5)`,
    label: "Education",
  },
  mental_health: {
    icon: Psychology,
    color: "#e91e63",
    gradient: "linear-gradient(135deg, #e91e63, #f06292)",
    label: "Mental Health",
  },
  volunteer: {
    icon: VolunteerActivism,
    color: brand.green,
    gradient: `linear-gradient(135deg, ${brand.green}, ${brand.greenLight})`,
    label: "Volunteer Program",
  },
  health: {
    icon: LocalHospital,
    color: "#00acc1",
    gradient: "linear-gradient(135deg, #00acc1, #26c6da)",
    label: "Healthcare",
  },
  empowerment: {
    icon: Group,
    color: brand.gold,
    gradient: `linear-gradient(135deg, ${brand.gold}, #fbc02d)`,
    label: "Empowerment",
  },
  poverty: {
    icon: EmojiPeople,
    color: "#8e24aa",
    gradient: "linear-gradient(135deg, #8e24aa, #ab47bc)",
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
    in_progress: brand.blue,
    completed: brand.green,
    planning: brand.gold,
    on_hold: "#e91e63",
    pending: brand.gold,
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
