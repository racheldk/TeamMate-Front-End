import { Calendar } from "react-big-calendar";
import { luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import {CheckCircleIcon, Icon} from '@chakra-ui/icons'
import {FaQuestionCircle} from 'react-icons/fa'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button, 
    Modal,
    Text
  } from '@chakra-ui/react'
import GameDetail from "./GameDetail";

const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 });


export default function CalendarExample({confirmedGames, token, username }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
const [game, setGame] = useState(null)
    // const [eventList, setEventList] = useState([])
    // console.log(events);
    // setEventList(events)
    console.log('confirmed Games' + confirmedGames)
    console.log(confirmedGames[0].start)

    const handleOpenModal = (game) => {
        console.log("click open");
        console.log("modal game" + game);
        setModalIsOpen(true);
        setGame(game);
    };

    const handleCloseModal = () => {
        console.log("click close");
        setModalIsOpen(false);
    };

    const onSelectEvent = (calEvent) =>{
        console.log('calendar event clicked')
        console.log(calEvent)
        handleOpenModal(calEvent)
    }

    // const eventStyleGetter = (event, start, end, isSelected) =>{
    //     console.log(event)
    //     return{
    //         backgroundColor: "#ffffff"
    //     }
    // }
    
    return (
        <Box height={400} backgroundColor="white">
            {/* Container element around Calender needs to have height specified for it to show up on the page */}
            <Calendar
                localizer={localizer}
                events={confirmedGames}
                startAccessor="start"
                endAccessor="end"
                popup
                // components={{event: Event}}
                tooltipAccessor={null}
                onSelectEvent={onSelectEvent}
                eventPropGetter={(event, start, end, isSelected) => ({
                    event, 
                    start,
                    end,
                    style:{backgroundColor: "white"}
                })}
                />
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Game Detail Modal"
                game={game}
            >
                <GameDetail
                    token={token}
                    game={game}
                    handleCloseModal={handleCloseModal}
                    setModalIsOpen={setModalIsOpen}
                    username={username}                  
                />
            </Modal>
            
        </Box>
    );
};


// function Event(event, confirmedGames) {
//    const game=confirmedGames[0]
// return (
//     <Box>
//         <Popover>
//             <PopoverTrigger>
//                 <Text>{event.title}</Text>
//             </PopoverTrigger>
//             <PopoverContent>
//                 <PopoverArrow/>
//                 <PopoverCloseButton/>
//                 <PopoverHeader>Game Details!</PopoverHeader>
//                 {/* <PopoverBody><GameDetail game={game} /></PopoverBody> */}
//             </PopoverContent>
//         </Popover>
//     </Box>
// )
// }

// const events = [
//     {
//         title: <CheckCircleIcon/>,
//         allDay: false,
//         start: new Date(2022, 7, 26, 9, 0), 
//         // Aug 26, 2022 9am
//         end: new Date(2022, 7, 26, 10, 0),
//         // Aug 26, 2022 10am
//         resource: null,
//         description: "this describes the event, pleasegit "
//     },
//     {
//         title: <Icon as={FaQuestionCircle}/>,
//         allDay: false,
//         start: new Date(2022, 7, 25, 12, 0), 
//         // Aug 26, 2022 9am
//         end: new Date(2022, 7, 25, 13, 0),
//         // Aug 26, 2022 10am
//         resource: null,
//     },
//     {
//         title: <Icon as={FaQuestionCircle}/> ,
//         allDay: false,
//         start: new Date(2022, 7, 25, 9, 0), 
//         // Aug 26, 2022 9am
//         end: new Date(2022, 7, 25, 10, 0),
//         // Aug 26, 2022 10am
//         resource: null,
//     },
//     {
//         title: <Icon as={FaQuestionCircle}/>,
//         allDay: false,
//         start: new Date(2022, 7, 25, 14, 0), 
//         // Aug 26, 2022 9am
//         end: new Date(2022, 7, 25, 15, 0),
//         // Aug 26, 2022 10am
//         resource: null,
//     },
//     {
//         title: <Icon as={FaQuestionCircle}/>,
//         allDay: false,
//         start: new Date(2022, 7, 25, 7, 0), 
//         // Aug 26, 2022 9am
//         end: new Date(2022, 7, 25, 8, 0),
//         // Aug 26, 2022 10am
//         resource: null,
//     },
// ];