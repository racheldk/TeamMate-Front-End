import { Text, Heading, Image, Button, Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { DateTime } from "luxon";
import noImage from "../images/no-image.jpg";
import axios from "axios";

export default function GameDetail({
    token,
    game,
    handleCloseModal,
}) {
    console.log(game);

    const handleJoin = () => {
        console.log("join click");
        console.log(game);
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
                alert("You sent a join request");
                // setJoinRequestSent(true);
            })
            .catch((error) => {
                alert(error.response.data.detail);
            });
    };


    return (
        <Box className="modal-overlay">
            <Box className="modal-base">
                <Heading>UpdatedGameDetail Component</Heading>
                <Button
                    onClick={() => {
                        handleCloseModal();
                    }}
                    className="close-modal-button"
                    variant="ghost"
                    colorScheme="teal"
                >
                    <CloseIcon color="red" />
                </Button>
                <Box>{game.id}</Box>
                <Box className="game-card" key={game.id}>
                    {game.displayUsers.length > 0 && (
                        <>
                            <Text>{`${game.host_info.first_name} ${game.host_info.last_name}`}</Text>
                            <Text>{game.host}</Text>
                            <Image
                                src={`${game.host_info.profile.profile_pic}`}
                                alt={game.host_info.username}
                                fallbackSrc={noImage}
                                borderRadius="full"
                                boxSize="150px"
                            />
                            <Text>
                                NTRP:{" "}
                                {game.host_info.profile.ntrp_rating}{" "}
                            </Text>
                        </>
                    )}

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

                    <Box>
                        {game.buttons.map((obj) => (
                            <Button  key={obj.label} onClick={()=>console.log(`${obj.label} clicked`)}
                            >
                                <Text color="red">{obj.label} </Text>
                            </Button>
                        ))}
                    </Box>

                    {/* <Box>
                        {game.buttons.map((obj) => (
                            <Button onClick={() => handleJoin(game)
                            }>
                                <Text color="teal">test {obj.label} </Text>
                            </Button>
                        ))}
                    </Box> */}
                </Box>
            </Box>
        </Box>
    );
}
