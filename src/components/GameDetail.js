import { Text, Heading, Image, Button, IconButton, Box } from "@chakra-ui/react";
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
        return <Navigate to={`edit/${game.game_session_id}`} />;
    }

    const joinSession = (game) => {
        console.log("join click");
        console.log(game);
        axios
            .post(
                `https://teammate-app.herokuapp.com/session/${game.game_session_id}/guest/`,
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
                `https://teammate-app.herokuapp.com/session/${game.game_session_id}/guest/${game.displayUsers[0].guest_id}/`,
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
        console.log("reject request click");
        console.log(game);
        axios
            .patch(
                `https://teammate-app.herokuapp.com/session/${game.game_session_id}/guest/${game.displayUsers[0].guest_id}/`,
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
                `https://teammate-app.herokuapp.com/session/${game.game_session_id}/guest/${game.guest[1]}`,
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
            <Box textAlign='right' className="modal">
            <IconButton onClick={()=>handleCloseModal()} className="close-modal-button" variant='outline' colorScheme='teal'><CloseIcon color='white'/></IconButton>
            
                <Box className="modal-base" display='flex' flexWrap='wrap' key={game.id} justifyContent='center'>
                <Heading fontWeight='700' w='100%'>{game.location_info.park_name}</Heading>
                <Box w='350px' display='flex' justifyContent='center'>
                    {game.displayUsers.length > 0 &&
                        game.displayUsers.map((user) => (
                            <Box key={user.user_id} m='auto'>
                                <Text>{`${user.user_info.first_name} ${user.user_info.last_name}`}</Text>
                                <Text>{`@${user.user}`}</Text>
                                <Box boxSize="100px" display='flex' >
                                <Image
                                src={`${user.user_info.profile.profile_image_file}`}
                                alt={user}
                                fallbackSrc={noImage}
                                borderRadius="full"
                                m='auto'
                                />
                                </Box>
                            <Text>
                                NTRP:{" "}
                                {user.user_info.profile.ntrp_rating}{" "}
                            </Text>
                            </Box>
                        ))}</Box>

                    
                    <Text w='100%' marginTop={3}>{game.match_type} | {game.session_type}</Text>
                    <Text fontWeight='700'>
                        {DateTime.fromISO(game.datetime).toLocaleString(
                            DateTime.DATETIME_MED_WITH_WEEKDAY
                        )}
                    </Text>

                    <Box w='100%' m={3}>
                        {game.buttonTitle && (
                            <Text>
                                {game.buttonTitle}
                                {game.displayUsers[0].user}?
                            </Text>
                        )}
                        {game.buttons.map((button) => (
                            <Button colorScheme='teal'
                                key={button.label}
                                onClick={() => handleClick(game, button)}
                            >
                                <Text color="white">{button.label} </Text>
                            </Button>
                        ))}
                </Box>
            </Box>
        </Box>
        </Box>
    );
}
