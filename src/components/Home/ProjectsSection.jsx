import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Fade,
  Chip,
  CircularProgress,
  IconButton,
  Button,
  LinearProgress,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ChevronLeft,
  ChevronRight,
  ArrowForward,
} from "@mui/icons-material";
import {
  brand,
  projectCategoryConfig,
  getProjectCategoryLabel,
  getStatusLabel,
  getStatusColor,
  mapPublicProject,
} from "../../constants/projectConfig";

const carouselArrowSx = (disabled) => ({
  flexShrink: 0,
  width: { xs: 44, sm: 52 },
  height: { xs: 44, sm: 52 },
  bgcolor: disabled ? alpha(brand.navy, 0.08) : brand.navy,
  color: disabled ? alpha(brand.navy, 0.35) : "#fff",
  border: `2px solid ${disabled ? alpha(brand.navy, 0.15) : brand.gold}`,
  boxShadow: disabled ? "none" : `0 8px 24px ${alpha(brand.navy, 0.25)}`,
  transition: "all 0.25s ease",
  "&:hover": disabled
    ? {}
    : {
        bgcolor: brand.navyLight,
        transform: "scale(1.06)",
        boxShadow: `0 12px 28px ${alpha(brand.navy, 0.35)}`,
      },
});

const CARD_GAP_PX = 24;
const VISIBLE_CARDS_LG = 4;
const VISIBLE_CARDS_MD = 3;

const projectCardWrapSx = {
  flexShrink: 0,
  display: "flex",
  scrollSnapAlign: "start",
  minHeight: 460,
  height: 460,
  width: {
    md: `calc((100% - ${CARD_GAP_PX * (VISIBLE_CARDS_MD - 1)}px) / ${VISIBLE_CARDS_MD})`,
    lg: `calc((100% - ${CARD_GAP_PX * (VISIBLE_CARDS_LG - 1)}px) / ${VISIBLE_CARDS_LG})`,
  },
  flex: {
    md: `0 0 calc((100% - ${CARD_GAP_PX * (VISIBLE_CARDS_MD - 1)}px) / ${VISIBLE_CARDS_MD})`,
    lg: `0 0 calc((100% - ${CARD_GAP_PX * (VISIBLE_CARDS_LG - 1)}px) / ${VISIBLE_CARDS_LG})`,
  },
};

const edgeArrowSx = (disabled) => ({
  ...carouselArrowSx(disabled),
  width: { xs: 40, sm: 44 },
  height: { xs: 40, sm: 44 },
  alignSelf: "center",
});

const ProjectCard = ({ project, onViewMore }) => {
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const config = projectCategoryConfig[project.category] || projectCategoryConfig.education;
  const IconComponent = config.icon;
  const images = project.images || [];
  const hasMultipleImages = images.length > 1;
  const currentImageUrl = images[currentImageIndex] || null;
  const statusColor = getStatusColor(project.status);

  useEffect(() => {
    if (!hasMultipleImages) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  return (
    <Card
      data-project-card
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 460,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        border: `1px solid ${alpha(brand.navy, 0.1)}`,
        bgcolor: "#fff",
        boxShadow: `0 4px 24px ${alpha(brand.navy, 0.08)}`,
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease",
        cursor: "pointer",
        scrollSnapAlign: "start",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: `0 20px 48px ${alpha(brand.navy, 0.16)}`,
          borderColor: alpha(config.color, 0.35),
        },
      }}
      onClick={() => onViewMore(project)}
    >
      <Box sx={{ position: "relative", height: 220, flexShrink: 0, overflow: "hidden" }}>
        {currentImageUrl && !imageError ? (
          <>
            <Box
              component="img"
              src={currentImageUrl}
              alt={project.title}
              onError={() => setImageError(true)}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
                ".MuiCard-root:hover &": { transform: "scale(1.05)" },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(180deg, transparent 40%, ${alpha(brand.navy, 0.75)} 100%)`,
              }}
            />
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(145deg, ${alpha(config.color, 0.12)}, ${alpha(brand.navy, 0.06)})`,
            }}
          >
            <IconComponent sx={{ fontSize: 72, color: config.color, opacity: 0.85 }} />
          </Box>
        )}

        <Chip
          icon={<IconComponent sx={{ fontSize: "16px !important", color: `${config.color} !important` }} />}
          label={getProjectCategoryLabel(project.category)}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            maxWidth: "calc(100% - 28px)",
            fontWeight: 700,
            fontSize: "0.7rem",
            bgcolor: alpha("#fff", 0.92),
            color: config.color,
            border: `1px solid ${alpha(config.color, 0.25)}`,
            backdropFilter: "blur(8px)",
            "& .MuiChip-label": { overflow: "hidden", textOverflow: "ellipsis" },
            "& .MuiChip-icon": { color: config.color },
          }}
        />

        <Chip
          label={getStatusLabel(project.status)}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            fontWeight: 700,
            fontSize: "0.7rem",
            bgcolor: alpha("#fff", 0.92),
            color: statusColor,
            border: `1px solid ${alpha(statusColor, 0.25)}`,
            backdropFilter: "blur(8px)",
          }}
        />

        {hasMultipleImages && (
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 0.75,
              zIndex: 2,
            }}
          >
            {images.map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: currentImageIndex === idx ? 22 : 7,
                  height: 7,
                  borderRadius: 4,
                  bgcolor: currentImageIndex === idx ? brand.gold : alpha("#fff", 0.55),
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          flex: "1 1 auto",
          width: "100%",
          minWidth: 0,
          minHeight: 0,
          overflow: "hidden",
          boxSizing: "border-box",
          p: { xs: 2, sm: 3 },
          "&:last-child": { pb: { xs: 2, sm: 3 } },
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 800,
            color: brand.navy,
            fontSize: { xs: "1.05rem", sm: "1.15rem" },
            lineHeight: 1.35,
            width: "100%",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {project.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: alpha(brand.navy, 0.65),
            width: "100%",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.65,
            flex: "1 1 auto",
            minHeight: 0,
            fontSize: { xs: "0.85rem", sm: "0.9rem" },
          }}
        >
          {project.description}
        </Typography>

        <Box sx={{ flexShrink: 0, pt: 0.25 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: alpha(brand.navy, 0.55), fontWeight: 600 }}>
              Progress
            </Typography>
            <Typography variant="caption" sx={{ color: brand.navy, fontWeight: 700 }}>
              {project.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={project.progress}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: alpha(brand.navy, 0.08),
              "& .MuiLinearProgress-bar": {
                borderRadius: 3,
                bgcolor: project.status === "completed" ? brand.green : config.color,
              },
            }}
          />
        </Box>

        <Button
          variant="contained"
          size="medium"
          endIcon={<ArrowForward />}
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            onViewMore(project);
          }}
          sx={{
            mt: "auto",
            flexShrink: 0,
            py: 1.25,
            fontWeight: 700,
            textTransform: "none",
            borderRadius: 2,
            background: config.gradient,
            boxShadow: `0 6px 20px ${alpha(config.color, 0.35)}`,
            "&:hover": {
              background: config.gradient,
              filter: "brightness(1.08)",
              boxShadow: `0 10px 28px ${alpha(config.color, 0.45)}`,
            },
          }}
        >
          View Project
        </Button>
      </CardContent>
    </Card>
  );
};

export default function ProjectsSection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const scrollRef = useRef(null);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    fetchProjects();
  }, []);

  useEffect(() => {
    setSlideIndex(0);
  }, [projects.length]);

  useEffect(() => {
    if (isSmallScreen) return undefined;
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return undefined;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [projects, loading, updateScrollButtons, isSmallScreen]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/public-projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      if (data.success && data.data) {
        setProjects(data.data.map(mapPublicProject));
      } else {
        setProjects([]);
      }
    } catch (err) {
      setError(err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const scrollCarousel = (direction) => {
    if (isSmallScreen) {
      setSlideIndex((prev) => Math.max(0, Math.min(projects.length - 1, prev + direction)));
      return;
    }
    const el = scrollRef.current;
    if (!el) return;
    const firstWrap = el.querySelector("[data-project-card-wrap]");
    const gap = CARD_GAP_PX;
    const step = firstWrap ? firstWrap.offsetWidth + gap : el.clientWidth * 0.85;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const handleViewMore = (project) => {
    navigate(`/project/${project.id}`);
  };

  const showArrows = projects.length > 0;

  return (
    <Box
      id="projects-section"
      sx={{
        pt: { xs: 4, md: 6 },
        pb: { xs: 2, md: 3 },
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(180deg, ${alpha(brand.green, 0.04)} 0%, #fff 45%, ${alpha(brand.navy, 0.03)} 100%)`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "45%",
          height: "60%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(brand.green, 0.1)} 0%, transparent 70%)`,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-15%",
          right: "-8%",
          width: "40%",
          height: "50%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(brand.gold, 0.1)} 0%, transparent 70%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Fade in={isVisible} timeout={900}>
          <Box sx={{ textAlign: "center", mb: { xs: 2, md: 2.5 }, px: { xs: 2, sm: 4 } }}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.2em", fontWeight: 700, color: brand.green, fontSize: "0.75rem" }}
            >
              Community Impact
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 1,
                mb: 2,
                fontWeight: 900,
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
                color: brand.navy,
                letterSpacing: "-0.02em",
              }}
            >
              Our Projects
            </Typography>
            <Box
              sx={{
                width: 72,
                height: 4,
                mx: "auto",
                mb: 2.5,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${brand.green}, ${brand.gold})`,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                maxWidth: 820,
                mx: "auto",
                px: { xs: 2, sm: 0 },
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.75,
                color: alpha(brand.navy, 0.75),
              }}
            >
              Discover our ongoing and completed community empowerment initiatives across Kenya.
            </Typography>
          </Box>
        </Fade>

        {loading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress sx={{ color: brand.green }} />
          </Box>
        ) : error ? (
          <Box textAlign="center" py={4} px={2}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : projects.length === 0 ? (
          <Box textAlign="center" py={4} px={2}>
            <Typography color="text.secondary">No projects available at the moment.</Typography>
          </Box>
        ) : isSmallScreen ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "stretch",
              width: "100%",
              gap: { xs: 0.75, sm: 1 },
              px: { xs: 0.5, sm: 1 },
            }}
          >
            {showArrows && (
              <IconButton
                onClick={() => scrollCarousel(-1)}
                disabled={slideIndex === 0}
                aria-label="Previous project"
                sx={edgeArrowSx(slideIndex === 0)}
              >
                <ChevronLeft />
              </IconButton>
            )}
            <Box sx={{ flex: 1, minWidth: 0, py: 1, minHeight: 460 }}>
              {projects[slideIndex] && (
                <Box sx={{ height: 460, display: "flex" }}>
                  <ProjectCard project={projects[slideIndex]} onViewMore={handleViewMore} />
                </Box>
              )}
            </Box>
            {showArrows && (
              <IconButton
                onClick={() => scrollCarousel(1)}
                disabled={slideIndex >= projects.length - 1}
                aria-label="Next project"
                sx={edgeArrowSx(slideIndex >= projects.length - 1)}
              >
                <ChevronRight />
              </IconButton>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: { sm: 2, md: 3 },
              width: "100%",
            }}
          >
            {showArrows && (
              <IconButton
                onClick={() => scrollCarousel(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll projects left"
                sx={carouselArrowSx(!canScrollLeft)}
              >
                <ChevronLeft />
              </IconButton>
            )}

            <Box
              ref={scrollRef}
              sx={{
                display: "flex",
                gap: 3,
                overflowX: "auto",
                overflowY: "hidden",
                flex: 1,
                minWidth: 0,
                width: "100%",
                py: 1,
                pb: 0,
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {projects.map((project) => (
                <Box key={project.id} data-project-card-wrap sx={projectCardWrapSx}>
                  <ProjectCard project={project} onViewMore={handleViewMore} />
                </Box>
              ))}
            </Box>

            {showArrows && (
              <IconButton
                onClick={() => scrollCarousel(1)}
                disabled={!canScrollRight}
                aria-label="Scroll projects right"
                sx={carouselArrowSx(!canScrollRight)}
              >
                <ChevronRight />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
