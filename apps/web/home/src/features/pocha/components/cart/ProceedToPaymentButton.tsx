import React from "react";
import PochaButton from "../shared/PochaButton";

type PaymentProps = {
  pochaid: number;
};

export default function ProceedToPaymentButton({ pochaid }: PaymentProps) {
  const handlePaymentClick = () => {
    const queryParams = `pochaid=${pochaid}`;
    window.location.href = `/pocha/pay?${queryParams}`;
  };

  return (
    <div className="w-full flex justify-center">
      <PochaButton label="Checkout" onClick={handlePaymentClick} />
    </div>
  );
}
