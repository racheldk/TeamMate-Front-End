import { Calendar, momentLocalizer } from 'react-big-calendar'
import { luxonLocalizer } from 'react-big-calendar'
import { DateTime, Settings } from 'luxon'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { chakra, Box } from '@chakra-ui/react'


const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 })

export default function CalendarExample (props) {
    
    return (

  <Box height={400} backgroundColor='white'>
    {/* Container element around Calender needs to have height specified for it to show up on the page */}

    <Calendar
      localizer={localizer}
    //   events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </Box>
)}