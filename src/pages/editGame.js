import ReactDatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

export default function EditGame({ token, game }) {
    console.log(game.date)
    const [newGameDate, setNewGameDate] = useState("");
    const [newGameTime, setNewGameTime] = useState("");
    const [newGameLoc, setNewGameLoc] = useState(game.location_info.park_name);
    const [newGameSessionType, setNewGameSessionType] = useState(game.session_type);
    const [newGameMatchType, setNewGameMatchType] = useState(game.match_type);
    const [error, setError] = useState("");
    // const [submitted, setSubmitted] = useState(false);
    const [editSubmitted, setEditSubmitted] = useState(false)
    const [convertedDate, setConvertedDate] = useState("");
    const [convertedTime, setConvertedTime] = useState("");

    const handleChangeGameLoc = (event) => {
        console.log(event.target.value);
        setNewGameLoc(event.target.value);
    };

    const handleChangeSessionType = (event) => {
        console.log(event.target.value);
        setNewGameSessionType(event.target.value);
    };

    const handleChangeMatchType = (event) => {
        console.log(event.target.value);
        setNewGameMatchType(event.target.value);
    };

    const handleSubmitEdit = (game) => {
        console.log(
            newGameDate,
            newGameTime,
            newGameSessionType,
            newGameMatchType,
            newGameLoc,
            convertedDate
        );
        axios
            .patch(
                `https://teammate-app.herokuapp.com/session/${game.id}`,
                {
                    date: convertedDate,
                    time: convertedTime,
                    session_type: newGameSessionType,
                    match_type: newGameMatchType,
                    location: newGameLoc,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then(console.log("edit posted"))
            .catch((error) => {
                alert(error.response.data.detail)
            });
        setEditSubmitted(true);
    };

    if (editSubmitted) {
        return (
            <div>you submitted an edit! </div>
        );
    }

    if (error) {
        return { error };
    }

    return (
        <div>
            <h1>Edit your Game</h1>
            <form>
                <label htmlFor="date-time">When would you like to play?</label>
                <ReactDatePicker 
                onChange={(date) => {
                    console.log(date)
                    setNewGameDate(date)
                    setConvertedDate(DateTime.fromJSDate(date).toISODate(DateTime.DATE_MED))
                }}
                minDate={subDays(new Date(), 0)}
                selected={newGameDate}
                placeholderText={DateTime.fromISO(game.date).toLocaleString(DateTime.DATE_SHORT)}
                />
                <ReactDatePicker
                    selected={newGameTime}
                    onChange={(date) => {
                        setNewGameTime(date);
                        setConvertedTime(
                            DateTime.fromJSDate(date).toLocaleString(
                                DateTime.TIME_24_WITH_SECONDS
                            )
                        );
                        console.log(newGameTime);
                        console.log(convertedTime);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText={DateTime.fromISO(game.time).toLocaleString(DateTime.TIME_SIMPLE)}
                />
                <div>
                    <label htmlFor="location">
                        Where would you like to play?
                    </label>
                    <select
                        onChange={handleChangeGameLoc}
                        value={newGameLoc}
                        id="location"
                        name="location"
                    >
                        <option value="" disabled hidden>
                            Choose a location
                        </option>
                        <option value="2">Pullen Park</option>
                        <option value="1">Sanderford Park</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="session-type">
                        How competitive would you like your game to be?
                    </label>
                    <select
                        onChange={handleChangeSessionType}
                        value={newGameSessionType}
                        id="session-type"
                        name="session-type"
                    >
                        <option value="" disabled hidden>
                            Choose a competitive level
                        </option>
                        <option value="Casual">Casual</option>
                        <option value="Competitive">Competitive</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="match-type">
                        Would you like to play singles or doubles?
                    </label>
                    <select
                        onChange={handleChangeMatchType}
                        value={newGameMatchType}
                        id="match-type"
                        name="match-type"
                    >
                        <option value="" disabled hidden>
                            Choose number of players
                        </option>
                        <option value="Singles">Singles</option>
                        <option value="Doubles">Doubles</option>
                    </select>
                </div>
                <button onClick={()=>handleSubmitEdit(game)}>Submit</button>
            </form>  
        </div>
    );
}


