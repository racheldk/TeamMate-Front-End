import { useEffect, useState } from "react";
import axios from "axios";
// import Modali, { useModali } from "modali";
import Modal from 'react-modal'

export default function GamesList({ token }) {
    const [allGamesList, setAllGamesList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalData, setModalData] = useState({})

    const handleOpenModal = (game) => {
        console.log('click open')
        console.log(game.id)
        setModalIsOpen(true)
        setModalData(game)
        console.log(modalData)
    }

    const handleCloseModal = () => {
        console.log('click close')
        setModalIsOpen(false)
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
    },[token, setAllGamesList]);

    return (
        <div>
            {allGamesList.map((game) => (
                <div className="game" key={game.id}>
                    <button onClick={()=>{
                        handleOpenModal(game)}}>more details</button>
                    <div>Location: {game.location_info.park_name}</div>
                    <div>
                        {game.date} at {game.time}
                    </div>
                    <button>Join</button>
                </div>
            ))}
                    <Modal isOpen={modalIsOpen} game={modalData}>
                        <button onClick={()=>handleCloseModal()}>close</button>
                        <OpenGameDetail game={modalData}/>
                    </Modal>
        </div>
    );
}

function OpenGameDetail ({game}) {
    console.log(game)
    return (
        <div>
            <div>{game.location_info.park_name}</div>
            <div>(park address)</div>
            <div>{game.date} {game.time}</div>
            <div>{game.host_info.first_name}</div>
            <div>{game.host_info.last_name}</div>
            <div>{game.host_info.username}</div>
            <button>join</button>
        </div>
    )
}
