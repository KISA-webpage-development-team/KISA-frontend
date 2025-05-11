// PaymentSubmitForm.tsx

// [UI]
// - PaymentElement from Stripe (built-in component)
// - Total Price + Transaction Fee Display
// - Submit Button

// [NOTE] I wanted to make a separate component only for the form.
// However, built-in PaymentElement component requires submit button to be included in the form to display error msgs

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/stripe/convertToSubcurrency";
import { useRouter } from "next/navigation";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import PaySummaryCard from "./PaySummaryCard";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";

// hooks
import useStripePayment from "../../hooks/useStripePayment";
import PayButton from "./PayButton";

interface PaymentSubmitFormProps {
  amount: number;
  fee: number;
  totalPrice: number;
  pochaID: number;
  ageCheckRequired: boolean;
  userEmail: string;
  underAge: boolean;
  fullname: string;
}

export default function PaymentSubmitForm({
  amount,
  fee,
  totalPrice,
  pochaID,
  ageCheckRequired,
  userEmail,
  underAge,
  fullname,
}: PaymentSubmitFormProps) {
  // [NOTE] useStripe and useElements should be called inside <Elements> wrapper
  const stripe = useStripe();
  const elements = useElements();

  const {
    handlePaymentSubmit,
    loading: paymentLoading,
    errorMessage,
  } = useStripePayment(
    pochaID,
    totalPrice,
    userEmail,
    fullname,
    underAge,
    ageCheckRequired
  );

  // useEffect(() => {
  //   const createPaymentIntent = async () => {
  //     // fetch client secret from server
  //     fetch("/api/create-payment-intent", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         amount: convertToSubcurrency(totalPrice),
  //         customer: {
  //           email: userEmail,
  //           name: fullname,
  //         },
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setClientSecret(data.clientSecret);
  //       });
  //   };

  //   if (userEmail && fullname && totalPrice) {
  //     if (!clientSecret) {
  //     createPaymentIntent();
  //     }
  //   }
  // }, [totalPrice, userEmail, fullname, clientSecret]);

  // if (!clientSecret || !stripe || !elements) {
  if (!stripe || !elements) {
    return (
      <LoadingSpinner fullScreen={false} label="결제 정보를 가져오는 중..." />
    );
  }

  return (
    <form
      onSubmit={handlePaymentSubmit}
      className="relative w-full
    flex flex-col gap-4
    bg-white rounded-md py-4"
    >
      {/* Payment form input */}
      {/* {clientSecret && ( */}
      <PaymentElement
        options={{
          layout: "accordion",
          paymentMethodOrder: ["apple_pay", "google_pay", "card"],
        }}
      />
      {/* )} */}
      {/*?*/}
      {/* Total Price + Transaction fee display */}
      <PaySummaryCard amount={amount} fee={fee} totalPrice={totalPrice} />

      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

      {/* Submit button (sticky on the bottom) */}
      <PayButton loading={paymentLoading} totalPrice={totalPrice} />
    </form>
  );
}

// [NOTE]: need better refactoring
