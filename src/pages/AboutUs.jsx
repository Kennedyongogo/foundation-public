import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  ArrowBack,
  Favorite,
  LocationOn,
  Email,
  Groups,
  Phone,
} from "@mui/icons-material";
import {
  brand,
  orgTagline,
  whoWeAreParagraphs,
  visionText,
  missionText,
  focusAreas,
  values,
  leadership,
  contactInfo,
  institutionalProfile,
  achievements,
  partners,
  governanceNote,
  sectionIcons,
} from "../constants/aboutConfig";

const MotionBox = motion(Box);

const sectionSx = {
  width: "100%",
  p: { xs: 3, sm: 4, md: 5 },
  bgcolor: "#fff",
  borderTop: `1px solid ${alpha(brand.navy, 0.08)}`,
  borderRadius: 0,
  boxShadow: "none",
};

const SectionHeader = ({ icon: Icon, title, color = brand.green }) => (
  <Stack direction="row" alignItems="center" spacing={1.5} mb={2.5}>
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: alpha(color, 0.12),
        color,
      }}
    >
      <Icon fontSize="small" />
    </Box>
    <Typography variant="h5" fontWeight={800} color={brand.navy} sx={{ fontSize: { xs: "1.15rem", md: "1.5rem" } }}>
      {title}
    </Typography>
  </Stack>
);

export default function AboutUs() {
  const navigate = useNavigate();

  const handleBack = () => navigate("/");
  const handleGetInvolved = () => navigate("/", { state: { scrollTo: "contact-section" } });
  const handleCeoMessage = () => navigate("/ceo-message");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          width: "100%",
          pt: { xs: 2, sm: 2.5, md: 3 },
          pb: { xs: 2.5, md: 3 },
          px: { xs: 2, sm: 4, md: 5 },
          bgcolor: "#fff",
          borderBottom: `1px solid ${alpha(brand.navy, 0.08)}`,
          background: `linear-gradient(180deg, ${alpha(brand.navy, 0.02)} 0%, #fff 100%)`,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: { xs: 2, md: 2.5 } }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{
              color: brand.navy,
              bgcolor: alpha(brand.navy, 0.06),
              border: `1px solid ${alpha(brand.navy, 0.12)}`,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": { bgcolor: alpha(brand.green, 0.1), borderColor: alpha(brand.green, 0.3) },
            }}
          >
            Back to Home
          </Button>
        </Box>

        <Box sx={{ textAlign: "center", maxWidth: 900, mx: "auto" }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.2em", fontWeight: 700, color: brand.green, fontSize: "0.75rem" }}
          >
            Who We Are
          </Typography>
          <Typography
            variant="h1"
            sx={{
              mt: 1,
              mb: 1.5,
              fontWeight: 900,
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
              color: brand.navy,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            About Us
          </Typography>
          <Box
            sx={{
              width: 72,
              height: 4,
              borderRadius: 2,
              mb: 2,
              mx: "auto",
              background: `linear-gradient(90deg, ${brand.green}, ${brand.gold})`,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: alpha(brand.navy, 0.75),
              lineHeight: 1.75,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              maxWidth: 720,
              mx: "auto",
            }}
          >
            {orgTagline}
          </Typography>
        </Box>
      </Box>

      <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={sectionSx}>
          <SectionHeader icon={sectionIcons.whoWeAre} title="Who We Are" color={brand.blue} />
          {whoWeAreParagraphs.map((paragraph, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                color: alpha(brand.navy, 0.8),
                lineHeight: 1.85,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                mb: index < whoWeAreParagraphs.length - 1 ? 2 : 0,
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>

        <Box sx={{ ...sectionSx, bgcolor: alpha(brand.navy, 0.02) }}>
          <SectionHeader icon={sectionIcons.institutional} title="Institutional Profile" color={brand.navy} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            {[
              { label: "Official Name", value: institutionalProfile.fullName },
              { label: "Acronym", value: institutionalProfile.acronym },
              { label: "Legal Status", value: institutionalProfile.legalStatus },
              { label: "Registration", value: `${institutionalProfile.registrationDate}, ${institutionalProfile.registrationPlace}` },
              { label: "Tax Status", value: institutionalProfile.taxStatus },
            ].map(({ label, value }) => (
              <Box
                key={label}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#fff",
                  border: `1px solid ${alpha(brand.navy, 0.08)}`,
                }}
              >
                <Typography variant="caption" fontWeight={700} color={brand.green} sx={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {label}
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(brand.navy, 0.8), mt: 0.5, lineHeight: 1.7 }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            width: "100%",
          }}
        >
          <Box sx={{ ...sectionSx, bgcolor: alpha(brand.blue, 0.03) }}>
            <SectionHeader icon={sectionIcons.vision} title="Our Vision" color={brand.blue} />
            <Typography variant="body1" sx={{ color: alpha(brand.navy, 0.8), lineHeight: 1.85, fontSize: { xs: "0.95rem", md: "1.05rem" } }}>
              {visionText}
            </Typography>
          </Box>
          <Box sx={{ ...sectionSx, bgcolor: alpha(brand.green, 0.04), borderTop: { xs: `1px solid ${alpha(brand.navy, 0.08)}`, md: "none" }, borderLeft: { md: `1px solid ${alpha(brand.navy, 0.08)}` } }}>
            <SectionHeader icon={sectionIcons.mission} title="Our Mission" color={brand.green} />
            <Typography variant="body1" sx={{ color: alpha(brand.navy, 0.8), lineHeight: 1.85, fontSize: { xs: "0.95rem", md: "1.05rem" } }}>
              {missionText}
            </Typography>
          </Box>
        </Box>

        <Box sx={sectionSx}>
          <SectionHeader icon={sectionIcons.focus} title="What We Do" color={brand.gold} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <Box
                  key={area.title}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    border: `1px solid ${alpha(area.color, 0.18)}`,
                    bgcolor: alpha(area.color, 0.04),
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: `0 12px 32px ${alpha(brand.navy, 0.1)}`,
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5} mb={1.5}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(area.color, 0.14),
                        color: area.color,
                      }}
                    >
                      <Icon />
                    </Box>
                    <Typography variant="h6" fontWeight={800} color={brand.navy} sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}>
                      {area.title}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: alpha(brand.navy, 0.72), lineHeight: 1.75 }}>
                    {area.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box sx={{ ...sectionSx, bgcolor: alpha(brand.navy, 0.02) }}>
          <SectionHeader icon={sectionIcons.values} title="Our Values" color={brand.gold} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
            }}
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Box
                  key={value.name}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    border: `1px solid ${alpha(value.color, 0.2)}`,
                    bgcolor: "#fff",
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="flex-start" mb={1}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(value.color, 0.12),
                        color: value.color,
                        flexShrink: 0,
                      }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                    <Typography variant="subtitle1" fontWeight={800} color={brand.navy}>
                      {value.name}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: alpha(brand.navy, 0.72), lineHeight: 1.75 }}>
                    {value.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box sx={sectionSx}>
          <SectionHeader icon={sectionIcons.achievements} title="Key Achievements" color={brand.green} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {achievements.map((item) => (
              <Box
                key={item.label}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  textAlign: "center",
                  border: `1px solid ${alpha(brand.green, 0.2)}`,
                  bgcolor: alpha(brand.green, 0.04),
                }}
              >
                <Typography variant="h3" fontWeight={900} color={brand.green} sx={{ fontSize: { xs: "2rem", md: "2.25rem" } }}>
                  {item.value}
                </Typography>
                <Typography variant="subtitle2" fontWeight={700} color={brand.navy} sx={{ mt: 0.5, mb: 1 }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(brand.navy, 0.7), lineHeight: 1.7, textAlign: "left" }}>
                  {item.detail}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ ...sectionSx, bgcolor: alpha(brand.blue, 0.03) }}>
          <SectionHeader icon={sectionIcons.partners} title="Strategic Partners" color={brand.blue} />
          <Stack spacing={2}>
            {partners.map((partner) => (
              <Box
                key={partner.name}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: "#fff",
                  border: `1px solid ${alpha(brand.blue, 0.15)}`,
                }}
              >
                <Typography variant="subtitle1" fontWeight={700} color={brand.navy} mb={0.5}>
                  {partner.name}
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(brand.navy, 0.72), lineHeight: 1.75 }}>
                  {partner.description}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={sectionSx}>
          <SectionHeader icon={sectionIcons.contact} title="Contact & Leadership" color={brand.green} />
          <Typography variant="body2" sx={{ color: alpha(brand.navy, 0.7), mb: 2.5, lineHeight: 1.75 }}>
            {governanceNote}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
              gap: 2,
            }}
          >
            <Box sx={{ p: 2.5, borderRadius: 2, bgcolor: alpha(brand.navy, 0.03), border: `1px solid ${alpha(brand.navy, 0.08)}` }}>
              <Stack direction="row" spacing={1.5} mb={1.5}>
                <LocationOn sx={{ color: brand.green }} />
                <Typography variant="subtitle2" fontWeight={700} color={brand.navy}>
                  Physical Address
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: alpha(brand.navy, 0.75), lineHeight: 1.7 }}>
                {contactInfo.address}
              </Typography>
              <Typography variant="body2" sx={{ color: alpha(brand.navy, 0.75), mt: 1, lineHeight: 1.7 }}>
                {contactInfo.poBox}
              </Typography>
            </Box>
            <Box sx={{ p: 2.5, borderRadius: 2, bgcolor: alpha(brand.navy, 0.03), border: `1px solid ${alpha(brand.navy, 0.08)}` }}>
              <Stack direction="row" spacing={1.5} mb={1.5}>
                <Email sx={{ color: brand.blue }} />
                <Typography variant="subtitle2" fontWeight={700} color={brand.navy}>
                  Email
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: alpha(brand.navy, 0.75), lineHeight: 1.7 }}>
                {contactInfo.email}
              </Typography>
            </Box>
            <Box sx={{ p: 2.5, borderRadius: 2, bgcolor: alpha(brand.navy, 0.03), border: `1px solid ${alpha(brand.navy, 0.08)}` }}>
              <Stack direction="row" spacing={1.5} mb={1.5}>
                <Phone sx={{ color: brand.green }} />
                <Typography variant="subtitle2" fontWeight={700} color={brand.navy}>
                  Phone
                </Typography>
              </Stack>
              {contactInfo.phones.map((phone) => (
                <Typography key={phone} variant="body2" sx={{ color: alpha(brand.navy, 0.75), lineHeight: 1.7 }}>
                  {phone}
                </Typography>
              ))}
              <Typography variant="caption" sx={{ color: alpha(brand.navy, 0.55), mt: 1, display: "block" }}>
                {contactInfo.liaison}
              </Typography>
            </Box>
            <Box sx={{ p: 2.5, borderRadius: 2, bgcolor: alpha(brand.navy, 0.03), border: `1px solid ${alpha(brand.navy, 0.08)}` }}>
              <Stack direction="row" spacing={1.5} mb={1.5}>
                <Groups sx={{ color: brand.gold }} />
                <Typography variant="subtitle2" fontWeight={700} color={brand.navy}>
                  Leadership
                </Typography>
              </Stack>
              <Stack spacing={0.75}>
                {leadership.map((person) => (
                  <Typography key={person.role} variant="body2" sx={{ color: alpha(brand.navy, 0.75) }}>
                    <Box component="span" fontWeight={700}>
                      {person.role}:
                    </Box>{" "}
                    {person.name}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            ...sectionSx,
            background: `linear-gradient(135deg, ${brand.navy} 0%, ${brand.navyLight} 100%)`,
            borderTop: "none",
            textAlign: "center",
          }}
        >
          <Favorite sx={{ fontSize: 40, color: brand.gold, mb: 1 }} />
          <Typography variant="h5" fontWeight={800} color="#fff" mb={1}>
            Be Part of Our Story
          </Typography>
          <Typography variant="body1" sx={{ color: alpha("#fff", 0.85), mb: 3, maxWidth: 520, mx: "auto" }}>
            Read a personal message from our CEO or reach out to learn how you can support our mission.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" sx={{ px: { xs: 1, sm: 0 } }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleCeoMessage}
              sx={{
                bgcolor: brand.gold,
                color: brand.navy,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 2,
                px: 4,
                maxWidth: { sm: 280 },
                "&:hover": { bgcolor: "#fbc02d" },
              }}
            >
              CEO&apos;s Message
            </Button>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={handleGetInvolved}
              sx={{
                color: "#fff",
                borderColor: alpha("#fff", 0.4),
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                px: 4,
                maxWidth: { sm: 280 },
                "&:hover": { borderColor: "#fff", bgcolor: alpha("#fff", 0.08) },
              }}
            >
              Get Involved
            </Button>
          </Stack>
        </Box>
      </MotionBox>
    </Box>
  );
}
