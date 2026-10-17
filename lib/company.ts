// Canonical company contact + branch data for the marketing website.
// Kept as a local module (see apps/web/lib/format.ts header) so this app has no
// runtime/build dependency on workspace packages. This is the single source of
// truth for the public email, per-branch phone numbers and operating hours.

export const COMPANY_EMAIL = "maliqueoilandgasltd@gmail.com";
export const PRIMARY_TEL = "+2349031628721"; // header/CTA tap target (Igboh Etche)

export const BRANCHES = [
  {
    name: "Igboh Etche",
    address:
      "Plot 3, Okoche New Layout, Edegelem, Igboh Etche, Etche LGA, Rivers State, Nigeria",
    phones: ["+234 903 162 8721", "+234 915 597 7415"],
    hours: "Mon–Sat: 7AM–7PM, Sun: 10AM–7PM",
    lat: 5.4439,
    lng: 7.2831,
  },
  {
    name: "Elelenwo",
    address: "Off Odani Road, Elelenwo, Port-Harcourt, Rivers State, Nigeria",
    phones: ["+234 903 056 8003"],
    hours: "Mon–Sat: 7AM–7PM, Sun: 12PM–7PM",
    lat: 4.7135,
    lng: 7.0765,
  },
];

export const TEL = (p: string) => `tel:${p.replace(/\s/g, "")}`;
