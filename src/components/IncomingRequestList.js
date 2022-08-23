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
import { Link } from "react-router-dom";
import { WarningIcon } from "@chakra-ui/icons";

export default function IncomingRequestList({ token, games }) {
    console.log(games);

    return (
        <Box>
            <Heading>Incoming Request List</Heading>
            {games.map((game) => (
                <Box className="game-card" key={game.id}>
                    {/* final version won't have host name, id, or confirmed just to check data is rendering correctly */}
                    <Text>{game.id} </Text>

                    {/* inline button styling was just to make it visible while styles are being finalized */}
                    <Link to={`/incoming/${game.id}`} token={token}>
                        <Button size="sm" variant="outline">
                            More details
                        </Button>
                    </Link>
                    <Box>
                        <WarningIcon/>
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
                    </Text>
                    <Button colorScheme="teal">Join</Button>
                    {/* inline button styling was just to make it visible while styles are being finalized */}
                </Box>
            ))}
        </Box>
    );
}
