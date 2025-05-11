import { Metadata } from "next";
import { SWRProvider } from "@/lib/swr/providers";
import "./board.css";

export const metadata: Metadata = {
  title: "에브리키사",
  description: "에브리키사",
};

export default async function EveryKisaLayout({ children }) {
  return <SWRProvider>{children}</SWRProvider>;
}
