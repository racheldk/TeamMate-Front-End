import { useEffect, useState } from "react";
import axios from "axios";
// import Modali, { useModali } from "modali";
import Modal from "react-modal";

export default function GamesList({ token }) {
    const [allGamesList, setAllGamesList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [error, setError] = useState('')
    const [joinRequestSent, setJoinRequestSent] = useState(false)

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

    const handleJoinClick = (game) => {
        console.log("join click")
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

    useEffect(() => {
        axios
            .get("https://teammate-app.herokuapp.com/session", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setAllGamesList(res.data);
            });
    }, [token, setAllGamesList]);

    if (joinRequestSent) {
        return (
            <AfterJoinRequestSent/>
        )
    }

    return (
        <div>
            {allGamesList.map((game) => (
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
                    <button onClick={()=>handleJoinClick(game)}
                    >Join</button>
                </div>
            ))}
            <Modal isOpen={modalIsOpen} game={modalData} contentLabel="Game Detail Modal" className="modal" overlayClassName= "modal-overlay">
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
    return(
        <>
        <text>
            You requested to join {game.host_info.first_name}'s game on {game.date} at {game.time}. 
        </text>
        <text>You will be notified after {game.host_info.first_name} has confirmed the game, or if they're unable to play. </text>
        </>
    )
}