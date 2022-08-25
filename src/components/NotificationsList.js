import {
    Text,
    Heading,
    Button,
    Box,
    Modal,
    LinkOverlay,
    LinkBox
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import GameDetail from "./GameDetail";
import axios from "axios";

export default function NotificationsList({token}) {
const [notifications, setNotifications] = useState([])

    useEffect(() => {
        axios
            .get("https://teammate-app.herokuapp.com/notification/count", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setNotifications(res.data)
            });
    }, []);

const examples= [
        {
            id: 12,
            sender: 4,
            reciever: 2,
            message: "Sam Has backed out of the game",
            game_session: 11,
            read: true
        },
        {
            id: 12,
            sender: 4,
            reciever: 2,
            message: "Rachel Has backed out of the game",
            game_session: 11,
            read: true
        },
        {
            id: 12,
            sender: 4,
            reciever: 2,
            message: "Carlos Has backed out of the game",
            game_session: 11,
            read: true
        },
        {
            id: 12,
            sender: 4,
            reciever: 2,
            message: "Your guest request status has changed to Accepted",
            game_session: 11,
            read: true
        }
]

    return(
        <Box className="app-body">
            <Heading>NotificationsList Component</Heading>
            {examples.map((obj) => (
                <Box>
                    <Text>{obj.message}</Text>
                </Box>
            ))}
        </Box>
    )
}