import { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";

export default function GamesList({ token }) {
    const [allGamesList, setAllGamesList] = useState([]);
    const [date, setDate] = useState()

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

    useEffect(() => {
        setDate('01/02/2023')
    }, [])


    return (
        <div>
            <h1>GamesList</h1>
            {allGamesList.map((game) => (
                <div className='game'>
                    <button>+</button>
                    <div>Location: {game.location_info.park_name}</div>
                    <div>{date.toLocaleString} at {game.time}</div>
                    <button>Join</button>
                </div>
            ))}
        </div>
    );
}
