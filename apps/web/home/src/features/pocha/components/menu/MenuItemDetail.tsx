// - 백 버튼이 있어야한다.
// - 하나의 메뉴에 대해서 상세 정보 (이미지, 이름, 가격, 수량)을 보여준다 => PochaMenuList.tsx 에서 선택된 메뉴를 보여준다: selectedMenu
// - 수량을 조절할 수 있다 => 내부 state로 quantity를 관리한다. => 늘리고 줄이고 하는 함수가 있어야한다.
// - 수량에 맞는 총 가격을 보여준다  => quantity (내부 state) * price (변하지 않아!, selectedMenu.price)
// - 장바구니에 총 가격만큼 추가할 수 있다 => quantity * price => cart에 { MenuItem, quantity } 를 추가한다.

// cart[menuid] = { MenuItem, quantity}
// key: menuid
// value: CartItem{ MenuItem, quantity}

// [UI]
// - menu image
// - menu name (kor, eng)
// - menu price
// - quantity +, - buttons (default: 1, - is disabled when quantity is 1)
// - add to cart button (onClick: price * quantity => cart)
// - close button

// UI (data x) -> data (state) -> UI (data)
// close button logic
// quantity button logic
// cart (list) - add to cart button logic
// { menu: {} , quantity, price }

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { changeItemInCart } from "@/apis/pocha/mutations";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import PochaBackIcon from "@/final_refactor_src/components/icon/PochaBackIcon";
import PochaButton from "../shared/PochaButton";

// Types
import { MenuItem } from "@/types/pocha";
import { UserSession } from "@/lib/next-auth/types";
import PochaMenuPlusIcon from "@/final_refactor_src/components/icon/PochaMenuPlusIcon";
import PochaMenuMinusIcon from "@/final_refactor_src/components/icon/PochaMenuMinusIcon";
import PochaErrorMsg from "../shared/PochaErrorMsg";
import { getMenuImagePath } from "../../utils/getImagePath";

interface MenuItemDetailProps {
  session: UserSession | undefined;
  selectedMenu: MenuItem;
  setSelectedMenu: (selectedMenu: MenuItem | undefined) => void;
  pochaid: number;
}

export default function MenuItemDetail({
  session,
  selectedMenu,
  setSelectedMenu,
  pochaid,
}: MenuItemDetailProps) {
  // Loading state for add to cart button
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  // Counter Logic
  const [quantity, setQuantity] = useState<number>(1);
  // Error Message
  const [error, setError] = useState<string | null>(null);

  // useEffect needed because the price cumulation should reset for each menu.
  useEffect(() => {
    setQuantity(1);
  }, [selectedMenu]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (error !== null) {
      setError(null);
    }

    // Default quantity starts at 1.
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBackButton = () => {
    // This is to return back to original page = Show original PochaMenuList.
    setSelectedMenu(undefined);
  };

  // add menu item and its quantity to the cart
  const handleAddToCart = async () => {
    setAddingToCart(true);
    // Posting info to DB.
    const addedMenu = {
      menuID: selectedMenu.menuID,
      quantity: quantity,
    };

    try {
      const res = await changeItemInCart(
        session?.user?.email,
        pochaid,
        addedMenu
      );

      if (!res) {
        console.error("Error updating cart item quantity");
        setAddingToCart(false);
        return;
      }

      //  1. out of stock
      if (res.isStocked === false) {
        setError("Out of stock");
        setAddingToCart(false);
        return;
      }

      // 2. success
      setAddingToCart(false);

      // redirect to the original page
      setSelectedMenu(undefined);
    } catch (error) {
      console.log("Error message: ", error);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 
    flex flex-col items-center bg-white overflow-y-auto"
    >
      <div className="top-0 left-0 w-full bg-white shadow-md z-10 flex items-center py-4">
        <button className="flex ml-4 z-50 w-full" onClick={handleBackButton}>
          <PochaBackIcon size="large" />
        </button>
      </div>

      {/* Food Image */}
      <figure className="relative w-screen aspect-[5/4]">
        <Image
          src={getMenuImagePath(selectedMenu.menuID)}
          alt={selectedMenu.nameEng}
          fill
          className="shadow-sm object-cover"
        />
      </figure>

      <div
        className="-translate-y-[25vw] z-10 gap-5 w-[90%]
      flex flex-col items-center"
      >
        {/* Details */}
        <div
          className={`${sejongHospitalBold.className}
        flex flex-col w-full bg-white rounded-[8px] shadow-lg
        py-7 px-5 gap-5
        items-center border-2 border-gray-300 z-10`}
        >
          {/* Menu Name */}
          <div className="flex flex-col items-center">
            <span className={`text-black text-2xl`}>
              {selectedMenu.nameKor}
            </span>
            <span className={` text-gray-500 text-lg`}>
              {selectedMenu.nameEng}
            </span>
          </div>
          <hr className="w-full border-t-2 border-gray-300" />

          {/* for this, just shows the total price for the selected food, based on your quantity. */}
          <span className={`text-3xl mt-1`}>
            ${selectedMenu.price * quantity}{" "}
          </span>

          {/* [TODO] temporarily put in a value. */}
          {/* <div className="w-full bg-[#F9FAFB] px-8 py-6 rounded-lg shadow-sm text-base">
            <p className="text-black">Comes with:</p>
            <ul className="list-disc list-inside text-gray-500">
              <li>Jioh</li>
            </ul>
          </div> */}

          {/* Quantity Selector */}
          <div className="flex items-center w-full bg-[#F9FAFB] py-3 px-5 rounded-lg shadow-sm">
            {/* Label */}
            <span className={`${sejongHospitalBold.className} text-xl`}>
              수량
            </span>

            {/* Quantity Controls */}
            <div className="flex items-center gap-7 ml-auto">
              {/* Decrement Button */}
              <button
                className="flex justify-center items-center"
                onClick={decrementQuantity}
                disabled={quantity === 1}
              >
                <PochaMenuMinusIcon size="extra-large" />
              </button>

              {/* Quantity Display */}
              <span
                className={`${sejongHospitalBold.className} text-lg`}
                style={{
                  width: "1rem", // Fixed width ensures no layout shifting
                  textAlign: "center",
                }}
              >
                {quantity}
              </span>

              {/* Increment Button */}
              <button
                className="flex justify-center items-center"
                onClick={incrementQuantity}
              >
                <PochaMenuPlusIcon size="extra-large" />
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error !== null && <PochaErrorMsg message={error} />}

          {/* Add to Cart Button */}
          <div
            className={`
            w-full
           ${sejongHospitalBold.className}`}
          >
            <PochaButton
              label={addingToCart ? "Adding to Cart..." : "Add to Cart"}
              onClick={handleAddToCart}
              widthPercentage={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
