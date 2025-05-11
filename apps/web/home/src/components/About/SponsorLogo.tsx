"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SponsorLogo({ sponsor }) {
  const { id, title, url } = sponsor;

  if (id === "5" || id === "6") {
    return null;
  }

  const getImagePath = (id: string) => {
    return `/sponsor/${id}.png`;
  };

  return (
    <Link href={url} className={"flex justify-center"} target="_blank">
      <Image alt={title} src={getImagePath(id)} width={200} height={150} />
    </Link>
  );
}
