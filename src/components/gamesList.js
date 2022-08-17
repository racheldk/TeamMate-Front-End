import { useState } from "react";
import axios from "axios";
// import Modali, { useModali } from "modali";
import Modal from "react-modal";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import GameDetail from "./gameDetail";

export default function GamesList({ token, games, listType, listTitle }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [joinRequestSent, setJoinRequestSent] = useState(false);
    const [currentGame, setCurrentGame] = useState(null);

    Modal.setAppElement("#root");

    const handleOpenModal = (game) => {
        console.log("click modal open");
        console.log(game.id);
        setCurrentGame(game);
        setModalIsOpen(true);
        // setModalData(game);
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
        .delete(`https://teammate-app.herokuapp.com/session/${game.id}/guest/${game.guest_info[0].id}/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .catch((res) => {
            // setError(error.message);
            alert(res.detail);
        });

        // axios request here
        // Does FE need to anything else with this? Or does the next person in the queue get updated in BE?
    };

    const handleAcceptRequest = (game) => {
        console.log("click accept request");
        console.log(game);
        console.log(game.guest_info[0].id)
        axios.patch(
            `https://teammate-app.herokuapp.com/session/${game.id}/guest/${game.guest_info[0].id}/`,
            { status: "Accepted" },
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        )
        .then((res) => {console.log("accept request patch sent" + res.data)})
        .catch((error) => {
            console.log(error)
            setError(error.message)
        }) 
        }
        // Maybe also something to notify the guest?? or BE?

    const handleRejectRequest = (game) => {
        console.log("click reject request");
        console.log(game);
        // axios request here
        axios.patch(
            `https://teammate-app.herokuapp.com/session/${game.id}/guest/${game.guest_info[0].id}/`,
            { status: "Rejected" },
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        )
        .then((res) => {console.log("reject request patch sent" + res.data)})
        .catch((error) => {
            console.log(error)
            setError(error.message)
        }) 
        
        // Maybe also something to notify the guest? or BE?
    };

    const handleCancelConfirmed = (game) => {
        console.log("click cancel confirmed game");
        console.log(game);
        // axios request
        axios
        .delete(`https://teammate-app.herokuapp.com/session/${game.id}`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .catch((res) => {
            // setError(error.message);
            alert(res.detail);
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
            .then(()=>{
                console.log("guest posted");
                setJoinRequestSent(true);
            })
            .catch((error) => {
                console.log(error)
                setError(error.message);
            });
    };

    const handleDeleteMyGame = (game) => {
        console.log("click cancel my open game");
        // axios request
        axios
            .delete(`https://teammate-app.herokuapp.com/session/${game.id}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .catch((res) => {
                // setError(error.message);
                alert(res.detail);
            });
        // What do we need to do if there's already a guest in the queue? BE?
    };

    const handleEditMyGame = () => {
        console.log("click edit my game");
        // axios request
        // What do we need to do if there's already a guest in the queue? BE?
    };

    if (joinRequestSent) { 
        return <AfterJoinRequestSent game={currentGame} />}
    


    return (
        <div>
            <div>{listTitle}</div>
            {games.map((game) => (
                <div className="game" key={game.id}>
                    <button
                        onClick={() => {
                            handleOpenModal(game);
                        }}
                    >
                        more details
                    </button>
                    <div>Location: {game.location_info.park_name}</div>
                    <div>
                        {game.date} at {game.time}
                    </div>

                    {/* make a ternary or switch case thing to render certain buttons based on listType state */}

                    {(() => {
                        switch (listType) {
                            case "allOpen":
                                return (
                                    <button
                                        onClick={() => handleJoinClick(game)}
                                    >
                                        Join
                                    </button>
                                );
                            case "pendingPOVGuest":
                                return (
                                    <button
                                        onClick={() =>
                                            handleCancelRequest(game)
                                        }
                                    >
                                        Cancel
                                    </button>
                                );
                            case "pendingPOVHost":
                                return (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleAcceptRequest(game)
                                            }
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleRejectRequest(game)
                                            }
                                        >
                                            Reject
                                        </button>
                                    </>
                                );
                            case "myOpen":
                                return (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleDeleteMyGame(game)
                                            }
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleEditMyGame(game)
                                            }
                                        >
                                            Edit
                                        </button>
                                    </>
                                );
                            case "confirmed":
                                return (
                                    <button
                                        onClick={() =>
                                            handleCancelConfirmed(game)
                                        }
                                    >
                                        Cancel
                                    </button>
                                );
                            default:
                                return null;
                        }
                    })()}

                    {/* <button>Join</button> */}
                </div>
            ))}
            <Modal
                isOpen={modalIsOpen}
                game={currentGame}
                contentLabel="Game Detail Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <button onClick={() => handleCloseModal()}>close</button>

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
                                    handleEditMyGame={handleEditMyGame}
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
        </div>
    );
}

function AfterJoinRequestSent({ game }) {
    console.log(game);
    return (
        <>
            <div>
                You requested to join {game.host_info.first_name}'s game at{" "}
                {game.location_info.park_name} on{" "}
                {DateTime.fromISO(game.date).toLocaleString({
                    month: "long",
                    day: "numeric",
                })}{" "}
                at{" "}
                {DateTime.fromISO(game.time).toLocaleString(
                    DateTime.TIME_SIMPLE
                )}
                .
            </div>
            <div>
                You will be notified after {game.host_info.first_name} has
                confirmed the game, or if they're unable to play.{" "}
            </div>
            <Link to={"/my-games"}>Return to My Games</Link>
        </>
    );
}
