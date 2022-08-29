import { Text, Heading, Icon, Box, Button } from "@chakra-ui/react";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import GamesList from "../components/GamesList";
import { IoMdTennisball } from "react-icons/io";
import {
    BsQuestionCircleFill,
    BsPersonFill,
} from "react-icons/bs";
import { CheckCircleIcon } from '@chakra-ui/icons'
import CalendarExample from "../components/calendar-example";
import { DateTime } from "luxon";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
  } from '@chakra-ui/react'


export default function MyGames({ token, username, game, setGame }) {
    console.log(username);

    const [actionRequiredGames, setActionRequiredGames] = useState([]);
    const [confirmedGames, setConfirmedGames] = useState([]);
    const [pendingPOVGuestGames, setPendingPOVGuestGames] = useState([]);
    const [noGuestGames, setNoGuestGames] = useState([]);
    const [noActionGames, setNoActionGames] = useState([]);
    const [hostOpenDoublesGames, setHostOpenDoublesGames] = useState([]);
    const [guestOpenDoublesGames, setGuestOpenDoublesGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false)

    useEffect(() => {
        const reqAction = axios.get(
            `https://teammate-app.herokuapp.com/${username}/games/?my-games=HostUnconfirmed`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        const reqConfirmed = axios.get(
            `https://teammate-app.herokuapp.com/${username}/games/?my-games=AllConfirmed`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        const reqPending = axios.get(
            `https://teammate-app.herokuapp.com/${username}/games/?my-games=GuestPending`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        const reqNoGuest = axios.get(
            `https://teammate-app.herokuapp.com/${username}/games/?my-games=HostNoGuest`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        const reqHostOpenDoubles = axios.get(
            `https://teammate-app.herokuapp.com/${username}/games/?my-games=HostNotPendingUnconfirmedDoubles`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        const reqGuestOpenDoubles = axios.get(
            `https://teammate-app.herokuapp.com/${username}/games/?my-games=GuestAcceptedUnconfirmedDoubles`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        axios
            .all([
                reqAction,
                reqConfirmed,
                reqPending,
                reqNoGuest,
                reqHostOpenDoubles,
                reqGuestOpenDoubles,
            ])
            .then(
                axios.spread((...responses) => {
                    console.log(responses);
                    const responseAction = responses[0].data;
                    console.log(responses[0].data);
                    const responseConfirmed = responses[1].data;
                    console.log(responseConfirmed);
                    const responsePending = responses[2].data;
                    console.log(responsePending);
                    const responseNoGuest = responses[3].data;
                    console.log(responseNoGuest);
                    const responseHostOpenDoubles = responses[4].data;
                    console.log(responseHostOpenDoubles);
                    const responseGuestOpenDoubles = responses[5].data;
                    console.log(responseGuestOpenDoubles);

                    if (responseAction.length > 0) {
                        console.log("action > 0");
                        const pendingGuests = [];
                        for (let game of responseAction) {
                            for (let guest of game.guest_info) {
                                console.log(guest);
                                if (guest.status === "Pending") {
                                    console.log("this guest is pending");
                                    pendingGuests.push({
                                        pendingGuest: guest,
                                        tennisBall: IoMdTennisball,
                                        displayStatus: "action required",
                                        bgColor: "#ffffff",
                                        // iconColor: 'example',
                                        icon: (
                                            <Icon
                                                color="white"
                                                backgroundColor="#e32636"
                                                as={BsPersonFill}
                                                fontSize="30px"
                                        borderRadius="100px"
                                            />
                                        ),
                                        displayUsers: [guest],
                                        buttonTitle:
                                            "Do you want to play with ",
                                        buttons: [
                                            {
                                                label: "Yes",
                                                job: "handleAccept",
                                            },
                                            
                                            {
                                                label: "No, thank you",
                                                job: "handleReject",
                                            },
                                        ],
                                        ...game,
                                    });
                                }
                            }
                        }
                        console.log(pendingGuests);
                        setActionRequiredGames(pendingGuests);
                    }

                    if (responseConfirmed.length > 0) {
                        console.log("confirmed > 0");
                        const confirmedExpandedGames = [];
                        for (let game of responseConfirmed) {
                            const confirmedPlayers = [];
                            for (let guest of game.guest_info) {
                                console.log(guest);
                                if (
                                    guest.status === "Host" ||
                                    guest.status === "Accepted"
                                ) {
                                    console.log("Confirmed Player");
                                    confirmedPlayers.push(guest);
                                }
                                console.log(confirmedPlayers);
                            }
                            const expandedGame = {
                                displayStatus: "confirmed",
                                bgColor: "#ffffff",
                                tennisBall: IoMdTennisball,
                                icon: (<CheckCircleIcon color="#48BB78"
                                fontSize="30px"
                                borderRadius="100px" />),
                                title: <CheckCircleIcon color="#48BB78"/>,
                                allDay:false,
                                start: DateTime.fromISO(game.datetime).toJSDate(),
                                end: DateTime.fromISO(game.endtime).toJSDate(),
                                displayUsers: confirmedPlayers,
                                buttonTitle: null,
                                buttons: [
                                    {
                                        label: "Cancel this game",
                                        job: "cancel confirmed",
                                    },
                                ],
                                ...game,
                            };
                            console.log(expandedGame);
                            confirmedExpandedGames.push(expandedGame);
                        }
                        console.log(confirmedExpandedGames);
                        setConfirmedGames(confirmedExpandedGames)
                    }

                    if (responsePending.length > 0) {
                        console.log("pending > 0");
                        const pendingExpandedGames = [];
                        for (let game of responsePending) {
                            const confirmedPlayers = [];
                            for (let guest of game.guest_info) {
                                console.log(guest);
                                if (
                                    guest.status === "Host" ||
                                    guest.status === "Accepted"
                                ) {
                                    console.log("Confirmed Player");
                                    confirmedPlayers.push(guest);
                                }
                                console.log(confirmedPlayers);
                            }
                            const expandedGame = {
                                displayStatus: "pendingPOVGuest",
                                tennisBall: IoMdTennisball,
                                bgColor: "#ffffff",
                                icon: (
                                    <Icon
                                        color="gold"
                                        as={BsQuestionCircleFill}
                                        fontSize="30px"
                                        borderRadius="100px"
                                    />
                                ),
                                displayUsers: confirmedPlayers,
                                buttonTitle: null,
                                buttons: [
                                    {
                                        label: "Cancel request to join this game",
                                        job: "cancel pending request",
                                    },
                                ],
                                ...game,
                            };
                            console.log(expandedGame);
                            pendingExpandedGames.push(expandedGame);
                        }
                        console.log(pendingExpandedGames);
                        setPendingPOVGuestGames(pendingExpandedGames)
                    }

                    if (responseNoGuest.length > 0) {
                        console.log("noGuest > 0");
                        const noGuestExpandedGames = [];
                        for (let game of responseNoGuest) {
                            const confirmedPlayers = [];
                            for (let guest of game.guest_info) {
                                console.log(guest);
                                if (
                                    guest.status === "Host" ||
                                    guest.status === "Accepted"
                                ) {
                                    console.log("Confirmed Player");
                                    confirmedPlayers.push(guest);
                                }
                                console.log(confirmedPlayers);
                            }
                            const expandedGame = {
                                displayStatus: "no guests",
                                bgColor: "#ffffff",
                                tennisBall: IoMdTennisball,
                                icon: null,
                                displayUsers: confirmedPlayers,
                                buttonTitle: null,
                                buttons: [
                                    {
                                        label: "Delete this game",
                                        job: "delete game with no guests",
                                    },
                                    {
                                        label: "Edit this game",
                                        job: "Edit game with no guests",
                                    },
                                ],
                                ...game,
                            };
                            console.log(expandedGame);
                            noGuestExpandedGames.push(expandedGame);
                        } setNoGuestGames(noGuestExpandedGames)
                    }

                    if (responseHostOpenDoubles.length > 0) {
                        console.log("hostOpenDoubles > 0");
                        const hostOpenDoublesExpandedGames = [];
                        for (let game of responseHostOpenDoubles) {
                            const confirmedPlayers = [];
                            for (let guest of game.guest_info) {
                                console.log(guest);
                                if (
                                    guest.status === "Host" ||
                                    guest.status === "Accepted"
                                ) {
                                    console.log("Confirmed Player");
                                    confirmedPlayers.push(guest);
                                }
                                console.log(confirmedPlayers);
                            }
                            const expandedGame = {
                                displayStatus: "host open doubles",
                                bgColor: "#ffffff",
                                tennisBall: IoMdTennisball,
                                icon: null,
                                displayUsers: confirmedPlayers,
                                buttonTitle: null,
                                buttons: [
                                    {
                                        label: "Cancel this Game",
                                        job: "cancel game",
                                    },
                                ],
                                ...game,
                            };
                            console.log(expandedGame);
                            hostOpenDoublesExpandedGames.push(expandedGame);
                        }
                        setHostOpenDoublesGames(hostOpenDoublesExpandedGames)
                    }


                    if (responseGuestOpenDoubles.length > 0) {
                        console.log("guestOpenDoubles > 0");
                        const guestOpenDoublesExpandedGames = [];
                        for (let game of responseGuestOpenDoubles) {
                            const confirmedPlayers = [];
                            for (let guest of game.guest_info) {
                                console.log(guest);
                                if (
                                    guest.status === "Host" ||
                                    guest.status === "Accepted"
                                ) {
                                    console.log("Confirmed Player");
                                    confirmedPlayers.push(guest);
                                }
                                console.log(confirmedPlayers);
                            }
                            const expandedGame = {
                                displayStatus: "guest open doubles",
                                bgColor: "#ffffff",
                                tennisBall: IoMdTennisball,
                                icon: null,
                                displayUsers: confirmedPlayers,
                                buttonTitle: null,
                                buttons: [
                                    {
                                        label: "Cancel this game",
                                        job: "cancel accepted request",
                                    },
                                ],
                                ...game,
                            };
                            console.log(expandedGame);
                            guestOpenDoublesExpandedGames.push(expandedGame);
                        }
                        setGuestOpenDoublesGames(guestOpenDoublesExpandedGames)
                    }
                })
            )
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
        setIsLoading(false);
    }, [token]);


    if (isLoading) {
        return <Box>Loading...</Box>;
    }

    return (
        <>
        <Header />
        <Box className="app-body">
            {/* if this heading changes we also need to change notifications message */}
            <Heading color="#234E52" textAlign="center" mt={4}>My Games</Heading>

            {showCalendar ? (
                <>
                <Button size="sm"onClick={() =>setShowCalendar(false)}>List</Button>
                
                <CalendarExample confirmedGames={confirmedGames} token={token} username={username}/>
                </>
                ):(
                    <>
                <Button onClick={()=>setShowCalendar(true)}>Calendar</Button>

                <GamesList
                token={token}
                gamesList={actionRequiredGames}
                setGame={setGame}
                game={game}
                username={username}
                />
                <GamesList
                token={token}
                gamesList={confirmedGames}
                setGame={setGame}
                game={game}
                username={username}
                />

                <GamesList
                token={token}
                gamesList={pendingPOVGuestGames}
                setGame={setGame}
                game={game}
                username={username}
                />

                <GamesList
                token={token}
                gamesList={noGuestGames}
                setGame={setGame}
                game={game}
                username={username}
                />

                <GamesList
                token={token}
                gamesList={hostOpenDoublesGames}
                setGame={setGame}
                game={game}
                username={username}
                />
            
                <GamesList
                token={token}
                gamesList={guestOpenDoublesGames}
                setGame={setGame}
                game={game}
                username={username}
                />
                </>
                )}

<Popover>
            <PopoverTrigger>
                <Button>Trigger</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow/>
                <PopoverCloseButton/>
                <PopoverHeader>Game Details!</PopoverHeader>
                <PopoverBody>game details body</PopoverBody>
            </PopoverContent>
        </Popover>

            </Box>{" "}
            <Footer />
        </>
    );
}
