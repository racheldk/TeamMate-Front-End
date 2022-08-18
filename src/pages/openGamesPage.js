import GamesList from "../components/gamesList";
import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OpenGamesList({ token, listType, setListType, allGamesList }) {

    
setListType("allOpen")
console.log(allGamesList)

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
