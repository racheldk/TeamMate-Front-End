import { DateTime } from "luxon";
import { Text, Heading, Image, Icon, IconButton, Button, Box } from "@chakra-ui/react";
import noImage from "../images/no-image.jpg";

export default function GameDetail({ game, listType, handleJoinClick, handleCancelRequest, handleAcceptRequest, handleRejectRequest, handleDeleteMyGame, handleCancelConfirmed, handleEditMyGame  }) {
    console.log(game);
    return (
        <Box className="modal-base">
            <Box><Heading size="2xl" color="teal">{game.location_info.park_name}</Heading></Box>
            <Box><Text>{game.location_info.address.address1} {game.location_info.address.address2} {game.location_info.address.city}, {game.location_info.address.state} {game.location_info.address.zipcode}</Text></Box>
            <Box>
                        {DateTime.fromISO(game.date).toLocaleString({
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        })}{" "}
                        at {" "}
                        {DateTime.fromISO(game.time).toLocaleString(
                            DateTime.TIME_SIMPLE
                        )}
                    </Box>
            <Box><Text>{game.host_info.first_name} {game.host_info.last_name}</Text></Box>
            
            {/* <Box>                <Image
                  src={`${game.profile.profile_pic}`}
                  alt={game.username}
                  fallbackSrc={noImage}
                  borderRadius="full"
                  boxSize="150px"
                /></Box> */}

            {(() => {
                switch (listType) {
                    case "allOpen":
                        return (
                            <Button colorScheme="teal" onClick={() => handleJoinClick(game)}>
                                Join
                            </Button>
                        );
                    case "pendingPOVGuest":
                        return (
                            <Button onClick={() => handleCancelRequest(game)}>
                                Cancel
                            </Button>
                        );
                    case "pendingPOVHost":
                        return (
                            <>
                                <Button colorScheme='teal' w='50%' onClick={() => handleAcceptRequest(game)}>
                                    Accept
                                </Button>&nbsp;
                                <Button colorScheme='red' w='50%' onClick={() => handleRejectRequest(game)}>
                                    Reject
                                </Button>
                            </>
                        );
                    case "myOpen":
                        return (
                            <>
                            <Button onClick={() => handleEditMyGame(game)} w='30%' colorScheme='teal'>
                                    Edit
                                </Button>&nbsp;
                                <Button w='30%' colorScheme='red'
                                    onClick={() => handleDeleteMyGame(game)}
                                >
                                    Delete
                                </Button>
                            </>
                        );
                    case "confirmed":
                        return (
                            <Button w='90%' colorScheme='red' onClick={() => handleCancelConfirmed(game)}>
                                Cancel
                            </Button>
                        );
                    default:
                        return null;
                }
            })()}
        </Box>
    );
}
