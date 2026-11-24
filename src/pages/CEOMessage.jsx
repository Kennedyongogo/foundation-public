import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack, IconButton } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  ArrowBack,
  Favorite,
  FormatQuote,
  VolunteerActivism,
} from "@mui/icons-material";
import { ceoMessageParagraphs, impactStats } from "../constants/aboutConfig";
import { HOME } from "../components/Home/homeShared";

const MotionBox = motion(Box);

const CEO_IMAGE = "/ceo-leviticus-simiyu.jpg";
const CEO_NAME = "Leviticus Simiyu";
const CEO_TITLE = "Chief Executive Officer & Founder";

const sidePad = { px: { xs: 1, sm: 1.25, md: 1.5 } };

/** Fills remaining viewport under the public header (~80px spacer). */
const LETTER_VIEWPORT_H = {
  xs: "calc(100dvh - 80px)",
  sm: "calc(100dvh - 80px)",
  md: "calc(100dvh - 80px)",
};

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
};

export default function CEOMessage() {
  const navigate = useNavigate();

  const handleBack = () => navigate("/");
  const handleAbout = () => navigate("/about-us");
  const handleGetInvolved = () =>
    navigate({ pathname: "/", hash: "contact-section" }, { state: { scrollTo: "contact-section" } });

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: HOME.oldPaperSoft,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Letter: portrait + message — one viewport, no scroll */}
      <Box
        sx={{
          width: "100%",
          ...sidePad,
          height: LETTER_VIEWPORT_H,
          maxHeight: LETTER_VIEWPORT_H,
          py: { xs: 1, sm: 1.25, md: 1.5 },
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <MotionBox
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.08 }}
          sx={{
            width: "100%",
            height: "100%",
            mx: 0,
            bgcolor: "#fff",
            borderRadius: { xs: "14px", md: "18px" },
            border: `1px solid ${HOME.border}`,
            boxShadow: HOME.shadowMd,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              height: 4,
              flexShrink: 0,
              background: `linear-gradient(90deg, ${HOME.morphoBlue}, ${HOME.deepUmber}, ${HOME.oldPaper})`,
            }}
          />

          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              overflow: "hidden",
            }}
          >
            {/* Left — CEO image */}
            <Box
              sx={{
                position: "relative",
                flex: { xs: "0 0 36%", md: "0 0 42%" },
                minHeight: 0,
                height: { xs: "36%", md: "100%" },
                bgcolor: HOME.deepUmberDark,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={CEO_IMAGE}
                alt={`${CEO_NAME} — ${CEO_TITLE}`}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: `
                    linear-gradient(180deg, transparent 45%, ${alpha(HOME.deepUmberDark, 0.88)} 100%),
                    linear-gradient(90deg, ${alpha(HOME.morphoBlueDark, 0.12)} 0%, transparent 55%)
                  `,
                }}
              />

              <IconButton
                aria-label="Back to home"
                onClick={handleBack}
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

              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  p: { xs: 1.5, md: 2.5 },
                  zIndex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: HOME.fontDisplay,
                    fontWeight: 700,
                    fontSize: { xs: "1.05rem", md: "1.3rem" },
                    color: HOME.oldPaperSoft,
                    lineHeight: 1.15,
                  }}
                >
                  {CEO_NAME}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: HOME.fontBody,
                    fontSize: { xs: "0.72rem", md: "0.8rem" },
                    fontWeight: 600,
                    color: alpha(HOME.oldPaperSoft, 0.78),
                    mt: 0.25,
                  }}
                >
                  {CEO_TITLE}
                </Typography>
              </Box>
            </Box>

            {/* Right — message */}
            <Box
              sx={{
                flex: { xs: "1 1 64%", md: "1 1 58%" },
                minHeight: 0,
                p: { xs: 1.5, sm: 2, md: 2.75, lg: 3.25 },
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Stack
                direction="row"
                spacing={1.25}
                alignItems="center"
                sx={{ mb: { xs: 1, md: 1.5 }, flexShrink: 0 }}
              >
                <Box
                  sx={{
                    width: { xs: 36, md: 42 },
                    height: { xs: 36, md: 42 },
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    bgcolor: alpha(HOME.morphoBlue, 0.12),
                    color: HOME.morphoBlue,
                    border: `1px solid ${alpha(HOME.morphoBlue, 0.22)}`,
                    flexShrink: 0,
                  }}
                >
                  <VolunteerActivism sx={{ fontSize: { xs: 18, md: 20 } }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontFamily: HOME.fontBody,
                      fontSize: { xs: "0.62rem", md: "0.68rem" },
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      fontWeight: 800,
                      color: HOME.morphoBlue,
                    }}
                  >
                    Open Letter
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: HOME.fontDisplay,
                      fontWeight: 800,
                      fontSize: { xs: "1.15rem", md: "1.4rem" },
                      color: HOME.deepUmber,
                      lineHeight: 1.12,
                    }}
                  >
                    Our Commitment
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ position: "relative", mb: { xs: 1, md: 1.5 }, flexShrink: 0 }}>
                <FormatQuote
                  sx={{
                    position: "absolute",
                    top: -10,
                    left: -4,
                    fontSize: { xs: 40, md: 56 },
                    color: alpha(HOME.morphoBlue, 0.14),
                    transform: "rotate(180deg)",
                    pointerEvents: "none",
                  }}
                />
                <Typography
                  sx={{
                    position: "relative",
                    fontFamily: HOME.fontDisplay,
                    fontWeight: 600,
                    fontSize: {
                      xs: "clamp(0.92rem, 2.8vw, 1.05rem)",
                      md: "clamp(1.05rem, 1.3vw, 1.2rem)",
                    },
                    lineHeight: 1.35,
                    color: HOME.deepUmber,
                    pl: { xs: 0.75, md: 1.25 },
                    borderLeft: `3px solid ${HOME.morphoBlue}`,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: { xs: 3, md: 3 },
                    overflow: "hidden",
                  }}
                >
                  We restore hope and transform lives — through education, care, and opportunity for every community we serve.
                </Typography>
              </Box>

              <Stack
                spacing={{ xs: 0.85, md: 1.15 }}
                sx={{
                  flex: "1 1 auto",
                  minHeight: 0,
                  overflow: "hidden",
                  mb: { xs: 1, md: 1.5 },
                }}
              >
                {ceoMessageParagraphs.map((paragraph, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontFamily: HOME.fontBody,
                      color: alpha(HOME.deepUmber, 0.84),
                      lineHeight: { xs: 1.5, md: 1.65 },
                      fontSize: {
                        xs: "clamp(0.76rem, 2.5vw, 0.88rem)",
                        md: "clamp(0.86rem, 1.1vw, 0.98rem)",
                      },
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: {
                        xs: index === 0 ? 3 : 2,
                        sm: index === 0 ? 4 : 3,
                        md: index === 0 ? 5 : 4,
                      },
                      overflow: "hidden",
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </Stack>

              <Box
                sx={{
                  pt: { xs: 1, md: 1.5 },
                  borderTop: `1px solid ${HOME.border}`,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                  gap: 1,
                  flexShrink: 0,
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontFamily: HOME.fontDisplay,
                      fontWeight: 700,
                      fontSize: { xs: "1.05rem", md: "1.2rem" },
                      color: HOME.deepUmber,
                      fontStyle: "italic",
                      lineHeight: 1.15,
                    }}
                  >
                    {CEO_NAME}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: HOME.fontBody,
                      fontSize: { xs: "0.72rem", md: "0.8rem" },
                      fontWeight: 600,
                      color: alpha(HOME.deepUmber, 0.6),
                      mt: 0.2,
                    }}
                  >
                    {CEO_TITLE}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    px: 1.5,
                    py: 0.65,
                    borderRadius: "999px",
                    bgcolor: alpha(HOME.morphoBlue, 0.08),
                    border: `1px solid ${alpha(HOME.morphoBlue, 0.2)}`,
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: HOME.fontBody,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: HOME.morphoBlueDark,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Est. August 2025 · Bungoma
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </MotionBox>
      </Box>

      {/* Impact */}
      <Box sx={{ width: "100%", ...sidePad, pb: { xs: 3, md: 4 } }}>
        <MotionBox
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.12 }}
          sx={{
            width: "100%",
            mx: 0,
            borderRadius: { xs: "14px", md: "18px" },
            background: `linear-gradient(145deg, ${HOME.deepUmberDark} 0%, ${HOME.deepUmber} 52%, ${HOME.deepUmberMid} 100%)`,
            boxShadow: HOME.shadowMd,
            p: { xs: 2.5, md: 3.5 },
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -60,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: alpha(HOME.morphoBlue, 0.16),
              pointerEvents: "none",
            },
          }}
        >
          <Typography
            sx={{
              position: "relative",
              zIndex: 1,
              fontFamily: HOME.fontBody,
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: HOME.morphoBlueMuted,
              textAlign: "center",
              mb: 2.5,
            }}
          >
            Our Impact So Far
          </Typography>

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: { xs: 2, sm: 0 },
            }}
          >
            {impactStats.map((stat, index) => (
              <Box
                key={stat.label}
                sx={{
                  textAlign: "center",
                  px: 2,
                  py: { xs: 1.5, sm: 0 },
                  borderLeft: {
                    xs: "none",
                    sm: index > 0 ? `1px solid ${alpha(HOME.oldPaperSoft, 0.14)}` : "none",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: HOME.fontDisplay,
                    fontWeight: 800,
                    fontSize: { xs: "2.2rem", md: "2.6rem" },
                    color: HOME.morphoBlueMuted,
                    lineHeight: 1,
                    mb: 0.75,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: HOME.fontBody,
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: alpha(HOME.oldPaperSoft, 0.88),
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </MotionBox>
      </Box>

      {/* CTA */}
      <Box sx={{ width: "100%", ...sidePad, pb: { xs: 4, md: 6 } }}>
        <MotionBox
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.16 }}
          sx={{
            width: "100%",
            mx: 0,
            borderRadius: { xs: "14px", md: "18px" },
            bgcolor: "#fff",
            border: `1px solid ${HOME.border}`,
            boxShadow: HOME.shadowSm,
            p: { xs: 3, md: 4.5 },
            textAlign: "center",
          }}
        >
          <Favorite sx={{ fontSize: 36, color: HOME.morphoBlue, mb: 1.25 }} />
          <Typography
            sx={{
              fontFamily: HOME.fontDisplay,
              fontWeight: 800,
              fontSize: { xs: "1.45rem", md: "1.75rem" },
              color: HOME.deepUmber,
              mb: 1,
            }}
          >
            Join Us on This Journey
          </Typography>
          <Typography
            sx={{
              fontFamily: HOME.fontBody,
              color: alpha(HOME.deepUmber, 0.7),
              mb: 3,
              maxWidth: 520,
              mx: "auto",
              fontSize: "0.98rem",
              lineHeight: 1.65,
            }}
          >
            Your partnership, donation, or volunteer time helps us reach more communities across Kenya.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={handleGetInvolved}
              sx={{
                bgcolor: HOME.morphoBlue,
                fontWeight: 700,
                textTransform: "none",
                fontFamily: HOME.fontBody,
                borderRadius: "12px",
                px: 4,
                py: 1.25,
                boxShadow: `0 8px 24px ${alpha(HOME.morphoBlue, 0.35)}`,
                "&:hover": { bgcolor: HOME.morphoBlueDark },
              }}
            >
              Get Involved
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleAbout}
              sx={{
                color: HOME.deepUmber,
                borderColor: alpha(HOME.deepUmber, 0.28),
                fontWeight: 700,
                textTransform: "none",
                fontFamily: HOME.fontBody,
                borderRadius: "12px",
                px: 4,
                py: 1.25,
                "&:hover": {
                  borderColor: HOME.morphoBlue,
                  bgcolor: alpha(HOME.morphoBlue, 0.06),
                  color: HOME.morphoBlueDark,
                },
              }}
            >
              About Us
            </Button>
          </Stack>
        </MotionBox>
      </Box>
    </Box>
  );
}
