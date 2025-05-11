import React from "react";
import SearchIcon from "../ui/SearchIcon";

export default function PostSearchBar() {
  return (
    <div className="flex items-center border border-gray-300 p-2">
      <SearchIcon className="mr-2" />
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className="ml-2 outline-none bg-transparent"
      />
    </div>
  );
}
