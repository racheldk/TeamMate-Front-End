import {
    Text,
    Heading,
    Image,
    Icon,
    IconButton,
    Button,
    Box,
    requiredChakraThemeKeys,
} from "@chakra-ui/react";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import IncomingRequestList from "../components/IncomingRequestList";
import { useState, useEffect } from "react";
import axios from "axios";
import NewGamesList from "../components/NewGamesList";
import { withTheme } from "@emotion/react";
import { WarningIcon, SunIcon } from "@chakra-ui/icons";
// import GamesList from "../components/gamesList";
import { DateTime } from "luxon";
import {
    BsChevronCompactLeft,
    BsCalendar2CheckFill,
    BsArrowDownSquare,
    BsArrowUpSquare,
    BsFillBookFill,
    BsQuestionCircleFill,
    BsFillExclamationCircleFill
} from "react-icons/bs";

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
    const [openGames, setOpenGames] = useState([]);
    const [test, setTest] = useState("original");

    // console.log(game);

    const handleJoin = (game) => {
        console.log("join click");
        console.log(game);
        // axios
        //     .post(
        //         `https://teammate-app.herokuapp.com/session/${game.id}/guest/`,
        //         {},
        //         {
        //             headers: {
        //                 Authorization: `Token ${token}`,
        //             },
        //         }
        //     )
        //     .then(() => {
        //         console.log("guest posted");
        //         alert("You sent a join request");
        //         // setJoinRequestSent(true);
        //     })
        //     .catch((error) => {
        //         alert(error.response.data.detail);
        //     });
    };

    useEffect(() => {
        // setListType("allOpen")
        axios
            .get("https://teammate-app.herokuapp.com/session/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setOpenGames(
                    res.data.map((obj) => ({
                        displayStatus: "open to join",
                        bgColor: "pink",
                        icon: "FaExclamationCircle",
                        displayUsers: [obj.host_info],
                        buttons: [
                            { label: "Join", job: () => handleJoin(game) },
                        ],
                        route: `host/${obj.id}`,
                        ...obj,
                    }))
                );
                // setIsLoading(false);
            });
    }, [token, setOpenGames]);

    useEffect(() => {
        // ???!!!!????!!!!??? Do we also need unconfirmed guest and unconfirmed host? one to delete request and another to delete the game??
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
                        setActionRequiredGames(
                            responseAction.map((obj) => ({
                                displayStatus: "actionRequired",
                                bgColor: "black",
                                icon: <Icon color="red" as={BsFillExclamationCircleFill}/>,
                                displayUsers: obj.guest_info,
                                buttons: [
                                    {
                                        label: "Accept",
                                        job: "handleAccept",
                                    },
                                    {
                                        label: "Reject",
                                        job: "handleReject",
                                    },
                                ],
                                route: `host/${obj.id}`,
                                ...obj,
                            }))
                        );
                    }

                    if (responseConfirmed.length > 0) {
                        console.log("confirmed > 0");
                        setConfirmedGames(
                            responseConfirmed.map((obj) => ({
                                displayStatus: "confirmed",
                                bgColor: "yellow",
                                icon: null,
                                displayUsers: [
                                    obj.host_info,
                                    ...obj.guest_info,
                                ],
                                buttons: [
                                    {
                                        label: "Cancel this game",
                                        job: "cancel confirmed",
                                    },
                                ],
                                route: `confirmed/${obj.id}`,
                                ...obj,
                            }))
                        );
                    }

                    if (responsePending.length > 0) {
                        console.log("pending > 0");
                        setPendingPOVGuestGames(
                            responsePending.map((obj) => ({
                                displayStatus: "pendingPOVGuest",
                                bgColor: "grey",
                                icon: <Icon color="yellow" as={BsQuestionCircleFill}/>,
                                displayUsers: obj.host_info,
                                buttons: [
                                    {
                                        label: "Cancel request to join this game",
                                        job: "cancel pending request",
                                    },
                                ],
                                route: `pending/${obj.id}`,
                                ...obj,
                            }))
                        );
                    }

                    if (responseNoGuest.length > 0) {
                        console.log("noGuest > 0");
                        setNoGuestGames(
                            responseNoGuest.map((obj) => ({
                                displayStatus: "no guests",
                                bgColor: null,
                                icon: null,
                                displayUsers: [],
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
                                route: `unconfirmed/${obj.id}`,
                                ...obj,
                            }))
                        );
                    }

                    if (responseHostOpenDoubles.length > 0) {
                        console.log("hostOpenDoubles > 0");
                        setHostOpenDoublesGames(
                            responseHostOpenDoubles.map((obj) => ({
                                displayStatus: "host open doubles",
                                bgColor: null,
                                icon: null,
                                displayUsers: [
                                    obj.host_info,
                                    ...obj.guest_info,
                                ],
                                buttons: [
                                    {
                                        label: "Cancel this Game",
                                        job: "cancel game",
                                    },
                                ],
                                route: `unconfirmed/${obj.id}`,
                                ...obj,
                            }))
                        );
                    }

                    if (responseGuestOpenDoubles.length > 0) {
                        console.log("guestOpenDoubles > 0");
                        setGuestOpenDoublesGames(
                            responseGuestOpenDoubles.map((obj) => ({
                                displayStatus: "guest open doubles",
                                bgColor: null,
                                icon: null,
                                displayUsers: [
                                    obj.host_info,
                                    ...obj.guest_info,
                                ],
                                buttons: [
                                    {
                                        label: "Cancel this game",
                                        job: "cancel accepted request",
                                    },
                                ],
                                route: `unconfirmed/${obj.id}`,
                                ...obj,
                            }))
                        );
                    }
                })
            )
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
        setIsLoading(false);
        setTest("please please work");
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
        <Box className="app-body">
            <Header />
            <Heading>MyGames Component</Heading>

            {/* <NewGamesList
                token={token}
                gamesList={openGames}
                setGame={setGame}
                game={game}
            /> */}

            {/* The following ternaries are so Rachel can see where things are loading/not loading */}
            {actionRequiredGames.length == 0 ? (
                <Text>
                    You don't have any games that require your attention
                </Text>
            ) : (
                <NewGamesList
                    token={token}
                    gamesList={actionRequiredGames}
                    setGame={setGame}
                    game={game}
                />
            )}

            {confirmedGames.length == 0 ? (
                <Text>You don't have any confirmed games.</Text>
            ) : (
                <NewGamesList
                    token={token}
                    gamesList={confirmedGames}
                    setGame={setGame}
                    game={game}
                />
            )}

            {pendingPOVGuestGames.length == 0 ? (
                <Text>You don't have any pending requests to join games.</Text>
            ) : (
                <NewGamesList
                    token={token}
                    gamesList={pendingPOVGuestGames}
                    setGame={setGame}
                    game={game}
                />
            )}

            {noGuestGames.length == 0 ? (
                <Text>
                    You don't have any games that don't already have a guest
                    attached.
                </Text>
            ) : (
                <NewGamesList
                    token={token}
                    gamesList={noGuestGames}
                    setGame={setGame}
                    game={game}
                />
            )}

            {hostOpenDoublesGames.length == 0 ? (
                <Text>
                    You aren't hosting any doubles games that are waiting for
                    more participants.
                </Text>
            ) : (
                <NewGamesList
                    token={token}
                    gamesList={hostOpenDoublesGames}
                    setGame={setGame}
                    game={game}
                />
            )}
            {guestOpenDoublesGames.length == 0 ? (
                <Text>
                    You aren't a guest in any doubles games that are waiting for
                    more participants.
                </Text>
            ) : (
                <NewGamesList
                    token={token}
                    gamesList={guestOpenDoublesGames}
                    setGame={setGame}
                    game={game}
                />
            )}

            {/* {noActionGames.length == 0 ? (
                <Text>noActionGames array is empty</Text>
            ) : (
                <NewGamesList
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
            <Footer />
        </Box>
    );
}
