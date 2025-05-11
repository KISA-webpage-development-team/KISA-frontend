"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getPochaInfo } from "@/apis/pocha/queries";
import { HookStatus } from "./types";

/**
 * @desc Hook for fetching Pocha ID defensively.
 * 1. Tries to get pochaID from URL searchParams.
 * 2. If unavailable, fetches from the API as fallback.
 */
const usePochaID = () => {
  const searchParams = useSearchParams();
  const [pochaID, setPochaID] = useState<number | null>(null);
  const [status, setStatus] = useState<HookStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPochaID = async () => {
      // Try to fetch from search params
      const urlPochaID = searchParams.get("pochaid");

      if (urlPochaID) {
        setPochaID(Number(urlPochaID));
        setStatus("success");
        return;
      }

      // Fallback to API call if not found in URL
      try {
        const pochaInfo = await getPochaInfo(new Date());
        setPochaID(pochaInfo.pochaID);
        setStatus("success");
      } catch (error) {
        console.error("Failed to fetch Pocha ID:", error);
        setError("Failed to retrieve Pocha ID");
        setStatus("error");
      }
    };

    fetchPochaID();
  }, [searchParams]);

  return { pochaID, status, error };
};

export default usePochaID;
