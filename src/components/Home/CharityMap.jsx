import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  IconButton,
  Typography,
  Drawer,
  Tabs,
  Tab,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CircularProgress,
  Backdrop,
  Tooltip,
  Checkbox,
  Fade,
  Collapse,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls, ScaleLine, ZoomSlider } from "ol/control";
import XYZ from "ol/source/XYZ";
import MapIcon from "@mui/icons-material/Map";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import TerrainIcon from "@mui/icons-material/Terrain";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

// Project categories matching the API
const PROJECT_CATEGORIES = {
  volunteer: { label: "Volunteer Opportunities", color: "#4caf50" },
  education: { label: "Educational Support", color: "#2196f3" },
  mental_health: { label: "Mental Health Services", color: "#e91e63" },
  community: { label: "Community Programs", color: "#ff9800" },
  donation: { label: "Donations & Support", color: "#9c27b0" },
  partnership: { label: "Partnership Opportunities", color: "#00bcd4" },
};

// Project status colors
const STATUS_COLORS = {
  pending: "#ff9800", // Orange
  in_progress: "#4caf50", // Green
  completed: "#2196f3", // Blue
  on_hold: "#ff5722", // Deep Orange
  cancelled: "#f44336", // Red
};

const CharityMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [baseLayer, setBaseLayer] = useState("osm");
  const [showMarker, setShowMarker] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const vectorLayerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tileLoadError, setTileLoadError] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });
  const [visibleCategories, setVisibleCategories] = useState({
    volunteer: true,
    education: true,
    mental_health: true,
    community: true,
    donation: true,
    partnership: true,
  });

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Geolocation states
  const [userLocation, setUserLocation] = useState(null);
  const [nearMeMode, setNearMeMode] = useState(false);
  const [nearMeRadius, setNearMeRadius] = useState(10); // km
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [nearMeResults, setNearMeResults] = useState([]);

  // Use proxy path instead of direct API URL
  const API_BASE_URL = "/api";

  // Distance calculation utility (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setIsGettingLocation(false);
        setLocationError(null);
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  // Find projects near user location
  const findNearMeProjects = () => {
    if (!userLocation) {
      getUserLocation();
      return;
    }

    const dataToSearch = searchResults.length > 0 ? searchResults : projects;
    const nearbyProjects = dataToSearch
      .filter(
        (project) =>
          project.longitude !== null && project.latitude !== null
      )
      .map((project) => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          parseFloat(project.latitude),
          parseFloat(project.longitude)
        );
        return { ...project, distance };
      })
      .filter((project) => project.distance <= nearMeRadius)
      .sort((a, b) => a.distance - b.distance);

    setNearMeResults(nearbyProjects);
    setNearMeMode(true);
  };

  // Center map on user location
  const centerOnUserLocation = () => {
    if (userLocation && mapInstance.current) {
      const map = mapInstance.current;
      const view = map.getView();
      view.setCenter(
        fromLonLat([userLocation.longitude, userLocation.latitude])
      );
      view.setZoom(12);
    }
  };

  // Create map instance only once
  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      const osmLayer = new TileLayer({
        source: new OSM({
          preload: 4,
          crossOrigin: "anonymous",
        }),
        visible: true,
        title: "osm",
        opacity: 1,
        zIndex: 0,
      });

      const satelliteLayer = new TileLayer({
        source: new XYZ({
          url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
          maxZoom: 20,
          attributions: "© Google Maps",
          preload: 4,
          crossOrigin: "anonymous",
        }),
        visible: false,
        title: "satellite",
        opacity: 1,
        zIndex: 0,
      });

      const terrainLayer = new TileLayer({
        source: new XYZ({
          url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
          maxZoom: 24,
          preload: 4,
          crossOrigin: "anonymous",
        }),
        visible: false,
        title: "terrain",
        opacity: 1,
        zIndex: 0,
      });

      // Create vector source and layer for projects
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        visible: showMarker,
      });
      vectorLayerRef.current = vectorLayer;

      const map = new Map({
        target: mapRef.current,
        layers: [osmLayer, satelliteLayer, terrainLayer, vectorLayer],
        view: new View({
          center: fromLonLat([36.8219, -1.2921]), // Center on Nairobi, Kenya
          zoom: 7, // View to see projects across Kenya
        }),
        controls: defaultControls().extend([new ScaleLine(), new ZoomSlider()]),
      });

      // Click interaction will be handled in the application-specific useEffect

      mapInstance.current = map;
      setMapInitialized(true);
    }
    // Cleanup only on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current = null;
      }
    };
  }, []);

  // Removed hospital fetching - focusing only on applications

  // Removed hospital markers - focusing only on applications

  // Update marker visibility when showMarker changes
  useEffect(() => {
    if (!mapInstance.current || !mapInitialized) return;
    if (vectorLayerRef.current) {
      vectorLayerRef.current.setVisible(showMarker);
    }
  }, [showMarker, mapInitialized]);

  // Search projects function
  const searchProjects = async (query, column) => {
    setIsSearching(true);
    setSearchError(null);

    try {
      const params = new URLSearchParams({
        limit: 5000,
      });

      if (query.trim()) {
        if (column === "all") {
          params.append("search", query);
        } else {
          params.append("searchColumn", column);
          params.append("searchValue", query);
        }
      }

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/public-projects?${params}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data?.data || []);
      return data?.data || [];
    } catch (error) {
      console.error("Error searching projects:", error);
      setSearchError(error.message);
      setSearchResults([]);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  // Fetch projects
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const projectsResponse = await fetch(
          `${API_BASE_URL}/public-projects?limit=5000`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!projectsResponse.ok) {
          throw new Error(`HTTP error! status: ${projectsResponse.status}`);
        }

        const projectsData = await projectsResponse.json();
        setProjects(projectsData?.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchProjects(searchQuery, searchColumn);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchColumn]);

  // Auto-zoom to search results when search results change
  useEffect(() => {
    if (searchResults.length > 0 && mapInstance.current && mapInitialized) {
      const map = mapInstance.current;
      const view = map.getView();

      // Calculate bounds for all search results
      const coordinates = searchResults
        .filter((project) => project.longitude && project.latitude)
        .map((project) => [
          parseFloat(project.longitude),
          parseFloat(project.latitude),
        ]);

      if (coordinates.length > 0) {
        if (coordinates.length === 1) {
          // Single result - zoom to it
          view.setCenter(fromLonLat(coordinates[0]));
          view.setZoom(15);
        } else {
          // Multiple results - fit all in view
          const extent = coordinates.reduce(
            (extent, coord) => {
              const [lon, lat] = coord;
              return [
                Math.min(extent[0], lon),
                Math.min(extent[1], lat),
                Math.max(extent[2], lon),
                Math.max(extent[3], lat),
              ];
            },
            [Infinity, Infinity, -Infinity, -Infinity]
          );

          // Add some padding to the extent
          const padding = 0.01; // degrees
          const paddedExtent = [
            extent[0] - padding,
            extent[1] - padding,
            extent[2] + padding,
            extent[3] + padding,
          ];

          view.fit(fromLonLat(paddedExtent), {
            padding: [50, 50, 50, 50],
            duration: 1000,
          });
        }
      }
    }
  }, [searchResults, mapInitialized]);

  // Auto-update near me results when radius changes
  useEffect(() => {
    if (nearMeMode && userLocation) {
      findNearMeProjects();
    }
  }, [nearMeRadius]);

  // Handle navigation from ProjectView
  useEffect(() => {
    if (location.state?.centerCoordinates && mapInstance.current) {
      const [longitude, latitude] = location.state.centerCoordinates;
      const view = mapInstance.current.getView();
      view.setCenter(fromLonLat([longitude, latitude]));
      view.setZoom(12); // Zoom in closer for specific project

      // Clear the state to prevent re-centering on subsequent renders
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, mapInstance.current, navigate, location.pathname]);

  // Add hover interaction for tooltips
  useEffect(() => {
    if (!mapInstance.current || !mapInitialized) return;
    const map = mapInstance.current;

    const handlePointerMove = (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );

      if (feature) {
        const properties = feature.get("properties");
        const featureType = properties?.type;

        if (featureType === "project") {
          // Show tooltip for projects
          const coordinate = event.coordinate;
          const pixel = map.getPixelFromCoordinate(coordinate);
          setTooltip({
            visible: true,
            content: properties.name || "No name",
            x: pixel[0] + 10,
            y: pixel[1] - 10,
          });
          map.getTarget().style.cursor = "pointer";
        } else {
          // Hide tooltip
          setTooltip({ visible: false, content: "", x: 0, y: 0 });
          map.getTarget().style.cursor = "";
        }
      } else {
        // Hide tooltip
        setTooltip({ visible: false, content: "", x: 0, y: 0 });
        map.getTarget().style.cursor = "";
      }
    };

    const handlePointerLeave = () => {
      setTooltip({ visible: false, content: "", x: 0, y: 0 });
      map.getTarget().style.cursor = "";
    };

    map.on("pointermove", handlePointerMove);
    map.on("pointerleave", handlePointerLeave);

    return () => {
      map.un("pointermove", handlePointerMove);
      map.un("pointerleave", handlePointerLeave);
    };
  }, [mapInitialized]);

  // Add click interaction for projects
  useEffect(() => {
    if (!mapInstance.current || !mapInitialized) return;
    const map = mapInstance.current;

    const handleClick = (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );

      if (feature) {
        const properties = feature.get("properties");
        const featureType = properties?.type;

        if (featureType === "project") {
          // Show project details in drawer
          setSelectedProjectDetails(properties);
          setDrawerOpen(true);
        }
      }
    };

    map.on("click", handleClick);

    return () => {
      map.un("click", handleClick);
    };
  }, [mapInitialized, navigate]);

  // Helper function to get status color
  const getStatusColor = (status) => {
    return STATUS_COLORS[status] || "#666";
  };

  // Helper function to get category marker
  const getCategoryMarker = (
    category,
    status,
    isSearchResult = false
  ) => {
    const statusColor = getStatusColor(status);
    const scale = isSearchResult ? 1.5 : 1.2;
    const strokeWidth = isSearchResult ? 3 : 2;
    const outerRadius = isSearchResult ? 12 : 10;

    let svgIcon = "";

    switch (category) {
      case "volunteer":
        svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="${outerRadius}" fill="${statusColor}" stroke="white" stroke-width="${strokeWidth}"/>
            ${
              isSearchResult
                ? `<circle cx="12" cy="12" r="14" fill="none" stroke="#ff6b35" stroke-width="2" opacity="0.8"/>`
                : ""
            }
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="white"/>
          </svg>
        `;
        break;
      case "education":
        svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="${outerRadius}" fill="${statusColor}" stroke="white" stroke-width="${strokeWidth}"/>
            ${
              isSearchResult
                ? `<circle cx="12" cy="12" r="14" fill="none" stroke="#ff6b35" stroke-width="2" opacity="0.8"/>`
                : ""
            }
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="white"/>
          </svg>
        `;
        break;
      case "donation":
        svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="${outerRadius}" fill="${statusColor}" stroke="white" stroke-width="${strokeWidth}"/>
            ${
              isSearchResult
                ? `<circle cx="12" cy="12" r="14" fill="none" stroke="#ff6b35" stroke-width="2" opacity="0.8"/>`
                : ""
            }
            <path d="M20.5 4c-2.61 0.45-5.59 1.22-8 2.5-2.41-1.28-5.39-2.05-8-2.5v11.5c2.61 0.45 5.59 1.22 8 2.5 2.41-1.28 5.39-2.05 8-2.5V4zm-8 10.92c-1.87-0.73-3.96-1.18-6-1.36V5.64c2.04 0.18 4.13 0.63 6 1.36v7.92z" fill="white"/>
          </svg>
        `;
        break;
      case "mental_health":
        svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="${outerRadius}" fill="${statusColor}" stroke="white" stroke-width="${strokeWidth}"/>
            ${
              isSearchResult
                ? `<circle cx="12" cy="12" r="14" fill="none" stroke="#ff6b35" stroke-width="2" opacity="0.8"/>`
                : ""
            }
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/>
          </svg>
        `;
        break;
      case "community":
        svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="${outerRadius}" fill="${statusColor}" stroke="white" stroke-width="${strokeWidth}"/>
            ${
              isSearchResult
                ? `<circle cx="12" cy="12" r="14" fill="none" stroke="#ff6b35" stroke-width="2" opacity="0.8"/>`
                : ""
            }
            <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" fill="white"/>
          </svg>
        `;
        break;
      case "partnership":
        svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="${outerRadius}" fill="${statusColor}" stroke="white" stroke-width="${strokeWidth}"/>
            ${
              isSearchResult
                ? `<circle cx="12" cy="12" r="14" fill="none" stroke="#ff6b35" stroke-width="2" opacity="0.8"/>`
                : ""
            }
            <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" fill="white"/>
          </svg>
        `;
        break;
      default:
        svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="${outerRadius}" fill="${statusColor}" stroke="white" stroke-width="${strokeWidth}"/>
            ${
              isSearchResult
                ? `<circle cx="12" cy="12" r="14" fill="none" stroke="#ff6b35" stroke-width="2" opacity="0.8"/>`
                : ""
            }
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white"/>
          </svg>
        `;
        break;
    }

    return svgIcon;
  };

  // Create project markers
  const createProjectMarkers = (projects, isSearchResult = false) => {
    return projects
      .filter(
        (project) =>
          project.longitude !== null &&
          project.latitude !== null &&
          visibleCategories[project.category]
      )
      .map((project) => {
        const lon = parseFloat(project.longitude);
        const lat = parseFloat(project.latitude);

        if (isNaN(lon) || isNaN(lat)) {
          return null;
        }

        const feature = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          properties: {
            ...project,
            type: "project",
            isSearchResult: isSearchResult,
          },
        });

        // Get category specific marker
        const markerSvg = getCategoryMarker(
          project.category,
          project.status,
          isSearchResult
        );

        feature.setStyle(
          new Style({
            image: new Icon({
              src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                markerSvg
              )}`,
              scale: 1,
              anchor: [0.5, 0.5],
            }),
          })
        );
        return feature;
      })
      .filter((marker) => marker !== null);
  };

  // Create user location marker
  const createUserLocationMarker = () => {
    if (!userLocation) return null;

    const feature = new Feature({
      geometry: new Point(
        fromLonLat([userLocation.longitude, userLocation.latitude])
      ),
      properties: {
        type: "userLocation",
      },
    });

    feature.setStyle(
      new Style({
        image: new Icon({
          src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#2196f3" stroke="white" stroke-width="3"/>
              <circle cx="16" cy="16" r="6" fill="white"/>
              <circle cx="16" cy="16" r="3" fill="#2196f3"/>
            </svg>
          `)}`,
          scale: 1,
          anchor: [0.5, 0.5],
        }),
      })
    );
    return feature;
  };

  // Update markers when projects, search results, visible categories, or near me mode change
  useEffect(() => {
    if (!mapInstance.current || !mapInitialized) return;
    const vectorSource = vectorLayerRef.current.getSource();

    // Clear existing markers
    const existingFeatures = vectorSource.getFeatures();
    const projectFeatures = existingFeatures.filter(
      (f) => f.get("properties")?.type === "project"
    );
    const userLocationFeatures = existingFeatures.filter(
      (f) => f.get("properties")?.type === "userLocation"
    );
    projectFeatures.forEach((f) => vectorSource.removeFeature(f));
    userLocationFeatures.forEach((f) => vectorSource.removeFeature(f));

    // Determine which data to show
    let dataToShow;
    if (nearMeMode && nearMeResults.length > 0) {
      dataToShow = nearMeResults;
    } else if (searchResults.length > 0) {
      dataToShow = searchResults;
    } else {
      dataToShow = projects;
    }

    // Add project markers
    const isSearchResult =
      searchResults.length > 0 && dataToShow === searchResults;
    const projectMarkers = createProjectMarkers(dataToShow, isSearchResult);
    vectorSource.addFeatures(projectMarkers);

    // Add user location marker if available
    const userLocationMarker = createUserLocationMarker();
    if (userLocationMarker) {
      vectorSource.addFeature(userLocationMarker);
    }
  }, [
    projects,
    searchResults,
    mapInitialized,
    visibleCategories,
    nearMeMode,
    nearMeResults,
    userLocation,
  ]);

  const handleBaseLayerChange = (event) => {
    const selectedLayer = event.target.value;
    setBaseLayer(selectedLayer);
    if (mapInstance.current) {
      const layers = mapInstance.current.getLayers();
      layers.forEach((layer) => {
        const layerTitle = layer.get("title");
        if (
          layerTitle === "osm" ||
          layerTitle === "satellite" ||
          layerTitle === "terrain"
        ) {
          layer.setVisible(layerTitle === selectedLayer);
        }
      });
    }
  };

  const handleMarkerToggle = (event) => {
    setShowMarker(event.target.checked);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle category toggle
  const handleCategoryToggle = (category) => {
    setVisibleCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Handle select all/deselect all
  const handleSelectAll = () => {
    setVisibleCategories({
      volunteer: true,
      education: true,
      mental_health: true,
      community: true,
      donation: true,
      partnership: true,
    });
  };

  const handleDeselectAll = () => {
    setVisibleCategories({
      volunteer: false,
      education: false,
      mental_health: false,
      community: false,
      donation: false,
      partnership: false,
    });
  };

  // Search handlers
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchColumnChange = (event) => {
    setSearchColumn(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchColumn("all");
    setSearchResults([]);
    setSearchError(null);
  };

  const clearNearMe = () => {
    setNearMeMode(false);
    setNearMeResults([]);
    setLocationError(null);
    setUserLocation(null); // Clear user location

    // Reset map view to default
    if (mapInstance.current) {
      const view = mapInstance.current.getView();
      view.setCenter(fromLonLat([36.8219, -1.2921])); // Default center on Nairobi, Kenya
      view.setZoom(7); // Default zoom level
    }
  };

  // Get category counts
  const getCategoryCounts = () => {
    const counts = {};
    const categories = Object.keys(PROJECT_CATEGORIES);
    let dataToCount;

    if (nearMeMode && nearMeResults.length > 0) {
      dataToCount = nearMeResults;
    } else if (searchResults.length > 0) {
      dataToCount = searchResults;
    } else {
      dataToCount = projects;
    }

    categories.forEach((category) => {
      counts[category] = dataToCount.filter(
        (project) =>
          project.category === category &&
          project.longitude !== null &&
          project.latitude !== null
      ).length;
    });

    return counts;
  };

  const categoryCounts = getCategoryCounts();

  return (
    <>
      {/* Search and Filter Controls */}
      <Box
        sx={{
          mb: 0.5,
          p: 1,
          backgroundColor: "#f8f9fa",
          borderRadius: 1,
          border: "1px solid #e0e0e0",
        }}
      >
        {/* Application Location Label and Near Me Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 0.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#4caf50",
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
            }}
          >
            Our Community Impact Map
          </Typography>

          {/* Near Me Controls */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {/* Near Me Button */}
            <Button
              variant={nearMeMode ? "contained" : "outlined"}
              size="small"
              onClick={findNearMeProjects}
              disabled={isGettingLocation}
              startIcon={
                isGettingLocation ? (
                  <CircularProgress size={16} />
                ) : (
                  <MyLocationIcon />
                )
              }
              sx={{
                minWidth: 120,
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: nearMeMode ? "#2196f3" : "transparent",
                borderColor: "#2196f3",
                color: nearMeMode ? "white" : "#2196f3",
                "&:hover": {
                  backgroundColor: nearMeMode ? "#1976d2" : "#e3f2fd",
                  borderColor: "#1976d2",
                },
                "&:disabled": {
                  backgroundColor: "transparent",
                  borderColor: "#ccc",
                  color: "#999",
                },
              }}
            >
              {isGettingLocation ? "Getting Location..." : "Near Me"}
            </Button>

            {/* Radius Input (shown when near me mode is active) */}
            {nearMeMode && (
              <TextField
                size="small"
                type="number"
                label="Radius (km)"
                value={nearMeRadius}
                onChange={(e) =>
                  setNearMeRadius(parseFloat(e.target.value) || 10)
                }
                inputProps={{
                  min: 0.1,
                  max: 1000,
                  step: 0.1,
                }}
                sx={{
                  minWidth: 120,
                  maxWidth: 120,
                  "& .MuiInputBase-root": {
                    fontSize: "0.75rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "0.7rem",
                  },
                }}
              />
            )}

            {/* Center on Location Button */}
            {userLocation && (
              <Button
                variant="outlined"
                size="small"
                onClick={centerOnUserLocation}
                startIcon={<LocationSearchingIcon />}
                sx={{
                  minWidth: 100,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "#4caf50",
                  color: "#4caf50",
                  "&:hover": {
                    backgroundColor: "#e8f5e8",
                    borderColor: "#388e3c",
                  },
                }}
              >
                Center
              </Button>
            )}

            {/* Clear Near Me Button */}
            {nearMeMode && (
              <Button
                variant="outlined"
                size="small"
                onClick={clearNearMe}
                startIcon={<ClearIcon />}
                sx={{
                  minWidth: 100,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "#f44336",
                  color: "#f44336",
                  "&:hover": {
                    backgroundColor: "#ffebee",
                    borderColor: "#d32f2f",
                  },
                }}
              >
                Clear
              </Button>
            )}
          </Box>
        </Box>

        {/* Search Bar Row */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 1.5 },
            alignItems: { xs: "stretch", sm: "center" },
            mb: 0,
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
          }}
        >
          {/* Left side - Search controls */}
          <Box sx={{ 
            display: "flex", 
            gap: { xs: 1, sm: 2 }, 
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "100%", md: "auto" }
          }}>
            {/* Search Input */}
            <TextField
              size="small"
              placeholder="Search by project name, location, category..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                width: { xs: "100%", sm: 350 },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={clearSearch}
                      sx={{ p: 0.5 }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Search Column Selector */}
            <FormControl size="small" sx={{ 
              minWidth: { xs: "100%", sm: 150 },
              width: { xs: "100%", sm: "auto" }
            }}>
              <InputLabel>Search in</InputLabel>
              <Select
                value={searchColumn}
                onChange={handleSearchColumnChange}
                label="Search in"
              >
                <MenuItem value="all">All Fields</MenuItem>
                <MenuItem value="name">Project Name</MenuItem>
                <MenuItem value="location">Location</MenuItem>
                <MenuItem value="category">Category</MenuItem>
                <MenuItem value="description">Description</MenuItem>
                <MenuItem value="coordinates">Coordinates</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Right side - Search Status Indicators */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {/* Search Status Indicators */}
            {isSearching && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  ml: 1,
                }}
              >
                <CircularProgress size={12} />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: "0.7rem" }}
                >
                  Searching...
                </Typography>
              </Box>
            )}

            {searchResults.length > 0 && !isSearching && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  ml: 1,
                  px: 1,
                  py: 0.5,
                  backgroundColor: "#e3f2fd",
                  borderRadius: 1,
                  border: "1px solid #2196f3",
                }}
              >
                <Typography variant="caption" color="primary" fontWeight="bold">
                  {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""} found
                </Typography>
              </Box>
            )}

            {searchError && (
              <Chip
                label={`Error: ${
                  searchError.length > 15
                    ? searchError.substring(0, 15) + "..."
                    : searchError
                }`}
                color="error"
                size="small"
                onDelete={() => setSearchError(null)}
                sx={{
                  fontSize: "0.7rem",
                  height: "20px",
                  ml: 1,
                }}
              />
            )}

            {searchResults.length > 0 && !nearMeMode && (
              <Chip
                label={`${searchResults.length} results`}
                color="primary"
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "0.7rem",
                  height: "20px",
                  ml: 1,
                }}
              />
            )}

            {nearMeMode && nearMeResults.length > 0 && (
              <Chip
                label={`${nearMeResults.length} within ${nearMeRadius}km`}
                color="info"
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "0.7rem",
                  height: "20px",
                  ml: 1,
                }}
              />
            )}

            {locationError && (
              <Chip
                label={`Location: ${
                  locationError.length > 15
                    ? locationError.substring(0, 15) + "..."
                    : locationError
                }`}
                color="error"
                size="small"
                onDelete={() => setLocationError(null)}
                sx={{
                  fontSize: "0.7rem",
                  height: "20px",
                  ml: 1,
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Map Container */}

      <Box
        ref={mapRef}
        sx={{
          width: "100%",
          height: "calc(100vh - 200px)",
          position: "relative",
          "& .ol-zoom": {
            top: "1em",
            left: "1em",
            background: "none",
            border: "none",
            padding: 0,
            "& .ol-zoom-in, & .ol-zoom-out": {
              background: "rgba(255,255,255,0.8)",
              border: "1px solid #ccc",
              borderRadius: "2px",
              margin: "2px",
              width: "28px",
              height: "28px",
              lineHeight: "28px",
            },
          },
          // Remove animations that cause blinking
          "& .ol-layer-animating": {
            transition: "none",
          },
          "& .ol-layer": {
            transition: "none",
          },
          "& .ol-tile": {
            transition: "none",
          },
          "& .ol-tile-loading": {
            opacity: 1,
          },
          "& .ol-tile-loaded": {
            opacity: 1,
          },
          "& .ol-rotate": {
            top: "4.5em",
            right: "auto",
            left: "1em",
            background: "rgba(255,255,255,0.8)",
            border: "1px solid #ccc",
            borderRadius: "2px",
            margin: "2px",
            padding: 0,
            "& button": {
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          "& .ol-zoomslider": {
            display: "none",
          },
        }}
      >
        {/* Tooltip */}
        {tooltip.visible && (
          <Box
            sx={{
              position: "absolute",
              left: tooltip.x,
              top: tooltip.y,
              zIndex: 1000,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "500",
              pointerEvents: "none",
              maxWidth: "200px",
              wordWrap: "break-word",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "100%",
                left: "10px",
                border: "4px solid transparent",
                borderTopColor: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
            {tooltip.content}
          </Box>
        )}

        {/* Loading indicator positioned on map */}
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "4px 8px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <CircularProgress size={20} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Loading projects...
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            position: "absolute",
            left: "1em",
            top: "10em",
            zIndex: 1000,
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "2px",
            border: "1px solid #ccc",
            padding: "2px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            width: "40px",
            "& .MuiIconButton-root": {
              padding: "4px",
              borderRadius: "2px",
              height: "40px",
              width: "40px",
            },
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "transparent",
              color: baseLayer === "osm" ? "#2196f3" : "#666",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
            onClick={() => handleBaseLayerChange({ target: { value: "osm" } })}
          >
            <MapIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "transparent",
              color: baseLayer === "satellite" ? "#2196f3" : "#666",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
            onClick={() =>
              handleBaseLayerChange({ target: { value: "satellite" } })
            }
          >
            <SatelliteAltIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "transparent",
              color: baseLayer === "terrain" ? "#2196f3" : "#666",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
            onClick={() =>
              handleBaseLayerChange({ target: { value: "terrain" } })
            }
          >
            <TerrainIcon />
          </IconButton>
        </Box>

        {/* Compact Legend Box for applications with filtering */}
        <Box
          sx={{
            position: "absolute",
            bottom: 60,
            right: 10,
            zIndex: 1000,
            backgroundColor: "white",
            borderRadius: 1,
            padding: "8px 12px",
            minWidth: "220px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            opacity: 0.9,
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", mb: 1, fontSize: "14px" }}
          >
            Legend
          </Typography>

          {/* Select All / Deselect All Buttons */}
          <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={handleSelectAll}
              sx={{
                fontSize: "10px",
                py: 0.25,
                px: 1,
                textTransform: "none",
                borderColor: "#4caf50",
                color: "#4caf50",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "#e8f5e8",
                  borderColor: "#388e3c",
                },
              }}
            >
              All
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={handleDeselectAll}
              sx={{
                fontSize: "10px",
                py: 0.25,
                px: 1,
                textTransform: "none",
                borderColor: "#f44336",
                color: "#f44336",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "#ffebee",
                  borderColor: "#d32f2f",
                },
              }}
            >
              None
            </Button>
          </Box>

          {/* User Location Marker */}
          {userLocation && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mb: 1,
                p: 0.5,
                backgroundColor: "#e3f2fd",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#2196f3",
                  mr: 0.5,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#1976d2",
                }}
              >
                Your Location
              </Typography>
            </Box>
          )}

          {/* Project Categories with Checkboxes */}
          <Typography
            variant="body2"
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
              mb: 0.5,
              color: "text.secondary",
            }}
          >
            {nearMeMode ? "Projects Near You" : "Project Categories"}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {Object.entries(visibleCategories).map(([category, isVisible]) => (
              <Box
                key={category}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Checkbox
                  checked={isVisible}
                  onChange={() => handleCategoryToggle(category)}
                  size="small"
                  sx={{
                    padding: 0.25,
                    "&.Mui-checked": {
                      color: PROJECT_CATEGORIES[category]?.color,
                    },
                    "&:hover": {
                      backgroundColor: `${PROJECT_CATEGORIES[category]?.color}20`,
                    },
                  }}
                />
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: PROJECT_CATEGORIES[category]?.color,
                    mr: 0.5,
                    transition: "all 0.2s ease-in-out",
                    opacity: isVisible ? 1 : 0.5,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "11px",
                    fontWeight: isVisible ? 600 : 400,
                    color: isVisible ? "text.primary" : "text.secondary",
                    transition: "all 0.2s ease-in-out",
                    flexGrow: 1,
                  }}
                >
                  {PROJECT_CATEGORIES[category]?.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "9px",
                    color: "text.secondary",
                    backgroundColor: isVisible
                      ? `${PROJECT_CATEGORIES[category]?.color}20`
                      : "#f5f5f5",
                    px: 0.5,
                    py: 0.1,
                    borderRadius: 0.5,
                    fontWeight: 600,
                    minWidth: "16px",
                    textAlign: "center",
                  }}
                >
                  {categoryCounts[category] || 0}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Summary */}
          <Box
            sx={{
              mt: 1,
              pt: 1,
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "10px",
              }}
            >
              Visible:
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                fontSize: "10px",
              }}
            >
              {Object.entries(visibleCategories)
                .filter(([_, isVisible]) => isVisible)
                .reduce((sum, [category, _]) => sum + (categoryCounts[category] || 0), 0)}
            </Typography>
          </Box>
        </Box>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: { xs: "100%", sm: "420px" },
              padding: 0,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              position: "fixed",
              top: { xs: 0, sm: "64px" },
              right: 0,
              border: "none",
              boxShadow: "0px 8px 32px rgba(0,0,0,0.12)",
              borderRadius: { xs: 0, sm: "8px 0 0 8px" },
              overflow: "hidden",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: { xs: "100vh", sm: "calc(100vh - 64px)" },
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 3,
                borderBottom: 1,
                borderColor: "divider",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative Elements */}
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "50%",
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -15,
                  left: -15,
                  width: 80,
                  height: 80,
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "50%",
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "1.1rem" }}
                >
                  Project Details
                </Typography>
                <IconButton
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              {selectedProjectDetails && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    opacity: 0.9,
                    fontSize: "0.9rem",
                  }}
                >
                  {selectedProjectDetails?.name}
                </Typography>
              )}
            </Box>

            {/* Tabs */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: "#f8f9fa",
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  minHeight: "56px",
                  "&.Mui-selected": {
                    color: "#667eea",
                    fontWeight: 600,
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#667eea",
                  height: 3,
                  borderRadius: "2px 2px 0 0",
                },
              }}
            >
              <Tab
                icon={<InfoIcon fontSize="small" />}
                label="Basic Info"
                sx={{ minHeight: "56px" }}
              />
              <Tab
                icon={<LocationOnIcon fontSize="small" />}
                label="Location"
                sx={{ minHeight: "56px" }}
              />
            </Tabs>

            {/* Content Area */}
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                p: 3,
              backgroundColor: "#fafafa",
            }}
          >
            {selectedProjectDetails ? (
              <>
                {tabValue === 0 && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Project Name
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "text.primary" }}
                      >
                        {selectedProjectDetails.name}
                      </Typography>
                    </Box>

                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "white",
                          borderRadius: 2,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "text.secondary",
                            mb: 1,
                            fontSize: "0.8rem",
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                          }}
                        >
                          Category
                        </Typography>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            px: 2,
                            py: 0.5,
                            borderRadius: 3,
                            backgroundColor: `${PROJECT_CATEGORIES[
                              selectedProjectDetails.category
                            ]?.color}20`,
                            color: PROJECT_CATEGORIES[
                              selectedProjectDetails.category
                            ]?.color,
                            fontWeight: 600,
                            fontSize: "0.85rem",
                          }}
                        >
                          {PROJECT_CATEGORIES[selectedProjectDetails.category]
                            ?.label || selectedProjectDetails.category}
                        </Box>
                      </Box>

                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Description
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "text.primary" }}
                      >
                        {selectedProjectDetails.description || "-"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Status
                      </Typography>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          px: 2,
                          py: 0.5,
                          borderRadius: 3,
                          backgroundColor: `${getStatusColor(
                            selectedProjectDetails.status
                          )}20`,
                          color: getStatusColor(
                            selectedProjectDetails.status
                          ),
                          fontWeight: 600,
                          fontSize: "0.85rem",
                        }}
                      >
                        {selectedProjectDetails.status
                          ?.charAt(0)
                          .toUpperCase() +
                          selectedProjectDetails.status
                            ?.slice(1)
                            .replace("_", " ") || "-"}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Target Individual
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "text.primary" }}
                      >
                        {selectedProjectDetails.target_individual || "-"}
                      </Typography>
                    </Box>

                    {/* Distance from user location */}
                    {userLocation &&
                      selectedProjectDetails.distance !== undefined && (
                        <Box
                          sx={{
                            p: 2,
                            backgroundColor: "white",
                            borderRadius: 2,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            border: "1px solid #e0e0e0",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: "text.secondary",
                              mb: 1,
                              fontSize: "0.8rem",
                              textTransform: "uppercase",
                              letterSpacing: 0.5,
                            }}
                          >
                            Distance from You
                          </Typography>
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              px: 2,
                              py: 0.5,
                              borderRadius: 3,
                              backgroundColor: "#e3f2fd",
                              color: "#1976d2",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                            }}
                          >
                            <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            {selectedProjectDetails.distance.toFixed(1)} km
                          </Box>
                        </Box>
                      )}
                  </Box>
                )}
                {tabValue === 1 && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        County
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "text.primary" }}
                      >
                        {selectedProjectDetails.county || "-"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Subcounty
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "text.primary" }}
                      >
                        {selectedProjectDetails.subcounty || "-"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Progress
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "text.primary" }}
                      >
                        {selectedProjectDetails.progress || 0}%
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Coordinates
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary", display: "block" }}
                          >
                            Latitude
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: "text.primary",
                              fontFamily: "monospace",
                            }}
                          >
                            {selectedProjectDetails.latitude || "-"}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary", display: "block" }}
                          >
                            Longitude
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: "text.primary",
                              fontFamily: "monospace",
                            }}
                          >
                            {selectedProjectDetails.longitude || "-"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "200px",
                    textAlign: "center",
                    p: 3,
                  }}
                >
                  <InfoIcon
                    sx={{
                      fontSize: 48,
                      color: "text.secondary",
                      mb: 2,
                      opacity: 0.5,
                    }}
                  />
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 1, fontWeight: 500 }}
                  >
                    No Item Selected
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ opacity: 0.7 }}
                  >
                    Click on a marker on the map to view details
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Bottom Button */}
            <Box
              sx={{
                p: 3,
                borderTop: 1,
                borderColor: "divider",
                marginTop: "auto",
                backgroundColor: "white",
                boxShadow: "0 -2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  if (selectedProjectDetails?.id) {
                    navigate(`/project/${selectedProjectDetails.id}`);
                  }
                }}
                sx={{
                  py: 1.5,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                View Full Details
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default CharityMap;