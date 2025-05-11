/*
  ViewCartButton
  - Button to view cart
  - Navigates to cart page with pochaID
*/

import React from "react";
import PochaButton from "../shared/PochaButton";
import PochaCartIcon from "@/final_refactor_src/components/icon/PochaCartIcon";

interface ViewCartButtonProps {
  pochaID: number;
}

export default function ViewCartButton({ pochaID }: ViewCartButtonProps) {
  const handleViewCart = () => {
    // navigate to cart page with pochaID
    const queryParams = `pochaid=${pochaID}`;
    window.location.href = `/pocha/cart?${queryParams}`;
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full flex justify-center bg-transparent
     pb-5 z-30"
    >
      <PochaButton
        label="View Cart"
        icon={<PochaCartIcon />}
        onClick={handleViewCart}
        widthPercentage={75}
      />
    </div>
  );
}
