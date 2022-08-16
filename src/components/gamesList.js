import { useState } from "react";
import axios from "axios";
// import Modali, { useModali } from "modali";
import Modal from "react-modal";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";


export default function GamesList({ token, games, listType, listTitle }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [error, setError] = useState(null);
    const [joinRequestSent, setJoinRequestSent] = useState(false)
    const [currentGame, setCurrentGame] = useState(null)

    Modal.setAppElement('#root');

    const handleOpenModal = (game) => {
        console.log("click open");
        console.log(game.id);
        setModalIsOpen(true);
        setModalData(game);
        console.log(modalData);
    };

    const handleCloseModal = () => {
        console.log("click close");
        setModalIsOpen(false);
    };

    const handleCancelRequest = () => {
        console.log("click cancel request");
        // axios request here
        // Does FE need to anything else with this? Or does the next person in the queue get updated in BE?
    };

    const handleAcceptRequest = () => {
        console.log("click accept request");
        // axios request here
        // Maybe also something to notify the guest?? or BE?
    };

    const handleRejectRequest = () => {
        console.log("click reject request");
        // axios request here
        // Maybe also something to notify the guest? or BE?
    };

    const handleCancelConfirmed = () => {
        console.log("click cancel confirmed game");
        // axios request
        // Maybe also something to notify the guest? or BE?
    };

    const handleJoinClick = (game) => {
        console.log("join click")
        console.log(game)
        setCurrentGame(game)
        axios 
            .post(`https://teammate-app.herokuapp.com/session/${game.id}/guest`, {}, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then(console.log('guest posted'))
            .catch((error) => {
                setError(error.message);
            })
        setJoinRequestSent(true)    
    }

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
        return (
            <AfterJoinRequestSent game={currentGame}/>
        )
    }

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
                                return   <button onClick={()=>handleJoinClick(game)}
                                >Join</button>;
                            // this will have the same onClick as in the join-game branch
                            case "pendingPOVGuest":
                                return (
                                    <button onClick={() => handleCancelRequest}>
                                        Cancel
                                    </button>
                                );
                            case "pendingPOVHost":
                                return (
                                    <>
                                        <button
                                            onClick={() => handleAcceptRequest}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleRejectRequest}
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
                                            onClick={() => handleEditMyGame}
                                        >
                                            Edit
                                        </button>
                                    </>
                                );
                            case "confirmed":
                                return (
                                    <button
                                        onClick={() => handleCancelConfirmed}
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
                game={modalData}
                contentLabel="Game Detail Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <button onClick={() => handleCloseModal()}>close</button>
                <OpenGameDetail game={modalData} handleJoinClick={handleJoinClick}/>
            </Modal>
        </div>
    );
}

function OpenGameDetail({ game, handleJoinClick }) {
    console.log(game);
    return (
        <div>
            <div>{game.location_info.park_name}</div>
            <div>(park address)</div>
            <div>
                {game.date} {game.time}
            </div>
            <div>{game.host_info.first_name}</div>
            <div>{game.host_info.last_name}</div>
            <div>{game.host_info.username}</div>
            <button onClick={()=>handleJoinClick(game)}>join</button>
        </div>
    );
}

function AfterJoinRequestSent({game}) {
    console.log(game)
    return(
        <>
        <div>
            You requested to join {game.host_info.first_name}'s game at {game.location_info.park_name} on {DateTime.fromISO(game.date).toLocaleString({month:'long', day:'numeric'}
                )} at {DateTime.fromISO(game.time).toLocaleString(DateTime.TIME_SIMPLE)}. 
        </div>
        <div>You will be notified after {game.host_info.first_name} has confirmed the game, or if they're unable to play. </div>
        <Link to={"/my-games"}>Return to My Games</Link>
        </>
    )
}