import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  ArrowBack,
  Favorite,
  FormatQuote,
  RecordVoiceOver,
} from "@mui/icons-material";
import {
  brand,
  ceoMessageParagraphs,
  impactStats,
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

const CEO_IMAGE = "/FB_IMG_1765129599101.jpg";

export default function CEOMessage() {
  const navigate = useNavigate();

  const handleBack = () => navigate("/");
  const handleAbout = () => navigate("/about-us");
  const handleGetInvolved = () => navigate("/", { state: { scrollTo: "contact-section" } });

  const CeoIcon = sectionIcons.ceo;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#fff",
        mt: { xs: "-80px", sm: "-80px", md: 0 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "auto", md: 480 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: { xs: "relative", md: "absolute" },
            inset: { md: 0 },
            width: { xs: "100%", md: "42%" },
            height: { xs: 300, sm: 340, md: 480 },
            flexShrink: 0,
            overflow: "hidden",
            bgcolor: { xs: brand.navy, md: "transparent" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: 96, sm: 96, md: 24 },
              left: 0,
              zIndex: 20,
              px: { xs: 2, sm: 4, md: 5 },
            }}
          >
            <Button
              startIcon={<ArrowBack />}
              onClick={handleBack}
              sx={{
                color: "#fff",
                bgcolor: alpha("#fff", 0.14),
                border: `1px solid ${alpha("#fff", 0.28)}`,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                backdropFilter: "blur(10px)",
                boxShadow: `0 4px 20px ${alpha("#000", 0.2)}`,
                "&:hover": { bgcolor: alpha(brand.gold, 0.28) },
              }}
            >
              Back to Home
            </Button>
          </Box>

          <Box
            component="img"
            src={CEO_IMAGE}
            alt="Leviticus Simiyu - CEO & Founder"
            sx={{
              position: "absolute",
              left: 0,
              width: "100%",
              top: { xs: 80, sm: 80, md: 0 },
              height: { xs: 300, sm: 340, md: 480 },
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: { xs: 80, md: 0 },
              left: 0,
              right: 0,
              height: 100,
              background: `linear-gradient(180deg, ${alpha(brand.navy, 0.55)} 0%, transparent 100%)`,
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: {
                xs: `linear-gradient(180deg, transparent 35%, ${alpha(brand.navy, 0.88)} 100%)`,
                md: "none",
              },
              pointerEvents: "none",
            }}
          />
        </Box>

        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", md: "auto" },
            flex: { md: 1 },
            background: {
              xs: brand.navy,
              md: `linear-gradient(90deg, ${alpha(brand.navy, 0.92)} 0%, ${alpha(brand.navy, 0.78)} 45%, ${alpha(brand.navy, 0.55)} 100%)`,
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            ml: { md: "38%" },
            minHeight: { md: 480 },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: `linear-gradient(90deg, ${brand.green}, ${brand.gold})`,
              zIndex: 2,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              p: { xs: 3, sm: 4, md: 5 },
              pt: { xs: 2.5, md: 5 },
            }}
          >
            <Chip
              icon={<RecordVoiceOver sx={{ color: `${brand.gold} !important` }} />}
              label="Leadership"
              sx={{
                mb: 2,
                bgcolor: alpha("#fff", 0.12),
                color: "#fff",
                fontWeight: 700,
                border: `1px solid ${alpha(brand.gold, 0.4)}`,
              }}
            />
            <Typography
              variant="overline"
              sx={{ color: brand.gold, fontWeight: 700, letterSpacing: "0.2em", fontSize: "0.75rem", display: "block" }}
            >
              A Word From Our Founder
            </Typography>
            <Typography
              variant="h1"
              sx={{
                color: "#fff",
                fontWeight: 900,
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                mt: 1,
                textShadow: `0 2px 16px ${alpha("#000", 0.35)}`,
              }}
            >
              Message From the CEO
            </Typography>
            <Typography variant="h6" sx={{ color: alpha("#fff", 0.9), fontWeight: 700, mt: 1.5 }}>
              Leviticus Simiyu
            </Typography>
            <Typography variant="body2" sx={{ color: alpha("#fff", 0.7), fontWeight: 500 }}>
              Chief Executive Officer & Founder, Mwalimu Hope Foundation
            </Typography>
          </Box>
        </Box>
      </Box>

      <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={sectionSx}>
          <Stack direction="row" alignItems="center" spacing={1.5} mb={2.5}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(brand.gold, 0.15),
                color: brand.gold,
              }}
            >
              <CeoIcon fontSize="small" />
            </Box>
            <Typography variant="h5" fontWeight={800} color={brand.navy}>
              Our Commitment
            </Typography>
          </Stack>

          <FormatQuote
            sx={{
              fontSize: 48,
              color: alpha(brand.gold, 0.25),
              mb: 1,
              transform: "rotate(180deg)",
            }}
          />

          <Stack spacing={2.5}>
            {ceoMessageParagraphs.map((paragraph, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  color: alpha(brand.navy, 0.82),
                  lineHeight: 1.9,
                  fontSize: { xs: "0.95rem", md: "1.08rem" },
                  pl: { md: 2 },
                  borderLeft: index === 0 ? `3px solid ${brand.gold}` : "none",
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Stack>

          <Typography
            variant="subtitle1"
            sx={{ mt: 3, fontWeight: 700, color: brand.navy, fontStyle: "italic" }}
          >
            — Leviticus Simiyu
          </Typography>
        </Box>

        <Box sx={{ ...sectionSx, bgcolor: alpha(brand.navy, 0.03) }}>
          <Typography variant="h5" fontWeight={800} color={brand.navy} textAlign="center" mb={3}>
            Our Impact So Far
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {impactStats.map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  textAlign: "center",
                  bgcolor: "#fff",
                  border: `1px solid ${alpha(brand.navy, 0.1)}`,
                  boxShadow: `0 4px 20px ${alpha(brand.navy, 0.06)}`,
                }}
              >
                <Typography variant="h3" fontWeight={900} color={brand.green} sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" fontWeight={600} color={alpha(brand.navy, 0.65)} sx={{ mt: 0.5 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
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
            Join Us on This Journey
          </Typography>
          <Typography variant="body1" sx={{ color: alpha("#fff", 0.85), mb: 3, maxWidth: 520, mx: "auto" }}>
            Your partnership, donation, or volunteer time helps us reach more communities across Kenya.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={handleGetInvolved}
              sx={{
                bgcolor: brand.green,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 2,
                px: 4,
                boxShadow: `0 8px 24px ${alpha(brand.green, 0.45)}`,
                "&:hover": { bgcolor: brand.greenLight },
              }}
            >
              Get Involved
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleAbout}
              sx={{
                color: "#fff",
                borderColor: alpha("#fff", 0.4),
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                px: 4,
                "&:hover": { borderColor: "#fff", bgcolor: alpha("#fff", 0.08) },
              }}
            >
              About Us
            </Button>
          </Stack>
        </Box>
      </MotionBox>
    </Box>
  );
}
