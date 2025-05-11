import React, { useState } from "react";
import useMenu from "../../hooks/useMenu";
import LoadingSpinner from "@/final_refactor_src/components/feedback/LoadingSpinner";
import { changeStock } from "@/apis/pocha/mutations";

interface StockManagerProps {
  pochaID: number;
  token: string;
}

export default function StockManager({ pochaID, token }: StockManagerProps) {
  const { menuList, status } = useMenu(pochaID, token);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [customStock, setCustomStock] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleReload = () => {
    window.location.reload();
  };

  const handleSelectMenu = (menuID: number) => {
    setSelectedMenu(menuID);
  };

  const handleSetStock = async (quantity: number) => {
    if (selectedMenu === null) return;

    if (quantity < 0 || customStock === "") {
      alert("Please type a valid number");
      setCustomStock("");
      return;
    }

    if (isNaN(quantity)) {
      alert("Please type a valid number");
      setCustomStock("");
      return;
    }

    setIsLoading(true);
    const res = await changeStock({ menuID: selectedMenu, quantity });
    if (res) {
      alert(`Stock updated to ${quantity} successfully`);
      window.location.reload();
    } else {
      alert("Failed to update stock");
    }
    setIsLoading(false);
  };

  const handleSetStockToZero = () => {
    handleSetStock(0);
  };

  if (status === "loading") {
    return <LoadingSpinner fullScreen={false} label="메뉴를 가져오는중..." />;
  }

  return (
    <div className="w-full">
      <button
        onClick={handleReload}
        className="px-4 py-2 bg-blue-500 text-white"
      >
        Reload Stock
      </button>
      <ul className="mt-4 space-y-2">
        {menuList?.map(({ menusList }) =>
          menusList.map((menu) => (
            <li
              key={menu.menuID}
              className={`p-2 border ${
                selectedMenu === menu.menuID ? "bg-gray-300" : ""
              }`}
              onClick={() => handleSelectMenu(menu.menuID)}
            >
              {menu.nameKor} - Stock: {menu.stock}
            </li>
          ))
        )}
      </ul>
      <div className="flex flex-row gap-4 mt-4">
        <button
          onClick={handleSetStockToZero}
          disabled={selectedMenu === null || isLoading}
          className={`px-4 py-2 rounded-lg ${
            selectedMenu !== null ? "bg-red-500 text-white" : "bg-gray-300"
          }`}
        >
          {isLoading ? "Loading..." : "Set Stock to 0"}
        </button>

        <button
          onClick={() => handleSetStock(Number(customStock))}
          disabled={selectedMenu === null || isLoading}
          className={`px-4 py-2 rounded-lg ${
            selectedMenu !== null ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
        >
          {isLoading ? "Loading..." : "Set Stock to Custom Value"}
        </button>
        <input
          type="number"
          min="0"
          pattern="[0-9]+"
          value={customStock}
          onChange={(e) => setCustomStock(e.target.value)}
          className="px-4 py-2 border"
        />
      </div>
    </div>
  );
}
