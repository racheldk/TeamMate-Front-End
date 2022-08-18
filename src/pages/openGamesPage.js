import GamesList from "../components/gamesList";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import axios from "axios";
import { useState } from "react";


export default function OpenGamesList({
    token,
    listType,
    setListType,
    allGamesList,
}) {
    const [filteredLoc, setFilteredLoc] = useState(null);
    const [filteredSession, setFilteredSession] = useState(null);
    const [filteredMatch, setFilteredMatch] = useState(null)
    const [filteredURL, setFilteredURL] = useState('')
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchLoc, setSearchLoc] = useState('')
    const [searchSession, setSearchSession] = useState('')
    const [searchMatch, setSearchMatch] = useState('')
    const [filtered, setFiltered] = useState(false)
    
    setListType("allOpen");
    console.log(allGamesList)
    console.log(filteredGames)

    const handleFilterGameLoc = (event) => {
        console.log(event.target.value);
        setFilteredLoc(event.target.value);
        setSearchLoc(`&park-name=${event.target.value}`)
    };

    const handleFilterSession = (event) => {
        console.log(event.target.value);
        setFilteredSession(event.target.value);
        setSearchSession(`&session-type=${event.target.value}`)
    };

    const handleFilterMatch = (event) => {
        console.log(event.target.value);
        setFilteredMatch(event.target.value);
        setSearchMatch(`&match-type=${event.target.value}`)
    };

    const handleSubmitFilter = () => {
        let searchURL = "https://teammate-app.herokuapp.com/session/?";
        console.log("submit filter clicked");
        console.log(filteredLoc)
        console.log(filteredSession)
        searchURL+=searchLoc
        searchURL+=searchSession
        searchURL+=searchMatch
        console.log(searchURL)

        axios
        .get(`${searchURL}`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((res) => {
            console.log(res.data);
            setFilteredGames(res.data);
            setFiltered(true);
        })
        .catch((error) => {
            console.log(error);
            alert(error.response.data.detail);
        });
    }


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
                        id="filter-type"
                        name="filter-type"
                    >
                        <option value="">Filter by competitive level</option>
                        <option value="Casual">Casual</option>
                        <option value="Competitive">Competitive</option>
                    </select>
                    <select
                        onChange={handleFilterMatch}
                        value={filteredMatch}
                        id="filter-type"
                        name="filter-type"
                    >
                        <option value="">
                            Filter by number of players
                        </option>
                        <option value="Singles">Singles</option>
                        <option value="Doubles">Doubles</option>
                    </select>
                </div>
                <button onClick={() => handleSubmitFilter()}>Filter</button>

                {(!filtered)?  (<GamesList
                    token={token}
                    games={allGamesList}
                    listType={listType}
                /> ):(
                    filteredGames.length>0 ? (
                        <GamesList 
                        token={token}
                        games={filteredGames}
                        listType={listType}/>
                    ) : (
                        <div>No games were found matching your filters</div>
                    )
                )}
            </div>
            <Footer />
        </>
    );
}
