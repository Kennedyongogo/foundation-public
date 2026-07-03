import {
  School,
  Psychology,
  TrendingUp,
  LocalHospital,
  Favorite,
  LocationOn,
  Email,
  Groups,
  Handshake,
  VerifiedUser,
  VolunteerActivism,
  Visibility,
  TrackChanges,
} from "@mui/icons-material";
import { brand } from "./missionCategoryConfig";

export { brand };

export const whoWeAreParagraphs = [
  "Mwalimu Hope Foundation is a registered non-profit, non-political, and non-sectarian charitable organization dedicated to transforming lives and empowering communities across Kenya. Founded in 2025 and based in Bungoma, we are committed to creating lasting positive change through education, health advocacy, and community empowerment.",
  "Registered under the laws of Kenya as a charitable foundation committed to serving vulnerable communities and promoting sustainable development.",
];

export const visionText =
  "To create a society where every individual has access to quality education, mental health support, and sustainable livelihoods, enabling them to reach their full potential and contribute meaningfully to their communities.";

export const missionText =
  "To empower communities through comprehensive education programs, health advocacy, and poverty alleviation initiatives that promote sustainable development and improve the quality of life for vulnerable populations in Kenya.";

export const focusAreas = [
  {
    icon: School,
    title: "Education",
    description:
      "We promote access to quality education for underprivileged learners, ensuring that financial constraints do not prevent children and youth from accessing learning opportunities that can transform their futures.",
    color: brand.blue,
  },
  {
    icon: Psychology,
    title: "Mental Health Awareness",
    description:
      "We raise awareness about mental health and provide psychosocial support services, recognizing that mental well-being is fundamental to individual and community development.",
    color: "#e91e63",
  },
  {
    icon: TrendingUp,
    title: "Poverty Alleviation & Empowerment",
    description:
      "We implement programs aimed at reducing poverty and promoting economic empowerment, helping individuals and families build sustainable livelihoods and achieve financial independence.",
    color: brand.gold,
  },
  {
    icon: LocalHospital,
    title: "Health & Wellness",
    description:
      "We promote preventive and curative healthcare initiatives, working to improve health outcomes and ensure communities have access to essential health services.",
    color: brand.green,
  },
];

export const values = [
  { name: "Integrity", icon: VerifiedUser, color: brand.blue },
  { name: "Accountability", icon: Handshake, color: brand.green },
  { name: "Inclusivity", icon: Groups, color: brand.gold },
  { name: "Professionalism", icon: VolunteerActivism, color: "#e91e63" },
  { name: "Service to Humanity", icon: Favorite, color: brand.navy },
];

export const leadership = [
  { role: "CEO/Founder", name: "Simiyu Leviticus" },
  { role: "Secretary", name: "Anjeline Nafula Juma" },
  { role: "Advisor", name: "Dr. Mbiti Mwondi" },
];

export const contactInfo = {
  address: "Meghon Plaza, Bungoma Town, along Moi Avenue",
  poBox: "P.O. Box 2072-50200, Bungoma, Kenya",
  email: "simiyuleviticus93@gmail.com",
};

export const ceoMessageParagraphs = [
  "Welcome to Mwalimu Hope Foundation. Since our founding in 2025 in Bungoma, our mission has been to transform lives across Kenya by expanding access to education, mental health support, healthcare, and sustainable livelihoods. Education remains central to our work because we believe it is the key to breaking the cycle of poverty.",
  "With over 500 lives impacted, more than 50 communities reached, and 1,000 volunteers engaged, our progress reflects real stories of hope—children back in school, families becoming economically stable, and individuals receiving much-needed support.",
  "I invite you to join us on this journey. Whether through partnerships, donations, or volunteering, your contribution helps us build a brighter, more resilient future for all.",
];

export const impactStats = [
  { value: "500+", label: "Lives Impacted" },
  { value: "50+", label: "Communities Reached" },
  { value: "1000+", label: "Volunteers Engaged" },
];

export const sectionIcons = {
  whoWeAre: Groups,
  vision: Visibility,
  mission: TrackChanges,
  focus: School,
  values: Favorite,
  contact: LocationOn,
  ceo: VolunteerActivism,
};
