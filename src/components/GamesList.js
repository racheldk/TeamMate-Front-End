import {
    Text,
    Heading,
    Button,
    Box,
    Modal,
    LinkOverlay,
    LinkBox
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState } from "react";
import GameDetail from "./GameDetail";

export default function GamesList({
    token,
    gamesList,
    setGame,
    game,
    username,
    setNoActionGames,
    confirmedGames,
    pendingPOVGuestGames,
    noGuestGames,
    hostOpenDoublesGames,
    guestOpenDoublesGames,
    test,
}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);


    console.log(gamesList);



    const handleOpenModal = (game) => {
        console.log("click open");
        console.log("modal game" + game);
        setModalIsOpen(true);
        setGame(game);
    };

    const handleCloseModal = () => {
        console.log("click close");
        setModalIsOpen(false);
    };

    console.log(gamesList);
    // console.log(game)

    if (gamesList.length === 0) {
        return (
            <Text>
                You have no games to display - make a new game or join one.
                Trust us, it'll be great (NewGamesList)
            </Text>
        );
    }

    return (
        <Box display='flex' flexWrap='wrap' maxW="300px" m='auto' justifyContent='center' textAlign='center'>
            {gamesList.length > 0 && (
            <>
                    <Heading textTransform='capitalize' color='#285E61'>{gamesList[0].displayStatus}</Heading>
                    {gamesList.map((game) => (
                        <LinkBox key={game.game_session_id}>
                        <LinkOverlay  onClick={() => {
                                        handleOpenModal(game);
                                    }}>
                            <Box
                                className="game-card"
                                bg={`${game.bgColor}`}
                                key={game.id}
                            >

                                <Text>{game.game_session_id} </Text>
                                <Box>{game.icon}</Box>
                                <Heading fontSize={33}>{game.location_info.park_name}</Heading>
                                <Text>{game.match_type} | {game.session_type}</Text>
                                <Text>
                                    {DateTime.fromISO(game.date).toLocaleString(
                                        {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                        }
                                    )}{" "}
                                    at{" "}
                                    {DateTime.fromISO(game.time).toLocaleString(
                                        DateTime.TIME_SIMPLE
                                    )}
                                </Text>
                            </Box>
                            </LinkOverlay>
                        </LinkBox>
                    ))}
                </>
            )}

            <Modal
                isOpen={modalIsOpen}
                contentLabel="Game Detail Modal"
                game={game}
            >
                <GameDetail
                    token={token}
                    game={game}
                    handleCloseModal={handleCloseModal}
                    username={username}
                />
            </Modal>
        </Box>
    );
}
