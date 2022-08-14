import ReactDatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";

export default function NewOpenGame({ token }) {
    const [newGameDate, setNewGameDate] = useState(new Date());
    const [newGameTime, setNewGameTime] = useState(new Date());
    const [newGameLoc, setNewGameLoc] = useState("");
    const [newGameSessionType, setNewGameSessionType] = useState("");
    const [newGameMatchType, setNewGameMatchType] = useState("");
    const [error, setError] = useState("");

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

    const handleSubmit = () => {
        console.log(
            newGameDate,
            newGameTime,
            newGameSessionType,
            newGameMatchType,
            newGameLoc
        );
        axios
            .post(
                "https://teammate-app.herokuapp.com/session",
                {
                    date: newGameDate,
                    time: newGameTime,
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
            .then(console.log("posted"))
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div>
            <h1>Post a New Game</h1>
            <form>
                <label for="date-time">When would you like to play?</label>
                <ReactDatePicker
                    selected={newGameDate}
                    onChange={(date) => setNewGameDate(date)}
                    minDate={subDays(new Date(), 0)}
                />
                <ReactDatePicker
                    selected={newGameTime}
                    onChange={(date) => setNewGameTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />
                <div>
                    <label for="location">Where would you like to play?</label>
                    <select
                        onChange={handleChangeGameLoc}
                        value={newGameLoc}
                        id="location"
                        name="location"
                    >
                        <option value="2">Pullen Park</option>
                        <option value="1">Sanderford Park</option>
                        <option value="test">Test</option>

                        {/* We could also make an API request for a list of parks, then map through them as dropdown option. This might also help store whatever data other than the park name the backend needs.  */}
                    </select>
                </div>
                <div>
                    <label for="session-type">
                        How competitive would you like your game to be?
                    </label>
                    <select
                        onChange={handleChangeSessionType}
                        value={newGameSessionType}
                        id="session-type"
                        name="session-type"
                    >
                        <option value="Casual">Casual</option>
                        <option value="Competitive">Competitive</option>
                    </select>
                </div>
                <div>
                    <label for="match-type">
                        Would you like to play singles or doubles?
                    </label>
                    <select
                        onChange={handleChangeMatchType}
                        value={newGameMatchType}
                        id="match-type"
                        name="match-type"
                    >
                        <option value="Singles">Singles</option>
                        <option value="Doubles">Doubles</option>
                    </select>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
