import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Rating,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  Fade,
  Chip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  Star as StarIcon,
  Add as AddIcon,
  FormatQuote,
  RecordVoiceOver,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { brand } from "../../constants/missionCategoryConfig";

const testimonyTheme = {
  color: brand.gold,
  gradient: `linear-gradient(135deg, ${brand.gold}, #fbc02d)`,
  heroGradient: `linear-gradient(145deg, ${brand.navy} 0%, ${brand.navyLight} 55%, ${alpha(brand.gold, 0.35)} 100%)`,
};

const carouselArrowSx = (disabled) => ({
  flexShrink: 0,
  width: { xs: 44, sm: 52 },
  height: { xs: 44, sm: 52 },
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

const edgeArrowSx = (disabled) => ({
  ...carouselArrowSx(disabled),
  width: { xs: 40, sm: 44 },
  height: { xs: 40, sm: 44 },
  alignSelf: "center",
});

const CARD_GAP_PX = 24;
const VISIBLE_CARDS_LG = 4;
const VISIBLE_CARDS_MD = 3;

const testimonyCardWrapSx = {
  flexShrink: 0,
  display: "flex",
  scrollSnapAlign: "start",
  minHeight: 460,
  height: 460,
  width: {
    xs: "min(340px, calc(100vw - 96px))",
    sm: "min(380px, calc(100vw - 112px))",
    md: `calc((100% - ${CARD_GAP_PX * (VISIBLE_CARDS_MD - 1)}px) / ${VISIBLE_CARDS_MD})`,
    lg: `calc((100% - ${CARD_GAP_PX * (VISIBLE_CARDS_LG - 1)}px) / ${VISIBLE_CARDS_LG})`,
  },
  flex: {
    xs: "0 0 min(340px, calc(100vw - 96px))",
    sm: "0 0 min(380px, calc(100vw - 112px))",
    md: `0 0 calc((100% - ${CARD_GAP_PX * (VISIBLE_CARDS_MD - 1)}px) / ${VISIBLE_CARDS_MD})`,
    lg: `0 0 calc((100% - ${CARD_GAP_PX * (VISIBLE_CARDS_LG - 1)}px) / ${VISIBLE_CARDS_LG})`,
  },
};

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
};

const swalZIndexFix = {
  customClass: { container: "swal-z-index-fix" },
  didOpen: () => {
    const el = document.querySelector(".swal-z-index-fix");
    if (el) el.style.zIndex = "9999";
  },
};

const TestimonyCard = ({ testimony }) => (
  <Card
    data-testimony-card
    elevation={0}
    sx={{
      width: "100%",
      height: "100%",
      minHeight: 460,
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      overflow: "hidden",
      border: `1px solid ${alpha(brand.navy, 0.1)}`,
      bgcolor: "#fff",
      boxShadow: `0 4px 24px ${alpha(brand.navy, 0.08)}`,
      transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease",
      scrollSnapAlign: "start",
      "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: `0 20px 48px ${alpha(brand.navy, 0.16)}`,
        borderColor: alpha(testimonyTheme.color, 0.35),
      },
    }}
  >
    <Box
      sx={{
        position: "relative",
        height: 148,
        flexShrink: 0,
        overflow: "hidden",
        background: testimonyTheme.heroGradient,
      }}
    >
      <FormatQuote
        sx={{
          position: "absolute",
          top: 12,
          right: 16,
          fontSize: 56,
          color: alpha("#fff", 0.12),
          transform: "rotate(180deg)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${brand.green}, ${brand.gold})`,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha("#fff", 0.18),
            border: `2px solid ${alpha(brand.gold, 0.55)}`,
            color: "#fff",
            fontWeight: 800,
            fontSize: "1.1rem",
            letterSpacing: "0.02em",
          }}
        >
          {getInitials(testimony.name)}
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#fff",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.3,
            fontSize: { xs: "0.95rem", sm: "1.05rem" },
          }}
        >
          {testimony.name}
        </Typography>
        <Rating
          value={testimony.rating}
          readOnly
          size="small"
          icon={<StarIcon fontSize="inherit" sx={{ color: brand.gold }} />}
          emptyIcon={<StarIcon fontSize="inherit" sx={{ color: alpha("#fff", 0.35) }} />}
        />
      </Box>
    </Box>

    <CardContent
      sx={{
        flex: "1 1 auto",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        p: { xs: 2, sm: 2.5 },
        "&:last-child": { pb: { xs: 2, sm: 2.5 } },
      }}
    >
      <Chip
        icon={<RecordVoiceOver sx={{ fontSize: "14px !important" }} />}
        label="Community Voice"
        size="small"
        sx={{
          alignSelf: "flex-start",
          mb: 1.5,
          fontWeight: 700,
          fontSize: "0.68rem",
          bgcolor: alpha(testimonyTheme.color, 0.12),
          color: testimonyTheme.color,
          border: `1px solid ${alpha(testimonyTheme.color, 0.25)}`,
          "& .MuiChip-icon": { color: testimonyTheme.color },
        }}
      />
      <Box
        sx={{
          flex: "1 1 auto",
          minHeight: 0,
          overflowY: "auto",
          touchAction: "pan-y",
          pr: 0.5,
          scrollbarWidth: "thin",
          scrollbarColor: `${alpha(brand.navy, 0.25)} transparent`,
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: alpha(brand.navy, 0.22),
            borderRadius: 4,
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: alpha(brand.navy, 0.78),
            lineHeight: 1.75,
            fontSize: { xs: "0.88rem", sm: "0.92rem" },
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {testimony.description}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default function TestimonySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [formData, setFormData] = useState({ name: "", rating: 5, description: "" });

  const scrollRef = useRef(null);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    fetchTestimonies();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "instant" });
    }
    updateScrollButtons();
  }, [testimonies.length, updateScrollButtons]);

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return undefined;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [testimonies, loading, updateScrollButtons]);

  const fetchTestimonies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/testimonies/approved");
      if (!response.ok) throw new Error("Failed to fetch testimonies");
      const data = await response.json();
      setTestimonies(data.data || []);
    } catch (err) {
      setError(err.message);
      setTestimonies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    setFormData({ name: "", rating: 5, description: "" });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData({ name: "", rating: 5, description: "" });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error!",
        text: "Please fill in all required fields",
        ...swalZIndexFix,
      });
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("/api/testimonies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          rating: formData.rating,
          description: formData.description.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit testimony");
      }

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Testimony submitted successfully! It will be reviewed before being published.",
        timer: 3000,
        showConfirmButton: false,
        ...swalZIndexFix,
      });

      handleDialogClose();
      await fetchTestimonies();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message || "Failed to submit testimony. Please try again.",
        ...swalZIndexFix,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollCarousel = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstWrap = el.querySelector("[data-testimony-card-wrap]");
    const step = firstWrap ? firstWrap.offsetWidth + CARD_GAP_PX : el.clientWidth * 0.85;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const showArrows = testimonies.length > 0;

  const renderCarousel = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress sx={{ color: brand.green }} />
        </Box>
      );
    }
    if (error) {
      return (
        <Box textAlign="center" py={4} px={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      );
    }
    if (testimonies.length === 0) {
      return (
        <Box textAlign="center" py={4} px={2}>
          <Typography color="text.secondary">
            No testimonials yet. Be the first to share your experience!
          </Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 0.75, sm: 1, md: 2 },
          px: { xs: 0.5, sm: 1, md: 3 },
          width: "100%",
        }}
      >
        {showArrows && (
          <IconButton
            onClick={() => scrollCarousel(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll testimonials left"
            sx={edgeArrowSx(!canScrollLeft)}
          >
            <ChevronLeft />
          </IconButton>
        )}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            overflowY: "hidden",
            flex: 1,
            minWidth: 0,
            width: "100%",
            py: 1,
            pb: 0,
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {testimonies.map((testimony) => (
            <Box key={testimony.id} data-testimony-card-wrap sx={testimonyCardWrapSx}>
              <TestimonyCard testimony={testimony} />
            </Box>
          ))}
        </Box>
        {showArrows && (
          <IconButton
            onClick={() => scrollCarousel(1)}
            disabled={!canScrollRight}
            aria-label="Scroll testimonials right"
            sx={edgeArrowSx(!canScrollRight)}
          >
            <ChevronRight />
          </IconButton>
        )}
      </Box>
    );
  };

  return (
    <Box
      id="testimonials-section"
      sx={{
        pt: { xs: 4, md: 6 },
        pb: { xs: 2, md: 3 },
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(180deg, ${alpha(brand.navy, 0.03)} 0%, #fff 45%, ${alpha(brand.gold, 0.05)} 100%)`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "45%",
          height: "60%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(brand.gold, 0.1)} 0%, transparent 70%)`,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-15%",
          left: "-8%",
          width: "40%",
          height: "50%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(brand.green, 0.1)} 0%, transparent 70%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Fade in={isVisible} timeout={900}>
          <Box sx={{ textAlign: "center", mb: { xs: 2, md: 2.5 }, px: { xs: 2, sm: 4 } }}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.2em", fontWeight: 700, color: brand.green, fontSize: "0.75rem" }}
            >
              Voices of Impact
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
              Testimonials
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
                maxWidth: 820,
                mx: "auto",
                px: { xs: 2, sm: 0 },
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.75,
                color: alpha(brand.navy, 0.75),
              }}
            >
              Hear from the people whose lives we&apos;ve touched through our community programs.
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 2, md: 3 }, px: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleDialogOpen}
            sx={{
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1.25,
              background: testimonyTheme.gradient,
              boxShadow: `0 8px 24px ${alpha(brand.gold, 0.4)}`,
              "&:hover": {
                background: testimonyTheme.gradient,
                filter: "brightness(1.06)",
                boxShadow: `0 12px 28px ${alpha(brand.gold, 0.5)}`,
              },
            }}
          >
            Share Your Experience
          </Button>
        </Box>

        {renderCarousel()}
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, overflow: "hidden" },
        }}
      >
        <DialogTitle
          sx={{
            background: `linear-gradient(135deg, ${brand.navy} 0%, ${brand.navyLight} 100%)`,
            color: "#fff",
            textAlign: "center",
            py: 2.5,
          }}
        >
          <RecordVoiceOver sx={{ fontSize: 36, color: brand.gold, mb: 0.5 }} />
          <Typography variant="h6" fontWeight={800}>
            Share Your Experience
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="Your Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              fullWidth
              required
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
            <Box>
              <Typography variant="body2" fontWeight={600} color={brand.navy} mb={1}>
                Rating *
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={formData.rating}
                  onChange={(_, newValue) => handleInputChange("rating", newValue)}
                  size="large"
                  icon={<StarIcon sx={{ color: brand.gold }} />}
                  emptyIcon={<StarIcon sx={{ color: alpha(brand.navy, 0.2) }} />}
                />
                <Typography variant="body2" color="text.secondary">
                  ({formData.rating} star{formData.rating !== 1 ? "s" : ""})
                </Typography>
              </Box>
            </Box>
            <TextField
              label="Your Experience"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              fullWidth
              required
              multiline
              rows={4}
              placeholder="Tell us about your experience with Mwalimu Hope Foundation..."
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={handleDialogClose}
            sx={{ textTransform: "none", fontWeight: 600, color: alpha(brand.navy, 0.65) }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting || !formData.name.trim() || !formData.description.trim()}
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              px: 3,
              bgcolor: brand.green,
              "&:hover": { bgcolor: brand.greenLight },
            }}
          >
            {submitting ? "Submitting..." : "Submit Testimony"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
