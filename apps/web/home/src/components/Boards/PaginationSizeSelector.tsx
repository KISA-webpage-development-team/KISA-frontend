import React, { useCallback } from "react";
import { Pagination as PaginationBar } from "@nextui-org/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const pageSizeOptions = [10, 20, 30];

type Props = {
  totalPageNum: number;
  pageNum: number;
  totalPostNum: number;
  pageSize: number;
};

export default function PaginationSizeSelector({
  totalPageNum,
  pageNum,
  totalPostNum,
  pageSize,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = (page: number) => {
    router.push(pathname + "?" + createQueryString("page", page.toString()));
  };

  const handlePageSizeChange = (option) => {
    router.push(pathname + "?" + createQueryString("size", option));
  };

  return (
    <div className="relative flex justify-center w-full">
      <div
        className="absolute left-0 flex items-center w-20 gap-1
    ml-0 -translate-x-1 md:translate-x-0"
      >
        {pageSizeOptions
          .filter((pageSizeOption) => pageNum * pageSizeOption <= totalPostNum)
          .map((pageSizeOption) => (
            <button
              key={pageSizeOption}
              className={`w-7 md:w-8 h-7 md:h-8
                text-sm md:text-base
                 border border-gray-300 rounded-lg flex items-center justify-center ${
                   pageSizeOption === pageSize
                     ? "bg-michigan-blue text-michigan-maize"
                     : ""
                 }`}
              onClick={() => handlePageSizeChange(pageSizeOption)}
            >
              {pageSizeOption}
            </button>
          ))}
      </div>

      <>
        <PaginationBar
          variant="light"
          showControls
          total={totalPageNum}
          page={pageNum}
          size="md"
          onChange={handlePageChange}
          color="primary" // check tailwind.config.js for more information
        />
      </>
    </div>
  );
}
