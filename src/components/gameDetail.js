import { DateTime } from "luxon";
import { Text, Heading, Image, Icon, IconButton, Button } from "@chakra-ui/react";
import noImage from "../images/no-image.jpg";

export default function GameDetail({ game, listType, handleJoinClick, handleCancelRequest, handleAcceptRequest, handleRejectRequest, handleDeleteMyGame, handleCancelConfirmed, handleEditMyGame  }) {
    console.log(game);
    return (
        <div className="modal-base">
            <div><Heading size="2xl" color="teal">{game.location_info.park_name}</Heading></div>
            <div><Text>{game.location_info.address.address1} {game.location_info.address.address2} {game.location_info.address.city}, {game.location_info.address.state} {game.location_info.address.zipcode}</Text></div>
            <div>
                        {DateTime.fromISO(game.date).toLocaleString({
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        })}{" "}
                        at {" "}
                        {DateTime.fromISO(game.time).toLocaleString(
                            DateTime.TIME_SIMPLE
                        )}
                    </div>
            <div><Text >{game.host_info.first_name} {game.host_info.last_name}</Text></div>
            
            {/* <div>                <Image
                  src={`${game.profile.profile_pic}`}
                  alt={game.username}
                  fallbackSrc={noImage}
                  borderRadius="full"
                  boxSize="150px"
                /></div> */}

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
                                <button onClick={() => handleAcceptRequest(game)}>
                                    Accept
                                </button>
                                <button onClick={() => handleRejectRequest(game)}>
                                    Reject
                                </button>
                            </>
                        );
                    case "myOpen":
                        return (
                            <>
                                <button
                                    onClick={() => handleDeleteMyGame(game)}
                                >
                                    Delete
                                </button>
                                <button onClick={() => handleEditMyGame(game)}>
                                    Edit
                                </button>
                            </>
                        );
                    case "confirmed":
                        return (
                            <button onClick={() => handleCancelConfirmed(game)}>
                                Cancel
                            </button>
                        );
                    default:
                        return null;
                }
            })()}
        </div>
    );
}
