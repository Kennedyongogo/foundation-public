import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  ArrowBack,
  Favorite,
  Description as DescriptionIcon,
  TrackChanges,
  Image as ImageIcon,
  Close as CloseIcon,
  CheckCircle,
} from "@mui/icons-material";
import {
  brand,
  categoryConfig,
  getCategoryLabel,
  getCategoryImages,
} from "../constants/missionCategoryConfig";
import MissionImageGrid from "../components/Mission/MissionImageGrid";

const MotionBox = motion(Box);

const sectionSx = {
  width: "100%",
  p: { xs: 3, sm: 4, md: 5 },
  bgcolor: "#fff",
  borderTop: `1px solid ${alpha(brand.navy, 0.08)}`,
  borderRadius: 0,
  boxShadow: "none",
};

const contentPad = { px: { xs: 2, sm: 4, md: 5 } };

export default function MissionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, url: "", alt: "" });

  useEffect(() => {
    fetchMission();
  }, [id]);

  const fetchMission = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/mission-categories/public/${id}`);
      if (!response.ok) throw new Error("Failed to fetch mission details");
      const result = await response.json();
      if (result.success && result.data) {
        setMission(result.data);
      } else {
        setError(result.message || "Mission not found");
      }
    } catch (err) {
      setError(err.message || "Failed to load mission");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("mission-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleGetInvolved = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" bgcolor="#f8fafc">
        <CircularProgress sx={{ color: brand.green }} size={48} />
      </Box>
    );
  }

  if (error || !mission) {
    return (
      <Box sx={{ width: "100%", py: 6, px: { xs: 2, sm: 4 } }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || "Mission not found"}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ bgcolor: brand.navy, textTransform: "none", fontWeight: 600 }}
        >
          Back to Our Mission
        </Button>
      </Box>
    );
  }

  const config = categoryConfig[mission.category] || categoryConfig.educational_support;
  const IconComponent = config.icon;
  const images = getCategoryImages(mission);
  const heroImage = images[0] || null;
  const impacts = Array.isArray(mission.impact)
    ? mission.impact.filter(Boolean)
    : mission.impact
      ? [mission.impact]
      : [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#fff",
        mt: { xs: "-80px", sm: "-80px", md: 0 },
      }}
    >
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 280, sm: 360, md: 420 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        {heroImage ? (
          <Box
            component="img"
            src={heroImage}
            alt={mission.title}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: config.gradient,
            }}
          />
        )}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, ${alpha(brand.navy, 0.72)} 0%, ${alpha(brand.navy, 0.2)} 28%, ${alpha(brand.navy, 0.55)} 62%, ${alpha(brand.navy, 0.92)} 100%)`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${brand.green}, ${brand.gold})`,
          }}
        />

        {/* Floating top controls */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 80, sm: 80, md: 0 },
            left: 0,
            right: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: 1.5,
            pt: { xs: 1.5, sm: 2, md: 2.5 },
            pb: 1.5,
            ...contentPad,
          }}
        >
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{
              alignSelf: { xs: "flex-start", sm: "center" },
              color: "#fff",
              bgcolor: alpha("#fff", 0.14),
              border: `1px solid ${alpha("#fff", 0.28)}`,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              backdropFilter: "blur(10px)",
              boxShadow: `0 4px 20px ${alpha("#000", 0.2)}`,
              "&:hover": { bgcolor: alpha(brand.gold, 0.28) },
            }}
          >
            Back to Our Mission
          </Button>

          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha("#fff", 0.14),
                border: `1px solid ${alpha(brand.gold, 0.5)}`,
                backdropFilter: "blur(10px)",
                boxShadow: `0 4px 16px ${alpha("#000", 0.18)}`,
              }}
            >
              <IconComponent sx={{ color: brand.gold, fontSize: 24 }} />
            </Box>
            <Chip
              label={getCategoryLabel(mission.category)}
              sx={{
                bgcolor: alpha("#fff", 0.14),
                color: "#fff",
                fontWeight: 700,
                border: `1px solid ${alpha("#fff", 0.28)}`,
                backdropFilter: "blur(10px)",
                boxShadow: `0 4px 16px ${alpha("#000", 0.18)}`,
              }}
            />
          </Stack>
        </Box>

        {/* Title at bottom */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            pb: { xs: 3, md: 5 },
            pt: { xs: 10, sm: 12 },
            ...contentPad,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontWeight: 900,
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              width: "100%",
              textShadow: `0 2px 16px ${alpha("#000", 0.35)}`,
            }}
          >
            {mission.title}
          </Typography>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ width: "100%" }}>
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={sectionSx}>
              <Stack direction="row" alignItems="center" spacing={1.5} mb={2.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: alpha(config.color, 0.12),
                    color: config.color,
                  }}
                >
                  <DescriptionIcon fontSize="small" />
                </Box>
                <Typography variant="h5" fontWeight={800} color={brand.navy}>
                  About This Program
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                sx={{
                  color: alpha(brand.navy, 0.8),
                  lineHeight: 1.85,
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  whiteSpace: "pre-wrap",
                }}
              >
                {mission.description}
              </Typography>
          </Box>

          {impacts.length > 0 && (
            <Box sx={sectionSx}>
                <Stack direction="row" alignItems="center" spacing={1.5} mb={2.5}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: alpha(brand.gold, 0.15),
                      color: brand.gold,
                    }}
                  >
                    <TrackChanges fontSize="small" />
                  </Box>
                  <Typography variant="h5" fontWeight={800} color={brand.navy}>
                    Key Impacts
                  </Typography>
                </Stack>
                <Stack spacing={1.5}>
                  {impacts.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: alpha(brand.green, 0.05),
                        border: `1px solid ${alpha(brand.green, 0.12)}`,
                      }}
                    >
                      <CheckCircle sx={{ color: brand.green, fontSize: 22, mt: 0.25, flexShrink: 0 }} />
                      <Typography
                        variant="body1"
                        sx={{ color: alpha(brand.navy, 0.85), lineHeight: 1.7 }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
            </Box>
          )}

          {images.length > 0 && (
            <Box sx={sectionSx}>
                <Stack direction="row" alignItems="center" spacing={1.5} mb={2.5}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: alpha(brand.green, 0.12),
                      color: brand.green,
                    }}
                  >
                    <ImageIcon fontSize="small" />
                  </Box>
                  <Typography variant="h5" fontWeight={800} color={brand.navy}>
                    Program Gallery
                    <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({images.length} {images.length === 1 ? "photo" : "photos"})
                    </Typography>
                  </Typography>
                </Stack>
                <MissionImageGrid
                  images={images}
                  renderItem={(url, index) => (
                    <Box
                      key={index}
                      onClick={() => setLightbox({ open: true, url, alt: `${mission.title} ${index + 1}` })}
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "pointer",
                        border: `1px solid ${alpha(brand.navy, 0.1)}`,
                        transition: "transform 0.25s ease, box-shadow 0.25s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: `0 12px 32px ${alpha(brand.navy, 0.15)}`,
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={url}
                        alt={`${mission.title} ${index + 1}`}
                        sx={{ width: "100%", height: { xs: 160, sm: 200 }, objectFit: "cover", display: "block" }}
                      />
                    </Box>
                  )}
                />
            </Box>
          )}

          <Box
            sx={{
              ...sectionSx,
              background: `linear-gradient(135deg, ${brand.navy} 0%, ${brand.navyLight} 100%)`,
              borderTop: "none",
              textAlign: "center",
            }}
          >
              <Favorite sx={{ fontSize: 40, color: brand.gold, mb: 1 }} />
              <Typography variant="h5" fontWeight={800} color="#fff" mb={1}>
                Want to Support This Mission?
              </Typography>
              <Typography variant="body1" sx={{ color: alpha("#fff", 0.85), mb: 3, maxWidth: 520, mx: "auto" }}>
                Join Mwalimu Hope Foundation in making a lasting difference. Every contribution helps us reach more
                communities across Kenya.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetInvolved}
                  sx={{
                    bgcolor: brand.green,
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: 2,
                    px: 4,
                    boxShadow: `0 8px 24px ${alpha(brand.green, 0.45)}`,
                    "&:hover": { bgcolor: brand.greenLight },
                  }}
                >
                  Get Involved
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleBack}
                  sx={{
                    color: "#fff",
                    borderColor: alpha("#fff", 0.4),
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 2,
                    px: 4,
                    "&:hover": { borderColor: "#fff", bgcolor: alpha("#fff", 0.08) },
                  }}
                >
                  View All Missions
                </Button>
              </Stack>
          </Box>
        </MotionBox>
      </Box>

      {/* Lightbox */}
      {lightbox.open && (
        <Box
          onClick={() => setLightbox({ open: false, url: "", alt: "" })}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: alpha("#000", 0.88),
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <IconButton
            onClick={() => setLightbox({ open: false, url: "", alt: "" })}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "#fff",
              bgcolor: alpha("#fff", 0.1),
              "&:hover": { bgcolor: alpha("#fff", 0.2) },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={lightbox.url}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
            sx={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: 2, objectFit: "contain" }}
          />
        </Box>
      )}
    </Box>
  );
}
