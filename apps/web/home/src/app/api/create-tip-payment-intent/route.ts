import { STRIPE_SECRET_KEY } from "@/constants/env";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(STRIPE_SECRET_KEY as string);

// Tip Payment Intent 생성
export async function POST(request: NextRequest) {
  try {
    // customer: email, name
    const { tipAmount, paymentMethodId, customer } = await request.json();

    if (
      !tipAmount ||
      !paymentMethodId ||
      !customer.email ||
      !customer.name ||
      !customer.id
    ) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const tipPaymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(tipAmount), // cents 단위
      currency: "usd",
      payment_method: paymentMethodId, // 기존 카드 재사용
      customer: customer.id,
      metadata: {
        note: "Tip for dev team",
      },
    });

    if (!tipPaymentIntent.client_secret) {
      throw new Error("팁 결제 Intent 생성 실패");
    }

    // confirm the payment intent
    const confirmPaymentIntent = await stripe.paymentIntents.confirm(
      tipPaymentIntent.id,
      {
        return_url: `https://umichkisa.com/pocha/pay-success`,
      }
    );

    return NextResponse.json({
      // clientSecret: tipPaymentIntent.client_secret,
      // paymentIntentId: tipPaymentIntent.id,
      success: true,
    });
  } catch (error) {
    console.error("Error creating tip payment intent:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
