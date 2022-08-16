export default function GameDetail({ game, handleJoinClick }) {
    console.log(game);
    return (
        <div>
            <div>{game.location_info.park_name}</div>
            <div>(park address)</div>
            <div>
                {game.date} {game.time}
            </div>
            <div>{game.host_info.first_name}</div>
            <div>{game.host_info.last_name}</div>
            <div>{game.host_info.username}</div>
            <button onClick={()=>handleJoinClick(game)}>join</button>
        </div>
    );
}