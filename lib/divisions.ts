import type { LucideIcon } from "lucide-react";
import {
  Flame,
  Factory,
  Fuel,
  HardHat,
  Building2,
  Droplets,
  Package,
  Anchor,
  Truck,
  ClipboardList,
  Globe,
  GraduationCap,
} from "lucide-react";

/**
 * Single source of truth for everything Malique Oil and Gas Ltd does.
 *
 * Mirrors the company's formal "objects of establishment" (Memorandum of
 * Association, Article 3) — grouped into customer-facing divisions. Every
 * public surface (home grid, services page, ticker, quote dropdown) reads
 * from here so they can never drift apart.
 */
export interface Division {
  icon: LucideIcon;
  name: string;
  /** One-sentence summary used on cards and the services page. */
  description: string;
  /** Detailed capabilities shown on the services page. */
  capabilities: string[];
}

export const DIVISIONS: Division[] = [
  {
    icon: Flame,
    name: "LPG & Cooking Gas Services",
    description:
      "Sales and retail of cooking gas (LPG), acetylene and methane — with cylinder refills, plant filling, testing and fast doorstep delivery.",
    capabilities: [
      "LPG, acetylene and methane gas sales",
      "3kg – 50kg cylinder refills and exchanges",
      "New cylinder sales",
      "Commercial and industrial bulk supply",
      "Gas plant filling, testing and maintenance",
      "Fast doorstep delivery in Rivers State",
    ],
  },
  {
    icon: Factory,
    name: "Oil & Gas Operations",
    description:
      "Licence acquisition support and professional services across crude oil lifting, mining and the sales and supply of petroleum products.",
    capabilities: [
      "Licence acquisition and regulatory support",
      "Crude oil lifting operations",
      "Mining and processing of petroleum products",
      "Sales and supply of gas and gasoline",
      "Petroleum product distribution",
    ],
  },
  {
    icon: Fuel,
    name: "Filling Stations & Gas Plants",
    description:
      "We own, build and operate filling stations and gas plants across the country — from construction through to management.",
    capabilities: [
      "Filling station development and operation",
      "Gas plant construction and management",
      "Plant maintenance and repair",
      "Bulk storage and distribution",
    ],
  },
  {
    icon: HardHat,
    name: "Engineering & Construction",
    description:
      "Engineering consultancy and construction — building, civil and road works, welding, fabrication and pipeline inspection delivered to professional standards.",
    capabilities: [
      "Engineering consultancy and design",
      "Building, civil and construction works",
      "Road construction and maintenance",
      "Welding and metal fabrication",
      "Quality-control pipeline inspection",
      "Scaffolding and industrial support services",
      "Project supervision and management",
    ],
  },
  {
    icon: Building2,
    name: "Real Estate & Property Development",
    description:
      "Real estate development, management and leasing, estate surveying and valuation, and interior and exterior finishing.",
    capabilities: [
      "Estate and housing development",
      "Property management and facility maintenance",
      "Leasing and rental services",
      "Estate surveying and valuation",
      "Land acquisition and title verification",
      "Interior and exterior decorations",
    ],
  },
  {
    icon: Droplets,
    name: "Borehole Drilling & Water Works",
    description:
      "Borehole drilling and complete water supply works for residential, commercial and industrial clients.",
    capabilities: [
      "Borehole drilling and completion",
      "Water treatment and purification",
      "Mechanical pumping and plumbing works",
      "Commercial and industrial water supply",
    ],
  },
  {
    icon: Package,
    name: "Building Materials & Equipment Supply",
    description:
      "Sale of building materials and the supply of engineering equipment and machinery for projects of every scale.",
    capabilities: [
      "Building and construction materials",
      "Engineering equipment and machinery",
      "Heavy-duty equipment supply",
      "Spare parts and accessories",
    ],
  },
  {
    icon: Anchor,
    name: "Marine & Dredging Services",
    description:
      "Dredging and marine support services for land reclamation, waterway maintenance and energy infrastructure.",
    capabilities: [
      "Dredging and de-silting operations",
      "Land reclamation support",
      "Waterway and channel maintenance",
      "Marine and offshore support services",
    ],
  },
  {
    icon: Truck,
    name: "Transportation, Haulage & Fleet",
    description:
      "Road transportation, haulage and fleet services — vehicle and equipment leasing, car hire and sales, and spare parts.",
    capabilities: [
      "Road transportation and haulage",
      "Bulk and inter-state freight",
      "Leasing of vehicles and equipment",
      "Car sales and hire services",
      "Trucks and heavy-duty equipment",
      "Spare parts and accessories",
    ],
  },
  {
    icon: ClipboardList,
    name: "Procurement, Contracts & General Trade",
    description:
      "End-to-end procurement, general contracts and trading — sourcing, supply and distribution of general goods and merchandise.",
    capabilities: [
      "Commodity and equipment procurement",
      "General contracts and supply agreements",
      "General merchandise and trading",
      "Distribution of general goods",
      "Vendor management and tendering support",
      "Commission agency services",
    ],
  },
  {
    icon: Globe,
    name: "Import & Export Services",
    description:
      "Import and export of petroleum products, equipment and general merchandise, backed by logistics and clearing support.",
    capabilities: [
      "Import and export of petroleum products",
      "Equipment and machinery import",
      "General merchandise trading",
      "Logistics, clearing and forwarding support",
    ],
  },
  {
    icon: GraduationCap,
    name: "Training, HR & Business Support",
    description:
      "Skill-acquisition training and human-resource development, plus advertising, marketing and environmental services.",
    capabilities: [
      "Skill acquisition and technical training",
      "Human resources management and development",
      "Skilled labour placement and recruitment",
      "Advertising and marketing services",
      "Environmental services",
    ],
  },
];

/** Division names only — used by the ticker marquee. */
export const DIVISION_NAMES: string[] = DIVISIONS.map((d) => d.name);

/** Selectable services for the quote form (names + an "Other" catch-all). */
export const DIVISION_OPTIONS: string[] = [...DIVISION_NAMES, "Other"];
