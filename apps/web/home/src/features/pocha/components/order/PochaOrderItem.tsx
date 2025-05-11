import { OrderItem } from "@/types/pocha";
import React, { useState } from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import { STATUS_TEXT_COLORS, STATUS_COLORS } from "../../utils/statusToColor";
import Image from "next/image";
import TicketIcon from "@/final_refactor_src/components/icon/TicketIcon";
import { getMenuImagePath } from "../../utils/getImagePath";
import OrderTicketModal from "./OrderTicketModal";

interface PochaOrderItemProps {
  orderItem: OrderItem;
  setSelectedOrder?: (orderItem: OrderItem) => void;
}

export function capitalizeStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

export default function PochaOrderItem({ orderItem }: PochaOrderItemProps) {
  const { menu, quantity, status } = orderItem;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleViewTicket = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      {isOpenModal && (
        <OrderTicketModal
          orderItem={orderItem}
          setIsOpenModal={setIsOpenModal}
        />
      )}
      <li
        className={`h-full
      shadow-md rounded-lg
      
          ${
            status === "ready"
              ? "border-2 border-green-500"
              : " border border-zinc-200"
          }
      bg-white 
      flex self-stretch items-center
      py-[1rem] px-[1rem] space-x-[1rem]
    `}
      >
        <div
          className={`w-[0.75rem] h-[0.75rem] rounded-full ${STATUS_COLORS[status]}`}
        />

        {/* 1. Image or Ticket number */}
        <figure className="relative w-[4rem] h-[4rem] flex items-center justify-center">
          <Image
            src={getMenuImagePath(menu?.menuID)}
            alt={`Image of ${menu?.nameKor}`}
            fill
            sizes="4rem"
            className="object-cover rounded-lg"
          />
        </figure>

        {/* 2. Info/Description */}
        <div
          className={`flex-1 flex flex-col h-full justify-center space-y-0.5
    ${sejongHospitalBold.className}
            text-base leading-[150%] text-black
    `}
        >
          {/* Name */}
          <div className="flex items-center gap-[0.25rem]">
            <span className="text-overflow-two-lines">
              {menu?.nameKor} {menu?.nameEng}
            </span>
          </div>

          {/* Price */}
          <span className="text-gray-500 text-sm">
            {`x ${quantity}`} | {`$${menu?.price * quantity}`}
          </span>

          {/* specially displaying orderItemID for "ready" status */}
          {status === "ready" && (
            <div
              className="
                bg-zinc-100 rounded-[9px] flex items-center justify-center
                w-fit px-2 py-[0.25rem] text-sm
              "
            >
              <span className="text-black"># {orderItem?.orderItemID}</span>
            </div>
          )}
        </div>

        {/* status & ticket button */}
        <div
          className={`flex items-center justify-center rounded-md 
            text-sm ${sejongHospitalBold.className} ${STATUS_TEXT_COLORS[status]}`}
        >
          {status === "ready" ? (
            <div className="flex flex-col items-end">
              <span>{capitalizeStatus(orderItem?.status)}</span>
              {/* View Ticket Button */}
              <button
                onClick={handleViewTicket}
                className="mt-[0.5rem]
                flex justify-center items-center w-[8rem] h-[2rem]
                bg-green-100 rounded-[5px] border border-[#1c8241]/50 gap-2"
              >
                <TicketIcon className="mr-[0.25rem]" size="small" />
                <span className="leading-[150%]">View Ticket</span>
              </button>
            </div>
          ) : (
            <span className={``}>{capitalizeStatus(orderItem?.status)}</span>
          )}
        </div>
      </li>
    </>
  );
}
