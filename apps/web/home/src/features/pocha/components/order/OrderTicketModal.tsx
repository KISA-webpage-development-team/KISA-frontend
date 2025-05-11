import PochaCloseIcon from "@/final_refactor_src/components/icon/PochaCloseIcon";
import { OrderItem } from "@/types/pocha";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";
import React from "react";

export default function OrderTicketModal({
  orderItem,
  setIsOpenModal,
}: {
  orderItem: OrderItem;
  setIsOpenModal: (isOpen: boolean) => void;
}) {
  const { orderItemID, menu } = orderItem;

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/30">
      <div className="relative z-[100000] w-full h-full flex items-center justify-center">
        <div
          className="relative flex flex-col items-center justify-center
         space-y-4 bg-white rounded-lg shadow-md text-black
         border-2 border-[#71717A] h-[30%] aspect-[8/5]"
          
        >
          <button
            className="absolute top-[1rem] right-[1rem]"
            onClick={handleCloseModal}
          >
            <PochaCloseIcon size="extra-large" />
          </button>
          <span className={`text-lg ${sejongHospitalBold.className}`}>
            Order Ready!
          </span>
          <span
            className={`text-4xl ${sejongHospitalBold.className}`}
          >{`#${orderItemID}`}</span>
          <span className={`text-lg font-medium`}>
            {menu.nameKor} is ready for pickup
          </span>
        </div>
      </div>
    </div>
  );
}
