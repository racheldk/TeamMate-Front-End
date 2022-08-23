import { DateTime } from "luxon";


export default function OldGameDetail({ game, listType, handleJoinClick, handleCancelRequest, handleAcceptRequest, handleRejectRequest, handleDeleteMyGame, handleCancelConfirmed, handleEditMyGame  }) {
    console.log(game);
    return (
        <div>
            <div>{game.location_info.park_name}</div>
            <div>{game.location_info.address.address1} {game.location_info.address.address2} {game.location_info.address.city}, {game.location_info.address.state} {game.location_info.address.zipcode}</div>
            <div>(park address)</div>
            <div>
                        {DateTime.fromISO(game.date).toLocaleString({
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        })}{" "}
                        at {" "}
                        {DateTime.fromISO(game.time).toLocaleString(
                            DateTime.TIME_SIMPLE
                        )}
                    </div>
            <div>{game.host_info.first_name}</div>
            <div>{game.host_info.last_name}</div>
            <div>{game.host_info.username}</div>

            {(() => {
                switch (listType) {
                    case "allOpen":
                        return (
                            <button onClick={() => handleJoinClick(game)}>
                                Join
                            </button>
                        );
                    case "pendingPOVGuest":
                        return (
                            <button onClick={() => handleCancelRequest(game)}>
                                Cancel
                            </button>
                        );
                    case "pendingPOVHost":
                        return (
                            <>
                                <button onClick={() => handleAcceptRequest(game)}>
                                    Accept
                                </button>
                                <button onClick={() => handleRejectRequest(game)}>
                                    Reject
                                </button>
                            </>
                        );
                    case "myOpen":
                        return (
                            <>
                                <button
                                    onClick={() => handleDeleteMyGame(game)}
                                >
                                    Delete
                                </button>
                                <button onClick={() => handleEditMyGame(game)}>
                                    Edit
                                </button>
                            </>
                        );
                    case "confirmed":
                        return (
                            <button onClick={() => handleCancelConfirmed(game)}>
                                Cancel
                            </button>
                        );
                    default:
                        return null;
                }
            })()}
        </div>
    );
}
