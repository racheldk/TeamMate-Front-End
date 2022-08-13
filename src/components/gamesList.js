import { useEffect, useState } from "react";
import axios from "axios";

export default function GamesList({ token }) {
    const [allGamesList, setAllGamesList] = useState([]);

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
    }, []);

    return (
        <div>
            <h1>GamesList</h1>
            {allGamesList.map((game) => (
                <div className='game'>
                    <button>+</button>
                    <div>Location: {game.location_info.park_name}</div>
                    <div>{game.date} at {game.time}</div>
                    <button>Join</button>
                </div>
            ))}
        </div>
    );
}
