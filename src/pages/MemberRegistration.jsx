import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Person, ArrowBack } from "@mui/icons-material";
import Swal from "sweetalert2";

const MotionBox = motion(Box);

export default function MemberRegistration() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    national_id: "",
    physical_address: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    membership_type: "Regular",
    how_heard_about: "",
    reason_for_joining: "",
    areas_of_interest: "",
    skills_contribution: "",
    preferred_communication: "",
  });
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const [loading, setLoading] = useState(false);

  // Scroll to top immediately when component mounts
  useEffect(() => {
    // Scroll instantly to top without animation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Also set scroll position directly as fallback
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

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
      // Format date_of_birth for API if dateOfBirth is set
      const submitData = {
        ...formData,
        date_of_birth: dateOfBirth ? dayjs(dateOfBirth).format("YYYY-MM-DD") : formData.date_of_birth,
      };

      const response = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit registration");
      }

      // Reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        national_id: "",
        physical_address: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        membership_type: "Regular",
        how_heard_about: "",
        reason_for_joining: "",
        areas_of_interest: "",
        skills_contribution: "",
        preferred_communication: "",
      });
      setDateOfBirth(null);

      Swal.fire({
        icon: "success",
        title: "Registration Submitted!",
        text: data.message || "Your membership application has been submitted successfully. We'll review it and get back to you soon.",
        timer: 5000,
        showConfirmButton: true,
        confirmButtonText: "OK",
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
      console.error("Error submitting registration:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Failed to submit registration. Please try again.",
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

  const handleBack = () => {
    navigate("/", { state: { scrollTo: "contact-section" } });
    const scrollToContact = () => {
      const contactSection = document.getElementById("contact-section");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setTimeout(scrollToContact, 100);
      }
    };
    setTimeout(scrollToContact, 300);
  };

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
          /* Fix browser autofill styling - prevent grey background with white text */
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:focus,
          select:-webkit-autofill,
          select:-webkit-autofill:hover,
          select:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 1000px white inset !important;
            -webkit-text-fill-color: #000 !important;
            caret-color: #000 !important;
            transition: background-color 5000s ease-in-out 0s;
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
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 1, sm: 1.5, md: 2 },
            px: { xs: 0.25, sm: 0.375 },
            position: "relative",
            zIndex: 1,
          }}
        >
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
                Back to Contact
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
                    Register as a Member
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
                  Join us in making a difference
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxWidth: 800,
                    mx: "auto",
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                    lineHeight: 1.6,
                  }}
                >
                  Fill out the form below to become a member of our foundation. We'll review your application and get back to you soon.
                </Typography>
              </Box>

              {/* Registration Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Personal Details Section */}
                  <Grid size={12}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: "primary.main",
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      Personal Details
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      required
                      value={formData.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                            caretColor: "#000",
                          },
                          "& input:-webkit-autofill:hover": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                          "& input:-webkit-autofill:focus": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                            caretColor: "#000",
                          },
                          "& input:-webkit-autofill:hover": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                          "& input:-webkit-autofill:focus": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                            caretColor: "#000",
                          },
                          "& input:-webkit-autofill:hover": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                          "& input:-webkit-autofill:focus": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Birth"
                        value={dateOfBirth}
                        onChange={(newValue) => {
                          setDateOfBirth(newValue);
                          handleInputChange(
                            "date_of_birth",
                            newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                          );
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: {
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                "& input:-webkit-autofill": {
                                  WebkitBoxShadow: "0 0 0 100px white inset",
                                  WebkitTextFillColor: "#000",
                                  caretColor: "#000",
                                },
                                "& input:-webkit-autofill:hover": {
                                  WebkitBoxShadow: "0 0 0 100px white inset",
                                  WebkitTextFillColor: "#000",
                                },
                                "& input:-webkit-autofill:focus": {
                                  WebkitBoxShadow: "0 0 0 100px white inset",
                                  WebkitTextFillColor: "#000",
                                },
                              },
                              "& .MuiIconButton-root": {
                                "&:focus": {
                                  outline: "none",
                                  backgroundColor: "transparent",
                                },
                                "&:focus-visible": {
                                  outline: "none",
                                  backgroundColor: "transparent",
                                },
                                "&:hover": {
                                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                                },
                              },
                            },
                          },
                          openPickerIcon: {
                            sx: {
                              "&:focus": {
                                outline: "none",
                                color: "inherit",
                              },
                              "&:focus-visible": {
                                outline: "none",
                              },
                            },
                          },
                        }}
                        maxDate={dayjs()}
                        format="DD/MM/YYYY"
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={formData.gender}
                        label="Gender"
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        sx={{
                          borderRadius: "12px",
                        }}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="National ID"
                      value={formData.national_id}
                      onChange={(e) => handleInputChange("national_id", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                            caretColor: "#000",
                          },
                          "& input:-webkit-autofill:hover": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                          "& input:-webkit-autofill:focus": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Physical Address"
                      multiline
                      rows={2}
                      value={formData.physical_address}
                      onChange={(e) => handleInputChange("physical_address", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& textarea:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                            caretColor: "#000",
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Emergency Contact Name"
                      value={formData.emergency_contact_name}
                      onChange={(e) => handleInputChange("emergency_contact_name", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                            caretColor: "#000",
                          },
                          "& input:-webkit-autofill:hover": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                          "& input:-webkit-autofill:focus": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Emergency Contact Phone"
                      value={formData.emergency_contact_phone}
                      onChange={(e) => handleInputChange("emergency_contact_phone", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                            caretColor: "#000",
                          },
                          "& input:-webkit-autofill:hover": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                          "& input:-webkit-autofill:focus": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                        },
                      }}
                    />
                  </Grid>

                  {/* Membership Details Section */}
                  <Grid size={12} sx={{ mt: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: "primary.main",
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      Membership Details
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth required>
                      <InputLabel>Membership Type</InputLabel>
                      <Select
                        value={formData.membership_type}
                        label="Membership Type"
                        onChange={(e) => handleInputChange("membership_type", e.target.value)}
                        sx={{
                          borderRadius: "12px",
                        }}
                      >
                        <MenuItem value="Regular">Regular</MenuItem>
                        <MenuItem value="Lifetime">Lifetime</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="Corporate">Corporate</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Preferred Communication</InputLabel>
                      <Select
                        value={formData.preferred_communication}
                        label="Preferred Communication"
                        onChange={(e) => handleInputChange("preferred_communication", e.target.value)}
                        sx={{
                          borderRadius: "12px",
                        }}
                      >
                        <MenuItem value="Email">Email</MenuItem>
                        <MenuItem value="Phone">Phone</MenuItem>
                        <MenuItem value="SMS">SMS</MenuItem>
                        <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                        <MenuItem value="Postal Mail">Postal Mail</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="How did you hear about us?"
                      value={formData.how_heard_about}
                      onChange={(e) => handleInputChange("how_heard_about", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                            caretColor: "#000",
                          },
                          "& input:-webkit-autofill:hover": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                          "& input:-webkit-autofill:focus": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Reason for Joining"
                      multiline
                      rows={3}
                      value={formData.reason_for_joining}
                      onChange={(e) => handleInputChange("reason_for_joining", e.target.value)}
                      placeholder="Tell us why you want to join our foundation..."
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& textarea:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                            caretColor: "#000",
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Areas of Interest"
                      multiline
                      rows={2}
                      value={formData.areas_of_interest}
                      onChange={(e) => handleInputChange("areas_of_interest", e.target.value)}
                      placeholder="What areas are you interested in?"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& textarea:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                            caretColor: "#000",
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Skills/Contribution"
                      multiline
                      rows={2}
                      value={formData.skills_contribution}
                      onChange={(e) => handleInputChange("skills_contribution", e.target.value)}
                      placeholder="What skills or contributions can you bring?"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& textarea:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px white inset",
                            WebkitTextFillColor: "#000",
                            caretColor: "#000",
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={
                      loading ? <CircularProgress size={18} color="inherit" /> : <Person />
                    }
                    disabled={loading}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: "50px",
                      background: "linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)",
                      boxShadow: "0 6px 24px rgba(76, 175, 80, 0.3)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-2px) scale(1.03)",
                        boxShadow: "0 8px 32px rgba(76, 175, 80, 0.4)",
                        background: "linear-gradient(45deg, #388e3c 30%, #4caf50 90%)",
                      },
                      "&:focus": {
                        outline: "none",
                        boxShadow: "0 6px 24px rgba(76, 175, 80, 0.3)",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        boxShadow: "0 6px 24px rgba(76, 175, 80, 0.3)",
                      },
                      "&:active": {
                        outline: "none",
                        boxShadow: "0 6px 24px rgba(76, 175, 80, 0.3)",
                      },
                    }}
                  >
                    {loading ? "Submitting..." : "Register as Member"}
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

