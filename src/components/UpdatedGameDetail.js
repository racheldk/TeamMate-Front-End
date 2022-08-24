import { Text, Heading, Image, Button, Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noImage from "../images/no-image.jpg";
import axios from "axios";

export default function UpdatedGameDetail({
    token,
    currentGame,
    handleCloseModal,
}) {
    console.log(currentGame.buttons[0].label);

    currentGame.buttons.map((button) => {
        console.log(button.label);
    });

    const variableHandler = `handle${currentGame.buttons[0].job}`;

    const handleJoin = (game) => {
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
                <Box>{currentGame.id}</Box>
                <Box className="game-card" key={currentGame.id}>
                    {/* the following ternary is so the page doesn't break if the user's profile isn't filled out */}
                    {currentGame.guest_info.length > 0 && (
                        <>
                            <Text>{`${currentGame.host_info.first_name} ${currentGame.host_info.last_name}`}</Text>
                            <Text>{currentGame.host}</Text>
                            <Image
                                src={`${currentGame.host_info.profile.profile_pic}`}
                                alt={currentGame.host_info.username}
                                fallbackSrc={noImage}
                                borderRadius="full"
                                boxSize="150px"
                            />
                            <Text>
                                NTRP:{" "}
                                {currentGame.host_info.profile.ntrp_rating}{" "}
                            </Text>
                        </>
                    )}

                    <Text>{currentGame.location_info.park_name}</Text>
                    <Text>{currentGame.match_type}</Text>
                    <Text>{currentGame.session_type}</Text>
                    <Text>
                        {DateTime.fromISO(currentGame.date).toLocaleString({
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        })}{" "}
                        at{" "}
                        {DateTime.fromISO(currentGame.time).toLocaleString(
                            DateTime.TIME_SIMPLE
                        )}
                    </Text>

                    {/* <Box>
                        {currentGame.buttons.map((obj) => (
                            <Button  key={obj.label} onClick={() => `${variableHandler}`(currentGame)
                            }>
                                <Text color="teal">{obj.label} </Text>
                            </Button>
                        ))}
                    </Box> */}

                    <Box>
                        {currentGame.buttons.map((obj) => (
                            <Button onClick={() => handleJoin(currentGame)
                            }>
                                <Text color="teal">test {obj.label} </Text>
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
