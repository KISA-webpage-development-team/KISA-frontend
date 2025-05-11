// TipModal
// - use paymentMethodId and customerId from pay page to process tip payment

import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";

interface TipModalProps {
  totalPrice: number;
  paymentMethodId: string;
  customerName: string;
  customerEmail: string;
  customerID: string;
  onClose: () => void;
}

export default function TipModal({
  totalPrice,
  paymentMethodId,
  customerName,
  customerEmail,
  customerID,
  onClose,
}: TipModalProps) {
  const [tipAmount, setTipAmount] = useState<number>((totalPrice * 12) / 100);
  const [tipPercentage, setTipPercentage] = useState<string>("12");
  const [loading, setLoading] = useState(false);

  const handleTipSelection = (value: string) => {
    setTipPercentage(value);
    const calculatedTip = (totalPrice * parseInt(value)) / 100;
    setTipAmount(calculatedTip);
  };

  const handleSubmitTip = async () => {
    if (tipAmount === 0) {
      const searchParams = new URLSearchParams({ tip_completed: "true" });
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${searchParams}`
      );
      onClose();
      return;
    }

    setLoading(true);
    try {
      const createTipIntentResponse = await fetch(
        "/api/create-tip-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipAmount: tipAmount * 100, // currency format (dollars to cents)
            paymentMethodId,
            customer: {
              name: customerName,
              email: customerEmail,
              id: customerID,
            },
          }),
        }
      );

      const createTipResult = await createTipIntentResponse.json();
      // console.log("createTipResult", createTipResult);
      if (!createTipResult.success) {
        throw new Error("팁 결제 실패");
      }

      alert(`팁 결제가 성공적으로 완료되었습니다! $${tipAmount.toFixed(2)}`);

      const searchParams = new URLSearchParams({ tip_completed: "true" });
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${searchParams}`
      );

      onClose();
    } catch (error) {
      alert("팁 결제 중 오류가 발생했습니다.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="bg-white rounded-lg shadow-lg 
      flex flex-col items-center justify-center 
      px-8 py-6 z-50 gap-4 max-w-[85%]"
      >
        <h2 className="text-lg">
          웹사이트 개발을 위해 힘쓰는 KISA Dev 팀에게 팁을 남겨주시면
          감사하겠습니다.
        </h2>
        <Select
          label="Choose a tip amount"
          selectedKeys={[tipPercentage]}
          onSelectionChange={(value) =>
            handleTipSelection(Array.from(value)[0] as string)
          }
          isRequired
          className="w-full"
          size="lg"
        >
          <SelectItem key="0">No Tip</SelectItem>
          <SelectItem key="10">10%</SelectItem>
          <SelectItem key="12">12%</SelectItem>
          <SelectItem key="15">15%</SelectItem>
        </Select>
        <div className="flex w-full justify-end">
          {/* <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg"
          >
            Cancel
          </button> */}
          <button
            onClick={handleSubmitTip}
            className={`px-4 py-2 rounded-lg ${sejongHospitalBold.className} bg-blue-500 text-white`}
          >
            {loading ? "결제중..." : "Submit Tip"}
          </button>
        </div>
      </div>
    </div>
  );
}
