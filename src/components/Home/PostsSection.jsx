import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Tabs,
  Tab,
  Fade,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Article as NewsIcon,
  Event as EventIcon,
  ChevronLeft,
  ChevronRight,
  CalendarToday,
  LocationOn,
  ArrowForward,
} from "@mui/icons-material";
import { brand } from "../../constants/missionCategoryConfig";
import {
  getPostImage,
  getPostImages,
  getStatusColor,
  getStatusLabel,
  getPostTheme,
  formatPostDateShort,
} from "../../constants/postConfig";

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

const postCardWrapSx = {
  flexShrink: 0,
  display: "flex",
  scrollSnapAlign: "start",
  minHeight: 460,
  height: 460,
  width: {
    md: `calc((100% - ${CARD_GAP_PX * (VISIBLE_CARDS_MD - 1)}px) / ${VISIBLE_CARDS_MD})`,
    lg: `calc((100% - ${CARD_GAP_PX * (VISIBLE_CARDS_LG - 1)}px) / ${VISIBLE_CARDS_LG})`,
  },
  flex: {
    md: `0 0 calc((100% - ${CARD_GAP_PX * (VISIBLE_CARDS_MD - 1)}px) / ${VISIBLE_CARDS_MD})`,
    lg: `0 0 calc((100% - ${CARD_GAP_PX * (VISIBLE_CARDS_LG - 1)}px) / ${VISIBLE_CARDS_LG})`,
  },
};

const PostCard = ({ post, imageIndex = 0, onView }) => {
  const theme = getPostTheme(post.type);
  const IconComponent = theme.Icon;
  const statusColor = getStatusColor(post.status, post.type);
  const newsImages = getPostImages(post);
  const hasMultipleImages = post.type === "news" && newsImages.length > 1;
  const heroImage = post.type === "news"
    ? newsImages[imageIndex] || getPostImage(post)
    : getPostImage(post);

  return (
    <Card
      data-post-card
      elevation={0}
      onClick={() => onView(post)}
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
        cursor: "pointer",
        scrollSnapAlign: "start",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: `0 20px 48px ${alpha(brand.navy, 0.16)}`,
          borderColor: alpha(theme.color, 0.35),
        },
      }}
    >
      <Box sx={{ position: "relative", height: 220, flexShrink: 0, overflow: "hidden" }}>
        {post.type === "news" && hasMultipleImages ? (
          newsImages.map((url, idx) => (
            <Box
              key={idx}
              component="img"
              src={url}
              alt={post.title}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: idx === imageIndex ? 1 : 0,
                transition: "opacity 0.6s ease",
                ".MuiCard-root:hover &": { transform: idx === imageIndex ? "scale(1.05)" : "none" },
              }}
            />
          ))
        ) : (
          <Box
            component="img"
            src={heroImage}
            alt={post.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              ".MuiCard-root:hover &": { transform: "scale(1.05)" },
            }}
          />
        )}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, transparent 40%, ${alpha(brand.navy, 0.75)} 100%)`,
          }}
        />

        <Chip
          icon={<IconComponent sx={{ fontSize: "16px !important", color: `${theme.color} !important` }} />}
          label={theme.label}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            fontWeight: 700,
            fontSize: "0.7rem",
            bgcolor: alpha("#fff", 0.92),
            color: theme.color,
            border: `1px solid ${alpha(theme.color, 0.25)}`,
            backdropFilter: "blur(8px)",
            "& .MuiChip-icon": { color: theme.color },
          }}
        />

        <Chip
          label={getStatusLabel(post.status, post.type)}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            fontWeight: 700,
            fontSize: "0.7rem",
            bgcolor: alpha("#fff", 0.92),
            color: statusColor,
            border: `1px solid ${alpha(statusColor, 0.25)}`,
            backdropFilter: "blur(8px)",
          }}
        />

        {hasMultipleImages && (
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 0.75,
              zIndex: 2,
            }}
          >
            {newsImages.map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: imageIndex === idx ? 22 : 7,
                  height: 7,
                  borderRadius: 4,
                  bgcolor: imageIndex === idx ? brand.gold : alpha("#fff", 0.55),
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          flex: "1 1 auto",
          minHeight: 0,
          overflow: "hidden",
          width: "100%",
          boxSizing: "border-box",
          p: { xs: 2, sm: 3 },
          "&:last-child": { pb: { xs: 2, sm: 3 } },
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 800,
            color: brand.navy,
            fontSize: { xs: "1.05rem", sm: "1.15rem" },
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: alpha(brand.navy, 0.65),
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.65,
            flex: "1 1 auto",
            minHeight: 0,
            fontSize: { xs: "0.85rem", sm: "0.9rem" },
          }}
        >
          {post.content}
        </Typography>

        {post.type === "event" && (
          <Box sx={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 0.5 }}>
            {post.start_date && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <CalendarToday sx={{ fontSize: 15, color: theme.color }} />
                <Typography variant="caption" noWrap sx={{ color: alpha(brand.navy, 0.6), fontWeight: 500 }}>
                  {formatPostDateShort(post.start_date)}
                  {post.end_date ? ` – ${formatPostDateShort(post.end_date)}` : ""}
                </Typography>
              </Box>
            )}
            {post.location && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <LocationOn sx={{ fontSize: 15, color: brand.green }} />
                <Typography variant="caption" noWrap sx={{ color: alpha(brand.navy, 0.6), fontWeight: 500 }}>
                  {post.location}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        <Button
          variant="contained"
          size="medium"
          endIcon={<ArrowForward />}
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            onView(post);
          }}
          sx={{
            mt: "auto",
            flexShrink: 0,
            py: 1.25,
            fontWeight: 700,
            textTransform: "none",
            borderRadius: 2,
            background: theme.gradient,
            boxShadow: `0 6px 20px ${alpha(theme.color, 0.35)}`,
            "&:hover": {
              background: theme.gradient,
              filter: "brightness(1.08)",
              boxShadow: `0 10px 28px ${alpha(theme.color, 0.45)}`,
            },
          }}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default function PostsSection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [imageIndices, setImageIndices] = useState(new Map());

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const scrollRef = useRef(null);

  const filteredPosts = posts.filter((post) =>
    activeTab === 0 ? post.type === "news" : post.type === "event"
  );

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    fetchPosts();
  }, []);

  useEffect(() => {
    setSlideIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "instant" });
    }
  }, [activeTab, posts.length]);

  useEffect(() => {
    const newsPosts = posts.filter((p) => p.type === "news");
    const withMultiple = newsPosts.filter((p) => getPostImages(p).length > 1);
    if (!withMultiple.length) return undefined;

    const interval = setInterval(() => {
      setImageIndices((prev) => {
        const next = new Map(prev);
        withMultiple.forEach((post) => {
          const images = getPostImages(post);
          const current = next.get(post.id) || 0;
          next.set(post.id, (current + 1) % images.length);
        });
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [posts]);

  useEffect(() => {
    if (isSmallScreen) return undefined;
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return undefined;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [filteredPosts, loading, updateScrollButtons, isSmallScreen]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/posts/public?limit=50");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data.success && data.data ? data.data : []);
    } catch (err) {
      setError(err.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const scrollCarousel = (direction) => {
    if (isSmallScreen) {
      setSlideIndex((prev) =>
        Math.max(0, Math.min(filteredPosts.length - 1, prev + direction))
      );
      return;
    }
    const el = scrollRef.current;
    if (!el) return;
    const firstWrap = el.querySelector("[data-post-card-wrap]");
    const step = firstWrap ? firstWrap.offsetWidth + CARD_GAP_PX : el.clientWidth * 0.85;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const handleViewPost = (post) => {
    navigate(`/post/${post.id}`);
  };

  const showArrows = filteredPosts.length > 0;

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
    if (filteredPosts.length === 0) {
      return (
        <Box textAlign="center" py={4} px={2}>
          <Typography color="text.secondary">
            No {activeTab === 0 ? "news" : "events"} available at the moment.
          </Typography>
        </Box>
      );
    }

    if (isSmallScreen) {
      const post = filteredPosts[slideIndex];
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
            width: "100%",
            gap: { xs: 0.75, sm: 1 },
            px: { xs: 0.5, sm: 1 },
          }}
        >
          {showArrows && (
            <IconButton
              onClick={() => scrollCarousel(-1)}
              disabled={slideIndex === 0}
              aria-label="Previous post"
              sx={edgeArrowSx(slideIndex === 0)}
            >
              <ChevronLeft />
            </IconButton>
          )}
          <Box sx={{ flex: 1, minWidth: 0, py: 1, minHeight: 460 }}>
            {post && (
              <Box sx={{ height: 460, display: "flex" }}>
                <PostCard
                  post={post}
                  imageIndex={imageIndices.get(post.id) || 0}
                  onView={handleViewPost}
                />
              </Box>
            )}
          </Box>
          {showArrows && (
            <IconButton
              onClick={() => scrollCarousel(1)}
              disabled={slideIndex >= filteredPosts.length - 1}
              aria-label="Next post"
              sx={edgeArrowSx(slideIndex >= filteredPosts.length - 1)}
            >
              <ChevronRight />
            </IconButton>
          )}
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: { sm: 2, md: 3 },
          width: "100%",
        }}
      >
        {showArrows && (
          <IconButton
            onClick={() => scrollCarousel(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll posts left"
            sx={carouselArrowSx(!canScrollLeft)}
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
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {filteredPosts.map((post) => (
            <Box key={post.id} data-post-card-wrap sx={postCardWrapSx}>
              <PostCard
                post={post}
                imageIndex={imageIndices.get(post.id) || 0}
                onView={handleViewPost}
              />
            </Box>
          ))}
        </Box>
        {showArrows && (
          <IconButton
            onClick={() => scrollCarousel(1)}
            disabled={!canScrollRight}
            aria-label="Scroll posts right"
            sx={carouselArrowSx(!canScrollRight)}
          >
            <ChevronRight />
          </IconButton>
        )}
      </Box>
    );
  };

  return (
    <Box
      id="posts-section"
      sx={{
        pt: { xs: 4, md: 6 },
        pb: { xs: 2, md: 3 },
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(180deg, ${alpha(brand.navy, 0.03)} 0%, #fff 45%, ${alpha(brand.blue, 0.04)} 100%)`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "45%",
          height: "60%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(brand.blue, 0.1)} 0%, transparent 70%)`,
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
          background: `radial-gradient(circle, ${alpha(brand.gold, 0.1)} 0%, transparent 70%)`,
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
              Stay Informed
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
              News & Events
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
              Stay updated with our latest news and upcoming events from Mwalimu Hope Foundation.
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ px: { xs: 2, sm: 4 }, mb: { xs: 2, md: 3 } }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{
              minHeight: 48,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 700,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                color: alpha(brand.navy, 0.55),
                minHeight: 48,
                gap: 1,
              },
              "& .Mui-selected": {
                color: `${brand.navy} !important`,
              },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${brand.green}, ${brand.gold})`,
              },
            }}
          >
            <Tab icon={<NewsIcon />} iconPosition="start" label="News" />
            <Tab icon={<EventIcon />} iconPosition="start" label="Events" />
          </Tabs>
        </Box>

        {renderCarousel()}
      </Box>
    </Box>
  );
}
