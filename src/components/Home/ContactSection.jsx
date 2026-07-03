import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { Email, Phone, LocationOn, Send, VolunteerActivism, School, Psychology, Group, Person } from "@mui/icons-material";
import Swal from "sweetalert2";

const MotionBox = motion(Box);

export default function ContactSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    interest: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const interestOptions = [
    { value: "volunteer", label: "Volunteer Opportunities", icon: <VolunteerActivism />, color: "#4caf50" },
    { value: "education", label: "Educational Support", icon: <School />, color: "#2196f3" },
    { value: "mental_health", label: "Mental Health Services", icon: <Psychology />, color: "#e91e63" },
    { value: "community", label: "Community Programs", icon: <Group />, color: "#ff9800" },
    { value: "donation", label: "Donations & Support", icon: <VolunteerActivism />, color: "#9c27b0" },
    { value: "partnership", label: "Partnership Opportunities", icon: <Group />, color: "#00bcd4" },
  ];


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit to backend API
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          category: formData.interest,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit inquiry");
      }
      
      // Reset form data
      setFormData({
        name: "",
        email: "",
        message: "",
        interest: "",
        phone: "",
      });

      // Show success SweetAlert
      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your message has been sent successfully! We'll get back to you soon.",
        timer: 3000,
        showConfirmButton: false,
        customClass: {
          container: "swal-z-index-fix",
        },
        didOpen: () => {
          const swalContainer = document.querySelector(".swal-z-index-fix");
          if (swalContainer) {
            swalContainer.style.zIndex = "9999";
          }
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to send message. Please try again.",
        customClass: {
          container: "swal-z-index-fix",
        },
        didOpen: () => {
          const swalContainer = document.querySelector(".swal-z-index-fix");
          if (swalContainer) {
            swalContainer.style.zIndex = "9999";
          }
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="contact-section"
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
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
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
            {/* Header Section */}
            <Box
              sx={{
                textAlign: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  mb: 1,
                }}
              >
                <Email
                  sx={{ fontSize: "2.5rem", color: "primary.main" }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    fontSize: "1.5rem",
                  }}
                >
                  Get Involved
                </Typography>
              </Box>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: "auto", fontSize: "0.875rem" }}
              >
                Join us in making a difference. Whether you want to volunteer, donate, or partner with us, 
                we'd love to hear from you.
              </Typography>
            </Box>

            {/* Contact Form */}
            <Box>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<Person />}
                  onClick={() => navigate("/member-registration")}
                  sx={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    px: 3,
                    py: 0.75,
                    borderRadius: "25px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                    "&:hover": {
                      backgroundColor: "#45a049",
                      boxShadow: "0 6px 16px rgba(76, 175, 80, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    "&:focus": {
                      outline: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                    },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  Register as a Member
                </Button>
              </Box>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ width: "100%" }}
                  >
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          variant="outlined"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          type="email"
                          variant="outlined"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          variant="outlined"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth required>
                          <InputLabel>Area of Interest</InputLabel>
                          <Select
                            value={formData.interest}
                            label="Area of Interest"
                            onChange={(e) => handleInputChange("interest", e.target.value)}
                            sx={{
                              borderRadius: "12px",
                            }}
                          >
                            {interestOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <Box sx={{ color: option.color }}>{option.icon}</Box>
                                  {option.label}
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid size={12}>
                        <TextField
                          fullWidth
                          label="Tell us how you'd like to help"
                          multiline
                          rows={3}
                          variant="outlined"
                          required
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Share your ideas, questions, or how you'd like to contribute to our mission..."
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Box sx={{ textAlign: "center", mt: 2.5 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="medium"
                        startIcon={
                          loading ? <CircularProgress size={18} color="inherit" /> : <Send />
                        }
                        disabled={loading}
                        sx={{
                          px: 4,
                          py: 1.25,
                          fontSize: "1rem",
                          fontWeight: 600,
                          borderRadius: "50px",
                          background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
                          boxShadow: "0 6px 24px rgba(33, 150, 243, 0.3)",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            transform: "translateY(-2px) scale(1.03)",
                            boxShadow: "0 8px 32px rgba(33, 150, 243, 0.4)",
                            background: "linear-gradient(45deg, #1976d2 30%, #1cb5e0 90%)",
                          },
                          "&:focus": {
                            outline: "none",
                          },
                          "&:focus-visible": {
                            outline: "none",
                          },
                        }}
                      >
                        {loading ? "Sending Message..." : "Send Message"}
                      </Button>
                    </Box>
                  </Box>
            </Box>
          </Paper>
        </MotionBox>
      </Box>
    </Box>
  );
}
