import { useState } from "react";
import axios from "axios";
// import Modali, { useModali } from "modali";
import Modal from "react-modal";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import GameDetail from "./OLDgameDetail";
import EditGame from "../pages/editGame";
import { IconButton, Button, Text, Heading, Box } from '@chakra-ui/react'
import { StarIcon, CloseIcon } from "@chakra-ui/icons";

export default function OldGamesList({ token, games, listType, listTitle }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [joinRequestSent, setJoinRequestSent] = useState(false);
    const [currentGame, setCurrentGame] = useState(null);
    const [editClicked, setEditClicked] = useState(false);

    Modal.setAppElement("#root");

    const handleOpenModal = (game) => {
        console.log("click modal open");
        console.log(game.id);
        // console.log(game)
        setModalIsOpen(true);
        setCurrentGame(game);
        console.log(currentGame);
        console.log(modalIsOpen);
        console.log(listType);
    };

    const handleCloseModal = (game) => {
        console.log("click close");
        console.log(game);
        setModalIsOpen(false);
    };

    const handleCancelRequest = (game) => {
        console.log("click cancel request");
        console.log(game);
        axios
            .delete(
                `https://teammate-app.herokuapp.com/session/${game.id}/guest/${game.guest_info[0].id}`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .catch((error) => {
                alert(error.response.data.detail);
            });
        // Does FE need to anything else with this? Or does the next person in the queue get updated in BE?
    };

    const handleAcceptRequest = (game) => {
        console.log("click accept request");
        console.log(game);
        console.log(game.guest_info[0].id);
        axios
            .patch(
                `https://teammate-app.herokuapp.com/session/${game.id}/guest/${game.guest_info[0].id}`,
                { status: "Accepted" },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log("accept request patch sent" + res.data);
            })
            .catch((error) => {
                alert(error.response.data.detail);
            });
    };
    // Maybe also something to notify the guest?? or BE?

    const handleRejectRequest = (game) => {
        console.log("click reject request");
        console.log(game);
        axios
            .patch(
                `https://teammate-app.herokuapp.com/session/${game.id}/guest/${game.guest_info[0].id}`,
                { status: "Rejected" },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log("reject request patch sent" + res.data);
            })
            .catch((error) => {
                alert(error.response.data.detail);
            });

        // Maybe also something to notify the guest? or BE?
    };

    const handleCancelConfirmed = (game) => {
        console.log("click cancel confirmed game");
        console.log(game);
        axios
            .delete(`https://teammate-app.herokuapp.com/session/${game.id}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .catch((error) => {
                alert(error.response.data.detail);
            });
        // Maybe also something to notify the guest? or BE?
    };

    const handleJoinClick = (game) => {
        console.log("join click");
        console.log(game);
        setCurrentGame(game);
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

    const handleDeleteMyGame = (game) => {
        console.log("click cancel my open game");
        axios
            .delete(`https://teammate-app.herokuapp.com/session/${game.id}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .catch((error) => {
                alert(error.response.data.detail);
            });
        // What do we need to do if there's already a guest in the queue? BE?
    };

    const handleEditMyGame = (game) => {
        console.log("click edit my game");
        setEditClicked(true);
        setCurrentGame(game);
        // axios request
        // What do we need to do if there's already a guest in the queue? BE?
    };

    if (editClicked) {
        return <EditGame token={token} game={currentGame} />;
    }

    if (joinRequestSent) {
        return <AfterJoinRequestSent game={currentGame} />;
    }
    console.log(games);
    return (
        <Box>

            
    <Box>{listTitle}</Box>
    {games.map((game) => (
        <Box className="game-card" key={game.id}>
        <Box  w='50%'><Heading size="md">{game.location_info.park_name}</Heading></Box>
        <Box w='50%' display='flex' justifyContent='end'>
        <Button colorScheme='teal' size='xs'
                onClick={() => {
                    handleOpenModal(game);
                }}
            >Show more</Button>
            </Box>
            <Box className='full-width'>
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
                    
                

                    {(() => {
                        switch (listType) {
                            case "allOpen":
                                return (
                                    <Box w='100%' display='flex' justifyContent='end'>
                                    <Button colorScheme='teal'
                                        onClick={() => handleJoinClick(game)}
                                    >
                                        Join
                                    </Button>
                                    </Box>
                                );
                            case "pendingPOVGuest":
                                return (
                                    <Button colorScheme='teal'
                                        onClick={() =>
                                            handleCancelRequest(game)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                );
                            case "pendingPOVHost":
                                return (
                                    <>
                                    <Box w="100%" display="flex" justifyContent="center">
                                        <Button colorScheme='teal' w='50%'
                                            onClick={() =>
                                                handleAcceptRequest(game)
                                            }
                                        >
                                            Accept
                                        </Button>
                                        &nbsp;
                                        <Button colorScheme='red' w='50%'
                                            onClick={() =>
                                                handleRejectRequest(game)
                                            }
                                        >
                                            Reject
                                        </Button>
                                    </Box>
                                    </>
                                );
                            case "myOpen":
                                return (
                                    <>
                                    <Box w='100%' display='flex' justifyContent='center'>
                                        <Button colorScheme='teal' w='50%'>
                                           <Link
                                            to={`/edit/${game.id}`}
                                            token={token}
                                            game={game}
                                        >
                                            Edit
                                        </Link>
                                        </Button>&nbsp;
                                        <Button colorScheme='red' w='50%'
                                            onClick={() =>
                                                handleDeleteMyGame(game)
                                            }
                                        >
                                            Delete
                                        </Button>
                                        </Box>
                                    
                                    </>
                                );
                            case "confirmed":
                                return (
                                    <Button colorScheme='teal'
                                        onClick={() =>
                                            handleCancelConfirmed(game)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                );
                            default:
                                return null;
                        }
                    })()}
                </Box>
            ))}
            <Modal
                isOpen={modalIsOpen}
                game={currentGame}
                contentLabel="Game Detail Modal"
                className="modal"
                overlayClassName="modal-overlay"
                listType={listType}
            >
                              <Button
                    onClick={() => {
                        handleCloseModal();
                    }}
                    className="close-modal-button"
                    variant="ghost"
                    colorScheme="teal"
                >
                    <CloseIcon color="white" />
                </Button>
                {modalIsOpen}

                {/* switch case for sending different buttons through to the modal  */}
                {(() => {
                    switch (listType) {
                        case "allOpen":
                            return (
                                <GameDetail
                                    game={currentGame}
                                    listType={listType}
                                    handleJoinClick={handleJoinClick}
                                />
                            );
                        case "pendingPOVGuest":
                            return (
                                <GameDetail
                                    game={currentGame}
                                    listType={listType}
                                    handleCancelRequest={handleCancelRequest}
                                />
                            );
                        case "pendngPOVHost":
                            return (
                                <GameDetail
                                    game={currentGame}
                                    listType={listType}
                                    handleAcceptRequest={handleAcceptRequest}
                                    handleRejectRequest={handleRejectRequest}
                                />
                            );
                        case "myOpen":
                            return (
                                <GameDetail
                                    game={currentGame}
                                    listType={listType}
                                    handleDeleteMyGame={handleDeleteMyGame}
                                    // handleEditMyGame={handleEditMyGame}
                                />
                            );
                        case "confirmed":
                            return (
                                <GameDetail
                                    game={currentGame}
                                    listType={listType}
                                    handleCancelConfirmed={
                                        handleCancelConfirmed
                                    }
                                />
                            );
                        default:
                            return null;
                    }
                })()}
            </Modal>
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
