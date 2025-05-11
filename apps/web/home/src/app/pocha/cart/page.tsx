"use client";

// UI
import PochaBackHeading from "@/features/pocha/components/shared/PochaBackHeading";
import PochaHorizontalDivider from "@/features/pocha/components/shared/PochaHorizontalDivider";
import EmptyCartAlert from "@/features/pocha/components/cart/EmptyCartAlert";
import CartList from "@/features/pocha/components/cart/CartList";
import CartTotalSummary from "@/features/pocha/components/cart/CartTotalSummary";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import ProceedToPaymentButton from "@/features/pocha/components/cart/ProceedToPaymentButton";

// hooks
import usePochaID from "@/features/pocha/hooks/usePochaID";
import useCart from "@/features/pocha/hooks/useCart";
import { useSession } from "next-auth/react";

// types
import { UserSession } from "@/lib/next-auth/types";

export default function PochaCartPage() {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  // get pochaID from URL or API to use in cart
  const { pochaID, status: pochaIDStatus, error: pochaIDError } = usePochaID();

  // get cart items and total amount
  const {
    cart,
    status: cartStatus,
    error: cartError,
    totalAmount,
    handleQuantityChange,
  } = useCart(session?.user?.email, pochaID);

  if (
    sessionStatus === "loading" ||
    pochaIDStatus === "loading" ||
    cartStatus === "loading"
  ) {
    return <LoadingSpinner />;
  }

  if (pochaIDStatus === "error" || cartStatus === "error") {
    throw new Error(pochaIDError || cartError || "Unexpected error occurred");
  }

  return (
    <section className="flex flex-col w-full min-h-screen !gap-0">
      <PochaBackHeading title="Cart" />
      <PochaHorizontalDivider />

      {Object.keys(cart)?.length === 0 ? (
        <EmptyCartAlert />
      ) : (
        <>
          <div className="flex-grow">
            <CartList cart={cart} handleQuantityChange={handleQuantityChange} />
          </div>
          <div
            className="sticky bottom-0 self-stretch w-full
           bg-white pb-4 gap-2 z-50"
          >
            <PochaHorizontalDivider />
            <CartTotalSummary totalAmount={totalAmount} />
            <ProceedToPaymentButton pochaid={pochaID} />
          </div>
        </>
      )}
    </section>
  );
}
