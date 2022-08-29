import { Text, Heading, Icon, Box } from "@chakra-ui/react";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import GamesList from "../components/GamesList";
import { IoMdTennisball } from "react-icons/io";
import {
    BsQuestionCircleFill,
    BsFillExclamationCircleFill,
} from "react-icons/bs";
import { CheckCircleIcon } from '@chakra-ui/icons'


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
                                                color="red"
                                                as={BsFillExclamationCircleFill}
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

    // const combineLists = () => {
    //     const combinedLists = confirmedGames.concat(
    //         pendingPOVGuestGames,
    //         noGuestGames,
    //         hostOpenDoublesGames,
    //         guestOpenDoublesGames
    //     );
    //     console.log(combinedLists);
    //     const sortedCombined = combinedLists.sort(
    //         (objA, objB) => Number(objA.date) - Number(objB.date)
    //     );
    //     console.log(sortedCombined);
    //     setNoActionGames(sortedCombined);
    // };

    if (isLoading) {
        return <Box>Loading...</Box>;
    }

    return (
        <>
        <Header />
        <Box className="app-body">
            {/* if this heading changes we also need to change notifications message */}
            <Heading color="#234E52" textAlign="center">My Games</Heading>



                {/* The following ternaries are so Rachel can see where things are loading/not loading */}
                {/* {actionRequiredGames.length === 0 ? (
                <Text>
                    You don't have any games that require your attention
                </Text>
            ) : ( */}
                <GamesList
                    token={token}
                    gamesList={actionRequiredGames}
                    setGame={setGame}
                    game={game}
                    username={username}
                />
                {/* )} */}

                {/* {confirmedGames.length === 0 ? (
                <Text>You don't have any confirmed games.</Text>
            ) : ( */}
                <GamesList
                    token={token}
                    gamesList={confirmedGames}
                    setGame={setGame}
                    game={game}
                    username={username}
                />
                {/* )} */}

                {/* {pendingPOVGuestGames.length === 0 ? (
                <Text>You don't have any pending requests to join games.</Text>
            ) : ( */}
                <GamesList
                    token={token}
                    gamesList={pendingPOVGuestGames}
                    setGame={setGame}
                    game={game}
                    username={username}
                />
                {/* )} */}

                {/* {noGuestGames.length === 0 ? (
                <Text>
                    You don't have any games that don't already have a guest
                    attached.
                </Text>
            ) : ( */}
                <GamesList
                    token={token}
                    gamesList={noGuestGames}
                    setGame={setGame}
                    game={game}
                    username={username}
                />
                {/* )} */}

                {/* {hostOpenDoublesGames.length === 0 ? (
                <Text>
                    You aren't hosting any doubles games that are waiting for
                    more participants.
                </Text>
            ) : ( */}
                <GamesList
                    token={token}
                    gamesList={hostOpenDoublesGames}
                    setGame={setGame}
                    game={game}
                    username={username}
                />
                {/* )} */}
                {/* {guestOpenDoublesGames.length === 0 ? (
                <Text>
                    You aren't a guest in any doubles games that are waiting for
                    more participants.
                </Text>
            ) : ( */}
                <GamesList
                    token={token}
                    gamesList={guestOpenDoublesGames}
                    setGame={setGame}
                    game={game}
                    username={username}
                />
                {/* )} */}

                {/* {noActionGames.length == 0 ? (
                <Text>noActionGames array is empty</Text>
            ) : (
                <GamesList
                    token={token}
                    gamesList={noActionGames}
                    // setNoActionGames={setNoActionGames}
                    // confirmedGames={confirmedGames}
                    // pendingPOVGuestGames={pendingPOVGuestGames}
                    // noGuestGames={noGuestGames}
                    // hostOpenDoublesGames={hostOpenDoublesGames}
                    // guestOpenDoublesGames={guestOpenDoublesGames}
                />
            )} */}
            </Box>{" "}
            <Footer />
        </>
    );
}
