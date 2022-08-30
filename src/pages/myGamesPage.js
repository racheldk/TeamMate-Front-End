import {
    Text,
    Heading,
    Icon,
    Box,
    Button,
    IconButton,
    Center,
    Spinner,
} from "@chakra-ui/react";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import GamesList from "../components/GamesList";
import { IoMdTennisball } from "react-icons/io";
import { BsQuestionCircleFill, BsPersonFill, BsList } from "react-icons/bs";
import { CalendarIcon, CheckCircleIcon } from "@chakra-ui/icons";
import CalendarExample from "../components/calendar-example";
import { DateTime } from "luxon";

export default function MyGames({
    token,
    username,
    game,
    setGame,
    reload,
    setReload,
}) {
    const [actionRequiredGames, setActionRequiredGames] = useState([]);
    const [confirmedGames, setConfirmedGames] = useState([]);
    const [pendingPOVGuestGames, setPendingPOVGuestGames] = useState([]);
    const [noGuestGames, setNoGuestGames] = useState([]);
    const [hostOpenDoublesGames, setHostOpenDoublesGames] = useState([]);
    const [guestOpenDoublesGames, setGuestOpenDoublesGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        console.log("giant useEffect in My Games just ran" + reload);
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
                    const responseAction = responses[0].data;
                    const responseConfirmed = responses[1].data;
                    const responsePending = responses[2].data;
                    const responseNoGuest = responses[3].data;
                    const responseHostOpenDoubles = responses[4].data;
                    const responseGuestOpenDoubles = responses[5].data;

                    if (responseAction.length > 0) {
                        const pendingGuests = [];
                        for (let game of responseAction) {
                            for (let guest of game.guest_info) {
                                if (guest.status === "Pending") {
                                    pendingGuests.push({
                                        pendingGuest: guest,
                                        tennisBall: IoMdTennisball,
                                        tennisBallColor: "#319795",
                                        cardTitle: `${guest.user_info.first_name} would like to join your game`,
                                        displayStatus: "action required",
                                        bgColor: "#ffffff",
                                        icon: (
                                            <Icon
                                                color="white"
                                                backgroundColor="#e32636"
                                                as={BsPersonFill}
                                                fontSize="30px"
                                                borderRadius="100px"
                                                p={1}
                                            />
                                        ),
                                        displayUsers: [guest],
                                        displayUsersUsernames: null,
                                        historyStatus: null,
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
                                        title: (
                                            <Icon
                                                color="white"
                                                backgroundColor="#e32636"
                                                as={BsPersonFill}
                                                // fontSize="30px"
                                                borderRadius="100px"
                                            />
                                        ),
                                        allDay: false,
                                        start: DateTime.fromISO(
                                            game.datetime
                                        ).toJSDate(),
                                        end: DateTime.fromISO(
                                            game.endtime
                                        ).toJSDate(),
                                        ...game,
                                    });
                                }
                            }
                        }
                        console.log(pendingGuests);
                        setActionRequiredGames(pendingGuests);
                    }

                    if (responseConfirmed.length > 0) {
                        const confirmedExpandedGames = [];
                        for (let game of responseConfirmed) {
                            const confirmedPlayers = [];
                            for (let guest of game.guest_info) {
                                if (
                                    guest.status === "Host" ||
                                    guest.status === "Accepted"
                                ) {
                                    confirmedPlayers.push(guest);
                                }
                            }
                            const expandedGame = {
                                cardTitle: "This game has been confirmed",
                                displayStatus: "confirmed",
                                bgColor: "#ffffff",
                                tennisBall: IoMdTennisball,
                                tennisBallColor: "#319795",
                                icon: (
                                    <CheckCircleIcon
                                        color="#48BB78"
                                        fontSize="30px"
                                        borderRadius="100px"
                                    />
                                ),
                                displayUsers: confirmedPlayers,
                                displayUsersUsernames: null,
                                historyStatus: null,
                                buttonTitle: null,
                                buttons: [
                                    {
                                        label: "Cancel this game",
                                        job: "cancel confirmed",
                                    },
                                ],
                                title: <CheckCircleIcon color="#48BB78" />,
                                allDay: false,
                                start: DateTime.fromISO(
                                    game.datetime
                                ).toJSDate(),
                                end: DateTime.fromISO(game.endtime).toJSDate(),
                                ...game,
                            };
                            confirmedExpandedGames.push(expandedGame);
                        }
                        console.log(confirmedExpandedGames);
                        setConfirmedGames(confirmedExpandedGames);
                    }

                    if (responsePending.length > 0) {
                        const pendingExpandedGames = [];
                        for (let game of responsePending) {
                            const confirmedPlayers = [];
                            for (let guest of game.guest_info) {
                                if (
                                    guest.status === "Host" ||
                                    guest.status === "Accepted"
                                ) {
                                    confirmedPlayers.push(guest);
                                }
                            }
                            const expandedGame = {
                                cardTitle: `Your request to join this game is pending.`,
                                displayStatus: "pendingPOVGuest",
                                tennisBallColor: "#319795",
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
                                displayUsersUsernames: null,
                                historyStatus: null,
                                buttonTitle: null,
                                buttons: [
                                    {
                                        label: "Cancel request to join this game",
                                        job: "cancel pending request",
                                    },
                                ],
                                title: (
                                    <Icon
                                        color="gold"
                                        as={BsQuestionCircleFill}
                                        // fontSize="30px"
                                        borderRadius="100px"
                                    />
                                ),
                                allDay: false,
                                start: DateTime.fromISO(
                                    game.datetime
                                ).toJSDate(),
                                end: DateTime.fromISO(game.endtime).toJSDate(),
                                ...game,
                            };
                            pendingExpandedGames.push(expandedGame);
                        }
                        console.log(pendingExpandedGames);
                        setPendingPOVGuestGames(pendingExpandedGames);
                    }

                    if (responseNoGuest.length > 0) {
                        const noGuestExpandedGames = [];
                        for (let game of responseNoGuest) {
                            const confirmedPlayers = [];
                            for (let guest of game.guest_info) {
                                if (
                                    guest.status === "Host" ||
                                    guest.status === "Accepted"
                                ) {
                                    console.log("Confirmed Player");
                                    confirmedPlayers.push(guest);
                                }
                            }
                            const expandedGame = {
                                cardTitle: "No one has requested to join this game yet.",
                                displayStatus: "no guests",
                                bgColor: "#ffffff",
                                tennisBall: IoMdTennisball,
                                tennisBallColor: "#319795",
                                icon: null,
                                displayUsers: confirmedPlayers,
                                displayUsersUsernames: null,
                                historyStatus: null,
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
                                title: (
                                    <Icon
                                        color="teal"
                                        as={IoMdTennisball}
                                        borderRadius="100px"
                                    />
                                ),
                                allDay: false,
                                start: DateTime.fromISO(
                                    game.datetime
                                ).toJSDate(),
                                end: DateTime.fromISO(game.endtime).toJSDate(),
                                ...game,
                            };
                            noGuestExpandedGames.push(expandedGame);
                        }
                        setNoGuestGames(noGuestExpandedGames);
                    }

                    if (responseHostOpenDoubles.length > 0) {
                        const hostOpenDoublesExpandedGames = [];
                        for (let game of responseHostOpenDoubles) {
                            const confirmedPlayers = [];
                            for (let guest of game.guest_info) {
                                if (
                                    guest.status === "Host" ||
                                    guest.status === "Accepted"
                                ) {
                                    confirmedPlayers.push(guest);
                                }
                            }
                            const expandedGame = {
                                cardTitle: "This game is not full yet.",
                                displayStatus: "host open doubles",
                                bgColor: "#ffffff",
                                tennisBall: IoMdTennisball,
                                tennisBallColor: "#319795",
                                icon: null,
                                displayUsers: confirmedPlayers,
                                displayUsersUsernames: null,
                                historyStatus: null,
                                buttonTitle: null,
                                buttons: [
                                    {
                                        label: "Cancel this Game",
                                        job: "cancel game",
                                    },
                                ],
                                title: (
                                    <Icon
                                        color="teal"
                                        as={IoMdTennisball}
                                        borderRadius="100px"
                                    />
                                ),
                                allDay: false,
                                start: DateTime.fromISO(
                                    game.datetime
                                ).toJSDate(),
                                end: DateTime.fromISO(game.endtime).toJSDate(),
                                ...game,
                            };
                            hostOpenDoublesExpandedGames.push(expandedGame);
                        }
                        setHostOpenDoublesGames(hostOpenDoublesExpandedGames);
                    }

                    if (responseGuestOpenDoubles.length > 0) {
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
                                tennisBallColor: "#319795",
                                icon: null,
                                cardTitle: "This game is not full yet.",
                                displayUsers: confirmedPlayers,
                                displayUsersUsernames: null,
                                historyStatus: null,
                                buttonTitle: null,
                                buttons: [
                                    {
                                        label: "Cancel this game",
                                        job: "cancel accepted request",
                                    },
                                ],
                                title: (
                                    <Icon
                                        color="teal"
                                        as={IoMdTennisball}
                                        borderRadius="100px"
                                    />
                                ),
                                allDay: false,
                                start: DateTime.fromISO(
                                    game.datetime
                                ).toJSDate(),
                                end: DateTime.fromISO(game.endtime).toJSDate(),
                                ...game,
                            };
                            guestOpenDoublesExpandedGames.push(expandedGame);
                        }
                        setGuestOpenDoublesGames(guestOpenDoublesExpandedGames);
                    }
                })
            )
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
        setIsLoading(false);
    }, [token, reload]);

    if (isLoading) {
        return (
            <Box>
                <Center h="400px">
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="#234E52;"
                        size="xl"
                    />
                </Center>
            </Box>
        );
    }

    return (
        <>
            <Header />
            <Box className="app-body">
                {/* if this heading changes we also need to change notifications message */}
                <Heading color="#234E52" textAlign="center" mt={4}>
                    My Games
                </Heading>

                {showCalendar ? (
                    <>
                        <Box
                            w="100%"
                            mr="auto"
                            ml="auto"
                            mb={4}
                            display="flex"
                            justifyContent="center"
                            className="view-changer"
                        >
                            <Button
                                colorScheme="teal"
                                variant="solid"
                                mt={2}
                                mb={2}
                                size="lg"
                                onClick={() => setShowCalendar(false)}
                            >
                                <BsList color="#fff" fontSize="1.5em" />
                                &nbsp;
                                <Text
                                    color="#fff"
                                    fontWeight="700"
                                    display="inline-block"
                                >
                                    List View
                                </Text>
                            </Button>
                        </Box>
                        <CalendarExample
                            token={token}
                            username={username}
                            confirmedGames={confirmedGames}
                            actionRequiredGames={actionRequiredGames}
                            pendingPOVGuestGames={pendingPOVGuestGames}
                            noGuestGames={noGuestGames}
                            hostOpenDoublesGames={hostOpenDoublesGames}
                            guestOpenDoublesGames={guestOpenDoublesGames}
                        />
                    </>
                ) : (
                    <>
                        <Box
                            w="100%"
                            mr="auto"
                            ml="auto"
                            mb={4}
                            display="flex"
                            justifyContent="center"
                            className="view-changer"
                        >
                            <Button
                                colorScheme="teal"
                                variant="solid"
                                mt={2}
                                mb={2}
                                size="lg"
                                onClick={() => setShowCalendar(true)}
                            >
                                <CalendarIcon color="#fff" fontSize="1.5em" />
                                &nbsp;
                                <Text
                                    color="#fff"
                                    fontWeight="700"
                                    display="inline-block"
                                >
                                    Calendar View
                                </Text>
                            </Button>
                        </Box>

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
                            gamesList={actionRequiredGames}
                            setGame={setGame}
                            game={game}
                            username={username}
                            reload={reload}
                            setReload={setReload}
                        />

                        <GamesList
                            token={token}
                            gamesList={confirmedGames}
                            setGame={setGame}
                            game={game}
                            username={username}
                            reload={reload}
                            setReload={setReload}
                        />

                        <GamesList
                            token={token}
                            gamesList={pendingPOVGuestGames}
                            setGame={setGame}
                            game={game}
                            username={username}
                            reload={reload}
                            setReload={setReload}
                        />

                        <GamesList
                            token={token}
                            gamesList={noGuestGames}
                            setGame={setGame}
                            game={game}
                            username={username}
                            reload={reload}
                            setReload={setReload}
                        />

                        <GamesList
                            token={token}
                            gamesList={hostOpenDoublesGames}
                            setGame={setGame}
                            game={game}
                            username={username}
                            reload={reload}
                            setReload={setReload}
                        />

                        <GamesList
                            token={token}
                            gamesList={guestOpenDoublesGames}
                            setGame={setGame}
                            game={game}
                            username={username}
                            reload={reload}
                            setReload={setReload}
                        />
                    </>
                )}
            </Box>{" "}
            <Footer />
        </>
    );
}
