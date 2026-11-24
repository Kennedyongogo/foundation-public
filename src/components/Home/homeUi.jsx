import React from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  HOME,
  homeGhostButtonSx,
  homePrimaryButtonSx,
  homeBodyFontSize,
} from "./homeShared";

export function HomeSectionHeader({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  align = "center",
  light = false,
  sx,
}) {
  const textColor = light ? HOME.oldPaperSoft : HOME.deepUmber;
  const subColor = light ? "rgba(243, 237, 227, 0.82)" : HOME.inkMuted;

  return (
    <Stack
      spacing={1.5}
      alignItems={align === "center" ? "center" : "flex-start"}
      textAlign={align}
      sx={{ mb: { xs: 3, md: 4 }, ...sx }}
    >
      {eyebrow ? (
        <Chip
          label={eyebrow}
          sx={{
            fontWeight: 700,
            fontSize: "0.7rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            height: 28,
            bgcolor: light ? "rgba(255,255,255,0.12)" : alpha(HOME.morphoBlue, 0.1),
            color: light ? HOME.morphoBlueMuted : HOME.deepUmber,
            border: `1px solid ${light ? "rgba(255,255,255,0.2)" : HOME.borderBlue}`,
          }}
        />
      ) : null}
      <Typography
        component="h2"
        sx={{
          fontFamily: HOME.fontDisplay,
          fontWeight: 700,
          fontSize: { xs: "2rem", sm: "2.5rem", md: "2.85rem" },
          lineHeight: 1.1,
          color: textColor,
          maxWidth: 720,
        }}
      >
        {title}
        {titleAccent ? (
          <>
            {" "}
            <Box component="span" sx={{ color: HOME.morphoBlue }}>
              {titleAccent}
            </Box>
          </>
        ) : null}
      </Typography>
      {subtitle ? (
        <Typography
          sx={{
            fontFamily: HOME.fontBody,
            fontSize: homeBodyFontSize,
            lineHeight: 1.7,
            color: subColor,
            maxWidth: 620,
          }}
        >
          {subtitle}
        </Typography>
      ) : null}
    </Stack>
  );
}

export function HomePrimaryButton({ children, sx, ...props }) {
  return (
    <Button variant="contained" disableElevation sx={{ ...homePrimaryButtonSx(), ...sx }} {...props}>
      {children}
    </Button>
  );
}

export function HomeGhostButton({ children, light, sx, ...props }) {
  return (
    <Button variant="outlined" sx={{ ...homeGhostButtonSx({ light }), ...sx }} {...props}>
      {children}
    </Button>
  );
}

export function HomeSectionShell({ id, children, sx, bg }) {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        fontFamily: HOME.fontBody,
        ...bg,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
