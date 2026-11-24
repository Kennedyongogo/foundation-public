import React from "react";
import { Box, Typography } from "@mui/material";
import { homeSectionHeaderSx } from "./homeShared";

export default function SectionHeader({
  overline,
  title,
  description,
  dark = false,
  sx = {},
}) {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 }, px: { xs: 2, sm: 4 }, ...sx }}>
      {overline && (
        <Typography component="p" sx={homeSectionHeaderSx.overline}>
          {overline}
        </Typography>
      )}
      <Typography component="h2" sx={dark ? homeSectionHeaderSx.titleOnDark : homeSectionHeaderSx.title}>
        {title}
      </Typography>
      <Box sx={homeSectionHeaderSx.rule} />
      {description && (
        <Typography sx={dark ? homeSectionHeaderSx.bodyOnDark : homeSectionHeaderSx.body}>
          {description}
        </Typography>
      )}
    </Box>
  );
}
