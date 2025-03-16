// lib/stripe/stripeClient.ts
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY } from "@/constants/env";
// change KEY to KEY_LIVE if in production
if (!STRIPE_PUBLIC_KEY) {
  throw new Error("Stripe publishable key is not set");
}

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export default stripePromise;
