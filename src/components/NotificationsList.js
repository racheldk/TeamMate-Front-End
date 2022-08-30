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

export default function NotificationsList({ token, notifications }) {
    // const [notifications, setNotifications] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get("https://teammate-app.herokuapp.com/notification/all", {
    //             headers: {
    //                 Authorization: `Token ${token}`,
    //             },
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //             setNotifications(res.data);
    //         });
    // }, []);

    return (
        <Box className="modal-base">
            {notifications.map((obj) => (
                <Box  m={1} textAlign="left" border="1px" fontSize="13px" borderRadius="3px"
                marginBottom="15px" padding="6px">
                    <Text>{obj.message}</Text>
                </Box>
            ))}
        </Box>
    );
}
