import GamesList from "../components/gamesList";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsChevronContract } from "react-icons/bs";

export default function OpenGamesList({
    token,
    listType,
    setListType,
    allGamesList,
}) {
    const [filteredLoc, setFilteredLoc] = useState(null);
    const [filteredGames, setFilteredGames] = useState([]);
    const [filteredSession, setFilteredSession] = useState(null);
    // const [searchLoc, setSearchLoc] = useState(null)
    // const [searchSession, setSearchSession] = useState(null)

    setListType("allOpen");

    const handleFilterGameLoc = (event) => {
        console.log(event.target.value);
        setFilteredLoc(event.target.value);
        // setSearchLoc(`park-name=${event.target.value}`)
    };

    const handleFilterSession = (event) => {
        console.log(event.target.value);
        setFilteredSession(event.target.value);
        // setSearchSession(`session-type=${event.target.value}`)
    };

    const handleSubmitFilter = () => {
        console.log("submit filter clicked");
        let searchURL = "https://teammate-app.herokuapp.com/session/?";
        
        console.log(searchURL);
        axios
            .get(`${searchURL}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setFilteredGames(res.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data.detail);
            });
    };

    return (
        <>
            <Header />
            <div className="app-body">
                <h1>Open Games List</h1>

                <div>
                    <select
                        onChange={handleFilterGameLoc}
                        value={filteredLoc}
                        id="filter-location"
                        name="filter-location"
                    >
                        <option value="">Filter by location</option>
                        <option value="Pullen Park">Pullen Park</option>
                        <option value="Sanderford Park">Sanderford Park</option>
                    </select>
                    <select
                        onChange={handleFilterSession}
                        value={filteredSession}
                        id="session-type"
                        name="session-type"
                    >
                        <option value="">Filter by competitive level</option>
                        <option value="Casual">Casual</option>
                        <option value="Competitive">Competitive</option>
                    </select>
                    {/* session type */}
                </div>
                <button onClick={() => handleSubmitFilter()}>Filter</button>

                <GamesList
                    token={token}
                    games={allGamesList}
                    listType={listType}
                />
            </div>
            <Footer />
        </>
    );
}
