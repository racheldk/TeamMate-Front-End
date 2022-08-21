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
        allDay: false,
        start: new Date(2022, 7, 26, 9, 0), 
        // Aug 26, 2022 9am
        end: new Date(2022, 7, 26, 10, 0),
        // Aug 26, 2022 10am
        resource: null,
    },
];

export default function CalendarExample(props) {
    // const [eventList, setEventList] = useState([])
    // console.log(events);
    // setEventList(events)

    return (
        <Box height={600} backgroundColor="white">
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
