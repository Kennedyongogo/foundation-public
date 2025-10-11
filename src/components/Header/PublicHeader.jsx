import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, Typography, Link, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Fade, Slide } from "@mui/material";
import { Construction, ContactSupport, Home, Menu as MenuIcon, Close, VolunteerActivism, Psychology, Favorite, School, LocalHospital, Groups } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavigateToSection = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const navItems = [
    { label: "Home", icon: <Home />, sectionId: "hero-section", color: "#2196f3" },
    { label: "Our Mission", icon: <Favorite />, sectionId: "mission-section", color: "#e91e63" },
    { label: "Projects", icon: <School />, sectionId: "projects-section", color: "#4caf50" },
    { label: "Our Team", icon: <Groups />, sectionId: "team-section", color: "#9c27b0" },
    { label: "Contact", icon: <LocalHospital />, sectionId: "contact-section", color: "#ff9800" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(0, 0, 0, 0.2)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
          boxShadow: scrolled 
            ? "0 8px 32px rgba(0, 0, 0, 0.12)" 
            : "0 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          borderBottom: scrolled 
            ? "1px solid rgba(33, 150, 243, 0.1)" 
            : "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Enhanced Logo Section */}
            <Fade in={true} timeout={1000}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                    transform: "scale(1.05) translateY(-2px)",
                },
              }}
              onClick={() => navigate("/")}
              >
              <img
                src="/foundation-logo.png"
                alt="Mwalimu Hope Foundation Logo"
                style={{
                  height: scrolled ? "56px" : "64px",
                  width: "auto",
                  transition: "height 0.4s ease",
                      filter: scrolled ? "none" : "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                }}
              />
              <Box sx={{ ml: 2, display: { xs: "none", sm: "block" } }}>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: { sm: "1.1rem", md: "1.25rem" },
                    color: scrolled ? "primary.main" : "white",
                    lineHeight: 1.2,
                      transition: "all 0.3s ease",
                      textShadow: scrolled ? "none" : "2px 2px 4px rgba(0,0,0,0.3)",
                      background: scrolled 
                        ? "linear-gradient(45deg, #2196f3, #1976d2)" 
                        : "linear-gradient(45deg, #ffffff, #e3f2fd)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                  }}
                >
                  Mwalimu Hope Foundation
                </Typography>
              </Box>
            </Box>
            </Fade>

            {/* Enhanced Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              {navItems.map((item, index) => (
                <Slide direction="down" in={true} timeout={800 + index * 200} key={item.label}>
                <Button
                  onClick={() => handleNavigateToSection(item.sectionId)}
                  startIcon={item.icon}
                  sx={{
                    color: scrolled ? "text.primary" : "white",
                    fontSize: "1rem",
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      borderRadius: "25px",
                    textTransform: "none",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                      overflow: "hidden",
                    "&:hover": {
                      backgroundColor: scrolled
                          ? `${item.color}15`
                          : "rgba(255, 255, 255, 0.15)",
                        transform: "translateY(-3px) scale(1.05)",
                        boxShadow: scrolled 
                          ? `0 8px 25px ${item.color}30` 
                          : "0 8px 25px rgba(255, 255, 255, 0.2)",
                        "& .icon": {
                          color: item.color,
                          transform: "rotate(360deg)",
                        },
                      },
                      "&::before": {
                      content: '""',
                      position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(90deg, transparent, ${item.color}20, transparent)`,
                        transition: "left 0.5s ease",
                      },
                      "&:hover::before": {
                        left: "100%",
                      },
                      "& .icon": {
                        transition: "all 0.4s ease",
                        color: scrolled ? item.color : "white",
                    },
                  }}
                >
                  {item.label}
                </Button>
                </Slide>
              ))}
            </Box>

            {/* Enhanced Mobile Menu Button */}
            <Fade in={true} timeout={1200}>
            <IconButton
              sx={{
                display: { xs: "flex", md: "none" },
                color: scrolled ? "primary.main" : "white",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: "12px",
                "&:hover": {
                  backgroundColor: scrolled
                      ? "rgba(33, 150, 243, 0.1)"
                      : "rgba(255, 255, 255, 0.15)",
                    transform: "rotate(90deg) scale(1.1)",
                    boxShadow: scrolled 
                      ? "0 8px 25px rgba(33, 150, 243, 0.3)" 
                      : "0 8px 25px rgba(255, 255, 255, 0.2)",
                },
              }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>
            </Fade>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Enhanced Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "320px",
            backgroundColor: "background.paper",
            backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.9) 100%)",
            backdropFilter: "blur(20px)",
            borderLeft: "1px solid rgba(33, 150, 243, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                background: "linear-gradient(45deg, #2196f3, #1976d2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Menu
            </Typography>
            <IconButton
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                borderRadius: "12px",
                "&:hover": {
                  transform: "rotate(90deg) scale(1.1)",
                  backgroundColor: "rgba(33, 150, 243, 0.1)",
                  boxShadow: "0 8px 25px rgba(33, 150, 243, 0.3)",
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 3, borderColor: "rgba(33, 150, 243, 0.2)" }} />
          <List>
            {navItems.map((item, index) => (
              <Slide direction="left" in={true} timeout={1000 + index * 200} key={item.label}>
              <ListItem
                button
                onClick={() => handleNavigateToSection(item.sectionId)}
                sx={{
                    borderRadius: "16px",
                    mb: 2,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                      backgroundColor: `${item.color}15`,
                      transform: "translateX(12px) scale(1.02)",
                      boxShadow: `0 8px 25px ${item.color}30`,
                      "& .icon": {
                        color: item.color,
                        transform: "rotate(360deg)",
                      },
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      color: item.color, 
                      minWidth: 45,
                      "& .icon": {
                        transition: "all 0.4s ease",
                  },
                }}
              >
                    {React.cloneElement(item.icon, { className: "icon" })}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "text.primary",
                  }}
                />
              </ListItem>
              </Slide>
            ))}
          </List>
        </Box>
      </Drawer>

      <Toolbar sx={{ height: scrolled ? "72px" : "80px", transition: "height 0.4s ease" }} />
    </>
  );
}
