import { AiOutlineMail } from "react-icons/ai";

export default function EmailIcon({ size = "medium" }) {
  return (
    <AiOutlineMail
      className={`${size === "medium" ? "text-xl" : "text-xl md:text-3xl"}`}
    />
  );
}
