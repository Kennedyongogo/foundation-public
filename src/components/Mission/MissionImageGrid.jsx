import { useState, useEffect } from "react";
import { Box, Stack, IconButton } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { brand } from "../../constants/missionCategoryConfig";

const carouselArrowSx = (disabled) => ({
  flexShrink: 0,
  width: { xs: 40, sm: 44 },
  height: { xs: 40, sm: 44 },
  alignSelf: "center",
  bgcolor: disabled ? alpha(brand.navy, 0.08) : brand.navy,
  color: disabled ? alpha(brand.navy, 0.35) : "#fff",
  border: `2px solid ${disabled ? alpha(brand.navy, 0.15) : brand.gold}`,
  boxShadow: disabled ? "none" : `0 8px 24px ${alpha(brand.navy, 0.25)}`,
  transition: "all 0.25s ease",
  "&:hover": disabled
    ? {}
    : {
        bgcolor: brand.navyLight,
        transform: "scale(1.06)",
        boxShadow: `0 12px 28px ${alpha(brand.navy, 0.35)}`,
      },
});

const MissionImageGrid = ({ images, renderItem }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setSlideIndex(0);
  }, [images?.length]);

  if (!images?.length) return null;

  const showArrows = images.length > 1;

  const scrollCarousel = (direction) => {
    setSlideIndex((prev) => {
      const next = prev + direction;
      return Math.max(0, Math.min(images.length - 1, next));
    });
  };

  if (isSmallScreen) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          width: "100%",
          gap: { xs: 0.75, sm: 1 },
          mx: { xs: -0.5, sm: 0 },
        }}
      >
        {showArrows && (
          <IconButton
            onClick={() => scrollCarousel(-1)}
            disabled={slideIndex === 0}
            aria-label="Previous photo"
            sx={carouselArrowSx(slideIndex === 0)}
          >
            <ChevronLeft />
          </IconButton>
        )}

        <Box sx={{ flex: 1, minWidth: 0, py: 0.5 }}>
          {renderItem(images[slideIndex], slideIndex)}
        </Box>

        {showArrows && (
          <IconButton
            onClick={() => scrollCarousel(1)}
            disabled={slideIndex >= images.length - 1}
            aria-label="Next photo"
            sx={carouselArrowSx(slideIndex >= images.length - 1)}
          >
            <ChevronRight />
          </IconButton>
        )}
      </Box>
    );
  }

  const maxPerRow = 4;
  const rows = [];
  for (let i = 0; i < images.length; i += maxPerRow) {
    rows.push(images.slice(i, i + maxPerRow));
  }

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {rows.map((row, rowIdx) => (
        <Box
          key={rowIdx}
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(row.length, maxPerRow)}, 1fr)`,
            gap: 2,
            width: "100%",
          }}
        >
          {row.map((item, colIdx) => renderItem(item, rowIdx * maxPerRow + colIdx))}
        </Box>
      ))}
    </Stack>
  );
};

export default MissionImageGrid;
