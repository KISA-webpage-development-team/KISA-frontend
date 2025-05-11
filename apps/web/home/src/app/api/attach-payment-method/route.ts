import { STRIPE_SECRET_KEY } from "@/constants/env";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(STRIPE_SECRET_KEY as string);

// Tip Payment Intent 생성
export async function POST(request: NextRequest) {
  try {
    // customer: email, name
    const { paymentMethodID, customerID } = await request.json();
    console.log("customer: ", customerID);
    console.log("paymentMethodID: ", paymentMethodID);
    if (!paymentMethodID || !customerID) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const attachResult = await stripe.paymentMethods.attach(paymentMethodID, {
      customer: customerID,
    });

    console.log("attachResult:", attachResult);
    await stripe.customers.update(customerID, {
      invoice_settings: {
        default_payment_method: paymentMethodID,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error attaching payment method:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
