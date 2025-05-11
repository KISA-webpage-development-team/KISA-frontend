// [NOTE] Later, TitleInput will be changed to Abstract CustomInput component

import React from "react";

type Props = {
  title: string;
  setTitle: (title: string) => void;
};

export default function TitleInput({ title, setTitle }: Props) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="title"
        className={`text-base md:text-lg flex-shrink-0
        font-medium`}
      >
        제목
      </label>
      <input
        className="text-base
        w-full md:w-1/2 rounded-md
        border border-gray-300
        hover:border-michigan-blue focus:outline-michigan-blue
        px-2 py-1"
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}
