// Flutterwave inline checkout helper (flutterwave-js). Both the order wizard
// and the order detail page go through collectFlutterwavePayment; in promise
// mode (no redirectUrl) the library resolves with { status, tx_ref, flw_ref }
// when the popup finishes, keeping the shopper on-site throughout.
export const FLW_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "";

const FLW_SCRIPT_SRC = "https://api.flutterwave.com/download/flutterwave-js.js";

export interface FlutterWaveResult {
  status?: string;
  tx_ref?: string;
  flw_ref?: string;
}

declare global {
  interface Window {
    flutterWave?: {
      setupTestMode: (key: string) => void;
      setupLiveMode: (key: string) => void;
      collect: (options: Record<string, unknown>) => Promise<FlutterWaveResult>;
    };
  }
}

function loadFlutterwaveScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject();
    if (window.flutterWave) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src='${FLW_SCRIPT_SRC}']`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }
    const script = document.createElement("script");
    script.src = FLW_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
}

export interface CollectOptions {
  /** Naira amount — always taken from the server-computed order total. */
  amount: number;
  /** Gateway reference minted by POST /payments/init. */
  txRef: string;
  email: string;
  name?: string | null;
  phone?: string | null;
  orderNumber?: string;
}

/**
 * Opens the Flutterwave popup (card / transfer / USSD) and resolves with the
 * gateway result. Callers must treat `status === "successful"` as the only
 * paid outcome and still run server-side verification.
 */
export async function collectFlutterwavePayment(
  opts: CollectOptions
): Promise<FlutterWaveResult> {
  await loadFlutterwaveScript();
  const fw = window.flutterWave;
  if (!fw) {
    throw new Error("Payment window did not load. Please try again.");
  }
  if (FLW_PUBLIC_KEY.startsWith("PK_test_")) {
    fw.setupTestMode(FLW_PUBLIC_KEY);
  } else {
    fw.setupLiveMode(FLW_PUBLIC_KEY);
  }
  return fw.collect({
    country: "NG",
    currency: "NGN",
    amount: opts.amount,
    txRef: opts.txRef,
    title: "Malique Oil and Gas",
    message: opts.orderNumber ? `Order ${opts.orderNumber}` : "Order payment",
    meta: {
      customer: {
        name: opts.name || "",
        email: opts.email,
        phonenumber: opts.phone || "",
      },
    },
    paymentOptions: ["card", "banktransfer", "ussd", "mobilemoney"],
    "3DS": true,
    isRenderPage: false,
    // Keep the shopper on-site; the promise below is the completion hook.
    redirectUrl: false,
  });
}
