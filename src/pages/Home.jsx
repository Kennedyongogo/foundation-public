import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Container, Card, CardContent, Typography, Fade, Paper } from "@mui/material";
import HeroSection from "../components/Home/HeroSection";
import ServicesSection from "../components/Home/ServicesSection";
import ProjectsSection from "../components/Home/ProjectsSection";
import PostsSection from "../components/Home/PostsSection";
import CharityMap from "../components/Home/CharityMap";
import ContactSection from "../components/Home/ContactSection";
import TeamSection from "../components/Home/TeamSection";
import TestimonySection from "../components/Home/TestimonySection";
import Footer from "../components/Footer/Footer";
import MapIcon from "@mui/icons-material/Map";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll to section from location state (after ScrollToTop has run)
    if (location.state?.scrollTo) {
      const scrollToSection = () => {
        const section = document.getElementById(location.state.scrollTo);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // Retry if section not found yet
          setTimeout(scrollToSection, 100);
        }
      };
      // Wait for ScrollToTop to finish (it runs on pathname change)
      setTimeout(scrollToSection, 300);
    }
  }, [location.state]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <PostsSection />
      
      {/* Charity Map Section */}
      <Box
        sx={{
          pt: 0,
          pb: 3,
          px: { xs: 1, sm: 1.5, md: 2 },
          backgroundColor: "#f8f9fa",
        }}
      >
        <Box
          sx={{
            maxWidth: "1300px",
            margin: "0 auto",
          }}
        >
          <Fade in={true} timeout={1000}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: { xs: 3, md: 4 },
                overflow: "hidden",
                backgroundColor: "white",
                border: "1px solid #e0e0e0",
                py: { xs: 1.5, sm: 2, md: 2.5 },
                px: { xs: 3, sm: 4, md: 5 },
              }}
            >
              {/* Explore Our Impact Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <MapIcon
                    sx={{
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      color: "primary.main",
                    }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                    }}
                  >
                    Explore Our Impact
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ maxWidth: 600, mx: "auto", fontSize: "0.875rem" }}
                >
                  Discover our projects across Kenya and see where we're making a difference in communities
                </Typography>
              </Box>

              {/* Map Component */}
              <CharityMap />
            </Paper>
          </Fade>
        </Box>
      </Box>

      <ContactSection />
      
      {/* Testimonials Section */}
      <TestimonySection />
      
      {/* Meet Our Team Section */}
      <TeamSection />

      <Footer />
    </Box>
  );
}
