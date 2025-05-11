"use client";

import Link from "next/link";
import React from "react";
import InstagramIcon from "../ui/InstagramIcon";
import { Button } from "@nextui-org/react";

const instagramURL = "https://www.instagram.com/kisa_michigan/";

export default function InstagramLinkIcon({ color = "none" }) {
  const navigateToInstagram = () => {
    window.open(instagramURL, "_blank");
  };

  return (
    // <button onClick={navigateToInstagram}>
    //   <InstagramIcon color={color} />
    // </button>
    <Button
      isIconOnly
      color="white"
      aria-label="Instagram"
      onClick={navigateToInstagram}
    >
      <InstagramIcon color={color} />
    </Button>
  );
}
