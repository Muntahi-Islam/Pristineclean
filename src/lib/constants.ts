export const COMPANY = {
  name: "Tori's Cleaning Service",
  tagline: "Professional Cleaning Services",
  description:
    "Professional cleaning services for residential and commercial spaces in the Houston, TX area. Reliable, thorough, and tailored to your needs.",
  email: "toriscleaningservice@gmail.com",
  phone: "+1 713-259-3741",
  address: "15120 Lee Rd, Humble, TX 77395",
  hours: "Mon - Sat: 7:00 AM - 8:00 PM",
  social: {
    instagram: "https://instagram.com/toriscleaning",
    facebook: "https://facebook.com/toriscleaning",
    twitter: "",
    linkedin: "",
  },
} as const;

export const SERVICES = [
  {
    slug: "residential-cleaning",
    title: "Residential Cleaning",
    subtitle: "Your sanctuary, immaculately maintained",
    description:
      "Comprehensive home cleaning services tailored to your lifestyle. From weekly maintenance to deep seasonal cleans, we ensure every corner of your home sparkles.",
    icon: "home",
    features: [
      "Living areas & bedrooms",
      "Kitchen & appliances",
      "Bathrooms & fixtures",
      "Dusting & polishing",
      "Floor care (vacuum, mop)",
      "Trash removal",
    ],
  },
  {
    slug: "commercial-cleaning",
    title: "Commercial Cleaning",
    subtitle: "Impress your clients, inspire your team",
    description:
      "Professional cleaning solutions for businesses of all sizes. We maintain spotless environments that reflect your company's standards.",
    icon: "building",
    features: [
      "Office spaces & cubicles",
      "Conference rooms",
      "Restrooms & breakrooms",
      "Entryways & lobbies",
      "Floor maintenance",
      "Window cleaning",
    ],
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    subtitle: "Beyond the surface, to the core",
    description:
      "Transform your space with our intensive deep cleaning service. We reach every nook and cranny, eliminating buildup and restoring freshness.",
    icon: "sparkles",
    features: [
      "Behind appliances",
      "Inside cabinets & drawers",
      "Baseboards & trim",
      "Light fixtures & fans",
      "Window tracks & sills",
      "Tile & grout scrubbing",
    ],
  },
  {
    slug: "move-in-cleaning",
    title: "Move In Cleaning",
    subtitle: "Welcome home to a spotless space",
    description:
      "Start fresh in your new home with our comprehensive move-in cleaning service. Every surface, corner, and detail professionally cleaned.",
    icon: "truck",
    features: [
      "Full home deep clean",
      "Carpet shampooing",
      "Wall spot cleaning",
      "Refrigerator cleaning",
      "Oven & stovetop",
      "All windows & sills",
    ],
  },
  {
    slug: "move-out-cleaning",
    title: "Move Out Cleaning",
    subtitle: "Leave it clean, get your deposit back",
    description:
      "Ensure your full deposit return with our thorough move-out cleaning. We restore your space to better-than-new condition.",
    icon: "truck",
    features: [
      "Full home deep clean",
      "Carpet shampooing",
      "Wall spot cleaning",
      "Refrigerator cleaning",
      "Oven & stovetop",
      "All windows & sills",
    ],
  },
  {
    slug: "office-cleaning",
    title: "Office Cleaning",
    subtitle: "Productive spaces start with cleanliness",
    description:
      "Professional office cleaning that creates a healthy, impressive workspace for your team and clients.",
    icon: "building",
    features: [
      "Workstation sanitization",
      "Break room & kitchen",
      "Conference rooms",
      "Reception area",
      "Trash & recycling",
      "Restroom sanitation",
    ],
  },
  {
    slug: "carpet-cleaning",
    title: "Carpet Cleaning",
    subtitle: "Revitalize your carpets, refresh your room",
    description:
      "Professional hot water extraction cleaning that removes embedded dirt, stains, and allergens. Extends carpet life and improves indoor air quality.",
    icon: "carpet",
    features: [
      "Hot water extraction",
      "Stain treatment",
      "Deodorizing",
      "Protectant application",
      "Pet odor removal",
      "Area rug cleaning",
    ],
  },
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    subtitle: "Clear views, brilliant light",
    description:
      "Streak-free window cleaning for homes and businesses. Interior and exterior service with professional-grade equipment for a crystal-clear finish.",
    icon: "window",
    features: [
      "Interior & exterior",
      "Track & sill cleaning",
      "Screen cleaning",
      "Hard water spot removal",
      "High-reach windows",
      "Skylight cleaning",
    ],
  },
] as const;

export const EXTRAS = [
  { id: "oven", label: "Inside Oven", price: 35 },
  { id: "fridge", label: "Inside Fridge", price: 30 },
  { id: "laundry", label: "Laundry", price: 25 },
  { id: "windows", label: "Window Cleaning", price: 50 },
  { id: "carpet", label: "Carpet Cleaning", price: 75 },
  { id: "garage", label: "Garage Cleaning", price: 60 },
  { id: "pressure", label: "Pressure Washing", price: 100 },
] as const;

export const FREQUENCIES = [
  { value: "ONE_TIME", label: "One Time" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "BIWEEKLY", label: "Biweekly" },
  { value: "MONTHLY", label: "Monthly" },
] as const;

export const TIME_SLOTS = [
  "7:00 AM - 9:00 AM",
  "9:00 AM - 11:00 AM",
  "11:00 AM - 1:00 PM",
  "1:00 PM - 3:00 PM",
  "3:00 PM - 5:00 PM",
  "5:00 PM - 7:00 PM",
] as const;

export const STATS = [
  { value: 500, suffix: "+", label: "Homes Cleaned" },
  { value: 99, suffix: "%", label: "Satisfaction Rate" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Team Members" },
] as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/residential-cleaning" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
