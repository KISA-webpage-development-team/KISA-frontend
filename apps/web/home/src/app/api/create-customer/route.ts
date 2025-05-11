import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "@/constants/env";

const stripe = new Stripe(STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    let stripeCustomer;

    // Check if a customer exists, or create a new one.
    const existingCustomer = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomer.data.length === 0) {
      // Create a new customer if none exists
      stripeCustomer = await stripe.customers.create({
        email: email,
        name: name, // Pass the name when creating the customer
      });
    } else {
      stripeCustomer = existingCustomer.data[0];

      // Optionally update the customer's name if it's missing or outdated
      if (stripeCustomer.name !== name) {
        await stripe.customers.update(stripeCustomer.id, {
          name: name,
        });
      }
    }

    return NextResponse.json({ customerID: stripeCustomer.id });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
}
