import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack, Fade } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ArrowForward, RecordVoiceOver } from "@mui/icons-material";
import {
  brand,
  orgTagline,
  whoWeAreParagraphs,
  focusAreas,
  values,
} from "../../constants/aboutConfig";

export default function AboutUsSection() {
  const navigate = useNavigate();

  return (
    <Box
      id="about-section"
      sx={{
        pt: { xs: 4, md: 6 },
        pb: { xs: 2, md: 3 },
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(180deg, ${alpha(brand.navy, 0.03)} 0%, #fff 45%, ${alpha(brand.green, 0.05)} 100%)`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "45%",
          height: "60%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(brand.green, 0.1)} 0%, transparent 70%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Fade in timeout={900}>
          <Box sx={{ textAlign: "center", mb: { xs: 2, md: 3 }, px: { xs: 2, sm: 4 } }}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.2em", fontWeight: 700, color: brand.green, fontSize: "0.75rem" }}
            >
              Who We Are
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 1,
                mb: 2,
                fontWeight: 900,
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
                color: brand.navy,
                letterSpacing: "-0.02em",
              }}
            >
              About Us
            </Typography>
            <Box
              sx={{
                width: 72,
                height: 4,
                mx: "auto",
                mb: 2.5,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${brand.green}, ${brand.gold})`,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                maxWidth: 720,
                mx: "auto",
                mb: 2,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.75,
                color: alpha(brand.navy, 0.75),
              }}
            >
              {orgTagline}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 820,
                mx: "auto",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.75,
                color: alpha(brand.navy, 0.75),
              }}
            >
              {whoWeAreParagraphs[0]}
            </Typography>
          </Box>
        </Fade>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
            gap: 0,
            width: "100%",
            borderTop: `1px solid ${alpha(brand.navy, 0.08)}`,
            borderBottom: `1px solid ${alpha(brand.navy, 0.08)}`,
          }}
        >
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <Box
                key={area.title}
                sx={{
                  p: { xs: 3, md: 4 },
                  bgcolor: "#fff",
                  borderRight: { lg: `1px solid ${alpha(brand.navy, 0.08)}` },
                  borderBottom: { xs: `1px solid ${alpha(brand.navy, 0.08)}`, lg: "none" },
                  "&:last-child": { borderRight: "none" },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 1.5,
                    mb: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: alpha(area.color, 0.12),
                    color: area.color,
                  }}
                >
                  <Icon />
                </Box>
                <Typography variant="subtitle1" fontWeight={800} color={brand.navy} mb={1}>
                  {area.title}
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(brand.navy, 0.68), lineHeight: 1.7 }}>
                  {area.description}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            width: "100%",
            p: { xs: 3, md: 4 },
            bgcolor: alpha(brand.navy, 0.03),
            borderBottom: `1px solid ${alpha(brand.navy, 0.08)}`,
          }}
        >
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={1.5}
            sx={{ maxWidth: 900, mx: "auto" }}
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Box
                  key={value.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: "#fff",
                    border: `1px solid ${alpha(value.color, 0.2)}`,
                  }}
                >
                  <Icon sx={{ fontSize: 18, color: value.color }} />
                  <Typography variant="caption" fontWeight={700} color={brand.navy}>
                    {value.name}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", py: { xs: 3, md: 4 }, px: 2 }}>
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={() => navigate("/about-us")}
            sx={{
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1.25,
              bgcolor: brand.navy,
              "&:hover": { bgcolor: brand.navyLight },
            }}
          >
            Read Full Story
          </Button>
          <Button
            variant="outlined"
            startIcon={<RecordVoiceOver />}
            onClick={() => navigate("/ceo-message")}
            sx={{
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1.25,
              color: brand.navy,
              borderColor: alpha(brand.navy, 0.25),
              "&:hover": { borderColor: brand.gold, bgcolor: alpha(brand.gold, 0.08) },
            }}
          >
            CEO&apos;s Message
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
