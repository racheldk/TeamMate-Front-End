import {
    Text,
    Heading,
    Button,
    Box,
    Modal,
    LinkOverlay,
    LinkBox,
    Stack
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NotificationsList({ token, count, notifications }) {
    // const [notifications, setNotifications] = useState(null);

    // useEffect(() => {
    //     axios
    //         .get(`https://teammate-app.herokuapp.com/notification/check/`, {
    //             headers: {
    //                 Authorization: `Token ${token}`,
    //             },
    //         })
    //         .then((res) => {
    //             setNotifications(res.data);
    //             console.log(notifications)
    //         });
    // }, [token, count]);

if (notifications && notifications.length > 0) {
    return (
        <Box className="modal-base" p={0} paddingBottom={2}>
        <Heading className="form-banner" >Notifications</Heading>
            {notifications.map((obj) => (
                <Box m={2} bg='#E6FFFA' borderRadius='20px' p={4}>
                    <Text color='#285E61'>{obj.message}</Text>
                </Box>
            ))}
        </Box>
    );}
if (notifications && notifications.length === 0) {
    return (
        <Box className="modal-base" p={0} paddingBottom={2}>
        <Heading className="form-banner" >Notifications</Heading>
            
                <Box m={2} bg='#E6FFFA' borderRadius='20px' p={4}>
                    <Text color='#285E61'>Inbox Empty!</Text>
                </Box>
         
        </Box>
    );
}
}
