import React, { useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core/index.js";

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<string[]>([]);

  useMemo(() => {
    const fetchData = async () => {
      const response = await fetch("https://holidayapi.com/v1/holidays");
      console.log(response);
      const data = await response.json();
      setEvents(data);
    };
    fetchData();
  }, []);

  // const events = [
  //   { id: "1", title: "Meeting", date: "2025-09-01" },
  //   { id: "2", title: "Conference", date: "2025-09-05" },
  //   { id: "3", title: "Birthday Party", date: "2025-09-10" },
  // ];

  const handleDateClick = (info: DateClickArg) => {
    alert(`Clicked on date: ${info.dateStr}`);
  };

  const handleEventClick = (info: EventClickArg) => {
    alert(`Event: ${info.event.title}`);
  };

  return (
    <div style={{ padding: "100px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
