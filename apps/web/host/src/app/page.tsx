"use client";

import React from "react";
import { Button } from "@repo/ui/button";

export default function page() {
  return (
    <div>
      <Button text="click me" onClick={() => console.log("clicked")} />
    </div>
  );
}
