import { CustomLinkButton } from "@/final_refactor_src/components/button";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

export default function NotFound() {
  return (
    <div
      className={`${sejongHospitalBold.className} h-full 
       flex items-center justify-center px-4`}
    >
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg md:text-2xl font-semibold text-gray-700 mb-6">
          존재하지 않는 페이지입니다
        </p>
        <div className="flex justify-center w-[60%] mx-auto">
          <CustomLinkButton
            href="/"
            text="홈페이지로 돌아가기"
            type="primary"
          />
        </div>
      </div>
    </div>
  );
}
