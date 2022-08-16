import GamesList from "../components/gamesList";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OpenGamesList({ token, listType, setListType, allGamesList }) {
    // const [allGamesList, setAllGamesList] = useState([]);

    // useEffect(() => {
    //     setListType("allOpen")
    //     axios
    //         .get("https://teammate-app.herokuapp.com/session", {
    //             headers: {
    //                 Authorization: `Token ${token}`,
    //             },
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //             setAllGamesList(res.data);
    //         });
    // }, [token, setAllGamesList, setListType]);

    return (
        <>
            <Header />
            <div className="app-body">
                <h1>Open Games List</h1>
                <GamesList token={token} games={allGamesList} listType={listType} />
            </div>
            <Footer />
        </>
    );
}
