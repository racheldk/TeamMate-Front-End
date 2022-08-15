import GamesList from "../components/gamesList";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OpenGamesList({ token }) {
    const [allGamesList, setAllGamesList] = useState([]);

    useEffect(() => {
        axios
            .get("https://teammate-app.herokuapp.com/session", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setAllGamesList(res.data);
            });
    }, [token, setAllGamesList]);

    return (
        <>
            <Header />
            <div className="app-body">
                <h1>Open Games List</h1>
                <GamesList token={token} games={allGamesList} />
            </div>
            <Footer />
        </>
    );
}
