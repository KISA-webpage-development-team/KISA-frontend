import Image from "next/image";
import React from "react";
import styles from "./kisaAll.module.css";

export default function KisaAll() {
  return (
    <div className="relative flex justify-center h-[250px] md:h-[400px] lg:h-[450px]">
      <Image
        priority={true}
        className={`${styles.testImg} object-cover flex`}
        src="/kisa_all.png"
        alt="23-24 KISA 단체사진"
        width={1252}
        height={450}
      />
      <div className="absolute bg-[#00000040] opacity-[81%] w-[1252px] h-full" />
    </div>
  );
}
