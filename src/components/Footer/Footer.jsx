import React from "react";
import {
  Box,
  Typography,
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
        width: "100%",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)",
        color: "white",
        pt: { xs: 2, sm: 3, md: 4 },
        pb: 0,
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
      
      <Box sx={{ position: "relative", zIndex: 1, width: "100%", px: { xs: 3, sm: 4, md: 5 } }}>
        <Fade in timeout={1000}>
          <Box>
            <Box
              sx={{
                display: { xs: "flex", md: "grid" },
                flexDirection: { xs: "column", md: "unset" },
                gridTemplateColumns: { md: "1fr auto 1fr" },
                gap: { xs: 3, sm: 4, md: 5 },
                width: "100%",
                alignItems: { md: "start" },
              }}
            >
              {/* Section 1 — Foundation */}
              <Box sx={{ justifySelf: { md: "start" }, width: { xs: "100%", md: "auto" } }}>
                <Slide direction="up" in timeout={1200}>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 }, mb: { xs: 1, sm: 1.5 } }}>
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
                            height: "32px",
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
                          fontSize: { xs: "1.1rem", sm: "1.5rem" },
                        }}
                      >
                        Mwalimu Hope Foundation
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: { xs: 1, sm: 1.5 } }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: { xs: 0.5, sm: 1 },
                          fontWeight: 600,
                          color: "#ffeb3b",
                          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                      >
                        Empowering Minds, Restoring Hope.
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mb: 0.5,
                          lineHeight: 1.6,
                          color: "rgba(255,255,255,0.9)",
                          fontSize: { xs: "0.8rem", sm: "1rem" },
                        }}
                      >
                        Building a brighter future for Kenya through education,
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mb: { xs: 1, sm: 1.5 },
                          lineHeight: 1.6,
                          color: "rgba(255,255,255,0.9)",
                          fontSize: { xs: "0.8rem", sm: "1rem" },
                        }}
                      >
                        mental health awareness, poverty alleviation, and community empowerment.
                      </Typography>
                    </Box>

                    {/* Mission Chips */}
                    <Box sx={{ mb: { xs: 1, sm: 2 }, display: "flex", flexWrap: "wrap", gap: { xs: 0.5, sm: 1 } }}>
                      <Chip
                        label="Education"
                        size="small"
                        sx={{
                          background: "linear-gradient(45deg, #4caf50, #66bb6a)",
                          color: "white",
                          fontWeight: 600,
                          fontSize: { xs: "0.7rem", sm: "0.75rem" },
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
                          fontSize: { xs: "0.7rem", sm: "0.75rem" },
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
                          fontSize: { xs: "0.7rem", sm: "0.75rem" },
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 12px rgba(255, 152, 0, 0.4)",
                          },
                        }}
                      />
                    </Box>

                    {/* Social Media Icons */}
                    <Typography variant="h6" sx={{ mb: { xs: 0.5, sm: 1 }, fontWeight: 600, color: "#e3f2fd", fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                      Follow Us
            </Typography>
                    <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
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
              </Box>

              {/* Section 2 — Quick Links */}
              <Box
                sx={{
                  justifySelf: { md: "center" },
                  width: { xs: "100%", md: "auto" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "flex-start", md: "center" },
                  textAlign: { xs: "left", md: "center" },
                }}
              >
                <Slide direction="up" in timeout={1400}>
                  <Box sx={{ width: { xs: "100%", md: "auto" } }}>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: { xs: 1, sm: 1.5 },
                        fontWeight: 700,
                        background: "linear-gradient(45deg, #ffffff, #e3f2fd)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        fontSize: { xs: "1.3rem", sm: "1.5rem" },
                      }}
                    >
                      Quick Links
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: { xs: 0.5, sm: 0.75 },
                        alignItems: { xs: "stretch", md: "center" },
                        width: { xs: "100%", md: "auto" },
                      }}
                    >
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
                            justifyContent: { xs: "flex-start", md: "center" },
                            gap: { xs: 1, sm: 1.5 },
                            p: { xs: 0.75, sm: 1 },
                            px: { md: 2 },
                            width: { xs: "100%", md: 220 },
                            background: "rgba(255,255,255,0.05)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "10px",
                            color: "white",
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                              background: "rgba(255,255,255,0.1)",
                              transform: { xs: "translateX(6px)", md: "translateY(-2px)" },
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
                              width: { xs: 28, sm: 32 },
                              height: { xs: 28, sm: 32 },
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
                              fontSize: { xs: "0.8rem", sm: "0.9rem" },
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

              {/* Section 3 — Contact Us */}
              <Box
                sx={{
                  justifySelf: { md: "end" },
                  width: { xs: "100%", md: "auto" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "flex-start", md: "flex-end" },
                  textAlign: { xs: "left", md: "right" },
                }}
              >
                <Slide direction="up" in timeout={1600}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: { xs: "flex-start", md: "flex-end" },
                    }}
                  >
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            mb: { xs: 1, sm: 1.5 },
                            fontWeight: 700,
                            background: "linear-gradient(45deg, #ffffff, #e3f2fd)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                            fontSize: { xs: "1.3rem", sm: "1.5rem" },
                          }}
                        >
                          Contact Us
                        </Typography>
                        
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: { xs: 0.5, sm: 0.75 },
                            width: "100%",
                            maxWidth: { md: 300 },
                            alignItems: { xs: "stretch", md: "flex-end" },
                          }}
                        >
                          {/* Physical Address */}
                          <Box
                            sx={{
                              p: { xs: 1, sm: 1.25 },
                              background: "rgba(255,255,255,0.05)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "10px",
                              transition: "all 0.3s ease",
                              width: "100%",
                              "&:hover": {
                                background: "rgba(255,255,255,0.08)",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: { md: "flex-end" },
                                gap: { xs: 0.5, sm: 1 },
                                mb: { xs: 0.25, sm: 0.5 },
                              }}
                            >
                              <Box
                                sx={{
                                  color: "#4caf50",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: { xs: 24, sm: 28 },
                                  height: { xs: 24, sm: 28 },
                                  borderRadius: "50%",
                                  background: "rgba(76, 175, 80, 0.1)",
                                }}
                              >
                                <LocationOn sx={{ fontSize: { xs: "14px", sm: "16px" } }} />
                              </Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#e3f2fd", fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>
                                Physical Address
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "rgba(255,255,255,0.9)",
                                lineHeight: 1.4,
                                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                textAlign: { md: "right" },
                              }}
                            >
                              Meghon Plaza, Bungoma Town,<br />
                              along Moi Avenue
                            </Typography>
                          </Box>

                          {/* Postal Address */}
                          <Box
                            sx={{
                              p: { xs: 1, sm: 1.25 },
                              background: "rgba(255,255,255,0.05)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "10px",
                              transition: "all 0.3s ease",
                              width: "100%",
                              "&:hover": {
                                background: "rgba(255,255,255,0.08)",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: { md: "flex-end" },
                                gap: { xs: 0.5, sm: 1 },
                                mb: { xs: 0.25, sm: 0.5 },
                              }}
                            >
                              <Box
                                sx={{
                                  color: "#ff9800",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: { xs: 24, sm: 28 },
                                  height: { xs: 24, sm: 28 },
                                  borderRadius: "50%",
                                  background: "rgba(255, 152, 0, 0.1)",
                                }}
                              >
                                <LocationOn sx={{ fontSize: { xs: "14px", sm: "16px" } }} />
                              </Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#e3f2fd", fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>
                                Postal Address
            </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "rgba(255,255,255,0.9)",
                                lineHeight: 1.4,
                                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                textAlign: { md: "right" },
                              }}
                            >
                              P.O. Box 2072-50200
                            </Typography>
                          </Box>

                          {/* Contact Info */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: { xs: 0.5, sm: 1 },
                              width: "100%",
                              alignItems: { xs: "flex-start", md: "flex-end" },
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
                              <Box
                                sx={{
                                  color: "#2196f3",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: { xs: 20, sm: 24 },
                                  height: { xs: 20, sm: 24 },
                                  borderRadius: "50%",
                                  background: "rgba(33, 150, 243, 0.1)",
                                }}
                              >
                                <Phone sx={{ fontSize: { xs: "12px", sm: "14px" } }} />
                              </Box>
                              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)", fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                                0721660901
            </Typography>
                            </Box>
                            
                            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
                              <Box
                                sx={{
                                  color: "#e91e63",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: { xs: 20, sm: 24 },
                                  height: { xs: 20, sm: 24 },
                                  borderRadius: "50%",
                                  background: "rgba(233, 30, 99, 0.1)",
                                }}
                              >
                                <Email sx={{ fontSize: { xs: "12px", sm: "14px" } }} />
                              </Box>
                              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)", fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                                mwalimuhopefoundation@gmail.com
            </Typography>
                            </Box>
                          </Box>
                        </Box>
                  </Box>
                </Slide>
              </Box>
            </Box>

            {/* Copyright Section */}
            <Fade in timeout={2000}>
              <Box sx={{ width: "100%", mx: { xs: -3, sm: -4, md: -5 } }}>
                <Divider
                  sx={{
                    my: { xs: 2, md: 3 },
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                />
                <Box
                  sx={{
                    textAlign: "center",
                    py: { xs: 1.5, md: 2 },
                    px: { xs: 3, sm: 4, md: 5 },
                    background: "rgba(0,0,0,0.15)",
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255,255,255,0.85)",
                      fontWeight: 500,
                      fontSize: { xs: "0.75rem", sm: "0.95rem" },
                    }}
                  >
                    © {new Date().getFullYear()} Mwalimu Hope Foundation. All rights reserved.
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 0.5,
                      mt: { xs: 0.75, sm: 1 },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.9)",
                        fontWeight: 600,
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    >
                      Developed by
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: "#90caf9",
                        fontWeight: 700,
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    >
                      Carlvyne Technologies Ltd
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
}
