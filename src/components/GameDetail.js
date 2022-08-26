import { Text, Heading, Image, Button, Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { DateTime } from "luxon";
import noImage from "../images/no-image.jpg";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export default function GameDetail({
    token,
    game,
    handleCloseModal,
    username,
}) {
    const [editClicked, setEditClicked] = useState(false);

    console.log(game);
    console.log(token);

    const handleClick = (game, button) => {
        if (game.displayStatus === "join") {
            joinSession(game);
        }
        if (button.job === "handleAccept") {
            acceptRequest(game);
        }
        if (button.job === "handleReject") {
            rejectRequest(game);
        }
        if (
            (game.displayStatus === "confirmed" && game.host === username) ||
            button.label === "Delete this game" ||
            game.displayStatus === "host open doubles"
        ) {
            cancelGame(game);
        }
        if (
            (game.displayStatus === "confirmed" && game.host !== username) ||
            game.displayStatus === "pendingPOVGuest" ||
            game.displayStatus === "guest open doubles"
        ) {
            cancelGuest(game);
        }
        if (button.label === "Edit this game") {
            console.log("edit clicked");
            handleCloseModal();
            setEditClicked(true);
        }
    };

    if (editClicked) {
        console.log(game)
        return <Navigate to={`edit/${game.id}`} />;
    }

    const joinSession = (game) => {
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
            })
            .catch((error) => {
                alert(error.response.data.detail);
            });
        handleCloseModal();
    };

    const acceptRequest = (game) => {
        console.log("accept request click");
        console.log(game);
        axios
            .patch(
                `https://teammate-app.herokuapp.com/session/${game.id}/guest/${game.displayUsers.id}/`,
                { status: "Accepted" },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then(() => {
                console.log("acceptRequest patch sent");
                alert("You accepted a request to join your game");
            })
            .catch((error) => {
                alert(error.response.data.detail);
            });
    };

    const rejectRequest = (game) => {
        console.log("accept request click");
        console.log(game);
        axios
            .patch(
                `https://teammate-app.herokuapp.com/session/${game.id}/guest/${game.displayUsers.id}/`,
                { status: "Rejected" },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then(() => {
                console.log("rejectRequest patch sent");
                alert("You did not accept a request to join your game");
            })
            .catch((error) => {
                alert(error.response.data.detail);
            });
    };

    const cancelGame = (game) => {
        console.log("join click");
        console.log(game);
        axios
            .delete(`https://teammate-app.herokuapp.com/session/${game.id}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then(() => {
                console.log("delete game sent");
                alert("You cancelled a game");
            })
            .catch((error) => {
                alert(error.response.data.detail);
            });
    };

    const cancelGuest = (game) => {
        console.log("cancel guest click");
        console.log(game);
        axios
            .delete(
                `https://teammate-app.herokuapp.com/session/${game.id}/guest/${game.guest[0]}`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then(() => {
                console.log("delete guest session sent");
                alert("You cancelled a request to join a game");
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
                    {game.displayUsers.length > 0 &&
                        game.displayUsers.map((user) => (
                            <Box key={user}>
                                <Text>{`${user.user}`}</Text>
                                <Text color="pink">
                                    User profile info will go here - currently
                                    not returning guest info.{" "}
                                </Text>
                                {/* <Image
                                src={`${game.host_info.profile.profile_pic}`}
                                alt={game.host_info.username}
                                fallbackSrc={noImage}
                                borderRadius="full"
                                boxSize="150px"
                                />
                            <Text>
                                NTRP:{" "}
                                {game.host_info.profile.ntrp_rating}{" "}
                            </Text> */}
                            </Box>
                        ))}

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
                        {game.buttonTitle && (
                            <Text>
                                {game.buttonTitle}
                                {game.guest}?
                            </Text>
                        )}
                        {game.buttons.map((button) => (
                            <Button
                                key={button.label}
                                onClick={() => handleClick(game, button)}
                            >
                                <Text color="red">{button.label} </Text>
                            </Button>
                        ))}
                    </Box>

                    {/* <Box>
                        {game.buttons.map((button) => (
                            <Button onClick={() => handleJoin(game)
                            }>
                                <Text color="teal">test {button.label} </Text>
                            </Button>
                        ))}
                    </Box> */}
                </Box>
            </Box>
        </Box>
    );
}
