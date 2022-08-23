import {
    Text,
    Heading,
    Image,
    Icon,
    IconButton,
    Button,
    Box,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import OpenGameDetail from "./OpenGameDetail";
import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OpenGamesList({ token, games }) {

    return (
        <Box>
            <Heading>OpenGamesList Component</Heading>
            <Box>
                {games.map((game) => (
                    <Box className="game-card" key={game.id}>
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
                        <Button variant="outline">Join</Button>
                        {/* inline button styling was just to make it visible while styles are being finalized */}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
