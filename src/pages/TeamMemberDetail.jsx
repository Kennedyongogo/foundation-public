import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Stack,
  IconButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  ArrowBack,
  Favorite,
  Description as DescriptionIcon,
  Work,
  Share,
  Person,
  Facebook,
  WhatsApp,
  Twitter,
  Google,
} from "@mui/icons-material";
import { buildTeamImageUrl, getRoleConfig } from "../constants/teamConfig";
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

function SectionTitle({ icon: Icon, title, accent = HOME.morphoBlue }) {
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
      </Typography>
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

const socialLinks = [
  { key: "facebook", label: "Facebook", Icon: Facebook, color: "#1877f2", hover: "#166fe5" },
  { key: "whatsapp", label: "WhatsApp", Icon: WhatsApp, color: "#25d366", hover: "#22c55e" },
  { key: "twitter", label: "X", Icon: Twitter, color: "#1da1f2", hover: "#1a91da" },
  { key: "google", label: "Google", Icon: Google, color: "#db4437", hover: "#c23321" },
];

export default function TeamMemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teamMember, setTeamMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamMemberDetails();
  }, [id]);

  const fetchTeamMemberDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/admin-users/public/${id}`);
      if (!response.ok) throw new Error("Failed to fetch team member details");
      const data = await response.json();
      if (data.success && data.data) {
        setTeamMember(data.data);
      } else {
        setError("Team member not found");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goHomeSection = (sectionId) => {
    navigate({ pathname: "/", hash: sectionId }, { state: { scrollTo: sectionId } });
  };

  const handleBack = () => {
    goHomeSection("team-section");
  };

  const handleGetInvolved = () => {
    goHomeSection("contact-section");
  };

  const handleSocialClick = (platform) => {
    const link = teamMember?.[`${platform}_link`];
    if (link) window.open(link, "_blank", "noopener,noreferrer");
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

  if (error || !teamMember) {
    return (
      <Box sx={{ width: "100%", py: 6, ...sidePad, bgcolor: HOME.oldPaperSoft, minHeight: "60vh" }}>
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error || "Team member not found"}
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
          Back to Team
        </Button>
      </Box>
    );
  }

  const config = getRoleConfig(teamMember.role);
  const IconComponent = config.Icon;
  const heroImage = buildTeamImageUrl(teamMember.profile_image);
  const availableSocials = socialLinks.filter((s) => teamMember[`${s.key}_link`]);

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
            alt={teamMember.full_name}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
            onError={(e) => {
              e.target.style.display = "none";
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

        {!heroImage && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.18,
            }}
          >
            <Person sx={{ fontSize: 160, color: HOME.oldPaperSoft }} />
          </Box>
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
            aria-label="Back to team"
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
              label={config.label}
              sx={{
                bgcolor: alpha(HOME.oldPaperSoft, 0.14),
                color: HOME.oldPaperSoft,
                fontWeight: 700,
                fontFamily: HOME.fontBody,
                border: `1px solid ${alpha(config.color, 0.55)}`,
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
            sx={{
              fontFamily: HOME.fontBody,
              color: HOME.morphoBlueMuted,
              fontWeight: 700,
              letterSpacing: "0.14em",
              fontSize: "0.72rem",
              textTransform: "uppercase",
              display: "block",
              mb: 0.75,
            }}
          >
            {teamMember.position || "Team Member"}
          </Typography>
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
            {teamMember.full_name}
          </Typography>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ width: "100%", pb: { xs: 2, md: 3 } }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <SectionCard>
            <SectionTitle icon={DescriptionIcon} title="About This Team Member" accent={HOME.morphoBlue} />
            <Typography
              sx={{
                fontFamily: HOME.fontBody,
                color: alpha(HOME.deepUmber, 0.82),
                lineHeight: 1.8,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                whiteSpace: "pre-wrap",
                mb: 3,
              }}
            >
              {teamMember.description ||
                "More information about this team member will be available soon."}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 1.5,
              }}
            >
              <DetailRow
                icon={Work}
                label="Position"
                value={teamMember.position || "Team Member"}
                color={config.color}
              />
              <DetailRow
                icon={IconComponent}
                label="Role"
                value={config.label}
                color={HOME.morphoBlueDark}
              />
            </Box>
          </SectionCard>

          {availableSocials.length > 0 && (
            <SectionCard>
              <SectionTitle
                icon={Share}
                title={`Connect with ${teamMember.full_name.split(" ")[0]}`}
                accent={HOME.morphoBlueDark}
              />
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {availableSocials.map(({ key, label, Icon, color, hover }) => (
                  <Button
                    key={key}
                    variant="contained"
                    startIcon={<Icon />}
                    onClick={() => handleSocialClick(key)}
                    sx={{
                      bgcolor: color,
                      textTransform: "none",
                      fontWeight: 700,
                      fontFamily: HOME.fontBody,
                      borderRadius: "12px",
                      px: 2.5,
                      "&:hover": { bgcolor: hover },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Stack>
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
                Work With Our Team
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
                  View All Team
                </Button>
              </Stack>
            </Box>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}
