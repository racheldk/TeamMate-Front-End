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
    const [filterLoc, setFilterLoc] = useState(null);
    const [filteredGames, setFilteredGames] = useState([]);

    setListType("allOpen");

    const handleFilterGameLoc = (event) => {
        console.log(event.target.value);
        setFilterLoc(`park-name=${event.target.value}`);
        console.log(filterLoc);
    };

    useEffect(() => {
        console.log(filterLoc);
        axios
        .get(`https://teammate-app.herokuapp.com/session?${filterLoc}`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((res) => {
            console.log(res.data)
            setFilteredGames(res.data)
        })
        .catch((error) => {
            console.log(error)
            alert(error.response.data.detail)
        })
    }, [token, filterLoc]);

    return (
        <>
            <Header />
            <div className="app-body">
                <h1>Open Games List</h1>

                <div>
                    <div>Filter Games</div>
                    <select
                        onChange={handleFilterGameLoc}
                        value={filterLoc}
                        id="filter-location"
                        name="filter-location"
                    >
                        <option value="Pullen Park">Pullen Park</option>
                        <option value="Sanderford Park">Sanderford Park</option>
                    </select>
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
