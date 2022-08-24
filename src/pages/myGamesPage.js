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
import { WarningIcon } from "@chakra-ui/icons";
// import GamesList from "../components/gamesList";
import { DateTime } from "luxon";
import {
    BsChevronCompactLeft,
    BsCalendar2CheckFill,
    BsArrowDownSquare,
    BsArrowUpSquare,
    BsFillBookFill,
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

    console.log(game);

    const handleJoin = (game) => {
        console.log("join click");
        console.log(game);
        axios
            .post(
                `https://teammate-app.herokuapp.com/session/${game.id}/guest/`,
                {},
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then(() => {
                console.log("guest posted");
                alert("You sent a join request");
                // setJoinRequestSent(true);
            })
            .catch((error) => {
                alert(error.response.data.detail);
            });
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
                setIsLoading(false);
            });
    }, [token, setOpenGames]);

    //  THIS IS THE USEEFFECT WE'LL ACTUALLY USE, BUT ENDPOINTS AREN'T WORKING RIGHT NOW
    useEffect(() => {
        // ???!!!!????!!!!??? Do we also need unconfirmed guest and unconfirmed host? one to delete request and another to delete the game??
        const reqAction = axios.get(
            "https://teammate-app.herokuapp.com/games/?my-games=AllConfirmed",
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        const reqConfirmed = axios.get(
            `https://teammate-app.herokuapp.com/games/?my-games=HostUnconfirmed`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        const reqPending = axios.get(
            `https://teammate-app.herokuapp.com/games/?my-games=GuestPending`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        const reqNoGuest = axios.get(
            `https://teammate-app.herokuapp.com/games/?my-games=HostNoGuest`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        const reqHostOpenDoubles = axios.get(
            `https://teammate-app.herokuapp.com/games/?my-games=HostNotPendingUnconfirmedDoubles`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        const reqGuestOpenDoubles = axios.get(
            `https://teammate-app.herokuapp.com/games/?my-games=GuestAcceptedUnconfirmedDoubles`,
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
                    const responseAction = responses[0];
                    const responseConfirmed = responses[1];
                    const responsePending = responses[2];
                    const responseNoGuest = responses[3];
                    const responseHostOpenDoubles = responses[4];
                    const responseGuestOpenDoubles = responses[5];

                    setActionRequiredGames(
                        responseAction.map((obj) => ({
                            displayStatus: "actionRequired",
                            bgColor: "black",
                            icon: "FaExclamationCircle",
                            displayUsers: [obj.guest_info],
                            buttonLabels: ["Accept", "Reject"],
                            buttons: [
                                { label: "Accept", function: "handleAccept" },
                                {},
                            ],
                            route: `host/${obj.id}`,
                            ...obj,
                        }))
                    );
                    setConfirmedGames(
                        responseConfirmed.map((obj) => ({
                            displayStatus: "confirmed",
                            bgColor: "yellow",
                            icon: null,
                            displayUsers: [obj.host_info, ...obj.guest_info],
                            buttonLabels: ["Cancel this game"],
                            route: `confirmed/${obj.id}`,
                            ...obj,
                        }))
                    );
                    setPendingPOVGuestGames(
                        responsePending.map((obj) => ({
                            displayStatus: "pendingPOVGuest",
                            bgColor: null,
                            icon: "FaQuestionCircle",
                            displayUsers: [obj.host_info],
                            buttonLabels: ["Cancel request to join this game"],
                            route: `pending/${obj.id}`,
                            ...obj,
                        }))
                    );
                    setNoGuestGames(
                        responseNoGuest.map((obj) => ({
                            displayStatus: "no guests",
                            bgColor: null,
                            icon: null,
                            displayUsers: null,
                            buttonLabels: ["Delete", "Edit Game"],
                            route: `unconfirmed/${obj.id}`,
                            ...obj,
                        }))
                    );
                    setHostOpenDoublesGames(
                        responseHostOpenDoubles.map((obj) => ({
                            displayStatus: "host open doubles",
                            bgColor: null,
                            icon: null,
                            displayUsers: [obj.host_info, ...obj.guest_info],
                            buttonLabels: ["Cancel this Game"],
                            route: `unconfirmed/${obj.id}`,
                            ...obj,
                        }))
                    );
                    setGuestOpenDoublesGames(
                        responseGuestOpenDoubles.map((obj) => ({
                            displayStatus: "guest open doubles",
                            bgColor: null,
                            icon: null,
                            displayUsers: [obj.host_info, ...obj.guest_info],
                            buttonLabels: ["Cancel this game"],
                            route: `unconfirmed/${obj.id}`,
                            ...obj,
                        }))
                    );
                    setIsLoading(false);
                })
            );
    }, [token]);

    useEffect(() => {
        const combinedLists = confirmedGames.concat(
            pendingPOVGuestGames,
            noGuestGames,
            hostOpenDoublesGames,
            guestOpenDoublesGames
        );
        console.log(combinedLists);
        const sortedCombined = combinedLists.sort(
            (objA, objB) => Number(objA.date) - Number(objB.date)
        );
        console.log(sortedCombined);
        setNoActionGames(sortedCombined);
    }, [isLoading]);

    if (isLoading) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box className="app-body">
            <Header />
            <Heading>MyGames Component</Heading>

            <NewGamesList
                token={token}
                gamesList={openGames}
                setGame={setGame}
                game={game}
            />

            {/* <NewGamesList token={token} games={actionRequiredGames}/>
            <NewGamesList token={token} games={noActionGames}/> */}

            {/* Confirmed endpoint is down at the moment  */}
            {/* <NewGamesList token={token} games={confirmedGames}/> */}

            {/* component for games that need my attention - with accept/reject buttons, ordered soonest to furthest away  */}
            {/* component for the rest of games, with cancel buttons (see Notes.txt), ordered soonest to furthest away */}
            <Footer />
        </Box>
    );
}

// ActionRequired "!"
// useEffect(() => {
//     axios
//     // this endpoint is being adjusted to only show open games with a pending guest
//         .get(`https://teammate-app.herokuapp.com/${username}/open-host`, {
//             headers: {
//                 Authorization: `Token ${token}`,
//             },
//         })
//         .then((res) => {
//             console.log(res.data);
//             setActionRequiredGames(res.data.map((obj) => ({
//                 displayStatus: "actionRequired",
//                 bgColor: "black",
//                 icon: "FaExclamationCircle",
//                 displayUsers: [obj.guest_info],
//                 buttonLabels: ["Accept", "Reject"],
//                 route: `host/${obj.id}`,
//                 ...obj
//             })));
//             setIsLoading(false);
//         });
// }, []);

// // Confirmed (color background)
// useEffect(() =>{
//     axios.get(`https://teammate-app.herokuapp.com/${username}/confirmed/`, {
//         headers: {
//             Authorization: `Token ${token}`,
//         },
//     })
//     .then((res) => {
//         console.log(res.data)
//         setConfirmedGames(res.data.map((obj) => ({
//             displayStatus: "confirmed",
//             bgColor: "yellow",
//             icon: null,
//             displayUsers: [obj.host_info, ...obj.guest_info],
//             buttonLabels: ["Cancel this game"],
//             route: `confirmed/${obj.id}`,
//             ...obj
//         })))

//     })
// },[token])

// // pendingPOVGuest "?"
// useEffect(() =>{
//     axios.get(`https://teammate-app.herokuapp.com/${username}/open-guest/`, {
//         headers: {
//             Authorization: `Token ${token}`,
//         },
//     })
//     .then((res) => {
//         console.log(res.data)
//         setPendingPOVGuestGames(res.data.map((obj) => ({
//             displayStatus: "pendingPOVGuest",
//             bgColor: null,
//             icon: "FaQuestionCircle",
//             displayUsers: [obj.host_info],
//             buttonLabels: ["Cancel request to join this game"],
//             route: `pending/${obj.id}`,
//             ...obj
//         })))

//     })
// },[token])

// // Open No Action - unconfirmed, no pending guest
// // Update this endpoint
// useEffect(() =>{
//     axios.get(`https://teammate-app.herokuapp.com/${username}/open-guest/`, {
//         headers: {
//             Authorization: `Token ${token}`,
//         },
//     })
//     .then((res) => {
//         console.log(res.data)
//         setUnconfirmedGames(res.data.map((obj) => ({
//             displayStatus: "unconfirmed",
//             bgColor: null,
//             icon: null,
//             displayUsers: [obj.guest_info],
//             buttonLabels: ["Cancel this game"],
//             route: `unconfirmed/${obj.id}`,
//             ...obj
//         })))

//     })
// },[token])

// useEffect(() => {
//     const combinedLists = confirmedGames.concat(pendingPOVGuestGames, unconfirmedGames)
//     console.log(combinedLists)
//     const sortedCombined = combinedLists.sort((objA, objB) => Number(objA.date) - Number(objB.date))
//     console.log(sortedCombined)
// },[])
