"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import PochaButton from "@/features/pocha/components/shared/PochaButton";
// import TipModal from "@/features/pocha/components/pay/TipModal";

export default function PaySuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // extract tip-success from searchParams
  const tipCompleted = searchParams.get("tip_completed");
  const pochaID = searchParams.get("pochaid");
  const amount = searchParams.get("amount");

  // [WIP] tip-related states
  const [showTipModal, setShowTipModal] = useState(true);
  const [paymentMethodId, setPaymentMethodId] = useState<string>();
  const [customerName, setCustomerName] = useState<string>();
  const [customerEmail, setCustomerEmail] = useState<string>();
  const [customerID, setCustomerID] = useState<string>();

  useEffect(() => {
    if (tipCompleted) {
      setShowTipModal(false);
    }
  }, [tipCompleted]);

  // decode stripe token to process tip payment
  useEffect(() => {
    const storedPaymentMethodId = localStorage.getItem("paymentMethodId");
    const storedCustomerName = localStorage.getItem("customerName");
    const storedCustomerEmail = localStorage.getItem("customerEmail");
    const storedCustomerID = localStorage.getItem("customerID");

    if (storedPaymentMethodId && storedCustomerName && storedCustomerEmail) {
      setPaymentMethodId(storedPaymentMethodId);
      setCustomerName(storedCustomerName);
      setCustomerEmail(storedCustomerEmail);
      setCustomerID(storedCustomerID);
    } else {
      if (!showTipModal) {
        return;
      } else {
        router.replace("/pocha");
        return;
      }
    }
  }, [router, showTipModal]);

  useEffect(() => {
    if (tipCompleted) {
      setShowTipModal(false);
    }
  }, [tipCompleted]);

  // decode stripe token to process tip payment
  useEffect(() => {
    const storedPaymentMethodId = localStorage.getItem("paymentMethodId");
    const storedCustomerName = localStorage.getItem("customerName");
    const storedCustomerEmail = localStorage.getItem("customerEmail");
    const storedCustomerID = localStorage.getItem("customerID");

    if (storedPaymentMethodId && storedCustomerName && storedCustomerEmail) {
      setPaymentMethodId(storedPaymentMethodId);
      setCustomerName(storedCustomerName);
      setCustomerEmail(storedCustomerEmail);
      setCustomerID(storedCustomerID);
    } else {
      if (!showTipModal) {
        return;
      } else {
        router.replace("/pocha");
        return;
      }
    }
  }, [router, showTipModal]);

  useEffect(() => {
    // Add a new entry to prevent direct back navigation
    window.history.pushState({ from: "pay-success" }, "", window.location.href);

    // Handle the popstate (back/forward button) event
    const handlePopState = () => {
      // Navigate to /pocha instead of going back
      router.replace("/pocha");
    };

    window.addEventListener("popstate", handlePopState);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  const directToMenuList = () => {
    setTimeout(() => {
      router.push("/pocha");
    }, 150);
  };

  const directToOrders = () => {
    setTimeout(() => {
      router.push("/pocha?tab=orders");
    }, 150);
  };

  if (!tipCompleted && (!pochaID || !amount)) {
    window.location.href = "/pocha";
  }

  return (
    <section
      className="flex flex-col justify-center items-center h-full
    gap-6"
    >
      {/* {showTipModal && paymentMethodId && (
        <TipModal
          totalPrice={parseFloat(amount)}
          paymentMethodId={paymentMethodId}
          customerName={customerName}
          customerEmail={customerEmail}
          customerID={customerID}
          onClose={() => setShowTipModal(false)}
        />
      )} */}
      <span
        className={`${sejongHospitalBold.className} text-center text-black text-2xl`}
      >
        결제가 완료되었습니다
      </span>
      <figure
        className="relative w-[12rem] h-[12rem] 
      flex justify-center items-center flex-shrink-0 -z-10"
      >
        <Image
          src={`/images/check_circle.png`}
          alt="Success Icon"
          fill
          sizes="12rem"
          className="object-contain"
        />
      </figure>
      {!showTipModal && (
        <span className={`${sejongHospitalBold.className} text-lg text-center`}>
          팁을 주셔서 감사합니다! Thank you for the tip!
        </span>
      )}
      <div className="flex flex-col items-center gap-4 w-full">
        <PochaButton
          label="주문 내역 보기"
          onClick={directToOrders}
          widthPercentage={85}
        />

        <PochaButton
          label="홈으로 돌아가기"
          onClick={directToMenuList}
          widthPercentage={85}
        />
      </div>
    </section>
  );
  //TEST
}
