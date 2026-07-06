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
  Gavel,
  EmojiEvents,
  HandshakeOutlined,
  Phone,
} from "@mui/icons-material";
import { brand } from "./missionCategoryConfig";

export { brand };

export const orgTagline =
  "Empowering Communities, Restoring Hope, and Transforming Lives";

export const whoWeAreParagraphs = [
  "Mwalimu Hope Foundation (MHF) is a legally registered non-profit organization established in 2025. We are dedicated to driving sustainable development and social transformation across Bungoma County and the wider East African region.",
  "Through strategic grassroots interventions, we address critical challenges across four core pillars: Education, Mental Health, Specialized Healthcare, and Poverty Alleviation. By deploying localized, high-impact models, the Foundation bridges the gap between marginalized communities and essential life-changing services.",
  "Registered as a non-profit charitable organization under the laws of Kenya, MHF is committed to transparency, inclusivity, and measurable impact for vulnerable populations.",
];

export const visionText =
  "A society where every individual has access to quality education, mental health support, comprehensive healthcare, and sustainable livelihoods.";

export const missionText =
  "To empower marginalized and vulnerable communities through education, health advocacy, and poverty alleviation programs that promote sustainable development and long-term self-reliance.";

export const institutionalProfile = {
  fullName: "Mwalimu Hope Foundation",
  acronym: "MHF",
  legalStatus: "Registered Non-Profit Charitable Organization (Under the Laws of Kenya)",
  registrationDate: "25 August 2025",
  registrationPlace: "Bungoma Town, Bungoma County, Kenya",
  taxStatus: "KRA Tax Exempted Organization",
};

export const focusAreas = [
  {
    icon: LocalHospital,
    title: "Healthcare Access & Surgical Interventions",
    description:
      "We promote preventive and curative healthcare in underserved rural areas, identifying vulnerable individuals who need specialized surgical care. Through free community medical camps, public health forums, Chief's Barazas, and door-to-door outreach, we mobilize patients from grassroots screening to recovery.",
    color: brand.green,
  },
  {
    icon: School,
    title: "Education & Learner Support",
    description:
      "We mitigate school dropout rates by supporting underprivileged, orphaned, and marginalized learners with scholastic materials, tuition assistance, and improvements to community learning environments so children can stay enrolled and succeed.",
    color: brand.blue,
  },
  {
    icon: Psychology,
    title: "Mental Health & Psychosocial Support",
    description:
      "We combat stigma, expand mental health literacy, and deploy psychosocial support through community wellness clinics, peer support groups, and safe crisis counseling channels for individuals and families in distress.",
    color: "#e91e63",
  },
  {
    icon: TrendingUp,
    title: "Poverty Alleviation & Livelihoods",
    description:
      "We build economic resilience through vocational training, entrepreneurship mentoring, and table-banking linkages that help households transition from dependency to sustainable self-reliance.",
    color: brand.gold,
  },
];

export const values = [
  {
    name: "Integrity",
    icon: VerifiedUser,
    color: brand.blue,
    description:
      "Maintaining the highest level of transparency, ethics, and accountability in all operations and resource utilization.",
  },
  {
    name: "Accountability",
    icon: Handshake,
    color: brand.green,
    description:
      "Building trust through audited financials, open record keeping, and data-driven impact reporting.",
  },
  {
    name: "Inclusivity",
    icon: Groups,
    color: brand.gold,
    description:
      "Ensuring equal access to interventions regardless of gender, status, political alignment, or religious affiliation.",
  },
  {
    name: "Professionalism",
    icon: VolunteerActivism,
    color: "#e91e63",
    description:
      "Delivering high-quality, structured solutions executed by qualified field teams and partners.",
  },
  {
    name: "Service to Humanity",
    icon: Favorite,
    color: brand.navy,
    description:
      "Centering all organizational goals around the dignity, well-being, and advancement of underprivileged populations.",
  },
];

export const achievements = [
  {
    value: "100+",
    label: "Beneficiaries Supported",
    detail: "Underprivileged learners and community members supported through educational and socio-economic empowerment networks.",
  },
  {
    value: "5",
    label: "Medical Outreach Camps",
    detail: "Free medical camps and Chief's Baraza health screenings mapping patients for chronic disease management and surgical support.",
  },
  {
    value: "100%",
    label: "Governance Compliance",
    detail: "Fully operational executive board with strict administrative financial controls and annual constitutional meetings.",
  },
];

export const impactStats = [
  { value: "100+", label: "Beneficiaries Supported" },
  { value: "5", label: "Medical Outreach Camps" },
  { value: "4", label: "Core Program Pillars" },
];

export const leadership = [
  { role: "CEO & Founder", name: "Leviticus Simiyu" },
  { role: "Secretary", name: "Anjeline Nafula Juma" },
  { role: "Treasurer", name: "Board-appointed per constitution" },
  { role: "Advisory Council", name: "Dr. Mbiti Mwondi & expert advisors" },
];

export const governanceNote =
  "The Foundation is governed by an executive board including the CEO, Secretary, Treasurer, and independent board members, supported by a non-voting Advisory Council of experts in public health, education, and non-profit development.";

export const partners = [
  {
    name: "Ministry of Health — Bungoma County",
    description:
      "Collaboration on local administrative clearance, Chief's Barazas, and hospital referral channels.",
  },
  {
    name: "Teachers Service Commission (TSC) & Local Schools",
    description:
      "Academic tracking and alignment with primary educational stakeholders.",
  },
];

export const contactInfo = {
  address: "Meghon Plaza, 1st Floor, Moi Avenue, Bungoma Town, Kenya",
  poBox: "P.O. Box 2072-50200, Bungoma, Kenya",
  email: "mwalimuhopefoundation@gmail.com",
  phones: ["0721660901", "0750818385"],
  liaison: "Leviticus Simiyu, Chief Executive Officer & Founder",
};

export const ceoMessageParagraphs = [
  "Welcome to Mwalimu Hope Foundation. Since our founding in August 2025 in Bungoma, our mandate has been to empower communities across Bungoma County and the wider East African region through education, mental health support, specialized healthcare, and sustainable livelihoods.",
  "Our work is grounded in four pillars: healthcare access and surgical interventions, learner support, psychosocial well-being, and poverty alleviation. Already, we have supported over 100 underprivileged learners and community members, and conducted five free medical camps and Chief's Baraza health screenings that connect vulnerable patients to life-changing care.",
  "I invite you to partner with us—through donations, volunteering, or institutional collaboration—as we restore hope and transform lives in the communities we serve.",
];

export const sectionIcons = {
  whoWeAre: Groups,
  vision: Visibility,
  mission: TrackChanges,
  focus: School,
  values: Favorite,
  contact: LocationOn,
  ceo: VolunteerActivism,
  institutional: Gavel,
  achievements: EmojiEvents,
  partners: HandshakeOutlined,
  phone: Phone,
};
