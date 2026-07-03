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
    // Handle scroll to section from location state or hash (after ScrollToTop has run)
    const scrollToSection = (retryCount = 0) => {
      // Check for hash in URL first (more direct)
      const hash = window.location.hash.replace("#", "");
      const sectionId = hash || location.state?.scrollTo;
      
      if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          // Calculate the exact position accounting for fixed header
          const header = document.querySelector('header, [role="banner"], .MuiAppBar-root');
          const headerHeight = header ? header.getBoundingClientRect().height : 80;
          
          // Get the section's position relative to the document
          const sectionRect = section.getBoundingClientRect();
          const sectionTop = sectionRect.top + window.pageYOffset;
          
          // Add extra padding (20px) to ensure section is fully visible
          const offset = headerHeight + 20;
          
          // Scroll to exact position
          window.scrollTo({
            top: sectionTop - offset,
            behavior: "smooth"
          });
        } else if (retryCount < 15) {
          // Retry up to 15 times if section not found yet (1.5 seconds total)
          setTimeout(() => scrollToSection(retryCount + 1), 100);
        }
      }
    };
    
    // Wait for ScrollToTop to finish and page to render (it runs on pathname change)
    setTimeout(() => scrollToSection(), 400);
  }, [location.state, location.hash]);

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
          px: 0,
          width: "100%",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Fade in={true} timeout={1000}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 0,
                overflow: "hidden",
                backgroundColor: "white",
                border: "none",
                borderTop: "1px solid #e0e0e0",
                borderBottom: "1px solid #e0e0e0",
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
