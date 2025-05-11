import React from "react";
import PochaButton from "../shared/PochaButton";

interface PayButtonProps {
  loading: boolean;
  totalPrice: number;
}

export default function PayButton({ loading, totalPrice }: PayButtonProps) {
  return (
    <div className="w-full">
      <PochaButton
        label={!loading ? `Pay $${totalPrice}` : "Loading..."}
        disabled={loading}
        type="submit" // ✅ 폼의 제출을 트리거
      />
    </div>
  );
}
