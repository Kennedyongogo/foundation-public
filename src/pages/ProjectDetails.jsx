import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  VolunteerActivism,
  LocationOn,
  Schedule,
  Person,
  People,
  Category,
  Description,
  CalendarToday,
  TrendingUp,
  ArrowBack,
  Image as ImageIcon,
  PhotoCamera,
} from "@mui/icons-material";

const MotionBox = motion(Box);

const getStatusColor = (status) => {
  const colors = {
    in_progress: "primary",
    completed: "success",
    planning: "warning",
    on_hold: "error",
  };
  return colors[status] || "default";
};

const getStatusLabel = (status) => {
  const labels = {
    in_progress: "In Progress",
    completed: "Completed",
    planning: "Planning",
    on_hold: "On Hold",
  };
  return labels[status] || status;
};

const getCategoryLabel = (category) => {
  const labels = {
    volunteer: "Volunteer Program",
    education: "Education",
    health: "Healthcare",
    empowerment: "Empowerment",
    poverty: "Poverty Alleviation",
    mental_health: "Mental Health",
  };
  return labels[category] || category;
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/public-projects/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }
      const data = await response.json();

      if (data.success && data.data) {
        // Process project data with image fallback logic
        const projectData = data.data;
        
        // Determine hero image with robust fallback logic
        let heroImage = "/foundation-logo.png"; // Default foundation logo
        
        if (projectData.update_images && Array.isArray(projectData.update_images) && projectData.update_images.length > 0) {
          // Find the first valid image path
          const validImage = projectData.update_images.find(img => 
            img && img.path && typeof img.path === 'string' && img.path.trim() !== ''
          );
          if (validImage) {
            heroImage = `/${validImage.path}`;
          }
        }
        
        // Add hero image to project data
        setProject({
          ...projectData,
          heroImage
        });
      } else {
        setError("Project not found");
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching project details:", err);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
    // Scroll to projects section after navigation
    setTimeout(() => {
      const projectsSection = document.getElementById("projects-section");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
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

  if (error || !project) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || "Project not found"}
        </Alert>
        <Button variant="outlined" onClick={handleBack}>
          <ArrowBack sx={{ mr: 1 }} />
          Back to Projects
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
              Back to Projects
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
                  <VolunteerActivism
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
                    {project.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap", mb: 2 }}>
                  <Chip
                    label={getStatusLabel(project.status)}
                    color={getStatusColor(project.status)}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.65rem", md: "0.75rem" },
                    }}
                  />
                  <Chip
                    label={getCategoryLabel(project.category)}
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.65rem", md: "0.75rem" },
                    }}
                  />
                </Box>
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
                  {project.description}
                </Typography>
              </Box>

              {/* Hero Image Section */}
              <Box
                sx={{
                  position: "relative",
                  height: { xs: "200px", sm: "300px", md: "400px" },
                  overflow: "hidden",
                  borderRadius: { xs: 2, md: 3 },
                  mb: { xs: 3, md: 4 },
                }}
              >
                <img
                  src={project.heroImage}
                  alt={project.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = "/foundation-logo.png";
                  }}
                />
              </Box>

              {/* Project Overview */}

              {/* Project Overview */}
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "1.2rem", md: "1.45rem" },
                  }}
                >
                  Project Overview
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
                    <Category sx={{ color: "#667eea", fontSize: { xs: "1rem", md: "1.25rem" }, flexShrink: 0 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: "0.75rem", md: "0.875rem" }, mb: 0.5 }}>
                        Category
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#667eea", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                        {getCategoryLabel(project.category)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
                    <LocationOn sx={{ color: "#667eea", fontSize: { xs: "1rem", md: "1.25rem" }, flexShrink: 0 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: "0.75rem", md: "0.875rem" }, mb: 0.5 }}>
                        Location
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#667eea", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                        {project.subcounty}, {project.county}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
                    <People sx={{ color: "#667eea", fontSize: { xs: "1rem", md: "1.25rem" }, flexShrink: 0 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: "0.75rem", md: "0.875rem" }, mb: 0.5 }}>
                        Target Audience
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#667eea", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                        {project.target_individual}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
                    <Schedule sx={{ color: "#667eea", fontSize: { xs: "1rem", md: "1.25rem" }, flexShrink: 0 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: "0.75rem", md: "0.875rem" }, mb: 0.5 }}>
                        Start Date
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#667eea", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                        {formatDate(project.start_date)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
                    <CalendarToday sx={{ color: "#667eea", fontSize: { xs: "1rem", md: "1.25rem" }, flexShrink: 0 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: "0.75rem", md: "0.875rem" }, mb: 0.5 }}>
                        End Date
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#667eea", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                        {formatDate(project.end_date)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
                    <TrendingUp sx={{ color: "#667eea", fontSize: { xs: "1rem", md: "1.25rem" }, flexShrink: 0 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: "0.75rem", md: "0.875rem" }, mb: 0.5 }}>
                        Progress
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#667eea", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                        {project.progress}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Enhanced Progress Bar */}
                <Box sx={{ mt: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#667eea", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                      Overall Progress
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#667eea", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                      {project.progress}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: 16,
                      backgroundColor: "rgba(102, 126, 234, 0.1)",
                      borderRadius: 10,
                      overflow: "hidden",
                      border: "1px solid rgba(102, 126, 234, 0.2)",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${project.progress}%`,
                        height: "100%",
                        background: project.status === "completed" 
                          ? "linear-gradient(90deg, #4caf50, #81c784)" 
                          : "linear-gradient(90deg, #667eea, #764ba2)",
                        transition: "width 0.8s ease",
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                          animation: "shimmer 2s infinite",
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Progress Descriptions */}
              {project.progress_descriptions && project.progress_descriptions.length > 0 && (
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
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
                    Progress Updates
                  </Typography>

                  {project.progress_descriptions.map((update, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      sx={{ mb: index < project.progress_descriptions.length - 1 ? 2 : 0 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          mb: 1,
                          pb: 1,
                          borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
                        }}
                      >
                        <Box
                          sx={{
                            p: 0.75,
                            borderRadius: 1.5,
                            backgroundColor: "rgba(102, 126, 234, 0.15)",
                            color: "#667eea",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Description sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: "#667eea",
                              fontSize: { xs: "0.9rem", md: "1.1rem" },
                            }}
                          >
                            Update #{project.progress_descriptions.length - index}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              fontSize: { xs: "0.65rem", md: "0.75rem" },
                            }}
                          >
                            {formatDate(update.timestamp)}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.8,
                          color: "text.secondary",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                          pl: { xs: 0, md: 4 },
                        }}
                      >
                        {update.description}
                      </Typography>
                    </MotionBox>
                  ))}
                </Box>
              )}

              {/* Project Images */}
              {project.update_images && project.update_images.length > 0 && (
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
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
                    Project Gallery ({project.update_images.length})
                  </Typography>

              <Grid container spacing={{ xs: 1, sm: 1, md: 1.5 }}>
                {project.update_images.map((imageData, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: { xs: 220, sm: 250, md: 280 },
                        borderRadius: { xs: 2, md: 3 },
                        overflow: "hidden",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                        "&:hover": {
                          transform: { xs: "translateY(-5px)", md: "translateY(-10px) scale(1.02)" },
                          boxShadow: "0 25px 50px rgba(102, 126, 234, 0.3)",
                          "& .image-overlay": {
                            opacity: 1,
                          },
                          "& .image-info": {
                            transform: "translateY(0)",
                          }
                        },
                      }}
                      onClick={() =>
                        window.open(
                          `${window.location.origin}/${imageData.path}`,
                          "_blank"
                        )
                      }
                    >
                      <img
                        src={`/${imageData.path}`}
                        alt={`Project image ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <Box
                        sx={{
                          display: "none",
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <ImageIcon sx={{ fontSize: 48, color: "#667eea" }} />
                        <Typography variant="caption" sx={{ color: "#667eea", fontWeight: 500 }}>
                          Image not available
                        </Typography>
                      </Box>

                      {/* Hover overlay */}
                      <Box
                        className="image-overlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        <Box
                          sx={{
                            textAlign: "center",
                            color: "white",
                            px: 2,
                          }}
                        >
                          <PhotoCamera sx={{ fontSize: { xs: "1rem", md: "1.35rem" }, mb: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.55rem", md: "0.65rem" } }}>
                            Click to view full size
                          </Typography>
                        </Box>
                      </Box>

                      {/* Image info overlay */}
                      <Box
                        className="image-info"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: "linear-gradient(transparent, rgba(0, 0, 0, 0.8))",
                          color: "white",
                          p: { xs: 1.5, md: 2 },
                          transform: "translateY(100%)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: 1,
                            fontWeight: 500,
                            fontSize: { xs: "0.55rem", md: "0.6rem" },
                          }}
                        >
                          <PhotoCamera sx={{ fontSize: { xs: 12, md: 14 } }} />
                          {formatDate(imageData.timestamp)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
                </Box>
              )}
            </Paper>
          </MotionBox>
        </Container>
      </Box>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </>
  );
}
