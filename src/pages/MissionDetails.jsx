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
  categoryConfig,
  getCategoryLabel,
  getCategoryImages,
} from "../constants/missionCategoryConfig";
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

  const goHomeSection = (sectionId) => {
    navigate({ pathname: "/", hash: sectionId }, { state: { scrollTo: sectionId } });
  };

  const handleBack = () => {
    goHomeSection("mission-section");
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

  if (error || !mission) {
    return (
      <Box sx={{ width: "100%", py: 6, ...sidePad, bgcolor: HOME.oldPaperSoft, minHeight: "60vh" }}>
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error || "Mission not found"}
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
              background: `linear-gradient(145deg, ${HOME.deepUmberDark} 0%, ${HOME.deepUmber} 55%, ${HOME.morphoBlueDark} 100%)`,
            }}
          />
        )}

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
            aria-label="Back to our mission"
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
              label={getCategoryLabel(mission.category)}
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
            {mission.title}
          </Typography>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ width: "100%", pb: { xs: 2, md: 3 } }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <SectionCard>
            <SectionTitle icon={DescriptionIcon} title="About This Program" accent={HOME.morphoBlue} />
            <Typography
              sx={{
                fontFamily: HOME.fontBody,
                color: alpha(HOME.deepUmber, 0.82),
                lineHeight: 1.8,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                whiteSpace: "pre-wrap",
              }}
            >
              {mission.description}
            </Typography>
          </SectionCard>

          {impacts.length > 0 && (
            <SectionCard>
              <SectionTitle icon={TrackChanges} title="Key Impacts" accent={HOME.morphoBlueDark} />
              <Stack spacing={1.25}>
                {impacts.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      p: 1.75,
                      borderRadius: "14px",
                      bgcolor: alpha(HOME.oldPaper, 0.7),
                      border: `1px solid ${HOME.border}`,
                      borderLeft: `4px solid ${HOME.morphoBlue}`,
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        borderColor: alpha(HOME.morphoBlue, 0.35),
                        borderLeftColor: HOME.morphoBlue,
                        boxShadow: HOME.shadowSm,
                      },
                    }}
                  >
                    <CheckCircle
                      sx={{
                        color: HOME.morphoBlue,
                        fontSize: 22,
                        mt: 0.2,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: HOME.fontBody,
                        color: alpha(HOME.deepUmber, 0.85),
                        lineHeight: 1.7,
                        fontSize: "0.95rem",
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </SectionCard>
          )}

          {images.length > 0 && (
            <SectionCard>
              <SectionTitle
                icon={ImageIcon}
                title="Program Gallery"
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
                    onClick={() => setLightbox({ open: true, url, alt: `${mission.title} ${index + 1}` })}
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
                      alt={`${mission.title} ${index + 1}`}
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
                Want to Support This Mission?
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
                Partner with Mwalimu Hope Foundation — every contribution helps more communities across Kenya.
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
                  View All Missions
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
