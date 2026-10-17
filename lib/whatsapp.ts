// Central WhatsApp link used by the "join our group" calls-to-action.
// Prefer a real group invite (https://chat.whatsapp.com/<code>) set via env.
// When none is configured, fall back to a direct chat with Malique that asks
// to be added, so the button is always functional.
import { formatNaira } from "./format";

export const WHATSAPP_GROUP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL?.trim() ||
  "https://wa.me/2349155977415?text=Hello%20Malique%2C%20please%20add%20me%20to%20your%20WhatsApp%20update%20group%20so%20I%20stay%20informed%20on%20prices%20and%20news.";

// Business line that receives paid-order follow-ups (contact-page sales desk).
const WA_ORDER_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "2349031628721";

export interface OrderFollowupInput {
  orderNumber: string;
  reference?: string | null;
  items: {
    name: string;
    sizeKg?: number | string | null;
    quantity: number;
    lineTotal: number | string;
  }[];
  subtotal: number | string;
  deliveryFee: number | string;
  total: number | string;
  customer: { name?: string | null; phone?: string | null; email?: string | null };
  deliveryAddress?: string | null;
  branchName?: string | null;
}

/**
 * wa.me deep link pre-filled with the just-paid order and the customer's
 * full details, so the office can follow up immediately. WhatsApp opens the
 * chat with the text ready — the client taps send.
 */
export function orderFollowupWhatsAppUrl(o: OrderFollowupInput): string {
  const lines: string[] = [
    "*NEW PAID ORDER — Malique Oil & Gas*",
    `Order: ${o.orderNumber} • Paid via Flutterwave${o.reference ? ` • Ref: ${o.reference}` : ""}`,
    "",
    "*Items*",
  ];
  for (const item of o.items) {
    const size =
      item.sizeKg != null && Number(item.sizeKg) > 0
        ? ` (${Number(item.sizeKg)}kg)`
        : "";
    lines.push(
      `• ${item.name}${size} x${item.quantity} = ${formatNaira(item.lineTotal)}`
    );
  }
  lines.push(
    "",
    `Subtotal: ${formatNaira(o.subtotal)}`,
    `Delivery: ${formatNaira(o.deliveryFee)}`,
    `*TOTAL: ${formatNaira(o.total)}*`,
    "",
    "*Customer*"
  );
  if (o.customer.name) lines.push(`Name: ${o.customer.name}`);
  if (o.customer.phone) lines.push(`Phone: ${o.customer.phone}`);
  if (o.customer.email) lines.push(`Email: ${o.customer.email}`);
  lines.push(
    o.deliveryAddress
      ? `Delivery: ${o.deliveryAddress}`
      : `Pickup at ${o.branchName ?? "branch"}`,
    "",
    "Please confirm this order for immediate dispatch."
  );
  return `https://wa.me/${WA_ORDER_NUMBER}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
}
