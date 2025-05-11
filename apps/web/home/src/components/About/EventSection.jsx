import React from "react";
import EventSectionTitle from "./EventSectionTitle";
import EventSectionDesc from "./EventSectionDesc";
import EventSectionImage from "./EventSectionImage";

export default function EventSection({ event }) {
  const { id, imageTitle, title, desc } = event;
  return (
    <div
      className="flex flex-col md:flex-row
       gap-6 md:gap-12 lg:gap-28
       md:w-full 
     md:h-60 lg:h-72"
    >
      {/* Left: Event Desc */}
      <div
        className="flex-1 flex flex-col 
      gap-4 items-start"
      >
        <EventSectionTitle title={title} />
        <EventSectionDesc desc={desc} />
      </div>

      {/* Bottom: Desc + Image */}
      <div
        className="
        h-48 md:h-full
        flex flex-row 
      justify-center md:justify-end"
      >
        <EventSectionImage id={id} imageTitle={imageTitle} />
      </div>
    </div>
  );
}
