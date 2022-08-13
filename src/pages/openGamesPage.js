import GamesList from "../components/gamesList"

export default function OpenGamesList ({token}) {
    return (
        <div>
            <h1>Open Games List</h1>
            <GamesList token={token}/>
        </div>
    )
}