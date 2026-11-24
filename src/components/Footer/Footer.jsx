import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Link,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ArrowForwardRounded,
  PhoneRounded,
  PlaceOutlined,
  EmailOutlined,
  LocalPostOfficeOutlined,
} from "@mui/icons-material";
import { HOME } from "../Home/homeShared";
import { BRAND_LOGO_SRC } from "../../brand";
import { contactInfo, orgTagline } from "../../constants/aboutConfig";

const FOOTER_LINKS = [
  { label: "Home", path: "/", sectionId: "hero-section" },
  { label: "Our Mission", path: "/", sectionId: "mission-section" },
  { label: "Projects", path: "/", sectionId: "projects-section" },
  { label: "Contact", path: "/", sectionId: "contact-section" },
  { label: "About Us", path: "/about-us" },
];

const SOCIAL = [
  { icon: <Facebook fontSize="small" />, color: "#1877f2", label: "Facebook" },
  { icon: <Twitter fontSize="small" />, color: "#1da1f2", label: "Twitter" },
  { icon: <Instagram fontSize="small" />, color: "#e4405f", label: "Instagram" },
  { icon: <LinkedIn fontSize="small" />, color: "#0077b5", label: "LinkedIn" },
];

const sectionLabelSx = {
  fontWeight: 800,
  fontSize: "0.68rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: HOME.morphoBlueMuted,
  mb: 1,
};

const bodySx = {
  color: "rgba(243, 237, 227, 0.88)",
  fontWeight: 500,
  fontSize: "0.85rem",
  lineHeight: 1.55,
};

function goToLink(navigate, location, link) {
  if (link.sectionId) {
    if (location.pathname === "/") {
      const section = document.getElementById(link.sectionId);
      if (section) {
        const header = document.querySelector('header, [role="banner"], .MuiAppBar-root');
        const headerHeight = header ? header.getBoundingClientRect().height : 80;
        const top =
          section.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        return;
      }
    }
    navigate(
      { pathname: "/", hash: link.sectionId },
      { state: { scrollTo: link.sectionId } }
    );
    return;
  }
  navigate(link.path);
}

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const year = new Date().getFullYear();
  const primaryPhone = contactInfo.phones?.[0];

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        background: `linear-gradient(145deg, ${HOME.deepUmberDark} 0%, ${HOME.deepUmber} 48%, ${HOME.deepUmberMid} 100%)`,
        color: "rgba(243, 237, 227, 0.9)",
        fontFamily: HOME.fontBody,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.07,
          background: `
            radial-gradient(circle at 12% 20%, ${HOME.morphoBlue} 0%, transparent 42%),
            radial-gradient(circle at 88% 80%, ${HOME.oldPaper} 0%, transparent 40%)
          `,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          px: { xs: 1.5, sm: 2 },
          py: { xs: 2.75, md: 3.25 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1.3fr 0.7fr 1fr 1.1fr 0.8fr",
            },
            gap: { xs: 2.5, md: 2.25 },
            width: "100%",
            alignItems: "start",
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 0, mb: 1 }}>
              <Box
                component="img"
                src={BRAND_LOGO_SRC}
                alt={`${HOME.name} logo`}
                sx={{
                  height: 44,
                  width: "auto",
                  maxWidth: 56,
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontFamily: HOME.fontDisplay,
                  fontWeight: 700,
                  fontSize: { xs: "0.88rem", sm: "0.95rem", md: "1.02rem" },
                  color: HOME.oldPaperSoft,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                {HOME.name}
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontFamily: HOME.fontBody,
                fontWeight: 600,
                fontSize: "0.78rem",
                color: HOME.morphoBlueMuted,
                lineHeight: 1.4,
              }}
            >
              {orgTagline}
            </Typography>
          </Box>

          <Box>
            <Typography sx={sectionLabelSx}>Quick links</Typography>
            <Stack spacing={0.75}>
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={`${link.label}-${link.sectionId || link.path}`}
                  component="button"
                  onClick={() => goToLink(navigate, location, link)}
                  underline="none"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.35,
                    color: "rgba(243, 237, 227, 0.88)",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    transition: "color 0.2s ease",
                    "&:hover": { color: HOME.morphoBlueMuted },
                  }}
                >
                  {link.label}
                  <ArrowForwardRounded sx={{ fontSize: 14, opacity: 0.6 }} />
                </Link>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography sx={sectionLabelSx}>Got questions? Call us</Typography>
            {contactInfo.phones.map((phone) => (
              <Link
                key={phone}
                href={`tel:+254${phone.replace(/^0/, "")}`}
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  color: HOME.oldPaperSoft,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  mb: 0.5,
                  "&:hover": { color: HOME.morphoBlueMuted },
                }}
              >
                <PhoneRounded sx={{ fontSize: 18, color: HOME.morphoBlueMuted }} />
                {phone}
              </Link>
            ))}
            {!primaryPhone && (
              <Typography sx={bodySx}>Contact us via email</Typography>
            )}
          </Box>

          <Box>
            <Typography sx={sectionLabelSx}>Contact info</Typography>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <PlaceOutlined sx={{ fontSize: 18, color: HOME.morphoBlueMuted, mt: 0.15 }} />
                <Typography sx={bodySx}>{contactInfo.address}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <LocalPostOfficeOutlined sx={{ fontSize: 18, color: HOME.morphoBlueMuted, mt: 0.15 }} />
                <Typography sx={bodySx}>{contactInfo.poBox}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <EmailOutlined sx={{ fontSize: 18, color: HOME.morphoBlueMuted, mt: 0.15 }} />
                <Link
                  href={`mailto:${contactInfo.email}`}
                  underline="hover"
                  sx={{ ...bodySx, color: HOME.oldPaperSoft, fontWeight: 600 }}
                >
                  {contactInfo.email}
                </Link>
              </Stack>
            </Stack>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", md: "flex-end" },
              textAlign: { xs: "left", md: "right" },
              justifySelf: { md: "end" },
            }}
          >
            <Typography sx={{ ...sectionLabelSx, width: { md: "100%" }, textAlign: { md: "right" } }}>
              Follow us
            </Typography>
            <Stack direction="row" spacing={0.75} justifyContent={{ xs: "flex-start", md: "flex-end" }}>
              {SOCIAL.map((social) => (
                <IconButton
                  key={social.label}
                  aria-label={social.label}
                  size="small"
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: "rgba(243, 237, 227, 0.08)",
                    border: "1px solid rgba(243, 237, 227, 0.14)",
                    color: "rgba(243, 237, 227, 0.9)",
                    transition: "all 0.22s ease",
                    "&:hover": {
                      bgcolor: social.color,
                      borderColor: social.color,
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderColor: "rgba(243, 237, 227, 0.14)" }} />

        <Stack
          direction="column"
          spacing={0.35}
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <Typography sx={{ color: "rgba(243, 237, 227, 0.65)", fontSize: "0.8rem", textAlign: "center" }}>
            © {year} {HOME.name}. All rights reserved.
          </Typography>
          <Typography
            sx={{
              color: HOME.morphoBlueMuted,
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.02em",
              textAlign: "center",
            }}
          >
            Developed by Carlvyne Technologies Ltd
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
