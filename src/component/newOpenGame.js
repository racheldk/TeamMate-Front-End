import ReactDatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function NewOpenGame({ token }) {
    const [newGameDate, setNewGameDate] = useState(new Date());
    const [newGameTime, setNewGameTime] = useState(new Date());
    const [newGameLoc, setNewGameLoc] = useState("");
    const [newGameType, setNewGameType] = useState("");

    const handleChangeGameLoc = (event) => {
        console.log(event.target.value);
        setNewGameLoc(event.target.value);
    };

    const handleChangeGameType = (event) => {
        console.log(event.target.value);
        setNewGameType(event.target.value);
    };

    const handleSubmit = (event) => {
        console.log(newGameDate, newGameTime, newGameLoc, newGameType)
        // axios post request, including error catch
    }

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
                        <option value="Pullen">Pullen Park</option>
                        <option value="Sanderford">Sanderford Park</option>
                        <option value="test">Test</option>

                        {/* We could also make an API request for a list of parks, then map through them as dropdown option. This might also help store whatever data other than the park name the backend needs.  */}
                    </select>
                </div>
                <div>
                    <label for="session-type">
                        What kind of game would you like to play?
                    </label>
                    <select
                        onChange={handleChangeGameType}
                        value={newGameType}
                        id="session-type"
                        name="session-type"
                    >
                        <option value="Casual">Casual</option>
                        <option value="Competitive">Competitive</option>
                    </select>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
