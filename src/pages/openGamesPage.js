import GamesList from "../components/gamesList"
import Header from "../components/HeaderMenu"
import Footer from "../components/FooterMenu"

export default function OpenGamesList ({token}) {
    return (
        <>
        <Header/>
        <div className="app-body">
        <h1>Open Games List</h1>
        <GamesList token={token}/></div>
        <Footer/>
        </>
       
    )
}