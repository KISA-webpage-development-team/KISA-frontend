"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SponsorBanner({ sponsor }) {
  const { id, title, url } = sponsor;

  const getBannerImagePath = (id: string) => {
    return `/sponsor/banner/${id}.png`;
  };

  return (
    <Link href={url} className="flex justify-center" target="_blank">
      <Image
        alt={title}
        src={getBannerImagePath(id)}
        width={200}
        height={150}
        className="object-contain"
      />
    </Link>
  );
}
