// TO DO
// [] figure out axios requests or filtering through games
// [] update modal click options on gamesList

// make all the axios requests and pass all those as props - or make these in App.js??
// [] confirmed
// [] pendingPOVguest
// [] pendingPOVhost
// [] myOpen

// listType state is held in App.js

// header
// native menu (menu that's only on this page) to different types of lists
// GamesList component of a certain list type - pass in listType state and the list data as props
// GamesList: confirmed games
// GamesList: pending requests to join other games "pendingPOVGuest"
// GamesList: pending requests to join my games "pendingPOVHost"
// GamesList: my open games (no requests yet to join, so I could delete them without it impacting anyon)

// footer component

import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import GamesList from "../components/OLDgamesList";
import { Button } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { BsChevronCompactLeft } from "react-icons/bs";

export default function MyGames({
    token,
    username,
    listType,
    setListType,
    allGamesList,
}) {
    const [listTitle, setListTitle] = useState(null);
    const [userAllGames, setUserAllGames] = useState([]);
    const [userConfirmedGames, setUserConfirmedGames] = useState([]);
    const [userPendingPOVGuestGames, setUserPendingPOVGuestGames] = useState(
        []
    );
    const [userPendingPOVHostGames, setUserPendingPOVHostGames] = useState([]);
    const [userMyOpenGames, setUserMyOpenGames] = useState([]);

    const handleMenuConfirmed = () => {
        console.log("menu confirmed click");
        setListType("confirmed");
        setListTitle("My Confirmed Games");
    };

    const handleMenuPOVGuest = () => {
        console.log("menu POVGuest clicked");
        setListType("pendingPOVGuest");
        setListTitle("Games I Have Requested to Join");
    };

    const handleMenuPOVHost = () => {
        console.log("menu POVHost clicked");
        setListType("pendingPOVHost");
        setListTitle("Requests to Join my Games");
    };

    const handleMenuMyOpen = () => {
        console.log("menu myOpen clicked");
        setListType("myOpen");
        setListTitle("My Open Games");
    };

    useEffect(() => {
        const allUserGames = [];
        axios
            .get(`https://teammate-app.herokuapp.com/${username}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                console.log(res.data[0].game_session);
                res.data[0].game_session.map((game) => allUserGames.push(game));
                console.log(allUserGames);
                filterGames(allUserGames);
            });
        const filterGames = (allUserGames) => {
            const todayDate = DateTime.fromJSDate(new Date()).toLocaleString();
            const todayTime = DateTime.fromJSDate(new Date()).toLocaleString(
                DateTime.TIME_24_WITH_SECONDS
            );
            const futureGames = allUserGames.filter(function (game) {
                const gameDate = DateTime.fromISO(game.date).toLocaleString();
                return (
                    gameDate >= todayDate ||
                    (gameDate === todayDate && game.time > todayTime)
                );
            });
            console.log(futureGames);
            setUserAllGames(futureGames);
        };
    }, [token, username, setListType]);

    useEffect(() => {
        axios
            .get(`https://teammate-app.herokuapp.com/${username}/confirmed`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setUserConfirmedGames(res.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`https://teammate-app.herokuapp.com/${username}/open-host`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setUserPendingPOVHostGames(res.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`https://teammate-app.herokuapp.com/${username}/open-guest`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setUserPendingPOVGuestGames(res.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`https://teammate-app.herokuapp.com/${username}/open`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setUserMyOpenGames(res.data);
            });
    }, []);



    return (
        <>
            <div className="app-body">
                <Header />
                <div className="nav_links">
                    <button
                        className="buttonmygames"
                        onClick={() => handleMenuConfirmed()}
                    >
                        Confirmed Games
                    </button>
                    <br />
                    <button
                        className="buttonmygames"
                        onClick={() => handleMenuPOVGuest()}
                    >
                        Pending Requests I Have Made
                    </button>
                    <button
                        className="buttonmygames"
                        onClick={() => handleMenuPOVHost()}
                    >
                        Pending Requests to Join my Games
                    </button>
                    <button
                        className="buttonmygames"
                        onClick={() => handleMenuMyOpen()}
                    >
                        My Open Games
                    </button>
                </div>

                <div>
                    {(() => {
                        // Need to update which games array state is sent as games prop!!
                        switch (listType) {
                            case "confirmed":
                                return (
                                    <GamesList
                                        token={token}
                                        games={userConfirmedGames}
                                        listType={listType}
                                        listTitle={listTitle}
                                    />
                                );
                            case "pendingPOVGuest":
                                return (
                                    <GamesList
                                        token={token}
                                        games={userPendingPOVGuestGames}
                                        listType={listType}
                                        listTitle={listTitle}
                                    />
                                );
                            case "pendingPOVHost":
                                return (
                                    <GamesList
                                        token={token}
                                        games={userPendingPOVHostGames}
                                        listType={listType}
                                        listTitle={listTitle}
                                    />
                                );
                            case "myOpen":
                                return (
                                    <GamesList
                                        token={token}
                                        games={userMyOpenGames}
                                        // this currently shows all games that are open and attached to that user
                                        // this is redundant with pendingPOVGuest and pendingPOVHost 
                                        listType={listType}
                                        listTitle={listTitle}
                                    />
                                );
                            default:
                                return null;
                        }
                    })()}
                </div>
            </div>
            <Footer />
        </>
    );
}
