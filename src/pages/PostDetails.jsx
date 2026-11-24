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
  getPostTheme,
  getPostImages,
  getPostImage,
  getStatusLabel,
  getStatusColor,
  formatPostDate,
} from "../constants/postConfig";
import MissionImageGrid from "../components/Mission/MissionImageGrid";
import { HOME } from "../components/Home/homeShared";

const MotionBox = motion(Box);

const sidePad = { px: { xs: 1.5, sm: 2, md: 2.5 } };

function SectionCard({ children, sx = {} }) {
  return (
    <Box
      sx={{
        width: "100%",
        ...sidePad,
        py: { xs: 1.25, md: 1.75 },
        bgcolor: HOME.oldPaperSoft,
        ...sx,
      }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: { xs: "16px", md: "20px" },
          border: `1px solid ${HOME.border}`,
          boxShadow: HOME.shadowSm,
          p: { xs: 2.25, sm: 3, md: 3.5 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function SectionTitle({ icon: Icon, title, accent = HOME.morphoBlue, suffix }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} mb={2.5}>
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: "12px",
          display: "grid",
          placeItems: "center",
          bgcolor: alpha(accent, 0.12),
          color: accent,
          border: `1px solid ${alpha(accent, 0.22)}`,
          flexShrink: 0,
        }}
      >
        <Icon fontSize="small" />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: HOME.fontDisplay,
            fontWeight: 800,
            fontSize: { xs: "1.25rem", md: "1.45rem" },
            color: HOME.deepUmber,
            lineHeight: 1.2,
          }}
        >
          {title}
          {suffix}
        </Typography>
      </Box>
    </Stack>
  );
}

function DetailRow({ icon: Icon, label, value, color = HOME.morphoBlue }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        p: 1.75,
        borderRadius: "14px",
        bgcolor: alpha(HOME.oldPaper, 0.7),
        border: `1px solid ${HOME.border}`,
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          borderColor: alpha(HOME.morphoBlue, 0.35),
          boxShadow: HOME.shadowSm,
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "12px",
          display: "grid",
          placeItems: "center",
          bgcolor: alpha(color, 0.12),
          color,
          flexShrink: 0,
        }}
      >
        <Icon fontSize="small" />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: HOME.fontBody,
            fontSize: "0.68rem",
            color: alpha(HOME.deepUmber, 0.55),
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            mb: 0.25,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontFamily: HOME.fontBody,
            color: HOME.deepUmber,
            fontWeight: 600,
            lineHeight: 1.45,
            fontSize: "0.95rem",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

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

  const goHomeSection = (sectionId) => {
    navigate({ pathname: "/", hash: sectionId }, { state: { scrollTo: sectionId } });
  };

  const handleBack = () => {
    goHomeSection("posts-section");
  };

  const handleGetInvolved = () => {
    goHomeSection("contact-section");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        bgcolor={HOME.oldPaperSoft}
      >
        <CircularProgress sx={{ color: HOME.morphoBlue }} size={48} />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box sx={{ width: "100%", py: 6, ...sidePad, bgcolor: HOME.oldPaperSoft, minHeight: "60vh" }}>
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error || "Post not found"}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{
            bgcolor: HOME.deepUmber,
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "12px",
            fontFamily: HOME.fontBody,
            "&:hover": { bgcolor: HOME.deepUmberDark },
          }}
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
        bgcolor: HOME.oldPaperSoft,
        mt: { xs: "-80px", sm: "-80px", md: 0 },
      }}
    >
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 300, sm: 380, md: 440 },
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
            background: `
              linear-gradient(180deg, ${alpha(HOME.deepUmberDark, 0.78)} 0%, ${alpha(HOME.deepUmber, 0.28)} 34%, ${alpha(HOME.deepUmberDark, 0.55)} 62%, ${alpha(HOME.deepUmberDark, 0.94)} 100%),
              linear-gradient(90deg, ${alpha(HOME.morphoBlueDark, 0.22)} 0%, transparent 48%)
            `,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${HOME.morphoBlue} 0%, ${HOME.oldPaper} 55%, ${HOME.deepUmberMid} 100%)`,
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
            ...sidePad,
          }}
        >
          <IconButton
            aria-label="Back to news and events"
            onClick={handleBack}
            sx={{
              alignSelf: { xs: "flex-start", sm: "center" },
              width: 42,
              height: 42,
              color: HOME.oldPaperSoft,
              bgcolor: alpha(HOME.deepUmberDark, 0.45),
              border: `1px solid ${alpha(HOME.oldPaperSoft, 0.28)}`,
              backdropFilter: "blur(10px)",
              "&:hover": {
                bgcolor: alpha(HOME.morphoBlue, 0.35),
                borderColor: HOME.morphoBlueMuted,
              },
            }}
          >
            <ArrowBack />
          </IconButton>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
          >
            <Chip
              label={getStatusLabel(post.status, post.type)}
              sx={{
                bgcolor: alpha(HOME.oldPaperSoft, 0.14),
                color: HOME.oldPaperSoft,
                fontWeight: 700,
                fontFamily: HOME.fontBody,
                border: `1px solid ${alpha(statusColor, 0.65)}`,
                backdropFilter: "blur(10px)",
              }}
            />
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                display: "grid",
                placeItems: "center",
                bgcolor: alpha(HOME.oldPaperSoft, 0.14),
                border: `1px solid ${alpha(HOME.morphoBlueMuted, 0.55)}`,
                backdropFilter: "blur(10px)",
              }}
            >
              <IconComponent sx={{ color: HOME.morphoBlueMuted, fontSize: 22 }} />
            </Box>
            <Chip
              label={theme.label}
              sx={{
                bgcolor: alpha(HOME.oldPaperSoft, 0.14),
                color: HOME.oldPaperSoft,
                fontWeight: 700,
                fontFamily: HOME.fontBody,
                border: `1px solid ${alpha(HOME.oldPaperSoft, 0.28)}`,
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
            pb: { xs: 3, md: 4.5 },
            pt: { xs: 10, sm: 12 },
            ...sidePad,
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontFamily: HOME.fontDisplay,
              color: HOME.oldPaperSoft,
              fontWeight: 800,
              fontSize: { xs: "1.75rem", sm: "2.4rem", md: "3rem" },
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              textShadow: `0 2px 18px ${alpha("#000", 0.35)}`,
              maxWidth: 900,
            }}
          >
            {post.title}
          </Typography>
          {post.type === "event" && post.location && (
            <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mt: 1.25 }}>
              <LocationOn sx={{ fontSize: 18, color: HOME.morphoBlueMuted }} />
              <Typography
                sx={{
                  fontFamily: HOME.fontBody,
                  color: alpha(HOME.oldPaperSoft, 0.88),
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                {post.location}
              </Typography>
            </Stack>
          )}
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ width: "100%", pb: { xs: 2, md: 3 } }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <SectionCard>
            <SectionTitle
              icon={DescriptionIcon}
              title={post.type === "news" ? "Full Story" : "About This Event"}
              accent={HOME.morphoBlue}
            />
            <Typography
              sx={{
                fontFamily: HOME.fontBody,
                color: alpha(HOME.deepUmber, 0.82),
                lineHeight: 1.8,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                whiteSpace: "pre-wrap",
              }}
            >
              {post.content}
            </Typography>
          </SectionCard>

          {post.type === "event" && (post.start_date || post.end_date || post.location) && (
            <SectionCard>
              <SectionTitle icon={Schedule} title="Event Details" accent={HOME.morphoBlueDark} />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 1.5,
                }}
              >
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
                    color={HOME.deepUmberMid}
                  />
                )}
                {post.location && (
                  <DetailRow
                    icon={LocationOn}
                    label="Location"
                    value={post.location}
                    color={HOME.morphoBlue}
                  />
                )}
              </Box>
            </SectionCard>
          )}

          {images.length > 0 && (
            <SectionCard>
              <SectionTitle
                icon={ImageIcon}
                title={post.type === "news" ? "Photo Gallery" : "Event Banner"}
                accent={HOME.deepUmber}
                suffix={
                  <Typography
                    component="span"
                    sx={{
                      ml: 1,
                      fontFamily: HOME.fontBody,
                      fontSize: "0.85rem",
                      color: alpha(HOME.deepUmber, 0.55),
                      fontWeight: 600,
                    }}
                  >
                    ({images.length} {images.length === 1 ? "photo" : "photos"})
                  </Typography>
                }
              />
              <MissionImageGrid
                images={images}
                renderItem={(url, index) => (
                  <Box
                    key={index}
                    onClick={() => setLightbox({ open: true, url, alt: `${post.title} ${index + 1}` })}
                    sx={{
                      borderRadius: "14px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: `1px solid ${HOME.border}`,
                      transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: HOME.shadowMd,
                        borderColor: alpha(HOME.morphoBlue, 0.4),
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={url}
                      alt={`${post.title} ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: { xs: 160, sm: 200 },
                        objectFit: "cover",
                        display: "block",
                        bgcolor: HOME.oldPaper,
                      }}
                    />
                  </Box>
                )}
              />
            </SectionCard>
          )}

          {post.createdAt && (
            <Box sx={{ width: "100%", ...sidePad, py: { xs: 0.5, md: 1 } }}>
              <Typography
                sx={{
                  fontFamily: HOME.fontBody,
                  color: alpha(HOME.deepUmber, 0.55),
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  px: 0.5,
                }}
              >
                Published: {formatPostDate(post.createdAt)}
              </Typography>
            </Box>
          )}

          <Box sx={{ width: "100%", ...sidePad, py: { xs: 1.25, md: 1.75 } }}>
            <Box
              sx={{
                borderRadius: { xs: "16px", md: "20px" },
                p: { xs: 3, md: 4 },
                textAlign: "center",
                background: `linear-gradient(145deg, ${HOME.deepUmberDark} 0%, ${HOME.deepUmber} 48%, ${HOME.deepUmberMid} 100%)`,
                boxShadow: HOME.shadowMd,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -50,
                  right: -40,
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: alpha(HOME.morphoBlue, 0.18),
                  pointerEvents: "none",
                },
              }}
            >
              <Favorite
                sx={{
                  fontSize: 40,
                  color: HOME.morphoBlueMuted,
                  mb: 1,
                  position: "relative",
                  zIndex: 1,
                }}
              />
              <Typography
                sx={{
                  fontFamily: HOME.fontDisplay,
                  fontWeight: 800,
                  fontSize: { xs: "1.35rem", md: "1.6rem" },
                  color: HOME.oldPaperSoft,
                  mb: 1,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {post.type === "event" ? "Interested in This Event?" : "Stay Connected With Us"}
              </Typography>
              <Typography
                sx={{
                  fontFamily: HOME.fontBody,
                  color: alpha(HOME.oldPaperSoft, 0.85),
                  mb: 3,
                  maxWidth: 520,
                  mx: "auto",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Join Mwalimu Hope Foundation and be part of the change we create across Kenya.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="center"
                sx={{ position: "relative", zIndex: 1 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetInvolved}
                  sx={{
                    bgcolor: HOME.morphoBlue,
                    fontWeight: 700,
                    textTransform: "none",
                    fontFamily: HOME.fontBody,
                    borderRadius: "12px",
                    px: 4,
                    boxShadow: `0 8px 24px ${alpha(HOME.morphoBlue, 0.4)}`,
                    "&:hover": { bgcolor: HOME.morphoBlueDark },
                  }}
                >
                  Get Involved
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleBack}
                  sx={{
                    color: HOME.oldPaperSoft,
                    borderColor: alpha(HOME.oldPaperSoft, 0.4),
                    fontWeight: 700,
                    textTransform: "none",
                    fontFamily: HOME.fontBody,
                    borderRadius: "12px",
                    px: 4,
                    "&:hover": {
                      borderColor: HOME.oldPaperSoft,
                      bgcolor: alpha(HOME.oldPaperSoft, 0.08),
                    },
                  }}
                >
                  View All News & Events
                </Button>
              </Stack>
            </Box>
          </Box>
        </MotionBox>
      </Box>

      {lightbox.open && (
        <Box
          onClick={() => setLightbox({ open: false, url: "", alt: "" })}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: alpha(HOME.deepUmberDark, 0.92),
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
              color: HOME.oldPaperSoft,
              bgcolor: alpha(HOME.oldPaperSoft, 0.1),
              border: `1px solid ${alpha(HOME.oldPaperSoft, 0.2)}`,
              "&:hover": { bgcolor: alpha(HOME.morphoBlue, 0.35) },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={lightbox.url}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
            sx={{
              maxWidth: "100%",
              maxHeight: "90vh",
              borderRadius: "14px",
              objectFit: "contain",
              border: `1px solid ${alpha(HOME.oldPaperSoft, 0.15)}`,
            }}
          />
        </Box>
      )}
    </Box>
  );
}
