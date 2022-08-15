import { useEffect, useState } from "react";
import axios from "axios";
// import Modali, { useModali } from "modali";
import Modal from "react-modal";

export default function GamesList({ token, games }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [listType, setListType] = useState("allOpen");

    Modal.setAppElement("#root");

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

    const handleCancelMyGame = () => {
        console.log('click cancel my open game')
        // axios request
    }

    return (
        <div>

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
                                return <button>Join</button>
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
                                    return <button onClick={()=> handleCancelMyGame}>Cancel</button>
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
                <OpenGameDetail game={modalData} />
            </Modal>
        </div>
    );
}

function OpenGameDetail({ game }) {
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
            <button>join</button>
        </div>
    );
}