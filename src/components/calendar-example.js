import { Calendar } from "react-big-calendar";
import { luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import {CheckCircleIcon, Icon} from '@chakra-ui/icons'
import {FaQuestionCircle} from 'react-icons/fa'

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 });

const events = [
    {
        title: <CheckCircleIcon/>,
        allDay: false,
        start: new Date(2022, 7, 26, 9, 0), 
        // Aug 26, 2022 9am
        end: new Date(2022, 7, 26, 10, 0),
        // Aug 26, 2022 10am
        resource: null,
        description: "this describes the event, pleasegit "
    },
    {
        title: <Icon as={FaQuestionCircle}/>,
        allDay: false,
        start: new Date(2022, 7, 25, 12, 0), 
        // Aug 26, 2022 9am
        end: new Date(2022, 7, 25, 13, 0),
        // Aug 26, 2022 10am
        resource: null,
    },
    {
        title: <Icon as={FaQuestionCircle}/> ,
        allDay: false,
        start: new Date(2022, 7, 25, 9, 0), 
        // Aug 26, 2022 9am
        end: new Date(2022, 7, 25, 10, 0),
        // Aug 26, 2022 10am
        resource: null,
    },
    {
        title: <Icon as={FaQuestionCircle}/>,
        allDay: false,
        start: new Date(2022, 7, 25, 14, 0), 
        // Aug 26, 2022 9am
        end: new Date(2022, 7, 25, 15, 0),
        // Aug 26, 2022 10am
        resource: null,
    },
    {
        title: <Icon as={FaQuestionCircle}/>,
        allDay: false,
        start: new Date(2022, 7, 25, 7, 0), 
        // Aug 26, 2022 9am
        end: new Date(2022, 7, 25, 8, 0),
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
                popup
            />
        </Box>
    );
}
