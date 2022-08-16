// make all the axios requests and pass all those as props
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
import GamesList from "../components/gamesList";

export default function MyGames({
    token,
    listType,
    setListType,
    allGamesList,
}) {
    const [listTitle, setListTitle] = useState(null);
    // const [allGamesList, setAllGamesList] = useState([]);

    const handleMenuConfirmed = () => {
        setListType("confirmed");
        console.log("menu confirmed click");
        setListTitle("My Confirmed Games");
        // return <GamesList token={token} games={allGamesList} listType={listType} listTitle={listTitle} />
    };

    return (
        <>
            <Header />
            <div>
                {/* this div will hold the native menu */}
                {/* each button: 
            [] render GamesList 
            [] change listType 
            [] pass props
        */}
                <button
                    onClick={() => {
                        handleMenuConfirmed();
                        return (
                            <GamesList
                                token={token}
                                games={allGamesList}
                                listType={listType}
                                listTitle={listTitle}
                            />
                        );
                    }}
                >
                    Confirmed Games
                </button>
                <button>Pending Requests I Have Made</button>
                <button>Pending Requests to Join my Games</button>
                <button>My Open Games</button>
            </div>
            <div>
                {(() => {
                    switch (listType) {
                        case "confirmed":
                            return (
                                <>
                                <GamesList
                                    token={token}
                                    games={allGamesList}
                                    listType={listType}
                                    listTitle={listTitle}
                                /></>
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
            <Footer />
        </>
    );
}
