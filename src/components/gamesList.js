import { useEffect, useState } from "react";
import axios from "axios";
import Modali, { useModali } from "modali";

export default function GamesList({ token }) {
    const [allGamesList, setAllGamesList] = useState([]);
    const [openGameModal, toggleOpenGameModal] = useModali();
    const [modalData, setModalData] = useState(null)


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

    return (
        <div>
            <h1>GamesList</h1>
            {allGamesList.map((game) => (
                <div className="game">
                    <button onClick={() => {
                        toggleOpenGameModal()
                        setModalData(game)
                    }}>+</button>
                    <div>Location: {game.location_info.park_name}</div>
                    <div>
                        {game.date} at {game.time}
                    </div>
                    <button>Join</button>
                </div>
            ))}
                    <Modali.Modal game={modalData}
                    {...openGameModal}>
                        <div>
                            <div>{modalData.location_info.park_name}</div>
                            <div>{modalData.location_info.court_surface}</div>
                            <div>park address will go here too</div>
                            <div>
                                {modalData.time} {modalData.date}
                            </div>
                            <div>{modalData.host_info.first_name}</div>
                            <div>{modalData.host_info.last_name}</div>
                            <div>{modalData.host_info.username}</div>
                            <button>Join</button>
                        </div>
                    </Modali.Modal>
        </div>
    );
}
