"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";

import CalendarEventCard from "./CalendarEventCard";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";
import { motion } from "framer-motion";
import { GOOGLE_CALENDAR_API_KEY, GOOGLE_CALENDAR_ID } from "@/constants/env";

// event summary display
function renderEventContent(eventInfo) {
  return (
    <div
      className={`flex gap-2 ${
        sejongHospitalLight.className
      } py-1 px-1 md:px-2 ${
        eventInfo.event.allDay && "bg-michigan-blue text-white "
      } text-[10px] sm:text-xs md:text-sm`}
    >
      <div
        className={` ${sejongHospitalBold.className} overflow-hidden break-words`}
      >
        {eventInfo.event.title}
      </div>
    </div>
  );
}

export default function SchoolCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [didEventSetup, setDidEventSetup] = useState(false);

  const handleDateClick = (arg) => {
    arg.jsEvent.preventDefault();
    setSelectedEvent(arg.event);
  };

  const handleEventsSet = (eventsInfo) => {
    if (eventsInfo.length === 0) return;
    if (didEventSetup) return;

    const today = new Date();

    // check whether last event is upcoming in 14 days
    const filteredEvents = eventsInfo.filter(
      (event) => new Date(event.start) > today
    );

    const sortedEvents = filteredEvents.sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );
    const lastEvent = new Date(sortedEvents[0]?.start);

    const diffTime = lastEvent - today;

    if (diffTime > 14 * 24 * 60 * 60 * 1000 || diffTime < 0) {
      setDidEventSetup(true);
      setSelectedEvent(null);
      return;
    }

    setDidEventSetup(true);
    setSelectedEvent(sortedEvents[0]);
    return;
  };

  return (
    <div
      className={`${sejongHospitalBold.className} w-full flex flex-col 
      gap-2 md:gap-6`}
    >
      <h2 className="section_title">Calendar</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full text-xs lg:text-sm hidden md:block">
          <FullCalendar
            plugins={[dayGridPlugin, googleCalendarPlugin]}
            initialView="dayGridMonth"
            googleCalendarApiKey={GOOGLE_CALENDAR_API_KEY}
            events={{
              googleCalendarId: GOOGLE_CALENDAR_ID,
            }}
            eventContent={renderEventContent}
            eventDisplay={"block"}
            eventTextColor={"#00274C"}
            eventColor={"#FFCB05"}
            eventClick={handleDateClick}
            eventsSet={handleEventsSet}
          />
        </div>
        <div className="w-full text-[9px] block md:hidden">
          <FullCalendar
            plugins={[dayGridPlugin, googleCalendarPlugin]}
            initialView="dayGridWeek"
            googleCalendarApiKey={GOOGLE_CALENDAR_API_KEY}
            events={{
              googleCalendarId: GOOGLE_CALENDAR_ID,
            }}
            contentHeight={100}
            eventContent={renderEventContent}
            eventDisplay={"block"}
            eventTextColor={"#00274C"}
            eventColor={"#FFCB05"}
            eventClick={handleDateClick}
          />
        </div>

        <motion.div
          className="basis-1/2 md:basis-1/3 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CalendarEventCard event={selectedEvent} />
        </motion.div>
      </div>
    </div>
  );
}
