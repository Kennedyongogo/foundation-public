import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Fade } from "@mui/material";
import HeroSection from "../components/Home/HeroSection";
import ServicesSection from "../components/Home/ServicesSection";
import ProjectsSection from "../components/Home/ProjectsSection";
import PostsSection from "../components/Home/PostsSection";
import CharityMap from "../components/Home/CharityMap";
import ContactSection from "../components/Home/ContactSection";
import TeamSection from "../components/Home/TeamSection";
import TestimonySection from "../components/Home/TestimonySection";
import Footer from "../components/Footer/Footer";
import SectionHeader from "../components/Home/SectionHeader";
import { homeSectionShellSx } from "../components/Home/homeShared";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const sectionId =
      (location.hash || "").replace("#", "") || location.state?.scrollTo;
    if (!sectionId) return undefined;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 40;

    const scrollToSection = () => {
      if (cancelled) return;
      const section = document.getElementById(sectionId);
      if (section) {
        const header = document.querySelector('header, [role="banner"], .MuiAppBar-root');
        const headerHeight = header ? header.getBoundingClientRect().height : 80;
        const top =
          section.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        return;
      }

      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(scrollToSection, 100);
      }
    };

    // Small delay so lazy route content can mount before measuring
    const startId = window.setTimeout(scrollToSection, 80);
    return () => {
      cancelled = true;
      window.clearTimeout(startId);
    };
  }, [location.pathname, location.hash, location.state]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <PostsSection />

      <Box id="impact-map-section" sx={homeSectionShellSx("paper")}>
        <Box sx={{ width: "100%", position: "relative", zIndex: 1, px: { xs: 2, sm: 3, md: 5 } }}>
          <Fade in timeout={900}>
            <Box>
              <SectionHeader
                overline="Where We Serve"
                title="Explore Our Impact"
                description="Discover our projects across Kenya and see where we're making a difference in communities."
              />
              <Box
                sx={{
                  borderRadius: { xs: "16px", md: "22px" },
                  overflow: "hidden",
                  border: "1px solid rgba(58, 36, 21, 0.12)",
                  boxShadow: "0 16px 40px rgba(42, 26, 15, 0.1)",
                  bgcolor: "#fff",
                }}
              >
                <CharityMap />
              </Box>
            </Box>
          </Fade>
        </Box>
      </Box>

      <ContactSection />
      <TestimonySection />
      <TeamSection />
      <Footer />
    </Box>
  );
}
