import GamesList from "../components/gamesList";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OpenGamesList({
    token,
    listType,
    setListType,
    allGamesList,
}) {
    const [filteredLoc, setFilteredLoc] = useState(null);
    const [filteredGames, setFilteredGames] = useState([]);
    const [filteredSession, setFilteredSession] = useState(null);

    setListType("allOpen");

    const handleFilterGameLoc = (event) => {
        console.log(event.target.value);
        setFilteredLoc(`park-name=${event.target.value}`);
        console.log(filteredLoc);
    };

    const handleFilterSession = (event) => {
        console.log(event.target.value);
        setFilteredSession(`session-type=${event.target.value}`);
        console.log();
    };

    useEffect(() => {
        console.log(filteredLoc);
        console.log(filteredSession);
        axios
            .get(
                `https://teammate-app.herokuapp.com/session?${filteredLoc}${filteredSession}`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                setFilteredGames(res.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data.detail);
            });
    }, [token, filteredLoc, filteredSession]);

    return (
        <>
            <Header />
            <div className="app-body">
                <h1>Open Games List</h1>

                <div>
                    <div>Filter Games</div>
                    <select
                        onChange={handleFilterGameLoc}
                        value={filteredLoc}
                        id="filter-location"
                        name="filter-location"
                    >
                        <option value="">
                            Filter by location
                        </option>
                        <option value="Pullen Park">Pullen Park</option>
                        <option value="Sanderford Park">Sanderford Park</option>
                    </select>
                    <select
                        onChange={handleFilterSession}
                        value={filteredSession}
                        id="session-type"
                        name="session-type"
                    >
                        <option value="">
                            Filter by competitive level
                        </option>
                        <option value="Casual">Casual</option>
                        <option value="Competitive">Competitive</option>
                    </select>
                    {/* session type */}
                </div>

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
