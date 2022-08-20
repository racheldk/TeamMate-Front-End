import { Calendar } from "react-big-calendar";
import { luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 });

const events = [
    {
        title: "Event 1",
        allDay: true,
        start: new Date(2022, 8, 26),
        end: new Date(2022, 8, 26),
        resource: null,
    },
];

export default function CalendarExample(props) {
    // const [eventList, setEventList] = useState([])
    // console.log(events);
    // setEventList(events)

    return (
        <Box height={400} backgroundColor="white">
            {/* Container element around Calender needs to have height specified for it to show up on the page */}
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
            />
        </Box>
    );
}
