import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Chip, Stack, IconButton } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  HistoryEdu,
  Visibility,
  CheckCircle,
  Verified,
  ArrowBack,
  ArrowForward,
  FavoriteBorder,
  LocalHospitalOutlined,
  SchoolOutlined,
  GroupsOutlined,
  VolunteerActivism,
} from "@mui/icons-material";
import { HOME } from "../components/Home/homeShared";
import {
  HomeSectionHeader,
  HomeSectionShell,
  HomePrimaryButton,
  HomeGhostButton,
} from "../components/Home/homeUi";
import DicedImageGrid from "../components/About/DicedImageGrid";
import {
  orgTagline,
  whoWeAreParagraphs,
  visionText,
  missionText,
  institutionalProfile,
  achievements,
  focusAreas,
} from "../constants/aboutConfig";

const SLIDE_INTERVAL_MS = 6500;

const ABOUT_PAGE_IMAGES = [
  "mwalimu-about-community.jpg",
  "mwalimu-about-education.jpg",
  "mwalimu-about-healthcare.jpg",
  "mwalimu-about-livelihoods.jpg",
];

const STATS = [
  {
    value: achievements[0]?.value || "100+",
    label: "Beneficiaries",
    icon: <GroupsOutlined />,
  },
  {
    value: achievements[1]?.value || "5",
    label: "Medical camps",
    icon: <LocalHospitalOutlined />,
  },
  {
    value: "4",
    label: "Core pillars",
    icon: <SchoolOutlined />,
  },
];

const sectionPad = { px: { xs: 1.25, sm: 1.5, md: 2 } };

const cardShellSx = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 3,
  overflow: "hidden",
  bgcolor: "#fff",
  border: `1px solid ${HOME.border}`,
  boxShadow: HOME.shadowSm,
  transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    boxShadow: HOME.shadowMd,
    borderColor: HOME.borderBlue,
    transform: "translateY(-4px)",
  },
};

/** Fills remaining viewport under the public header (~80px spacer). */
const HERO_VIEWPORT_H = {
  xs: "calc(100dvh - 80px)",
  sm: "calc(100dvh - 80px)",
  md: "calc(100dvh - 80px)",
};

function AboutHero({ slideIndex, onSelectSlide, imageUrls, onCeo, onContact, onBack }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: HERO_VIEWPORT_H,
        maxHeight: HERO_VIEWPORT_H,
        minHeight: 0,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          flex: { xs: "0 0 38%", md: "1 1 52%" },
          minHeight: 0,
          height: { xs: "38%", md: "100%" },
          overflow: "hidden",
        }}
      >
        {imageUrls.map((src, i) => (
          <Box
            key={src}
            component="img"
            src={src}
            alt={`${HOME.name} community work`}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: i === slideIndex ? 1 : 0,
              transform: i === slideIndex ? "scale(1)" : "scale(1.04)",
              transition: "opacity 1.8s ease-in-out, transform 8s ease-out",
            }}
          />
        ))}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, ${alpha(HOME.deepUmberDark, 0.18)} 0%, ${alpha(
              HOME.deepUmberDark,
              0.05
            )} 40%, ${alpha(HOME.deepUmberDark, 0.5)} 100%)`,
            pointerEvents: "none",
          }}
        />

        <IconButton
          aria-label="Back to home"
          onClick={onBack}
          sx={{
            position: "absolute",
            top: { xs: 10, md: 14 },
            left: { xs: 10, md: 14 },
            zIndex: 3,
            width: { xs: 36, md: 42 },
            height: { xs: 36, md: 42 },
            color: HOME.oldPaperSoft,
            bgcolor: alpha(HOME.deepUmberDark, 0.45),
            border: `1px solid ${alpha(HOME.oldPaperSoft, 0.28)}`,
            backdropFilter: "blur(10px)",
            "&:hover": {
              bgcolor: alpha(HOME.morphoBlue, 0.4),
              borderColor: HOME.morphoBlueMuted,
            },
          }}
        >
          <ArrowBack sx={{ fontSize: { xs: 20, md: 22 } }} />
        </IconButton>

        <Stack
          direction="row"
          spacing={0.75}
          sx={{ position: "absolute", bottom: { xs: 12, md: 18 }, left: { xs: 12, md: 18 }, zIndex: 2 }}
        >
          {imageUrls.map((_, i) => (
            <Box
              key={i}
              component="button"
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => onSelectSlide(i)}
              sx={{
                width: i === slideIndex ? 24 : 7,
                height: 7,
                p: 0,
                border: "none",
                borderRadius: "999px",
                cursor: "pointer",
                bgcolor: i === slideIndex ? HOME.morphoBlue : "rgba(255,255,255,0.45)",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          flex: { xs: "1 1 62%", md: "1 1 48%" },
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          bgcolor: HOME.warmWhite,
          borderLeft: { md: `1px solid ${HOME.border}` },
          borderTop: { xs: `1px solid ${HOME.border}`, md: "none" },
          px: { xs: 2, sm: 2.5, md: 3.5, lg: 4.5 },
          py: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", md: 520 },
            maxHeight: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <Chip
            label="About our foundation"
            sx={{
              mb: { xs: 0.75, md: 1.25 },
              alignSelf: "flex-start",
              fontWeight: 700,
              fontSize: { xs: "0.62rem", md: "0.7rem" },
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              height: { xs: 24, md: 28 },
              bgcolor: alpha(HOME.morphoBlue, 0.1),
              color: HOME.morphoBlueDark,
              border: `1px solid ${HOME.borderBlue}`,
            }}
          />
          <Typography
            component="h1"
            sx={{
              fontFamily: HOME.fontDisplay,
              fontWeight: 700,
              fontSize: {
                xs: "clamp(1.55rem, 5.2vw, 2rem)",
                sm: "clamp(1.85rem, 3.5vw, 2.35rem)",
                md: "clamp(2rem, 2.8vw, 2.75rem)",
                lg: "clamp(2.25rem, 2.6vw, 3rem)",
              },
              lineHeight: 1.08,
              color: HOME.deepUmber,
              mb: { xs: 0.6, md: 1 },
              flexShrink: 0,
            }}
          >
            Who we{" "}
            <Box component="span" sx={{ color: HOME.morphoBlue }}>
              are
            </Box>
          </Typography>

          <Typography
            sx={{
              color: HOME.morphoBlueDark,
              fontWeight: 700,
              fontSize: { xs: "0.82rem", sm: "0.9rem", md: "0.98rem" },
              lineHeight: 1.4,
              mb: { xs: 0.75, md: 1.15 },
              flexShrink: 0,
            }}
          >
            {orgTagline}
          </Typography>

          <Box
            sx={{
              flex: "1 1 auto",
              minHeight: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: { xs: 0.75, md: 1.15 },
              mb: { xs: 1.25, md: 2 },
            }}
          >
            <Typography
              sx={{
                color: HOME.inkMuted,
                fontSize: {
                  xs: "clamp(0.78rem, 2.6vw, 0.9rem)",
                  md: "clamp(0.88rem, 1.15vw, 1.02rem)",
                },
                lineHeight: { xs: 1.5, md: 1.65 },
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: { xs: 4, sm: 5, md: 6 },
                overflow: "hidden",
              }}
            >
              {whoWeAreParagraphs[0]}
            </Typography>
            <Typography
              sx={{
                color: HOME.inkMuted,
                fontSize: {
                  xs: "clamp(0.78rem, 2.6vw, 0.9rem)",
                  md: "clamp(0.88rem, 1.15vw, 1.02rem)",
                },
                lineHeight: { xs: 1.5, md: 1.65 },
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: { xs: 3, sm: 4, md: 5 },
                overflow: "hidden",
              }}
            >
              {whoWeAreParagraphs[1]}
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "row", sm: "row" }}
            spacing={1}
            flexShrink={0}
            sx={{ flexWrap: "wrap" }}
          >
            <HomePrimaryButton
              endIcon={<ArrowForward />}
              onClick={onCeo}
              sx={{
                py: { xs: 0.85, md: 1.15 },
                px: { xs: 2, md: 2.75 },
                fontSize: { xs: "0.82rem", md: "0.95rem" },
              }}
            >
              CEO&apos;s Message
            </HomePrimaryButton>
            <HomeGhostButton
              onClick={onContact}
              sx={{
                py: { xs: 0.85, md: 1.15 },
                px: { xs: 2, md: 2.75 },
                fontSize: { xs: "0.82rem", md: "0.95rem" },
              }}
            >
              Get involved
            </HomeGhostButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

function PillarCard({ eyebrow, headline, subline, icon: Icon, items, checkIcon: CheckIcon }) {
  return (
    <Box sx={cardShellSx}>
      <Box sx={{ height: 4, background: HOME.umberGradient, flexShrink: 0 }} />
      <Box sx={{ p: { xs: 2.5, md: 3.5 }, flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2.5 }}>
          <Typography
            sx={{
              color: HOME.morphoBlue,
              fontSize: "0.75rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
            }}
          >
            {eyebrow}
          </Typography>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: alpha(HOME.morphoBlue, 0.12),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon sx={{ fontSize: 26, color: HOME.morphoBlue }} />
          </Box>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontFamily: HOME.fontDisplay,
              fontSize: { xs: "2rem", md: "2.35rem" },
              fontWeight: 700,
              color: HOME.deepUmber,
              lineHeight: 1.1,
            }}
          >
            {headline}
          </Typography>
          <Typography sx={{ color: HOME.morphoBlue, fontWeight: 700, fontSize: "1rem", mt: 0.5 }}>
            {subline}
          </Typography>
        </Box>
        <Stack spacing={2} sx={{ mt: "auto" }}>
          {items.map((text) => (
            <Stack key={text.slice(0, 48)} direction="row" spacing={1.5} alignItems="flex-start">
              <CheckIcon sx={{ color: HOME.morphoBlue, fontSize: 22, mt: 0.25, flexShrink: 0 }} />
              <Typography sx={{ color: HOME.inkMuted, lineHeight: 1.65, fontSize: "0.98rem" }}>
                {text}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default function AboutUs() {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);

  const imageUrls = ABOUT_PAGE_IMAGES.map((f) => `/images/${f}`);
  const communitySlides = [
    { title: "Community outreach", image: imageUrls[0] },
    { title: "Education support", image: imageUrls[1] },
    { title: "Healthcare access", image: imageUrls[2] },
    { title: "Livelihoods", image: imageUrls[3] },
  ];

  useEffect(() => {
    if (imageUrls.length <= 1) return undefined;
    const id = window.setInterval(
      () => setSlideIndex((i) => (i + 1) % imageUrls.length),
      SLIDE_INTERVAL_MS
    );
    return () => window.clearInterval(id);
  }, [imageUrls.length]);

  const handleBack = () => navigate("/");
  const handleCeo = () => navigate("/ceo-message");
  const handleContact = () =>
    navigate({ pathname: "/", hash: "contact-section" }, { state: { scrollTo: "contact-section" } });

  return (
    <Box
      sx={{
        bgcolor: HOME.cream,
        display: "flex",
        flexDirection: "column",
        fontFamily: HOME.fontBody,
        width: "100%",
      }}
    >
      <HomeSectionShell
        id="about-hero"
        bg={{ bgcolor: HOME.warmWhite, py: 0, pt: 0, pb: 0 }}
        sx={{
          borderBottom: `1px solid ${HOME.border}`,
          overflow: "hidden",
          height: HERO_VIEWPORT_H,
          maxHeight: HERO_VIEWPORT_H,
          py: 0,
          pt: 0,
          pb: 0,
        }}
      >
        <AboutHero
          slideIndex={slideIndex}
          onSelectSlide={setSlideIndex}
          imageUrls={imageUrls}
          onBack={handleBack}
          onCeo={handleCeo}
          onContact={handleContact}
        />
      </HomeSectionShell>

      <HomeSectionShell id="vision-mission" bg={{ py: { xs: 5, md: 7 }, bgcolor: HOME.cream }}>
        <Box sx={{ ...sectionPad, width: "100%" }}>
          <HomeSectionHeader
            eyebrow="Our purpose"
            title="Vision &"
            titleAccent="mission"
            subtitle="Clear direction for sustainable development and social transformation across Bungoma County and East Africa."
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 2, md: 2.5 },
              width: "100%",
            }}
          >
            <PillarCard
              eyebrow="Vision"
              headline="Every life"
              subline="Dignity through access"
              icon={Visibility}
              checkIcon={CheckCircle}
              items={[visionText, whoWeAreParagraphs[2]]}
            />
            <PillarCard
              eyebrow="Mission"
              headline="Empower"
              subline="From grassroots to lasting change"
              icon={HistoryEdu}
              checkIcon={Verified}
              items={[
                missionText,
                `${institutionalProfile.fullName} (${institutionalProfile.acronym}) — ${institutionalProfile.legalStatus}. Registered ${institutionalProfile.registrationDate}, ${institutionalProfile.registrationPlace}.`,
                institutionalProfile.taxStatus,
              ]}
            />
          </Box>
        </Box>
      </HomeSectionShell>

      <HomeSectionShell bg={{ pt: { xs: 1.25, md: 1.75 }, pb: { xs: 5, md: 7 }, bgcolor: "#fff" }}>
        <Box sx={{ ...sectionPad, width: "100%" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: { xs: 4, lg: 5 },
              alignItems: "center",
            }}
          >
            <Box>
              <HomeSectionHeader
                align="left"
                eyebrow="What we do"
                title="Work that"
                titleAccent="restores hope"
                subtitle="Four pillars carry our interventions from community screening and classrooms to livelihoods and specialized care."
                sx={{ mb: { xs: 3, md: 4 }, textAlign: "left", alignItems: "flex-start" }}
              />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(3, 1fr)", sm: "repeat(3, auto)" },
                  gap: { xs: 1.5, sm: 3 },
                  mb: 3,
                }}
              >
                {STATS.map(({ value, label, icon }) => (
                  <Box key={label}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                      <Box sx={{ color: HOME.morphoBlue, lineHeight: 0 }}>{icon}</Box>
                      <Typography
                        sx={{
                          fontFamily: HOME.fontDisplay,
                          fontSize: { xs: "1.5rem", md: "2rem" },
                          fontWeight: 700,
                          color: HOME.morphoBlue,
                          lineHeight: 1,
                        }}
                      >
                        {value}
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: HOME.inkSoft,
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Stack spacing={1.75} sx={{ maxWidth: 480 }}>
                {focusAreas.slice(0, 3).map((area) => (
                  <Typography key={area.title} sx={{ color: HOME.inkMuted, lineHeight: 1.7, fontSize: "0.98rem" }}>
                    <Box component="span" sx={{ fontWeight: 700, color: HOME.deepUmber }}>
                      {area.title}.
                    </Box>{" "}
                    {area.description.length > 140
                      ? `${area.description.slice(0, 140).trim()}…`
                      : area.description}
                  </Typography>
                ))}
              </Stack>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: { xs: "center", lg: "flex-end" },
                alignItems: "center",
              }}
            >
              <DicedImageGrid
                slides={communitySlides}
                sx={{ width: "100%", maxWidth: { xs: 360, sm: 440, lg: 520 } }}
              />
            </Box>
          </Box>
        </Box>
      </HomeSectionShell>

      <HomeSectionShell bg={{ py: { xs: 3, md: 3.5 }, bgcolor: HOME.cream }}>
        <Box sx={{ ...sectionPad, width: "100%" }}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: { xs: 2.5, md: 3 },
              background: HOME.umberGradient,
              border: `1px solid ${alpha(HOME.morphoBlue, 0.35)}`,
              boxShadow: HOME.shadowMd,
              px: { xs: 2.5, sm: 4, md: 5 },
              py: { xs: 3, md: 3.5 },
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -80,
                right: -60,
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${alpha(HOME.morphoBlue, 0.28)} 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1, maxWidth: 640, mx: "auto" }}>
              <Chip
                icon={<VolunteerActivism sx={{ color: `${HOME.morphoBlueMuted} !important` }} />}
                label="Be part of our story"
                size="small"
                sx={{
                  mb: 1.25,
                  fontWeight: 700,
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: HOME.morphoBlueMuted,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
              <Typography
                component="h2"
                sx={{
                  fontFamily: HOME.fontDisplay,
                  fontWeight: 700,
                  fontSize: { xs: "1.55rem", md: "2rem" },
                  color: HOME.oldPaperSoft,
                  lineHeight: 1.2,
                  mb: 1,
                }}
              >
                Ready to walk with {HOME.name}?
              </Typography>
              <Typography
                sx={{
                  color: "rgba(243, 237, 227, 0.82)",
                  fontSize: { xs: "0.92rem", md: "1rem" },
                  lineHeight: 1.6,
                  mb: 2.25,
                  maxWidth: 460,
                  mx: "auto",
                }}
              >
                Read a personal word from our CEO, or reach out to support education, health, and livelihoods.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.25}
                justifyContent="center"
                alignItems="center"
              >
                <HomePrimaryButton endIcon={<FavoriteBorder />} onClick={handleCeo}>
                  CEO&apos;s Message
                </HomePrimaryButton>
                <HomeGhostButton light onClick={handleContact}>
                  Get involved
                </HomeGhostButton>
              </Stack>
            </Box>
          </Box>
        </Box>
      </HomeSectionShell>
    </Box>
  );
}
