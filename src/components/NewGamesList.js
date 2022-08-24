import {
    Text,
    Heading,
    Image,
    Button,
    Box,
    Icon,
    LinkBox,
    LinkOverlay
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noImage from "../images/no-image.jpg";
import axios from "axios";
import { Link as ReactLink} from "react-router-dom";

export default function NewGamesList({token, games}) {
console.log(games)

    return(
        <Box>
            <Heading>NewGamesList Component</Heading>
            <Text>Category: {games[0].displayStatus}</Text>
            {games.map((game) => (
                <LinkBox>
                <LinkOverlay as={ReactLink} to={`${game.id}`}>
                    <Box className="game-card" bg=
                {`${game.bgColor}`} key={game.id}>
                    {/* final version won't have host name, id, or confirmed just to check data is rendering correctly */}


                    <Text>{game.id} </Text>
                    <Box>
                        <Text>(This will be an icon)</Text>
                        <Icon as={`Fa${game.icon}`} color={`${game.backgroundColor}`}/>
                    </Box>
                    <Text>{game.location_info.park_name}</Text>
                    <Text>{game.match_type}</Text>
                    <Text>{game.session_type}</Text>
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
                    </Text></Box>
                </LinkOverlay>
                </LinkBox>
            ))}
        </Box>
    )
}