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
  CalendarToday,
  LocationOn,
  Image as ImageIcon,
  Close as CloseIcon,
  Schedule,
} from "@mui/icons-material";
import {
  brand,
  getPostTheme,
  getPostImages,
  getPostImage,
  getStatusLabel,
  getStatusColor,
  formatPostDate,
} from "../constants/postConfig";
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

const DetailRow = ({ icon: Icon, label, value, color = brand.green }) => (
  <Box
    sx={{
      display: "flex",
      gap: 1.5,
      p: 2,
      borderRadius: 2,
      bgcolor: alpha(brand.navy, 0.03),
      border: `1px solid ${alpha(brand.navy, 0.08)}`,
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: alpha(color, 0.12),
        color,
        flexShrink: 0,
      }}
    >
      <Icon fontSize="small" />
    </Box>
    <Box>
      <Typography
        variant="caption"
        sx={{
          color: alpha(brand.navy, 0.55),
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </Typography>
      <Typography variant="body1" sx={{ color: brand.navy, fontWeight: 600, lineHeight: 1.5 }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, url: "", alt: "" });

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/posts/public/${id}`);
      if (!response.ok) throw new Error("Failed to fetch post details");
      const result = await response.json();
      if (result.success && result.data) {
        setPost(result.data);
      } else {
        setError(result.message || "Post not found");
      }
    } catch (err) {
      setError(err.message || "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/", { state: { scrollTo: "posts-section" } });
  };

  const handleGetInvolved = () => {
    navigate("/", { state: { scrollTo: "contact-section" } });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" bgcolor="#f8fafc">
        <CircularProgress sx={{ color: brand.green }} size={48} />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box sx={{ width: "100%", py: 6, px: { xs: 2, sm: 4 } }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || "Post not found"}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ bgcolor: brand.navy, textTransform: "none", fontWeight: 600 }}
        >
          Back to News & Events
        </Button>
      </Box>
    );
  }

  const theme = getPostTheme(post.type);
  const IconComponent = theme.Icon;
  const images = getPostImages(post);
  const heroImage = getPostImage(post);
  const statusColor = getStatusColor(post.status, post.type);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#fff",
        mt: { xs: "-80px", sm: "-80px", md: 0 },
      }}
    >
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
        <Box
          component="img"
          src={heroImage}
          alt={post.title}
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "/foundation-logo-removebg-preview.png";
          }}
        />
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
            Back to News & Events
          </Button>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ alignSelf: { xs: "flex-start", sm: "center" }, flexWrap: "wrap" }}>
            <Chip
              label={getStatusLabel(post.status, post.type)}
              sx={{
                bgcolor: alpha("#fff", 0.14),
                color: "#fff",
                fontWeight: 700,
                border: `1px solid ${alpha(statusColor, 0.5)}`,
                backdropFilter: "blur(10px)",
              }}
            />
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
              }}
            >
              <IconComponent sx={{ color: brand.gold, fontSize: 24 }} />
            </Box>
            <Chip
              label={theme.label}
              sx={{
                bgcolor: alpha("#fff", 0.14),
                color: "#fff",
                fontWeight: 700,
                border: `1px solid ${alpha("#fff", 0.28)}`,
                backdropFilter: "blur(10px)",
              }}
            />
          </Stack>
        </Box>

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
              textShadow: `0 2px 16px ${alpha("#000", 0.35)}`,
            }}
          >
            {post.title}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
                  bgcolor: alpha(theme.color, 0.12),
                  color: theme.color,
                }}
              >
                <DescriptionIcon fontSize="small" />
              </Box>
              <Typography variant="h5" fontWeight={800} color={brand.navy}>
                {post.type === "news" ? "Full Story" : "About This Event"}
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
              {post.content}
            </Typography>
          </Box>

          {post.type === "event" && (
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
                  <Schedule fontSize="small" />
                </Box>
                <Typography variant="h5" fontWeight={800} color={brand.navy}>
                  Event Details
                </Typography>
              </Stack>
              <Stack spacing={1.5}>
                {post.start_date && (
                  <DetailRow
                    icon={CalendarToday}
                    label="Start Date"
                    value={formatPostDate(post.start_date)}
                    color={theme.color}
                  />
                )}
                {post.end_date && (
                  <DetailRow
                    icon={CalendarToday}
                    label="End Date"
                    value={formatPostDate(post.end_date)}
                    color={theme.color}
                  />
                )}
                {post.location && (
                  <DetailRow icon={LocationOn} label="Location" value={post.location} color={brand.green} />
                )}
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
                  {post.type === "news" ? "Photo Gallery" : "Event Banner"}
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
                    onClick={() => setLightbox({ open: true, url, alt: `${post.title} ${index + 1}` })}
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
                      alt={`${post.title} ${index + 1}`}
                      sx={{ width: "100%", height: { xs: 160, sm: 200 }, objectFit: "cover", display: "block" }}
                    />
                  </Box>
                )}
              />
            </Box>
          )}

          {post.createdAt && (
            <Box sx={{ ...sectionSx, py: { xs: 2, md: 3 } }}>
              <Typography variant="body2" sx={{ color: alpha(brand.navy, 0.55), fontWeight: 500 }}>
                Published: {formatPostDate(post.createdAt)}
              </Typography>
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
              {post.type === "event" ? "Interested in This Event?" : "Stay Connected With Us"}
            </Typography>
            <Typography variant="body1" sx={{ color: alpha("#fff", 0.85), mb: 3, maxWidth: 520, mx: "auto" }}>
              Join Mwalimu Hope Foundation and be part of the change we create across Kenya.
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
                View All News & Events
              </Button>
            </Stack>
          </Box>
        </MotionBox>
      </Box>

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
