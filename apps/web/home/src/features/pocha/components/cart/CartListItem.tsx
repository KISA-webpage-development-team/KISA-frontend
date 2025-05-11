import React from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import Image from "next/image";
import { CartItem } from "@/types/pocha";
import PochaMinusIcon from "@/final_refactor_src/components/icon/PochaMinusIcon";
import PochaPlusIcon from "@/final_refactor_src/components/icon/PochaPlusIcon";
import PochaTrashIcon from "@/final_refactor_src/components/icon/PochaTrashIcon";
import { getMenuImagePath } from "../../utils/getImagePath";

type CartListItemProps = {
  item: CartItem;
  menuid: number;
  handleQuantityChange: (menuid: number, newQuantity: number) => void;
};

export default function CartListItem({
  item,
  menuid,
  handleQuantityChange,
}: CartListItemProps) {
  const incrementQuantity = () => {
    handleQuantityChange(menuid, 1);
  };

  const decrementQuantity = () => {
    // Default quantity starts at 1.
    if (item.quantity > 0) {
      handleQuantityChange(menuid, -1);
    }
  };

  const removeItemFromCart = () => {
    handleQuantityChange(menuid, -item.quantity);
  };

  if (!item || item.quantity === 0) {
    return <></>;
  }

  return (
    <li className="flex items-center py-4 border-b border-[#CACACA]">
      <figure className="relative h-[5rem] w-[5rem] flex-shrink-0 rounded-full border-gray-300 shadow-md">
        <Image
          src={getMenuImagePath(menuid)}
          alt={item.menu.nameEng}
          fill
          sizes="(max-width: 768px) 20vw"
          className="rounded-[15px] border-gray-300 object-cover"
        />
      </figure>

      <div className="flex flex-col flex-grow gap-1 ml-3">
        <span className={`${sejongHospitalBold.className} text-black`}>
          {item?.menu?.nameKor} {item?.menu?.nameEng}
        </span>
        <span className={`${sejongHospitalBold.className} text-gray-500`}>
          ${(item?.menu?.price * item.quantity).toFixed(2)}
        </span>
      </div>

      {/* counter logic */}
      <div
        className="flex items-center justify-between ml-1
      border-2 border-[#CACACA] rounded-full shadow-md
      px-[0.65rem] py-[0.2rem] gap-[1rem]"
      >
        {/* Decrement Button */}
        {item.quantity > 1 ? (
          <button
            className={`${sejongHospitalBold.className}  rounded-full `}
            onClick={decrementQuantity}
          >
            <PochaMinusIcon size="small" />
          </button>
        ) : (
          <button
            onClick={removeItemFromCart}
            className=" 
             rounded-full"
          >
            <PochaTrashIcon size="small" />
          </button>
        )}

        {/* Quantity Display */}
        <span
          className={`${sejongHospitalBold.className} font-semibold text-black`}
        >
          {item.quantity}
        </span>

        {/* Increment Button */}
        <button
          onClick={incrementQuantity}
          className={`${sejongHospitalBold.className}   rounded-full`}
        >
          <PochaPlusIcon size="small" />
        </button>
      </div>
    </li>
  );
}
