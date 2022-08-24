import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Box, Select, Heading } from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";
import OpenGamesList from "../components/OpenGamesList";

export default function OpenGamesPage({ token, allGamesList, username }) {
    const [filteredDate, setFilteredDate] = useState(null);
    const [searchDate, setSearchDate] = useState("");

    const [filteredLoc, setFilteredLoc] = useState(null);
    const [filteredSession, setFilteredSession] = useState(null);
    const [filteredMatch, setFilteredMatch] = useState(null);
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchLoc, setSearchLoc] = useState("");
    const [searchSession, setSearchSession] = useState("");
    const [searchMatch, setSearchMatch] = useState("");
    const [filtered, setFiltered] = useState(false);

    console.log(allGamesList);
    console.log(filteredGames);

    const handleFilterDate = (date) => {
        console.log(date);
        console.log(DateTime.fromJSDate(date).toISODate(DateTime.DATE_MED));
        const formattedDate = DateTime.fromJSDate(date).toISODate(
            DateTime.DATE_MED
        );
        setSearchDate(`&date=${formattedDate}`);
    };

    const handleFilterGameLoc = (event) => {
        console.log(event.target.value);
        setFilteredLoc(event.target.value);
        setSearchLoc(`&park-name=${event.target.value}`);
    };

    const handleFilterSession = (event) => {
        console.log(event.target.value);
        setFilteredSession(event.target.value);
        setSearchSession(`&session-type=${event.target.value}`);
    };

    const handleFilterMatch = (event) => {
        console.log(event.target.value);
        setFilteredMatch(event.target.value);
        setSearchMatch(`&match-type=${event.target.value}`);
    };

    const handleSubmitFilter = () => {
        let searchURL = "https://teammate-app.herokuapp.com/session/?";
        console.log("submit filter clicked");
        searchURL += searchDate;
        searchURL += searchLoc;
        searchURL += searchSession;
        searchURL += searchMatch;
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
                setFiltered(true);
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data.detail);
            });
    };

    return (
        <>
            <Header />
            <Box className="app-body">
                <Heading color='teal' textAlign='center'>Open Games</Heading>

                <Box textAlign='center' m={2}>
                <ReactDatePicker

                    onChange={(date) => {
                        console.log(date);
                        setFilteredDate(date);
                        handleFilterDate(date)
                    }}
                    minDate={subDays(new Date(), 0)}

                    Selected={filteredDate}
                    placeholderText="Click to Select a date"
                />
                    <Select w='25%' size='s' variant='filled' borderRadius={10} display='inline-block'
                        onChange={handleFilterGameLoc}
                        value={filteredLoc}
                        id="filter-location"
                        name="filter-location"
                    >
                        <option value="">Location</option>
                        <option value="Pullen Park">Pullen Park</option>
                        <option value="Sanderford Park">Sanderford Park</option>
                    </Select>
                    <Select  w='25%' size='s' m={2} variant='filled' borderRadius={10} display='inline-block'
                        onChange={handleFilterSession}
                        value={filteredSession}
                        id="filter-type"
                        name="filter-type"
                    >
                        <option value="">Competitive level</option>

                        <option value="Casual">Casual</option>
                        <option value="Competitive">Competitive</option>
                    </Select>
                    <Select w='25%' size='s' m={2} variant='filled' borderRadius={10} display='inline-block'
                        onChange={handleFilterMatch}
                        value={filteredMatch}
                        id="filter-type"
                        name="filter-type"

                        >
                        <option value="">

                            Number of Players

                        </option>
                        <option value="Singles">Singles</option>
                        <option value="Doubles">Doubles</option>
                    </Select>
                    <Button w='25%' colorScheme='teal' onClick={() => handleSubmitFilter()}>Filter</Button>
                </Box>
                

                {(!filtered)?  (<OpenGamesList
                    token={token}
                    games={allGamesList}
                /> ):(
                    filteredGames.length>0 ? (
                        <OpenGamesList 
                        token={token}
                        games={filteredGames} />
                    ) : (
                        <Box textAlign='center'>No games were found matching your filters</Box>
                    )
                )}
            </Box>
            <Footer />
        </>
    );
}


