import { Article as NewsIcon, Event as EventIcon } from "@mui/icons-material";
import { brand } from "./missionCategoryConfig";

export { brand };

export const buildImageUrl = (imageUrl) => {
  if (!imageUrl) return "/foundation-logo-removebg-preview.png";
  if (imageUrl.startsWith("http")) return imageUrl;
  if (imageUrl.startsWith("uploads/")) return `/${imageUrl}`;
  if (imageUrl.startsWith("/uploads/")) return imageUrl;
  return imageUrl;
};

export const getPostImage = (post) => {
  if (post?.type === "news" && post.images && Array.isArray(post.images) && post.images.length > 0) {
    const firstImage = post.images[0];
    const path = typeof firstImage === "object" ? firstImage.path : firstImage;
    return buildImageUrl(path);
  }
  if (post?.type === "event" && post.banner) {
    return buildImageUrl(post.banner);
  }
  return "/foundation-logo-removebg-preview.png";
};

export const getPostImages = (post) => {
  if (post?.type === "news" && post.images && Array.isArray(post.images) && post.images.length > 0) {
    return post.images
      .map((img) => {
        const path = typeof img === "object" ? img.path : img;
        return buildImageUrl(path);
      })
      .filter(Boolean);
  }
  if (post?.type === "event" && post.banner) {
    return [buildImageUrl(post.banner)];
  }
  return [];
};

export const getStatusColor = (status, type) => {
  if (type === "news") {
    const colors = {
      draft: "#9e9e9e",
      published: brand.green,
      archived: "#757575",
    };
    return colors[status] || brand.blue;
  }
  const colors = {
    upcoming: brand.blue,
    ongoing: brand.gold,
    completed: brand.green,
    cancelled: "#e91e63",
  };
  return colors[status] || brand.navy;
};

export const getStatusLabel = (status, type) => {
  if (type === "news") {
    const labels = { draft: "Draft", published: "Published", archived: "Archived" };
    return labels[status] || status;
  }
  const labels = {
    upcoming: "Upcoming",
    ongoing: "Ongoing",
    completed: "Completed",
    cancelled: "Cancelled",
  };
  return labels[status] || status;
};

export const getPostTheme = (type) => {
  if (type === "news") {
    return {
      color: brand.blue,
      gradient: `linear-gradient(135deg, ${brand.blue}, #42a5f5)`,
      Icon: NewsIcon,
      label: "News",
    };
  }
  return {
    color: brand.gold,
    gradient: `linear-gradient(135deg, ${brand.gold}, #fbc02d)`,
    Icon: EventIcon,
    label: "Event",
  };
};

export const formatPostDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatPostDateShort = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
