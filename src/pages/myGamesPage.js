import { Text, Heading, Image, Icon, IconButton, Button, Box } from "@chakra-ui/react";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import IncomingRequestList from "../components/IncomingRequestList";
import { useState, useEffect } from "react";
import axios from "axios";


export default function MyGames({token, username}) {
console.log(username)

    const [userPendingPOVHostGames, setUserPendingPOVHostGames] = useState([]);


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
                setUserPendingPOVHostGames(res.data);
            });
    }, []);

    return(
        <Box className="app-body">
            <Header/>
            <Heading>MyGames Component</Heading>
            <IncomingRequestList token={token} games={userPendingPOVHostGames}/>
            {/* component for games that need my attention - with accept/reject buttons, ordered soonest to furthest away  */}
            {/* component for the rest of games, with cancel buttons (see Notes.txt), ordered soonest to furthest away */}
            <Footer/>
        </Box>
    )
}
