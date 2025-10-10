import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Chip,
  Divider,
  Fade,
  Slide,
} from "@mui/material";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn, 
  LocationOn, 
  Email, 
  Phone, 
  Home,
  Favorite,
  School,
  LocalHospital
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section) => {
    if (location.pathname === "/") {
      // If on home page, scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // If on other pages, navigate to home then scroll
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)",
        color: "white",
        pt: 8,
        pb: 2,
        mt: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={1000}>
          <Box>
            <Grid container spacing={10}>
              <Grid item xs={12} md={4}>
                <Slide direction="up" in timeout={1200}>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                      <Box
                        sx={{
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: "-4px",
                            left: "-4px",
                            right: "-4px",
                            bottom: "-4px",
                            background: "linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                            borderRadius: "50%",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          },
                          "&:hover::before": {
                            opacity: 1,
                          },
                        }}
                      >
                        <img
                          src="/foundation-logo.png"
                          alt="Mwalimu Hope Foundation Logo"
                          style={{
                            height: "48px",
                            width: "auto",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                          }}
                        />
                      </Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700,
                          background: "linear-gradient(45deg, #ffffff, #e3f2fd)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        Mwalimu Hope Foundation
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 2,
                          fontWeight: 600,
                          color: "#ffeb3b",
                          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        }}
                      >
                        Empowering Minds, Restoring Hope.
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mb: 1,
                          lineHeight: 1.6,
                          color: "rgba(255,255,255,0.9)",
                        }}
                      >
                        Building a brighter future for Kenya through education,
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mb: 3,
                          lineHeight: 1.6,
                          color: "rgba(255,255,255,0.9)",
                        }}
                      >
                        mental health awareness, poverty alleviation, and community empowerment.
                      </Typography>
                    </Box>

                    {/* Mission Chips */}
                    <Box sx={{ mb: 4, display: "flex", flexWrap: "wrap", gap: 1 }}>
                      <Chip
                        label="Education"
                        size="small"
                        sx={{
                          background: "linear-gradient(45deg, #4caf50, #66bb6a)",
                          color: "white",
                          fontWeight: 600,
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)",
                          },
                        }}
                      />
                      <Chip
                        label="Mental Health"
                        size="small"
                        sx={{
                          background: "linear-gradient(45deg, #e91e63, #f06292)",
                          color: "white",
                          fontWeight: 600,
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 12px rgba(233, 30, 99, 0.4)",
                          },
                        }}
                      />
                      <Chip
                        label="Community"
                        size="small"
                        sx={{
                          background: "linear-gradient(45deg, #ff9800, #ffb74d)",
                          color: "white",
                          fontWeight: 600,
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 12px rgba(255, 152, 0, 0.4)",
                          },
                        }}
                      />
                    </Box>

                    {/* Social Media Icons */}
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#e3f2fd" }}>
                      Follow Us
            </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {[
                        { icon: <Facebook />, color: "#1877f2", label: "Facebook" },
                        { icon: <Twitter />, color: "#1da1f2", label: "Twitter" },
                        { icon: <Instagram />, color: "#e4405f", label: "Instagram" },
                        { icon: <LinkedIn />, color: "#0077b5", label: "LinkedIn" },
                      ].map((social, index) => (
                        <IconButton
                          key={index}
                          aria-label={social.label}
                          sx={{
                            color: "white",
                            background: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                              background: social.color,
                              transform: "translateY(-3px) scale(1.1)",
                              boxShadow: `0 8px 25px ${social.color}40`,
                            },
                          }}
                        >
                          {social.icon}
              </IconButton>
                      ))}
                    </Box>
            </Box>
                </Slide>
          </Grid>
              
              <Grid item xs={12} md={8}>
                <Box sx={{ display: "flex", width: "100%", gap: 4 }}>
                  {/* Quick Links Column */}
                  <Box sx={{ flex: 1 }}>
                    <Slide direction="up" in timeout={1400}>
                      <Box>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            mb: 3,
                            fontWeight: 700,
                            background: "linear-gradient(45deg, #ffffff, #e3f2fd)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                          }}
                        >
                          Quick Links
                        </Typography>
                        
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                          {[
                            { label: "Home", icon: <Home />, section: "hero-section", color: "#2196f3" },
                            { label: "Our Mission", icon: <Favorite />, section: "mission-section", color: "#e91e63" },
                            { label: "Projects", icon: <School />, section: "projects-section", color: "#4caf50" },
                            { label: "Contact", icon: <LocalHospital />, section: "contact-section", color: "#ff9800" },
                          ].map((link, index) => (
                            <Box
                              key={index}
              component="button"
                              onClick={() => handleNavigation(link.section)}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                p: 1.5,
                                background: "rgba(255,255,255,0.05)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "10px",
                                color: "white",
                                textAlign: "left",
                                cursor: "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                "&:hover": {
                                  background: "rgba(255,255,255,0.1)",
                                  transform: "translateX(6px)",
                                  borderColor: link.color,
                                  boxShadow: `0 6px 20px ${link.color}30`,
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  color: link.color,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                  background: "rgba(255,255,255,0.1)",
                                  transition: "all 0.3s ease",
                                }}
                              >
                                {link.icon}
                              </Box>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  fontWeight: 500,
                                  fontSize: "0.9rem",
                                }}
                              >
                                {link.label}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Slide>
                  </Box>

                  {/* Contact Us Column */}
                  <Box sx={{ flex: 1 }}>
                    <Slide direction="up" in timeout={1600}>
                      <Box>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            mb: 3,
                            fontWeight: 700,
                            background: "linear-gradient(45deg, #ffffff, #e3f2fd)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                          }}
                        >
                          Contact Us
                        </Typography>
                        
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                          {/* Physical Address */}
                          <Box
                            sx={{
                              p: 2,
                              background: "rgba(255,255,255,0.05)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "10px",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                background: "rgba(255,255,255,0.08)",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                              <Box
                                sx={{
                                  color: "#4caf50",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 28,
                                  height: 28,
                                  borderRadius: "50%",
                                  background: "rgba(76, 175, 80, 0.1)",
                                }}
                              >
                                <LocationOn sx={{ fontSize: "16px" }} />
                              </Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#e3f2fd", fontSize: "0.8rem" }}>
                                Physical Address
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.4, fontSize: "0.75rem" }}>
                              Meghon Plaza, Bungoma Town,<br />
                              along Moi Avenue
            </Typography>
                          </Box>

                          {/* Postal Address */}
                          <Box
                            sx={{
                              p: 2,
                              background: "rgba(255,255,255,0.05)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "10px",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                background: "rgba(255,255,255,0.08)",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                              <Box
                                sx={{
                                  color: "#ff9800",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 28,
                                  height: 28,
                                  borderRadius: "50%",
                                  background: "rgba(255, 152, 0, 0.1)",
                                }}
                              >
                                <LocationOn sx={{ fontSize: "16px" }} />
                              </Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#e3f2fd", fontSize: "0.8rem" }}>
                                Postal Address
            </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.4, fontSize: "0.75rem" }}>
                              P.O. Box 2072-50200
            </Typography>
                          </Box>

                          {/* Contact Info */}
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Box
                                sx={{
                                  color: "#2196f3",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 24,
                                  height: 24,
                                  borderRadius: "50%",
                                  background: "rgba(33, 150, 243, 0.1)",
                                }}
                              >
                                <Phone sx={{ fontSize: "14px" }} />
                              </Box>
                              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)", fontSize: "0.75rem" }}>
                                0721660901
            </Typography>
                            </Box>
                            
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Box
                                sx={{
                                  color: "#e91e63",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 24,
                                  height: 24,
                                  borderRadius: "50%",
                                  background: "rgba(233, 30, 99, 0.1)",
                                }}
                              >
                                <Email sx={{ fontSize: "14px" }} />
                              </Box>
                              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)", fontSize: "0.75rem" }}>
                                mwalimuhopefoundation@gmail.com
            </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Slide>
                  </Box>
                </Box>
              </Grid>
        </Grid>
            
            {/* Copyright Section */}
            <Fade in timeout={2000}>
              <Box>
                <Divider 
                  sx={{ 
                    my: 2, 
                    borderColor: "rgba(255,255,255,0.2)",
                    "&::before, &::after": {
                      borderColor: "rgba(255,255,255,0.1)",
                    },
                  }} 
                />
                <Box
                  sx={{
                    textAlign: "center",
                    py: 2,
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    mb: 0,
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: "rgba(255,255,255,0.8)",
                      fontWeight: 500,
                    }}
                  >
                    © {new Date().getFullYear()} Mwalimu Hope Foundation. All rights reserved.
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: "rgba(255,255,255,0.6)",
                      mt: 1,
                      fontStyle: "italic",
                    }}
                  >
                    Empowering Minds, Restoring Hope, Building Kenya's Future
          </Typography>
        </Box>
              </Box>
            </Fade>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
