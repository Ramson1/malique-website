import {
  Flame,
  Factory,
  Building2,
  HardHat,
  Truck,
  Package,
  LucideIcon,
} from "lucide-react";

export type Project = {
  slug: string;
  icon: LucideIcon;
  category: string;
  title: string;
  location: string;
  description: string;
  status: string;
  sector: string;
  clientTypes: string[];
  overview: string[];
  scope: string[];
  capabilities: string[];
};

export const projects: Project[] = [
  {
    slug: "rivers-state-lpg-supply-network",
    icon: Factory,
    category: "LPG Distribution",
    title: "Rivers State LPG Supply Network",
    location: "Igboh Etche & Elelenwo, Port Harcourt",
    description:
      "Dual-branch refill and delivery network serving households, hotels, restaurants and commercial users across Etche LGA and Port Harcourt.",
    status: "Active",
    sector: "Energy Retail / LPG",
    clientTypes: [
      "Households",
      "Hotels & Restaurants",
      "Quick-service filling stations",
      "Commercial kitchens",
    ],
    overview: [
      "Our LPG supply network is anchored on two operational branches — Plot 3, Okoche New Layout, Igboh Etche (Etche LGA) and Off Odani Road, Elelenwo, Port Harcourt — giving us coverage across both the Etche corridor and the Port Harcourt metropolitan area.",
      "The network combines cylinder refilling, exchanges and doorstep delivery, supported by a 24/7 dispatch line. Customers can order online, on WhatsApp or by phone, and every movement of gas is tracked from storage to point of delivery.",
    ],
    scope: [
      "Cylinder refilling and exchange at both branches",
      "Scheduled doorstep delivery for homes and businesses",
      "Bulk LPG supply for hotels, schools and industrial kitchens",
      "Cylinder safety inspection and recertification handling",
      "Emergency and same-day refill dispatch within Port Harcourt",
    ],
    capabilities: [
      "Dual-branch storage and refill capacity",
      "Branded delivery fleet with trained, safety-vested attendants",
      "Online ordering portal with rider-based last-mile delivery",
      "Strict adherence to NMDPRA and DPR safety standards",
    ],
  },
  {
    slug: "oil-gas-operational-support-contracts",
    icon: Flame,
    category: "Oil & Gas Support",
    title: "Operational Support Contracts",
    location: "Rivers State",
    description:
      "Mobilisation, logistics and site support services for upstream and midstream operators and their prime contractors.",
    status: "Available for Tender",
    sector: "Upstream / Midstream Oil & Gas",
    clientTypes: [
      "E&P operators",
      "Oil servicing majors",
      "Prime and sub-contractors",
    ],
    overview: [
      "Malique provides on-ground operational support to oil and gas operators working across Rivers State and the wider Niger Delta region — the kind of work that keeps projects moving: mobilisation, materials handling, camp logistics and site support.",
      "We engage under both term contracts and project-specific scopes, with the flexibility to scale crews and equipment quickly when a campaign goes live.",
    ],
    scope: [
      "Mobilisation and demobilisation of crews, plant and equipment",
      "Site logistics, laydown management and materials handling",
      "Camp facility support and consumables supply",
      "Waste management coordination and housekeeping at operational sites",
      "Local content compliance support and community liaison",
    ],
    capabilities: [
      "Experienced field supervisors familiar with Niger Delta operations",
      "Access to haulage, fabrication and workforce pools on demand",
      "HSE-first execution with documented toolbox meetings and JSA",
      "Working relationships with operators' procurement and project teams",
    ],
  },
  {
    slug: "industrial-fabrication-civil-works",
    icon: HardHat,
    category: "Engineering & Construction",
    title: "Industrial Fabrication & Civil Works",
    location: "Port Harcourt & Environs",
    description:
      "Pipeline fabrication, plant maintenance and civil construction executed to engineering specification with HSE supervision.",
    status: "Available for Tender",
    sector: "Engineering / Construction",
    clientTypes: [
      "Industrial plants",
      "Depots and terminals",
      "Government and private building clients",
    ],
    overview: [
      "Our engineering and construction division handles fabrication, installation and maintenance work for energy infrastructure and commercial facilities around Port Harcourt.",
      "Every job is run under a documented HSE plan with qualified supervisors on site — from structural steel and piping fabrication to civil and renovation packages.",
    ],
    scope: [
      "Structural steel, skid and vessel support fabrication",
      "Pipeline spooling, welding and installation",
      "Plant shutdown maintenance and mechanical fitting",
      "Civil works: foundations, access roads, drainage and site development",
      "Building construction, renovation and facility maintenance",
    ],
    capabilities: [
      "Certified welders and fabricators under supervised crews",
      "Workshop and field fabrication capacity",
      "Engineering review, QA/QC and as-built documentation",
      "Dedicated HSE officers on active sites",
    ],
  },
  {
    slug: "residential-commercial-development",
    icon: Building2,
    category: "Real Estate",
    title: "Residential & Commercial Development",
    location: "Rivers State",
    description:
      "Property development and facility management opportunities — from land acquisition to finished, titled developments.",
    status: "Ongoing",
    sector: "Real Estate / Property",
    clientTypes: [
      "Individual homebuyers",
      "Investors",
      "Corporate occupiers",
      "Landowners (joint venture)",
    ],
    overview: [
      "Malique's property division takes developments from raw land to delivered asset — acquisition advisory, documentation, construction oversight and facility management.",
      "We work with verified titles and partner professionals (surveyors, town planners, legal counsel) so that every transaction and development stands on clean documentation.",
    ],
    scope: [
      "Land acquisition due diligence and title verification",
      "Residential estates and housing development projects",
      "Commercial spaces, shops and offices — build and manage",
      "Facility management for completed properties",
      "Joint-venture development structures with landowners",
    ],
    capabilities: [
      "End-to-end development supervision",
      "In-house construction capability through our engineering division",
      "Transparent documentation process with legal partners",
      "Post-handover facility management contracts",
    ],
  },
  {
    slug: "commodity-equipment-supply",
    icon: Package,
    category: "Procurement",
    title: "Commodity & Equipment Supply",
    location: "Nationwide",
    description:
      "End-to-end procurement for corporate and government clients: sourcing, inspection, delivery and documentation.",
    status: "Available for Tender",
    sector: "Procurement / General Contracts",
    clientTypes: [
      "Corporations",
      "Government agencies",
      "NGOs and institutions",
      "Industrial offtakers",
    ],
    overview: [
      "Our procurement desk sources commodities, industrial equipment and consumables on behalf of clients — managing everything from vendor selection and price negotiation to inspection, shipping and delivery documentation.",
      "As a general and professional contract firm, we handle both one-off supply packages and standing procurement arrangements.",
    ],
    scope: [
      "Sourcing and supplier vetting (local and international)",
      "Commodity supply: food items, industrial consumables, chemicals",
      "Equipment supply: pumps, generators, tools, safety gear",
      "Pre-shipment inspection and quality verification",
      "Delivery, documentation and reconciliation to client stores",
    ],
    capabilities: [
      "Established vendor network across major Nigerian markets",
      "Import documentation and clearing coordination",
      "Inspection regime before payment release",
      "Ability to service multi-state deliveries through our haulage arm",
    ],
  },
  {
    slug: "energy-haulage-logistics",
    icon: Truck,
    category: "Transportation & Haulage",
    title: "Energy Product Haulage & Logistics",
    location: "Multi-State",
    description:
      "Scheduled distribution and heavy haulage for energy products, plant equipment and commercial cargo.",
    status: "Active",
    sector: "Transportation / Logistics",
    clientTypes: [
      "LPG marketers",
      "Construction firms",
      "Equipment owners",
      "Commercial cargo senders",
    ],
    overview: [
      "Transportation and haulage is the backbone that connects our branches, customers and project sites — and we offer that same capacity as a standalone service.",
      "From scheduled product distribution to heavy equipment moves, loads are planned, documented and tracked to delivery confirmation.",
    ],
    scope: [
      "LPG and energy product haulage between depots and offload points",
      "Heavy haulage: plant, machinery and structural loads",
      "Scheduled commercial distribution runs (multi-state)",
      "Construction material logistics (sand, chippings, blocks, steel)",
      "Dedicated delivery runs for our own e-commerce customers",
    ],
    capabilities: [
      "Managed fleet with driver welfare and vehicle inspection regimes",
      "Route planning and delivery scheduling by the dispatch desk",
      "Load documentation: waybills, gate passes, delivery notes",
      "Integration with our depot and branch network for fast turnaround",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
