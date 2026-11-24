import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Stack,
  Link,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  EmailOutlined,
  Send,
  VolunteerActivism,
  School,
  Psychology,
  Group,
  Person,
  LocalHospital,
  PhoneRounded,
  PlaceOutlined,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { HOME, homeSectionShellSx, homeFieldSx, homePrimaryButtonSx } from "./homeShared";
import SectionHeader from "./SectionHeader";
import { contactInfo } from "../../constants/aboutConfig";

const MotionBox = motion(Box);

const sideGutter = { xs: 1.5, sm: 2, md: 2.5 };

function ContactDetailRow({ icon, label, children }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "12px",
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          bgcolor: alpha(HOME.morphoBlue, 0.18),
          color: HOME.morphoBlueMuted,
          border: `1px solid ${alpha(HOME.morphoBlueMuted, 0.28)}`,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          sx={{
            fontSize: "0.68rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: HOME.morphoBlueMuted,
            fontWeight: 800,
            mb: 0.35,
            fontFamily: HOME.fontBody,
          }}
        >
          {label}
        </Typography>
        {children}
      </Box>
    </Stack>
  );
}

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
    { value: "volunteer", label: "Volunteer Opportunities", icon: <VolunteerActivism />, color: HOME.morphoBlue },
    { value: "education", label: "Educational Support", icon: <School />, color: HOME.morphoBlueDark },
    { value: "mental_health", label: "Mental Health Services", icon: <Psychology />, color: HOME.deepUmber },
    { value: "community", label: "Community Programs", icon: <Group />, color: HOME.deepUmberMid },
    { value: "donation", label: "Donations & Support", icon: <VolunteerActivism />, color: HOME.morphoBlueMuted },
    { value: "partnership", label: "Partnership Opportunities", icon: <LocalHospital />, color: HOME.morphoBlue },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          category: formData.interest,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to submit inquiry");

      setFormData({ name: "", email: "", message: "", interest: "", phone: "" });

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your message has been sent successfully! We'll get back to you soon.",
        timer: 3000,
        showConfirmButton: false,
        customClass: { container: "swal-z-index-fix" },
        didOpen: () => {
          const swalContainer = document.querySelector(".swal-z-index-fix");
          if (swalContainer) swalContainer.style.zIndex = "9999";
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to send message. Please try again.",
        customClass: { container: "swal-z-index-fix" },
        didOpen: () => {
          const swalContainer = document.querySelector(".swal-z-index-fix");
          if (swalContainer) swalContainer.style.zIndex = "9999";
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const detailTextSx = {
    fontFamily: HOME.fontBody,
    fontWeight: 600,
    fontSize: "0.95rem",
    color: HOME.oldPaperSoft,
    lineHeight: 1.45,
    wordBreak: "break-word",
  };

  return (
    <Box id="contact-section" sx={homeSectionShellSx("white")}>
      <Box sx={{ width: "100%", position: "relative", zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            overline="Connect With Us"
            title="Get Involved"
            description="Volunteer, donate, or partner with us — we'd love to hear from you."
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 1.5, md: 2 },
              alignItems: "stretch",
              width: "100%",
              px: sideGutter,
              boxSizing: "border-box",
            }}
          >
            {/* Reach Out */}
            <Box
              sx={{
                minWidth: 0,
                borderRadius: { xs: "16px", md: "20px" },
                p: { xs: 2.25, sm: 2.75, md: 3.25 },
                background: `linear-gradient(155deg, ${HOME.deepUmberDark} 0%, ${HOME.deepUmber} 48%, ${HOME.deepUmberMid} 100%)`,
                color: HOME.oldPaperSoft,
                boxShadow: HOME.shadowMd,
                display: "flex",
                flexDirection: "column",
                gap: 2.25,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -40,
                  right: -30,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: alpha(HOME.morphoBlue, 0.16),
                  pointerEvents: "none",
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: HOME.fontDisplay,
                    fontWeight: 700,
                    fontSize: { xs: "1.45rem", md: "1.7rem" },
                    color: HOME.oldPaperSoft,
                    mb: 0.75,
                    lineHeight: 1.15,
                  }}
                >
                  Reach Out
                </Typography>
                <Typography
                  sx={{
                    fontFamily: HOME.fontBody,
                    fontSize: "0.9rem",
                    color: alpha(HOME.oldPaperSoft, 0.82),
                    lineHeight: 1.55,
                    maxWidth: 420,
                  }}
                >
                  Partnership, volunteer, and support inquiries welcome from Bungoma and beyond.
                </Typography>
              </Box>

              <Stack spacing={2.25} sx={{ position: "relative", zIndex: 1, flex: 1 }}>
                <ContactDetailRow icon={<EmailOutlined sx={{ fontSize: 20 }} />} label="Email">
                  <Link
                    href={`mailto:${contactInfo.email}`}
                    underline="hover"
                    sx={{ ...detailTextSx, color: HOME.oldPaperSoft, display: "inline-block" }}
                  >
                    {contactInfo.email}
                  </Link>
                </ContactDetailRow>

                <ContactDetailRow icon={<PhoneRounded sx={{ fontSize: 20 }} />} label="Phone">
                  <Stack spacing={0.35}>
                    {contactInfo.phones.map((phone) => (
                      <Link
                        key={phone}
                        href={`tel:+254${phone.replace(/^0/, "")}`}
                        underline="hover"
                        sx={{ ...detailTextSx, color: HOME.oldPaperSoft }}
                      >
                        {phone}
                      </Link>
                    ))}
                  </Stack>
                </ContactDetailRow>

                <ContactDetailRow icon={<PlaceOutlined sx={{ fontSize: 20 }} />} label="Visit">
                  <Typography sx={detailTextSx}>{contactInfo.address}</Typography>
                </ContactDetailRow>
              </Stack>

              <Button
                variant="contained"
                startIcon={<Person />}
                onClick={() => navigate("/member-registration")}
                sx={{
                  position: "relative",
                  zIndex: 1,
                  mt: "auto",
                  alignSelf: { xs: "stretch", sm: "flex-start" },
                  textTransform: "none",
                  fontWeight: 700,
                  fontFamily: HOME.fontBody,
                  borderRadius: "12px",
                  bgcolor: HOME.morphoBlue,
                  color: "#fff",
                  px: 2.75,
                  py: 1.15,
                  boxShadow: `0 8px 22px ${alpha(HOME.morphoBlue, 0.35)}`,
                  "&:hover": { bgcolor: HOME.morphoBlueDark },
                }}
              >
                Register as a Member
              </Button>
            </Box>

            {/* Send a Message */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                minWidth: 0,
                borderRadius: { xs: "16px", md: "20px" },
                p: { xs: 2.25, sm: 2.75, md: 3.25 },
                bgcolor: "#fff",
                border: `1px solid ${HOME.border}`,
                boxShadow: HOME.shadowSm,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontFamily: HOME.fontDisplay,
                  fontWeight: 700,
                  fontSize: { xs: "1.45rem", md: "1.7rem" },
                  color: HOME.deepUmber,
                  mb: 0.5,
                  lineHeight: 1.15,
                }}
              >
                Send a Message
              </Typography>
              <Typography
                sx={{
                  fontFamily: HOME.fontBody,
                  fontSize: "0.88rem",
                  color: alpha(HOME.deepUmber, 0.65),
                  mb: 2.25,
                  lineHeight: 1.5,
                }}
              >
                Tell us how you&apos;d like to help — we&apos;ll get back to you soon.
              </Typography>

              <Grid container spacing={2} sx={{ flex: 1 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    sx={homeFieldSx()}
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
                    sx={homeFieldSx()}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    sx={homeFieldSx()}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth required sx={homeFieldSx()}>
                    <InputLabel>Area of Interest</InputLabel>
                    <Select
                      value={formData.interest}
                      label="Area of Interest"
                      onChange={(e) => handleInputChange("interest", e.target.value)}
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
                    label="How you'd like to help"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Share your idea, question, or how you'd like to contribute..."
                    sx={homeFieldSx()}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 2.5 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Send />}
                  disabled={loading}
                  sx={{
                    ...homePrimaryButtonSx(),
                    py: 1.35,
                  }}
                >
                  {loading ? "Sending Message..." : "Send Message"}
                </Button>
              </Box>
            </Box>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}
