"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import PaymentSubmitForm from "@/features/pocha/components/pay/PaymentSubmitForm";

// Stripe
import { Elements } from "@stripe/react-stripe-js"; // stripe payment element
import stripePromise from "@/lib/stripe/stripeClient";
import convertToSubcurrency from "@/lib/stripe/convertToSubcurrency";

import { useRouter } from "next/navigation";
import usePay from "@/features/pocha/hooks/usePay";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import usePochaID from "@/features/pocha/hooks/usePochaID";
import PochaBackHeading from "@/features/pocha/components/shared/PochaBackHeading";
import PochaHorizontalDivider from "@/features/pocha/components/shared/PochaHorizontalDivider";
import useUserAge from "@/features/pocha/hooks/useUserAge";

export default function PayPage() {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const router = useRouter();

  const { pochaID, status: pochaIDStatus, error: pochaIDError } = usePochaID();

  const {
    amount,
    fee,
    totalPrice,
    ageCheckRequired,
    status: payReadyStatus,
  } = usePay(session?.user?.email, session?.token, pochaID);

  const { underAge, status: userAgeStatus, fullname } = useUserAge(session);

  const isLoading =
    sessionStatus === "loading" ||
    pochaIDStatus === "loading" ||
    payReadyStatus === "loading" ||
    userAgeStatus === "loading";
  const hasError =
    pochaIDStatus === "error" ||
    payReadyStatus === "error" ||
    userAgeStatus === "error" ||
    !totalPrice;

  if (isLoading) return <LoadingSpinner />;
  if (hasError) {
    router.push("/pocha");
    return null;
  }

  return (
    <section className="!gap-0">
      <PochaBackHeading title="Pay" />
      <PochaHorizontalDivider />

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(totalPrice), // dollars to cents, stripe accepts in the most basic? currency unit
          currency: "usd",
          setup_future_usage: "off_session",
        }}
      >
        <PaymentSubmitForm
          amount={amount}
          fee={fee}
          totalPrice={totalPrice}
          pochaID={pochaID}
          ageCheckRequired={ageCheckRequired}
          userEmail={session?.user?.email}
          underAge={underAge}
          fullname={fullname}
        />
      </Elements>
    </section>
  );
}
