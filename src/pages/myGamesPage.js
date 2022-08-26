import { Text, Heading, Icon, Box } from "@chakra-ui/react";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import GamesList from "../components/GamesList";
import {
    BsQuestionCircleFill,
    BsFillExclamationCircleFill,
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
                        setActionRequiredGames(
                            responseAction.map((obj) => ({
                                displayStatus: "actionRequired",
                                bgColor: "black",
                                icon: (
                                    <Icon
                                        color="red"
                                        as={BsFillExclamationCircleFill}
                                    />
                                ),
                                // display: guest with pending request
                                // WILL NEED A SEPARATE GAME CARD FOR EACH REQUEST
                                displayUsers: obj.guest_info,
                                // if the button.job changes, the conditional inside of handleClick on GameDetail also needs to change
                                buttonTitle: "Do you want to play with ",
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
                                // display: host and any confirmed guests
                                displayUsers: [...obj.guest_info],
                                buttonTitle: null,
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
                                icon: (
                                    <Icon
                                        color="yellow"
                                        as={BsQuestionCircleFill}
                                    />
                                ),
                                displayUsers: [obj.guest_info[0]],
                                buttonTitle: null,
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
                                displayUsers: [obj.guest_info],
                                buttonTitle: null,
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
                                buttonTitle: null,
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
            <Heading fontSize="1xl">MyGames Component</Heading>

            {/* The following ternaries are so Rachel can see where things are loading/not loading */}
            {actionRequiredGames.length == 0 ? (
                <Text>
                    You don't have any games that require your attention
                </Text>
            ) : (
                <GamesList
                    token={token}
                    gamesList={actionRequiredGames}
                    setGame={setGame}
                    game={game}
                    username={username}
                />
            )}

            {confirmedGames.length == 0 ? (
                <Text>You don't have any confirmed games.</Text>
            ) : (
                <GamesList
                    token={token}
                    gamesList={confirmedGames}
                    setGame={setGame}
                    game={game}
                    username={username}
                />
            )}

            {pendingPOVGuestGames.length == 0 ? (
                <Text>You don't have any pending requests to join games.</Text>
            ) : (
                <GamesList
                    token={token}
                    gamesList={pendingPOVGuestGames}
                    setGame={setGame}
                    game={game}
                    username={username}
                />
            )}

            {noGuestGames.length == 0 ? (
                <Text>
                    You don't have any games that don't already have a guest
                    attached.
                </Text>
            ) : (
                <GamesList
                    token={token}
                    gamesList={noGuestGames}
                    setGame={setGame}
                    game={game}
                    username={username}
                />
            )}

            {hostOpenDoublesGames.length == 0 ? (
                <Text>
                    You aren't hosting any doubles games that are waiting for
                    more participants.
                </Text>
            ) : (
                <GamesList
                    token={token}
                    gamesList={hostOpenDoublesGames}
                    setGame={setGame}
                    game={game}
                    username={username}
                />
            )}
            {guestOpenDoublesGames.length == 0 ? (
                <Text>
                    You aren't a guest in any doubles games that are waiting for
                    more participants.
                </Text>
            ) : (
                <GamesList
                    token={token}
                    gamesList={guestOpenDoublesGames}
                    setGame={setGame}
                    game={game}
                    username={username}
                />
            )}

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
            <Footer />
        </Box>
    );
}
