import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Rating,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import Swal from "sweetalert2";

const MotionBox = motion(Box);

const StyledTestimonyCard = styled(Card)(({ theme }) => ({
  height: "auto",
  width: "350px",
  minHeight: "250px",
  borderRadius: "16px",
  overflow: "hidden",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
  border: "1px solid rgba(76, 175, 80, 0.15)",
  transition: "all 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
    borderColor: "rgba(76, 175, 80, 0.3)",
  },
}));

export default function TestimonySection() {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedTestimony, setSelectedTestimony] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    description: "",
  });

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/testimonies/approved");
      
      if (!response.ok) {
        throw new Error("Failed to fetch testimonies");
      }

      const data = await response.json();
      setTestimonies(data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching testimonies:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    setFormData({ name: "", rating: 5, description: "" });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData({ name: "", rating: 5, description: "" });
  };

  const handleViewDialogOpen = (testimony) => {
    setSelectedTestimony(testimony);
    setViewDialogOpen(true);
  };

  const handleViewDialogClose = () => {
    setViewDialogOpen(false);
    setSelectedTestimony(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      
      // Validate required fields
      if (!formData.name.trim() || !formData.description.trim()) {
        Swal.fire({
          icon: "error",
          title: "Validation Error!",
          text: "Please fill in all required fields",
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
        return;
      }

      const response = await fetch("/api/testimonies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          rating: formData.rating,
          description: formData.description.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit testimony");
      }

      // Show success SweetAlert
      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Testimony submitted successfully! It will be reviewed before being published.",
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

      handleDialogClose();
      
      // Refresh testimonies to show any newly approved ones
      await fetchTestimonies();
      
    } catch (err) {
      console.error("Error submitting testimony:", err);
      // Show error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message || "Failed to submit testimony. Please try again.",
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
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 6,
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="error" variant="body1">
          Unable to load testimonies at this time.
        </Typography>
      </Box>
    );
  }

  if (testimonies.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="text.secondary" variant="body1">
          No testimonies to display.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      id="testimonials-section"
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
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
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
                  mb: 2,
                }}
              >
                <RecordVoiceOverIcon
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
                  Testimonials
                </Typography>
              </Box>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: "auto", fontSize: "0.875rem" }}
              >
                Hear from the people whose lives we've touched through our community programs
              </Typography>
            </Box>

            {/* Create Testimony Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleDialogOpen}
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
                  transition: "all 0.3s ease-in-out",
                }}
              >
                Share Your Experience
              </Button>
            </Box>

            {/* Testimonies Cards */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                overflowX: "auto",
                overflowY: "hidden",
                pb: 2,
                px: 1,
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": {
                  height: "10px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "rgba(0,0,0,0.05)",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(33, 150, 243, 0.5)",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 0.8)",
                  },
                },
              }}
            >
              {testimonies.map((testimony, index) => (
                <Box key={testimony.id} sx={{ flex: "0 0 auto" }}>
                  <StyledTestimonyCard onClick={() => handleViewDialogOpen(testimony)}>
                    <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
                      {/* Name */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "#4caf50",
                          fontSize: "1.2rem",
                          textAlign: "center",
                        }}
                      >
                        {testimony.name}
                      </Typography>

                      {/* Star Rating */}
                      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                        <Rating
                          value={testimony.rating}
                          readOnly
                          precision={0.5}
                          size="medium"
                          icon={<StarIcon fontSize="inherit" sx={{ color: "#ffc107" }} />}
                          emptyIcon={<StarIcon fontSize="inherit" sx={{ color: "#e0e0e0" }} />}
                        />
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.9rem",
                          lineHeight: 1.6,
                          textAlign: "left",
                          flex: "1 1 auto",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 8,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {testimony.description}
                      </Typography>
                    </CardContent>
                  </StyledTestimonyCard>
                </Box>
              ))}
            </Box>
          </Paper>
        </MotionBox>
      </Box>

      {/* Create Testimony Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#4caf50",
            textAlign: "center",
            pb: 1,
          }}
        >
          Share Your Experience
        </DialogTitle>
        
        <DialogContent sx={{ px: 3, pb: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            {/* Name Input */}
            <TextField
              label="Your Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              fullWidth
              required
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />

            {/* Rating Input */}
            <Box>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                Rating *
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={formData.rating}
                  onChange={(event, newValue) => handleInputChange("rating", newValue)}
                  precision={1}
                  size="large"
                  icon={<StarIcon fontSize="inherit" sx={{ color: "#ffc107" }} />}
                  emptyIcon={<StarIcon fontSize="inherit" sx={{ color: "#e0e0e0" }} />}
                />
                <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
                  ({formData.rating} star{formData.rating !== 1 ? 's' : ''})
                </Typography>
              </Box>
            </Box>

            {/* Description Input */}
            <TextField
              label="Your Experience"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              fullWidth
              required
              multiline
              rows={4}
              variant="outlined"
              placeholder="Tell us about your experience with Mwalimu Hope Foundation..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
          <Button
            onClick={handleDialogClose}
            sx={{
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting || !formData.name.trim() || !formData.description.trim()}
            variant="contained"
            sx={{
              backgroundColor: "#4caf50",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#45a049",
              },
              "&:disabled": {
                backgroundColor: "#e0e0e0",
                color: "#9e9e9e",
              },
            }}
          >
            {submitting ? "Submitting..." : "Submit Testimony"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Testimony Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleViewDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)",
          },
        }}
      >
        {selectedTestimony && (
          <>
            <DialogTitle
              sx={{
                textAlign: "center",
                pb: 2,
                pt: 3,
                background: "linear-gradient(135deg, #4caf50, #45a049)",
                color: "white",
                borderRadius: "16px 16px 0 0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  mb: 1,
                }}
              >
                <RecordVoiceOverIcon sx={{ fontSize: "2rem" }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  {selectedTestimony.name}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 1.5 }}>
                <Rating
                  value={selectedTestimony.rating}
                  readOnly
                  precision={0.5}
                  size="large"
                  icon={<StarIcon fontSize="inherit" sx={{ color: "#ffc107" }} />}
                  emptyIcon={<StarIcon fontSize="inherit" sx={{ color: "rgba(255, 255, 255, 0.5)" }} />}
                />
              </Box>
            </DialogTitle>
            
            <DialogContent sx={{ px: { xs: 3, md: 4 }, py: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    lineHeight: 1.8,
                    textAlign: "left",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {selectedTestimony.description}
                </Typography>
              </Box>
            </DialogContent>

            <DialogActions sx={{ px: { xs: 3, md: 4 }, pb: 3, pt: 1 }}>
              <Button
                onClick={handleViewDialogClose}
                variant="contained"
                sx={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 4,
                  py: 1,
                  borderRadius: "25px",
                  "&:hover": {
                    backgroundColor: "#45a049",
                  },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

    </Box>
  );
}

