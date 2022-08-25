import {
    Text,
    Heading,
    Button,
    Box,
    Modal,
    LinkOverlay,
    LinkBox,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NotificationsList({ token }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        axios
            .get("https://teammate-app.herokuapp.com/notification/count", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setNotifications(res.data);
            });
    }, []);

    return (
        <Box className="app-body">
            <Heading>NotificationsList Component</Heading>
            {notifications.map((obj) => (
                <Box>
                    <Text>{obj.message}</Text>
                </Box>
            ))}
        </Box>
    );
}
