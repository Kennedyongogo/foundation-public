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
import { brand, buildTeamImageUrl, getRoleConfig } from "../constants/teamConfig";

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

  const handleBack = () => {
    navigate("/", { state: { scrollTo: "team-section" } });
  };

  const handleGetInvolved = () => {
    navigate("/", { state: { scrollTo: "contact-section" } });
  };

  const handleSocialClick = (platform) => {
    const link = teamMember?.[`${platform}_link`];
    if (link) window.open(link, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" bgcolor="#f8fafc">
        <CircularProgress sx={{ color: brand.green }} size={48} />
      </Box>
    );
  }

  if (error || !teamMember) {
    return (
      <Box sx={{ width: "100%", py: 6, px: { xs: 2, sm: 4 } }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || "Team member not found"}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ bgcolor: brand.navy, textTransform: "none", fontWeight: 600 }}
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
          <Box sx={{ position: "absolute", inset: 0, background: config.gradient }} />
        )}

        {!heroImage && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.2,
            }}
          >
            <Person sx={{ fontSize: 160, color: "#fff" }} />
          </Box>
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
            Back to Team
          </Button>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ alignSelf: { xs: "flex-start", sm: "center" }, flexWrap: "wrap" }}
          >
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
              label={config.label}
              sx={{
                bgcolor: alpha("#fff", 0.14),
                color: "#fff",
                fontWeight: 700,
                border: `1px solid ${alpha(config.color, 0.5)}`,
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
            variant="overline"
            sx={{
              color: brand.gold,
              fontWeight: 700,
              letterSpacing: "0.15em",
              fontSize: "0.75rem",
              display: "block",
              mb: 0.5,
            }}
          >
            {teamMember.position || "Team Member"}
          </Typography>
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
            {teamMember.full_name}
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
                  bgcolor: alpha(config.color, 0.12),
                  color: config.color,
                }}
              >
                <DescriptionIcon fontSize="small" />
              </Box>
              <Typography variant="h5" fontWeight={800} color={brand.navy}>
                About This Team Member
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              sx={{
                color: alpha(brand.navy, 0.8),
                lineHeight: 1.85,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                whiteSpace: "pre-wrap",
                mb: 3,
              }}
            >
              {teamMember.description ||
                "More information about this team member will be available soon."}
            </Typography>

            <Stack spacing={1.5}>
              <DetailRow icon={Work} label="Position" value={teamMember.position || "Team Member"} color={config.color} />
              <DetailRow icon={IconComponent} label="Role" value={config.label} color={config.color} />
            </Stack>
          </Box>

          {availableSocials.length > 0 && (
            <Box sx={{ ...sectionSx, bgcolor: alpha(brand.navy, 0.02) }}>
              <Stack direction="row" alignItems="center" spacing={1.5} mb={2.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: alpha(brand.blue, 0.12),
                    color: brand.blue,
                  }}
                >
                  <Share fontSize="small" />
                </Box>
                <Typography variant="h5" fontWeight={800} color={brand.navy}>
                  Connect with {teamMember.full_name.split(" ")[0]}
                </Typography>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap" useFlexGap>
                {availableSocials.map(({ key, label, Icon, color, hover }) => (
                  <Button
                    key={key}
                    variant="contained"
                    startIcon={<Icon />}
                    onClick={() => handleSocialClick(key)}
                    sx={{
                      bgcolor: color,
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 2.5,
                      "&:hover": { bgcolor: hover },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Stack>
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
              Work With Our Team
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
                View All Team
              </Button>
            </Stack>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}
