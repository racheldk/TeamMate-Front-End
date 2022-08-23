import {
    Text,
    Heading,
    Button,
    Box,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import {  Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { CheckIcon, SunIcon } from '@chakra-ui/icons'


export default function OpenGamesList({ token, games }) {
    const [currentGame, setCurrentGame] = useState(null)
    const [joinRequestSent, setJoinRequestSent] = useState(false);


    const handleJoinClick = (game) => {
        console.log("join click");
        console.log(game);
        setCurrentGame(game)
        axios
            .post(
                `https://teammate-app.herokuapp.com/session/${game.id}/guest/`,
                {},
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then(() => {
                console.log("guest posted");
                setJoinRequestSent(true);
            })
            .catch((error) => {
                alert(error.response.data.detail);
            });
    };

    if (joinRequestSent) {
        return <AfterJoinRequestSent game={currentGame} />;
    }
    return (
        <Box>
            <Heading>OpenGamesList Component</Heading>
            <Box>
                {games.map((game) => (
                    <Box className="game-card" key={game.id}>
                        {/* final version won't have host name, id, or confirmed just to check data is rendering correctly */}
                        <Text>{game.id} </Text>
                        <Text>(Hosted by {game.host})</Text>
                        <Text>confirmed: {`${game.confirmed}`}</Text>
                        {/* the icons below are just for example - they will change when icons have been decided */}
                        <Box>
                            {(game.confirmed) ? (<CheckIcon/>):(<SunIcon/>) }
                        </Box>

                        {/* inline button styling was just to make it visible while styles are being finalized */}
                        <Link
                            to={`/open-games/${game.id}`}
                            token={token}
                        >
                            <Button size="sm" variant="outline">
                                More details
                            </Button>
                        </Link>
                        <Text>{game.location_info.park_name}</Text>
                        <Text>{game.match_type}</Text>
                        <Text>{game.session_type}</Text>
                        <Text>(Host rating will go here, too)</Text>
                        <Text>
                            {DateTime.fromISO(game.date).toLocaleString({
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                            })}{" "}
                            at{" "}
                            {DateTime.fromISO(game.time).toLocaleString(
                                DateTime.TIME_SIMPLE
                            )}
                        </Text>
                        <Button colorScheme='teal'
                                        onClick={() => handleJoinClick(game)}
                                    >
                                        Join
                                    </Button>
                        {/* inline button styling was just to make it visible while styles are being finalized */}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}


function AfterJoinRequestSent({ game }) {
    console.log(game);
    return (
        <>
            <Box>
                <Text>You requested to join {game.host_info.first_name}'s game at{" "}
                {game.location_info.park_name} on{" "}
                {DateTime.fromISO(game.date).toLocaleString({
                    month: "long",
                    day: "numeric",
                })}{" "}
                at{" "}
                {DateTime.fromISO(game.time).toLocaleString(
                    DateTime.TIME_SIMPLE
                )}
                .</Text>
            </Box>
            <Box>
                <Text>You will be notified after {game.host_info.first_name} has
                confirmed the game, or if they're unable to play.{" "}</Text>
            </Box>
            <Link to={"/my-games"}>Return to My Games</Link>
        </>
    );
}