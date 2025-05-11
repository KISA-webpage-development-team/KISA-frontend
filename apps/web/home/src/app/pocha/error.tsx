"use client";
import PochaButton from "@/features/pocha/components/shared/PochaButton";
import {
  NotFound,
  NotLogin,
  UnexpectedError,
} from "@/final_refactor_src/components/feedback";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  if (error.message.includes("Unauthorized")) {
    return <NotLogin />;
  } else if (error.message.includes("Not Found")) {
    return <NotFound />;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <UnexpectedError />
      <PochaButton onClick={reset} label="다시 시도하기" />
    </div>
  );
}
