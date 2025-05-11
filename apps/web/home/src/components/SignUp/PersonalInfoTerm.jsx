import React from "react";

export default function PersonalInfoTerm() {
  return (
    <div className="flex flex-col gap-2 w-full mt-8">
      <span className={`${sejongHospitalBold.className} text-base md:text-lg`}>
        개인 정보 수집 약관
        <span className="text-red-500 ml-2">*</span>
      </span>
      <div className="border border-gray-300 rounded-lg p-3">
        term term term term term term term term term term term term term term
        term term term term term term term term term term term term term term
        term term term term term term term term term term term
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          value={termChecked}
          onChange={(e) => setTermChecked(e.target.checked)}
        />
        <span className={` ${sejongHospitalLight.className} text-sm`}>
          개인 정보 수집 약관에 동의합니다.
        </span>
      </div>
    </div>
  );
}
