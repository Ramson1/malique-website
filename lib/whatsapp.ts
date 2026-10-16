// Central WhatsApp link used by the "join our group" calls-to-action.
// Prefer a real group invite (https://chat.whatsapp.com/<code>) set via env.
// When none is configured, fall back to a direct chat with Malique that asks
// to be added, so the button is always functional.
export const WHATSAPP_GROUP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL?.trim() ||
  "https://wa.me/2349155977415?text=Hello%20Malique%2C%20please%20add%20me%20to%20your%20WhatsApp%20update%20group%20so%20I%20stay%20informed%20on%20prices%20and%20news.";
