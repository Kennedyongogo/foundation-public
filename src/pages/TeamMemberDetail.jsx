import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Person,
  ArrowBack,
  Facebook,
  WhatsApp,
  Twitter,
  Google,
} from "@mui/icons-material";

const MotionBox = motion(Box);

export default function TeamMemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teamMember, setTeamMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchTeamMemberDetails();
  }, [id]);

  const buildImageUrl = (imageUrl) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http")) return imageUrl;
    if (imageUrl.startsWith("uploads/")) return `/${imageUrl}`;
    if (imageUrl.startsWith("/uploads/")) return imageUrl;
    return imageUrl;
  };

  const fetchTeamMemberDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin-users/public/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch team member details");
      }
      const data = await response.json();

      if (data.success && data.data) {
        setTeamMember(data.data);
      } else {
        setError("Team member not found");
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching team member details:", err);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/", { state: { scrollTo: "team-section" } });
    // Scroll to team section after navigation with multiple attempts
    // Using longer delay to ensure ScrollToTop has finished
    const scrollToTeam = () => {
      const teamSection = document.getElementById("team-section");
      if (teamSection) {
        teamSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Try again after a short delay if not found
        setTimeout(scrollToTeam, 100);
      }
    };
    // Start scrolling after ScrollToTop has finished (it runs on pathname change)
    setTimeout(scrollToTeam, 300);
  };

  const handleSocialClick = (platform) => {
    const socialLink = teamMember[`${platform}_link`];
    
    // Only open link if it exists, otherwise do nothing
    if (socialLink) {
      window.open(socialLink, "_blank");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !teamMember) {
    return (
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Alert severity="error" sx={{ mb: 1.5 }}>
          {error || "Team member not found"}
        </Alert>
        <Button variant="outlined" onClick={handleBack}>
          <ArrowBack sx={{ mr: 1 }} />
          Back to Team
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Global background styles */}
      <style>
        {`
          * {
            box-sizing: border-box;
          }
          html {
            height: 100%;
            overflow-y: scroll;
            scroll-behavior: smooth;
          }
          html, body, #root {
            background: #f8f9fa !important;
            background-attachment: fixed !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          body {
            min-height: 100%;
            overflow-x: hidden;
          }
          #root {
            min-height: 100vh;
          }
          body::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100vh;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="700" r="120" fill="url(%23a)"/></svg>');
            opacity: 0.3;
            z-index: 0;
            pointer-events: none;
          }
        `}
      </style>
      
      <Box 
        sx={{ 
          minHeight: "100vh", 
          position: "relative",
          zIndex: 1,
          background: "transparent",
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 1, sm: 1.5, md: 2 }, px: { xs: 0.25, sm: 0.375 }, position: "relative", zIndex: 1 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
            <Box sx={{ mb: { xs: 1, sm: 1.5, md: 2 } }}>
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                onClick={handleBack}
                sx={{
                  mb: 0,
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  fontWeight: 600,
                  px: 2,
                  py: 0.75,
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                  minHeight: "auto",
                  "& .MuiButton-startIcon": {
                    marginRight: 0.5,
                    "& > *:nth-of-type(1)": {
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    },
                  },
                  "&:hover": {
                    background: "linear-gradient(135deg, #5568d3, #653a8b)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Back to Team
              </Button>
            </Box>

            {/* All Content in One Card */}
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: { xs: 3, md: 4 },
                background: "white",
                border: "1px solid #e0e0e0",
              }}
            >
              {/* Profile Picture */}
              <Box
                sx={{
                  position: "relative",
                  height: { xs: "200px", sm: "300px", md: "400px" },
                  overflow: "hidden",
                  borderRadius: { xs: 2, md: 3 },
                  mb: { xs: 3, md: 4 },
                }}
              >
                {teamMember.profile_image ? (
                  <Box
                    component="img"
                    src={buildImageUrl(teamMember.profile_image)}
                    alt={teamMember.full_name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <Box
                  sx={{
                    display: teamMember.profile_image ? "none" : "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    color: "white",
                  }}
                >
                  <Person sx={{ fontSize: { xs: "3rem", sm: "4rem", md: "5rem" }, mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" } }}>
                    No Photo Available
                  </Typography>
                </Box>
              </Box>

              {/* Page Title */}
              <Box sx={{ textAlign: "center", mb: { xs: 2, md: 3 } }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Person
                    sx={{
                      fontSize: { xs: "1rem", md: "1.25rem" },
                      color: "primary.main",
                    }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      color: "primary.main",
                      fontSize: { xs: "0.875rem", sm: "1.125rem", md: "1.5rem" },
                    }}
                  >
                    {teamMember.full_name}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#4caf50",
                    fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" },
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {teamMember.position || "Team Member"}
                </Typography>
                {teamMember.description && (
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      maxWidth: 800,
                      mx: "auto",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    {teamMember.description}
                  </Typography>
                )}
                {!teamMember.description && (
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      maxWidth: 800,
                      mx: "auto",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      lineHeight: 1.6,
                      fontStyle: "italic",
                    }}
                  >
                    More information about this team member will be available soon.
                  </Typography>
                )}
              </Box>

              {/* Share Section */}
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: { xs: 1.5, md: 2 },
                    textAlign: "center",
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "1.2rem", md: "1.45rem" },
                  }}
                >
                  Connect with {teamMember.full_name}
                </Typography>
                
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    startIcon={<Facebook />}
                    onClick={() => handleSocialClick("facebook")}
                    sx={{
                      backgroundColor: "#1877f2",
                      "&:hover": { backgroundColor: "#166fe5" },
                      px: 1.5,
                      py: 0.75,
                      minWidth: 100,
                      fontSize: { xs: "0.7rem", md: "0.8rem" },
                    }}
                  >
                    Facebook
                  </Button>
                  
                  <Button
                    variant="contained"
                    startIcon={<WhatsApp />}
                    onClick={() => handleSocialClick("whatsapp")}
                    sx={{
                      backgroundColor: "#25d366",
                      "&:hover": { backgroundColor: "#22c55e" },
                      px: 1.5,
                      py: 0.75,
                      minWidth: 100,
                      fontSize: { xs: "0.7rem", md: "0.8rem" },
                    }}
                  >
                    WhatsApp
                  </Button>
                  
                  <Button
                    variant="contained"
                    startIcon={<Twitter />}
                    onClick={() => handleSocialClick("twitter")}
                    sx={{
                      backgroundColor: "#1da1f2",
                      "&:hover": { backgroundColor: "#1a91da" },
                      px: 1.5,
                      py: 0.75,
                      minWidth: 100,
                      fontSize: { xs: "0.7rem", md: "0.8rem" },
                    }}
                  >
                    X
                  </Button>
                  
                  <Button
                    variant="contained"
                    startIcon={<Google />}
                    onClick={() => handleSocialClick("google")}
                    sx={{
                      backgroundColor: "#db4437",
                      "&:hover": { backgroundColor: "#c23321" },
                      px: 1.5,
                      py: 0.75,
                      minWidth: 100,
                      fontSize: { xs: "0.7rem", md: "0.8rem" },
                    }}
                  >
                    Google
                  </Button>
                </Box>
              </Box>
            </Paper>
          </MotionBox>
        </Container>
      </Box>
    </>
  );
}
