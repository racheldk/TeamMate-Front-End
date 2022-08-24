import { Text, Heading, Image, Icon, IconButton, Button, Box, requiredChakraThemeKeys } from "@chakra-ui/react";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import IncomingRequestList from "../components/IncomingRequestList";
import { useState, useEffect } from "react";
import axios from "axios";
import NewGamesList from "../components/NewGamesList";
import { withTheme } from "@emotion/react";
import { WarningIcon } from "@chakra-ui/icons";



export default function MyGames({token, username}) {
console.log(username)

    const [actionRequiredGames, setActionRequiredGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        axios
        // this endpoint is being adjusted to only show open games with a pending guest
            .get(`https://teammate-app.herokuapp.com/${username}/open-host`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setActionRequiredGames(res.data.map((obj) => ({
                    displayStatus: "actionRequired", 
                    bgColor: "black", 
                    icon: "FaExclamationCircle", 
                    displayUsers: obj.guest_info,
                    buttonLabels: ["Accept", "Reject"],
                    ...obj
                })));
                setIsLoading(false);
            });
            console.log(actionRequiredGames)
    }, []);

if (isLoading) {
    return <Box>Loading...</Box>;
}

    return(
        <Box className="app-body">
            <Header/>
            <Heading>MyGames Component</Heading>
            <NewGamesList token={token} games={actionRequiredGames}/>
            {/* component for games that need my attention - with accept/reject buttons, ordered soonest to furthest away  */}
            {/* component for the rest of games, with cancel buttons (see Notes.txt), ordered soonest to furthest away */}
            <Footer/>
        </Box>
    )
}


