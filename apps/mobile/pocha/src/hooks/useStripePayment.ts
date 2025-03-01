// hooks/useStripePayment.ts
import { FormEvent, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { checkCartStock, notifyPayResult } from "@/apis/pocha/mutations";
import { useRouter } from "next/navigation";

const useStripePayment = (
  pochaID: number,
  totalPrice: number,
  userEmail: string,
  fullname: string,
  underAge: boolean,
  ageCheckRequired: boolean
) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  /** Step 1: Validate Payment Form */
  const validatePaymentForm = async () => {
    const { error } = await elements.submit();
    if (error) throw new Error(error.message);
  };

  /** Step 2: Check User Age */
  const checkUserUnderAge = () => {
    if (ageCheckRequired && underAge) {
      throw new Error("미성년자는 주류를 주문할 수 없습니다.");
    }
  };

  /** Step 3: Check Inventory */
  const checkCartInventory = async () => {
    try {
      const res = await checkCartStock(userEmail, pochaID);
      if (!res?.isStocked) {
        throw new Error("재고가 부족합니다.");
      }
    } catch (error) {
      throw new Error("Error while checking inventory.");
    }
  };

  /** Step 4: Process Payment */
  const processPayment = async () => {
    try {
      // step 1. 고객 생성 또는 기존 고객 확인
      const customerResponse = await fetch("/api/create-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, name: fullname }),
      });

      const { customerID } = await customerResponse.json();

      if (!customerID) throw new Error("고객 생성에 실패했습니다.");

      // create payment method
      // const createPaymentMethodResponse = await stripe.createPaymentMethod({
      //   elements,
      // });
      // if (createPaymentMethodResponse.error) {
      //   throw new Error("결제 수단 생성 실패");
      // }

      // const paymentMethodID = createPaymentMethodResponse.paymentMethod.id;

      // console.log("paymentMethodID: ", paymentMethodID);

      // step 2. paymentIntent 생성 (customerID 포함)
      const createPaymentIntentResponse = await fetch(
        "/api/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalPrice * 100, // cents 단위로 변환
            customerID: customerID, // ✅ 고객 ID 포함
          }),
        }
      );

      const { clientSecret } = await createPaymentIntentResponse.json();
      if (!clientSecret) throw new Error("PaymentIntent 생성에 실패했습니다.");

      // Step 3: 결제 진행 및 PaymentMethod 생성 (confirmPayment)
      // this is actual payment, confirm payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,

        // [NOTE] for production, return_url should be the actual URL
        confirmParams: {
          return_url: `https://umichkisa.com/pocha/pay-success?pochaid=${pochaID}&amount=${totalPrice}`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Error while confirming payment:", error);
        setErrorMessage(error.message);
        throw new Error(error.message);
      }

      // // ✅ Step 4: PaymentMethod를 Customer에 연결
      // const attachPaymentMethodResponse = await fetch(
      //   "/api/attach-payment-method",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       paymentMethodID: paymentIntent.payment_method,
      //       customerID: customerID,
      //     }),
      //   }
      // );

      // const attachResult = await attachPaymentMethodResponse.json();
      // if (!attachResult.success) {
      //   throw new Error("PaymentMethod 연결에 실패했습니다.");
      // }

      // Step 5: 카트 업데이트
      // notify pay result with success
      const res = await notifyPayResult(userEmail, pochaID, {
        result: "success",
      });
      if (!res) {
        throw new Error("Error while updating cart status");
      }

      // store necessary data in localStorage
      localStorage.setItem(
        "paymentMethodId",
        paymentIntent.payment_method as string
      );
      localStorage.setItem("customerName", fullname);
      localStorage.setItem("customerEmail", userEmail);
      localStorage.setItem("customerID", customerID);

      alert("결제가 완료되었습니다.");

      router.push(`/pocha/pay-success?pochaid=${pochaID}&amount=${totalPrice}`);
    } catch (error) {
      alert("결제 오류가 발생했습니다. 카드 정보를 확인해주세요");
      setErrorMessage(error.message || "결제 실패");
      // notify pay result with failure
      const res = await notifyPayResult(userEmail, pochaID, {
        result: "failure",
      });

      if (!res) {
        throw new Error("Error while updating cart status");
      }
    }
  };

  /** Main Submit Function */
  const handlePaymentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    // 0. check if stripe, elements, userAgeStatus is loaded
    if (!stripe || !elements) {
      return;
    }

    try {
      // Step 1: validate payment form
      await validatePaymentForm();

      // Step 2: check user age
      checkUserUnderAge();

      // Step 3: check cart inventory
      await checkCartInventory();

      // Step 4: process payment
      await processPayment();
    } catch (error) {
      console.error("Payment failed: ", error);
      setErrorMessage(error.message || "결제 실패");
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePaymentSubmit,
    loading,
    errorMessage,
  };
};

export default useStripePayment;
