import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import axios from "axios";
import { useState } from "react";
import { Button, Box, Select, Heading, Text } from "@chakra-ui/react";
import { TbBallTennis } from "react-icons/tb";
import ReactDatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";
import NewGamesList from "../components/GamesList";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    CloseButton,
} from "@chakra-ui/react";

export default function OpenGamesPage({
    token,
    allGamesList,
    username,
    game,
    setGame,
    reload,
    setReload,
    onClose,
    onOpen,
    isOpen,
    alertTitle,
    alertMessage,
    setAlertTitle,
    setAlertMessage,
}) {
    const [displayDate, setDisplayDate] = useState("");
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
<<<<<<< HEAD
                console.log(res.data)
                const responseOpen = res.data
                const openExpandedGames = [];
                for (let game of responseOpen) {
                    const confirmedPlayers = [];
                    for (let guest of game.guest_info) {
                        // console.log(guest);
                        if (
                            guest.status === "Host" ||
                            guest.status === "Accepted"
                        ) {
                            // console.log("Confirmed Player");
                            confirmedPlayers.push(guest);
                        }
                        // console.log(confirmedPlayers);
                    }
                    const expandedGame = {
                        displayStatus: "join",
                        bgColor: "#ffffff",
                        icon: null,
                        tennisBall: TbBallTennis,
                        displayUsers: confirmedPlayers,
                        buttonTitle: null,
                        buttons: [
                            { label: "Join", job: "send a join request" },
                        ],
                        ...game,
                    };
                    openExpandedGames.push(expandedGame);
                    setFilteredGames(openExpandedGames);
                }
=======
                console.log(res.data);
                setFilteredGames(res.data);
                setFiltered(true);
            })
            .catch((error) => {
                console.log(error);
                console.log("there was an error");
                setAlertTitle("Uh oh, something went wrong. ");
                setAlertMessage(error.message);
                onOpen();
>>>>>>> main
            });
            
    };
    return (
        <>
            <Header />
            <Box className="app-body">
                <Heading color="#234E52" textAlign="center" marginTop={2}>
                    Open Games
                </Heading>
                <Box
                    textAlign="center"
                    marginTop={5}
                    marginBottom={2}
                    maxW="350px"
                    marginRight="auto"
                    marginLeft="auto"
                >
                    <ReactDatePicker
                        onChange={(date) => {
                            console.log(date);
                            setDisplayDate(date);
                            setFilteredDate(date);
                            handleFilterDate(date);
                        }}
                        minDate={subDays(new Date(), 0)}
                        selected={displayDate}
                        placeholderText="When"
                    >

                    </ReactDatePicker>
                    <Box className="filters" w='60%' m='auto'>
                    <Select
                        textAlign="right"
                        w="100px"
                        size="s"
                        m={2}
                        variant="filled"
                        borderRadius={10}
                        display="inline-block"
                        onChange={handleFilterGameLoc}
                        value={filteredLoc}
                        id="filter-location"
                        name="filter-location"
                    >
                        <option value="">Where</option>
                        <option value="">All</option>
                        <option value="PullenPark">Pullen Park</option>
                        <option value="Sanderford Park">Sanderford Park</option>
                    </Select>
                    <Select
                        textAlign="right"
                        w="100px"
                        size="s"
                        m={2}
                        variant="filled"
                        borderRadius={10}
                        display="inline-block"
                        onChange={handleFilterSession}
                        value={filteredSession}
                        id="filter-type"
                        name="filter-type"
                    >
                        <option value="">Style</option>
                        <option value="">All</option>
                        <option value="Casual">Casual</option>
                        <option value="Competitive">Competitive</option>
                    </Select>
                    <Select
                        textAlign="right"
                        w="100px"
                        size="s"
                        m={2}
                        variant="filled"
                        borderRadius={10}
                        display="inline-block"
                        onChange={handleFilterMatch}
                        value={filteredMatch}
                        id="filter-type"
                        name="filter-type"
                    >
                        <option value="">Players</option>
                        <option value="">All</option>
                        <option value="Singles">Singles</option>
                        <option value="Doubles">Doubles</option>
                    </Select>
                    <Button
                        w="100px"
                        m={2}
                        p={0}
                        h='25px'
                        colorScheme="teal"
                        onClick={() => handleSubmitFilter()}
                    >
                        Filter
                    </Button></Box>
                </Box>
                {!filtered ? (
                    <NewGamesList
                        token={token}
                        gamesList={allGamesList}
                        setGame={setGame}
                        game={game}
                        reload={reload}
                        setReload={setReload}
                    />
                ) : filteredGames.length > 0 ? (
                    <NewGamesList
                        token={token}
                        gamesList={filteredGames}
                        setGame={setGame}
                        game={game}
                        reload={reload}
                        setReload={setReload}
                    />
                ) : (
                    <Box textAlign="center">
                        No games were found matching your filters
                    </Box>
                )}

                <AlertDialog isOpen={isOpen} onClose={onClose}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <CloseButton
                                alignSelf="flex-end"
                                position="relative"
                                // right={-1}
                                // top={-1}
                                onClick={() => {
                                    onClose();
                                }}
                            />
                            <AlertDialogHeader>{alertTitle}</AlertDialogHeader>
                            <AlertDialogBody>{alertMessage}</AlertDialogBody>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Box>

            <Footer />
        </>
    );
}
