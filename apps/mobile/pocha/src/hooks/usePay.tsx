import { PayInfo } from "@/types/pocha";
import { useEffect, useState } from "react";
import { getPayInfo } from "@/apis/pocha/queries";
import {
  calculateStripeFee,
  calculateStripeTotalPrice,
} from "../utils/calculateStripeFee";

const usePay = (email: string, token: string, pochaID: number) => {
  const [payInfo, setPayInfo] = useState<PayInfo>();
  const [tip, setTip] = useState<number>(0);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const fetchPayInfo = async () => {
      try {
        const res = await getPayInfo(email, pochaID, token);
        // const res = await getPayInfoMock(email, pochaID, token);

        setPayInfo(res);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching pay info: ", error);
        setStatus("error");
      }
    };

    if (pochaID && token) {
      fetchPayInfo();
    }
  }, [email, pochaID, token]);

  return {
    amount: payInfo?.amount,
    fee: calculateStripeFee(payInfo?.amount),
    tip,
    setTip,
    totalPrice: calculateStripeTotalPrice(payInfo?.amount),
    ageCheckRequired: payInfo?.ageCheckRequired === "true" ? true : false,
    status,
  };
};

export default usePay;
