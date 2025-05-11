import React from "react";

export default function ImageButton({
  background = "gray",
  icon,
  text = "",
  onClick,
}) {
  return (
    <button
      className={`${
        background === "none"
          ? ""
          : "bg-slate-100 hover:bg-slate-200 text-black  py-[6px] px-2 rounded "
      } flex items-center justify-center gap-1`}
      onClick={onClick}
    >
      {icon}
      {text !== "" && (
        <p
          className={`
          ${background === "none" ? "hidden sm:block" : "block"}
        text-xs md:text-sm 
        hover:underline`}
        >
          {text}
        </p>
      )}
    </button>
  );
}

// <p>
//   hello hello
//   <img src="어쩌고 저쩌고"
//   {/* <image src="?" /> */}
// </p>
